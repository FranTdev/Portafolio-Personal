import React from 'react';

const KnowledgeCard = ({ title, subtitle, items }) => {
    return (
        <div className="h-full flex flex-col justify-start rounded-3xl p-6 glass-card glass-card-hover group relative overflow-hidden transition-all duration-300 border-l-4 border-l-emerald-500/50">

            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="mb-4 relative z-10">
                <h3 className="text-xl font-bold text-emerald-100 mb-1 flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span>
                    {title}
                </h3>
                <p className="text-xs text-emerald-400/60 uppercase tracking-widest font-mono">{subtitle || 'Foundational Concepts'}</p>
            </div>

            <div className="flex flex-col gap-3 relative z-10">
                {items.map((item, index) => (
                    <div key={index} className="group/item border-l-2 border-slate-700 pl-3 hover:border-emerald-500/50 transition-colors">
                        <h4 className="text-sm font-bold text-slate-200 group-hover/item:text-emerald-300 transition-colors font-mono">
                            {item.area}
                        </h4>
                        <p className="text-xs text-slate-400 leading-snug">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all pointer-events-none"></div>
        </div>
    );
};

export default KnowledgeCard;
