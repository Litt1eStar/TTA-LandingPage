import React from 'react';
import { sponsorsData } from '../data/sponsorsData';

// Sticky sponsor bar along the bottom of the screen. The logo row is rendered twice and slid
// left by half its width, so the loop is seamless (see .sponsor-track in index.css).
export default function Sponsors() {
  return (
    <aside className="sponsor-bar" aria-label="Official sponsors">
      <div className="sponsor-label">
        <span>OFFICIAL</span>
        <span>SPONSORS</span>
      </div>

      <div className="sponsor-viewport">
        <ul className="sponsor-track">
          {[0, 1].map((copy) =>
            sponsorsData.map((s) => (
              <li key={`${copy}-${s.name}`} aria-hidden={copy === 1 ? 'true' : undefined}>
                <img src={s.logo} alt={copy === 0 ? s.name : ''} loading="lazy" />
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  );
}
