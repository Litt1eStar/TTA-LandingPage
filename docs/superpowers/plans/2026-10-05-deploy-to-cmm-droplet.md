# Deploy TTA Landing Page to the CMM Droplet — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve the TTA 2026 landing page (React + Vite) at `https://tta.cmm.works` from the shared CMM DigitalOcean droplet, with auto-deploy on every push to `main`.

**Architecture:** Follows [DEPLOYMENT_GUIDE.md](../../../DEPLOYMENT_GUIDE.md) exactly. GitHub Actions builds a multi-stage Docker image (Node build → nginx serving `dist/`), pushes it to GHCR, then SSHes into the droplet to `docker compose pull && up -d` in `/opt/tta`. The container joins the `cmm_default` Docker network; the shared Caddy (owned by the CMM server repo) terminates HTTPS and reverse-proxies `tta.cmm.works` → `tta-web:80`.

**Tech Stack:** React 18, Vite 5, Docker, nginx 1.27-alpine, Docker Compose, GitHub Actions, GHCR, Caddy 2 (shared, not ours).

---

## What we learned about this project (context for the engineer)

- **Pure static SPA.** No backend, no `import.meta.env` usage, no router, no real auth (`LoginModal.jsx` is a UI mock). So: no `.env`, no build args, no Supabase/Google steps (guide §8 is skipped), health path is just `/`.
- **No git commits and no GitHub remote yet.** Everything is untracked on `main`.
- **Asset path collision (must fix).** Static files live in `public/assets/` (logos) and `public/uploads/` (images) and are referenced by absolute path (`/assets/logo.png`, `/uploads/...`) from ~25 places. Vite *also* emits its hashed JS/CSS bundles into `dist/assets/` by default. The guide's nginx config gives `/assets/` a **1-year immutable** cache — which would wrongly freeze the *unhashed* `logo.png`. Fix: tell Vite to emit bundles to `dist/static/` and give only `/static/` the immutable cache (Task 1–2). No component code changes needed.
- `prototype_source/` (2.7 MB) is reference material only — exclude it from the Docker image.

## Decisions (defaults chosen — change before starting if wrong)

| Placeholder (guide) | Value in this plan | Notes |
|---|---|---|
| `<APP_DOMAIN>` | `tta.cmm.works` | Any `*.cmm.works` subdomain or own domain works |
| `<PROJECT>` | `tta` | Folder `/opt/tta`, service `tta-web` |
| `<ORG>` | `litt1estar` | Repo is `Litt1eStar/TTA-LandingPage` (personal account) → the image must be made **public** after the first push (Task 8 Step 6) |
| `<IMAGE>` | `tta-landingpage` | Must be lowercase |
| `<PORT>` | `80` | nginx inside the container |
| `<HEALTH_PATH>` | `/` | Static site; 200 = up |

## Access you need before starting

- [ ] SSH deploy key `cmm_deploy_key` for `deploy@139.59.100.44` (ask the droplet maintainer).
- [ ] Permission to open a PR (or get one merged) in the **CMM-Internship-Hub-Server** repo (for the Caddyfile).
- [ ] Access to GoDaddy DNS for `cmm.works` (or someone who has it).
- [x] GitHub repo exists: `Litt1eStar/TTA-LandingPage`.

## File structure

| File | Action | Responsibility |
|---|---|---|
| `vite.config.js` | Modify | Emit hashed bundles to `dist/static/` |
| `.dockerignore` | Create | Keep `node_modules`, `dist`, `prototype_source`, `.git` out of the build context |
| `Dockerfile` | Create | Multi-stage: build with Node 22, serve with nginx |
| `nginx.conf` | Create | Caching rules + SPA fallback |
| `infra/docker-compose.yml` | Create | Runs `tta-web` on the shared `cmm_default` network |
| `.github/workflows/deploy.yml` | Create | Build → push GHCR → copy compose → restart → smoke check |
| `.gitignore` | Modify | Add `.env` and editor junk |
| *(CMM server repo)* `infra/caddy/Caddyfile` | Modify | Add the `tta.cmm.works` site block |

---

### Task 1: Move Vite bundles out of `/assets/`

**Files:**
- Modify: `vite.config.js`

- [ ] **Step 1: Confirm the collision exists**

