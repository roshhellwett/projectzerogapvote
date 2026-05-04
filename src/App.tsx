import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Shield, WifiOff, Fingerprint, Cpu, CheckCircle2,
  ExternalLink, Printer, Database, Activity, FileText, Menu, X,
  ArrowRight, BarChart3, AlertTriangle, Mail,
  ChevronRight, ChevronDown
} from 'lucide-react';
import {
  FadeIn, FadeInLeft, FadeInRight, StaggerChildren, StaggerItem,
  TimelinePhase, StatBar, AccordionItem
} from './components';

const PDF = "https://www.slideshare.net/slideshow/zero-gap-voting-architecture-securing-india-s-electronic-voting-system/287278728";
const ease = [0.16, 1, 0.3, 1] as const;

/* ── Mobile notice popup ───────────────────────────────────── */
function MobileNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dismissed = sessionStorage.getItem('zg-mobile-notice-dismissed');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile && !dismissed) {
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);
  const dismiss = () => {
    sessionStorage.setItem('zg-mobile-notice-dismissed', '1');
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.25}}
          className="mobile-notice-backdrop"
          onClick={dismiss}
          role="dialog" aria-modal="true" aria-labelledby="mn-title">
          <motion.div
            initial={{opacity:0,y:24,scale:0.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:16,scale:0.97}}
            transition={{duration:0.32,ease}}
            className="mobile-notice"
            onClick={(e)=>e.stopPropagation()}>
            <div className="mobile-notice-stripe" aria-hidden />
            <div className="mobile-notice-body">
              <div className="mobile-notice-icon" aria-hidden>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="12" rx="2" />
                  <line x1="8" y1="20" x2="16" y2="20" />
                  <line x1="12" y1="16" x2="12" y2="20" />
                </svg>
              </div>
              <h3 id="mn-title">Best viewed on desktop</h3>
              <p>This presentation has rich interactive diagrams and animations designed for a larger screen. For the full experience, please open it on a desktop or laptop.</p>
              <div className="mobile-notice-actions">
                <button className="mobile-notice-primary" onClick={dismiss}>
                  Continue on mobile <ArrowRight className="w-4 h-4" />
                </button>
                <button className="mobile-notice-secondary" onClick={dismiss}>
                  Don't show this again
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Shared check item ─────────────────────────────────────── */
const Check = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3 text-slate-700 text-base">
    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm" style={{background:'linear-gradient(135deg,#E87722,#C5601A)'}}>
      <CheckCircle2 className="w-3 h-3 text-white" />
    </div>
    <span>{children}</span>
  </li>
);

