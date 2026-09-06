'use client';

import { useEffect, useRef } from 'react';

// Particles bụi vàng — vị trí cố định để tránh hydration mismatch
const particles = [
  { l: '8%', t: '18%', s: 3, d: '0s', dur: '8s' },
  { l: '15%', t: '62%', s: 2, d: '-2s', dur: '10s' },
  { l: '22%', t: '38%', s: 4, d: '-4s', dur: '9s' },
  { l: '30%', t: '80%', s: 2, d: '-1s', dur: '11s' },
  { l: '38%', t: '12%', s: 3, d: '-5s', dur: '8s' },
  { l: '45%', t: '55%', s: 2, d: '-3s', dur: '12s' },
  { l: '52%', t: '28%', s: 4, d: '-6s', dur: '9s' },
  { l: '60%', t: '72%', s: 2, d: '-2s', dur: '10s' },
  { l: '66%', t: '15%', s: 3, d: '-7s', dur: '8s' },
  { l: '72%', t: '48%', s: 2, d: '-4s', dur: '11s' },
  { l: '80%', t: '85%', s: 3, d: '-1s', dur: '9s' },
  { l: '86%', t: '30%', s: 2, d: '-5s', dur: '10s' },
  { l: '92%', t: '60%', s: 4, d: '-3s', dur: '8s' },
  { l: '12%', t: '88%', s: 2, d: '-6s', dur: '12s' },
  { l: '48%', t: '90%', s: 3, d: '-8s', dur: '9s' },
  { l: '95%', t: '10%', s: 2, d: '-2s', dur: '11s' },
];

// Nền động dùng chung: aurora + parallax + particles + beams + grid + noise
export default function BackgroundFX() {
  const slowRef = useRef(null);
  const fastRef = useRef(null);

  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (slowRef.current)
          slowRef.current.style.transform = `translateY(${y * 0.12}px)`;
        if (fastRef.current)
          fastRef.current.style.transform = `translateY(${y * -0.06}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-darker" aria-hidden>
      {/* Layer parallax chậm — aurora orbs */}
      <div ref={slowRef} className="absolute inset-0 will-change-transform">
        <div className="absolute -top-48 -left-48 w-[520px] h-[520px] rounded-full bg-gold-400/12 blur-[90px] animate-aurora" />
        <div
          className="absolute top-1/4 -right-48 w-[440px] h-[440px] rounded-full bg-violet-600/12 blur-[100px] animate-aurora"
          style={{ animationDelay: '-6s' }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[440px] h-[440px] rounded-full bg-cyan-500/8 blur-[100px] animate-aurora"
          style={{ animationDelay: '-11s' }}
        />
      </div>

      {/* Layer parallax ngược — rings + beams */}
      <div ref={fastRef} className="absolute inset-0 will-change-transform">
        {/* Vòng tròn xoay */}
        <div className="absolute top-[15%] -left-40 w-[380px] h-[380px] rounded-full border border-gold-400/10 animate-spin-slow" />
        <div
          className="absolute top-[60%] -right-32 w-[300px] h-[300px] rounded-full border border-dashed border-gold-400/15 animate-spin-slow"
          style={{ animationDirection: 'reverse' }}
        />
        {/* Light beams chéo */}
        <div className="absolute top-[-20%] left-[20%] w-px h-[140%] bg-gradient-to-b from-transparent via-gold-400/15 to-transparent rotate-[24deg]" />
        <div className="absolute top-[-20%] left-[55%] w-px h-[140%] bg-gradient-to-b from-transparent via-gold-400/10 to-transparent rotate-[24deg]" />
        <div className="absolute top-[-20%] left-[80%] w-px h-[140%] bg-gradient-to-b from-transparent via-white/8 to-transparent rotate-[24deg]" />
      </div>

      {/* Particles bụi vàng */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold-300 animate-drift"
          style={{
            left: p.l,
            top: p.t,
            width: p.s,
            height: p.s,
            animationDelay: p.d,
            animationDuration: p.dur,
            boxShadow: '0 0 8px rgba(245,197,24,0.6)',
          }}
        />
      ))}

      {/* Lưới mờ */}
      <div className="absolute inset-0 grid-floor opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      {/* Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.05]" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,5,5,0.7)_100%)]" />
    </div>
  );
}
