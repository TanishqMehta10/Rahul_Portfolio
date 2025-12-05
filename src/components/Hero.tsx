import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  // Layers definition (nodes per layer)
  const layers = [6, 9, 6];
  const nodesRef = useRef<THREE.Mesh[]>([]);
  const connectionsRef = useRef<THREE.LineSegments>(null);

  // build node positions once
  const nodePositions = useRef<{ x: number; y: number; z: number }[]>([]);
  if (nodePositions.current.length === 0) {
    const spacingX = 3.5;
    const spacingY = 1.6;
    let x = -spacingX;
    for (let li = 0; li < layers.length; li++) {
      const count = layers[li];
      const startY = -((count - 1) * spacingY) / 2;
      for (let ni = 0; ni < count; ni++) {
        nodePositions.current.push({ x: x, y: startY + ni * spacingY, z: (li - 1) * -1.5 });
      }
      x += spacingX;
    }
  }

  // build connections (between adjacent layers)
  const connectionPairs = useRef<[number, number][]>([]);
  if (connectionPairs.current.length === 0) {
    let offset = 0;
    for (let li = 0; li < layers.length - 1; li++) {
      const aCount = layers[li];
      const bCount = layers[li + 1];
      for (let a = 0; a < aCount; a++) {
        for (let b = 0; b < bCount; b++) {
          connectionPairs.current.push([offset + a, offset + aCount + b]);
        }
      }
      offset += aCount;
    }
  }

  // positions array for line geometry
  const positionsArray = useRef<Float32Array | null>(null);
  if (!positionsArray.current) {
    const arr = new Float32Array(connectionPairs.current.length * 2 * 3);
    let idx = 0;
    for (let i = 0; i < connectionPairs.current.length; i++) {
      const [a, b] = connectionPairs.current[i];
      const pa = nodePositions.current[a];
      const pb = nodePositions.current[b];
      arr[idx++] = pa.x;
      arr[idx++] = pa.y;
      arr[idx++] = pa.z;
      arr[idx++] = pb.x;
      arr[idx++] = pb.y;
      arr[idx++] = pb.z;
    }
    positionsArray.current = arr;
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // animate nodes (subtle bob + scale)
    nodePositions.current.forEach((p, i) => {
      const mesh = nodesRef.current[i];
      if (mesh) {
        mesh.position.y = p.y + Math.sin(t * 1.2 + i) * 0.12;
        const s = 0.9 + 0.12 * (0.5 + 0.5 * Math.sin(t * 1.5 + i));
        mesh.scale.set(s, s, s);
      }
    });

    // pulse connection opacity by time
    if (connectionsRef.current) {
      const mat = connectionsRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.12 + 0.08 * (0.5 + 0.5 * Math.sin(t * 1.2));
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* connections */}
      <lineSegments ref={connectionsRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connectionPairs.current.length * 2}
            array={positionsArray.current!}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#8b5cf6" transparent opacity={0.15} linewidth={1} />
      </lineSegments>

      {/* nodes */}
      {nodePositions.current.map((p, i) => (
        <mesh
          key={`node-${i}`}
          ref={(el) => (nodesRef.current[i] = el as THREE.Mesh)}
          position={[p.x, p.y, p.z]}
        >
          <sphereGeometry args={[0.18, 16, 12]} />
          <meshStandardMaterial emissive="#a78bfa" color="#7c3aed" emissiveIntensity={0.6} metalness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingMLLogo() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[3, 0, -2]}> 
      <icosahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#a78bfa"
        emissiveIntensity={0.6}
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  );
}

function DataFlow() {
  const groupRef = useRef<THREE.Group>(null);
  const particles = useRef(
    new Array(80).fill(0).map(() => ({
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 4,
      z: -2 + Math.random() * 2,
      speed: 0.01 + Math.random() * 0.03,
    }))
  );

  useFrame(() => {
    const t = performance.now() * 0.001;
    particles.current.forEach((p, i) => {
      p.x += Math.sin(t + i) * 0.002;
      p.y += Math.cos(t * 0.7 + i) * 0.002;
      p.z += -0.01 - p.speed * 0.02;
      if (p.z < -6) {
        p.z = 2;
      }
      const mesh = groupRef.current?.children[i] as THREE.Mesh | undefined;
      if (mesh) {
        mesh.position.set(p.x, p.y, p.z);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {particles.current.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.04, 8, 6]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero() {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Welcome to my Portfolio';

  // Profile image is now a permanent inline SVG avatar (no upload UI)

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Canvas for desktop/tablet only (hide on small screens for performance) */}
      <div className="hidden sm:block absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <NeuralNetwork />
          <FloatingMLLogo />
          <DataFlow />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Simple static background for small screens */}
      <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

      <div className="relative z-10 flex h-full flex-col md:flex-row items-center justify-between px-6 md:px-32 py-8 md:py-0">
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left md:pl-6 md:pl-20">
          <div className="mb-8 text-lg sm:text-2xl md:text-3xl font-light text-cyan-400">
            {text}
            {showCursor && <span className="typing-cursor" aria-hidden="true" />}
          </div>

          <h1 className="mb-4 text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 bg-clip-text text-transparent md:whitespace-nowrap">
            Hi, I'm Rahul Mantri
          </h1>

          <div className="mb-6 text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Python Developer
          </div>

          <p className="mb-12 max-w-2xl text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
            Combining clean logic, modern design, and powerful backend systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button className="w-full sm:w-auto group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
              <span className="relative z-10">Dive Into My Code</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="w-full sm:w-auto group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]">
              <span className="relative z-10">Let's Build Something Cool</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* Right Photo Section (moves below text on small screens) */}
        <div className="w-full mt-8 md:mt-0 md:flex-1 flex items-center justify-center md:justify-start md:pl-20">
          <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 mx-auto md:mx-0">
            {/* Animated Border Container */}
            <div className="absolute inset-0 animate-border rounded-full p-1 shadow-lg">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                {/* Permanent inline anime coder avatar (no upload) */}
                <svg
                  className="w-full h-full rounded-full"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Anime coder avatar"
                >
                  <defs>
                    <linearGradient id="gradBg" x1="0" x2="1">
                      <stop offset="0" stopColor="#0ea5b7" />
                      <stop offset="1" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <rect width="200" height="200" rx="40" fill="url(#gradBg)" />

                  {/* Head */}
                  <g transform="translate(0,0)">
                    <circle cx="100" cy="80" r="44" fill="#ffe7c6" />
                    {/* Hair */}
                    <path d="M60 72c8-24 72-28 84 0v8c0 8-12 18-20 18s-10-6-30-6-38 6-38-20z" fill="#1f2937" />
                    {/* Eyes */}
                    <ellipse cx="82" cy="84" rx="6" ry="4" fill="#0f172a" />
                    <ellipse cx="118" cy="84" rx="6" ry="4" fill="#0f172a" />
                    {/* Blush */}
                    <ellipse cx="72" cy="96" rx="6" ry="3" fill="#fca5a5" opacity="0.9" />
                    <ellipse cx="128" cy="96" rx="6" ry="3" fill="#fca5a5" opacity="0.9" />
                    {/* Mouth */}
                    <path d="M88 106c6 6 18 6 24 0" stroke="#111827" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </g>

                  {/* Headset / hoodie */}
                  <g>
                    <rect x="36" y="120" width="128" height="52" rx="18" fill="#0b1220" />
                    <rect x="52" y="126" width="96" height="36" rx="12" fill="#0f172a" />
                    <rect x="48" y="130" width="40" height="6" rx="3" fill="#06b6d4" />
                    <rect x="112" y="130" width="40" height="6" rx="3" fill="#60a5fa" />
                  </g>

                  {/* Laptop glow accent */}
                  <rect x="70" y="150" width="60" height="6" rx="2" fill="#075985" opacity="0.6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
