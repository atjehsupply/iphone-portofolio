import { useState, useEffect, useRef } from 'react';
import { Terminal, X, ChevronRight } from 'lucide-react';

const SystemCoreModal = ({ isOpen, onClose, onExecuteCommand }) => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([
    { type: 'sys', content: 'MN-OS [Version 1.0.5]' },
    { type: 'sys', content: 'System status: OPTIMAL' },
    { type: 'hint', content: 'Type "help" to see available commands.' }
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e) => {
    e.preventDefault();
    const fullInput = input.trim();
    if (!fullInput) return;

    const args = fullInput.toLowerCase().split(/\s+/);
    const cmd = args[0];
    const param = args[1];

    setLogs(prev => [...prev, { type: 'user', content: fullInput }]);

    switch (cmd) {
      case 'help':
        setLogs(prev => [...prev, { 
          type: 'info', 
          // LS DIHAPUS DARI DAFTAR HELP
          content: 'Available: theme [color/reset], gravity --off, gravity --on, explode, reboot, clear' 
        }]);
        break;

      case 'theme':
        if (param) {
          onExecuteCommand(fullInput);
          const msg = param === 'reset' ? 'Theme restored to default.' : `Theme updated to: ${param}`;
          setLogs(prev => [...prev, { type: 'success', content: msg }]);
        } else {
          setLogs(prev => [...prev, { type: 'error', content: 'Usage: theme [color_name] or theme reset' }]);
        }
        break;

      case 'reboot':
        setLogs(prev => [...prev, { type: 'warn', content: 'System rebooting...' }]);
        setTimeout(() => onExecuteCommand('reboot'), 500);
        break;

      case 'clear':
        setLogs([]);
        break;

      case 'gravity':
        if (param === '--off') {
          onExecuteCommand('gravity --off');
          setLogs(prev => [...prev, { type: 'success', content: 'Gravity disabled.' }]);
        } else if (param === '--on') {
          onExecuteCommand('gravity --on');
          setLogs(prev => [...prev, { type: 'success', content: 'Gravity enabled.' }]);
        }
        break;

      case 'explode':
        onExecuteCommand('explode');
        setLogs(prev => [...prev, { type: 'warn', content: 'Kinetic impulse active!' }]);
        break;

      default:
        setLogs(prev => [...prev, { type: 'error', content: `Command not found: ${cmd}` }]);
    }

    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col h-full font-mono text-sm overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-2 text-zinc-400">
          <Terminal size={16} className="text-emerald-500" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">System Core</span>
        </div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white">
          <X size={18} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-2 no-scrollbar">
        {logs.map((log, i) => (
          <div key={i} className={`wrap-break-words ${
            log.type === 'error' ? 'text-red-400' : 
            log.type === 'success' ? 'text-emerald-400' : 
            log.type === 'user' ? 'text-blue-400' : 
            log.type === 'warn' ? 'text-amber-400' : 'text-zinc-400'
          }`}>
            {log.type === 'user' && <span className="mr-2 text-zinc-700">$</span>}
            {log.content}
          </div>
        ))}
      </div>

      <div className="p-6 pt-0">
        <form onSubmit={handleCommand} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-emerald-500/50 transition-all shadow-inner">
          <ChevronRight size={18} className="text-emerald-500 opacity-50" />
          <input 
            autoFocus
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-600"
            placeholder="Try 'theme blue'..."
          />
        </form>
      </div>
    </div>
  );
};

export default SystemCoreModal;