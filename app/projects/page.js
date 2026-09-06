'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProjectCard from '../../components/ProjectCard';
import Reveal from '../../components/Reveal';
import { driveImgFallback } from '../../lib/driveImage';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Tất cả');

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Failed to load projects', err))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    'Tất cả',
    ...new Set(projects.map((p) => p.category).filter(Boolean)),
  ];
  const filtered =
    filter === 'Tất cả'
      ? projects
      : projects.filter((p) => p.category === filter);
  const [featured, ...rest] = filtered;

  return (
    <main className="min-h-screen bg-dark text-white">
      <Navbar />

      <section className="relative pt-32 pb-12 px-6 overflow-hidden">
        <span className="absolute top-14 left-1/2 -translate-x-1/2 text-[10rem] md:text-[16rem] font-black text-outline opacity-[0.06] select-none pointer-events-none leading-none whitespace-nowrap">
          WORKS
        </span>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-400/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto text-center">
          <Reveal>
            <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-4">
              Showcase
            </p>
            <h1 className="text-4xl md:text-6xl font-bold">
              Dự án <span className="text-gradient-gold">của chúng tôi</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">
              Mỗi dự án là một câu chuyện được kể bằng hình ảnh — khám phá những
              sự kiện và sản phẩm media mà LB Production đã kiến tạo.
            </p>
          </Reveal>
          {categories.length > 2 && (
            <Reveal delay={200}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`px-5 py-2 rounded-full text-sm font-medium border backdrop-blur transition ${
                      filter === c
                        ? 'bg-gold-400 text-black border-gold-400 shadow-[0_0_25px_rgba(245,197,24,0.35)]'
                        : 'glass text-gray-300 hover:border-gold-400/60 hover:text-gold-400'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Film strip divider */}
      <div className="film-strip h-10 opacity-50" />

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <p className="text-center text-gray-400">Đang tải dự án...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400">Chưa có dự án nào.</p>
        ) : (
          <>
            {featured && (
              <Reveal>
                <Link
                  href={`/projects/${featured.id}`}
                  className="group relative block h-[380px] md:h-[520px] rounded-2xl overflow-hidden border border-white/5 hover:border-gold-400/50 hover:shadow-[0_0_60px_rgba(245,197,24,0.15)] transition mb-8"
                >
                <img
                  src={featured.imageUrl || featured.images?.[0]}
                  alt={featured.title}
                  onError={driveImgFallback}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-8 md:p-12">
                  <span className="text-gold-400 text-xs uppercase tracking-wider font-semibold">
                    {featured.category}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold mt-3">
                    {featured.title}
                  </h2>
                  <p className="text-gray-300 mt-4 max-w-2xl line-clamp-2">
                    {featured.excerpt || featured.description}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-6 text-gold-400 font-semibold">
                    Xem dự án
                    <span className="group-hover:translate-x-1 transition">
                      →
                    </span>
                  </span>
                </div>
                </Link>
              </Reveal>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((project, idx) => (
                <Reveal key={project.id} delay={(idx % 3) * 120}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
