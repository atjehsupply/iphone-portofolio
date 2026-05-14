import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { MY_DATA } from '../../data';

const PhoneModal = memo(({ isOpen, onClose }) => {
  const { contact } = MY_DATA;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose} 
            className="fixed inset-0 z-998 bg-black/40 backdrop-blur-sm" 
          />
          
          {/* Modal Container */}
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-999 w-full md:max-w-md mx-auto p-8 pb-12 rounded-t-[3rem] 
                       bg-white/5 backdrop-blur-2xl border-t border-l border-r border-white/10 
                       shadow-[0_-20px_50px_-10px_rgba(16,185,129,0.15)]"
          >
            {/* Glow Element */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <img 
                src="/profile-maulizar.png" 
                alt="Maulizar" 
                className="w-16 h-16 rounded-full object-cover border border-white/20 shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">Maulizar</h3>
                <p className="text-emerald-400 text-[10px] font-medium uppercase tracking-widest">System Online</p>
              </div>
              <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white">
                <X size={20} />
              </button>
            </div>

            {/* Professional Tagline */}
            <p className="text-zinc-300 text-sm mb-8 leading-relaxed font-light italic">
              "Available for professional inquiries and collaboration. Let's build something remarkable together."
            </p>

            {/* Glassmorphic Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center backdrop-blur-md">
                <Clock size={16} className="mx-auto text-emerald-400 mb-2"/>
                <span className="text-[9px] text-zinc-400 block uppercase tracking-wider">Local Time</span>
                <span className="text-white text-sm font-semibold">19:06 WIB</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center backdrop-blur-md">
                <MapPin size={16} className="mx-auto text-emerald-400 mb-2"/>
                <span className="text-[9px] text-zinc-400 block uppercase tracking-wider">Location</span>
                <span className="text-white text-sm font-semibold">Indonesia</span>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => window.open(`https://wa.me/${contact.whatsapp}`, '_blank')} 
              className="w-full mb-8 p-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-2xl flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95"
            >
              <MessageCircle size={20} /> START SECURE CHAT
            </button>

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 text-zinc-500">
              <ShieldCheck size={12} />
              <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Verified Secure Connection</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default PhoneModal;