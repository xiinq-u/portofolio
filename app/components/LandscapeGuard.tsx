import type { ReactNode } from "react";

export default function LandscapeGuard({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="landscape-content">{children}</div>
      <div className="landscape-guard" role="status" aria-live="polite">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
          <rect x="23" y="13" width="26" height="46" rx="5" stroke="currentColor" strokeWidth="2" transform="rotate(90 36 36)" />
          <path d="M16 21A25 25 0 0 1 56 17M56 17V8M56 17H47" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2>Putar HP kamu</h2>
        <p>Gunakan mode landscape (layar mendatar) untuk melihat portofolio ini.</p>
        <small>Jika layar belum berputar, aktifkan rotasi otomatis di HP kamu.</small>
      </div>
    </>
  );
}
