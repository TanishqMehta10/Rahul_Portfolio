import { Github, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-black to-gray-900 border-t border-cyan-400/20">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Rahul Mantri
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Python Developer passionate about creating modern, scalable, and efficient software solutions.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-cyan-400 mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.getElementById(item.toLowerCase());
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-cyan-400 mb-4">Connect</h4>
            <div className="space-y-3">
              <a
                href="mailto:rahulmantri2005@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm">rahulmantri2005@gmail.com</span>
              </a>
              <a
                href="tel:9175195270"
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                <span className="text-sm">9175195270</span>
              </a>
              <a
                href="https://github.com/Mantri123"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">@Mantri123</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cyan-400/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              {currentYear} Rahul Mantri. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> and{' '}
              <span className="text-cyan-400 font-semibold">Feel free to collaborate</span>
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
    </footer>
  );
}
