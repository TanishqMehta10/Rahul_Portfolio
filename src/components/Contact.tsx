import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Mail, Phone, Github, Linkedin, Send } from 'lucide-react';

function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  });

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      message: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // send via EmailJS
      (async () => {
        setStatus('sending');
        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_1p4884f';
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_y0tp1gu';
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'LGs77nQBD1kzrREWf';

        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        } as Record<string, string>;

        try {
          await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        } catch (err) {
          console.error('EmailJS send error', err);
          setStatus('error');
        }
        setTimeout(() => setStatus('idle'), 4000);
      })();
    }
  };

  return (
    <section id="contact" className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4">
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Starfield />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 mx-auto rounded-full" />
          <p className="mt-6 text-gray-400 text-lg">Let's create something amazing together</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="backdrop-blur-md bg-white/5 border border-cyan-400/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">Contact Information</h3>

              <div className="space-y-6">
                <a
                  href="tel:9175195270"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-cyan-400/30 rounded-xl hover:scale-105 transition-transform duration-300 group"
                >
                  <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                    <Phone className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white font-semibold">9175195270</p>
                  </div>
                </a>

                <a
                  href="mailto:rahulmantri2005@gmail.com"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-400/30 rounded-xl hover:scale-105 transition-transform duration-300 group"
                >
                  <div className="p-3 bg-teal-500/20 rounded-lg group-hover:bg-teal-500/30 transition-colors">
                    <Mail className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-semibold break-all">rahulmantri2005@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://github.com/Mantri123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-500/10 to-blue-500/10 border border-gray-400/30 rounded-xl hover:scale-105 transition-transform duration-300 group"
                >
                  <div className="p-3 bg-gray-500/20 rounded-lg group-hover:bg-gray-500/30 transition-colors">
                    <Github className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">GitHub</p>
                    <p className="text-white font-semibold">@Mantri123</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/rahul-mantri-2657b230b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-xl hover:scale-105 transition-transform duration-300 group"
                >
                  <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <Linkedin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">LinkedIn</p>
                    <p className="text-white font-semibold">Rahul Mantri</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="backdrop-blur-md bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-400/30 rounded-2xl p-8">
              <div className="font-mono text-sm">
                <div className="text-green-400 mb-2"># Python Developer</div>
                <div className="text-cyan-400">
                  <span className="text-pink-400">print</span>
                  <span className="text-gray-400">(</span>
                  <span className="text-yellow-300">"Let's collaborate!"</span>
                  <span className="text-gray-400">)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-cyan-400/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'success' && (
                  <div className="p-4 rounded-md bg-emerald-600/10 border border-emerald-600/20 text-emerald-300">
                    Message sent — thank you! I'll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-4 rounded-md bg-red-600/10 border border-red-600/20 text-red-300">
                    Oops — something went wrong. Please try again or email me directly.
                  </div>
                )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                  placeholder="Your message here..."
                />
                {errors.message && <p className="mt-2 text-sm text-red-400">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
