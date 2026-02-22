import React, { useEffect, useState } from 'react';
import portfolioData from '../data/portfolio.json';

import {
  SiPython, SiGnubash, SiGrafana, SiDocker, SiUnity, SiGit,
  SiReact, SiWireshark, SiPandas, SiFastapi, SiNodedotjs,
  SiDotnet, SiPostman, SiMongodb, SiScikitlearn,
  SiTensorflow, SiKeras, SiUbuntu
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { FaDatabase, FaServer, FaChartBar, FaFileExcel } from 'react-icons/fa';

const iconMap = {
  "Python": <SiPython className="text-[#3776AB] text-3xl" />,
  "C#": <TbBrandCSharp className="text-[#239120] text-3xl" />,
  "SQL": <FaDatabase className="text-[#336791] text-3xl" />,
  "Linux/Bash": <SiGnubash className="text-[#4EAA25] text-3xl" />,
  "Grafana": <SiGrafana className="text-[#F46800] text-3xl" />,
  "Docker": <SiDocker className="text-[#2496ED] text-3xl" />,
  "Unity": <SiUnity className="text-[#222222] dark:text-white text-3xl" />,
  "Git": <SiGit className="text-[#F05032] text-3xl" />,
  "React/Astro": <SiReact className="text-[#61DAFB] text-3xl" />,
  "Wireshark": <SiWireshark className="text-[#1679A7] text-3xl" />,
  "Pandas/Numpy": <SiPandas className="text-[#150458] dark:text-white text-3xl" />,
  "FastAPI": <SiFastapi className="text-[#009688] text-3xl" />,
  "NodeJS": <SiNodedotjs className="text-[#339933] text-3xl" />,
  ".NET": <SiDotnet className="text-[#512BD4] text-3xl" />,
  "postman": <SiPostman className="text-[#FF6C37] text-3xl" />,
  "MongoDB": <SiMongodb className="text-[#47A248] text-3xl" />,
  "PowerBI": <FaChartBar className="text-[#F2C811] text-3xl" />,
  "Excel": <FaFileExcel className="text-[#217346] text-3xl" />,
  "Scikit-learn": <SiScikitlearn className="text-[#F7931E] text-3xl" />,
  "TensorFlow": <SiTensorflow className="text-[#FF6F00] text-3xl" />,
  "Keras": <SiKeras className="text-[#D00000] text-3xl" />,
  "Ubuntu Server": <SiUbuntu className="text-[#E95420] text-3xl" />,
  "Virtual Box": <FaServer className="text-gray-500 text-3xl" />
};

export default function TechStack({ activeFilter, viewMode, lang }) {
  const [visibleTools, setVisibleTools] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Translations
  const t = portfolioData.translations[lang] || portfolioData.translations['en'];

  useEffect(() => {
    setIsAnimating(true);

    // Slight delay to allow fade-out
    const timeout = setTimeout(() => {
      let filtered = [];

      if (viewMode === 'game') {
        filtered = portfolioData.skills.filter(skill =>
          skill.tags.includes('game')
        );
      } else {
        // Professional Mode
        if (activeFilter === 'all') {
          // In overview, show "all" tags or maybe just a curated mix?
          // Let's show anything that isn't EXCLUSIVELY game (unless it's in 'all' too).
          filtered = portfolioData.skills.filter(skill =>
            !skill.tags.includes('game') || skill.tags.includes('all')
          );
        } else {
          // Filter by specific tag (backend, data, infra)
          filtered = portfolioData.skills.filter(skill =>
            skill.tags.includes(activeFilter)
          );
        }
      }

      setVisibleTools(filtered);
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [viewMode, activeFilter]);

  return (
    <div className={`h-full flex flex-col justify-start rounded-3xl p-6 glass-card glass-card-hover group relative overflow-hidden transition-all duration-300 ${viewMode === 'game' ? 'border-purple-500/30' : ''}`}>

      <div className="mb-4 relative z-10">
        <h3 className={`text-xl font-bold flex items-center gap-2 ${viewMode === 'game' ? 'text-purple-300' : 'text-slate-100'}`}>
          <span>{viewMode === 'game' ? '👾' : '🛠️'}</span>
          {t.tech_title}
        </h3>
        <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">{t.tech_subtitle}</p>
      </div>

      <div className={`grid grid-cols-3 gap-2 sm:grid-cols-3 relative z-10 place-items-center transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        {visibleTools.map((tool) => (
          <div
            key={tool.name}
            className={`w-full aspect-square flex flex-col items-center justify-center rounded-lg border border-white/5 bg-white/5 p-2 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10`}
          >
            <span className="mb-2 filter drop-shadow-md">
              {iconMap[tool.name] ? iconMap[tool.name] : <span className="text-2xl">{tool.icon}</span>}
            </span>
            <span className="text-[9px] uppercase tracking-wide font-mono font-bold text-slate-400 group-hover:text-slate-200 transition-colors text-center">
              {tool.name}
            </span>
          </div>
        ))}
      </div>

      {/* Background Accent */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl transition-colors duration-500 pointer-events-none ${viewMode === 'game' ? 'bg-purple-600/20' : 'bg-blue-500/5'}`}></div>
    </div>
  );
}
