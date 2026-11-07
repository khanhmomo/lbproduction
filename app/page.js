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

const marqueeItems = [
  'Sản xuất hình ảnh',
  'Motion Graphic',
  '3D Visual',
  'Sự kiện',
  'Livestream',
  'Key Visual',
];

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <rect x="2.5" y="6" width="14" height="12" rx="2.5" />
        <path d="M16.5 10.5l5-3v9l-5-3" strokeLinejoin="round" />
        <circle cx="8" cy="10" r="1.6" />
      </svg>
    ),
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
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M12 19l7-7a4.95 4.95 0 0 0-7-7l-7 7v7h7z" strokeLinejoin="round" />
        <path d="M18 13l-6-6" />
        <path d="M5 21l3.5-3.5" />
      </svg>
    ),
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

// TODO: thay href bằng link kênh thật của LBProduction
const socials = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/lbproduction',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8v3h2.7v7h2.8z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/lbproduction',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@lbproduction',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.9C18.2 5 12 5 12 5s-6.2 0-7.8.3A2.6 2.6 0 0 0 2.4 7.2 27.4 27.4 0 0 0 2 12a27.4 27.4 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.9c1.6.3 7.8.3 7.8.3s6.2 0 7.8-.3a2.6 2.6 0 0 0 1.8-1.9A27.4 27.4 0 0 0 22 12a27.4 27.4 0 0 0-.4-4.8zM10 15.2V8.8l5.2 3.2-5.2 3.2z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@lbproduction',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16.6 3c.4 2 1.8 3.6 3.9 3.9v3c-1.5 0-2.9-.5-3.9-1.2v6.6a5.9 5.9 0 1 1-5.9-5.9c.3 0 .7 0 1 .1v3.1a2.8 2.8 0 1 0 1.9 2.7V3h3z" />
      </svg>
    ),
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
  const [timecode, setTimecode] = useState('00:00:00:00');
  const heroContentRef = useRef(null);

  useEffect(() => {
    const t = setInterval(
      () => setHeroIdx((i) => (i + 1) % heroImages.length),
      4000
    );
    return () => clearInterval(t);
  }, []);

  // Timecode kiểu máy quay: HH:MM:SS:FF (24fps)
  useEffect(() => {
    let f = 0;
    const t = setInterval(() => {
      f++;
      const ff = f % 24;
      const s = Math.floor(f / 24) % 60;
      const m = Math.floor(f / (24 * 60)) % 60;
      const h = Math.floor(f / (24 * 3600));
      const p = (n) => String(n).padStart(2, '0');
      setTimecode(`${p(h)}:${p(m)}:${p(s)}:${p(ff)}`);
    }, 1000 / 24);
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
    <main className="min-h-screen text-white">
      <Navbar />

      {/* ===== Hero ===== */}
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
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1600ms] ${
              i === heroIdx ? 'opacity-100 animate-kenburns' : 'opacity-0'
            }`}
          />
        ))}
        {/* Overlay cinematic */}
        <div className="absolute inset-0 bg-gradient-to-b from-darker/85 via-dark/55 to-darker" />
        {/* Lưới phối cảnh 3D ở chân */}
        <div className="absolute bottom-0 inset-x-0 h-[45%] grid-floor opacity-40 origin-bottom [transform:perspective(700px)_rotateX(62deg)] [mask-image:linear-gradient(to_top,black_30%,transparent)]" />

        {/* HUD tối giản — REC + timecode + lens spec */}
        <div className="absolute top-24 right-8 md:right-12 hidden sm:flex items-center gap-3 text-[11px] tracking-[0.25em] text-gray-400 font-mono glass rounded-full px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-blink" />
          REC <span className="text-gold-300">{timecode}</span>
        </div>
        <div className="absolute top-[4.9rem] left-8 md:left-12 hidden sm:block text-[11px] tracking-[0.25em] text-gray-500 font-mono glass rounded-full px-4 py-2">
          4K · 24FPS · f/1.8
        </div>
        <div className="absolute bottom-24 left-8 md:left-12 hidden sm:block text-[11px] tracking-[0.35em] text-gray-500 font-mono">
          LB PRODUCTION — SHOWREEL
        </div>

        <div
          ref={heroContentRef}
          className="relative text-center max-w-5xl will-change-transform"
        >
          {/* Eyebrow pill */}
          <span className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.3em] text-gold-300 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse-glow" />
            Event Production Media Team
          </span>

          <h1 className="mt-8 font-black leading-[1.08] tracking-tightest">
            <span className="block overflow-hidden pb-1">
              <span className="hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-outline-faint">
                KIẾN TẠO
              </span>
            </span>
            <span className="block overflow-hidden py-2">
              <span
                className="hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gradient-gold"
                style={{ animationDelay: '0.12s' }}
              >
                TRẢI NGHIỆM
              </span>
            </span>
            <span className="block overflow-hidden pt-1 pb-2">
              <span
                className="hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ animationDelay: '0.24s' }}
              >
                KHÔNG GIỚI HẠN
              </span>
            </span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.5s' }}>
            LBProduction — event production media team chuyên{' '}
            <span className="text-gold-300">motion graphic, 3D visual</span> và
            sản xuất sự kiện. Chúng tôi biến ý tưởng thành những thước phim
            sống động.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.65s' }}>
            <a
              href="/projects"
              className="group px-8 py-4 bg-gold-400 text-black font-bold rounded-full hover:shadow-[0_0_45px_rgba(245,197,24,0.4)] hover:-translate-y-0.5 transition duration-300"
            >
              Xem dự án
              <span className="inline-block ml-2 group-hover:translate-x-1 transition">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="px-8 py-4 glass text-gold-300 font-semibold rounded-full hover:border-gold-400/50 hover:text-gold-200 hover:-translate-y-0.5 transition duration-300"
            >
              Liên hệ ngay
            </a>
          </div>
        </div>

        {/* Progress bars chọn slide */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              aria-label={`Ảnh ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === heroIdx ? 'w-10 bg-gold-400' : 'w-4 bg-white/25 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
          <span className="w-1 h-2 rounded-full bg-gold-400 animate-scroll-dot" />
        </div>
      </section>

      {/* ===== Marquee dịch vụ ===== */}
      <div className="relative py-8 border-y border-white/[0.06] overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-dark to-transparent z-10" />
        <div className="flex w-max animate-marquee gap-0">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 px-8 text-2xl md:text-3xl font-bold whitespace-nowrap"
            >
              <span className={i % 2 ? 'text-outline-faint' : 'text-white/80'}>
                {item}
              </span>
              <span className="text-gold-400 text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== About ===== */}
      <section id="about" className="relative py-28 px-6 overflow-hidden">
        <span className="absolute -top-6 right-0 text-[10rem] md:text-[14rem] font-black text-outline-faint opacity-40 select-none pointer-events-none leading-none">
          MEDIA
        </span>
        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal variant="left">
            <p className="eyebrow mb-4">Về chúng tôi</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Event Production
              <br />
              <span className="text-gradient-gold">Media Team</span> chuyên
              nghiệp
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Được thành lập từ niềm đam mê sáng tạo và kể chuyện bằng hình ảnh,
              LBProduction đã đồng hành cùng nhiều thương hiệu lớn để mang đến
              những sự kiện và sản phẩm media đầy ấn tượng. Chúng tôi tin rằng
              mỗi sự kiện là một câu chuyện đáng được kể theo cách riêng.
            </p>
            <a
              href="/about"
              className="group inline-flex items-center gap-2 mt-8 text-gold-400 font-semibold"
            >
              <span className="border-b border-gold-400/40 pb-1 group-hover:border-gold-400 transition">
                Hành trình của chúng tôi
              </span>
              <span className="group-hover:translate-x-1 transition">→</span>
            </a>
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { n: '2024', l: 'Thành lập' },
                { n: '3', l: 'Phòng ban' },
                { n: '4K', l: 'Chuẩn hình ảnh' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-3xl md:text-4xl font-black text-gradient-gold">
                    {s.n}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150} variant="right">
            <TiltCard className="card-glow rounded-3xl">
              <div className="relative h-96 rounded-3xl overflow-hidden border border-white/[0.08]">
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

      {/* ===== Showreel band ===== */}
      <a
        href="/projects"
        className="group relative block py-20 px-6 overflow-hidden border-y border-white/[0.06]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />
        <div className="relative max-w-7xl mx-auto flex items-center justify-between gap-8">
          <span className="text-4xl md:text-7xl font-black text-outline group-hover:text-gold-400/25 transition duration-500 whitespace-nowrap">
            SHOWREEL
          </span>
          <span className="flex items-center gap-4 shrink-0">
            <span className="hidden md:block text-sm text-gray-400 group-hover:text-gold-300 transition">
              Xem các dự án tiêu biểu
            </span>
            <span className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold-400/50 flex items-center justify-center group-hover:bg-gold-400 group-hover:shadow-[0_0_50px_rgba(245,197,24,0.5)] group-hover:scale-110 transition-all duration-500">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-gold-400 group-hover:text-black transition translate-x-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </div>
      </a>

      {/* ===== Services ===== */}
      <section id="services" className="relative py-28 px-6 overflow-hidden">
        <span className="absolute top-10 -left-10 text-[10rem] md:text-[14rem] font-black text-outline-faint opacity-40 select-none pointer-events-none leading-none">
          MOTION
        </span>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold-400/[0.07] rounded-full blur-[160px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="eyebrow mb-4 justify-center">Dịch vụ</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Giải pháp <span className="text-gradient-gold">hình ảnh toàn diện</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, idx) => (
              <Reveal key={idx} delay={idx * 150} variant="scale">
                <TiltCard className="card-glow rounded-3xl h-full">
                  <div className="h-full p-8 md:p-10 glass rounded-3xl">
                    <div className="flex items-start justify-between mb-6">
                      <span className="w-14 h-14 rounded-2xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400">
                        {s.icon}
                      </span>
                      <span className="text-5xl font-black text-outline-faint">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gold-300">
                      {s.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{s.desc}</p>
                    <ul className="space-y-2.5">
                      {s.points.map((p, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                          <span className="text-gold-400 mt-0.5">✦</span>
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

      {/* ===== Why us — bento ===== */}
      <section id="why-us" className="relative py-28 px-6 overflow-hidden">
        <span className="absolute bottom-0 right-0 text-[10rem] md:text-[14rem] font-black text-outline-faint opacity-40 select-none pointer-events-none leading-none">
          VALUE
        </span>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-400/[0.08] rounded-full blur-[140px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="eyebrow mb-4 justify-center">Tại sao chọn chúng tôi</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Lý do <span className="text-gradient-gold">lựa chọn LBProduction</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi mang đến sự kết hợp giữa sáng tạo, chất lượng và sự linh
              hoạt — giúp thương hiệu của bạn tỏa sáng ở mọi điểm chạm.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {reasons.map((r, idx) => (
              <Reveal
                key={idx}
                delay={idx * 120}
                className={idx < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}
              >
                <div className="group relative h-full card-glow rounded-3xl">
                  <div className="relative h-full p-7 glass rounded-3xl group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(245,197,24,0.15)] transition duration-500">
                    <span className="block text-5xl font-black text-white/[0.06] group-hover:text-gold-400/25 transition duration-500 mb-4">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-semibold mb-3 text-gold-300">
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

      {/* ===== Team ===== */}
      <section id="team" className="relative py-28 overflow-hidden">
        <span className="absolute top-0 -left-6 text-[10rem] md:text-[14rem] font-black text-outline-faint opacity-40 select-none pointer-events-none leading-none">
          TEAM
        </span>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-700/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          <Reveal variant="left" className="h-full">
            <div className="relative h-[420px] lg:h-[560px] [mask-image:linear-gradient(to_right,black_55%,transparent_98%)]">
              <img
                src="/team.jpg"
                alt="Đội ngũ LBProduction"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darker/60 to-transparent" />
            </div>
          </Reveal>
          <Reveal
            delay={150}
            variant="right"
            className="px-6 lg:pl-0 lg:pr-[max(1.5rem,calc((100vw_-_80rem)/2_+_1.5rem))]"
          >
            <p className="eyebrow mb-4">Con người</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Đội ngũ <span className="text-gradient-gold">nhân sự</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-10">
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
                  className="p-5 glass rounded-2xl hover:border-gold-400/40 hover:-translate-y-0.5 transition duration-300 flex gap-4"
                >
                  <span className="text-gold-400 font-black text-lg">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gold-300 mb-1">
                      {d.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Contact / Socials ===== */}
      <section id="contact" className="relative py-28 px-6 overflow-hidden">
        <span className="absolute top-4 right-0 text-[9rem] md:text-[12rem] font-black text-outline-faint opacity-40 select-none pointer-events-none leading-none">
          SOCIAL
        </span>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/[0.07] rounded-full blur-[160px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="eyebrow mb-4 justify-center">Kết nối</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Theo dõi <span className="text-gradient-gold">LBProduction</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-12">
              Cập nhật dự án mới nhất, hậu trường sản xuất và showreel trên các
              kênh của chúng tôi.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="group flex flex-col items-center gap-3"
                >
                  <span className="w-16 h-16 rounded-full glass flex items-center justify-center text-gray-300 group-hover:text-black group-hover:bg-gold-400 group-hover:border-gold-400 group-hover:shadow-[0_0_30px_rgba(245,197,24,0.45)] group-hover:-translate-y-1.5 transition-all duration-300">
                    {s.icon}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-gold-400 transition">
                    {s.name}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
