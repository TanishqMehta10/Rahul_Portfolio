import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Laptop() {
  const laptopRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3;
      laptopRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group ref={laptopRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.1, 1.5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.8, -0.75]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[2, 1.3, 0.05]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.8, -0.77]} rotation={[-0.3, 0, 0]}>
        <planeGeometry args={[1.8, 1.1]} />
        <meshBasicMaterial color="#00ffff" opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

function FloatingCode() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.getElapsedTime() + i) * 0.5;
        child.rotation.z = state.clock.getElapsedTime() * 0.2;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[(i - 2) * 1.5, 0, -3]}>
          <torusGeometry args={[0.2, 0.05, 16, 100]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#00ff41' : '#00ffff'} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function About() {
  return (
    <section id="about" className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4">
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Laptop />
          <FloatingCode />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </div>

        <div className="backdrop-blur-md bg-white/5 border border-cyan-400/20 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(6,182,212,0.3)] hover:shadow-[0_0_80px_rgba(6,182,212,0.5)] transition-all duration-500">
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              I am a Computer Science student at Walchand Institute of Technology, Solapur, consistently maintaining a 9.8 CGPA. Currently in my third year, I specialize in Python and Machine Learning development. I enjoy building intelligent, scalable solutions and transforming data into meaningful insights. I am passionate about problem-solving, clean code practices, and applying modern ML techniques to real-world challenges.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-3">🎓</div>
                <h3 className="text-xl font-bold text-cyan-400 mb-2">Education</h3>
                <p className="text-gray-300">B Tech CSE, WIT solapur.</p>
              </div>

              <div className="bg-gradient-to-br from-teal-500/10 to-green-500/10 border border-teal-400/30 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-3">💻</div>
                <h3 className="text-xl font-bold text-teal-400 mb-2">Specialty</h3>
                <p className="text-gray-300">Python Development & Machine Learning.</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-400/30 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-xl font-bold text-orange-400 mb-2">Focus</h3>
                <p className="text-gray-300">Building Scalable Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
