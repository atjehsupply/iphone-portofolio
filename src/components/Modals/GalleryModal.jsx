import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Zap, ShieldCheck, Target, ExternalLink, Info } from 'lucide-react';
import { MY_DATA } from '../../data';

// --- STYLES UNTUK HILANGKAN SCROLLBAR SECARA GLOBAL ---
const noScrollbarStyle = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  WebkitOverflowScrolling: 'touch',
};

// --- SUB-KOMPONEN: DETAIL POP-UP (OPTIMASI SPRING & GLOW) ---
const ProjectDetailPopUp = memo(({ project, onClose }) => {
  const details = project.details || {
    engine: "Standard Build",
    performance: "Optimized",
    security: "Encrypted",
    highlights: ["Feature Optimized", "Standard Security", "Clean Code"]
  };

  return (
    <div className="fixed inset-0 z-700 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl max-h-[85vh] bg-zinc-900 border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transform-gpu"
      >
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <X size={20} />
        </button>

        <div 
          className="flex-1 overflow-y-auto" 
          style={noScrollbarStyle}
        >
          <style>{`.overflow-y-auto::-webkit-scrollbar { display: none; }`}</style>
          
          <div className="w-full bg-zinc-800/30">
            <img 
              src={project.image} 
              className="w-full h-auto object-contain block" 
              alt={project.title}
              // Di sini tetap eager karena ini adalah konten tunggal utama saat pop-up dibuka
              loading="eager"
            />
          </div>

          <div className="p-8 md:p-10 text-left">
            <div className="mb-8">
              <span className="text-emerald-500 font-mono text-[9px] tracking-[0.4em] uppercase font-black italic">System_Check: Production_Report</span>
              <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter mt-2">{project.title}</h2>
              <p className="text-zinc-400 text-sm mt-4 leading-relaxed font-medium">{project.desc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {[
                { icon: <Cpu size={18}/>, label: "Architecture", val: details.engine, color: "text-emerald-400" },
                { icon: <Zap size={18}/>, label: "Performance", val: details.performance, color: "text-amber-400" },
                { icon: <ShieldCheck size={18}/>, label: "Security", val: details.security, color: "text-blue-400" },
                { icon: <Target size={18}/>, label: "Project Type", val: project.category, color: "text-red-400" }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-white/2 rounded-2xl border border-white/5 hover:border-white/10 flex flex-col items-start transform-gpu transition-all">
                  <div className={`${item.color} mb-2 opacity-80`}>{item.icon}</div>
                  <span className="text-[8px] text-zinc-600 uppercase font-black tracking-[0.2em]">{item.label}</span>
                  <span className="text-[13px] text-zinc-100 font-bold truncate w-full">{item.val}</span>
                </div>
              ))}
            </div>

            <div className="mb-10">
              <h4 className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">Core_Development_Highlights</h4>
              <div className="flex flex-wrap gap-2">
                {details.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/10 px-3 py-2 rounded-xl">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <span className="text-[10px] text-emerald-400 font-black uppercase italic">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-white text-black py-4.5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-white transition-all transform-gpu active:scale-[0.97] shadow-lg">
              Request Full Source Access <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

// --- KOMPONEN UTAMA: GALLERY MODAL (PERFORMANCE OPTIMIZED) ---
const GalleryModal = ({ isOpen, onClose }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.5 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="fixed inset-0 z-500 bg-zinc-950 flex flex-col overflow-hidden transform-gpu"
    >
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      
      <div className="flex justify-between items-center px-6 md:px-12 py-7 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-510">
        <div className="text-left">
          <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-[0.4em] font-black italic">MN_VAULT: PRODUCTION_LOG</span>
          <h2 className="text-white text-xl font-black uppercase tracking-tighter">Featured Projects</h2>
        </div>
        <button 
          onClick={onClose} 
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-500 transition-all active:scale-90"
        >
          <X size={20}/>
        </button>
      </div>
      
      <div 
        className="flex-1 overflow-y-auto px-6 md:px-12 py-10 no-scrollbar"
        style={noScrollbarStyle}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {MY_DATA.projects?.map((project) => (
            <motion.div 
              key={project.id}
              whileHover={{ y: -8 }}
              className="group relative bg-zinc-900/40 rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] transform-gpu"
            >
              <div className="aspect-16/10 overflow-hidden relative bg-zinc-900">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu" 
                  // OPTIMASI: Gunakan lazy di sini agar browser tidak download semua gambar sekaligus
                  loading="lazy" 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/70 backdrop-blur-md text-emerald-400 text-[8px] font-black uppercase px-3 py-1.5 rounded-full border border-white/10 tracking-[0.2em]">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-8 text-left flex-1 flex flex-col">
                <h3 className="text-white text-2xl font-black uppercase italic tracking-tighter mb-3 leading-none group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-500 text-[12px] font-medium leading-relaxed mb-6 flex-1 line-clamp-3">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[8px] text-zinc-400 font-mono border border-white/5 px-2 py-0.5 rounded uppercase font-bold tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-[9px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 active:scale-[0.98] transform-gpu"
                >
                  <span className="flex items-center gap-2"><Info size={14} /> Technical_Specs</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectDetailPopUp 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(GalleryModal);