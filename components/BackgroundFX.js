// Nền động dùng chung cho toàn site: aurora glow + lưới phối cảnh + noise film
export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-darker" aria-hidden>
      {/* Aurora orbs */}
      <div className="absolute -top-48 -left-48 w-[620px] h-[620px] rounded-full bg-gold-400/15 blur-[140px] animate-aurora" />
      <div
        className="absolute top-1/4 -right-48 w-[520px] h-[520px] rounded-full bg-violet-600/15 blur-[150px] animate-aurora"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[520px] h-[520px] rounded-full bg-cyan-500/10 blur-[160px] animate-aurora"
        style={{ animationDelay: '-11s' }}
      />
      {/* Lưới mờ */}
      <div className="absolute inset-0 grid-floor opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      {/* Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.05]" />
    </div>
  );
}