Run (Git Bash):
```bash
npm run build && ls dist/assets
```
Expected: hashed files like `index-AbC123.js`, `index-XyZ789.css` **mixed with** `logo.png`, `logo-white.png`. This is the problem.

- [ ] **Step 2: Change the build output directory**

Replace `vite.config.js` with:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Hashed bundles go to /static/ so they can be cached forever without
    // catching the unhashed files in public/assets/ (logos).
    assetsDir: 'static',
  },
})
```

- [ ] **Step 3: Verify**

Run:
```bash
rm -rf dist && npm run build && ls dist dist/static dist/assets
```
Expected:
- `dist/` contains `index.html  assets  static  uploads`
- `dist/static/` contains only hashed `.js`/`.css` files
- `dist/assets/` contains only `logo.png  logo-white.png`

Then `npm run preview`, open `http://localhost:4173`, confirm logos and news images render.

- [ ] **Step 4: Commit**

```bash
git add vite.config.js
git commit -m "build: emit hashed bundles to /static to separate them from public assets"
```
(This is the repo's first commit if nothing has been committed yet — that's fine. If you want the existing source in the first commit instead, run `git add .gitignore index.html package.json package-lock.json vite.config.js src public MIGRATION_PLAN.md DEPLOYMENT_GUIDE.md && git commit -m "Initial commit: TTA landing page"` first. Decide whether `prototype_source/` belongs in git; it is not needed for deploy.)

---

### Task 2: Docker image (Dockerfile, nginx.conf, .dockerignore)

**Files:**
- Create: `.dockerignore`, `Dockerfile`, `nginx.conf`

- [ ] **Step 1: Create `.dockerignore`**

```
node_modules
dist
prototype_source
.git
.github
docs
*.md
.env
```

- [ ] **Step 2: Create `Dockerfile`**

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

- [ ] **Step 3: Create `nginx.conf`**

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Hashed Vite bundles: safe to cache forever.
    location /static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files $uri =404;
    }

    # Unhashed images from public/: cache a week, so replaced images show up.
    location ~ ^/(assets|uploads)/ {
        add_header Cache-Control "public, max-age=604800";
        try_files $uri =404;
    }

    location / {
        add_header Cache-Control "no-cache";
        try_files $uri $uri/ /index.html;
    }
}
```
Compression is intentionally absent — Caddy does it (`encode zstd gzip`).

- [ ] **Step 4: Build and run locally (needs Docker Desktop running)**

```bash
docker build -t tta-web:local .
docker run --rm -d -p 8080:80 --name tta-web-test tta-web:local
```
Expected: build succeeds; container starts.

- [ ] **Step 5: Verify caching and SPA fallback**

```bash
curl -sI http://localhost:8080/ | grep -i cache-control
# Expected: Cache-Control: no-cache

JS=$(docker exec tta-web-test ls /usr/share/nginx/html/static | grep '\.js$' | head -1)
curl -sI http://localhost:8080/static/$JS | grep -i cache-control
# Expected: Cache-Control: public, max-age=31536000, immutable

curl -sI http://localhost:8080/assets/logo.png | grep -iE "^HTTP|cache-control"
# Expected: HTTP/1.1 200 OK  and  Cache-Control: public, max-age=604800

curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8080/some/route
# Expected: 200

curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8080/assets/missing.png
# Expected: 404
```
Also open `http://localhost:8080` in a browser and click through the splash, topics modal and login modal.

- [ ] **Step 6: Clean up and commit**

```bash
docker stop tta-web-test
git add .dockerignore Dockerfile nginx.conf
git commit -m "build: add Docker image serving the Vite build from nginx"
```

---

### Task 3: Compose file for the droplet

**Files:**
- Create: `infra/docker-compose.yml`
- Modify: `.gitignore`

- [ ] **Step 1: Create `infra/docker-compose.yml`**

```yaml
name: tta

services:
  tta-web:
    image: ghcr.io/litt1estar/tta-landingpage:latest
    restart: unless-stopped
    expose:
      - "80"

networks:
  default:
    name: cmm_default
    external: true
```
Rules from the guide: service name prefixed `tta-` (CMM already owns `web`/`api`/`caddy`), `expose` never `ports`, no `env_file` (no secrets).

