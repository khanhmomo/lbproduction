'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { driveImgFallback } from '../../../lib/driveImage';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');
  const [lightboxIdx, setLightboxIdx] = useState(null);

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
      <main className="min-h-screen bg-dark text-white flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Link href="/" className="text-gold-400 hover:underline">
            ← Về trang chủ
          </Link>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-dark text-white flex items-center justify-center">
        <p className="text-gray-400">Đang tải dự án...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark text-white">
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            LB<span className="text-gold-400">Production</span>
          </Link>
          <Link href="/projects" className="text-gold-400 hover:underline text-sm">
            ← Tất cả dự án
          </Link>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <img
          src={project.imageUrl || project.images?.[0]}
          alt={project.title}
          onError={driveImgFallback}
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
          <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
            {project.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mt-3">
            {project.title}
          </h1>
          {project.client && (
            <p className="text-sm text-gray-300 mt-4">
              Khách hàng: {project.client}
            </p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 text-center">
        <div className="text-gray-300 leading-loose max-w-3xl mx-auto whitespace-pre-line">
          {project.description}
        </div>
      </section>

      {videos.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div
            className={
              videos.length === 1
                ? 'max-w-4xl mx-auto'
                : 'grid md:grid-cols-2 gap-6'
            }
          >
            {videos.map((v, idx) => (
              <div
                key={v.id || idx}
                className="rounded-2xl overflow-hidden border border-white/5 aspect-video bg-zinc-900"
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

      {images.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <h2 className="text-2xl font-bold mb-8">
            Hình ảnh <span className="text-gold-400">dự án</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((url, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIdx(idx)}
                className="block rounded-2xl overflow-hidden border border-white/5 hover:border-gold-400/50 transition cursor-zoom-in"
              >
                <img
                  src={url}
                  alt={`${project.title} - ảnh ${idx + 1}`}
                  loading="lazy"
                  onError={driveImgFallback}
                  className="w-full h-64 object-cover hover:scale-105 transition duration-500"
                />
              </button>
            ))}
          </div>
        </section>
      )}

      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
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
            src={images[lightboxIdx]}
            alt={`${project.title} - ảnh ${lightboxIdx + 1}`}
            onError={driveImgFallback}
            className="max-h-[85vh] max-w-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="absolute bottom-6 text-sm text-gray-400">
            {lightboxIdx + 1} / {images.length}
          </span>
        </div>
      )}

      <footer className="py-10 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>&copy; 2024 LBProduction. All rights reserved.</p>
      </footer>
    </main>
  );
}