/* ══════════════════════════════════════════════════════════════════
   HERO DIAGRAM — the airgap two-node layout, glass style
══════════════════════════════════════════════════════════════════ */
function AirgapPanel() {
  return (
    <div className="w-full glass-solid rounded-3xl overflow-hidden p-4 sm:p-8 select-none relative">
      {/* titlebar */}
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <div className="w-3 h-3 rounded-full bg-red-300/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-300/60" />
        <div className="w-3 h-3 rounded-full bg-green-300/60" />
        <span className="ml-3 text-[11px] font-mono text-violet-400/60 tracking-widest uppercase">System Architecture</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Node A */}
        <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:0.6,ease}}
          className="flex-1 min-w-0 glass-indigo rounded-2xl p-3 sm:p-5">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-200 shrink-0">
              <Fingerprint className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs font-black text-indigo-600 uppercase tracking-widest">Node A</div>
              <div className="text-[9px] sm:text-[10px] text-indigo-400 truncate">Identity Terminal</div>
            </div>
          </div>
          <div className="space-y-1 sm:space-y-1.5">
            {['Biometric Auth','NFC Smart Card','QR Generator','Server Link'].map(t=>(
              <div key={t} className="flex items-center gap-1.5 text-[9px] sm:text-[11px] text-indigo-500">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-indigo-400 shrink-0" /><span className="truncate">{t}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 sm:mt-4">
            <span className="live-dot text-[10px]">ONLINE</span>
          </div>
        </motion.div>

        {/* Gap channel */}
        <div className="flex flex-col items-center gap-1.5 sm:gap-2 w-12 sm:w-20 lg:w-24 shrink-0">
          <div className="text-[7px] sm:text-[9px] text-violet-400/60 uppercase tracking-widest font-mono text-center leading-tight">Optical<br/>Channel</div>
          <div className="relative w-full h-8 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-indigo-300 via-violet-400 to-orange-300" />
            {[0,1,2].map(i=>(
              <motion.div key={i} className="absolute w-2.5 h-2.5 rounded-full"
                style={{background:'linear-gradient(135deg,#8b5cf6,#f97316)',
                  boxShadow:'0 0 10px rgba(139,92,246,0.8)',top:'50%',transform:'translateY(-50%)'}}
                animate={{left:['-10%','110%']}}
                transition={{duration:1.8,delay:i*0.6,repeat:Infinity,ease:'linear'}} />
            ))}
          </div>
          <div className="flex flex-col items-center gap-0.5">
            {['No Wire','No WiFi','No BT'].map(t=>(
              <span key={t} className="text-[7px] sm:text-[8px] text-red-400 font-medium flex items-center gap-0.5 sm:gap-1">
                <X className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0" /><span className="hidden sm:inline">{t}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Node B */}
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{duration:0.6,ease,delay:0.15}}
          className="flex-1 min-w-0 glass-saffron rounded-2xl p-3 sm:p-5">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg shadow-orange-200 shrink-0">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs font-black text-orange-600 uppercase tracking-widest">Node B</div>
              <div className="text-[9px] sm:text-[10px] text-orange-400 truncate">Airgapped EVM</div>
            </div>
          </div>
          <div className="space-y-1 sm:space-y-1.5">
            {['QR Scanner Only','PROM Voter List','Hash Chain EEPROM','VVPAT Printer'].map(t=>(
              <div key={t} className="flex items-center gap-1.5 text-[9px] sm:text-[11px] text-orange-500">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-orange-400 shrink-0" /><span className="truncate">{t}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 sm:mt-4 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="text-[10px] text-slate-400 font-mono font-bold">AIRGAPPED</span>
          </div>
        </motion.div>
      </div>

      {/* A=B=C row */}
      <div className="grid grid-cols-3 gap-2 pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-violet-100">
        {[{l:'Server Log', s:'A', c:'text-indigo-600',  bg:'glass-indigo'},
          {l:'EEPROM',     s:'B', c:'text-orange-600',  bg:'glass-saffron'},
          {l:'VVPAT Paper',s:'C', c:'text-green-700',   bg:'glass-green'}].map(r=>(
          <div key={r.s} className={`text-center py-2 sm:py-2.5 px-1 rounded-xl sm:rounded-2xl ${r.bg} min-w-0`}>
            <div className={`text-[10px] sm:text-[11px] font-black ${r.c} font-mono leading-none`}>
              <span className="text-base sm:text-sm">{r.s}</span>
              <span className="hidden sm:inline"> = </span>
              <span className="block sm:inline text-[8px] sm:text-[11px] mt-0.5 sm:mt-0 truncate">{r.l}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HASH CHAIN PANEL
══════════════════════════════════════════════════════════════════ */
function HashPanel() {
  const blocks = [
    {id:1,hash:'a3f9c1d2',prev:'GENESIS',g:'from-indigo-500 to-blue-500',tc:'text-indigo-600',bg:'glass-indigo'},
    {id:2,hash:'d7b28e4f',prev:'a3f9c1d2',g:'from-violet-500 to-purple-500',tc:'text-violet-600',bg:'glass-violet'},
    {id:3,hash:'f1e42a9b',prev:'d7b28e4f',g:'from-orange-400 to-pink-500',tc:'text-orange-600',bg:'glass-saffron'},
    {id:4,hash:'9c0d7f3e',prev:'f1e42a9b',g:'from-green-400 to-emerald-500',tc:'text-green-700',bg:'glass-green'},
  ];
  return (
    <div className="w-full glass-solid rounded-3xl p-8 select-none">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-300/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-300/60" />
        <div className="w-3 h-3 rounded-full bg-green-300/60" />
        <span className="ml-3 text-[11px] font-mono text-violet-400/60 tracking-widest uppercase">EEPROM Hash Chain</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {blocks.map((b,i)=>(
          <motion.div key={b.id} initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:i*0.1,duration:0.4,ease}}
            className={`flex items-center gap-3 p-3 sm:p-4 rounded-2xl ${b.bg} min-w-0`}>
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${b.g} flex items-center justify-center shadow-sm shrink-0`}>
              <span className="text-[10px] font-black text-white">#{b.id}</span>
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className={`text-xs sm:text-sm font-black font-mono truncate ${b.tc}`}>{b.hash}</div>
              <div className="text-[9px] text-slate-400 font-mono truncate">← {b.prev}</div>
            </div>
            <div className="text-[9px] text-slate-400 font-mono shrink-0 hidden sm:block">SHA-256</div>
            {i < blocks.length-1 && (
              <motion.div animate={{y:[0,3,0]}} transition={{repeat:Infinity,duration:1.2,delay:i*0.3}}>
                <ChevronDown className="w-3.5 h-3.5 text-violet-400" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 p-4 rounded-2xl glass-red">
        <div className="text-[11px] text-red-500 font-semibold font-mono text-center">
          Alter any block → chain breaks → machine permanently locks on next boot
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   VOTER JOURNEY PANEL — CINEMATIC VERSION with active step trail, progress glow
══════════════════════════════════════════════════════════════════ */
function JourneyPanel() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
  
  // Cycle through steps animation
  React.useEffect(()=>{
    const interval = setInterval(()=>{
      setActiveStep(prev=>{
        const next = (prev + 1) % 8;
        if(next === 0){
          setCompletedSteps([]);
        } else {
          setCompletedSteps(s=>[...s,prev]);
        }
        return next;
      });
    },2000);
    return ()=>clearInterval(interval);
  },[]);
  
  const steps = [
    {n:'01',icon:Fingerprint,t:'Smart Card Tap',d:'NFC Voter ID on Node A',color:'#64748b'},
    {n:'02',icon:Activity,t:'Biometric Scan',d:'Fingerprint + iris fallback',color:'#64748b'},
    {n:'03',icon:Database,t:'Server Validates',d:'Real-time deduplication',color:'#64748b'},
    {n:'04',icon:WifiOff,t:'QR Token Generated',d:'RSA-4096 signed, 90s TTL',color:'#64748b'},
    {n:'⟶',icon:ArrowRight,t:'Airgap Crossed',d:'Voter walks to booth — light only',color:'#E87722',isBridge:true},
    {n:'05',icon:Shield,t:'QR Verified Offline',d:'Signature + PROM check',color:'#64748b'},
    {n:'06',icon:Printer,t:'Ballot Cast + VVPAT',d:'Paper printed, 5s display',color:'#E87722'},
    {n:'07',icon:CheckCircle2,t:'Hash Chain Commit',d:'Vote locked into EEPROM',color:'#0F7A3A'},
  ];
  
  return (
    <div className="w-full glass-cinematic rounded-3xl p-6 select-none relative overflow-hidden">
      {/* Progress trail background */}
      <div className="absolute left-9 top-20 bottom-10 w-0.5 bg-slate-200 rounded-full">
        <motion.div 
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-slate-400 via-amber-400 to-emerald-400 rounded-full"
          animate={{height:`${(activeStep / (steps.length - 1)) * 100}%`}}
          transition={{duration:0.5,ease:[0.16,1,0.3,1]}}
        />
      </div>
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-5 relative z-10">
        <div className="flex gap-1.5">
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2}} className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-500"/>
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.3}} className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500"/>
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.6}} className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"/>
        </div>
        <span className="ml-3 text-[11px] font-mono text-slate-400 tracking-widest uppercase">Voter Session Journey</span>
        
        <motion.div 
          animate={{opacity:[0.5,1,0.5]}} 
          transition={{repeat:Infinity,duration:1.5}}
          className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-50 border border-green-200">
          <motion.div 
            animate={{scale:[1,1.3,1]}} 
            transition={{repeat:Infinity,duration:1}}
            className="w-1.5 h-1.5 rounded-full bg-green-500"
          />
          <span className="text-[9px] font-bold text-green-600 font-mono">LIVE</span>
        </motion.div>
      </div>
      
      {/* Steps with cinematic styling */}
      <div className="space-y-2 relative z-10">
        {steps.map((s,i)=>{
          const isActive = i === activeStep;
          const isCompleted = completedSteps.includes(i) || i < activeStep;
          
          return (
            <motion.div 
              key={i} 
              initial={{opacity:0,x:-20}}
              animate={{opacity:1,x:0}}
              transition={{delay:i*0.08,duration:0.4,ease:[0.16,1,0.3,1]}}
              className={`flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 ${
                isActive?'bg-white border-2 border-amber-200 shadow-lg shadow-amber-100':
                isCompleted?'bg-slate-50 border border-slate-200':
                'bg-slate-50/50 border border-slate-100 opacity-60'
              }`}>
              {/* Step number/icon */}
              <motion.div 
                animate={isActive?{scale:[1,1.1,1]}:{scale:1}}
                transition={{repeat:isActive?Infinity:0,duration:1}}
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black font-mono text-sm ${
                  isActive?'bg-amber-100 text-amber-700 shadow-md':
                  isCompleted?'bg-slate-200 text-slate-600':
                  'bg-slate-100 text-slate-400'
                }`}
                style={isCompleted&&!isActive?{backgroundColor:s.color+'20',color:s.color}:undefined}>
                {isCompleted&&!isActive?(
                  <CheckCircle2 className="w-5 h-5"/>
                ):s.n}
              </motion.div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-bold truncate ${
                  isActive?'text-slate-800':
                  isCompleted?'text-slate-700':
                  'text-slate-400'
                }`}>
                  {s.t}
                </div>
                <div className={`text-[11px] truncate ${
                  isActive?'text-amber-600':
                  isCompleted?'text-slate-500':
                  'text-slate-300'
                }`}>
                  {s.d}
                </div>
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div 
                  initial={{scale:0,opacity:0}}
                  animate={{scale:1,opacity:1}}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-50 border border-amber-200">
                  <motion.div 
                    animate={{scale:[1,1.3,1],opacity:[1,0.5,1]}}
                    transition={{repeat:Infinity,duration:1}}
                    className="w-1.5 h-1.5 rounded-full bg-amber-500"
                  />
                  <span className="text-[10px] font-bold text-amber-600 font-mono">ACTIVE</span>
                </motion.div>
              )}
              
              {isCompleted && !isActive && (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0"/>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Progress summary */}
      <div className="mt-4 flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200">
        <span className="text-[11px] text-slate-500 font-mono">Journey Progress</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 rounded-full bg-slate-200 overflow-hidden">
            <motion.div 
              className="h-full rounded-full bg-gradient-to-r from-slate-400 via-amber-400 to-emerald-400"
              animate={{width:`${((activeStep + 1) / steps.length) * 100}%`}}
              transition={{duration:0.3}}
            />
          </div>
          <span className="text-[11px] font-bold font-mono text-slate-600">
            {Math.round(((activeStep + 1) / steps.length) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════
   PROTOCOL DIAGRAMS — one per protocol, themed like AirgapPanel
══════════════════════════════════════════════════════════════════ */

/** 01 — Optical Airgap: CINEMATIC VERSION with enhanced photon beams, particle effects, 3D depth */
function AirgapDiagram() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-6 sm:p-8 select-none particle-container">
      {/* Titlebar with cinematic styling */}
      <div className="w-full flex items-center gap-2 mb-2">
        <div className="flex gap-1.5">
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2}} className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-500 shadow-lg shadow-red-200"/>
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.3}} className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-yellow-200"/>
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.6}} className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-200"/>
        </div>
        <span className="ml-3 text-[11px] font-mono text-slate-400 tracking-widest uppercase">Optical Channel — Zero Wires</span>
        <motion.div 
          animate={{opacity:[0.5,1,0.5]}} 
          transition={{repeat:Infinity,duration:1.5}}
          className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 border border-slate-200">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-glow-pulse-green"/>
          <span className="text-[9px] font-bold text-slate-500 font-mono">LIVE</span>
        </motion.div>
      </div>

      <div className="flex items-stretch gap-0 w-full max-w-lg depth-layer">
        {/* Node A — Enhanced with cinematic depth */}
        <motion.div 
          initial={{opacity:0,x:-30,rotateY:-15}} 
          animate={{opacity:1,x:0,rotateY:0}} 
          transition={{duration:0.7,ease:[0.16,1,0.3,1]}}
          className="flex-1 glass-cinematic rounded-2xl p-4 relative overflow-hidden group">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 animate-shimmer opacity-30 pointer-events-none"/>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shadow-lg">
                <Database className="w-4 h-4 text-white"/>
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Node A</div>
                <div className="text-[9px] text-slate-400 font-mono">Online Infrastructure</div>
              </div>
            </div>
            
            {[
              {icon:Fingerprint,label:'Biometric Auth',color:'text-slate-600'},
              {icon:Shield,label:'Smart Card NFC',color:'text-slate-600'},
              {icon:WifiOff,label:'Sign QR Token',color:'text-slate-600'},
              {icon:Database,label:'Server Log',color:'text-slate-600'}
            ].map((t,i)=>(
              <motion.div 
                key={t.label} 
                initial={{opacity:0,x:-10}}
                animate={{opacity:1,x:0}}
                transition={{delay:0.1*i+0.3,duration:0.4}}
                className="flex items-center gap-2 text-[11px] text-slate-500 mb-2 py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-5 h-5 rounded-lg bg-slate-100 flex items-center justify-center">
                  <t.icon className="w-3 h-3 text-slate-400"/>
                </div>
                <span className={t.color}>{t.label}</span>
                <motion.div 
                  animate={{scale:[1,1.2,1],opacity:[0.5,1,0.5]}} 
                  transition={{repeat:Infinity,duration:1.5,delay:i*0.2}}
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400"/>
              </motion.div>
            ))}
            
            <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 border border-green-200">
              <motion.div 
                animate={{scale:[1,1.3,1],opacity:[1,0.6,1]}} 
                transition={{repeat:Infinity,duration:1.2}}
                className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-lg shadow-green-200"/>
              <span className="text-[10px] font-bold text-green-600 font-mono tracking-wide">ONLINE ACTIVE</span>
            </div>
          </div>
        </motion.div>

        {/* Channel — Cinematic optical beam */}
        <div className="flex flex-col items-center mx-2 sm:mx-3 shrink-0 justify-center" style={{width:90}}>
          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-3 text-center">Optical<br/>Bridge</div>
          
          {/* Enhanced beam track with glow */}
          <div className="relative w-full h-20 flex flex-col items-center justify-center">
            {/* Background track glow */}
            <div className="absolute w-full h-1 rounded-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 opacity-50"/>
            
            {/* Active beam line */}
            <motion.div 
              animate={{opacity:[0.3,0.8,0.3]}}
              transition={{repeat:Infinity,duration:2}}
              className="absolute w-full h-0.5 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-lg shadow-amber-200"/>
            
            {/* Enhanced photon particles */}
            {[0,1,2,3].map(i=>(
              <motion.div 
                key={i} 
                className="absolute w-3 h-3 rounded-full z-10"
                style={{
                  background:'radial-gradient(circle,rgba(232,119,34,0.9) 0%,rgba(244,162,97,0.6) 50%,transparent 70%)',
                  boxShadow:'0 0 20px rgba(232,119,34,0.8), 0 0 40px rgba(232,119,34,0.4)',
                  top:`${25 + i * 15}%`
                }}
                animate={{left:['-10%','110%'],scale:[0.8,1.3,0.8]}}
                transition={{duration:1.8,delay:i*0.45,repeat:Infinity,ease:'linear'}}/>
            ))}
            
            {/* Trail effect particles */}
            {[0,1,2].map(i=>(
              <motion.div 
                key={`trail-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 opacity-60"
                style={{top:`${30 + i * 20}%`}}
                animate={{left:['-10%','110%'],opacity:[0,0.6,0]}}
                transition={{duration:1.8,delay:i*0.45+0.2,repeat:Infinity,ease:'linear'}}/>
            ))}
          </div>
          
          {/* QR token with enhanced styling */}
          <motion.div 
            animate={{opacity:[0.5,1,0.5],y:[0,-3,0]}} 
            transition={{repeat:Infinity,duration:2}}
            className="mt-3 px-3 py-1.5 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-md">
            <div className="text-[9px] font-bold text-amber-600 font-mono text-center">QR 90s TTL</div>
            <div className="text-[7px] text-amber-400 text-center font-mono">RSA-4096</div>
          </motion.div>
          
          {/* No-wire badges with icons */}
          <div className="mt-3 flex flex-col items-center gap-1">
            {['No Wire','No WiFi','No BT'].map((t,i)=>(
              <motion.span 
                key={t} 
                initial={{opacity:0,x:-10}}
                animate={{opacity:1,x:0}}
                transition={{delay:0.5+i*0.1}}
                className="text-[8px] text-red-500 font-semibold flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-100">
                <X className="w-3 h-3"/>{t}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Node B — Enhanced airgapped panel */}
        <motion.div 
          initial={{opacity:0,x:30,rotateY:15}} 
          animate={{opacity:1,x:0,rotateY:0}} 
          transition={{duration:0.7,delay:0.2,ease:[0.16,1,0.3,1]}}
          className="flex-1 glass-cinematic rounded-2xl p-4 relative overflow-hidden">
          {/* Security border glow */}
          <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-slate-200 opacity-50"/>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-lg">
                <Shield className="w-4 h-4 text-white"/>
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Node B</div>
                <div className="text-[9px] text-slate-400 font-mono">Airgapped Unit</div>
              </div>
            </div>
            
            {[
              {icon:CheckCircle2,label:'QR Scan Only',color:'text-slate-600'},
              {icon:Database,label:'PROM Voter List',color:'text-slate-600'},
              {icon:Activity,label:'EEPROM Chain',color:'text-slate-600'},
              {icon:Printer,label:'VVPAT Print',color:'text-slate-600'}
            ].map((t,i)=>(
              <motion.div 
                key={t.label}
                initial={{opacity:0,x:10}}
                animate={{opacity:1,x:0}}
                transition={{delay:0.1*i+0.4,duration:0.4}}
                className="flex items-center gap-2 text-[11px] text-slate-500 mb-2 py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-5 h-5 rounded-lg bg-slate-100 flex items-center justify-center">
                  <t.icon className="w-3 h-3 text-slate-400"/>
                </div>
                <span className={t.color}>{t.label}</span>
              </motion.div>
            ))}
            
            <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-400"/>
              <span className="text-[10px] font-bold text-slate-500 font-mono tracking-wide">AIRGAPPED</span>
              <WifiOff className="w-3 h-3 text-slate-400 ml-auto"/>
            </div>
          </div>
        </motion.div>
      </div>

      {/* A=B=C footer — Enhanced equality validation */}
      <motion.div 
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.6,duration:0.5}}
        className="flex gap-2 w-full max-w-lg">
        {[
          {l:'A',sub:'Server Log',c:'text-slate-700',bg:'bg-slate-100',border:'border-slate-200',icon:Database},
          {l:'B',sub:'EEPROM',c:'text-slate-700',bg:'bg-slate-100',border:'border-slate-200',icon:Activity},
          {l:'C',sub:'VVPAT',c:'text-slate-700',bg:'bg-slate-100',border:'border-slate-200',icon:Printer}
        ].map((r,i)=>(
          <motion.div 
            key={r.l} 
            whileHover={{scale:1.02,y:-2}}
            className={`flex-1 text-center py-3 rounded-xl ${r.bg} border ${r.border} relative overflow-hidden group cursor-default`}>
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <r.icon className="w-3 h-3 text-slate-400"/>
              <div className="text-lg font-black text-slate-800 font-mono">{r.l}</div>
            </div>
            <div className="text-[9px] text-slate-500 font-medium">{r.sub}</div>
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
              animate={{opacity:[0,1,0],scaleX:[0,1,0]}}
              transition={{repeat:Infinity,duration:2,delay:i*0.3}}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/** 02 — Hash Chain: CINEMATIC VERSION with 3D depth, glowing connections, explosion effects */
function HashDiagram() {
  const [tampered, setTampered] = React.useState(false);
  const [phase, setPhase] = React.useState(0); // 0=building, 1=built, 2=tampered
  const [hashCycle, setHashCycle] = React.useState(0);
  const [showExplosion, setShowExplosion] = React.useState(false);
  
  React.useEffect(()=>{
    setTampered(false); setPhase(0); setShowExplosion(false);
    const t1 = setTimeout(()=>setPhase(1), 1600);
    const t2 = setTimeout(()=>{ setPhase(2); setTampered(true); setShowExplosion(true); }, 4000);
    const t3 = setTimeout(()=>setHashCycle(c=>c+1), 7500);
    return ()=>{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  },[hashCycle]);

  const blocks = [
    {id:1, hash:'a3f9c1',prev:'GENESIS', g:'from-slate-600 to-slate-700', tc:'text-slate-700', bg:'bg-slate-100',accent:'#64748b'},
    {id:2, hash:'d7b28e',prev:'a3f9c1',  g:'from-slate-600 to-slate-700',tc:'text-slate-700',bg:'bg-slate-100',accent:'#64748b'},
    {id:3, hash:'f1e42a',prev:'d7b28e',  g:'from-amber-500 to-orange-500',tc:'text-amber-700',bg:'bg-amber-50',accent:'#f59e0b'},
    {id:4, hash:'9c0d7f',prev:'f1e42a',  g:'from-emerald-500 to-green-500',tc:'text-emerald-700', bg:'bg-emerald-50',accent:'#10b981'},
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-6 sm:p-8 select-none relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage:'radial-gradient(circle,#64748b 1px,transparent 1px)',
        backgroundSize:'20px 20px'
      }}/>
      
      {/* Header with cinematic status indicator */}
      <div className="w-full flex items-center gap-2 mb-2 relative z-10">
        <div className="flex gap-1.5">
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2}} className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-500"/>
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.3}} className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500"/>
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.6}} className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"/>
        </div>
        <span className="ml-3 text-[11px] font-mono text-slate-400 tracking-widest uppercase">EEPROM Hash Chain</span>
        
        {phase===2 && (
          <motion.div 
            initial={{opacity:0,scale:0.8}} 
            animate={{opacity:1,scale:1}} 
            className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-50 border border-red-200">
            <motion.div animate={{scale:[1,1.3,1]}} transition={{repeat:Infinity,duration:0.5}} className="w-2 h-2 rounded-full bg-red-500"/>
            <span className="text-[10px] font-bold text-red-600 font-mono">BREACH DETECTED</span>
          </motion.div>
        )}
      </div>

      {/* Chain blocks with 3D depth */}
      <div className="flex items-center gap-2 w-full max-w-xl flex-wrap justify-center relative z-10">
        {blocks.map((b,i)=>{
          const broken = tampered && i >= 2;
          const isTarget = i === 2;
          
          return (
            <React.Fragment key={b.id}>
              {/* Block with enhanced 3D styling */}
              <motion.div
                initial={{opacity:0,scale:0.6,rotateY:90,y:20}}
                animate={phase>0?{
                  opacity:1,scale:broken?1.02:1,rotateY:0,y:broken?[0,-4,0]:0
                }:{opacity:0,scale:0.6,rotateY:90,y:20}}
                transition={{delay:i*0.25,duration:0.5,ease:[0.16,1,0.3,1]}}
                className={`relative rounded-xl p-3 border-2 transition-all duration-300 ${
                  broken && isTarget 
                    ? 'border-red-400 bg-red-50 animate-block-shake' 
                    : `${b.bg} border-white shadow-lg`
                }`}
                style={{minWidth:85,transformStyle:'preserve-3d'}}>
                
                {/* Block header with gradient */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r ${b.g} opacity-60`}/>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-bold text-slate-400">Block #{b.id}</span>
                    {broken && isTarget && (
                      <motion.div 
                        animate={{rotate:[0,15,-15,0],scale:[1,1.2,1]}} 
                        transition={{repeat:Infinity,duration:0.3}}
                        className="text-red-500">
                        <AlertTriangle className="w-3 h-3"/>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className={`text-[12px] font-black font-mono tracking-tight ${broken?'text-red-600':b.tc}`}>
                    {broken && isTarget ? (
                      <motion.span 
                        animate={{opacity:[1,0.3,1]}} 
                        transition={{repeat:Infinity,duration:0.2}}
                        className="font-mono">CORRUPTED</motion.span>
                    ) : b.hash}
                  </div>
                  
                  <div className="text-[9px] text-slate-400 mt-1 font-mono truncate flex items-center gap-1">
                    <ArrowRight className="w-2 h-2 text-slate-300"/>
                    {broken && isTarget ? 'INVALID' : b.prev}
                  </div>
                </div>
                
                {/* Explosion effect for tampered block */}
                {showExplosion && isTarget && broken && (
                  <motion.div 
                    initial={{scale:0,opacity:1}}
                    animate={{scale:[0,2,3],opacity:[1,0.5,0]}}
                    transition={{duration:0.6}}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full rounded-xl bg-red-400 blur-xl"/>
                  </motion.div>
                )}
              </motion.div>
              
              {/* Connection arrow with glow effect */}
              {i<blocks.length-1 && (
                <motion.div 
                  initial={{scaleX:0,opacity:0}} 
                  animate={phase>0?{scaleX:1,opacity:1}:{scaleX:0,opacity:0}} 
                  transition={{delay:i*0.25+0.3,duration:0.4,ease:[0.16,1,0.3,1]}}
                  className="relative">
                  <ArrowRight className={`w-4 h-4 ${broken&&i>=1?'text-red-400':'text-slate-300'}`}/>
                  {/* Glow line under arrow */}
                  <motion.div 
                    animate={{opacity:[0.3,0.8,0.3]}}
                    transition={{repeat:Infinity,duration:1.5,delay:i*0.2}}
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent"
                  />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Enhanced status bar with holographic effect */}
      <motion.div 
        animate={tampered?{borderColor:'rgba(239,68,68,0.4)'}:{borderColor:'rgba(16,185,129,0.3)'}}
        className={`flex items-center gap-4 w-full max-w-xl px-5 py-4 rounded-2xl border-2 transition-all duration-500 relative overflow-hidden ${
          tampered?'bg-red-50/80':'bg-emerald-50/80'
        }`}>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 animate-shimmer opacity-20"/>
        
        {/* Icon with pulse */}
        <motion.div 
          animate={tampered?{scale:[1,1.1,1]}:{scale:1}}
          transition={{repeat:Infinity,duration:1}}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
            tampered?'bg-red-100 shadow-red-200':'bg-emerald-100 shadow-emerald-200'
          }`}>
          {tampered ? (
            <motion.div animate={{rotate:[0,10,-10,0]}} transition={{repeat:Infinity,duration:0.5}}>
              <AlertTriangle className="w-6 h-6 text-red-600"/>
            </motion.div>
          ) : (
            <motion.div animate={{scale:[1,1.1,1]}} transition={{repeat:Infinity,duration:2}}>
              <Shield className="w-6 h-6 text-emerald-600"/>
            </motion.div>
          )}
        </motion.div>
        
        {/* Status text */}
        <div className="relative z-10">
          <div className={`text-sm font-bold ${tampered?'text-red-700':'text-emerald-700'}`}>
            {tampered ? (
              <span className="flex items-center gap-2">
                Chain Compromised
                <motion.span animate={{opacity:[0,1,0]}} transition={{repeat:Infinity,duration:0.8}} className="text-red-500">▮</motion.span>
              </span>
            ) : 'Chain Integrity Verified'}
          </div>
          <div className={`text-[11px] font-mono mt-0.5 ${tampered?'text-red-500':'text-emerald-600'}`}>
            {tampered ? 'SHA-256 mismatch detected · Auto-lock engaged' : 'SHA-256 chain intact · EEPROM sealed'}
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="ml-auto flex flex-col items-end gap-1">
          <div className="flex gap-0.5">
            {[0,1,2,3].map(idx=>{
              const isActive = phase === 0 ? idx < 1 : phase === 1 ? idx < 4 : idx < 2;
              return (
                <motion.div 
                  key={idx}
                  animate={{ 
                    backgroundColor: isActive 
                      ? tampered && idx >= 2 ? '#ef4444' : '#10b981'
                      : '#e2e8f0',
                    scale: isActive ? 1 : 0.8
                  }}
                  className="w-2 h-2 rounded-full"
                />
              );
            })}
          </div>
          <span className="text-[9px] text-slate-400 font-mono">
            {phase===0?'Building...':phase===1?'Valid':'Locked'}
          </span>
        </div>
      </motion.div>

      {/* Demo cycle indicator */}
      <div className="text-[10px] text-slate-400 font-mono text-center flex items-center gap-2">
        <span>Demo cycle:</span>
        <span className={phase===0?'text-amber-600 font-bold':'text-slate-400'}>Build</span>
        <ArrowRight className="w-3 h-3"/>
        <span className={phase===1?'text-emerald-600 font-bold':'text-slate-400'}>Validate</span>
        <ArrowRight className="w-3 h-3"/>
        <span className={phase===2?'text-red-600 font-bold':'text-slate-400'}>Detect</span>
        <ArrowRight className="w-3 h-3"/>
        <span className="text-slate-400">Repeat</span>
      </div>
    </div>
  );
}

/** 03 — Hardware Watchdog: CINEMATIC VERSION with circuit board aesthetic, electrical pulses, lightning */
function WatchdogDiagram() {
  const [pingActive, setPingActive] = React.useState(true);
  const [powerCut, setPowerCut] = React.useState(false);
  const [cycle, setCycle] = React.useState(0);
  const [showLightning, setShowLightning] = React.useState(false);

  React.useEffect(()=>{
    setPingActive(true); setPowerCut(false); setShowLightning(false);
    const t1 = setTimeout(()=>setPingActive(false), 3500);
    const t2 = setTimeout(()=>{ setPowerCut(true); setShowLightning(true); }, 4200);
    const t3 = setTimeout(()=>{ setPingActive(true); setPowerCut(false); setShowLightning(false); setCycle(c=>c+1); }, 7000);
    return ()=>{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  },[cycle]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-6 sm:p-8 select-none relative overflow-hidden">
      {/* Circuit board background pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage:`
          linear-gradient(90deg,#64748b 1px,transparent 1px),
          linear-gradient(180deg,#64748b 1px,transparent 1px)
        `,
        backgroundSize:'40px 40px'
      }}/>
      
      {/* Lightning flash overlay */}
      {showLightning && (
        <motion.div 
          initial={{opacity:0}} 
          animate={{opacity:[0,0.3,0,0.5,0]}} 
          transition={{duration:0.5}}
          className="absolute inset-0 bg-red-100 pointer-events-none z-20"
        />
      )}
      
      {/* Header with live indicator */}
      <div className="w-full flex items-center gap-2 mb-2 relative z-10">
        <div className="flex gap-1.5">
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2}} className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-500"/>
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.3}} className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500"/>
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.6}} className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"/>
        </div>
        <span className="ml-3 text-[11px] font-mono text-slate-400 tracking-widest uppercase">Hardware Watchdog</span>
        
        <motion.div 
          animate={{opacity:pingActive?1:0.3}}
          className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 border border-slate-200">
          <motion.div 
            animate={{scale:[1,1.3,1]}} 
            transition={{repeat:Infinity,duration:pingActive?0.5:1.5}}
            className={`w-1.5 h-1.5 rounded-full ${pingActive?'bg-green-500':'bg-red-400'}`}
          />
          <span className="text-[9px] font-bold text-slate-500 font-mono">
            {pingActive?'LIVE':'OFFLINE'}
          </span>
        </motion.div>
      </div>

      <div className="flex items-center gap-6 w-full max-w-md justify-center relative z-10">
        {/* Main CPU — Circuit board style */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={powerCut?{scale:[1,0.95,0.95],opacity:0.5}:{scale:1,opacity:1}}
            transition={{duration:0.3}}
            className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center border-2 relative overflow-hidden ${
              powerCut?'bg-red-50 border-red-300':'bg-slate-50 border-slate-200'
            }`}>
            {/* Circuit trace decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 left-2 w-8 h-px bg-slate-600"/>
              <div className="absolute top-2 left-2 w-px h-8 bg-slate-600"/>
              <div className="absolute bottom-2 right-2 w-8 h-px bg-slate-600"/>
              <div className="absolute bottom-2 right-2 w-px h-8 bg-slate-600"/>
            </div>
            
            <Cpu className={`w-10 h-10 mb-1 ${powerCut?'text-red-400':'text-slate-600'}`}/>
            <div className={`text-[10px] font-bold font-mono ${powerCut?'text-red-500':'text-slate-700'}`}>MAIN CPU</div>
            
            {/* Status LED */}
            <motion.div 
              animate={powerCut?{opacity:0}:{opacity:[1,0.3,1]}}
              transition={{repeat:Infinity,duration:1}}
              className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-400"
            />
          </motion.div>
          
          {powerCut ? (
            <motion.div 
              initial={{opacity:0,y:-4}} 
              animate={{opacity:1,y:0}}
              className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 border border-red-200 px-2 py-1 rounded-full font-mono">
              <WifiOff className="w-3 h-3"/>
              POWER CUT
            </motion.div>
          ) : (
            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:1}} className="w-1.5 h-1.5 rounded-full bg-green-400"/>
              Running
            </div>
          )}
        </div>

        {/* Ping channel — Enhanced electrical pulses */}
        <div className="flex flex-col items-center gap-1" style={{width:100}}>
          <div className="text-[9px] font-mono text-slate-400 mb-1 uppercase tracking-wider">10ms Ping</div>
          
          {/* Ping channel (CPU → MCU) */}
          <div className="relative w-full h-6 flex items-center">
            {/* Channel background */}
            <div className={`absolute w-full h-0.5 rounded-full transition-colors duration-500 ${pingActive?'bg-slate-200':'bg-red-100'}`}/>
            
            {/* Active signal indicator */}
            {pingActive && (
              <motion.div 
                animate={{opacity:[0.3,1,0.3]}}
                transition={{repeat:Infinity,duration:0.5}}
                className="absolute w-full h-0.5 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400"
              />
            )}
            
            {/* Electrical pulse packets */}
            {pingActive && [0,1,2].map(i=>(
              <motion.div 
                key={i} 
                className="absolute w-3 h-3 rounded-full z-10"
                style={{
                  background:'radial-gradient(circle,#10b981 0%,#34d399 50%,transparent 70%)',
                  boxShadow:'0 0 12px rgba(16,185,129,0.8), 0 0 24px rgba(16,185,129,0.4)',
                  top:'50%',
                  transform:'translateY(-50%)'
                }}
                animate={{left:['-10%','110%'],scale:[0.8,1.2,0.8]}}
                transition={{duration:0.6,delay:i*0.2,repeat:Infinity,ease:'linear'}}
              />
            ))}
            
            {/* Broken connection indicator */}
            {!pingActive && (
              <motion.div 
                initial={{scale:0}} 
                animate={{scale:1}} 
                className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-50 border border-red-200">
                  <X className="w-3 h-3 text-red-500"/>
                  <span className="text-[8px] font-bold text-red-500 font-mono">TIMEOUT</span>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Bidirectional indicator */}
          <div className="flex items-center gap-1 my-1">
            <motion.div 
              animate={pingActive?{opacity:[0.3,1,0.3]}:{opacity:0.3}}
              transition={{repeat:Infinity,duration:1}}
              className="w-6 h-px bg-gradient-to-r from-emerald-400 to-transparent rounded-full"
            />
            <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
              <Activity className="w-2.5 h-2.5 text-slate-400"/>
            </div>
            <motion.div 
              animate={pingActive?{opacity:[0.3,1,0.3]}:{opacity:0.3}}
              transition={{repeat:Infinity,duration:1,delay:0.5}}
              className="w-6 h-px bg-gradient-to-l from-slate-400 to-transparent rounded-full"
            />
          </div>
          
          {/* Ack channel (MCU → CPU) */}
          <div className="relative w-full h-6 flex items-center">
            <div className={`absolute w-full h-0.5 rounded-full transition-colors duration-500 ${pingActive?'bg-slate-200':'bg-red-100'}`}/>
            
            {pingActive && [0,1,2].map(i=>(
              <motion.div 
                key={i} 
                className="absolute w-2.5 h-2.5 rounded-full z-10"
                style={{
                  background:'radial-gradient(circle,#64748b 0%,#94a3b8 50%,transparent 70%)',
                  boxShadow:'0 0 10px rgba(100,116,139,0.6)',
                  top:'50%',
                  transform:'translateY(-50%)'
                }}
                animate={{left:['110%','-10%'],scale:[0.8,1.1,0.8]}}
                transition={{duration:0.5,delay:i*0.25+0.1,repeat:Infinity,ease:'linear'}}
              />
            ))}
          </div>
          
          <span className="text-[9px] text-slate-400 font-mono mt-1">ACK Response</span>
        </div>

        {/* Watchdog MCU — Enhanced styling */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={powerCut?{scale:1.05}:{scale:1}}
            transition={{duration:0.3}}
            className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center border-2 relative overflow-hidden ${
              powerCut?'bg-red-50 border-red-300':'bg-emerald-50 border-emerald-200'
            }`}>
            {/* Circuit decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 right-2 w-8 h-px bg-slate-600"/>
              <div className="absolute top-2 right-2 w-px h-8 bg-slate-600"/>
              <div className="absolute bottom-2 left-2 w-8 h-px bg-slate-600"/>
              <div className="absolute bottom-2 left-2 w-px h-8 bg-slate-600"/>
            </div>
            
            <Activity className={`w-10 h-10 mb-1 ${powerCut?'text-red-500':'text-emerald-600'}`}/>
            <div className={`text-[10px] font-bold font-mono ${powerCut?'text-red-600':'text-emerald-700'}`}>WDT MCU</div>
            
            {/* Status LED */}
            <motion.div 
              animate={powerCut?{opacity:[1,0.3,1]}:{opacity:1}}
              transition={{repeat:Infinity,duration:0.3}}
              className={`absolute top-2 right-2 w-2 h-2 rounded-full ${powerCut?'bg-red-500':'bg-emerald-400'}`}
            />
          </motion.div>
          
          <motion.div
            animate={powerCut?{scale:[1,1.05,1]}:{scale:1}}
            transition={{repeat:powerCut?Infinity:0,duration:0.5}}
            className={`flex items-center gap-1 text-[10px] font-bold font-mono px-3 py-1.5 rounded-full border ${
              powerCut?'text-red-600 bg-red-50 border-red-200':'text-emerald-600 bg-emerald-50 border-emerald-200'
            }`}>
            {powerCut?(
              <><WifiOff className="w-3 h-3"/> CUTTING POWER</>
            ):('🛡️ Monitoring')}
          </motion.div>
        </div>
      </div>

      {/* Enhanced timeline cards */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-md relative z-10">
        {[
          {t:'Ping Stops',d:'CPU crash/freeze',icon:X,c:'text-red-600',bg:'bg-red-50',border:'border-red-200',active:!pingActive},
          {t:'< 30ms',d:'Watchdog detects',icon:Activity,c:'text-amber-600',bg:'bg-amber-50',border:'border-amber-200',active:!pingActive},
          {t:'Power Cut',d:'Hardware reset',icon:WifiOff,c:'text-emerald-600',bg:'bg-emerald-50',border:'border-emerald-200',active:powerCut},
        ].map((s,i)=>(
          <motion.div 
            key={i}
            animate={s.active?{scale:1.03,y:-2}:{scale:1,y:0}}
            transition={{duration:0.3}}
            className={`text-center p-3 rounded-xl border ${s.bg} ${s.border} transition-all duration-300 relative overflow-hidden`}>
            {/* Active indicator bar */}
            <motion.div 
              animate={s.active?{opacity:1,scaleX:1}:{opacity:0,scaleX:0}}
              className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${s.active?(s.c.includes('red')?'bg-red-500':'bg-emerald-500'):'bg-transparent'}`}
            />
            
            <div className="flex justify-center mb-1">
              <s.icon className={`w-4 h-4 ${s.c}`}/>
            </div>
            <div className={`font-black ${s.c} font-mono text-[10px]`}>{s.t}</div>
            <div className="text-slate-500 mt-0.5 leading-tight text-[9px]">{s.d}</div>
          </motion.div>
        ))}
      </div>
      
      {/* Footer note */}
      <div className="text-[10px] text-slate-400 font-mono text-center relative z-10 flex items-center gap-2">
        <Shield className="w-3 h-3"/>
        Software cannot override hardware watchdog — independent circuit protection
      </div>
    </div>
  );
}

/** 04 — VVPAT: CINEMATIC VERSION with realistic printer physics, paper slip animation, enhanced steps */
function VVPATDiagram() {
  const [step, setStep] = React.useState(0);
  const [vvpatCycle, setVvpatCycle] = React.useState(0);
  const [printProgress, setPrintProgress] = React.useState(0);
  const [viewCountdown, setViewCountdown] = React.useState(5);
  
  // steps: 0=idle, 1=vote tapped, 2=printing, 3=viewing, 4=deposited
  React.useEffect(()=>{
    setStep(0);
    setPrintProgress(0);
    setViewCountdown(5);
    
    const t1 = setTimeout(()=>setStep(1), 800);
    const t2 = setTimeout(()=>setStep(2), 1600);
    
    // Print progress animation
    const printInterval = setInterval(()=>{
      setPrintProgress(p=>{
        if(p>=100){clearInterval(printInterval);return 100;}
        return p+10;
      });
    },150);
    const stopPrint = setTimeout(()=>clearInterval(printInterval), 3200);
    
    const t3 = setTimeout(()=>{setStep(3);setPrintProgress(100);}, 3200);
    
    // View countdown
    const countdownInterval = setInterval(()=>{
      setViewCountdown(c=>c>0?c-1:0);
    },1000);
    const stopCountdown = setTimeout(()=>clearInterval(countdownInterval), 8500);
    
    const t4 = setTimeout(()=>setStep(4), 8500);
    const t5 = setTimeout(()=>setVvpatCycle(c=>c+1), 11000);
    
    return ()=>{
      clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);clearTimeout(t4);clearTimeout(t5);
      clearTimeout(stopPrint);clearTimeout(stopCountdown);
      clearInterval(printInterval);clearInterval(countdownInterval);
    };
  },[vvpatCycle]);

  const candidates = ['BJP — Candidate A','INC — Candidate B','AAP — Candidate C'];
  const chosen = 1;
  const steps = [
    {icon:'👆',label:'Vote Cast',color:'bg-slate-100'},
    {icon:'🖨️',label:'Printing',color:'bg-amber-100'},
    {icon:'👁️',label:'Verify 5s',color:'bg-blue-100'},
    {icon:'🗳️',label:'Secured',color:'bg-emerald-100'}
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6 sm:p-8 select-none relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,#64748b 2px,#64748b 4px)'
      }}/>
      
      {/* Header */}
      <div className="w-full flex items-center gap-2 mb-1 relative z-10">
        <div className="flex gap-1.5">
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2}} className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-500"/>
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.3}} className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500"/>
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.6}} className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"/>
        </div>
        <span className="ml-3 text-[11px] font-mono text-slate-400 tracking-widest uppercase">VVPAT Paper Trail</span>
        
        <motion.div 
          animate={{opacity:[0.5,1,0.5]}} 
          transition={{repeat:Infinity,duration:1.5}}
          className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 border border-slate-200">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-glow-pulse-green"/>
          <span className="text-[9px] font-bold text-slate-500 font-mono">LIVE</span>
        </motion.div>
      </div>

      {/* Enhanced step flow */}
      <div className="flex items-center gap-1.5 w-full max-w-lg justify-center relative z-10">
        {steps.map((s,i)=>(
          <React.Fragment key={s.label}>
            <motion.div
              initial={{opacity:0,y:10}}
              animate={{
                opacity:step>=i?1:0.3,
                scale:step===i?1.05:1,
                y:step===i?-2:0
              }}
              transition={{duration:0.3}}
              className={`flex-1 text-center py-2.5 px-1 rounded-xl border-2 text-[10px] font-bold transition-all duration-300 relative overflow-hidden ${
                step>i?'bg-emerald-50 border-emerald-200 text-emerald-700':
                step===i?'bg-amber-50 border-amber-300 text-amber-700 shadow-lg shadow-amber-100':
                'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                {/* Active indicator */}
                {step===i && (
                  <motion.div 
                    layoutId="activeStep"
                    className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-current"
                    transition={{type:'spring',stiffness:500,damping:40}}
                  />
                )}
                
                <div className="text-lg mb-0.5">{s.icon}</div>
                <div className="text-[9px]">{s.label}</div>
                
                {/* Progress indicator for printing step */}
                {step===i && i===1 && (
                  <div className="absolute bottom-0 left-0 h-1 bg-amber-400 rounded-b-xl" style={{width:`${printProgress}%`}}/>
                )}
              </motion.div>
            {i<3 && (
              <motion.div 
                animate={{color:step>i?'#10b981':'#cbd5e1'}}
                className="shrink-0">
                <ArrowRight className="w-4 h-4"/>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* EVM + VVPAT cinematic view */}
      <div className="flex items-start gap-4 w-full max-w-md justify-center relative z-10">
        {/* EVM Unit */}
        <motion.div 
          initial={{opacity:0,x:-20}}
          animate={{opacity:1,x:0}}
          transition={{duration:0.5}}
          className="flex flex-col items-center gap-2">
          <div className="bg-slate-50 rounded-2xl border-2 border-slate-200 p-4 w-40 shadow-lg shadow-slate-100">
            {/* EVM header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-glow-pulse-green"/>
                <span className="text-[9px] font-bold text-slate-600 font-mono">EVM UNIT</span>
              </div>
              <span className="text-[8px] text-slate-400 font-mono">B2847-MH</span>
            </div>
            
            {/* Candidate list */}
            <div className="space-y-1.5">
              {candidates.map((c,i)=>(
                <motion.div key={i}
                  animate={step>=1&&i===chosen?{
                    backgroundColor:'rgba(232,119,34,0.08)',
                    borderColor:'rgba(232,119,34,0.3)',
                    scale:[1,1.02,1]
                  }:{}}
                  transition={{duration:0.3}}
                  className={`flex items-center gap-2 py-2 px-2.5 rounded-lg border transition-all duration-300 ${
                    step>=1&&i===chosen?'border-amber-200 bg-amber-50/50':'border-slate-100'
                  }`}>
                  <motion.div 
                    animate={step>=1&&i===chosen?{scale:[1,1.2,1]}:{}}
                    transition={{repeat:step>=1&&i===chosen?Infinity:0,duration:0.5}}
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      step>=1&&i===chosen?'border-amber-500 bg-amber-500':'border-slate-300'
                    }`}>
                    {step>=1&&i===chosen && (
                      <motion.div 
                        initial={{scale:0}} 
                        animate={{scale:1}} 
                        className="w-2 h-2 rounded-full bg-white shadow-sm"
                      />
                    )}
                  </motion.div>
                  <span className={`text-[10px] ${step>=1&&i===chosen?'text-slate-800 font-bold':'text-slate-500'}`}>
                    {c}
                  </span>
                  {step>=1&&i===chosen && (
                    <motion.div 
                      initial={{opacity:0,scale:0}} 
                      animate={{opacity:1,scale:1}}
                      className="ml-auto">
                      <CheckCircle2 className="w-4 h-4 text-green-500"/>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Status footer */}
            {step>=1 && (
              <motion.div 
                initial={{opacity:0,y:10}}
                animate={{opacity:1,y:0}}
                className="mt-3 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-green-50 border border-green-200">
                <motion.div animate={{scale:[1,1.3,1]}} transition={{repeat:Infinity,duration:1}} className="w-1.5 h-1.5 rounded-full bg-green-500"/>
                <span className="text-[9px] font-bold text-green-600 font-mono">VOTE RECORDED</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* VVPAT Printer Unit */}
        <motion.div 
          initial={{opacity:0,x:20}}
          animate={{opacity:1,x:0}}
          transition={{duration:0.5,delay:0.2}}
          className="flex flex-col items-center gap-2">
          {/* Printer head */}
          <div className={`w-36 rounded-xl border-2 p-3 transition-all duration-500 relative overflow-hidden ${
            step>=2?'bg-amber-50 border-amber-200 shadow-lg shadow-amber-100':'bg-slate-50 border-slate-200'
          }`}>
            {/* Status LED */}
            <div className="absolute top-2 right-2 flex items-center gap-1">
              {step>=2 && step<4 && (
                <motion.div 
                  animate={{opacity:[1,0.3,1]}}
                  transition={{repeat:Infinity,duration:0.8}}
                  className="w-1.5 h-1.5 rounded-full bg-amber-500"
                />
              )}
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${step>=2?'bg-amber-100':'bg-slate-100'}`}>
                <Printer className={`w-4 h-4 ${step>=2?'text-amber-600':'text-slate-400'}`}/>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-700 font-mono">VVPAT</div>
                <div className="text-[8px] text-slate-400 font-mono">Printer Unit</div>
              </div>
            </div>
            
            {/* Print progress bar */}
            {step===2 && (
              <div className="mt-2">
                <div className="flex justify-between text-[8px] text-amber-600 font-mono mb-1">
                  <span>Printing</span>
                  <span>{printProgress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400"
                    style={{width:`${printProgress}%`}}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Paper slot */}
          <div className="w-32 h-3 bg-slate-800 rounded-full shadow-inner relative z-20">
            <div className="absolute inset-x-2 top-0.5 h-0.5 bg-slate-600 rounded-full"/>
          </div>

          {/* Paper slip — Cinematic animation */}
          <motion.div
            initial={{height:0,opacity:0,y:-10}}
            animate={step>=2?{height:'auto',opacity:1,y:0}:{height:0,opacity:0,y:-10}}
            transition={{duration:0.6,ease:[0.16,1,0.3,1]}}
            className="overflow-hidden w-30 -mt-1 relative z-10">
            <motion.div 
              animate={step>=4?{opacity:0.5,y:5}:{opacity:1,y:0}}
              className={`rounded-b-lg border-x-2 border-b-2 transition-all duration-500 bg-white shadow-lg ${
                step>=4?'border-emerald-200':'border-amber-200'
              }`}>
              <div className="p-3 space-y-1.5">
                {/* Receipt header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-[8px] font-black text-slate-700 tracking-wide">VOTE RECEIPT</span>
                  <span className="text-[7px] text-slate-400 font-mono">ECI-VVPAT</span>
                </div>
                
                {/* Candidate selection */}
                <div className="flex items-start gap-1.5">
                  <motion.div 
                    initial={{scale:0}} 
                    animate={step>=2?{scale:1}:{}}
                    transition={{delay:0.3,type:'spring'}}
                    className="w-4 h-4 rounded bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-green-600"/>
                  </motion.div>
                  <div>
                    <div className="text-[9px] text-slate-800 font-bold leading-tight">{candidates[chosen]}</div>
                    <div className="text-[7px] text-slate-400 font-mono">Selected via EVM</div>
                  </div>
                </div>
                
                {/* Booth info */}
                <div className="text-[8px] text-slate-500 font-mono flex items-center gap-1">
                  <span className="px-1 py-0.5 rounded bg-slate-100 text-slate-600">BOOTH 2847-MH</span>
                  <span>•</span>
                  <span>{new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span>
                </div>
                
                {/* Signature line */}
                <div className="pt-1 border-t border-dashed border-slate-200">
                  <div className="text-[7px] text-slate-300 font-mono">ECI DIGITALLY SIGNED</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* View timer */}
          {step===3 && (
            <motion.div 
              initial={{opacity:0,scale:0.9}} 
              animate={{opacity:1,scale:1}}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200">
              <motion.div 
                animate={{rotate:360}}
                transition={{duration:5,ease:'linear'}}
                className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent"
              />
              <span className="text-[10px] font-bold text-blue-600 font-mono">
                View {viewCountdown}s
              </span>
            </motion.div>
          )}

          {/* Deposited status */}
          {step>=4 && (
            <motion.div 
              initial={{opacity:0,y:10}} 
              animate={{opacity:1,y:0}}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 shadow-lg shadow-emerald-100">
              <motion.div 
                initial={{scale:0}} 
                animate={{scale:1}}
                transition={{type:'spring',stiffness:500}}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600"/>
              </motion.div>
              <span className="text-[10px] font-bold text-emerald-700 font-mono">BALLOT BOX</span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Footer message */}
      <motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.5}}
        className="text-[10px] text-slate-400 font-mono text-center max-w-xs flex items-center gap-1.5 relative z-10">
        <Shield className="w-3 h-3"/>
        Paper trail is legally binding — physics beats cryptography
      </motion.div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════
   RECONCILIATION DIAGRAM — CINEMATIC VERSION with flowing particles, holographic verification
══════════════════════════════════════════════════════════════════ */
function ReconcDiagram() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: '0px 0px -20% 0px' });
  const [match, setMatch] = React.useState(false);
  const [mismatch, setMismatch] = React.useState(false);
  const [cycle, setCycle] = React.useState(0);
  const [particleBurst, setParticleBurst] = React.useState(false);

  React.useEffect(()=>{
    if (!inView) return;
    setMatch(false); setMismatch(false); setParticleBurst(false);
    const t1 = setTimeout(()=>{setMatch(true);setParticleBurst(true);}, 2000);
    const t2 = setTimeout(()=>{ setMatch(false); setMismatch(true); setParticleBurst(false);}, 5000);
    const t3 = setTimeout(()=>setCycle(c=>c+1), 8000);
    return ()=>{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  },[cycle, inView]);

  const streams = [
    { label:'A', name:'Server Log', sub:'Node A · Online DB', color:'#64748b', bg:'bg-slate-100', border:'border-slate-200', icon:Database, count:'9,42,183' },
    { label:'B', name:'EEPROM Chain', sub:'Node B · Hash Ledger', color:'#0f766e', bg:'bg-teal-50', border:'border-teal-200', icon:Activity, count:'9,42,183' },
    { label:'C', name:'VVPAT Paper', sub:'Ballot Box · Physical', color:'#059669', bg:'bg-emerald-50', border:'border-emerald-200', icon:Printer, count:mismatch?'9,42,101':'9,42,183' },
  ];

  return (
    <div ref={wrapRef} className="w-full glass-cinematic rounded-3xl p-6 sm:p-8 select-none overflow-hidden relative">
      {/* Background flowing particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_,i)=>(
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-amber-400/30"
            style={{
              left:`${15 + i * 15}%`,
              top:'20%'
            }}
            animate={{
              y:[0,120,0],
              opacity:[0,0.6,0],
              scale:[0.5,1,0.5]
            }}
            transition={{
              duration:3,
              delay:i*0.5,
              repeat:Infinity,
              ease:'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Header with status */}
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <div className="flex gap-1.5">
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2}} className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-500"/>
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.3}} className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500"/>
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.6}} className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"/>
        </div>
        <span className="ml-3 text-[11px] font-mono text-slate-400 tracking-widest uppercase">Triple Reconciliation Engine</span>
        
        {/* Live status badge */}
        <motion.div 
          animate={{opacity:[0.5,1,0.5]}} 
          transition={{repeat:Infinity,duration:1.5}}
          className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 border border-slate-200">
          <div className={`w-1.5 h-1.5 rounded-full ${match?'bg-emerald-500':mismatch?'bg-red-500':'bg-amber-500'} animate-glow-pulse`}/>
          <span className="text-[9px] font-bold text-slate-500 font-mono">
            {match?'VERIFIED':mismatch?'ALERT':'PROCESSING'}
          </span>
        </motion.div>
      </div>

      {/* Three streams with flowing data */}
      <div className="flex gap-3 mb-5 relative z-10">
        {streams.map((s,i)=>{
          const hasMismatch = mismatch && s.label === 'C';
          return (
            <motion.div key={i}
              initial={{opacity:0,y:-20,scale:0.95}} 
              animate={{opacity:1,y:0,scale:1}} 
              transition={{delay:i*0.15,duration:0.5,ease:[0.16,1,0.3,1]}}
              className={`flex-1 rounded-2xl p-4 ${s.bg} ${s.border} border-2 relative overflow-hidden group`}>
              {/* Shimmer effect */}
              <div className="absolute inset-0 animate-shimmer opacity-20"/>
              
              {/* Stream header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-white shadow-sm">
                  <s.icon className="w-4 h-4" style={{color:s.color}}/>
                </div>
                <div className={`text-2xl font-black font-mono`} style={{color:s.color}}>{s.label}</div>
              </div>
              
              <div className="text-[12px] font-bold text-slate-700 mb-1">{s.name}</div>
              <div className="text-[10px] text-slate-400 mb-3 font-mono">{s.sub}</div>
              
              {/* Count with animation */}
              <motion.div
                animate={hasMismatch?{x:[0,-2,2,-2,0]}:{}}
                transition={{repeat:hasMismatch?Infinity:0,duration:0.3}}
                className={`text-lg font-black font-mono ${hasMismatch?'text-red-600':'text-slate-800'}`}>
                {s.count}
              </motion.div>
              <div className="text-[10px] text-slate-400">verified votes</div>
              
              {/* Data flow particles */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                {[0,1,2].map(j=>{
                  const isMismatch = mismatch && i === 2;
                  return (
                    <motion.div
                      key={j}
                      animate={{
                        opacity:[0,1,0],
                        y:[-10,10],
                      }}
                      transition={{
                        duration:1.5,
                        delay:j*0.3,
                        repeat:Infinity,
                        ease:'easeInOut'
                      }}
                      className={`w-1.5 h-1.5 rounded-full ${isMismatch?'bg-red-400':'bg-current'}`}
                      style={{color:s.color,opacity:0.4}}
                    />
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Convergence zone with flowing particles */}
      <div className="relative h-16 mb-4">
        {/* Particle streams converging */}
        {[0,1,2].map(streamIdx=>{
          const isMismatch = mismatch && streamIdx === 2;
          return (
            <motion.div
              key={streamIdx}
              className="absolute top-0"
              style={{left:`${15 + streamIdx * 35}%`,width:'2px',height:'100%'}}>
              {/* Flowing dots */}
              {[0,1,2,3].map(i=>{
                const color = isMismatch ? '#ef4444' : streamIdx === 0 ? '#64748b' : streamIdx === 1 ? '#0f766e' : '#059669';
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{backgroundColor:color,left:'-3px'}}
                    animate={{
                      top:['0%','100%'],
                      opacity:[0,1,0],
                      scale:[0.5,1,0.5]
                    }}
                    transition={{
                      duration:1.2,
                      delay:i*0.3 + streamIdx*0.1,
                      repeat:Infinity,
                      ease:'linear'
                    }}
                  />
                );
              })}
            </motion.div>
          );
        })}

        {/* Central convergence point */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={match?{scale:[1,1.2,1]}:mismatch?{scale:[1,0.9,1]}:{}}
          transition={{repeat:Infinity,duration:1}}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
            match?'bg-emerald-100 border-emerald-400 shadow-lg shadow-emerald-200':
            mismatch?'bg-red-100 border-red-400 shadow-lg shadow-red-200':
            'bg-slate-100 border-slate-300'
          }`}>
            {match?(
              <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring'}}>
                <CheckCircle2 className="w-6 h-6 text-emerald-600"/>
              </motion.div>
            ):mismatch?(
              <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring'}}>
                <AlertTriangle className="w-6 h-6 text-red-600"/>
              </motion.div>
            ):null}
          </div>
        </motion.div>
      </div>

      {/* Verification gate with holographic effect */}
      <motion.div
        animate={match?{
          borderColor:'rgba(16,185,129,0.5)',
          boxShadow:'0 0 30px rgba(16,185,129,0.2)'
        }:mismatch?{
          borderColor:'rgba(239,68,68,0.5)',
          boxShadow:'0 0 30px rgba(239,68,68,0.2)'
        }:{
          borderColor:'rgba(148,163,184,0.3)',
          boxShadow:'0 4px 20px rgba(0,0,0,0.05)'
        }}
        transition={{duration:0.4}}
        className="rounded-2xl border-2 p-5 text-center relative overflow-hidden bg-white/50">
        
        {/* Holographic shimmer */}
        <div className="absolute inset-0 animate-shimmer opacity-10"/>
        
        {/* Particle burst on match */}
        {particleBurst && match && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_,i)=>{
              const angle = (i / 12) * 360;
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-emerald-400 left-1/2 top-1/2"
                  initial={{x:0,y:0,opacity:1,scale:1}}
                  animate={{
                    x:Math.cos(angle * Math.PI / 180) * 80,
                    y:Math.sin(angle * Math.PI / 180) * 80,
                    opacity:0,
                    scale:0
                  }}
                  transition={{duration:0.8,ease:'easeOut'}}
                />
              );
            })}
          </div>
        )}
        
        {/* Status content */}
        <div className="relative z-10">
          {!match && !mismatch && (
            <div>
              <div className="text-xl font-black text-slate-400 font-mono mb-2">A = B = C ?</div>
              <div className="flex items-center justify-center gap-2">
                <motion.div animate={{rotate:360}} transition={{duration:1,repeat:Infinity,ease:'linear'}} className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-slate-500"/>
                <span className="text-sm text-slate-400">Reconciling sources…</span>
              </div>
            </div>
          )}
          
          {match && (
            <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:'spring',stiffness:200}}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:1}}>
                  <CheckCircle2 className="w-6 h-6 text-emerald-500"/>
                </motion.div>
                <span className="text-xl font-black text-emerald-700 font-mono">VERIFIED MATCH</span>
              </div>
              <div className="text-sm text-emerald-600 font-medium">All three sources align — Election CERTIFIED</div>
            </motion.div>
          )}
          
          {mismatch && (
            <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:'spring',stiffness:200}}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <motion.div animate={{rotate:[0,10,-10,0]}} transition={{repeat:Infinity,duration:0.5}}>
                  <AlertTriangle className="w-6 h-6 text-red-500"/>
                </motion.div>
                <span className="text-xl font-black text-red-700 font-mono">MISMATCH DETECTED</span>
              </div>
              <div className="text-sm text-red-600 font-medium">A ≠ C discrepancy — Investigation TRIGGERED</div>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Demo cycle indicator */}
      <div className="text-[10px] text-slate-400 font-mono text-center mt-4 flex items-center justify-center gap-2">
        <span>Demo cycle:</span>
        <span className={!match&&!mismatch?'text-amber-600 font-bold':'text-slate-400'}>Process</span>
        <ArrowRight className="w-3 h-3"/>
        <span className={match?'text-emerald-600 font-bold':'text-slate-400'}>Match</span>
        <ArrowRight className="w-3 h-3"/>
        <span className={mismatch?'text-red-600 font-bold':'text-slate-400'}>Alert</span>
        <ArrowRight className="w-3 h-3"/>
        <span className="text-slate-400">Repeat</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   THREAT SHIELD DIAGRAM — CINEMATIC VERSION with shield pulses, impact effects, terminal aesthetic
══════════════════════════════════════════════════════════════════ */
function ThreatShieldDiagram() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: '0px 0px -20% 0px' });
  const [activeAttack, setActiveAttack] = React.useState(0);
  const [showImpact, setShowImpact] = React.useState(false);
  const [blockedCount, setBlockedCount] = React.useState(0);
  
  const attacks = [
    { name:'Remote Hack',   icon:WifiOff, path:'Network → Node B', block:'No radio hardware', color:'#ef4444',   bg:'bg-red-50',   border:'border-red-200', tc:'text-red-600' },
    { name:'Signal Tap',    icon:Activity, path:'RF → Intercept',   block:'Optical QR only',  color:'#f97316',bg:'bg-orange-50',border:'border-orange-200', tc:'text-orange-600'},
    { name:'Memory Forge',  icon:Database, path:'EEPROM overwrite',  block:'Hash chain locks', color:'#7c3aed',bg:'bg-violet-50',border:'border-violet-200', tc:'text-violet-600'},
    { name:'Replay Attack', icon:ArrowRight, path:'Reuse QR token',   block:'Single-use nonce', color:'#2563eb',  bg:'bg-blue-50',  border:'border-blue-200', tc:'text-blue-600' },
  ];
  
  React.useEffect(()=>{
    if (!inView) return;
    const t = setInterval(()=>{
      setActiveAttack(a=>{
        const next = (a+1)%attacks.length;
        setShowImpact(true);
        setBlockedCount(c=>c+1);
        setTimeout(()=>setShowImpact(false),400);
        return next;
      });
    },2500);
    return ()=>clearInterval(t);
  },[inView, attacks.length]);
  
  const a = attacks[activeAttack];
  
  return (
    <div ref={wrapRef} className="glass-cinematic rounded-3xl p-5 sm:p-6 select-none relative overflow-hidden">
      {/* Terminal grid background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage:'linear-gradient(90deg,#000 1px,transparent 1px),linear-gradient(180deg,#000 1px,transparent 1px)',
        backgroundSize:'20px 20px'
      }}/>
      
      {/* Impact flash effect */}
      {showImpact && (
        <motion.div 
          initial={{opacity:0.3}}
          animate={{opacity:0}}
          transition={{duration:0.3}}
          className="absolute inset-0 bg-red-100 pointer-events-none z-10"
        />
      )}
      
      {/* Header with attack counter */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2}} className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-500"/>
            <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.3}} className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500"/>
            <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.6}} className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"/>
          </div>
          <span className="ml-3 text-[11px] font-mono text-slate-400 tracking-widest uppercase">Attack Vector Simulation</span>
        </div>
        
        {/* Blocked counter */}
        <motion.div 
          key={blockedCount}
          initial={{scale:1.2}}
          animate={{scale:1}}
          className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200">
          <Shield className="w-3 h-3 text-emerald-600"/>
          <span className="text-[10px] font-bold text-emerald-700 font-mono">
            {blockedCount.toString().padStart(3,'0')} BLOCKED
          </span>
        </motion.div>
      </div>
      
      {/* Attack selector tabs */}
      <div className="grid grid-cols-4 gap-2 mb-5 relative z-10">
        {attacks.map((att,i)=>(
          <motion.button 
            key={i} 
            onClick={()=>setActiveAttack(i)}
            whileHover={{scale:1.02}}
            whileTap={{scale:0.98}}
            className={`text-center p-2.5 rounded-xl text-[10px] font-bold border-2 transition-all duration-300 relative overflow-hidden ${
              activeAttack===i
                ?`${att.bg} ${att.border} ${att.tc} shadow-md` 
                :'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
            }`}>
            {activeAttack===i && (
              <motion.div 
                layoutId="activeAttack"
                className="absolute inset-0 bg-white/50"
                transition={{type:'spring',stiffness:500,damping:40}}
              />
            )}
            <div className="relative z-10">
              <div className="flex justify-center mb-1">
                <att.icon className="w-4 h-4"/>
              </div>
              <span className="text-[9px]">{att.name}</span>
            </div>
          </motion.button>
        ))}
      </div>
      
      {/* Attack flow visualization */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeAttack} 
          initial={{opacity:0,y:12,scale:0.98}} 
          animate={{opacity:1,y:0,scale:1}} 
          exit={{opacity:0,y:-12,scale:0.98}} 
          transition={{duration:0.3,ease:[0.16,1,0.3,1]}}
          className="relative z-10">
          
          <div className="flex items-center gap-3 mb-4">
            {/* Attacker node */}
            <motion.div 
              animate={showImpact?{x:[0,5,0]}:{}}
              transition={{duration:0.2}}
              className={`flex-1 text-center p-4 rounded-2xl ${a.bg} ${a.border} border-2 relative overflow-hidden`}>
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>
                <span className="text-[8px] font-mono text-red-400 uppercase">Threat</span>
              </div>
              <div className="mt-3">
                <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center mx-auto mb-2">
                  <a.icon className="w-6 h-6" style={{color:a.color}}/>
                </div>
                <div className={`text-[12px] font-bold ${a.tc}`}>{a.name}</div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">{a.path}</div>
              </div>
            </motion.div>
            
            {/* Attack arrow with collision */}
            <div className="flex flex-col items-center gap-1 relative">
              {/* Animated arrow */}
              <motion.div 
                animate={{x:[0,12,0],opacity:showImpact?[1,0.3,1]:[0.5,1,0.5]}}
                transition={{repeat:Infinity,duration:0.6}}>
                <ArrowRight className="w-6 h-6" style={{color:a.color}}/>
              </motion.div>
              
              {/* Impact X mark */}
              <motion.div 
                animate={showImpact?{scale:[1,1.4,1],rotate:[0,90,0]}:{scale:[1,1.2,1]}}
                transition={{repeat:showImpact?0:Infinity,duration:showImpact?0.3:0.6}}
                className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-200 relative">
                <X className="w-5 h-5 text-white"/>
                
                {/* Ripple effect on impact */}
                {showImpact && (
                  <>
                    <motion.div 
                      initial={{scale:1,opacity:0.5}}
                      animate={{scale:2,opacity:0}}
                      transition={{duration:0.4}}
                      className="absolute inset-0 rounded-full bg-red-400"
                    />
                    <motion.div 
                      initial={{scale:1,opacity:0.3}}
                      animate={{scale:2.5,opacity:0}}
                      transition={{duration:0.5,delay:0.1}}
                      className="absolute inset-0 rounded-full bg-red-300"
                    />
                  </>
                )}
              </motion.div>
              
              <span className="text-[9px] font-bold text-red-500 font-mono">BLOCKED</span>
            </div>
            
            {/* Shield defense node */}
            <motion.div 
              animate={showImpact?{scale:[1,0.95,1.02,1]}:{scale:1}}
              transition={{duration:0.3}}
              className="flex-1 text-center p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 relative overflow-hidden">
              {/* Shield glow effect */}
              <motion.div 
                animate={showImpact?{opacity:[0.3,0.6,0.3]}:{opacity:0.2}}
                transition={{duration:0.5}}
                className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-transparent"
              />
              
              <div className="relative z-10">
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-glow-pulse-green"/>
                  <span className="text-[8px] font-mono text-emerald-500 uppercase">Active</span>
                </div>
                
                <div className="mt-3">
                  <motion.div 
                    animate={{scale:[1,1.1,1]}}
                    transition={{repeat:Infinity,duration:2}}
                    className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6 text-emerald-600"/>
                  </motion.div>
                  <div className="text-[12px] font-bold text-emerald-700">DEFLECTED</div>
                  <div className="text-[10px] text-emerald-600 mt-1 font-semibold">{a.block}</div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Security layer info */}
          <motion.div 
            initial={{opacity:0,y:10}}
            animate={{opacity:1,y:0}}
            transition={{delay:0.2}}
            className="text-center py-3 px-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500"/>
              <span className="text-xs font-bold text-slate-700">Zero-Gap neutralizes at the <span className="text-emerald-600">hardware layer</span></span>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   DEPLOYMENT MAP DIAGRAM — CINEMATIC VERSION with animated heatmap, scan effects
══════════════════════════════════════════════════════════════════ */
function DeploymentDiagram() {
  const [scanPosition, setScanPosition] = React.useState(0);
  const phases = [
    { label:'Phase 1', sub:'Pilot · 500 Booths', pct:100, color:'#E87722', years:'Yr 1–2', states:['MH','DL','KA'] },
    { label:'Phase 2', sub:'Scale · 10 States',  pct:60,  color:'#1E3A8A', years:'Yr 2–3', states:['MH','DL','KA','UP','TN','AP','WB','GJ','RJ','MP'] },
    { label:'Phase 3', sub:'National · Lok Sabha',pct:0,  color:'#0F7A3A', years:'Yr 3–5', states:['ALL'] },
  ];
  const stateGrid = [
    ['J&K','HP','UK','PB','HR','DL','RJ'],
    ['UP','BR','JH','WB','SK','AR','MZ'],
    ['GJ','MP','CG','OD','MN','NL','MG'],
    ['MH','TS','AP','KA','KL','TN','GA'],
  ];
  const phase1 = ['MH','DL','KA'];
  const phase2 = ['MH','DL','KA','UP','TN','AP','WB','GJ','RJ','MP'];
  
  // Scanner animation
  React.useEffect(()=>{
    const t = setInterval(()=>{
      setScanPosition(p=>(p+1)%4);
    },800);
    return ()=>clearInterval(t);
  },[]);
  
  return (
    <div className="glass-cinematic rounded-3xl p-5 sm:p-6 select-none relative overflow-hidden">
      {/* Scan line effect */}
      <motion.div 
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent z-10 pointer-events-none"
        animate={{top:['10%','90%','10%']}}
        transition={{duration:4,repeat:Infinity,ease:'linear'}}
      />
      
      {/* Header with tricolor accent */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2}} className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-500"/>
            <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.3}} className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500"/>
            <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.6}} className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"/>
          </div>
          <span className="ml-3 text-[11px] font-mono text-slate-400 tracking-widest uppercase">National Deployment Roadmap</span>
        </div>
        
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 border border-slate-200">
          <span className="text-[9px] font-bold text-slate-500 font-mono">INDIA</span>
        </div>
      </div>
      
      {/* India state grid — Cinematic heatmap */}
      <div className="mb-5 p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 relative">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] text-slate-400 font-mono">State Coverage Heatmap</div>
          <div className="flex items-center gap-2">
            {[
              {c:'#E87722',l:'Phase 1'},
              {c:'#1E3A8A',l:'Phase 2'},
              {c:'#e2e8f0',l:'Future'}
            ].map((leg,i)=>(
              <div key={i} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded" style={{backgroundColor:leg.c}}/>
                <span className="text-[8px] text-slate-500">{leg.l}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-1.5">
          {stateGrid.map((row,ri)=>{
            const isScanning = scanPosition === ri;
            return (
              <motion.div 
                key={ri} 
                className={`flex gap-1.5 rounded-lg p-1 transition-colors ${isScanning?'bg-amber-50/50':''}`}>
                {row.map((st,si)=>{
                  const p1 = phase1.includes(st);
                  const p2 = phase2.includes(st);
                  const isActive = isScanning && si < 4;
                  return (
                    <motion.div key={st}
                      initial={{opacity:0,scale:0.8}} 
                      whileInView={{opacity:1,scale:1}} 
                      viewport={{once:true}}
                      transition={{delay:(ri*7+si)*0.02,duration:0.3}}
                      whileHover={{scale:1.1,zIndex:10}}
                      className={`flex-1 text-center py-2 rounded-lg text-[9px] font-bold border-2 transition-all duration-300 cursor-default ${
                        p1?'bg-gradient-to-br from-amber-400 to-orange-500 text-white border-amber-300 shadow-md':
                        p2?'bg-gradient-to-br from-slate-700 to-slate-800 text-white border-slate-600 shadow-md':
                        'bg-slate-100 text-slate-400 border-slate-200'
                      } ${isActive?'ring-2 ring-amber-300 ring-offset-1':''}`}>
                      {st}
                      {p1 && (
                        <motion.div 
                          animate={{opacity:[0,1,0]}}
                          transition={{repeat:Infinity,duration:2}}
                          className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400 border border-white"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Phase bars — Enhanced */}
      <div className="space-y-3 mb-4">
        {phases.map((p,i)=>(
          <div key={i} className="group">
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black text-white" style={{backgroundColor:p.color}}>
                  {i+1}
                </div>
                <div>
                  <span className="text-[12px] font-bold text-slate-700">{p.label}</span>
                  <span className="text-[10px] text-slate-400 ml-2">{p.sub}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded-full bg-slate-100">{p.years}</span>
            </div>
            <div className="h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
              <motion.div
                initial={{width:0}} 
                whileInView={{width:`${p.pct}%`}} 
                viewport={{once:true}}
                transition={{delay:i*0.2+0.3,duration:1.2,ease:[0.16,1,0.3,1]}}
                className="h-full rounded-full relative"
                style={{backgroundColor:p.color}}>
                {/* Animated shine */}
                <motion.div 
                  animate={{x:['-100%','200%']}}
                  transition={{duration:2,repeat:Infinity,delay:i*0.3}}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>
            </div>
            <div className="flex justify-between text-[9px] mt-1">
              <span className="text-slate-400">{p.pct > 0 ? `${p.pct}% Complete` : 'Pending'}</span>
              <span className="font-mono font-bold" style={{color:p.color}}>
                {p.pct === 100 ? '✓ DONE' : p.pct > 0 ? 'IN PROGRESS' : 'PLANNED'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Target milestone */}
      <motion.div 
        animate={{scale:[1,1.02,1]}}
        transition={{repeat:Infinity,duration:3}}
        className="text-center py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 shadow-lg shadow-emerald-100">
        <div className="flex items-center justify-center gap-2">
          <motion.div animate={{rotate:[0,10,-10,0]}} transition={{repeat:Infinity,duration:1}}>
            <span className="text-lg">🗳️</span>
          </motion.div>
          <span className="text-[11px] font-bold text-emerald-700 font-mono">TARGET: Lok Sabha 2029 — Full National Coverage</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   COST COMPARISON DIAGRAM — CINEMATIC VERSION with animated counters, holographic ring
══════════════════════════════════════════════════════════════════ */
function CostComparisonDiagram() {
  const items = [
    { label:'Node A Terminals',  amt:3675, pct:22, color:'#64748b', bg:'bg-slate-100' },
    { label:'Node B EVMs',       amt:4463, pct:27, color:'#0f766e', bg:'bg-teal-100' },
    { label:'Voter Smart Cards', amt:8313, pct:50, color:'#059669', bg:'bg-emerald-100' },
    { label:'Infrastructure',    amt:1000, pct:6,  color:'#E87722', bg:'bg-amber-100' },
    { label:'Training',          amt:500,  pct:3,  color:'#dc2626', bg:'bg-red-100' },
  ];
  const total = 17951;
  const electionCost = 120000;
  const [animatedTotal, setAnimatedTotal] = React.useState(0);
  
  // Animated counter
  React.useEffect(()=>{
    let start = 0;
    const duration = 1500;
    const increment = total / (duration / 16);
    const timer = setInterval(()=>{
      start += increment;
      if(start >= total){
        setAnimatedTotal(total);
        clearInterval(timer);
      } else {
        setAnimatedTotal(Math.floor(start));
      }
    },16);
    return ()=>clearInterval(timer);
  },[]);
  
  return (
    <div className="glass-cinematic rounded-3xl p-5 sm:p-6 select-none relative overflow-hidden">
      {/* Background rings */}
      <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full border border-slate-100 opacity-50"/>
      <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full border border-slate-100 opacity-30"/>
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex gap-1.5">
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2}} className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-500"/>
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.3}} className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500"/>
          <motion.div animate={{scale:[1,1.2,1]}} transition={{repeat:Infinity,duration:2,delay:0.6}} className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"/>
        </div>
        <span className="ml-3 text-[11px] font-mono text-slate-400 tracking-widest uppercase">Investment Analysis</span>
      </div>

      {/* Donut chart with animated segments */}
      <div className="flex items-center gap-5 mb-5 relative z-10">
        <div className="relative shrink-0" style={{width:110,height:110}}>
          <svg width="110" height="110" viewBox="0 0 110 110" className="-rotate-90">
            {/* Background ring */}
            <circle cx="55" cy="55" r="42" fill="none" stroke="#f1f5f9" strokeWidth="14"/>
            {/* Segments with animation */}
            {(()=>{
              let offset = 0;
              const circ = 2*Math.PI*42;
              return items.map((item,i)=>{
                const dash = (item.pct/100)*circ;
                return (
                  <motion.circle key={i} cx="55" cy="55" r="42" fill="none"
                    stroke={item.color} strokeWidth="14"
                    strokeDasharray={`${dash} ${circ}`}
                    strokeDashoffset={-offset}
                    strokeLinecap="round"
                    initial={{strokeDasharray:`0 ${circ}`}}
                    whileInView={{strokeDasharray:`${dash} ${circ}`}}
                    viewport={{once:true}}
                    transition={{delay:i*0.1+0.3,duration:0.8,ease:[0.16,1,0.3,1]}}
                  />
                );
                offset += dash;
              });
            })()}
          </svg>
          
          {/* Center counter */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-black text-slate-800 font-mono">₹{Math.round(animatedTotal/1000)}K</span>
            <span className="text-[9px] text-slate-400 font-mono">crore</span>
          </div>
          
          {/* Rotating holographic ring */}
          <motion.div 
            animate={{rotate:360}}
            transition={{duration:20,repeat:Infinity,ease:'linear'}}
            className="absolute inset-0 rounded-full border-2 border-dashed border-slate-200 opacity-30"
            style={{margin:-8}}
          />
        </div>
        
        {/* Legend */}
        <div className="flex-1 space-y-2">
          {items.map((item,i)=>{
            const [hovered,setHovered] = React.useState(false);
            return (
              <motion.div 
                key={i} 
                onHoverStart={()=>setHovered(true)}
                onHoverEnd={()=>setHovered(false)}
                animate={{x:hovered?2:0}}
                className="flex items-center gap-2 cursor-default">
                <div className="w-3 h-3 rounded-full shrink-0" style={{backgroundColor:item.color}}/>
                <div className="flex-1 text-[11px] text-slate-600">{item.label}</div>
                <div className="text-[11px] font-bold font-mono" style={{color:item.color}}>
                  ₹{item.amt}Cr
                </div>
                <div className="text-[10px] font-mono text-slate-400 w-8 text-right">{item.pct}%</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Comparison bars — Enhanced */}
      <div className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-4 relative overflow-hidden">
        <div className="text-[11px] text-slate-500 mb-3 font-mono flex items-center gap-1">
          <BarChart3 className="w-3 h-3"/>
          Zero-Gap vs 2024 Election Economic Footprint
        </div>
        
        <div className="space-y-3">
          {/* Zero-Gap bar */}
          <div>
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="text-slate-600 font-medium">Zero-Gap (one-time)</span>
              <span className="font-bold font-mono text-slate-800">₹{total.toLocaleString()} Cr</span>
            </div>
            <div className="h-4 rounded-full bg-white border border-slate-200 overflow-hidden relative">
              <motion.div 
                initial={{width:0}} 
                whileInView={{width:`${(total/electionCost)*100}%`}} 
                viewport={{once:true}}
                transition={{duration:1,ease:[0.16,1,0.3,1],delay:0.3}}
                className="h-full rounded-full relative"
                style={{background:'linear-gradient(90deg,#E87722 0%,#1E3A8A 50%,#0F7A3A 100%)'}}>
                <motion.div 
                  animate={{x:['-100%','200%']}}
                  transition={{duration:2,repeat:Infinity}}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </motion.div>
            </div>
          </div>
          
          {/* Election cost bar */}
          <div>
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="text-slate-600 font-medium">2024 Election footprint</span>
              <span className="font-bold font-mono text-slate-400">₹{electionCost.toLocaleString()} Cr</span>
            </div>
            <div className="h-4 rounded-full bg-white border border-slate-200 overflow-hidden">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-slate-200 to-slate-300"/>
            </div>
          </div>
        </div>
        
        {/* ROI highlight */}
        <div className="mt-4 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600"/>
          <span className="text-[12px] font-bold text-emerald-700">
            Only ~15% of one election cost · Secures all future elections
          </span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFaq, setActiveFaq]   = useState<number|null>(null);
  const [activeProto, setActiveProto] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const progressRef = useRef<HTMLDivElement>(null);

  // rAF-throttled scroll handler — DOM mutation for progress bar (no App re-render),
  // boolean threshold flip for nav glassiness (max 2 re-renders per page-scroll).
  useEffect(()=>{
    let ticking = false;
    let lastScrolled = false;
    const update = ()=>{
      const y = window.scrollY;
      const tot = document.documentElement.scrollHeight - window.innerHeight;
      const pct = tot>0 ? (y/tot)*100 : 0;
      if (progressRef.current) progressRef.current.style.width = pct + '%';
      const nowScrolled = y > 40;
      if (nowScrolled !== lastScrolled) {
        lastScrolled = nowScrolled;
        setScrolled(nowScrolled);
      }
      ticking = false;
    };
    const onScroll = ()=>{
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return ()=>window.removeEventListener('scroll', onScroll);
  },[]);

  // Body scroll lock when mobile menu open
  useEffect(()=>{
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return ()=>{ document.body.style.overflow = ''; };
  },[mobileOpen]);

  useEffect(()=>{
    const ids = ['hero','problem','solution','protocols','journey','roadmap','faq'];
    const obs: IntersectionObserver[] = [];
    ids.forEach(id=>{
      const el = document.getElementById(id); if(!el) return;
      const o = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setActiveSection(id); },{rootMargin:'-40% 0px -55% 0px'});
      o.observe(el); obs.push(o);
    });
    return ()=>obs.forEach(o=>o.disconnect());
  },[]);

  const go = (id:string)=>{ document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMobileOpen(false); };

  const navLinks = [
    {label:'Problem',  id:'problem'},
    {label:'Solution', id:'solution'},
    {label:'Protocols',id:'protocols'},
    {label:'Journey',  id:'journey'},
    {label:'Roadmap',  id:'roadmap'},
  ];

  const faqs = [
    {q:"Can digital systems always be hacked?",a:"The Zero-Gap architecture agrees — which is why security does not rely on software integrity alone. The physical airgap, hardware watchdog, and paper VVPAT mean even a fully compromised software stack cannot alter election outcomes without physically detectable evidence."},
    {q:"What if biometric authentication fails for rural voters?",a:"Dual-biometric redundancy: fingerprint is primary, but near-infrared iris scanning serves as automatic fallback — the same system used by Aadhaar across 1.4 billion enrollees. Iris specifically addresses worn fingerprints common among agricultural and manual-labour voters."},
    {q:"Who controls the QR signing keys?",a:"Keys are managed exclusively by the Election Commission of India under the same constitutional protections as current EVM firmware. A multi-party key ceremony ensures no single actor can generate or compromise signing keys."},
    {q:"What if Node A loses connectivity at a rural booth?",a:"Node A needs only a momentary exchange — comparable to a UPI transaction. An offline queue mode buffers authentication requests during connectivity interruptions. The voter receives their QR code once connectivity is briefly restored."},
    {q:"Is this too complex and expensive to deploy?",a:"Node A uses the same hardware as Aadhaar e-KYC terminals already manufactured by BEL. Node B uses the same microcontroller architecture as current EVMs. VVPAT is already Supreme Court-mandated. This is tighter integration of existing components."},
    {q:"How does this prevent cross-constituency voting?",a:"Node B's PROM chip is pre-flashed with only the authorized voter ID list for that specific constituency. If a voter's hashed ID is not found in Node B's read-only PROM, the QR code is cryptographically rejected."},
  ];

  const protocols = [
    {n:'01',title:'Optical Airgap',    sub:'No wire. No signal. Only light.',  icon:WifiOff,   g:'from-indigo-500 to-blue-500',     shadow:'shadow-indigo-200', desc:'No cables, no Bluetooth, no WiFi, no RF signals of any kind. The only information crossing between Node A and Node B is light — photons read by a dedicated optical scanner from a time-signed, single-use QR code.'},
    {n:'02',title:'Hash Chain Ledger', sub:'Tamper makes it self-destruct.',   icon:Database,  g:'from-violet-500 to-purple-600',   shadow:'shadow-violet-200', desc:'Every vote record is SHA-256 chained to the previous. Altering even a single bit breaks the entire chain — detectable instantly on next boot, permanently locking the machine.'},
    {n:'03',title:'Hardware Watchdog', sub:'Software cannot cheat the metal.', icon:Activity,  g:'from-green-400 to-emerald-500',   shadow:'shadow-green-200',  desc:'An independent microcontroller monitors the main CPU every 10ms via hardware ping. If the ping stops — crash, freeze, or tampering — it physically cuts power in under 30ms. Software cannot override this.'},
    {n:'04',title:'VVPAT Paper Proof', sub:'Physics beats cryptography.',      icon:Printer,   g:'from-orange-400 to-pink-500',     shadow:'shadow-orange-200', desc:"Before any vote is committed to digital memory, a paper slip is printed showing the voter's exact choice. Displayed for 5 seconds behind glass, then physically deposited. Paper is the legally binding ground truth."},
  ];

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">

      {/* Progress bar (mutated imperatively via ref — zero re-renders) */}
      <div ref={progressRef} className="progress-bar" style={{width:'0%'}} />

      {/* Mobile notice popup */}
      <MobileNotice />

      {/* Subtle dot grid — only one global background layer */}
      <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-30" />

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled?'glass-nav':'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          <button onClick={()=>go('hero')} className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md" style={{background:'linear-gradient(135deg,#E87722,#C5601A)',boxShadow:'0 4px 14px rgba(232,119,34,0.3)'}}>
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[15px] tracking-tight text-slate-800">Zero<span className="gradient-text-violet">Gap</span></span>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(item=>(
              <button key={item.id} onClick={()=>go(item.id)}
                className={`text-sm font-medium transition-colors relative pb-0.5 ${activeSection===item.id?'text-violet-600':'text-slate-500 hover:text-slate-800'}`}>
                {item.label}
                {activeSection===item.id && (
                  <motion.span layoutId="nav-ul" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" transition={{type:'spring',stiffness:500,damping:40}} />
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <motion.a whileHover={{scale:1.02}} whileTap={{scale:0.98}} href={PDF} target="_blank" rel="noreferrer" className="btn-outline text-[13px] py-2 px-4">
              <FileText className="w-3.5 h-3.5" /> PDF Report
            </motion.a>
            <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>go('solution')} className="btn-primary text-[13px] py-2 px-4">
              See Architecture <ChevronRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          <button onClick={()=>setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-slate-500 hover:text-slate-800 transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.22,ease}}
              className="lg:hidden glass-nav border-t border-violet-100 overflow-hidden">
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map((item,i)=>(
                  <motion.button key={item.id} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.04}}
                    onClick={()=>go(item.id)}
                    className={`text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${activeSection===item.id?'text-violet-600 bg-violet-50':'text-slate-500 hover:text-slate-800'}`}>
                    {item.label}
                  </motion.button>
                ))}
                <div className="pt-3 mt-2 border-t border-violet-100 flex flex-col gap-2">
                  <a href={PDF} target="_blank" rel="noreferrer" className="btn-outline justify-center"><FileText className="w-4 h-4" /> PDF</a>
                  <button onClick={()=>go('solution')} className="btn-primary justify-center">See Architecture</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <AnimatePresence>
        {mobileOpen && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" />}
      </AnimatePresence>

      <main className="relative z-10">

        {/* ══════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════ */}
        <section id="hero" className="section-shell is-spacious overflow-hidden">
          <div className="hero-decor" />

          <div className="container-shell">
            {/* Eyebrow */}
            <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.5,ease}}
              className="flex justify-center mb-8">
              <span className="eyebrow-pill">Proposed to ECI · UIDAI · MeitY</span>
            </motion.div>

            {/* H1 */}
            <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,ease,delay:0.05}}
              className="headline-hero text-center mx-auto max-w-5xl">
              Secure India's <span className="gradient-text">elections</span> for ever.
            </motion.h1>

            {/* Subtext */}
            <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.18,ease}}
              className="lede is-center text-center mt-2 mb-10 max-w-2xl">
              Zero-Gap makes electronic vote manipulation not merely difficult —
              <span className="text-slate-800 font-medium"> physically and mathematically impossible.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.28,ease}}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 sm:mb-20">
              <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}} onClick={()=>go('solution')} className="btn-primary w-full sm:w-auto justify-center">
                Explore Architecture <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.a whileHover={{scale:1.03}} whileTap={{scale:0.97}} href={PDF} target="_blank" rel="noreferrer" className="btn-outline w-full sm:w-auto justify-center">
                <FileText className="w-4 h-4" /> Download PDF
              </motion.a>
            </motion.div>

            {/* Hero full-width panel */}
            <motion.div initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:0.9,ease,delay:0.35}}
              className="relative max-w-5xl mx-auto">
              <AirgapPanel />
            </motion.div>

            {/* Stats strip — unified tile design (no orphan dividers) */}
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.65,ease}}
              className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
              {[
                {v:'960M+', l:'Eligible Voters'},
                {v:'4',     l:'Security Protocols'},
                {v:'90s',   l:'QR Token Lifespan'},
                {v:'A=B=C', l:'Triple Reconciliation'},
              ].map(s=>(
                <div key={s.l} className="stat-tile">
                  <div className="stat-num">{s.v}</div>
                  <div className="stat-label">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            PROBLEM
        ══════════════════════════════════════════════════════════ */}
        <section id="problem" className="section-shell bg-soft">
          <div className="container-shell">
            <header className="section-head is-center">
              <span className="eyebrow-pill">The Problem</span>
              <h2 className="headline-xl">Current EVMs have six gaps.</h2>
              <p className="lede is-center">India's EVMs are battle-tested — but their monolithic architecture creates attack surfaces that undermine public trust. We close every one.</p>
            </header>
            <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { n:'01', title:'Monolithic Machine',      desc:'Identity, ballot, and storage share one unit. Compromising one compromises all.',            g:'from-red-400 to-rose-500',      ring:'border-red-200/60',    diagram:(
                  <div className="rounded-2xl bg-red-50/80 border border-red-100 p-3 mb-4 select-none">
                    <div className="flex items-center justify-center gap-1.5">
                      {['Identity','Ballot','Storage'].map((l,i)=>(
                        <div key={i} className="flex-1 text-center py-2 rounded-xl bg-red-100 border border-red-200 text-[9px] font-bold text-red-600">{l}</div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-2">
                      <div className="w-24 h-6 rounded-lg bg-red-400/20 border border-red-300 flex items-center justify-center text-[9px] font-bold text-red-500">ONE UNIT ⚠</div>
                    </div>
                  </div>
                )},
                { n:'02', title:'Signal Interception',     desc:'Connections between units create man-in-the-middle vectors — interceptable, replayable.',     g:'from-orange-400 to-amber-500',  ring:'border-orange-200/60', diagram:(
                  <div className="rounded-2xl bg-orange-50/80 border border-orange-100 p-3 mb-4 select-none">
                    <div className="flex items-center gap-2">
                      <div className="text-center py-2 px-2 rounded-xl bg-orange-100 border border-orange-200 text-[9px] font-bold text-orange-600 shrink-0">EVM</div>
                      <div className="flex-1 relative h-5 flex items-center">
                        <div className="w-full h-px bg-orange-300 border-dashed"/>
                        <motion.div className="absolute w-2 h-2 rounded-full bg-orange-500"
                          style={{top:'50%',transform:'translateY(-50%)'}}
                          animate={{left:['-5%','105%']}} transition={{repeat:Infinity,duration:1.2,ease:'linear'}}/>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center z-10">
                          <span className="text-white text-[8px] font-black">!</span>
                        </div>
                      </div>
                      <div className="text-center py-2 px-2 rounded-xl bg-orange-100 border border-orange-200 text-[9px] font-bold text-orange-600 shrink-0">CU</div>
                    </div>
                    <div className="text-center text-[9px] text-orange-500 font-bold mt-1.5">MitM — signal interceptable</div>
                  </div>
                )},
                { n:'03', title:'Flat Memory Storage',     desc:'Unprotected EEPROM writes allow silent overwrite during transport without detection.',         g:'from-yellow-400 to-orange-500', ring:'border-yellow-200/60', diagram:(
                  <div className="rounded-2xl bg-yellow-50/80 border border-yellow-100 p-3 mb-4 select-none">
                    <div className="flex flex-col gap-1">
                      {['Block 1: Vote','Block 2: Vote','Block 2: OVERWRITE ⚠'].map((l,i)=>(
                        <motion.div key={i} animate={i===2?{opacity:[1,0.4,1]}:{}} transition={{repeat:Infinity,duration:1.2}}
                          className={`text-center py-1.5 rounded-lg text-[9px] font-bold border ${i===2?'bg-red-100 border-red-300 text-red-600':'bg-yellow-100 border-yellow-200 text-yellow-700'}`}>{l}</motion.div>
                      ))}
                    </div>
                    <div className="text-center text-[9px] text-red-500 font-bold mt-1.5">No hash chain — silent overwrite possible</div>
                  </div>
                )},
                { n:'04', title:'GUI Black Box',            desc:'A touchscreen GUI means voters cannot verify their choice registered — the OS becomes risk.',  g:'from-blue-400 to-indigo-500',   ring:'border-blue-200/60',   diagram:(
                  <div className="rounded-2xl bg-blue-50/80 border border-blue-100 p-3 mb-4 select-none">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 text-center py-3 rounded-xl bg-blue-100 border border-blue-200">
                        <div className="text-[9px] font-bold text-blue-600">Touchscreen</div>
                        <div className="text-[9px] text-blue-400">Tap: Party A</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-red-400 shrink-0"/>
                      <div className="flex-1 text-center py-3 rounded-xl bg-red-50 border border-red-200">
                        <div className="text-[9px] font-bold text-red-500">OS Layer</div>
                        <div className="text-[9px] text-red-400">Records: ?</div>
                      </div>
                    </div>
                    <div className="text-center text-[9px] text-blue-500 font-bold mt-1.5">Voter cannot verify what was stored</div>
                  </div>
                )},
                { n:'05', title:'Multiple Voting',          desc:'Without a tamper-proof real-time ledger, duplicates depend only on paper and humans.',          g:'from-violet-500 to-purple-600', ring:'border-violet-200/60', diagram:(
                  <div className="rounded-2xl bg-violet-50/80 border border-violet-100 p-3 mb-4 select-none">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {['Voter #42','Voter #42','Voter #42'].map((v,i)=>(
                        <motion.div key={i} animate={i>0?{opacity:[1,0.5,1]}:{}} transition={{repeat:Infinity,duration:1.5,delay:i*0.3}}
                          className={`text-[8px] font-bold py-1.5 px-1.5 rounded-xl border text-center ${i===0?'bg-violet-100 border-violet-300 text-violet-600':'bg-red-50 border-red-200 text-red-500'}`}>{v}<br/>{i===0?'✓':'dup?'}</motion.div>
                      ))}
                    </div>
                    <div className="text-center text-[9px] text-violet-500 font-bold">Human-only check — duplicates possible</div>
                  </div>
                )},
                { n:'06', title:'Incomplete Transactions',  desc:'A crash mid-vote creates ambiguous state — no hardware guarantee of clean recovery.',           g:'from-green-400 to-emerald-500', ring:'border-green-200/60',  diagram:(
                  <div className="rounded-2xl bg-green-50/80 border border-green-100 p-3 mb-4 select-none">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 text-center py-2 rounded-xl bg-green-100 border border-green-200 text-[9px] font-bold text-green-700">Vote Started</div>
                      <motion.div animate={{opacity:[1,0,1]}} transition={{repeat:Infinity,duration:0.8}}>
                        <div className="text-red-500 font-black text-sm">✕</div>
                      </motion.div>
                      <div className="flex-1 text-center py-2 rounded-xl bg-red-50 border border-red-200 text-[9px] font-bold text-red-500">CRASH</div>
                    </div>
                    <div className="text-center text-[9px] text-slate-500 mt-1.5">Ambiguous state — counted or not?</div>
                  </div>
                )},
              ].map((item,i)=>(
                <StaggerItem key={i}>
                  <motion.div whileHover={{y:-3}} transition={{duration:0.22,ease}} className="card-shell is-hoverable problem-card">
                    <div className="flex items-center justify-between">
                      <span className="pc-num">{item.n}</span>
                      <span className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.g} shadow-sm flex-shrink-0`} aria-hidden />
                    </div>
                    <h3>{item.title}</h3>
                    <div className="opacity-90">{item.diagram}</div>
                    <p>{item.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SOLUTION — copy L + panel R
        ══════════════════════════════════════════════════════════ */}
        <section id="solution" className="section-shell">
          <div className="container-shell">
            <div className="grid-2up">
              <FadeInLeft>
                <span className="eyebrow-pill">The Architecture</span>
                <h2 className="headline">Two nodes. <span className="gradient-text-violet">Zero connection.</span></h2>
                <p className="lede mb-8">
                  Node A handles identity online. Node B casts the ballot offline. The only channel between them is a beam of light carrying a signed QR code.
                </p>
                <ul className="space-y-3 mb-8">
                  <Check>Node A is the only machine ever connected to a network</Check>
                  <Check>Node B has no Wi-Fi chip, Bluetooth module, or network port</Check>
                  <Check>The QR token expires in 90 seconds — replay attacks impossible</Check>
                  <Check>Node B verifies the signature entirely offline using read-only firmware</Check>
                </ul>
                <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}} onClick={()=>go('protocols')} className="btn-primary">
                  See the four protocols <ArrowRight className="w-4 h-4" />
                </motion.button>
              </FadeInLeft>
              <FadeInRight>
                <AirgapPanel />
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            HASH CHAIN — panel L + copy R
        ══════════════════════════════════════════════════════════ */}
        <section className="section-shell bg-soft">
          <div className="container-shell">
            <div className="grid-2up">
              <FadeInLeft>
                <HashPanel />
              </FadeInLeft>
              <FadeInRight>
                <span className="eyebrow-pill">Immutable Memory</span>
                <h2 className="headline">Alter one bit. <span className="gradient-text">Machine locks.</span></h2>
                <p className="lede mb-8">
                  The EEPROM ledger uses the same mathematical principle as blockchain — implemented in bare-metal C/C++. Every entry chains to the hash of its predecessor.
                </p>
                <ul className="space-y-3">
                  <Check>SHA-256 hash of each vote links to the previous entry</Check>
                  <Check>Altering any entry breaks the entire chain</Check>
                  <Check>Chain integrity verified on every boot — broken chain locks the machine</Check>
                  <Check>All writes are append-only — no rollback possible</Check>
                </ul>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            PROTOCOLS — tabs
        ══════════════════════════════════════════════════════════ */}
        <section id="protocols" className="section-shell">
          <div className="container-shell">
            <header className="section-head is-center">
              <span className="eyebrow-pill">Hardware Security</span>
              <h2 className="headline-xl">Four protocols that make tampering physically impossible.</h2>
              <p className="lede is-center">Every security layer operates at the hardware or physics level. Software exploits simply cannot reach them.</p>
            </header>
            <div className="grid lg:grid-cols-[380px_1fr] gap-4 lg:gap-6">
              {/* tab list */}
              <div className="space-y-3">
                {protocols.map((p,i)=>(
                  <motion.button key={i} onClick={()=>setActiveProto(i)} whileTap={{scale:0.99}}
                    className={`proto-tab ${activeProto===i?'is-active':''}`}>
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.g} flex items-center justify-center shadow-md ${p.shadow} shrink-0`}>
                        <p.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-[10px] font-black font-mono mb-0.5 ${activeProto===i?'text-violet-600':'text-slate-400'}`}>{p.n}</div>
                        <div className={`font-semibold text-[15px] tracking-tight ${activeProto===i?'text-slate-900':'text-slate-700'}`}>{p.title}</div>
                        <div className={`text-[12px] truncate ${activeProto===i?'text-violet-500':'text-slate-400'}`}>{p.sub}</div>
                      </div>
                      <ArrowRight className={`w-4 h-4 shrink-0 transition-all ${activeProto===i?'text-violet-500 translate-x-0.5':'text-slate-300'}`} />
                    </div>
                    <AnimatePresence>
                      {activeProto===i && (
                        <motion.p initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} transition={{duration:0.22}}
                          className="text-sm text-slate-500 leading-relaxed mt-4 pt-4 border-t border-violet-100">
                          {p.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>

              {/* visual panel — live diagram per protocol */}
              <div className="relative min-h-[420px] sm:min-h-[520px] card-shell is-strong is-flush diagram-panel">
                <AnimatePresence mode="wait">
                  <motion.div key={activeProto}
                    initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}
                    transition={{duration:0.35,ease}}
                    className="absolute inset-0">
                    {activeProto===0 && <AirgapDiagram />}
                    {activeProto===1 && <HashDiagram />}
                    {activeProto===2 && <WatchdogDiagram />}
                    {activeProto===3 && <VVPATDiagram />}
                  </motion.div>
                </AnimatePresence>
                {/* ambient glow */}
                <div className={`absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${protocols[activeProto].g} opacity-10 blur-2xl pointer-events-none transition-all duration-700`} />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            JOURNEY — sticky L + panel R
        ══════════════════════════════════════════════════════════ */}
        <section id="journey" className="section-shell bg-soft">
          <div className="container-shell">
            <div className="grid-2up is-start">
              <FadeInLeft className="lg:sticky lg:top-24">
                <span className="eyebrow-pill">User Experience</span>
                <h2 className="headline">Eight steps. <span className="gradient-text-violet">One secure vote.</span></h2>
                <p className="lede mb-8">
                  Every stage is cryptographically verified, physically witnessed, and immutably recorded. The voter experience remains simple; the security machinery is invisible.
                </p>
                <div className="space-y-2 text-sm">
                  {[{g:'from-indigo-500 to-blue-500',l:'Steps 1–4 on Node A (online)'},
                    {g:'from-violet-500 to-purple-600',l:'Step 5 — the physical airgap crossing'},
                    {g:'from-orange-400 to-pink-500',l:'Steps 6–8 on Node B (fully offline)'}].map((r,i)=>(
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${r.g} shadow-sm shrink-0`} />
                      <span className="text-slate-600">{r.l}</span>
                    </div>
                  ))}
                </div>
              </FadeInLeft>
              <FadeInRight><JourneyPanel /></FadeInRight>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            RECONCILIATION — panel L + copy R
        ══════════════════════════════════════════════════════════ */}
        <section className="section-shell">
          <div className="container-shell">
            <div className="grid-2up">
              <FadeInLeft><ReconcDiagram /></FadeInLeft>
              <FadeInRight>
                <span className="eyebrow-pill">Mathematical Proof</span>
                <h2 className="headline">Three counts. <span className="gradient-text">One truth.</span></h2>
                <p className="lede mb-8">
                  Before any result is declared valid, three completely independent datasets must match exactly. The moment any layer diverges, the system identifies the precise point of interference.
                </p>
                <ul className="space-y-3">
                  <Check>A = authenticated voters (Node A server log)</Check>
                  <Check>B = digital votes cast (Node B EEPROM hash chain)</Check>
                  <Check>C = physical paper slips (VVPAT ballot box count)</Check>
                  <Check>A = B = C required — any mismatch triggers full forensic investigation</Check>
                </ul>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            THREAT TABLE
        ══════════════════════════════════════════════════════════ */}
        <section className="section-shell bg-soft">
          <div className="container-shell">
            <header className="section-head">
              <span className="eyebrow-pill">Security Analysis</span>
              <h2 className="headline">Every attack vector. Neutralised.</h2>
              <p className="lede">Each known threat against current EVMs — and the exact Zero-Gap mechanism that defeats it.</p>
            </header>
            <FadeIn className="mb-6 sm:mb-8"><ThreatShieldDiagram /></FadeIn>
            <FadeIn>
              <div className="glass-table overflow-x-auto rounded-[20px]">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr>
                      <th className="p-5 text-left text-[11px] font-bold text-violet-400 uppercase tracking-widest w-[24%]">Threat</th>
                      <th className="p-4 text-center text-[11px] font-bold text-violet-400 uppercase tracking-widest w-[7%]">Sev.</th>
                      <th className="p-5 text-left text-[11px] font-bold text-red-400 uppercase tracking-widest w-[24%]">Current EVM</th>
                      <th className="p-5 text-left text-[11px] font-bold text-green-500 uppercase tracking-widest">Zero-Gap Defence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {f:'Remote Network Attack',     s:'CRIT',c:'Possible if networked',        z:'Node B has no radio hardware — physically incapable'},
                      {f:'Signal Interception',       s:'HIGH', c:'Wire/wireless replayable',     z:'No signal — optical QR + single-use nonce'},
                      {f:'Memory Tampering',          s:'CRIT',c:'Flat EEPROM overwritable',      z:'Hash chain — any alteration locks machine'},
                      {f:'Multiple Voting',           s:'HIGH', c:'Paper ledger + human check',   z:'Real-time DB + PROM chip + hash chain'},
                      {f:'Cross-Constituency Voting', s:'HIGH', c:'Manual enforcement',           z:'Voter not in PROM = cryptographic rejection'},
                      {f:'GUI Vote Manipulation',     s:'MED',  c:'OS layer vulnerability',       z:'VVPAT prints before digital commit — paper wins'},
                      {f:'Mid-Vote System Crash',     s:'MED',  c:'Ambiguous incomplete state',   z:'HWT forces cold reboot <30ms — clean slate'},
                      {f:'Forged QR Code',            s:'CRIT',c:'N/A',                           z:'RSA-4096 impossible without ECI private key'},
                      {f:'QR Replay Attack',          s:'HIGH', c:'N/A',                          z:'Single-use nonce — second scan rejected immediately'},
                      {f:'Physical Theft + Dump',     s:'HIGH', c:'Vote data accessible',         z:'Chain broken on boot — machine self-locks'},
                    ].map((row,i)=>(
                      <motion.tr key={i} initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.04,duration:0.4,ease}}
                        className="border-t border-violet-50 hover:bg-violet-50/40 transition-colors">
                        <td className="p-5 text-sm font-medium text-slate-700">{row.f}</td>
                        <td className="p-4 text-center">
                          <span className={row.s==='CRIT'?'badge-crit':row.s==='HIGH'?'badge-high':'badge-med'}>{row.s}</span>
                        </td>
                        <td className="p-5 text-sm text-red-400">{row.c}</td>
                        <td className="p-5 text-sm text-green-600 font-medium">{row.z}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            ROADMAP
        ══════════════════════════════════════════════════════════ */}
        <section id="roadmap" className="section-shell">
          <div className="container-shell">
            <header className="section-head is-center">
              <span className="eyebrow-pill">Implementation</span>
              <h2 className="headline-xl">Three phases to national deployment.</h2>
              <p className="lede is-center">A pragmatic five-year pathway built on existing legal authority, manufacturing, and infrastructure.</p>
            </header>
            <div className="grid-2up is-start">
              <div className="timeline-spine">
                <TimelinePhase phase="Phase 1" title="Pilot Programme" year="Years 1–2" color="orange" description="Controlled deployment in select state assembly elections to validate the architecture under real conditions." items={["500 booths across 2–3 state elections, parallel with existing EVMs","Biometric success rates, auth time, and uptime data collected","Independent audit via ECI Technical Expert Committee","Budget: Rs. 150–300 crore"]} delay={0} />
                <TimelinePhase phase="Phase 2" title="Infrastructure Build-Out" year="Years 2–3" color="blue" description="National-scale manufacturing, smart card rollout, and workforce training." items={["Voter ID Smart Card rollout through UIDAI infrastructure","Node A & B manufactured through BEL at national scale","QR signing key ceremony under ECI constitutional authority","Budget: Rs. 7,125–9,500 crore"]} delay={0.1} />
                <TimelinePhase phase="Phase 3" title="National Deployment" year="Years 3–5" color="green" description="Full deployment for Lok Sabha General Elections." items={["Complete Zero-Gap rollout for Lok Sabha 2029","VVPAT audit upgraded to 100% physical recount","Budget: Rs. 6,825–9,950 crore"]} delay={0.2} />
              </div>
              <FadeInRight className="lg:sticky lg:top-24"><DeploymentDiagram /></FadeInRight>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            COST
        ══════════════════════════════════════════════════════════ */}
        <section className="section-shell bg-soft">
          <div className="container-shell">
            <div className="grid-2up is-start">
              <FadeInLeft>
                <span className="eyebrow-pill">Investment</span>
                <h2 className="headline">12–18% of one <span className="gradient-text">election's cost.</span></h2>
                <p className="lede mb-8">
                  India's 2024 General Election had an economic footprint exceeding Rs. 1.2 lakh crore. Zero-Gap is a one-time investment that secures every election after it.
                </p>
                <ul className="space-y-3">
                  <Check>Node A — manufactured by BEL (same as Aadhaar e-KYC hardware)</Check>
                  <Check>Node B — same microcontroller as current EVM, no new supply chain</Check>
                  <Check>Smart Cards — same EMV lines as RuPay, managed by UIDAI</Check>
                  <Check>VVPAT — already Supreme Court mandated, already deployed</Check>
                </ul>
              </FadeInLeft>
              <FadeInRight className="space-y-5">
                <CostComparisonDiagram />
                <div className="glass-solid rounded-3xl p-6 border border-violet-100/60">
                  <h3 className="text-sm font-bold text-slate-700 mb-5 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-violet-500"/>
                    Detailed Breakdown
                  </h3>
                  <div className="space-y-4">
                    <StatBar label="Node A (Auth Terminals)" amount="3,150–4,200 Cr" total="21,150" color="text-indigo-500" delay={0} />
                    <StatBar label="Node B (Upgraded EVMs)" amount="3,675–5,250 Cr" total="21,150" color="text-violet-500" delay={0.08} />
                    <StatBar label="Voter ID Smart Cards" amount="7,125–9,500 Cr" total="21,150" color="text-green-500" delay={0.16} />
                    <StatBar label="Server Infrastructure" amount="500–1,500 Cr" total="21,150" color="text-orange-500" delay={0.24} />
                    <StatBar label="Training & Logistics" amount="300–700 Cr" total="21,150" color="text-pink-500" delay={0.32} />
                  </div>
                  <div className="mt-6 pt-4 border-t border-violet-100 flex items-center justify-between">
                    <span className="text-sm text-slate-400 font-mono uppercase tracking-widest">Total</span>
                    <span className="text-xl font-black font-mono gradient-text">Rs. 14,750–21,150 Cr</span>
                  </div>
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════════════════ */}
        <section id="faq" className="section-shell">
          <div className="container-shell">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 items-start">
              <FadeInLeft className="lg:sticky lg:top-24">
                <span className="eyebrow-pill">FAQ</span>
                <h2 className="headline">Common questions.</h2>
                <p className="lede">Everything the Election Commission, academics, and journalists have asked — answered directly.</p>
              </FadeInLeft>
              <FadeInRight>
                <div className="space-y-3">
                  {faqs.map((f,i)=>(
                    <AccordionItem key={i} question={f.q} answer={f.a} isOpen={activeFaq===i} onClick={()=>setActiveFaq(activeFaq===i?null:i)} />
                  ))}
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CTA
        ══════════════════════════════════════════════════════════ */}
        <section className="section-shell">
          <div className="container-shell">
            <FadeIn>
              <div className="cta-shell">
                <span className="eyebrow-pill" style={{margin:'0 auto 1.25rem'}}>Ready for Review</span>
                <h2 className="headline-xl mx-auto max-w-3xl">India's elections deserve this.</h2>
                <p className="lede is-center text-center max-w-2xl mt-4 mb-10">
                  Open source. Peer-reviewable. Built on existing infrastructure. Designed to work within India's constitutional, electoral, and manufacturing frameworks.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
                  <motion.a whileHover={{scale:1.03}} whileTap={{scale:0.97}} href={PDF} target="_blank" rel="noreferrer" className="btn-primary w-full sm:w-auto justify-center">
                    <FileText className="w-4 h-4" /> Read the Full PDF <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </motion.a>
                  <motion.a whileHover={{scale:1.03}} whileTap={{scale:0.97}} href="mailto:contact@zerogapvoting.in" className="btn-outline w-full sm:w-auto justify-center">
                    <Mail className="w-4 h-4" /> Contact for Review
                  </motion.a>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>

      {/* FOOTER — clean 2-row layout */}
      <footer className="footer-shell">
        <div className="container-shell">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md" style={{background:'linear-gradient(135deg,#E87722,#C5601A)',boxShadow:'0 4px 14px rgba(232,119,34,0.3)'}}>
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-800">Zero<span className="gradient-text-violet">Gap</span> Voting</div>
                <div className="text-[11px] text-slate-400">An open architecture by Roshan Kr Singh</div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <a href={PDF} target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-violet-700 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-violet-50"><FileText className="w-3.5 h-3.5" /> PDF Report</a>
              <a href="mailto:contact@zerogapvoting.in" className="text-xs text-slate-500 hover:text-violet-700 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-violet-50"><Mail className="w-3.5 h-3.5" /> Contact</a>
            </div>
          </div>
          <div className="divider-soft" style={{margin:'1.5rem 0'}} />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <span>© 2026 Zero-Gap Voting Initiative · Non-partisan · Open for review</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              Proposed to ECI · UIDAI · MeitY
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
