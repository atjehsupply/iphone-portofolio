import { MY_DATA } from '../../data';
import DockIcon from './DockIcon';
import { useAudio } from '../../context/AudioContext';

const Dock = ({ onOpenApp }) => {
  const { isPlaying, togglePlay } = useAudio();

  const handleInteraction = (id) => {
    if (id === 'music') {
      togglePlay();
    } else {
      onOpenApp(id);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-1000">
      <div className="flex items-center gap-4 px-4 py-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl overflow-hidden">
        {MY_DATA.apps.map((app) => (
          <DockIcon 
            key={app.id} 
            app={app} 
            onClick={handleInteraction}
            isActive={app.id === 'music' && isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Dock;