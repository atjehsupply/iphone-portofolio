import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Cpu, Rocket } from 'lucide-react';
import { MY_DATA } from '../../data';

const EcosystemModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('network');
  const { network, stack, journey } = MY_DATA.ecosystem;

  const tabs = [
    { id: 'network', label: 'Network', icon: <Globe size={14} /> },
    { id: 'stack', label: 'Stack', icon: <Cpu size={14} /> },
    { id: 'journey', label: 'Journey', icon: <Rocket size={14} /> }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-600 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-8 pb-4">
              <h2 className="text-white text-2xl font-black tracking-tighter uppercase italic">Ecosystem Core</h2>
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-all border border-white/5">
                <X size={18} className="text-white" />
              </button>
            </div>

            {/* Pill Tabs */}
            <div className="px-8 pb-6">
              <div className="inline-flex p-1 bg-black/20 rounded-2xl border border-white/5">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${
                      activeTab === tab.id ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="px-8 pb-10 h-100 overflow-y-auto no-scrollbar">
              <AnimatePresence mode="wait">
                {activeTab === 'network' && (
                  <motion.div key="network" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <p className="text-zinc-400 mb-8 font-medium leading-relaxed max-w-md text-sm">{network.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {network.nodes.map((node, i) => (
                        <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all">
                          <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">{node.type}</span>
                          <h3 className="text-white font-bold text-lg mt-1">{node.name}</h3>
                          <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">{node.details}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'stack' && (
                  <motion.div key="stack" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <div className="space-y-8">
                      {stack.categories.map((cat, i) => (
                        <div key={i}>
                          <h4 className="text-white/30 text-[9px] uppercase font-black mb-4 tracking-[0.3em]">{cat.name} — {cat.level}</h4>
                          <div className="flex flex-wrap gap-2">
                            {cat.tech.map((t, j) => (
                              <span key={j} className="px-4 py-2 bg-white/5 rounded-xl text-[11px] font-bold text-white border border-white/5 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'journey' && (
                  <motion.div key="journey" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <div className="space-y-6">
                      {journey.milestones.map((m, i) => (
                        <div key={i} className="flex gap-6">
                          <div className="flex flex-col items-center pt-1">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                            <div className="w-px flex-1 bg-white/10 mt-2" />
                          </div>
                          <div className="pb-8">
                            <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-tight">{m.year} • {m.title}</h4>
                            <p className="text-[12px] text-zinc-500 leading-relaxed max-w-sm">{m.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EcosystemModal;