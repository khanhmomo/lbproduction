'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';

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
  const heroContentRef = useRef(null);

  useEffect(() => {
    const t = setInterval(
      () => setHeroIdx((i) => (i + 1) % heroImages.length),
      4000
    );
    return () => clearInterval(t);
  }, []);

  // Hero content mờ dần + trôi lên khi cuộn xuống
  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = heroContentRef.current;
        if (!el) return;
        const y = window.scrollY;
        el.style.opacity = Math.max(0, 1 - y / 550);
        el.style.transform = `translateY(${y * 0.28}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="min-h-screen bg-dark text-white">
      <Navbar />

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20"
      >
        {/* Slideshow ảnh nền */}
        {heroImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1600ms] ${
              i === heroIdx ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        ))}
        {/* Overlay cinematic */}
        <div className="absolute inset-0 bg-gradient-to-b from-darker/85 via-dark/55 to-darker" />
        {/* Lưới phối cảnh 3D ở chân */}
        <div className="absolute bottom-0 inset-x-0 h-[45%] grid-floor opacity-50 origin-bottom [transform:perspective(700px)_rotateX(62deg)] [mask-image:linear-gradient(to_top,black_30%,transparent)]" />
        {/* Vòng xoay trang trí */}
        <div className="absolute -right-32 top-1/4 w-[420px] h-[420px] rounded-full border border-gold-400/20 animate-spin-slow hidden lg:block" />
        <div className="absolute -right-20 top-1/4 w-[420px] h-[420px] rounded-full border border-dashed border-gold-400/10 animate-spin-slow hidden lg:block" style={{ animationDirection: 'reverse' }} />

        <div
          ref={heroContentRef}
          className="relative text-center max-w-5xl will-change-transform"
        >
          <p className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass text-xs md:text-sm uppercase tracking-[0.35em] text-gold-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse-glow" />
            Motion · 3D Visual · Event
          </p>
          <h1 className="font-black leading-[0.95] tracking-tight">
            <span className="block text-5xl md:text-7xl lg:text-8xl text-outline">
              KIẾN TẠO
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl text-gradient-gold">
              TRẢI NGHIỆM
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl">
              KHÔNG GIỚI HẠN
            </span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            LBProduction — studio chuyên <span className="text-gold-300">motion graphic, 3D visual</span> và
            sản xuất sự kiện. Chúng tôi biến ý tưởng thành những thước phim
            sống động.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/projects"
              className="group relative px-8 py-4 bg-gold-400 text-black font-bold rounded-full overflow-hidden hover:shadow-[0_0_40px_rgba(245,197,24,0.4)] transition"
            >
              <span className="relative z-10">Xem dự án →</span>
            </a>
            <a
              href="#contact"
              className="px-8 py-4 glass text-gold-300 font-semibold rounded-full hover:border-gold-400/60 hover:text-gold-400 transition"
            >
              Liên hệ ngay
            </a>
          </div>
        </div>

        {/* Dots chọn slide */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              aria-label={`Ảnh ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === heroIdx ? 'w-8 bg-gold-400' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-6 h-10 rounded-full border border-white/25 flex justify-center pt-2">
          <span className="w-1 h-2 rounded-full bg-gold-400 animate-scroll-dot" />
        </div>
      </section>

      <section id="about" className="relative py-28 px-6 overflow-hidden">
        <span className="absolute -top-6 right-0 text-[10rem] md:text-[14rem] font-black text-outline opacity-[0.07] select-none pointer-events-none leading-none">
          STUDIO
        </span>
        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal variant="left">
            <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-4">
              Về chúng tôi
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Studio <span className="text-gradient-gold">sáng tạo hình ảnh</span>
              <br />
              chuyên nghiệp
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Được thành lập từ niềm đam mê sáng tạo và kể chuyện bằng hình ảnh,
              LBProduction đã đồng hành cùng nhiều thương hiệu lớn để mang đến
              những sự kiện và sản phẩm media đầy ấn tượng. Chúng tôi tin rằng
              mỗi sự kiện là một câu chuyện đáng được kể theo cách riêng.
            </p>
            <a
              href="/about"
              className="inline-block mt-8 text-gold-400 font-semibold border-b border-gold-400/40 pb-1 hover:border-gold-400 transition"
            >
              Hành trình của chúng tôi →
            </a>
          </Reveal>
          <Reveal delay={150} variant="right">
            <TiltCard className="card-glow rounded-2xl">
              <div className="relative h-96 rounded-2xl overflow-hidden border border-gold-400/20">
                <img
                  src="/about.jpg"
                  alt="Về LBProduction"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darker/70 to-transparent" />
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      <section id="services" className="relative py-28 px-6 overflow-hidden">
        <span className="absolute top-10 -left-10 text-[10rem] md:text-[14rem] font-black text-outline opacity-[0.07] select-none pointer-events-none leading-none">
          MOTION
        </span>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold-400/8 rounded-full blur-[160px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-4">
              Dịch vụ
            </p>
            <h2 className="text-3xl md:text-5xl font-bold">
              Giải pháp <span className="text-gradient-gold">hình ảnh toàn diện</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s, idx) => (
              <Reveal key={idx} delay={idx * 150} variant="scale">
                <TiltCard className="card-glow rounded-2xl h-full">
                  <div className="h-full p-8 glass rounded-2xl">
                    <span className="block text-5xl font-black text-outline mb-4">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-semibold mb-4 text-gold-400">
                      {s.title}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">{s.desc}</p>
                    <ul className="space-y-2">
                      {s.points.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-gold-400 mt-1">✦</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="relative py-28 px-6 overflow-hidden">
        <span className="absolute bottom-0 right-0 text-[10rem] md:text-[14rem] font-black text-outline opacity-[0.07] select-none pointer-events-none leading-none">
          VALUE
        </span>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-400/10 rounded-full blur-[140px]" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-4">
              Tại sao chọn chúng tôi
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Lý do <span className="text-gradient-gold">lựa chọn LBProduction</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi mang đến sự kết hợp giữa sáng tạo, chất lượng và sự linh
              hoạt — giúp thương hiệu của bạn tỏa sáng ở mọi điểm chạm.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {reasons.map((r, idx) => (
              <Reveal key={idx} delay={idx * 120}>
                <div className="group relative h-full card-glow rounded-2xl">
                  <div className="relative h-full p-6 glass rounded-2xl group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(245,197,24,0.15)] transition duration-500">
                    <span className="block text-5xl font-black text-white/5 group-hover:text-gold-400/25 transition duration-500 mb-4">
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="relative py-28 px-6 overflow-hidden">
        <span className="absolute top-0 -left-6 text-[10rem] md:text-[14rem] font-black text-outline opacity-[0.07] select-none pointer-events-none leading-none">
          TEAM
        </span>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal variant="left">
              <TiltCard className="card-glow rounded-2xl">
                <div className="relative h-[420px] rounded-2xl overflow-hidden border border-gold-400/20">
                  <img
                    src="/team.jpg"
                    alt="Đội ngũ LBProduction"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darker/70 to-transparent" />
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={150} variant="right">
              <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-4">
                Con người
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Đội ngũ <span className="text-gradient-gold">nhân sự</span>
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
                    className="p-5 glass rounded-xl hover:border-gold-400/40 transition flex gap-4"
                  >
                    <span className="text-gold-400 font-black text-lg">
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
            </Reveal>
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-28 px-6 overflow-hidden">
        <span className="absolute top-4 right-0 text-[9rem] md:text-[12rem] font-black text-outline opacity-[0.07] select-none pointer-events-none leading-none">
          CONTACT
        </span>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/8 rounded-full blur-[160px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-4">
              Liên hệ
            </p>
            <h2 className="text-3xl md:text-5xl font-bold">
              Bắt đầu <span className="text-gradient-gold">dự án của bạn</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <form
              className="space-y-6 glass p-8 md:p-10 rounded-2xl"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Họ tên"
                  className="w-full p-4 bg-darker/60 border border-white/10 rounded-lg focus:border-gold-400 outline-none transition"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-4 bg-darker/60 border border-white/10 rounded-lg focus:border-gold-400 outline-none transition"
                />
              </div>
              <input
                type="text"
                placeholder="Tiêu đề"
                className="w-full p-4 bg-darker/60 border border-white/10 rounded-lg focus:border-gold-400 outline-none transition"
              />
              <textarea
                rows={5}
                placeholder="Nội dung"
                className="w-full p-4 bg-darker/60 border border-white/10 rounded-lg focus:border-gold-400 outline-none transition"
              ></textarea>
              <button
                type="submit"
                className="px-10 py-4 bg-gold-400 text-black font-bold rounded-full hover:shadow-[0_0_40px_rgba(245,197,24,0.4)] transition"
              >
                Gửi tin nhắn
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
