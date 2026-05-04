import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef, useState, useEffect, useMemo } from 'react';
import { CheckCircle2, Shield, Lock, Zap, Eye, ArrowRight } from 'lucide-react';

export const FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >{children}</motion.div>
  );
};

export const FadeInLeft = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >{children}</motion.div>
  );
};

export const FadeInRight = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >{children}</motion.div>
  );
};

export const ScaleIn = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >{children}</motion.div>
  );
};

export const StaggerChildren = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-30px" }}
    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }} className={className}>
    {children}
  </motion.div>
);

export const GlassCard = ({ children, className = "", hover = true }: { children: ReactNode; className?: string; hover?: boolean }) => (
  <motion.div
    whileHover={hover ? { y: -4, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } } : {}}
    className={`relative glass-card rounded-xl p-6 sm:p-8 flex flex-col overflow-hidden transition-all duration-200 ease-out ${className}`}
  >
    {hover && <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />}
    {children}
  </motion.div>
);

export const SectionTitle = ({ badge, title, subtitle, center = false }: { badge?: string; title: string; subtitle: string; center?: boolean }) => (
  <FadeIn className="mb-16 sm:mb-20 lg:mb-24">
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {badge && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
        >
          {badge}
        </motion.p>
      )}
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] sm:tracking-[-0.04em] mb-4 sm:mb-6 leading-[1.05] sm:leading-[1.0] text-slate-900 whitespace-pre-line">
        {title}
      </h2>
      <p className={`text-slate-500 max-w-2xl text-base sm:text-lg lg:text-xl font-normal leading-relaxed ${center ? 'mx-auto' : ''}`}>
        {subtitle}
      </p>
    </div>
  </FadeIn>
);

