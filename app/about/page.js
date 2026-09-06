import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

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
    <main className="min-h-screen bg-dark text-white">
      <Navbar />

      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center">
        <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-4">
          Về chúng tôi
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mb-8">
          Hành trình của <span className="text-gold-400">LB Production</span>
        </h1>
        <p className="text-gray-300 leading-loose">
          LB Production được hình thành từ năm 2024, bắt đầu với một niềm tin
          đơn giản: mỗi sự kiện đều xứng đáng được ghi lại và thể hiện bằng một
          hình ảnh thật chỉn chu.
        </p>
        <p className="text-gray-300 leading-loose mt-4">
          Từ những dự án đầu tiên, LB Production từng bước phát triển từ một đơn
          vị cung cấp media sự kiện thành một đội ngũ chuyên mang đến các giải
          pháp hình ảnh và nhận diện thương hiệu toàn diện cho sự kiện.
        </p>
      </section>

      <section className="px-6 pb-16 max-w-7xl mx-auto">
        <div className="relative h-[300px] md:h-[480px] rounded-2xl overflow-hidden border border-gold-400/20">
          <img
            src="/about_main.jpg"
            alt="Hành trình LB Production"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto">
        {milestones.map((m, idx) => (
          <div
            key={idx}
            className="relative pl-10 pb-14 border-l border-gold-400/30 last:pb-0"
          >
            <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-gold-400 shadow-[0_0_15px_rgba(245,197,24,0.6)]" />
            <span className="text-gold-400 font-bold text-2xl">{m.year}</span>
            <h3 className="text-xl font-semibold mt-1 mb-3">— {m.title}</h3>
            <p className="text-gray-400 leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <p className="text-gray-300 leading-loose">
          Trên hành trình phía trước, LB Production không ngừng học hỏi, đổi mới
          và nâng cao chất lượng để tạo ra những sản phẩm không chỉ đẹp về hình
          ảnh, mà còn có giá trị trong việc xây dựng dấu ấn cho mỗi sự kiện và
          thương hiệu.
        </p>
        <p className="mt-10 text-2xl md:text-3xl font-bold text-gold-400">
          &ldquo;Từ một ý tưởng nhỏ, tạo nên một dấu ấn lớn.&rdquo;
        </p>
      </section>

      <Footer />
    </main>
  );
}
