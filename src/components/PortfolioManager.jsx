import React, { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard.jsx';
import KnowledgeCard from './KnowledgeCard.jsx';
import TechStack from './TechStack.jsx';
import portfolioData from '../data/portfolio.json';

export default function PortfolioManager() {
    const [viewMode, setViewMode] = useState('pro'); // 'pro' or 'game'
    const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'backend', 'data', 'infra'
    const [lang, setLang] = useState('en');

    // Dynamic content
    const t = portfolioData.translations[lang] || portfolioData.translations['en'];
    const { profile } = portfolioData;

    // Filters
    const isGame = viewMode === 'game';

    // Memoize Filtered Projects
    const visibleProjects = useMemo(() => {
        if (isGame) {
            return portfolioData.projects.filter(p => p.tags.includes('game'));
        } else {
            if (activeFilter === 'all') {
                return portfolioData.projects.filter(p => !p.tags.includes('game') || p.tags.includes('backend'));
            } else {
                return portfolioData.projects.filter(p => p.tags.includes(activeFilter));
            }
        }
    }, [isGame, activeFilter]);

    // Role Title Logic
    const getRoleTitle = () => {
        if (isGame) return t.role_game;
        if (activeFilter === 'backend') return t.role_backend;
        if (activeFilter === 'data') return t.role_data;
        if (activeFilter === 'infra') return t.role_infra;
        return t.role_all;
    };

    const getHeroDesc = () => {
        if (isGame) return t.hero_desc_game;
        if (activeFilter === 'backend') return t.hero_desc_backend;
        if (activeFilter === 'data') return t.hero_desc_data;
        if (activeFilter === 'infra') return t.hero_desc_infra;
        return t.overview_summary;
    }

    return (
        <div className={`relative min-h-screen transition-colors duration-700 ${isGame ? 'bg-slate-950 selection:bg-purple-500/30' : 'selection:bg-cyan-500/30'}`}>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-4 h-auto w-full max-w-6xl mx-auto p-4 md:p-0 relative font-inter">

                {/* --- HEADER CONTROLS --- */}
                <div className="absolute top-4 right-4 z-50 flex gap-2">
                    {/* Language Toggle */}
                    <div className="flex bg-slate-900/80 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-lg">
                        <button
                            onClick={() => setLang('en')}
                            className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLang('es')}
                            className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'es' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            ES
                        </button>
                    </div>
                </div>

                {/* --- HERO SECTION --- */}
                <div className={`col-span-1 md:col-span-4 md:row-span-1 rounded-3xl p-8 transition-all duration-500 glass-card glass-card-hover group relative overflow-hidden flex flex-col md:flex-row items-center gap-8 min-h-[320px] 
                    ${isGame ? 'border-purple-500/30 shadow-[0_0_40px_-5px_rgba(168,85,247,0.4)]' : 'border-white/5 shadow-xl'}`}>

                    {/* Background Ambience */}
                    <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none transition-colors duration-1000 
                        ${isGame ? 'bg-gradient-to-br from-purple-600/20 via-fuchsia-600/10 to-transparent' :
                            activeFilter === 'data' ? 'bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-transparent' :
                                activeFilter === 'infra' ? 'bg-gradient-to-br from-indigo-500/20 via-slate-500/10 to-transparent' :
                                    'bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent'
                        }`}></div>

                    {/* Avatar */}
                    <div className="relative z-10 shrink-0 group-hover:scale-105 transition-transform duration-500">
                        <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full p-1.5 border-2 transition-colors duration-500 
                            ${isGame ? 'border-purple-400 shadow-purple-500/20' :
                                activeFilter === 'data' ? 'border-yellow-400' :
                                    activeFilter === 'infra' ? 'border-indigo-400' :
                                        'border-cyan-400'
                            } shadow-lg`}>
                            <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="w-full h-full rounded-full object-cover bg-slate-800"
                                width="160"
                                height="160"
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="z-10 relative flex-1 flex flex-col items-center md:items-start text-center md:text-left transition-all">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100 mb-1">
                            {t.hero_intro} <span className={`bg-clip-text text-transparent animate-gradient-x 
                                ${isGame ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400' :
                                    'bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-400'
                                }`}>{profile.name.split(' ')[0]}</span>.
                        </h1>

                        <h2 className={`text-xl md:text-2xl font-bold bg-clip-text text-transparent mb-4 transition-all duration-300 min-h-[32px]
                            ${isGame ? 'bg-gradient-to-r from-purple-400 to-fuchsia-400' : 'bg-gradient-to-r from-slate-100 to-slate-400'}`}>
                            {getRoleTitle()}
                        </h2>

                        <p className="text-base text-slate-400 leading-relaxed font-light max-w-xl mb-6 min-h-[48px]">
                            {getHeroDesc()}
                        </p>

                        {/* Actions Row */}
                        <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start w-full">

                            {/* Primary Actions Group */}
                            <div className="flex items-center gap-2">
                                {/* Email Button - Primary */}
                                <a
                                    href="mailto:franciscot.ussa2003@gmail.com"
                                    className={`px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all shadow-lg flex items-center gap-2 hover:-translate-y-0.5
                                        ${isGame ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'}`}
                                >
                                    <span>✉️</span> franciscot.ussa2003@gmail.com
                                </a>

                                {/* LinkedIn - Secondary */}
                                <a
                                    href={profile.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2.5 rounded-xl border transition-all hover:-translate-y-0.5 flex items-center gap-2
                                        ${isGame
                                            ? 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200'
                                            : 'border-white/10 text-slate-300 hover:bg-white/5 hover:text-white'}`}
                                    aria-label="LinkedIn"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                                    <span className="hidden sm:inline text-xs font-semibold">LinkedIn</span>
                                </a>

                                {/* GitHub - Secondary */}
                                <a
                                    href={profile.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2.5 rounded-xl border transition-all hover:-translate-y-0.5 flex items-center gap-2
                                        ${isGame
                                            ? 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200'
                                            : 'border-white/10 text-slate-300 hover:bg-white/5 hover:text-white'}`}
                                    aria-label="GitHub"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                    <span className="hidden sm:inline text-xs font-semibold">GitHub</span>
                                </a>
                            </div>

                            {/* Divider for Pro Mode */}
                            {!isGame && <div className="hidden md:block w-px h-8 bg-white/10 mx-2"></div>}

                            {/* Pro Filter Tabs (Only in Pro Mode) */}
                            {!isGame && (
                                <div className="flex bg-slate-800/50 p-1 rounded-xl border border-white/5 overflow-x-auto w-full md:w-auto hidescroll">
                                    {['all', 'backend', 'data', 'infra'].map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => setActiveFilter(f)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all
                                                ${activeFilter === f ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                        >
                                            {t.nav_filters[f]}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Game Mode Toggle */}
                            <button
                                onClick={() => {
                                    setViewMode(isGame ? 'pro' : 'game');
                                    // Reset filter when switching back to pro
                                    if (isGame) setActiveFilter('all');
                                }}
                                className={`ml-auto px-4 py-2 rounded-xl font-bold text-sm transition-all border flex items-center gap-2 whitespace-nowrap
                                    ${isGame
                                        ? 'bg-slate-800 text-cyan-400 border-cyan-500/30 hover:bg-slate-700 hover:shadow-cyan-500/20'
                                        : 'bg-slate-900 text-purple-400 border-purple-500/30 hover:bg-slate-800 hover:shadow-purple-500/20'
                                    }`}
                            >
                                {isGame ? '💼 Pro Core' : '🎮 Game Lab'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- CONTENT GRID --- */}

                {/* Knowledge Card */}
                <div className="col-span-1 md:col-span-1 md:row-span-2">
                    <KnowledgeCard title={t.knowledge_title || portfolioData.knowledge.title} subtitle={t.knowledge_subtitle} items={portfolioData.knowledge.items} />
                </div>

                {/* Dynamic Project 1 */}
                <div className="col-span-1 md:col-span-2 md:row-span-1 min-h-[220px]">
                    {visibleProjects[0] ? (
                        <ProjectCard
                            title={visibleProjects[0].title}
                            desc={visibleProjects[0].description}
                            tech={visibleProjects[0].tech}
                            category={(visibleProjects[0].tags[0] || 'Project').toUpperCase()}
                            domain={visibleProjects[0].tags.includes('game') ? 'game' : 'data'}
                            url={visibleProjects[0].url}
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center glass-card rounded-3xl p-6 text-slate-500 border border-dashed border-slate-700">
                            {t.projects_empty}
                        </div>
                    )}
                </div>

                {/* Tech Stack (Smart Toolbox) */}
                <div className="col-span-1 md:col-span-1 md:row-span-2">
                    <TechStack activeFilter={activeFilter} viewMode={viewMode} lang={lang} />
                </div>

                {/* Dynamic Project 2 */}
                <div className="col-span-1 md:col-span-1 md:row-span-1 min-h-[220px]">
                    {visibleProjects[1] ? (
                        <ProjectCard
                            title={visibleProjects[1].title}
                            desc={visibleProjects[1].description}
                            tech={visibleProjects[1].tech}
                            category={(visibleProjects[1].tags[0] || 'Project').toUpperCase()}
                            domain={visibleProjects[1].tags.includes('game') ? 'game' : 'data'}
                            url={visibleProjects[1].url}
                        />
                    ) : <div className="h-full glass-card rounded-3xl opacity-30 border border-white/5" />}
                </div>

                {/* Dynamic Project 3 */}
                <div className="col-span-1 md:col-span-1 md:row-span-1 min-h-[220px]">
                    {visibleProjects[2] ? (
                        <ProjectCard
                            title={visibleProjects[2].title}
                            desc={visibleProjects[2].description}
                            tech={visibleProjects[2].tech}
                            category={(visibleProjects[2].tags[0] || 'Project').toUpperCase()}
                            domain={visibleProjects[2].tags.includes('game') ? 'game' : 'data'}
                            url={visibleProjects[2].url}
                        />
                    ) : <div className="h-full glass-card rounded-3xl opacity-30 border border-white/5" />}
                </div>

            </div>

        </div>
    );
}
