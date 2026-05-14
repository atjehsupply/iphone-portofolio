import { memo } from 'react';
import { motion } from 'framer-motion';

const DockIcon = ({ app, onClick, isActive }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onClick(app.id)}
      className={`relative w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer shadow-xl transition-all ${app.color} transform-gpu`}
    >
      <div className="text-white">
        {app.icon}
      </div>

      {/* Indikator Musik Aktif (Pulse Effect) */}
      {app.id === 'music' && isActive && (
        <span className="absolute -bottom-1 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" />
      )}
      
      {/* Tooltip Gaya iOS */}
      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-black/50 backdrop-blur-md text-[10px] text-white px-2 py-1 rounded-md pointer-events-none transition-opacity">
        {app.label}
      </div>
    </motion.div>
  );
};

export default memo(DockIcon);