'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const heroImages = [
  '/hero/hero-1.jpg',
  '/hero/hero-2.jpg',
  '/hero/hero-3.jpg',
  '/hero/hero-4.jpg',
  '/hero/hero-5.jpg',
];

const services = [
  {
    title: 'Sản xuất hình ảnh',
    desc: 'Triển khai dịch vụ sản xuất hình ảnh và video sự kiện, giúp lưu giữ toàn bộ diễn biến một cách chân thật và có giá trị sử dụng lâu dài.',
    points: [
      'Chụp ảnh sự kiện',
      'Quay video highlight & recap',
      'Livestream',
      'Ghi nhận các khoảnh khắc quan trọng',
    ],
  },
  {
    title: 'Thiết kế ấn phẩm',
    desc: 'Cung cấp dịch vụ thiết kế ấn phẩm truyền thông, duy trì sự nhất quán về nhận diện thương hiệu trên mọi điểm chạm.',
    points: [
      'Key visual, backdrop, banner',
      'Social post, invitation letter',
      'Motion 2D - 3D',
      'Đảm bảo tính thẩm mỹ và nhất quán nhận diện thương hiệu',
    ],
  },
];

const departments = [
  {
    title: 'Đội ngũ sáng tạo',
    desc: 'Xây dựng concept và định hướng hình ảnh tổng thể cho mỗi dự án.',
  },
  {
    title: 'Đội ngũ sản xuất',
    desc: 'Ghi hình ảnh, xử lý tình huống và đảm bảo tiến độ thực tế tại sự kiện.',
  },
  {
    title: 'Thiết kế & hậu kỳ',
    desc: 'Hoàn thiện sản phẩm cuối cùng chỉnh chu, nhất quán và chuyên nghiệp.',
  },
];

