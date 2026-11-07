// Nền phẳng tĩnh — một lớp màu đen đơn giản, không animation
export default function BackgroundFX() {
  return <div className="fixed inset-0 -z-10 bg-darker" aria-hidden />;
}
