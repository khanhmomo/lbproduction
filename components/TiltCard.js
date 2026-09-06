'use client';

import { useRef } from 'react';

// Card nghiêng 3D theo con trỏ chuột
export default function TiltCard({ children, className = '', max = 8 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(
      2
    )}deg) rotateY(${(x * max).toFixed(2)}deg) translateY(-4px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${className} transition-transform duration-300 will-change-transform`}
    >
      {children}
    </div>
  );
}
