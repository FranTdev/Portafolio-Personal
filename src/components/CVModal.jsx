import React from 'react';
import portfolioData from '../data/portfolio.json';

export default function CVModal({ isOpen, onClose, cvUrl, lang }) {
    if (!isOpen) return null;

    const t = portfolioData.translations[lang];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl h-[85vh] bg-slate-900 rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                    <h2 className="text-xl font-bold text-slate-100">{t.btn_cv}</h2>
                    <div className="flex gap-4">
                        <a
                            href={cvUrl}
                            download
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                        >
                            <span>⬇️</span> {t.btn_download_cv}
                        </a>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                </div>

                {/* PDF Preview */}
                <div className="flex-1 bg-slate-800 relative">
                    <iframe
                        src={cvUrl}
                        className="w-full h-full border-0"
                        title="CV Preview"
                    />
                </div>
            </div>
        </div>
    );
}
