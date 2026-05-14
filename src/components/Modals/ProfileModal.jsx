import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Code2 } from 'lucide-react';
import { MY_DATA } from '../../data';

const ProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-600 flex items-end md:items-center justify-center p-0 md:p-8"
        >
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ y: "100%", opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-4xl h-[85vh] md:h-[75vh] bg-zinc-900/90 backdrop-blur-3xl border-t md:border border-white/10 rounded-t-[3rem] md:rounded-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90"
            >
              <X size={18} />
            </button>

            {/* Left Column: Hero Image */}
            <div className="w-full md:w-[40%] bg-zinc-950 p-4 md:p-6">
              <div className="w-full h-full rounded-4xl overflow-hidden relative border border-white/5 shadow-2xl">
                <img 
                  src="/profile-maulizar.png" 
                  alt="Maulizar" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <h2 className="text-white text-4xl font-black uppercase tracking-tighter italic">MAULIZAR</h2>
                  <p className="text-emerald-400 text-[10px] font-mono uppercase tracking-[0.3em] mt-1">{MY_DATA.profile.role}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Information */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto no-scrollbar">
              <div className="max-w-xl">
                {/* Bio */}
                <div className="mb-10">
                  <h3 className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em] mb-4">Biography</h3>
                  <p className="text-zinc-300 text-base leading-relaxed border-l-2 border-emerald-500 pl-6">
                    {MY_DATA.profile.bio}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-10">
                  <h3 className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em] mb-6">Expertise</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {MY_DATA.profile.skills.map((skill, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group cursor-default">
                        <div className="flex items-center gap-3">
                          <Code2 size={16} className="text-emerald-500" />
                          <span className="text-zinc-200 text-sm font-bold uppercase tracking-tight">{skill.name}</span>
                        </div>
                        <ChevronRight size={16} className="text-white/20 group-hover:text-emerald-500 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action */}
                
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;