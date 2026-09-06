'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const GOLD = '#F5C518';

// Đám mây particle vàng + torus knot wireframe — xoay theo scroll + chuột
function Scene() {
  const points = useRef();
  const torus = useRef();
  const group = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  // 1500 điểm rải trong hình cầu dẹt
  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
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
      // Xoay rất chậm theo scroll + chuột
      group.current.rotation.y = t * 0.02 + scroll * 0.0002 + mx * 0.05;
      group.current.rotation.x = scroll * 0.0001 + my * 0.03;
    }
    if (torus.current) {
      torus.current.rotation.x = t * 0.05 + scroll * 0.0004;
      torus.current.rotation.z = t * 0.03;
    }
    if (points.current) {
      points.current.rotation.y = -t * 0.008;
    }
  });

  return (
    <group ref={group}>
      {/* Particle field */}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color={GOLD}
          transparent
          opacity={0.25}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Torus knot wireframe trung tâm */}
      <mesh ref={torus} position={[0, 0, -2]}>
        <torusKnotGeometry args={[1.6, 0.45, 128, 16]} />
        <meshBasicMaterial
          color={GOLD}
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>

      {/* Vòng tròn lớn bao quanh */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[3.4, 0.008, 8, 128]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.12} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0.4, 0]}>
        <torusGeometry args={[4.2, 0.006, 8, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

export default function ParticleField3D() {
  return (
    <div
      className="fixed inset-0 -z-[5] pointer-events-none"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
