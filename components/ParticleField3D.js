'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const GOLD = '#F5C518';

// Trường particle vàng — xoay chậm theo scroll + chuột, tối giản hơn
function Scene() {
  const points = useRef();
  const halo = useRef();
  const group = useRef();

  // 900 điểm rải trong hình cầu dẹt
  const positions = useMemo(() => {
    const arr = new Float32Array(900 * 3);
    for (let i = 0; i < 900; i++) {
      const r = 4.5 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.45;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = typeof window !== 'undefined' ? window.scrollY : 0;
    const mx = state.pointer.x;
    const my = state.pointer.y;

    if (group.current) {
      group.current.rotation.y += ((mx * 0.12 + scroll * 0.00015) - group.current.rotation.y) * 0.04;
      group.current.rotation.x += ((my * 0.08 + scroll * 0.00008) - group.current.rotation.x) * 0.04;
    }
    if (points.current) {
      points.current.rotation.y = -t * 0.012;
    }
    if (halo.current) {
      halo.current.rotation.z = t * 0.03;
    }
  });

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          color={GOLD}
          transparent
          opacity={0.28}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Vòng halo mảnh bao quanh — nét 3D tối giản */}
      <mesh ref={halo} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[4.6, 0.006, 8, 160]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.14} />
      </mesh>
      <mesh rotation={[Math.PI / 1.9, 0.35, 0]}>
        <torusGeometry args={[5.4, 0.005, 8, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

export default function ParticleField3D() {
  return (
    <div className="fixed inset-0 -z-[5] pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        dpr={1}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
