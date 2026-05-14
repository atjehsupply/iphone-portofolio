import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Send, Clipboard, Check, ShieldCheck } from 'lucide-react';

const EmailModal = memo(({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const emailAddress = "maulizarnauval@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCompose = () => {
    window.location.href = `mailto:${emailAddress}?subject=Inquiry from Portfolio&body=Hello Maulizar,`;
  };

  return (
    <>
      {/* Backdrop with Blur */}
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
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-auto md:mx-auto md:w-100 z-801 p-7 rounded-[2.5rem] 
                   bg-zinc-900/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <img 
              src="/profile-maulizar.png" 
              alt="Maulizar" 
              className="w-14 h-14 rounded-2xl object-cover border border-white/10 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-zinc-900 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-white font-black text-lg tracking-tight">Maulizar</h3>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">System Online</p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="p-2.5 bg-white/5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Message / Tagline */}
        <div className="mb-8">
          <p className="text-zinc-400 text-xs leading-relaxed font-medium">
            "Official correspondence system for collaborations, creative projects, or general inquiries. This channel is encrypted and monitored regularly."
          </p>
        </div>

        {/* Official Email Card */}
        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl mb-5 flex items-center justify-between group transition-all hover:bg-white/80">
            <div>
                <span className="text-[9px] text-zinc-500 block uppercase tracking-widest mb-1 font-bold">Official Correspondence</span>
                <span className="text-white text-sm font-mono group-hover:text-emerald-400 transition-colors tracking-tight">
                  {emailAddress}
                </span>
            </div>
            <button 
              onClick={handleCopy} 
              className="p-3 bg-white/5 rounded-xl hover:bg-emerald-500/20 hover:text-emerald-400 text-zinc-400 transition-all active:scale-90"
            >
                {copied ? <Check size={18} className="text-emerald-400" /> : <Clipboard size={18} />}
            </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-zinc-800/50 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-1">
            <Mail size={18} className="text-emerald-400 mb-1"/>
            <span className="text-[8px] text-zinc-500 uppercase font-black">Response Time</span>
            <span className="text-white text-[11px] font-bold tracking-wide">Under 24h</span>
          </div>
          <div className="bg-zinc-800/50 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-1">
            <ShieldCheck size={18} className="text-emerald-400 mb-1"/>
            <span className="text-[8px] text-zinc-500 uppercase font-black">Security Protocol</span>
            <span className="text-white text-[11px] font-bold tracking-wide">End-to-End</span>
          </div>
        </div>

        {/* Main Action Button */}
        <button 
          onClick={handleCompose} 
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-2xl 
                     flex items-center justify-center gap-3 transition-all active:scale-[0.97]
                     shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.5)]
                     uppercase tracking-[0.2em]"
        >
          <Send size={16} strokeWidth={3} /> Send Message Now
        </button>

        {/* Footer Identity */}
        <div className="mt-8 flex flex-col items-center gap-2 opacity-30">
          <div className="h-px w-12 bg-white/20" />
          <p className="text-[8px] font-mono text-white uppercase tracking-[0.4em]">MN_SECURE_COMMUNICATION</p>
        </div>
      </motion.div>
    </>
  );
});

EmailModal.displayName = 'EmailModal';

export default EmailModal;