'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { driveImgFallback } from '../../lib/driveImage';

// Chuyển link YouTube (watch / youtu.be / shorts / embed) sang dạng embed
const toYoutubeEmbed = (url) => {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/
  );
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
};

const emptyForm = {
  title: '',
  category: '',
  excerpt: '',
  description: '',
  imageUrl: '',
  client: '',
  driveFolder: '',
  youtubeUrl: '',
};

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [driveImages, setDriveImages] = useState([]);
  const [driveVideos, setDriveVideos] = useState([]);
  const [driveLoading, setDriveLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('lb-admin-auth') === 'ok') {
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    if (auth) loadProjects();
  }, [auth]);

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const login = () => {
    if (password === 'lb2024') {
      localStorage.setItem('lb-admin-auth', 'ok');
      setAuth(true);
    } else {
      alert('Mật khẩu không đúng');
    }
  };

  const logout = () => {
    localStorage.removeItem('lb-admin-auth');
    setAuth(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchDriveImages = async () => {
    if (!form.driveFolder) {
      alert('Nhập link folder Drive trước');
      return;
    }
    setDriveLoading(true);
    try {
      const res = await fetch(
        `/api/drive?folder=${encodeURIComponent(form.driveFolder)}`
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setDriveImages(data.images);
      setDriveVideos(data.videos || []);
      if (data.images.length && !form.imageUrl) {
        setForm((f) => ({ ...f, imageUrl: data.images[0].url }));
      }
      if (!data.images.length && !(data.videos || []).length) {
        alert('Không tìm thấy file ảnh/video nào trong folder');
      }
    } catch (e) {
      alert(e.message || 'Không đọc được folder Drive');
    } finally {
      setDriveLoading(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setDriveImages([]);
    setDriveVideos([]);
    setEditingId(null);
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    const yt = (p.videos || []).find((v) =>
      v.embedUrl?.includes('youtube.com/embed/')
    );
    const ytId = yt?.embedUrl.match(/embed\/([\w-]+)/)?.[1];
    setForm({
      title: p.title || '',
      category: p.category || '',
      excerpt: p.excerpt || '',
      description: p.description || '',
      imageUrl: p.imageUrl || '',
      client: p.client || '',
      driveFolder: p.driveFolder || '',
      youtubeUrl: ytId ? `https://youtu.be/${ytId}` : '',
    });
    setDriveImages(
      (p.images || []).map((url) => ({
        id: url,
        name: url.split('/').pop() || 'ảnh',
        url,
      }))
    );
    setDriveVideos(
      (p.videos || []).filter((v) => !v.embedUrl?.includes('youtube.com'))
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        editingId ? `/api/projects?id=${editingId}` : '/api/projects',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            images: driveImages.map((i) => i.url),
            videos: [
              ...driveVideos,
              ...(toYoutubeEmbed(form.youtubeUrl)
                ? [
                    {
                      id: 'youtube',
                      name: 'YouTube',
                      embedUrl: toYoutubeEmbed(form.youtubeUrl),
                    },
                  ]
                : []),
            ],
          }),
        }
      );
      resetForm();
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc muốn xóa dự án này?')) return;
    try {
      await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  if (!auth) {
    return (
      <main className="min-h-screen text-white flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-zinc-900 p-8 rounded-2xl border border-white/10">
          <h1 className="text-2xl font-bold mb-6 text-center">
            LB<span className="text-gold-400">Production</span> Admin
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            className="w-full p-3 mb-4 bg-dark border border-white/10 rounded focus:border-gold-400 outline-none"
          />
          <button
            onClick={login}
            className="w-full py-3 bg-gold-400 text-black font-semibold rounded hover:bg-gold-500 transition"
          >
            Đăng nhập
          </button>
          <Link href="/" className="block mt-4 text-center text-gold-400 hover:underline">
            ← Về trang chủ
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold">
            Quản lý <span className="text-gold-400">dự án</span>
          </h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gold-400 hover:underline">
              ← Về trang chủ
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm border border-white/20 rounded hover:bg-white/10 transition"
            >
              Đăng xuất
            </button>
          </div>
        </div>

        {editingId && (
          <p className="mb-4 text-gold-400 text-sm">
            Đang chỉnh sửa dự án — bấm "Hủy" để quay lại chế độ thêm mới.
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6 bg-zinc-900 p-6 rounded-2xl border border-white/5 mb-10"
        >
          <input
            required
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Tên dự án"
            className="w-full p-3 bg-dark border border-white/10 rounded focus:border-gold-400 outline-none"
          />
          <input
            required
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Danh mục (VD: Sự kiện, 3D)"
            className="w-full p-3 bg-dark border border-white/10 rounded focus:border-gold-400 outline-none"
          />
          <input
            name="client"
            value={form.client}
            onChange={handleChange}
            placeholder="Khách hàng"
            className="w-full p-3 bg-dark border border-white/10 rounded focus:border-gold-400 outline-none"
          />
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="URL ảnh đại diện (tự điền từ Drive)"
            className="w-full p-3 bg-dark border border-white/10 rounded focus:border-gold-400 outline-none"
          />
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
            <input
              name="driveFolder"
              value={form.driveFolder}
              onChange={handleChange}
              placeholder="Link Google Drive folder (đã share công khai)"
              className="flex-1 p-3 bg-dark border border-white/10 rounded focus:border-gold-400 outline-none"
            />
            <button
              type="button"
              onClick={fetchDriveImages}
              disabled={driveLoading}
              className="px-6 py-3 border border-gold-400 text-gold-400 font-semibold rounded hover:bg-gold-400 hover:text-black transition disabled:opacity-50"
            >
              {driveLoading ? 'Đang tải...' : 'Lấy ảnh từ Drive'}
            </button>
          </div>
          <input
            name="youtubeUrl"
            value={form.youtubeUrl}
            onChange={handleChange}
            placeholder="Link YouTube (tùy chọn, VD: https://youtu.be/...)"
            className="w-full md:col-span-2 p-3 bg-dark border border-white/10 rounded focus:border-gold-400 outline-none"
          />
          {driveVideos.length > 0 && (
            <div className="md:col-span-2">
              <p className="text-sm text-gray-400 mb-2">
                Video ({driveVideos.length}):
              </p>
              <ul className="text-sm text-gold-400 space-y-1">
                {driveVideos.map((v) => (
                  <li key={v.id}>• {v.name}</li>
                ))}
              </ul>
            </div>
          )}
          {driveImages.length > 0 && (
            <div className="md:col-span-2">
              <p className="text-sm text-gray-400 mb-3">
                Đã tìm thấy {driveImages.length} ảnh —{" "}
                <span className="text-gold-400">
                  bấm vào ảnh để chọn làm ảnh đại diện
                </span>
                :
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {driveImages.map((img) => {
                  const isCover = form.imageUrl === img.url;
                  return (
                    <button
                      type="button"
                      key={img.id}
                      onClick={() =>
                        setForm((f) => ({ ...f, imageUrl: img.url }))
                      }
                      className={`relative rounded overflow-hidden border-2 transition ${
                        isCover
                          ? 'border-gold-400 ring-2 ring-gold-400/40'
                          : 'border-white/10 hover:border-gold-400/50'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        loading="lazy"
                        onError={driveImgFallback}
                        className="w-full h-20 object-cover"
                      />
                      {isCover && (
                        <span className="absolute bottom-0 inset-x-0 bg-gold-400 text-black text-[10px] font-semibold py-0.5 text-center">
                          Ảnh đại diện
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <input
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Mô tả ngắn (hiện ở card ngoài trang chủ)"
            className="w-full md:col-span-2 p-3 bg-dark border border-white/10 rounded focus:border-gold-400 outline-none"
          />
          <textarea
            required
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="Nội dung chi tiết (hiện trong trang dự án)"
            className="w-full md:col-span-2 p-3 bg-dark border border-white/10 rounded focus:border-gold-400 outline-none"
          ></textarea>
          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="px-8 py-3 bg-gold-400 text-black font-semibold rounded hover:bg-gold-500 transition"
            >
              {editingId ? 'Cập nhật dự án' : 'Thêm dự án'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-3 border border-white/20 rounded hover:bg-white/10 transition"
              >
                Hủy
              </button>
            )}
          </div>
        </form>

        <ul className="space-y-4">
          {projects.map((p) => (
            <li
              key={p.id}
              className="flex flex-col md:flex-row md:items-center justify-between bg-zinc-900 p-4 rounded-xl border border-white/5"
            >
              <div>
                <h3 className="text-lg font-semibold text-gold-400">{p.title}</h3>
                <p className="text-sm text-gray-400">
                  {p.category} {p.client ? `- ${p.client}` : ''}
                  {p.images?.length ? ` · ${p.images.length} ảnh` : ''}
                  {p.videos?.length ? ` · ${p.videos.length} video` : ''}
                </p>
              </div>
              <div className="mt-3 md:mt-0 flex gap-2">
                <button
                  onClick={() => startEdit(p)}
                  className="px-4 py-2 text-sm text-gold-400 border border-gold-400 rounded hover:bg-gold-400 hover:text-black transition"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-4 py-2 text-sm text-red-400 border border-red-400 rounded hover:bg-red-400 hover:text-white transition"
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
