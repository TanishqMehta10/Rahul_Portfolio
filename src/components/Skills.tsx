import { Code, Database, Layout, Terminal, Cpu } from 'lucide-react';

interface Skill {
  name: string;
  category: string;
  level: number;
  color: string;
}

const skills: Skill[] = [
  { name: 'HTML', category: 'Frontend', level: 90, color: 'from-orange-500 to-red-500' },
  { name: 'CSS', category: 'Frontend', level: 85, color: 'from-blue-500 to-cyan-500' },
  { name: 'JavaScript', category: 'Frontend', level: 88, color: 'from-yellow-400 to-orange-500' },
  { name: 'React', category: 'Frontend', level: 85, color: 'from-cyan-400 to-blue-500' },
  { name: 'Node.js', category: 'Backend', level: 80, color: 'from-green-500 to-teal-500' },
  { name: 'MySQL', category: 'Database', level: 82, color: 'from-blue-600 to-cyan-600' },
  { name: 'C', category: 'Languages', level: 85, color: 'from-gray-400 to-blue-500' },
  { name: 'Java', category: 'Languages', level: 80, color: 'from-red-500 to-orange-600' },
  { name: 'Python', category: 'Languages', level: 95, color: 'from-blue-500 to-yellow-400' },
  { name: 'Machine Learning', category: 'Machine Learning', level: 90, color: 'from-purple-500 to-indigo-500' },
  { name: 'Git', category: 'Tools', level: 88, color: 'from-orange-600 to-red-600' },
  { name: 'GitHub', category: 'Tools', level: 90, color: 'from-gray-600 to-gray-900' },
  { name: 'VS Code', category: 'Tools', level: 92, color: 'from-blue-500 to-cyan-500' },
  { name: 'Jupyter', category: 'Tools', level: 85, color: 'from-orange-500 to-red-500' },
];

const categories = [
  { name: 'Frontend', icon: Layout, color: 'cyan' },
  { name: 'Backend', icon: Terminal, color: 'teal' },
  { name: 'Database', icon: Database, color: 'blue' },
  { name: 'Languages', icon: Code, color: 'green' },
  { name: 'Machine Learning', icon: Cpu, color: 'cyan' },
  { name: 'Tools', icon: Terminal, color: 'orange' },
];

export default function Skills() {
  return (
    <section id="skills" className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-cyan-500 mx-auto rounded-full" />
          <p className="mt-6 text-gray-400 text-lg">Technologies I work with</p>
        </div>

        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.name}
                  className={`flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-${category.color}-500/10 to-${category.color}-600/10 border border-${category.color}-400/30 rounded-full backdrop-blur-sm hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-5 h-5 text-${category.color}-400`} />
                  <span className={`text-${category.color}-400 font-semibold`}>{category.name}</span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative backdrop-blur-md bg-white/5 border border-cyan-400/20 rounded-xl p-6 hover:scale-105 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 rounded-xl transition-all duration-300" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                    <span className={`px-3 py-1 bg-gradient-to-r ${skill.color} rounded-full text-xs font-semibold text-white`}>
                      {skill.category}
                    </span>
                  </div>

                  <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: `${skill.level}%`,
                        boxShadow: `0 0 10px rgba(6, 182, 212, 0.5)`,
                      }}
                    />
                  </div>

                  <div className="mt-2 text-right text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">
                    {skill.level}%
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 p-8 backdrop-blur-md bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-2xl">
          <p className="text-2xl text-gray-200 mb-4">
            <span className="text-cyan-400 font-bold">Always learning</span>, always growing
          </p>
          <p className="text-gray-400">Constantly exploring new technologies and best practices</p>
        </div>
      </div>
    </section>
  );
}