- [ ] **Step 2: Validate syntax**

```bash
docker compose -f infra/docker-compose.yml config
```
Expected: prints the normalised config with no errors (a warning about the external network not existing locally is fine).

- [ ] **Step 3: Harden `.gitignore`**

Replace `.gitignore` with:
```
/node_modules
dist
.env
.env.*
*.local
.DS_Store
cmm_deploy_key*
```
(`cmm_deploy_key*` guards against accidentally committing the SSH key if it is ever stored in this folder.)

- [ ] **Step 4: Commit**

```bash
git add infra/docker-compose.yml .gitignore
git commit -m "infra: add compose file for the CMM droplet"
```

---

### Task 4: Deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create the workflow**

```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: deploy
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push image
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: |
            ghcr.io/litt1estar/tta-landingpage:latest
            ghcr.io/litt1estar/tta-landingpage:${{ github.sha }}

      - name: Copy compose file to droplet
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.DROPLET_HOST }}
          username: ${{ secrets.DROPLET_USER }}
          key: ${{ secrets.DROPLET_SSH_KEY }}
          source: "infra/docker-compose.yml"
          target: "/opt/tta/"
          strip_components: 1

      - name: Deploy over SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.DROPLET_HOST }}
          username: ${{ secrets.DROPLET_USER }}
          key: ${{ secrets.DROPLET_SSH_KEY }}
          script: |
            cd /opt/tta
            docker compose pull
            docker compose up -d --remove-orphans
            docker image prune -f

      - name: Smoke check
        run: |
          # Retries cover a first boot, while Caddy is still getting the certificate.
          curl -fsS --retry 10 --retry-delay 5 --retry-all-errors https://tta.cmm.works/ | grep -q 'id="root"'
```
Differences from the guide template: `workflow_dispatch` added (lets you re-run manually from the Actions tab), and the smoke check greps for the app's root div so a Caddy error page can't pass as success.

