'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const GOLD = '#F5C518';
const DARK = '#161616';
const DARK2 = '#222222';

// Máy quay phim stylized dựng từ primitives — xoay theo scroll + trôi nhẹ
function CameraModel() {
  const group = useRef();
  const reelL = useRef();
  const reelR = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const y = typeof window !== 'undefined' ? window.scrollY : 0;
    if (group.current) {
      // Xoay theo tiến độ cuộn + lắc nhẹ sinh động
      group.current.rotation.y = y * 0.0022 + Math.sin(t * 0.4) * 0.15;
      group.current.rotation.x = Math.sin(t * 0.3) * 0.08 + y * 0.0004;
      group.current.position.y = Math.sin(t * 0.6) * 0.12;
    }
    // 2 cuộn film quay liên tục
    if (reelL.current) reelL.current.rotation.y = t * 1.2;
    if (reelR.current) reelR.current.rotation.y = -t * 1.5;
  });

  return (
    <group ref={group} rotation={[0.1, -0.4, 0]} scale={1.05}>
      {/* Thân máy */}
      <mesh>
        <boxGeometry args={[2.3, 1.4, 1.2]} />
        <meshStandardMaterial color={DARK} metalness={0.85} roughness={0.3} />
      </mesh>
      {/* Viền wireframe vàng quanh thân */}
      <mesh>
        <boxGeometry args={[2.34, 1.44, 1.24]} />
        <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.12} />
      </mesh>

      {/* Ống kính */}
      <mesh position={[1.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.58, 1.1, 32]} />
        <meshStandardMaterial color={DARK2} metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Vòng vàng ống kính */}
      <mesh position={[2.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.5, 0.07, 16, 48]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={1}
          roughness={0.2}
          emissive={GOLD}
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* Mặt kính lens */}
      <mesh position={[2.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 0.08, 32]} />
        <meshStandardMaterial
          color="#0b2a3a"
          emissive="#0a4a6a"
          emissiveIntensity={0.6}
          metalness={1}
          roughness={0.1}
        />
      </mesh>
      {/* Matte box */}
      <mesh position={[2.35, 0, 0]}>
        <boxGeometry args={[0.35, 1.1, 1.1]} />
        <meshStandardMaterial color={DARK} metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Cuộn film trái */}
      <group position={[-0.55, 1.05, 0]}>
        <mesh ref={reelL}>
          <cylinderGeometry args={[0.55, 0.55, 0.22, 32]} />
          <meshStandardMaterial color={DARK2} metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.55, 0.05, 12, 40]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.25} />
        </mesh>
        {/* Nan hoa cuộn */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={i} rotation={[0, (i * Math.PI) / 3, 0]}>
            <boxGeometry args={[0.08, 0.24, 0.9]} />
            <meshStandardMaterial color={DARK} metalness={0.8} roughness={0.35} />
          </mesh>
        ))}
      </group>

      {/* Cuộn film phải */}
      <group position={[0.65, 1.0, 0]}>
        <mesh ref={reelR}>
          <cylinderGeometry args={[0.42, 0.42, 0.22, 32]} />
          <meshStandardMaterial color={DARK2} metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.42, 0.05, 12, 40]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.25} />
        </mesh>
      </group>

      {/* Viewfinder */}
      <mesh position={[-1.35, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.3, 0.7, 24]} />
        <meshStandardMaterial color={DARK2} metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Tay cầm vàng */}
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[1.7, 0.1, 0.28]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.25} />
      </mesh>

      {/* Đế máy */}
      <mesh position={[0, -0.85, 0]}>
        <boxGeometry args={[1.4, 0.3, 0.9]} />
        <meshStandardMaterial color={DARK2} metalness={0.8} roughness={0.35} />
      </mesh>
    </group>
  );
}

export default function Camera3D() {
  return (
    <div
      className="fixed right-[-40px] top-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none hidden xl:block z-[1] opacity-90"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0.6, 5.2], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 6, 5]} intensity={1.1} />
        <pointLight position={[-4, 3, 4]} intensity={30} color={GOLD} />
        <pointLight position={[4, -2, 3]} intensity={12} color="#7a5cff" />
        <CameraModel />
      </Canvas>
    </div>
  );
}
