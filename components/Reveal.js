'use client';

import { useEffect, useRef, useState } from 'react';

const variants = {
  up: 'translate-y-10',
  left: '-translate-x-10',
  right: 'translate-x-10',
  scale: 'scale-90',
};

// Hiệu ứng xuất hiện khi cuộn tới (fade + trượt/scale, easing expo)
export default function Reveal({
  children,
  delay = 0,
  className = '',
  variant = 'up',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ${
        visible
          ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
          : `opacity-0 ${variants[variant] || variants.up}`
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}
