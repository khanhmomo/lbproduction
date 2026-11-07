'use client';

import Link from 'next/link';
import { driveImgFallback } from '../lib/driveImage';

export default function ProjectCard({ project }) {
  const cover = project.imageUrl || project.images?.[0];
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative block h-80 rounded-3xl overflow-hidden border border-white/[0.06] hover:border-gold-400/40 hover:shadow-[0_20px_60px_rgba(245,197,24,0.12)] transition duration-500"
    >
      <img
        src={cover}
        alt={project.title}
        onError={driveImgFallback}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out-expo"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-darker via-dark/30 to-transparent" />

      {/* Nút mũi tên hiện khi hover */}
      <span className="absolute top-5 right-5 w-10 h-10 rounded-full glass flex items-center justify-center text-gold-400 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
        </svg>
      </span>

      {project.images?.length > 1 && (
        <span className="absolute top-5 left-5 bg-darker/70 backdrop-blur text-gold-300 text-xs px-3 py-1.5 rounded-full border border-white/10">
          +{project.images.length - 1} ảnh
        </span>
      )}

      <div className="absolute bottom-0 inset-x-0 p-6">
        <span className="inline-block text-[11px] uppercase tracking-[0.2em] text-gold-300 font-semibold bg-gold-400/10 border border-gold-400/20 rounded-full px-3 py-1">
          {project.category}
        </span>
        <h3 className="text-xl font-bold mt-3 tracking-tight">{project.title}</h3>
        <p className="text-gray-300 text-sm mt-2 line-clamp-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
          {project.excerpt || project.description}
        </p>
      </div>
    </Link>
  );
}
