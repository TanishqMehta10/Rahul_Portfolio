import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ExternalLink, Github, Linkedin } from 'lucide-react';

function FloatingLeaves() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.getElapsedTime() + i * 0.5) * 0.3;
        child.rotation.z = Math.sin(state.clock.getElapsedTime() + i) * 0.2;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[(i - 4) * 1, Math.random() * 2 - 1, -3]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#4ade80" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

const projects = [
  {
    title: 'PanchSutra',
    tagline: 'Transform your health with authentic Ayurvedic treatments',
    description: 'A comprehensive platform to book personalized sessions with certified Ayurvedic practitioners. Features include real-time appointment scheduling, practitioner profiles, and treatment tracking.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    gradient: 'from-green-400 via-teal-500 to-emerald-600',
    icon: '🌿',
    github: '#',
    live: '#',
  },
  {
    title: 'Typster',
    tagline: 'A coding-style typing speed practice platform',
    description: 'Enhances typing speed and accuracy through code-like challenges. Features syntax highlighting, multiple programming languages, real-time WPM tracking, and competitive leaderboards.',
    tech: ['React', 'TypeScript', 'Python', 'FastAPI'],
    gradient: 'from-cyan-400 via-blue-500 to-purple-600',
    icon: '⌨️',
    github: '#',
    live: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4">
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <FloatingLeaves />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
          <p className="mt-6 text-gray-400 text-lg">Bringing ideas to life through code</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative backdrop-blur-md bg-white/5 border border-cyan-400/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(6,182,212,0.4)]"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              <div className="relative z-10 p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-6xl mb-4 animate-bounce">{project.icon}</div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="p-2 bg-gray-800 rounded-lg hover:bg-cyan-600 transition-colors duration-300 hover:scale-110"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={project.live}
                      className="p-2 bg-gray-800 rounded-lg hover:bg-cyan-600 transition-colors duration-300 hover:scale-110"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>

                <h3 className={`text-3xl font-bold mb-3 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  {project.title}
                </h3>

                <p className="text-lg text-cyan-400 font-semibold mb-4">
                  {project.tagline}
                </p>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-sm text-cyan-400 font-medium hover:scale-110 transition-transform duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center flex flex-col items-center gap-4">
          <a
            href="https://github.com/Mantri123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:scale-110 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
          >
            <Github className="w-6 h-6" />
            View More on GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/rahul-mantri-2657b230b"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-semibold text-white hover:scale-110 transition-all duration-300 hover:shadow-[0_0_30px_rgba(30,144,255,0.6)]"
          >
            <Linkedin className="w-6 h-6" />
            Connect me on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
