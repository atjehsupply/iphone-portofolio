import { motion } from 'framer-motion';
import { Phone, Globe, X as XIcon, Settings } from 'lucide-react';

export default function PhoneDock({ onDockIconClick }) {
  const dockApps = [
    { id: 'contact', icon: <Phone size={22} />, color: 'bg-[#22c55e]' },
    { id: 'ecosystem', icon: <Globe size={22} />, color: 'bg-gradient-to-tr from-[#0ea5e9] to-[#38bdf8]' },
    { 
      id: 'twitter', 
      icon: <XIcon size={28} className="text-white" strokeWidth={2.5} />, 
      color: 'bg-black' 
    },
    { 
      id: 'features', 
      // GANTI ICON JADI SETTINGS & WARNA JADI ZINC (KHAS IOS)
      icon: <Settings size={24} strokeWidth={1.8} />, 
      color: 'bg-zinc-500' 
    },
  ];

  // Fungsi yang sudah diperbaiki
  const handleDockClick = (id) => {
    onDockIconClick(id);
  };

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-3 px-4 py-3 rounded-[2.2rem] bg-white/10 backdrop-blur-2xl border border-white/10"
      >
        {dockApps.map((app) => (
          <motion.button
            key={app.id}
            onClick={() => handleDockClick(app.id)} // Sekarang memanggil semua id
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            className={`${app.color} w-14 h-14 rounded-[1.2rem] flex items-center justify-center shadow-lg border border-white/10 text-white transition-all`}
          >
            {app.icon}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}