import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';

export const metadata = {
  title: 'Về chúng tôi - LBProduction',
};

const milestones = [
  {
    year: '2024',
    title: 'Khởi đầu',
    desc: 'LB Production chính thức hình thành, tập trung vào lĩnh vực media sự kiện, ghi lại những khoảnh khắc và câu chuyện phía sau mỗi chương trình.',
  },
  {
    year: '2025',
    title: 'Mở rộng',
    desc: 'Không dừng lại ở việc ghi hình, chúng tôi bắt đầu phát triển thêm các sản phẩm thiết kế nhận diện sự kiện, từ ấn phẩm truyền thông, key visual đến các hệ thống hình ảnh phục vụ chương trình.',
  },
  {
    year: '2026',
    title: 'Phát triển toàn diện',
    desc: 'LB Production tiếp tục mở rộng năng lực với visual 3D, thiết kế không gian hình ảnh và các giải pháp media & branding, hướng đến việc trở thành một đối tác sáng tạo đồng hành cùng sự kiện từ ý tưởng đến khi chương trình hoàn thiện.',
  },
];

export default function About() {
  return (
    <main className="min-h-screen text-white">
      <Navbar />

      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <span className="absolute top-14 left-1/2 -translate-x-1/2 text-[9rem] md:text-[15rem] font-black text-outline opacity-[0.06] select-none pointer-events-none leading-none whitespace-nowrap">
          JOURNEY
        </span>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold-400/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-4">
              Về chúng tôi
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-8">
              Hành trình của{' '}
              <span className="text-gradient-gold">LB Production</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-gray-300 leading-loose">
              LB Production được hình thành từ năm 2024, bắt đầu với một niềm
              tin đơn giản: mỗi sự kiện đều xứng đáng được ghi lại và thể hiện
              bằng một hình ảnh thật chỉn chu.
            </p>
            <p className="text-gray-300 leading-loose mt-4">
              Từ những dự án đầu tiên, LB Production từng bước phát triển từ một
              đơn vị cung cấp media sự kiện thành một đội ngũ chuyên mang đến
              các giải pháp hình ảnh và nhận diện thương hiệu toàn diện cho sự
              kiện.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 max-w-7xl mx-auto">
        <Reveal variant="scale">
          <div className="relative h-[300px] md:h-[480px] rounded-2xl overflow-hidden border border-gold-400/20 card-glow">
            <img
              src="/about_main.jpg"
              alt="Hành trình LB Production"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
          </div>
        </Reveal>
      </section>

      {/* Film strip divider */}
      <div className="film-strip h-10 opacity-50 mb-8" />

      <section className="py-16 px-6 max-w-4xl mx-auto">
        {milestones.map((m, idx) => (
          <Reveal key={idx} delay={idx * 120} variant="left">
            <div className="relative pl-10 pb-14 border-l border-gold-400/30 last:pb-0 group">
              <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-gold-400 shadow-[0_0_15px_rgba(245,197,24,0.6)] group-hover:shadow-[0_0_25px_rgba(245,197,24,0.9)] transition" />
              <span className="block text-5xl md:text-6xl font-black text-outline group-hover:text-gold-400/30 transition">
                {m.year}
              </span>
              <h3 className="text-xl font-semibold mt-2 mb-3 text-gold-400">
                {m.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{m.desc}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-400/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-gray-300 leading-loose">
              Trên hành trình phía trước, LB Production không ngừng học hỏi, đổi
              mới và nâng cao chất lượng để tạo ra những sản phẩm không chỉ đẹp
              về hình ảnh, mà còn có giá trị trong việc xây dựng dấu ấn cho mỗi
              sự kiện và thương hiệu.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-10 text-2xl md:text-4xl font-bold text-gradient-gold leading-snug">
              &ldquo;Từ một ý tưởng nhỏ, tạo nên một dấu ấn lớn.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
