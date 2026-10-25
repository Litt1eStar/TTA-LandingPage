// Official sponsors shown in the sticky bar at the bottom of the screen.
// These are mockup logos (public/sponsors/sponsor-NN.svg) until the real files arrive from
// พี่เอ็ม's Drive: replace each entry's name and logo, keeping the logo about 200×64.
export const sponsorsData = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return { name: `Sponsor ${n}`, logo: `/sponsors/sponsor-${n}.svg` };
});