export const AnimatedCounter = ({ end, suffix = "", prefix = "", duration = 2 }: { end: number; suffix?: string; prefix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const PARTICLE_DATA = [
  { size: 2.1, left: 12, top: 34, duration: 7, delay: 1, opacity: 0.2 },
  { size: 1.5, left: 45, top: 67, duration: 9, delay: 3, opacity: 0.15 },
  { size: 3.0, left: 78, top: 12, duration: 5, delay: 0, opacity: 0.25 },
  { size: 1.8, left: 23, top: 89, duration: 8, delay: 2, opacity: 0.18 },
  { size: 2.5, left: 56, top: 45, duration: 6, delay: 4, opacity: 0.22 },
  { size: 1.2, left: 90, top: 23, duration: 10, delay: 1, opacity: 0.12 },
  { size: 2.8, left: 34, top: 78, duration: 7, delay: 3, opacity: 0.28 },
  { size: 1.6, left: 67, top: 56, duration: 9, delay: 0, opacity: 0.16 },
  { size: 2.3, left: 89, top: 90, duration: 6, delay: 2, opacity: 0.21 },
  { size: 1.4, left: 5, top: 45, duration: 8, delay: 4, opacity: 0.14 },
  { size: 2.7, left: 78, top: 12, duration: 5, delay: 1, opacity: 0.26 },
  { size: 1.9, left: 34, top: 67, duration: 11, delay: 3, opacity: 0.19 },
  { size: 2.2, left: 56, top: 89, duration: 7, delay: 0, opacity: 0.23 },
  { size: 1.3, left: 12, top: 23, duration: 9, delay: 2, opacity: 0.13 },
  { size: 2.9, left: 45, top: 34, duration: 6, delay: 4, opacity: 0.29 },
  { size: 1.7, left: 90, top: 78, duration: 8, delay: 1, opacity: 0.17 },
  { size: 2.4, left: 23, top: 56, duration: 10, delay: 3, opacity: 0.24 },
  { size: 1.1, left: 67, top: 90, duration: 7, delay: 0, opacity: 0.11 },
  { size: 2.6, left: 89, top: 45, duration: 9, delay: 2, opacity: 0.27 },
  { size: 1.0, left: 5, top: 12, duration: 5, delay: 4, opacity: 0.10 },
  { size: 2.0, left: 78, top: 67, duration: 8, delay: 1, opacity: 0.20 },
  { size: 1.5, left: 34, top: 89, duration: 11, delay: 3, opacity: 0.15 },
  { size: 3.2, left: 56, top: 23, duration: 6, delay: 0, opacity: 0.30 },
  { size: 1.8, left: 12, top: 78, duration: 7, delay: 2, opacity: 0.18 },
  { size: 2.5, left: 45, top: 34, duration: 9, delay: 4, opacity: 0.25 },
  { size: 1.2, left: 90, top: 56, duration: 10, delay: 1, opacity: 0.12 },
  { size: 2.8, left: 23, top: 90, duration: 5, delay: 3, opacity: 0.28 },
  { size: 1.6, left: 67, top: 12, duration: 8, delay: 0, opacity: 0.16 },
  { size: 2.3, left: 89, top: 45, duration: 7, delay: 2, opacity: 0.23 },
  { size: 1.4, left: 5, top: 67, duration: 9, delay: 4, opacity: 0.14 },
];

export const ParticleBackground = () => {
  const particles = useMemo(() => PARTICLE_DATA.map((p, i) => ({ id: i, ...p })), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-violet-500 animate-particle"
          style={{
            width: p.size, height: p.size, left: `${p.left}%`, top: `${p.top}%`, opacity: p.opacity,
            ['--particle-duration' as string]: `${p.duration}s`,
            ['--particle-delay' as string]: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
  </div>
);

export const GlowOrb = ({ className = "" }: { className?: string }) => (
  <div className={`absolute rounded-full filter blur-[120px] pointer-events-none ${className}`} />
);

export const ProtocolVisual = ({ type }: { type: number }) => {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActiveStep(prev => (prev + 1) % 4), 2000);
    return () => clearInterval(timer);
  }, []);

  if (type === 0) return (
    <div className="flex flex-col items-center gap-6 w-full px-4">
      <div className="flex items-center justify-center gap-4 sm:gap-6 w-full max-w-lg">
        <motion.div animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="relative group cursor-default">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center border border-indigo-500/30 shadow-lg shadow-indigo-500/20 group-hover:border-indigo-500/50 group-hover:shadow-indigo-500/30 transition-all duration-300">
            <span className="text-2xl sm:text-3xl">&#128100;</span>
          </div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-indigo-400 bg-white/60 px-2 py-0.5 rounded-full border border-indigo-500/20 whitespace-nowrap group-hover:scale-105 transition-transform">Node A</div>
        </motion.div>
        <div className="flex-1 relative h-12 sm:h-16 flex items-center group">
          <svg className="w-full h-8" viewBox="0 0 200 32">
            <line x1="0" y1="16" x2="200" y2="16" stroke="#222" strokeWidth="2" strokeDasharray="8 4" />
            <motion.circle cx="0" cy="16" r="4" fill="#f97316" animate={{ cx: [0, 200] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
            <motion.circle cx="0" cy="16" r="8" fill="none" stroke="#f97316" strokeWidth="1" opacity="0.4" animate={{ cx: [0, 200], r: [4, 12], opacity: [0.6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
          </svg>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-violet-400 bg-white/60 px-3 py-1 rounded-full border border-violet-500/20 whitespace-nowrap group-hover:scale-105 transition-transform">
            QR Code (Light Only)
          </div>
        </div>
        <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="relative group cursor-default">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center border border-violet-500/30 shadow-lg shadow-violet-500/20 group-hover:border-violet-500/50 group-hover:shadow-violet-500/30 transition-all duration-300">
            <span className="text-2xl sm:text-3xl">&#128499;</span>
          </div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-violet-400 bg-white/60 px-2 py-0.5 rounded-full border border-violet-500/20 whitespace-nowrap group-hover:scale-105 transition-transform">Node B</div>
        </motion.div>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
        {[
          { label: "No Cables", icon: "&#128268;", status: "eliminated" },
          { label: "No WiFi", icon: "&#128251;", status: "eliminated" },
          { label: "No Bluetooth", icon: "&#128246;", status: "eliminated" },
          { label: "No RF Signals", icon: "&#128255;", status: "eliminated" }
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15, duration: 0.5, ease: "easeInOut" }} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-violet-100/80 hover:border-red-500/30 hover:bg-white/70 transition-all duration-300 group">
            <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform" dangerouslySetInnerHTML={{ __html: item.icon }} />
            <div>
              <div className="text-xs font-bold text-slate-700 group-hover:text-white transition-colors">{item.label}</div>
              <div className="text-[10px] font-bold text-red-400 uppercase group-hover:text-red-300 transition-colors">{item.status}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (type === 1) return (
    <div className="flex flex-col items-center gap-6 w-full px-4">
      <div className="flex items-center gap-1 w-full max-w-lg flex-wrap justify-center">
        {[
          { hash: "a7f3...", prev: "0000", color: "from-violet-500 to-orange-600" },
          { hash: "b2e1...", prev: "a7f3", color: "from-orange-500 to-yellow-600" },
          { hash: "c9d4...", prev: "b2e1", color: "from-yellow-500 to-green-600" },
          { hash: "d5a8...", prev: "c9d4", color: "from-green-500 to-emerald-600" }
        ].map((block, i) => (
          <div key={i} className="flex items-center">
            <motion.div initial={{ opacity: 0, scale: 0, rotateY: 90 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ delay: i * 0.3, duration: 0.5, ease: "easeInOut" }} className="w-20 sm:w-24 p-2 sm:p-3 rounded-xl bg-white/60 border border-violet-100/80 text-center group hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
              <div className={`text-xs font-black code-text bg-gradient-to-r ${block.color} bg-clip-text text-transparent group-hover:brightness-125 transition-all`}>{block.hash}</div>
              <div className="text-[10px] text-slate-300 mt-1 group-hover:text-slate-400 transition-colors">Vote #{i + 1}</div>
              {i > 0 && <div className="text-[9px] code-text text-violet-400/60 mt-0.5 truncate group-hover:text-violet-400/80 transition-colors">prev:{block.prev}</div>}
            </motion.div>
            {i < 3 && <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: i * 0.3 + 0.2 }} className="w-3 sm:w-4 flex items-center justify-center"><ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-violet-500/50 group-hover:text-violet-400 transition-colors" /></motion.div>}
          </div>
        ))}
      </div>
      <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-red-500/5 border border-red-500/20 w-full max-w-lg hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-300 group">
        <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><Lock className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors" /></div>
        <div>
          <div className="text-sm font-bold text-red-400 group-hover:text-red-300 transition-colors">Tamper Attempt Detected</div>
          <div className="text-xs text-red-400/60 code-text group-hover:text-red-400/80 transition-colors">Chain broken at block #2 &mdash; Machine LOCKED</div>
        </div>
      </motion.div>
    </div>
  );

  if (type === 2) return (
    <div className="flex flex-col items-center gap-6 w-full px-4">
      <div className="flex items-center justify-center gap-6 sm:gap-8 w-full max-w-md">
        <motion.div animate={{ rotate: [0, 3, -3, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="relative group cursor-default">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center border border-green-500/30 shadow-lg shadow-green-500/20 group-hover:border-green-500/50 group-hover:shadow-green-500/30 transition-all duration-300"><Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform" /></div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-green-400 bg-white/60 px-2 py-0.5 rounded-full border border-green-500/20 whitespace-nowrap group-hover:scale-105 transition-transform">Main CPU</div>
        </motion.div>
        <div className="flex flex-col items-center gap-2 group">
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3], boxShadow: ["0 0 0px rgba(249,115,22,0)", "0 0 20px rgba(249,115,22,0.5)", "0 0 0px rgba(249,115,22,0)"] }} transition={{ repeat: Infinity, duration: 1 }} className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-violet-500 group-hover:scale-125 transition-transform" />
          <div className="text-[10px] font-bold code-text text-violet-400 bg-white/60 px-2 py-0.5 rounded border border-violet-500/20 group-hover:border-violet-500/40 transition-colors">PING 10ms</div>
          <svg className="w-20 sm:w-24 h-1" viewBox="0 0 96 4"><line x1="0" y1="2" x2="96" y2="2" stroke="#c4b5fd" strokeWidth="2" /><motion.circle r="3" fill="#f97316" animate={{ cx: [0, 96, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} /></svg>
        </div>
        <motion.div animate={{ rotate: [0, -3, 3, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="relative group cursor-default">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center border border-indigo-500/30 shadow-lg shadow-indigo-500/20 group-hover:border-indigo-500/50 group-hover:shadow-indigo-500/30 transition-all duration-300"><Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform" /></div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-indigo-400 bg-white/60 px-2 py-0.5 rounded-full border border-indigo-500/20 whitespace-nowrap group-hover:scale-105 transition-transform">HWT</div>
        </motion.div>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {[
          { trigger: "PING Stops", action: "Power Cut", color: "text-red-400" },
          { trigger: "< 30ms", action: "Cold Reboot", color: "text-orange-400" }
        ].map((step, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, duration: 0.5, ease: "easeInOut" }} className="p-3 rounded-xl bg-white/60 border border-violet-100/80 text-center hover:border-violet-200/60 hover:bg-white/70 transition-all duration-300 group">
            <div className="text-xs font-bold text-slate-700 group-hover:text-white transition-colors">{step.trigger}</div>
            <div className={`text-xs font-bold code-text mt-1 ${step.color} group-hover:brightness-125 transition-all`}>&rarr; {step.action}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6 w-full px-4">
      <div className="relative w-full max-w-sm group">
        <div className="w-full h-14 sm:h-16 rounded-2xl bg-gradient-to-b from-indigo-900/50 to-indigo-800/30 border border-indigo-700/30 flex items-center px-4 group-hover:border-indigo-700/50 transition-colors duration-300">
          <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-red-400 group-hover:scale-110 transition-transform" /><div className="w-2 h-2 rounded-full bg-yellow-400 group-hover:scale-110 transition-transform" /><div className="w-2 h-2 rounded-full bg-green-400 group-hover:scale-110 transition-transform" /></div>
          <div className="ml-3 text-xs code-text text-indigo-300/60 group-hover:text-indigo-300/80 transition-colors">VVPAT Printer</div>
        </div>
        <motion.div animate={{ height: [0, 80, 80, 0], opacity: [0, 1, 1, 0] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.2, 0.7, 1] }} className="mx-auto w-40 sm:w-48 bg-gradient-to-b from-white to-gray-100 border-x-2 border-b-2 border-indigo-300/30 rounded-b-xl overflow-hidden shadow-lg transition-shadow duration-300" style={{ transformOrigin: 'top center' }}>
          <div className="p-3 sm:p-4 space-y-2">
            <div className="h-2 w-3/4 bg-gray-200 rounded" /><div className="h-2 w-1/2 bg-gray-200 rounded" /><div className="h-3 w-1/3 bg-orange-100 rounded" /><div className="h-1.5 w-2/3 bg-gray-100 rounded mt-2" /><div className="h-1.5 w-1/2 bg-gray-100 rounded" />
          </div>
        </motion.div>
        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0, 0.6, 0] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.5, 1] }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-indigo-500/10 blur-xl group-hover:bg-indigo-500/20 transition-colors duration-300" />
      </div>
      <div className="flex gap-2 sm:gap-4 w-full max-w-sm">
        {['Tap Candidate', 'Paper Prints', '5s View', 'Deposited'].map((step, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: activeStep >= i ? 1 : 0.3, y: 0, scale: activeStep === i ? 1.05 : 1 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="flex-1 text-center p-2 rounded-lg bg-white/60 border border-violet-100 hover:border-indigo-500/30 hover:bg-white/70 transition-all duration-300">
            <div className={`text-[10px] font-bold transition-colors duration-300 ${activeStep >= i ? 'text-indigo-400' : 'text-slate-300'}`}>{String(i + 1).padStart(2, '0')}</div>
            <div className={`text-[9px] mt-0.5 transition-colors duration-300 ${activeStep >= i ? 'text-slate-700' : 'text-slate-300'}`}>{step}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const QRCodePayload = () => {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => { if (inView) setTimeout(() => setRevealed(true), 500); }, [inView]);

  const fields = [
    { key: "voter_id_hash", value: "SHA-256(VoterID)", color: "text-violet-400" },
    { key: "constituency_code", value: "BOOTH_2847_MH", color: "text-indigo-400" },
    { key: "timestamp", value: "1714492800000", color: "text-green-400" },
    { key: "nonce", value: "7f3a...e891", color: "text-violet-500" },
    { key: "signature", value: "RSA-4096/Ed25519", color: "text-amber-500" },
  ];

  return (
    <div ref={ref} className="w-full group">
      <div className="rounded-xl overflow-hidden border border-violet-100 bg-white/50 hover:border-violet-200/60 transition-all duration-300">
        <div className="p-4 bg-white/60 border-b border-violet-100 flex items-center justify-between transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500 group-hover:scale-110 transition-transform" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500 group-hover:scale-110 transition-transform" /><div className="w-2.5 h-2.5 rounded-full bg-green-500 group-hover:scale-110 transition-transform" /></div>
            <span className="text-xs font-bold text-slate-400 code-text group-hover:text-slate-500 transition-colors">qr_payload.json</span>
          </div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" /><span className="text-[10px] font-bold text-violet-400 code-text">ECI SIGNED</span></div>
        </div>
        <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
          <div className="text-lg code-text text-slate-300 mb-2 sm:mb-4">{"{"}</div>
          {fields.map((field, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={revealed ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.5, ease: "easeInOut" }} className="flex flex-wrap items-center gap-1 sm:gap-3 pl-4 sm:pl-6 hover:bg-white/70 rounded-lg transition-colors duration-200">
              <span className="code-text text-xs sm:text-sm font-bold text-indigo-400">{field.key}</span>
              <span className="text-slate-300">:</span>
              <span className={`code-text text-xs sm:text-sm font-bold ${field.color} hover:brightness-125 transition-all`}>"{field.value}"</span>
              <span className="text-slate-300">{i < fields.length - 1 ? ',' : ''}</span>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: fields.length * 0.15 }} className="text-lg code-text text-slate-300">{"}"}</motion.div>
        </div>
        <div className="px-4 sm:px-6 pb-4">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-violet-500/5 border border-violet-500/20 group-hover:border-violet-500/40 transition-colors duration-300">
            <Shield className="w-4 h-4 text-violet-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-violet-400">90-second TTL &bull; Single-use &bull; Non-replayable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HashChainVisual = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const blocks = [
    { id: 1, prev: "0x0000", hash: "a7f3c2", voter: "Voter #1" },
    { id: 2, prev: "a7f3c2", hash: "b2e1d8", voter: "Voter #2" },
    { id: 3, prev: "b2e1d8", hash: "c9d4f5", voter: "Voter #3" },
    { id: 4, prev: "c9d4f5", hash: "d5a8b1", voter: "Voter #4" },
  ];

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-center gap-2 justify-center flex-wrap">
        {blocks.map((block, i) => (
          <div key={i} className="flex items-center">
            <motion.div initial={{ opacity: 0, scale: 0, rotateY: 90 }} animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}} transition={{ delay: i * 0.25, duration: 0.5, ease: "easeInOut" }} className="w-24 sm:w-28 p-2.5 sm:p-3 rounded-xl bg-white/60 border border-violet-100 hover:border-violet-500/30 transition-colors group">
              <div className="text-[10px] font-bold text-slate-300 mb-1">Block #{block.id}</div>
              <div className="code-text text-xs font-bold text-violet-400">{block.hash}</div>
              <div className="code-text text-[10px] text-slate-300 mt-1">prev: {block.prev}</div>
              <div className="text-[10px] text-slate-400 mt-1">{block.voter}</div>
            </motion.div>
            {i < blocks.length - 1 && <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: i * 0.25 + 0.2 }}><ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-500/40 mx-1" /></motion.div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ComparisonRow = ({ feature, current, zerogap, delay }: { feature: string; current: string; zerogap: string; delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.tr ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay, duration: 0.6, ease: "easeInOut" }} className="border-b border-violet-100 hover:bg-white/60 transition-all duration-300">
      <td className="p-3 sm:p-4 text-xs sm:text-sm font-bold text-slate-700 align-top hover:text-white transition-colors">{feature}</td>
      <td className="p-3 sm:p-4 text-xs sm:text-sm text-red-400/80 align-top">{current}</td>
      <td className="p-3 sm:p-4 text-xs sm:text-sm text-green-400 font-bold align-top hover:text-green-300 transition-colors">{zerogap}</td>
    </motion.tr>
  );
};

export const TimelinePhase = ({ phase, title, description, items, year, color, delay }: { phase: string; title: string; description: string; items: string[]; year: string; color: string; delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const colorMap: Record<string, string> = {
    orange: "from-orange-400 to-pink-500 border-orange-200",
    blue:   "from-indigo-500 to-blue-500 border-indigo-200",
    green:  "from-green-400 to-emerald-500 border-green-200",
  };
  const dotColorMap: Record<string, string> = { orange: "bg-orange-400", blue: "bg-indigo-500", green: "bg-green-400" };

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay, duration: 0.6, ease: "easeInOut" }} className="relative pl-10 sm:pl-12 pb-8 sm:pb-12 last:pb-0 group">
      <div className={`absolute left-0 top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${colorMap[color]} flex items-center justify-center border-4 border-white shadow-md z-10 group-hover:scale-110 transition-transform duration-300`}>
        <div className={`w-2 h-2 rounded-full ${dotColorMap[color]}`} />
      </div>
      <div className="absolute left-3.5 sm:left-4 top-8 w-px bg-violet-100 transition-colors duration-300" style={{ height: 'calc(100% - 2rem)' }} />
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 glass border border-white/70 hover:shadow-lg hover:shadow-violet-100/60 transition-all duration-300">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
          <span className={`text-[11px] sm:text-xs font-black code-text px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r ${colorMap[color]} text-white shadow-sm`}>{year}</span>
          <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">{phase}</span>
        </div>
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 mb-4 leading-relaxed">{description}</p>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export const StatBar = ({ label, amount, total, color, delay }: { label: string; amount: string; total: string; color: string; delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const numMatch = amount.match(/[\d,]+/);
  const totalMatch = total.match(/[\d,]+/);
  const numVal = numMatch ? parseInt(numMatch[0].replace(/,/g, ''), 10) : 0;
  const totalVal = totalMatch ? parseInt(totalMatch[0].replace(/,/g, ''), 10) : 1;
  const percentage = Math.min(Math.round((numVal / totalVal) * 100), 100) || 50;

  const gradientMap: Record<string, string> = {
    'text-indigo-500':   'from-indigo-500 to-blue-500',
    'text-violet-500':   'from-violet-500 to-purple-600',
    'text-green-500':    'from-green-400 to-emerald-500',
    'text-orange-500':   'from-orange-400 to-pink-500',
    'text-pink-500':     'from-pink-400 to-rose-500',
    'text-indigo-400':   'from-indigo-500 to-blue-500',
    'text-violet-400':   'from-orange-400 to-pink-500',
    'text-green-400': 'from-green-400 to-emerald-500',
    'text-brand-400':    'from-orange-400 to-pink-500',
  };

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="space-y-2 hover:translate-x-1 transition-transform duration-300">
      <div className="flex justify-between items-baseline gap-2 text-sm">
        <span className={`font-semibold truncate transition-colors duration-300 ${inView ? 'text-slate-700' : 'text-slate-400'}`}>{label}</span>
        <span className={`font-bold code-text shrink-0 text-xs sm:text-sm ${color}`}>Rs. {amount}</span>
      </div>
      <div className="h-2 rounded-full bg-violet-100 overflow-hidden transition-colors duration-300">
        <motion.div initial={{ width: 0 }} animate={inView ? { width: `${percentage}%` } : {}} transition={{ delay: delay + 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }} className={`h-full rounded-full bg-gradient-to-r ${gradientMap[color] || 'from-violet-500 to-violet-400'} hover:shadow-lg hover:shadow-current/20 transition-shadow duration-300`} />
      </div>
    </motion.div>
  );
};

export const AccordionItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => (
  <motion.div
    className="overflow-hidden rounded-3xl border transition-all duration-200"
    animate={isOpen ? { borderColor:'rgba(139,92,246,0.3)', boxShadow:'0 4px 24px rgba(139,92,246,0.1)' } : { borderColor:'rgba(255,255,255,0.8)', boxShadow:'0 2px 8px rgba(139,92,246,0.04)' }}
    style={{ background:'rgba(255,255,255,0.7)', backdropFilter:'blur(20px)' }}
    transition={{ duration: 0.2 }}>
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 sm:p-5 lg:p-6 text-left group" aria-expanded={isOpen}>
      <span className={`text-sm sm:text-base lg:text-lg font-semibold pr-3 sm:pr-4 leading-snug transition-colors duration-200 ${isOpen ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>{question}</span>
      <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.22 }}
        className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 border transition-colors duration-200 ${isOpen ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-slate-200 bg-white text-slate-400'}`}>
        <span className="text-xl font-light leading-none">+</span>
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
          <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 text-sm sm:text-base text-slate-500 leading-relaxed border-t border-violet-100 pt-4">{answer}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);
