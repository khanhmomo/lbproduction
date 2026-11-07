'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Footer from '../../../components/Footer';
import { driveImgFallback, driveImgSrc } from '../../../lib/driveImage';
import { projectYear } from '../../../lib/format';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');
  const [lightboxIdx, setLightboxIdx] = useState(null);
  // Swipe mobile: x = điểm chạm đầu, swiped = vừa vuốt (chặn click đóng)
  const touchRef = useRef({ x: null, swiped: false });

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Không tải được dự án');
        setProject(data);
      })
      .catch((e) => setError(e.message));
  }, [id]);

  const images = project?.images?.length
    ? project.images
    : project?.imageUrl
      ? [project.imageUrl]
      : [];

  const videos = project?.videos || [];

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight')
        setLightboxIdx((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft')
        setLightboxIdx((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, images.length]);

  if (error) {
    return (
      <main className="min-h-screen bg-darker text-white flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Link href="/projects" className="text-gold-400 hover:underline">
            ← Tất cả dự án
          </Link>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-darker text-white flex items-center justify-center">
        <p className="text-gray-500 tracking-widest text-sm uppercase">
          Đang tải dự án…
        </p>
      </main>
    );
  }

  // Mosaic kiểu profile: 5 ảnh đầu → 2x2 trái + 1 lớn phải; phần còn lại → lưới thường
  const mosaic = images.slice(0, 5);
  const extras = images.slice(5);
  const tile = (idx, className) => (
    <button
      key={idx}
      onClick={() => setLightboxIdx(idx)}
      className={`group relative overflow-hidden cursor-zoom-in ${className}`}
    >
      <img
        src={driveImgSrc(images[idx])}
        alt={`${project.title} - ảnh ${idx + 1}`}
        loading="lazy"
        onError={driveImgFallback}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
      />
      <span className="absolute inset-0 bg-gold-400/0 group-hover:bg-gold-400/10 transition" />
    </button>
  );

  return (
    <main className="min-h-screen bg-darker text-white">
      <nav className="sticky top-0 z-40 bg-darker/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            LB<span className="text-gold-400">Production</span>
          </Link>
          <Link
            href="/projects"
            className="text-xs uppercase tracking-[0.25em] text-gray-400 hover:text-gold-400 transition"
          >
            ← Tất cả dự án
          </Link>
        </div>
      </nav>

      {/* Hairline vàng trên — như PDF */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-400/60 to-gold-400/60 mt-6" />
      </div>

      {/* ===== Header: monogram + title — kiểu trang dự án trong PDF ===== */}
      <header className="max-w-[1400px] mx-auto px-6 pt-14 pb-10">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          {/* Khối logo — chỉ hiện khi có logoUrl */}
          {project.logoUrl && (
            <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 border border-white/20 bg-white flex items-center justify-center p-3">
              <img
                src={driveImgSrc(project.logoUrl)}
                alt={project.client || project.title}
                onError={driveImgFallback}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3">
              {project.category}
              {projectYear(project) && ` ${projectYear(project)}`}
              {project.client && ` — ${project.client}`}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05]">
              {project.title}
            </h1>
          </div>
        </div>
      </header>

      {/* ===== Mosaic ảnh — layout bất đối xứng như PDF ===== */}
      {images.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6">
          {mosaic.length >= 5 ? (
            <div className="grid md:grid-cols-2 gap-2">
              <div className="grid grid-cols-2 gap-2">
                {tile(0, 'aspect-[4/3]')}
                {tile(1, 'aspect-[4/3]')}
                {tile(2, 'aspect-[4/3]')}
                {tile(3, 'aspect-[4/3]')}
              </div>
              {tile(4, 'aspect-[4/3] md:aspect-auto md:min-h-full')}
            </div>
          ) : mosaic.length === 4 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {mosaic.map((_, i) => tile(i, 'aspect-[4/3]'))}
            </div>
          ) : mosaic.length === 3 ? (
            <div className="grid md:grid-cols-2 gap-2">
              {tile(0, 'aspect-[4/3] md:row-span-2 md:aspect-auto md:min-h-full')}
              <div className="grid gap-2">
                {tile(1, 'aspect-[16/9]')}
                {tile(2, 'aspect-[16/9]')}
              </div>
            </div>
          ) : (
            <div
              className={`grid gap-2 ${
                mosaic.length === 2 ? 'md:grid-cols-2' : ''
              }`}
            >
              {mosaic.map((_, i) => tile(i, 'aspect-[16/9]'))}
            </div>
          )}

          {extras.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
              {extras.map((_, i) => tile(i + 5, 'aspect-[4/3]'))}
            </div>
          )}
        </section>
      )}

      {/* ===== Video ===== */}
      {videos.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 mt-14">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Video
            </h2>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div
            className={
              videos.length === 1
                ? 'max-w-4xl mx-auto'
                : 'grid md:grid-cols-2 gap-4'
            }
          >
            {videos.map((v, idx) => (
              <div
                key={v.id || idx}
                className="overflow-hidden border border-white/10 aspect-video bg-black"
              >
                <iframe
                  src={typeof v === 'string' ? v : v.embedUrl}
                  title={v.name || `Video ${idx + 1}`}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== Description — khối text căn đều như trang PDF ===== */}
      {project.description && (
        <section className="max-w-[1400px] mx-auto px-6 mt-14 pb-16">
          <div className="grid md:grid-cols-[220px_1fr] gap-8">
            <div className="flex md:flex-col items-start gap-4">
              <div className="h-px w-16 bg-gold-400/60 md:mt-2 shrink-0" />
              <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400">
                Về dự án
              </h2>
            </div>
            <div className="text-gray-300 leading-loose max-w-3xl whitespace-pre-line text-justify">
              {project.description}
            </div>
          </div>
        </section>
      )}

      {/* Hairline vàng dưới */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="h-px bg-gradient-to-l from-transparent via-gold-400/60 to-gold-400/60 mb-2" />
      </div>

      {/* ===== Lightbox ===== */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => {
            if (touchRef.current.swiped) {
              touchRef.current.swiped = false;
              return;
            }
            setLightboxIdx(null);
          }}
          onTouchStart={(e) => {
            touchRef.current.x = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const startX = touchRef.current.x;
            touchRef.current.x = null;
            if (startX === null || images.length < 2) return;
            const dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 50) {
              touchRef.current.swiped = true;
              setLightboxIdx(
                (i) => (i + (dx < 0 ? 1 : -1) + images.length) % images.length
              );
            }
          }}
        >
          <button
            onClick={() => setLightboxIdx(null)}
            aria-label="Đóng"
            className="absolute top-6 right-6 text-white/70 hover:text-gold-400 text-4xl leading-none"
          >
            &times;
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx(
                    (i) => (i - 1 + images.length) % images.length
                  );
                }}
                aria-label="Ảnh trước"
                className="absolute left-4 md:left-8 text-white/70 hover:text-gold-400 text-5xl leading-none"
              >
                &lsaquo;
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((i) => (i + 1) % images.length);
                }}
                aria-label="Ảnh sau"
                className="absolute right-4 md:right-8 text-white/70 hover:text-gold-400 text-5xl leading-none"
              >
                &rsaquo;
              </button>
            </>
          )}
          <img
            src={driveImgSrc(images[lightboxIdx])}
            alt={`${project.title} - ảnh ${lightboxIdx + 1}`}
            onError={driveImgFallback}
            className="max-h-[85vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="absolute bottom-6 text-xs font-mono tracking-widest text-gray-500">
            {lightboxIdx + 1} / {images.length}
          </span>
        </div>
      )}

      <Footer />
    </main>
  );
}
