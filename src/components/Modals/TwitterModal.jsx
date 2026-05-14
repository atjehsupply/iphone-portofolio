import { memo } from 'react';
import { motion } from 'framer-motion';
import { X as CloseIcon, MessageCircle, Repeat2, Heart, Share, Verified, ExternalLink } from 'lucide-react';

const TwitterModal = memo(({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const twitterUser = "maulizarnauval";

  const handleOpenTwitter = () => {
    window.open(`https://x.com/${twitterUser}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose} 
        className="fixed inset-0 z-800 bg-black/60 backdrop-blur-md" 
      />
      
      {/* Modal Container */}
      <motion.div 
        initial={{ y: "100%", opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: "100%", opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-auto md:mx-auto md:w-100 z-801 overflow-hidden rounded-[2.5rem] 
                   bg-zinc-900/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {/* X Profile Header / Banner */}
        <div className="h-24 w-full bg-linear-to-r from-emerald-900/40 via-zinc-800 to-emerald-900/40 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white/70 hover:text-white transition-all z-10"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="px-6 pb-7">
          {/* Avatar & Action Section */}
          <div className="flex justify-between items-end -mt-10 mb-4 px-2">
            <div className="relative">
              <img 
                src="/profile-maulizar.png" 
                alt="Profile" 
                className="w-20 h-20 rounded-full border-4 border-zinc-900 object-cover bg-zinc-800"
              />
            </div>
            <button 
              onClick={handleOpenTwitter}
              className="px-5 py-2 bg-white text-black text-xs font-black rounded-full hover:bg-zinc-200 transition-all active:scale-95"
            >
              Follow
            </button>
          </div>

          {/* User Info */}
          <div className="mb-6">
            <div className="flex items-center gap-1">
              <h3 className="text-white font-black text-xl tracking-tight">Maulizar</h3>
              <Verified size={18} className="text-emerald-500 fill-emerald-500/20" />
            </div>
            <p className="text-zinc-500 text-sm font-medium mb-3">@{twitterUser}</p>
            
            <p className="text-zinc-300 text-xs leading-relaxed mb-4">
              Building futuristic web interfaces 🚀 | UI/UX Enthusiast | Open for collaborations and sharing thoughts on Tech.
            </p>

            <div className="flex gap-4">
              <div className="flex gap-1 items-center">
                <span className="text-white text-xs font-bold">1,240</span>
                <span className="text-zinc-500 text-xs uppercase tracking-tighter">Following</span>
              </div>
              <div className="flex gap-1 items-center">
                <span className="text-white text-xs font-bold">8.5K</span>
                <span className="text-zinc-500 text-xs uppercase tracking-tighter">Followers</span>
              </div>
            </div>
          </div>

          {/* Twitter Activity Preview (Dummy/Styling) */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 mb-6">
            <div className="flex gap-3">
              <img src="/profile-maulizar.png" className="w-8 h-8 rounded-full opacity-50" />
              <div className="flex-1">
                <div className="flex justify-between">
                   <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Pinned Post</span>
                </div>
                <p className="text-white/90 text-[11px] mt-1 italic">
                  "The future of web development is not just about code, it's about the experience."
                </p>
                <div className="flex justify-between mt-4 text-zinc-500 max-w-50">
                  <MessageCircle size={14} />
                  <Repeat2 size={14} />
                  <Heart size={14} className="text-emerald-500" />
                  <Share size={14} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Action Button */}
          <button 
            onClick={handleOpenTwitter} 
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-2xl 
                       flex items-center justify-center gap-3 transition-all active:scale-[0.97]
                       shadow-[0_10px_30px_rgba(16,185,129,0.3)] uppercase tracking-[0.2em]"
          >
            Open X Profile <ExternalLink size={14} />
          </button>
        </div>

        {/* Footer Identity */}
        <div className="pb-6 flex flex-col items-center gap-2 opacity-30">
          <div className="h-px w-12 bg-white/20" />
          <p className="text-[8px] font-mono text-white uppercase tracking-[0.4em]">MN_X_COMMUNICATION</p>
        </div>
      </motion.div>
    </>
  );
});

TwitterModal.displayName = 'TwitterModal';
export default TwitterModal;