const reasons = [
  {
    title: 'Đồng bộ',
    desc: 'Mọi sản phẩm đều sử dụng một ngôn ngữ thống nhất, đảm bảo hình ảnh và nội dung thương hiệu nhất quán trên từng điểm chạm.',
  },
  {
    title: 'Đẳng cấp',
    desc: 'Chất lượng chúng tôi tạo ra định hình tiêu chuẩn. Mỗi sản phẩm phản ánh sự chỉnh chu, tinh tế và tiêu chuẩn cao trong từng chi tiết.',
  },
  {
    title: 'Tác động',
    desc: 'Chúng tôi tạo ra giá trị vượt khỏi khoảnh khắc. Sản phẩm không chỉ phục vụ sự kiện mà còn có giá trị lâu dài trong truyền thông.',
  },
  {
    title: 'Chính xác',
    desc: 'Những gì chúng tôi tạo ra luôn được thực thi trọn vẹn, triển khai đúng tiến độ, đúng chất lượng.',
  },
  {
    title: 'Linh hoạt',
    desc: 'Chúng tôi vững vàng trong mọi tình huống, chủ động xử lý và thích ứng nhanh trong mọi điều kiện.',
  },
];

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setHeroIdx((i) => (i + 1) % heroImages.length),
      4000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <main className="min-h-screen bg-dark text-white">
      <Navbar />

      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden px-6"
      >
        {heroImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === heroIdx ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-dark/70" />
        <div className="relative text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Kiến tạo <span className="text-gold-400">trải nghiệm</span>
            <br />
            không giới hạn
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            LBProduction cung cấp giải pháp media, 3D visual và tổ chức sự kiện
            chuyên nghiệp.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/projects"
              className="px-8 py-3 bg-gold-400 text-black font-semibold rounded hover:bg-gold-500 transition"
            >
              Xem dự án
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-gold-400 text-gold-400 font-semibold rounded hover:bg-gold-400 hover:text-black transition"
            >
              Liên hệ ngay
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              aria-label={`Ảnh ${i + 1}`}
              className={`w-2 h-2 rounded-full transition ${
                i === heroIdx ? 'bg-gold-400' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Về <span className="text-gold-400">LBProduction</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Được thành lập từ niềm đam mê sáng tạo và kể chuyện bằng hình ảnh,
              LBProduction đã đồng hành cùng nhiều thương hiệu lớn để mang đến
              những sự kiện và sản phẩm media đầy ấn tượng. Chúng tôi tin rằng
              mỗi sự kiện là một câu chuyện đáng được kể theo cách riêng.
            </p>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden border border-gold-400/20">
            <img
              src="/about.jpg"
              alt="Về LBProduction"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-zinc-900 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Dịch vụ <span className="text-gold-400">của chúng tôi</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s, idx) => (
              <div
                key={idx}
                className="p-8 bg-dark rounded-2xl border border-white/5 hover:border-gold-400/50 transition"
              >
                <h3 className="text-xl font-semibold mb-4 text-gold-400">
                  {s.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{s.desc}</p>
                <ul className="space-y-2">
                  {s.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-gold-400 mt-1">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-400/10 rounded-full blur-[140px]" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <p className="text-center text-gold-400 text-xs uppercase tracking-[0.3em] mb-4">
            Tại sao chọn chúng tôi
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Lý do <span className="text-gold-400">lựa chọn LBProduction</span>
          </h2>
          <p className="text-center text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed">
            Chúng tôi mang đến sự kết hợp giữa sáng tạo, chất lượng và sự linh
            hoạt — giúp thương hiệu của bạn tỏa sáng ở mọi điểm chạm.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {reasons.map((r, idx) => (
              <div
                key={idx}
                className="group relative animate-fade-up"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold-400/70 via-gold-400/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative h-full p-6 bg-zinc-900 rounded-2xl border border-white/5 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(245,197,24,0.12)] transition duration-500">
                  <span className="block text-5xl font-bold text-white/5 group-hover:text-gold-400/25 transition duration-500 mb-4">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-semibold mb-3 text-gold-400">
                    {r.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {r.desc}
                  </p>
                  <div className="mt-5 h-px w-8 bg-gold-400/40 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-24 bg-zinc-900 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[420px] rounded-2xl overflow-hidden border border-gold-400/20">
              <img
                src="/team.jpg"
                alt="Đội ngũ LBProduction"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Đội ngũ <span className="text-gold-400">nhân sự</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-10">
                LBProduction sở hữu đội ngũ nhân sự có kinh nghiệm thực chiến
                trong lĩnh vực media và sự kiện, đồng thời kết hợp giữa tư duy
                sáng tạo và khả năng triển khai thực tế. Nhờ đó, mỗi dự án không
                chỉ được thực hiện đúng tiến độ mà còn đảm bảo chất lượng và
                tính hiệu quả.
              </p>
              <div className="space-y-4">
                {departments.map((d, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-dark rounded-xl border border-white/5 hover:border-gold-400/50 transition flex gap-4"
                  >
                    <span className="text-gold-400 font-bold text-lg">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gold-400 mb-1">
                        {d.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Liên hệ <span className="text-gold-400">với chúng tôi</span>
        </h2>
        <form
          className="space-y-6 bg-zinc-900 p-8 rounded-2xl border border-white/5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Họ tên"
              className="w-full p-4 bg-dark border border-white/10 rounded focus:border-gold-400 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 bg-dark border border-white/10 rounded focus:border-gold-400 outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="Tiêu đề"
            className="w-full p-4 bg-dark border border-white/10 rounded focus:border-gold-400 outline-none"
          />
          <textarea
            rows={5}
            placeholder="Nội dung"
            className="w-full p-4 bg-dark border border-white/10 rounded focus:border-gold-400 outline-none"
          ></textarea>
          <button
            type="submit"
            className="px-8 py-3 bg-gold-400 text-black font-semibold rounded hover:bg-gold-500 transition"
          >
            Gửi tin nhắn
          </button>
        </form>
      </section>

      <Footer />
    </main>
  );
}
