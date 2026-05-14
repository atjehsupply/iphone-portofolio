import { Suspense, useState, useRef, useEffect, lazy } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, ContactShadows, Float, Stars, Sparkles } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, Wifi, Signal, Apple, Power } from 'lucide-react';
import * as THREE from 'three'; 
import { MY_DATA } from './data';
import PhoneDock from './PhoneDock';

// --- OPTIMASI: Lazy Loading untuk Modal ---
const GalleryModal = lazy(() => import('./components/Modals/GalleryModal'));
const PhoneModal = lazy(() => import('./components/Modals/PhoneModal'));
const TwitterModal = lazy(() => import('./components/Modals/TwitterModal')); 
const EmailModal = lazy(() => import('./components/Modals/EmailModal'));
const EcosystemModal = lazy(() => import('./components/Modals/EcosystemModal'));
const ProfileModal = lazy(() => import('./components/Modals/ProfileModal'));
const SystemCoreModal = lazy(() => import('./components/Modals/SystemCoreModal'));

function SceneController({ activeTab, physicsCommand }) {
  useFrame((state) => {
    const targetZ = (activeTab === 'gallery' || activeTab === 'ecosystem') ? 2.5 : 8; 
    const targetY = 0;
    
    if (physicsCommand === 'EXPLODE') {
      state.camera.position.x += (Math.random() - 0.5) * 0.15;
      state.camera.position.y += (Math.random() - 0.5) * 0.15;
    }

    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.07);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.07);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function SpaceDust() {
  return (
    <group>
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={80} scale={20} size={2} speed={0.3} opacity={0.4} color="#4ade80" />
    </group>
  );
}

function PhoneScreen({ onIconClick, bootingFinished, physicsCommand, globalColor }) {
  const group = useRef();
  const [time, setTime] = useState(new Date());
  const [islandState, setIslandState] = useState('idle');

  const triggerHaptic = (pattern = 10) => {
    if (typeof window !== 'undefined' && window.navigator.vibrate) {
      window.navigator.vibrate(pattern);
    }
  };

  useEffect(() => {
    if (bootingFinished) {
      const timer = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(timer);
    }
  }, [bootingFinished]);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    
    if (physicsCommand === 'GRAVITY_OFF') {
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t) * 0.4, 0.05);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t) * 0.4, 0.05);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(t) * 0.5, 0.05);
    } else {
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 6) / 25, 0.02);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 6) / 25, 0.02);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(t / 4) / 12, 0.02);
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[3.25, 6.85, 0.2]} />
        <meshPhysicalMaterial color="#0a0a0a" roughness={0.1} metalness={1} reflectivity={1} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      
      <group position={[0, 0, 0.09]}>
        <mesh>
          <planeGeometry args={[3.1, 6.7]} />
          <meshBasicMaterial color="#000" />
        </mesh>

        <Html transform scale={0.21} position={[0, 0, 0.001]} pointerEvents="auto">
          <div className="w-[320px] h-[670px] rounded-[50px] overflow-hidden flex flex-col relative select-none border border-white/10 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] bg-transparent">
            {bootingFinished && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col relative">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <motion.div 
                    animate={physicsCommand === 'GRAVITY_OFF' ? { scale: 2, opacity: 0.6 } : { scale: 1, opacity: 1 }}
                    className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-linear-to-br from-emerald-900/40 via-blue-900/20 to-transparent blur-[120px] rounded-full" 
                  />
                </div>

                <div className="absolute top-3 w-full flex justify-center z-100">
                  <motion.div 
                    animate={{ 
                      width: islandState === 'expanded' ? 160 : 75, 
                      height: islandState === 'expanded' ? 30 : 20,
                      borderColor: globalColor || "rgba(255,255,255,0.2)"
                    }} 
                    onMouseEnter={() => setIslandState('expanded')} 
                    onMouseLeave={() => setIslandState('idle')} 
                    className="bg-black rounded-full border flex items-center justify-center cursor-pointer shadow-2xl transition-colors duration-500"
                  >
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse mr-2" style={{ backgroundColor: globalColor || '#10b981' }} />
                    {islandState === 'expanded' && <span className="text-[8px] text-white font-mono font-black uppercase tracking-widest">SYSTEM_ACTIVE</span>}
                  </motion.div>
                </div>

                <div className="flex justify-between items-center px-10 pt-10 text-white relative z-40">
                  <span className="text-[14px] font-bold">{formattedTime}</span>
                  <div className="flex gap-2 items-center"><Signal size={12} /> <Wifi size={12} /> <Battery size={15} /></div>
                </div>

                <div className="grid grid-cols-4 gap-y-12 gap-x-4 px-7 mt-20 z-10">
                  {MY_DATA.apps
                    .filter(app => !['contact', 'ecosystem', 'twitter', 'features'].includes(app.id))
                    .map((app, index) => (
                    <button 
                      key={app.id} 
                      onClick={() => {
                        triggerHaptic(15);
                        onIconClick(app.id);
                      }} 
                      className="flex flex-col items-center gap-2 bg-transparent border-none outline-none cursor-pointer group"
                    >
                      <motion.div 
                        key={`${app.id}-${physicsCommand}-${globalColor}`} 
                        animate={
                          physicsCommand === 'EXPLODE' 
                            ? { 
                                x: [0, (index % 2 === 0 ? -120 : 120), (index < 4 ? -80 : 80), 0], 
                                y: [0, -250, 150, 0], 
                                rotate: [0, 720, -360, 0], 
                                scale: [1, 2, 0.5, 1],
                                filter: "none"
                              } 
                            : physicsCommand === 'GRAVITY_OFF'
                            ? { y: [0, -15, 0], rotate: [0, 5, -5, 0], transition: { repeat: Infinity, duration: 2 + index * 0.2, ease: "easeInOut" } }
                            : { x: 0, y: 0, rotate: 0, scale: 1 }
                        }
                        transition={physicsCommand === 'EXPLODE' ? { duration: 2.5, ease: "backInOut" } : { duration: 0.3 }}
                        whileHover={{ scale: 1.1, y: -5 }} 
                        style={{ backgroundColor: globalColor || null }}
                        className={`${!globalColor ? app.color : ''} w-13.5 h-13.5 rounded-[1.25rem] flex items-center justify-center text-white shadow-xl border border-white/10 backdrop-blur-md transition-all duration-500`}
                      >
                        {app.icon}
                      </motion.div>
                      <span className="text-[8px] text-white/70 font-bold uppercase tracking-widest">{app.label}</span>
                    </button>
                  ))}
                </div>

                <div className="z-10">
                  <PhoneDock onDockIconClick={(id) => {
                    triggerHaptic(15);
                    onIconClick(id);
                  }} />
                </div>
                
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
              </motion.div>
            )}
          </div>
        </Html>
      </group>

      <mesh position={[0, 0, 0.105]}>
        <boxGeometry args={[3.2, 6.8, 0.02]} />
        <meshPhysicalMaterial roughness={0} metalness={0} transmission={1} thickness={0.5} ior={1.5} reflectivity={0.5} iridescence={0.1} clearcoat={1} transparent={true} opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(null);
  const [isPowered, setIsPowered] = useState(false);
  const [bootingFinished, setBootingFinished] = useState(false);
  const [physicsCommand, setPhysicsCommand] = useState(null); 
  const [globalColor, setGlobalColor] = useState(null);
  
  const audioRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'));

  const handleExecuteCommand = (cmd) => {
    if (typeof window !== 'undefined' && window.navigator.vibrate) {
      window.navigator.vibrate([20, 40, 20]);
    }
    const input = cmd.toLowerCase().trim();
    const args = input.split(/\s+/); 
    const command = args[0];
    const param = args[1];

    if (command === 'theme') {
      if (param && param !== 'reset') setGlobalColor(param);
      else setGlobalColor(null);
      return;
    }

    if (command === 'reboot') {
      setActiveTab(null);
      setBootingFinished(false);
      setPhysicsCommand(null);
      setGlobalColor(null);
      return;
    }

    setPhysicsCommand(null);
    setTimeout(() => {
      let targetCommand = null;
      if (input === 'gravity --off') targetCommand = 'GRAVITY_OFF';
      else if (input === 'gravity --on') targetCommand = 'GRAVITY_ON';
      else if (input === 'explode') targetCommand = 'EXPLODE';
      
      if (targetCommand) {
        setPhysicsCommand(targetCommand);
        if (targetCommand === 'EXPLODE') setTimeout(() => setPhysicsCommand(null), 3000);
      }
    }, 10);
  };

  const handlePowerOn = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
    setIsPowered(true);
  };

  return (
    <div className="h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center font-sans relative">
      {bootingFinished && (
        <div className="fixed top-12 left-12 z-100 text-left">
          <motion.h1 
            initial={{ opacity: 0.3 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            className="text-3xl font-black italic tracking-tighter text-white cursor-default transition-all duration-300"
          >
            MN<span style={{ color: globalColor || '#10b981' }}>.</span>
          </motion.h1>
        </div>
      )}

      <div className={`fixed inset-0 z-10`}>
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 35 }} gl={{ alpha: true, antialias: true }}>
          <SpaceDust />
          <SceneController activeTab={activeTab} physicsCommand={physicsCommand} />
          
          <Suspense fallback={null}>
            {/* EffectComposer Dihapus untuk tampilan yang bersih dan terang */}
            
            <ambientLight intensity={1.2} /> {/* Terang ditingkatkan */}
            <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={3} />
            
            {isPowered && (
              <Float speed={activeTab ? 0 : 0.8} rotationIntensity={activeTab ? 0 : 0.3} floatIntensity={activeTab ? 0 : 0.3}>
                <PhoneScreen 
                   onIconClick={setActiveTab} 
                   bootingFinished={bootingFinished} 
                   physicsCommand={physicsCommand} 
                   globalColor={globalColor}
                />
              </Float>
            )}
            <ContactShadows position={[0, -3.8, 0]} opacity={0.4} scale={20} blur={2.5} />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} enableDamping={true} dampingFactor={0.05} />
        </Canvas>
      </div>

      {!isPowered && (
        <div className="relative z-200 flex flex-col items-center gap-6">
          <button onClick={handlePowerOn} className="bg-white text-black w-24 h-24 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_80px_rgba(255,255,255,0.15)] border-none active:scale-90 transition-all">
            <Power size={36} strokeWidth={2.5} />
          </button>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.3em]">REBOOT SYSTEM TO EXPLORE</p>
        </div>
      )}

      <AnimatePresence>
        {isPowered && !bootingFinished && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-200 bg-black flex flex-col items-center justify-center">
            <Apple size={80} className="text-white fill-white mb-12" />
            <div className="w-48 h-0.75 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.5 }} onAnimationComplete={() => setBootingFinished(true)} className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        <AnimatePresence mode="wait">
          {activeTab === 'features' && (
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ 
                y: physicsCommand === 'EXPLODE' ? "120%" : "0%", 
                opacity: physicsCommand === 'EXPLODE' ? 0 : 1 
              }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-300 flex items-end justify-center p-4 pointer-events-none"
            >
              <div className="w-full max-w-lg h-[80vh] bg-zinc-900/40 backdrop-blur-3xl rounded-[45px] border border-white/10 shadow-2xl overflow-hidden flex flex-col pointer-events-auto">
                <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-4 mb-2" />
                <SystemCoreModal 
                  isOpen={true} 
                  onClose={() => setActiveTab(null)} 
                  onExecuteCommand={handleExecuteCommand} 
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && <ProfileModal key="profile" isOpen={true} onClose={() => setActiveTab(null)} />}
          {activeTab === 'gallery' && <GalleryModal key="gallery" isOpen={true} onClose={() => setActiveTab(null)} />}
          {activeTab === 'contact' && <PhoneModal key="contact" isOpen={true} onClose={() => setActiveTab(null)} />}
          {activeTab === 'email' && <EmailModal key="email" isOpen={true} onClose={() => setActiveTab(null)} />}
          {activeTab === 'twitter' && <TwitterModal key="twitter" isOpen={true} onClose={() => setActiveTab(null)} />}
          {activeTab === 'ecosystem' && <EcosystemModal key="ecosystem" isOpen={true} onClose={() => setActiveTab(null)} />}
        </AnimatePresence>
      </Suspense>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
}