- [ ] **Step 2: Commit (do NOT push yet — the server must be ready first)**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add deploy workflow for the CMM droplet"
```

---

### Task 5: DNS record

No repo changes.

- [ ] **Step 1: Add the record** — GoDaddy → My Products → cmm.works → DNS → Add:

| Type | Name | Value |
|---|---|---|
| `A` | `tta` | `139.59.100.44` |

Do **not** add an `AAAA` record (breaks Let's Encrypt).

- [ ] **Step 2: Verify**

```bash
nslookup tta.cmm.works 8.8.8.8
```
Expected: `Address: 139.59.100.44`. Do not continue past Task 7 until this works.

---

### Task 6: Prepare the droplet

- [ ] **Step 1: SSH in**

```bash
ssh -i ./cmm_deploy_key deploy@139.59.100.44
```

- [ ] **Step 2: Create the project folder and check prerequisites**

```bash
sudo mkdir -p /opt/tta && sudo chown deploy:deploy /opt/tta
docker network ls | grep cmm
free -h && docker stats --no-stream
```
Expected:
- `docker network ls` shows `cmm_default`. **If the name differs**, update `networks.default.name` in `infra/docker-compose.yml` and amend the Task 3 commit.
- At least ~100 MB free memory (an nginx container uses ~5–10 MB).

No `.env` is needed.

---

### Task 7: Caddy site block (in the CMM server repo)

**Files:**
- Modify: `infra/caddy/Caddyfile` in **CMM-Internship-Hub-Server** (not this repo)

- [ ] **Step 1: Add the block** (tabs for indentation, matching the existing file):

```caddyfile
tta.cmm.works {
	encode zstd gzip
	reverse_proxy tta-web:80
}
```

- [ ] **Step 2: Validate locally**

From the CMM server repo root:
```bash
docker run --rm -v "$PWD/infra/caddy:/etc/caddy:ro" caddy:2-alpine caddy validate --config /etc/caddy/Caddyfile
```
Expected: `Valid configuration`.

- [ ] **Step 3: Open a PR, get it merged to `main`.** Its own workflow copies the Caddyfile and reloads Caddy.

- [ ] **Step 4: Verify the certificate was issued**

```bash
curl -sI https://tta.cmm.works/ | head -1
```
Expected: `HTTP/2 502` — correct at this stage (valid HTTPS, but `tta-web` doesn't exist yet). A TLS error instead means DNS/cert trouble: check `ssh ... "docker compose -f /opt/cmm/docker-compose.yml logs --tail 50 caddy"`. Test from mobile data if on campus Wi-Fi (Fortinet re-signs certs).

---

### Task 8: GitHub repo, secrets, first deploy

- [ ] **Step 1: Create the repo** `litt1estar/tta-landingpage` on GitHub (empty — no README/licence, so the first push is clean).

- [ ] **Step 2: Add repository secrets** (Settings → Secrets and variables → Actions):

| Secret | Value |
|---|---|
| `DROPLET_HOST` | `139.59.100.44` |
| `DROPLET_USER` | `deploy` |
| `DROPLET_SSH_KEY` | full contents of `cmm_deploy_key` (including the `BEGIN`/`END` lines) |

- [ ] **Step 3: Push**

```bash
git remote add origin https://github.com/litt1estar/tta-landingpage.git
git push -u origin main
```

- [ ] **Step 4: Watch the run**

```bash
gh run watch
```
Expected: all steps green, including Smoke check.

- [ ] **Step 5: Verify on the droplet**

```bash
ssh -i ./cmm_deploy_key deploy@139.59.100.44 "cd /opt/tta && docker compose ps"
```
Expected: `tta-web` with status `Up`.

- [ ] **Step 6: Make the image public (required — repo is on a personal account)** — the droplet's GHCR token can't read private packages outside the CMM org, so the first run's "Deploy over SSH" step fails with `unauthorized` on `docker compose pull`. The site has no secrets, so: GitHub → your profile → Packages → `tta-landingpage` → Package settings → Change visibility → **Public**. Then re-run: `gh run rerun --failed`.

---

### Task 9: Post-deploy verification

- [ ] **Step 1: Headers through Caddy**

```bash
curl -sI -H "Accept-Encoding: gzip" https://tta.cmm.works/ | grep -iE "^HTTP|cache-control|content-encoding"
```
Expected: `HTTP/2 200`, `cache-control: no-cache`, `content-encoding: gzip` (or `zstd`).

```bash
curl -sI http://tta.cmm.works/ | head -1
```
Expected: `HTTP/1.1 308 Permanent Redirect` (Caddy's HTTP→HTTPS).

- [ ] **Step 2: Manual browser check** on desktop and phone: intro splash, Thai font (Anuphan) loads, stats count up, topic modal tabs, schedule, news images, login modal, refresh on page keeps working.

- [ ] **Step 3: Confirm auto-deploy** — make a trivial visible change (e.g. a footer text tweak), commit, `git push`, watch `gh run watch`, reload the site and see the change.

---

### Task 10 (optional): Absolute `og:image` for social previews

Facebook/LINE ignore relative `og:image` URLs, so shared links show no logo.

**Files:**
- Modify: `index.html:14`

- [ ] **Step 1:** Change
```html
<meta property="og:image" content="/assets/logo.png" />
```
to
```html
<meta property="og:image" content="https://tta.cmm.works/assets/logo.png" />
<meta property="og:url" content="https://tta.cmm.works/" />
```
- [ ] **Step 2:** `npm run build` succeeds; commit `git commit -am "seo: absolute og:image URL"`; push; check with https://developers.facebook.com/tools/debug/.

---

## Operations cheat-sheet

**Rollback to a previous build** (each deploy is also tagged with its commit SHA):
```bash
ssh -i ./cmm_deploy_key deploy@139.59.100.44
cd /opt/tta
docker pull ghcr.io/litt1estar/tta-landingpage:<good-sha>
docker tag ghcr.io/litt1estar/tta-landingpage:<good-sha> ghcr.io/litt1estar/tta-landingpage:latest
docker compose up -d
```
Better long-term: `git revert` the bad commit and push, so `main` matches what's live.

**Logs:** `cd /opt/tta && docker compose logs --tail 100 tta-web`

**Never** run `docker compose down -v` in `/opt/cmm` (wipes every site's certificates).

**Removing the site:** remove the Caddy block (PR in CMM server repo) → `cd /opt/tta && docker compose down && rm -rf /opt/tta` → delete DNS record and repo secrets.
