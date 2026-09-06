'use client';

import Link from 'next/link';
import { driveImgFallback } from '../lib/driveImage';

export default function ProjectCard({ project }) {
  const cover = project.imageUrl || project.images?.[0];
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative block h-80 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-400/50 transition"
    >
      <img
        src={cover}
        alt={project.title}
        onError={driveImgFallback}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
      {project.images?.length > 1 && (
        <span className="absolute top-4 right-4 bg-dark/80 text-gold-400 text-xs px-2 py-1 rounded">
          +{project.images.length - 1} ảnh
        </span>
      )}
      <div className="absolute bottom-0 inset-x-0 p-6">
        <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
          {project.category}
        </span>
        <h3 className="text-xl font-bold mt-2">{project.title}</h3>
        <p className="text-gray-300 text-sm mt-2 line-clamp-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
          {project.excerpt || project.description}
        </p>
      </div>
    </Link>
  );
}
