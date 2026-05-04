import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, WifiOff, Fingerprint, Cpu, CheckCircle2,
  ExternalLink, Printer, Database, Activity, FileText, Menu, X,
  ArrowRight, BarChart3, AlertTriangle, Mail,
  ChevronRight, ChevronDown
} from 'lucide-react';
import {
  FadeIn, FadeInLeft, FadeInRight, StaggerChildren, StaggerItem,
  SectionTitle, TimelinePhase, StatBar, AccordionItem
} from './components';

const PDF = "https://www.slideshare.net/slideshow/zero-gap-voting-architecture-securing-india-s-electronic-voting-system/287278728";
const ease = [0.16, 1, 0.3, 1] as const;

/* ── Floating shape primitives ────────────────────────────────────── */
const Cube = ({ size=52, color, rotate=0, delay=0 }: {size?:number;color:string;rotate?:number;delay?:number}) => (
  <motion.div
    animate={{ y:[0,-14,0], rotate:[rotate, rotate+6, rotate] }}
    transition={{ duration:5+delay, repeat:Infinity, ease:'easeInOut', delay, repeatType:'mirror' }}
    style={{ width:size, height:size, borderRadius:size*0.28,
      background:color, boxShadow:`4px 8px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)`,
      flexShrink:0, willChange:'transform', transform:'translateZ(0)' }}
  />
);
const Sphere = ({ size=44, color, delay=0 }: {size?:number;color:string;delay?:number}) => (
  <motion.div
    animate={{ y:[0,-18,0] }}
    transition={{ duration:4+delay*0.7, repeat:Infinity, ease:'easeInOut', delay, repeatType:'mirror' }}
    style={{ width:size, height:size, borderRadius:'50%',
      background:color,
      boxShadow:`4px 8px 24px rgba(0,0,0,0.12), inset -3px -3px 6px rgba(0,0,0,0.08), inset 3px 3px 6px rgba(255,255,255,0.5)`,
      flexShrink:0, willChange:'transform', transform:'translateZ(0)' }}
  />
);
const Ring = ({ size=56, color, delay=0 }: {size?:number;color:string;delay?:number}) => (
  <motion.div
    animate={{ y:[0,-10,0], rotate:[0,12,0] }}
    transition={{ duration:6+delay, repeat:Infinity, ease:'easeInOut', delay, repeatType:'mirror' }}
    style={{ width:size, height:size, borderRadius:'50%',
      border:`8px solid ${color}`, background:'transparent',
      boxShadow:`0 6px 20px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.3)`,
      flexShrink:0, willChange:'transform', transform:'translateZ(0)' }}
  />
);

/* ── Shared check item ───────────────────────────────────────────── */
const Check = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3 text-slate-700 text-base">
    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
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
      <div className="flex gap-1.5 sm:gap-2 pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-violet-100">
        {[{l:'A = Server Log',s:'A',c:'text-indigo-600',bg:'glass-indigo'},
          {l:'B = EEPROM',s:'B',c:'text-orange-600',bg:'glass-saffron'},
          {l:'C = VVPAT Paper',s:'C',c:'text-green-700',bg:'glass-green'}].map(r=>(
          <div key={r.l} className={`flex-1 text-center py-2 sm:py-2.5 rounded-xl sm:rounded-2xl ${r.bg}`}>
            <div className={`text-[8px] sm:text-[10px] font-black ${r.c} font-mono`}><span className="sm:hidden">{r.s}</span><span className="hidden sm:inline">{r.l}</span></div>
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
   VOTER JOURNEY PANEL
══════════════════════════════════════════════════════════════════ */
function JourneyPanel() {
  const steps = [
    {n:'01',t:'Smart Card Tap',d:'NFC Voter ID on Node A',bg:'glass-indigo',tc:'text-indigo-600',nc:'text-indigo-500'},
    {n:'02',t:'Biometric Scan',d:'Fingerprint + iris fallback',bg:'glass-indigo',tc:'text-indigo-600',nc:'text-indigo-500'},
    {n:'03',t:'Server Validates',d:'Real-time deduplication',bg:'glass-indigo',tc:'text-indigo-600',nc:'text-indigo-500'},
    {n:'04',t:'QR Token Generated',d:'RSA-4096 signed, 90s TTL',bg:'glass-indigo',tc:'text-indigo-600',nc:'text-indigo-500'},
    {n:'⟶',t:'Airgap Crossed',d:'Voter walks to booth — light only',bg:'glass-violet',tc:'text-violet-700',nc:'text-violet-500'},
    {n:'05',t:'QR Verified Offline',d:'Signature + PROM check',bg:'glass',tc:'text-slate-700',nc:'text-slate-500'},
    {n:'06',t:'Ballot Cast + VVPAT',d:'Paper printed, 5s display',bg:'glass-saffron',tc:'text-orange-600',nc:'text-orange-500'},
    {n:'07',t:'Hash Chain Commit',d:'Vote locked into EEPROM',bg:'glass-green',tc:'text-green-700',nc:'text-green-600'},
  ];
  return (
    <div className="w-full glass-solid rounded-3xl p-7 select-none">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-3 h-3 rounded-full bg-red-300/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-300/60" />
        <div className="w-3 h-3 rounded-full bg-green-300/60" />
        <span className="ml-3 text-[11px] font-mono text-violet-400/60 tracking-widest uppercase">Voter Session Log</span>
        <span className="ml-auto live-dot">ACTIVE</span>
      </div>
      <div className="space-y-1.5">
        {steps.map((s,i)=>(
          <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.05,duration:0.3,ease}}
            className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl ${s.bg} min-w-0`}>
            <span className={`text-[11px] font-black font-mono w-6 shrink-0 ${s.tc}`}>{s.n}</span>
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className={`text-xs font-bold truncate ${s.tc}`}>{s.t}</div>
              <div className={`text-[10px] truncate ${s.nc}`}>{s.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════
   FLOATING ILLUSTRATION — decorative shapes cluster
══════════════════════════════════════════════════════════════════ */
function FloatCluster({ variant='a' }: { variant?: 'a'|'b'|'c'|'d' }) {
  if (variant === 'a') return (
    <div className="relative w-72 h-72 select-none pointer-events-none">
      <div className="absolute inset-0 blob-violet opacity-40 animate-blob" style={{width:'200px',height:'200px',top:'20px',left:'20px'}} />
      <div className="absolute" style={{top:'10px',left:'60px'}}><Cube size={60} color="linear-gradient(135deg,#8b5cf6,#6366f1)" rotate={12} delay={0} /></div>
      <div className="absolute" style={{top:'80px',right:'20px'}}><Sphere size={50} color="linear-gradient(135deg,#f97316,#ec4899)" delay={0.5} /></div>
      <div className="absolute" style={{bottom:'40px',left:'30px'}}><Cube size={38} color="linear-gradient(135deg,#38bdf8,#6366f1)" rotate={-15} delay={1} /></div>
      <div className="absolute" style={{bottom:'20px',right:'50px'}}><Ring size={48} color="#a78bfa" delay={0.8} /></div>
      <div className="absolute" style={{top:'50px',left:'20px'}}><Sphere size={24} color="linear-gradient(135deg,#4ade80,#22c55e)" delay={1.2} /></div>
      <div className="absolute" style={{top:'30px',right:'60px'}}><Cube size={28} color="linear-gradient(135deg,#fb923c,#f97316)" rotate={20} delay={1.5} /></div>
    </div>
  );
  if (variant === 'b') return (
    <div className="relative w-64 h-64 select-none pointer-events-none">
      <div className="absolute inset-0 blob-pink opacity-35 animate-blob" style={{width:'180px',height:'180px',top:'30px',left:'30px'}} />
      <div className="absolute" style={{top:'0px',right:'20px'}}><Sphere size={64} color="linear-gradient(135deg,#6366f1,#8b5cf6)" delay={0} /></div>
      <div className="absolute" style={{top:'70px',left:'10px'}}><Ring size={52} color="#f97316" delay={0.6} /></div>
      <div className="absolute" style={{bottom:'30px',right:'30px'}}><Cube size={44} color="linear-gradient(135deg,#ec4899,#a78bfa)" rotate={-10} delay={1} /></div>
      <div className="absolute" style={{bottom:'60px',left:'40px'}}><Sphere size={28} color="linear-gradient(135deg,#38bdf8,#6366f1)" delay={0.4} /></div>
    </div>
  );
  if (variant === 'c') return (
    <div className="relative w-60 h-60 select-none pointer-events-none">
      <div className="absolute inset-0 blob-sky opacity-35 animate-blob" style={{width:'170px',height:'170px',top:'20px',left:'20px'}} />
      <div className="absolute" style={{top:'10px',left:'30px'}}><Ring size={60} color="#6366f1" delay={0} /></div>
      <div className="absolute" style={{top:'60px',right:'10px'}}><Cube size={50} color="linear-gradient(135deg,#22c55e,#38bdf8)" rotate={8} delay={0.7} /></div>
      <div className="absolute" style={{bottom:'20px',left:'10px'}}><Sphere size={40} color="linear-gradient(135deg,#f97316,#fbbf24)" delay={0.3} /></div>
      <div className="absolute" style={{bottom:'50px',right:'40px'}}><Cube size={30} color="linear-gradient(135deg,#ec4899,#f97316)" rotate={25} delay={1.1} /></div>
    </div>
  );
  return (
    <div className="relative w-56 h-56 select-none pointer-events-none">
      <div className="absolute inset-0 blob-orange opacity-35 animate-blob" style={{width:'160px',height:'160px',top:'20px',left:'20px'}} />
      <div className="absolute" style={{top:'5px',right:'20px'}}><Cube size={56} color="linear-gradient(135deg,#f97316,#ec4899)" rotate={-12} delay={0} /></div>
      <div className="absolute" style={{top:'70px',left:'5px'}}><Sphere size={44} color="linear-gradient(135deg,#8b5cf6,#6366f1)" delay={0.5} /></div>
      <div className="absolute" style={{bottom:'10px',right:'30px'}}><Ring size={42} color="#22c55e" delay={0.9} /></div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════
   PROTOCOL DIAGRAMS — one per protocol, themed like AirgapPanel
══════════════════════════════════════════════════════════════════ */

/** 01 — Optical Airgap: animated QR photon beam Node A → Node B */
function AirgapDiagram() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-8 select-none">
      {/* titlebar */}
      <div className="w-full flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-300/60"/><div className="w-3 h-3 rounded-full bg-yellow-300/60"/><div className="w-3 h-3 rounded-full bg-green-300/60"/>
        <span className="ml-3 text-[11px] font-mono text-indigo-400/60 tracking-widest uppercase">Optical Channel — Zero Wires</span>
      </div>

      <div className="flex items-center gap-0 w-full max-w-lg">
        {/* Node A */}
        <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:0.5}}
          className="flex-1 glass-indigo rounded-2xl p-4">
          <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3">Node A · Online</div>
          {['Biometric Auth','Smart Card','Sign QR','Server Log'].map(t=>(
            <div key={t} className="flex items-center gap-2 text-[11px] text-indigo-500 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"/>{t}
            </div>
          ))}
          <div className="mt-3 flex items-center gap-1.5">
            <motion.div animate={{scale:[1,1.4,1],opacity:[1,0.5,1]}} transition={{repeat:Infinity,duration:1.2}}
              className="w-2 h-2 rounded-full bg-green-400"/>
            <span className="text-[10px] font-bold text-green-500 font-mono">ONLINE</span>
          </div>
        </motion.div>

        {/* Channel */}
        <div className="flex flex-col items-center mx-3 shrink-0" style={{width:100}}>
          <div className="text-[9px] font-mono text-violet-400/70 uppercase tracking-widest mb-2 text-center leading-tight">Optical<br/>Channel</div>
          {/* beam track */}
          <div className="relative w-full h-6 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-indigo-200 via-violet-400 to-orange-200"/>
            {[0,1,2].map(i=>(
              <motion.div key={i} className="absolute w-2.5 h-2.5 rounded-full"
                style={{background:'linear-gradient(135deg,#6366f1,#f97316)',boxShadow:'0 0 10px rgba(139,92,246,0.8)',top:'50%',transform:'translateY(-50%)'}}
                animate={{left:['-8%','108%']}}
                transition={{duration:1.6,delay:i*0.55,repeat:Infinity,ease:'linear'}}/>
            ))}
          </div>
          {/* QR token */}
          <motion.div animate={{opacity:[0.6,1,0.6]}} transition={{repeat:Infinity,duration:2}}
            className="mt-2 text-[9px] font-bold text-violet-500 font-mono bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-lg text-center leading-tight">
            QR 90s<br/>TTL
          </motion.div>
          {/* no-wire badges */}
          <div className="mt-2 flex flex-col items-center gap-0.5">
            {['No Wire','No WiFi','No BT'].map(t=>(
              <span key={t} className="text-[8px] text-red-400 font-semibold flex items-center gap-0.5">
                <X className="w-2.5 h-2.5"/>{t}
              </span>
            ))}
          </div>
        </div>

        {/* Node B */}
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{duration:0.5,delay:0.15}}
          className="flex-1 glass-saffron rounded-2xl p-4">
          <div className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-3">Node B · Airgapped</div>
          {['QR Scan Only','PROM Voter List','EEPROM Chain','VVPAT Print'].map(t=>(
            <div key={t} className="flex items-center gap-2 text-[11px] text-orange-500 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"/>{t}
            </div>
          ))}
          <div className="mt-3 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-300"/>
            <span className="text-[10px] font-bold text-slate-400 font-mono">AIRGAPPED</span>
          </div>
        </motion.div>
      </div>

      {/* A=B=C footer */}
      <div className="flex gap-2 w-full max-w-lg">
        {[{l:'A = Server Log',c:'text-indigo-600',bg:'glass-indigo'},
          {l:'B = EEPROM',c:'text-orange-600',bg:'glass-saffron'},
          {l:'C = VVPAT Paper',c:'text-green-700',bg:'glass-green'}].map(r=>(
          <div key={r.l} className={`flex-1 text-center py-2 rounded-2xl ${r.bg}`}>
            <div className={`text-[10px] font-black ${r.c} font-mono`}>{r.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 02 — Hash Chain: 4 animated blocks chained, tamper triggers lock */
function HashDiagram() {
  const [tampered, setTampered] = React.useState(false);
  const [phase, setPhase] = React.useState(0); // 0=building, 1=built, 2=tampered

  const [hashCycle, setHashCycle] = React.useState(0);
  React.useEffect(()=>{
    setTampered(false); setPhase(0);
    const t1 = setTimeout(()=>setPhase(1), 1600);
    const t2 = setTimeout(()=>{ setPhase(2); setTampered(true); }, 4000);
    const t3 = setTimeout(()=>setHashCycle(c=>c+1), 7500);
    return ()=>{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  },[hashCycle]);

  const blocks = [
    {id:1, hash:'a3f9c1',prev:'GENESIS', g:'from-indigo-500 to-blue-500', tc:'text-indigo-600', bg:'glass-indigo'},
    {id:2, hash:'d7b28e',prev:'a3f9c1',  g:'from-violet-500 to-purple-500',tc:'text-violet-600',bg:'glass-violet'},
    {id:3, hash:'f1e42a',prev:'d7b28e',  g:'from-orange-400 to-pink-500',  tc:'text-orange-600',bg:'glass-saffron'},
    {id:4, hash:'9c0d7f',prev:'f1e42a',  g:'from-green-400 to-emerald-500',tc:'text-green-700', bg:'glass-green'},
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-8 select-none">
      <div className="w-full flex items-center gap-2 mb-1">
        <div className="w-3 h-3 rounded-full bg-red-300/60"/><div className="w-3 h-3 rounded-full bg-yellow-300/60"/><div className="w-3 h-3 rounded-full bg-green-300/60"/>
        <span className="ml-3 text-[11px] font-mono text-violet-400/60 tracking-widest uppercase">EEPROM Hash Chain</span>
        {phase===2 && <motion.span initial={{opacity:0}} animate={{opacity:1}} className="ml-auto text-[10px] font-bold text-red-500 font-mono bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">TAMPER DETECTED</motion.span>}
      </div>

      {/* Chain blocks */}
      <div className="flex items-center gap-1 w-full max-w-lg flex-wrap justify-center">
        {blocks.map((b,i)=>{
          const broken = tampered && i >= 2;
          return (
            <React.Fragment key={b.id}>
              <motion.div
                initial={{opacity:0,scale:0.6,rotateY:90}}
                animate={phase>0?{opacity:1,scale:broken?1.04:1,rotateY:0}:{opacity:0,scale:0.6,rotateY:90}}
                transition={{delay:i*0.25,duration:0.4,ease:'easeOut'}}
                className={`rounded-xl p-2.5 border transition-all duration-300 ${broken?'border-red-300 shadow-red-200/60 shadow-lg':b.bg+' border-white/60'}`}
                style={{minWidth:80}}>
                <div className="text-[9px] font-bold text-slate-400 mb-0.5">Block #{b.id}</div>
                <div className={`text-[11px] font-black font-mono ${broken?'text-red-500':b.tc}`}>{broken&&i===2?'██████':b.hash}</div>
                <div className="text-[9px] text-slate-400 mt-0.5 font-mono truncate">prev: {broken&&i===2?'??????':b.prev}</div>
                {broken&&i===2 && (
                  <motion.div animate={{opacity:[1,0.4,1]}} transition={{repeat:Infinity,duration:0.6}}
                    className="text-[9px] font-bold text-red-500 mt-1">⚠ CORRUPTED</motion.div>
                )}
              </motion.div>
              {i<blocks.length-1 && (
                <motion.div initial={{scaleX:0}} animate={phase>0?{scaleX:1}:{scaleX:0}} transition={{delay:i*0.25+0.3,duration:0.3}}>
                  <ArrowRight className={`w-3 h-3 mx-0.5 ${broken&&i>=1?'text-red-400':'text-violet-300'}`}/>
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Status bar */}
      <motion.div animate={{opacity:[0.8,1,0.8]}} transition={{repeat:Infinity,duration:2}}
        className={`flex items-center gap-3 w-full max-w-lg px-4 py-3 rounded-2xl border transition-all duration-500 ${tampered?'bg-red-50 border-red-200':'glass-green border-green-200/60'}`}>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${tampered?'bg-red-100':'bg-green-100'}`}>
          {tampered
            ? <AlertTriangle className="w-4 h-4 text-red-500"/>
            : <Shield className="w-4 h-4 text-green-600"/>}
        </div>
        <div>
          <div className={`text-xs font-bold ${tampered?'text-red-600':'text-green-700'}`}>
            {tampered ? 'Chain broken at Block #3 — Machine LOCKED' : 'Chain integrity verified — All blocks valid'}
          </div>
          <div className={`text-[10px] font-mono mt-0.5 ${tampered?'text-red-400':'text-green-500'}`}>
            {tampered ? 'SHA-256 mismatch · Power cut in <30ms' : 'SHA-256 chain intact · EEPROM sealed'}
          </div>
        </div>
      </motion.div>

      <div className="text-[10px] text-slate-400 font-mono text-center">
        Demo: building → valid → tamper detected → repeat
      </div>
    </div>
  );
}

/** 03 — Hardware Watchdog: CPU ↔ MCU 10ms ping, power cut on miss */
function WatchdogDiagram() {
  const [pingActive, setPingActive] = React.useState(true);
  const [powerCut, setPowerCut] = React.useState(false);
  const [cycle, setCycle] = React.useState(0);

  React.useEffect(()=>{
    setPingActive(true); setPowerCut(false);
    const t1 = setTimeout(()=>setPingActive(false), 3500);
    const t2 = setTimeout(()=>setPowerCut(true), 4200);
    const t3 = setTimeout(()=>{ setPingActive(true); setPowerCut(false); setCycle(c=>c+1); }, 7000);
    return ()=>{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  },[cycle]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-8 select-none">
      <div className="w-full flex items-center gap-2 mb-1">
        <div className="w-3 h-3 rounded-full bg-red-300/60"/><div className="w-3 h-3 rounded-full bg-yellow-300/60"/><div className="w-3 h-3 rounded-full bg-green-300/60"/>
        <span className="ml-3 text-[11px] font-mono text-green-500/70 tracking-widest uppercase">Hardware Watchdog</span>
      </div>

      <div className="flex items-center gap-8 w-full max-w-md justify-center">
        {/* Main CPU */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={powerCut?{scale:[1,0.92,0.92],opacity:[1,1,0.3]}:{scale:1,opacity:1}}
            transition={{duration:0.4}}
            className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-300 ${powerCut?'bg-red-50 border-red-300':'glass-indigo border-indigo-200'}`}>
            <Cpu className={`w-8 h-8 mb-1 ${powerCut?'text-red-400':'text-indigo-500'}`}/>
            <div className={`text-[9px] font-bold font-mono ${powerCut?'text-red-500':'text-indigo-600'}`}>MAIN CPU</div>
          </motion.div>
          {powerCut && (
            <motion.div initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}}
              className="text-[10px] font-bold text-red-500 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-mono">
              POWER CUT
            </motion.div>
          )}
          {!powerCut && (
            <div className="text-[10px] text-slate-400 font-mono">Running</div>
          )}
        </div>

        {/* Ping channel */}
        <div className="flex flex-col items-center gap-1" style={{width:80}}>
          {/* Ping going right */}
          <div className="text-[9px] text-slate-400 font-mono mb-1">10ms PING</div>
          <div className="relative w-full h-5 flex items-center">
            <div className={`w-full h-px transition-colors duration-300 ${pingActive?'bg-green-300':'bg-red-200'}`}/>
            {pingActive && [0,1].map(i=>(
              <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-green-400"
                style={{boxShadow:'0 0 8px rgba(34,197,94,0.8)',top:'50%',transform:'translateY(-50%)'}}
                animate={{left:['-8%','108%']}}
                transition={{duration:0.5,delay:i*0.28,repeat:Infinity,ease:'linear'}}/>
            ))}
            {!pingActive && (
              <motion.div animate={{opacity:[1,0,1]}} transition={{repeat:Infinity,duration:0.4}}
                className="absolute inset-0 flex items-center justify-center">
                <X className="w-3 h-3 text-red-400"/>
              </motion.div>
            )}
          </div>
          {/* Ack going left */}
          <div className="relative w-full h-5 flex items-center">
            <div className={`w-full h-px transition-colors duration-300 ${pingActive?'bg-indigo-300':'bg-red-200'}`}/>
            {pingActive && [0,1].map(i=>(
              <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-indigo-400"
                style={{boxShadow:'0 0 8px rgba(99,102,241,0.8)',top:'50%',transform:'translateY(-50%)'}}
                animate={{left:['108%','-8%']}}
                transition={{duration:0.5,delay:i*0.28+0.1,repeat:Infinity,ease:'linear'}}/>
            ))}
          </div>
          <div className="text-[9px] text-slate-400 font-mono mt-1">ACK</div>
          {!pingActive && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}}
              className="mt-1 text-[9px] font-bold text-red-500 font-mono text-center">PING<br/>STOPPED</motion.div>
          )}
        </div>

        {/* Watchdog MCU */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={powerCut?{borderColor:'#fca5a5',scale:1.05}:{borderColor:'#6ee7b7'}}
            transition={{duration:0.3}}
            className="w-20 h-20 rounded-2xl glass-green border-2 border-green-200 flex flex-col items-center justify-center">
            <Activity className={`w-8 h-8 mb-1 ${powerCut?'text-red-500':'text-green-600'}`}/>
            <div className="text-[9px] font-bold font-mono text-green-700">WDT MCU</div>
          </motion.div>
          <motion.div
            animate={powerCut?{opacity:1}:{opacity:0.5}}
            className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border ${powerCut?'text-red-600 bg-red-50 border-red-300':'text-green-600 bg-green-50 border-green-200'}`}>
            {powerCut?'CUTTING POWER':'Monitoring'}
          </motion.div>
        </div>
      </div>

      {/* Timeline: what happens */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-md">
        {[
          {t:'Ping stops',d:'CPU crash / freeze / tamper',c:'text-red-500',bg:'bg-red-50 border-red-200'},
          {t:'< 30ms',d:'Watchdog detects miss',c:'text-orange-600',bg:'bg-orange-50 border-orange-200'},
          {t:'Power CUT',d:'Instant hardware reset',c:'text-green-700',bg:'bg-green-50 border-green-200'},
        ].map((s,i)=>(
          <motion.div key={i}
            animate={!pingActive&&i===0?{scale:1.05}:powerCut&&i===2?{scale:1.05}:{scale:1}}
            className={`text-center p-2 rounded-xl border text-[10px] transition-all duration-300 ${s.bg}`}>
            <div className={`font-black ${s.c} font-mono`}>{s.t}</div>
            <div className="text-slate-500 mt-0.5 leading-tight">{s.d}</div>
          </motion.div>
        ))}
      </div>
      <div className="text-[10px] text-slate-400 font-mono">Software cannot override the watchdog — it is separate hardware</div>
    </div>
  );
}

/** 04 — VVPAT: animated vote → paper print → 5s view → ballot box */
function VVPATDiagram() {
  const [step, setStep] = React.useState(0);
  const [vvpatCycle, setVvpatCycle] = React.useState(0);
  // steps: 0=idle, 1=vote tapped, 2=printing, 3=viewing, 4=deposited
  React.useEffect(()=>{
    setStep(0);
    const t1 = setTimeout(()=>setStep(1), 1200);
    const t2 = setTimeout(()=>setStep(2), 2400);
    const t3 = setTimeout(()=>setStep(3), 3600);
    const t4 = setTimeout(()=>setStep(4), 6000);
    const t5 = setTimeout(()=>setVvpatCycle(c=>c+1), 8500);
    return ()=>{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  },[vvpatCycle]);

  const candidates = ['BJP — Candidate A','INC — Candidate B','AAP — Candidate C'];
  const chosen = 1;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-8 select-none">
      <div className="w-full flex items-center gap-2 mb-1">
        <div className="w-3 h-3 rounded-full bg-red-300/60"/><div className="w-3 h-3 rounded-full bg-yellow-300/60"/><div className="w-3 h-3 rounded-full bg-green-300/60"/>
        <span className="ml-3 text-[11px] font-mono text-orange-400/70 tracking-widest uppercase">VVPAT Paper Proof</span>
      </div>

      {/* Step flow: 4 stages */}
      <div className="flex items-center gap-2 w-full max-w-lg justify-center">
        {['Tap Vote','Paper Prints','5s View','Deposited'].map((s,i)=>(
          <React.Fragment key={s}>
            <motion.div
              animate={step>i?{opacity:1,scale:1}:step===i+1?{opacity:1,scale:1.05}:{opacity:0.35,scale:0.97}}
              className={`flex-1 text-center py-2 px-1 rounded-xl border text-[10px] font-bold transition-all duration-300
                ${step>i?'glass-green border-green-200 text-green-700':
                  step===i+1?'glass-saffron border-orange-200 text-orange-600':
                  'glass border-white/60 text-slate-400'}`}>
              <div className="text-sm mb-0.5">{['👆','🖨️','👁️','🗳️'][i]}</div>
              {s}
            </motion.div>
            {i<3 && <ArrowRight className={`w-3 h-3 shrink-0 ${step>i?'text-green-400':'text-slate-300'}`}/>}
          </React.Fragment>
        ))}
      </div>

      {/* EVM + paper slot */}
      <div className="flex items-start gap-6 w-full max-w-md justify-center">
        {/* EVM screen */}
        <div className="flex flex-col items-center gap-2">
          <div className="glass-indigo rounded-2xl border border-indigo-200 p-3 w-36">
            <div className="text-[9px] font-bold text-indigo-500 font-mono mb-2 text-center">EVM DISPLAY</div>
            {candidates.map((c,i)=>(
              <motion.div key={i}
                animate={step>=1&&i===chosen?{background:'rgba(139,92,246,0.15)',borderColor:'rgba(139,92,246,0.4)'}:{}}
                className={`flex items-center gap-1.5 py-1.5 px-2 rounded-lg border border-transparent mb-1 text-[9px] cursor-default transition-all duration-300`}>
                <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${step>=1&&i===chosen?'border-violet-500 bg-violet-500':'border-slate-300'}`}>
                  {step>=1&&i===chosen && <div className="w-1.5 h-1.5 rounded-full bg-white"/>}
                </div>
                <span className={step>=1&&i===chosen?'text-violet-700 font-bold':'text-slate-500'}>{c}</span>
              </motion.div>
            ))}
            {step>=1 && (
              <motion.div initial={{opacity:0,y:4}} animate={{opacity:1,y:0}}
                className="mt-2 text-center text-[9px] font-bold text-violet-600 bg-violet-50 border border-violet-200 rounded-lg py-1">
                ✓ RECORDED
              </motion.div>
            )}
          </div>
        </div>

        {/* VVPAT printer + paper */}
        <div className="flex flex-col items-center gap-1">
          <div className={`w-32 h-10 rounded-xl border-2 flex items-center px-3 gap-2 transition-all duration-300 ${step>=2?'glass-saffron border-orange-300':'glass border-white/60'}`}>
            <Printer className={`w-4 h-4 shrink-0 ${step>=2?'text-orange-500':'text-slate-300'}`}/>
            <div className="text-[9px] font-bold font-mono text-slate-500">VVPAT</div>
            {step===2 && (
              <motion.div animate={{opacity:[1,0.3,1]}} transition={{repeat:Infinity,duration:0.4}} className="ml-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400"/>
              </motion.div>
            )}
          </div>

          {/* Paper slip */}
          <motion.div
            initial={{height:0,opacity:0}}
            animate={step>=2?{height:'auto',opacity:1}:{height:0,opacity:0}}
            transition={{duration:0.5,ease:'easeOut'}}
            className="overflow-hidden w-28">
            <div className={`rounded-b-xl border-x-2 border-b-2 transition-all duration-500 ${step>=4?'border-green-300 opacity-40':'border-orange-200'} bg-white shadow-sm`}>
              <div className="p-2 space-y-1">
                <div className="text-[8px] font-bold text-slate-600 text-center border-b border-slate-100 pb-1">VOTE RECEIPT</div>
                <div className="text-[8px] text-violet-700 font-bold">✓ {candidates[chosen]}</div>
                <div className="text-[8px] text-slate-400">Booth: 2847-MH</div>
                <div className="h-px bg-dashed-slate-100 my-0.5"/>
                <div className="text-[7px] text-slate-300 font-mono">ECI SIGNED</div>
              </div>
            </div>
          </motion.div>

          {/* 5s timer */}
          {step===3 && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}}
              className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1 font-mono">
              Viewing 5s →
            </motion.div>
          )}

          {/* Deposited */}
          {step>=4 && (
            <motion.div initial={{opacity:0,y:4}} animate={{opacity:1,y:0}}
              className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-3 py-1 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3"/> Ballot Box
            </motion.div>
          )}
        </div>
      </div>

      <div className="text-[10px] text-slate-400 font-mono text-center max-w-xs">
        Paper is the legally binding ground truth — physics beats cryptography
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════
   RECONCILIATION DIAGRAM — A=B=C animated three-stream convergence
══════════════════════════════════════════════════════════════════ */
function ReconcDiagram() {
  const [match, setMatch] = React.useState(false);
  const [mismatch, setMismatch] = React.useState(false);
  const [cycle, setCycle] = React.useState(0);

  React.useEffect(()=>{
    setMatch(false); setMismatch(false);
    const t1 = setTimeout(()=>setMatch(true), 2000);
    const t2 = setTimeout(()=>{ setMatch(false); setMismatch(true); }, 5000);
    const t3 = setTimeout(()=>setCycle(c=>c+1), 8000);
    return ()=>{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  },[cycle]);

  const streams = [
    { label:'A', name:'Server Log', sub:'Node A · Online DB', g:'from-indigo-500 to-blue-500', bg:'glass-indigo', tc:'text-indigo-600', count:'9,42,183' },
    { label:'B', name:'EEPROM Chain', sub:'Node B · Hash Ledger', g:'from-violet-500 to-purple-600', bg:'glass-violet', tc:'text-violet-600', count:'9,42,183' },
    { label:'C', name:'VVPAT Paper', sub:'Ballot Box · Physical', g:'from-green-400 to-emerald-500', bg:'glass-green', tc:'text-green-700', count: mismatch?'9,42,101':'9,42,183' },
  ];

  return (
    <div className="w-full glass-solid rounded-3xl p-8 select-none overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-300/60"/><div className="w-3 h-3 rounded-full bg-yellow-300/60"/><div className="w-3 h-3 rounded-full bg-green-300/60"/>
        <span className="ml-3 text-[11px] font-mono text-violet-400/60 tracking-widest uppercase">Triple Reconciliation Engine</span>
      </div>

      {/* Three streams flowing down */}
      <div className="flex gap-3 mb-4">
        {streams.map((s,i)=>(
          <motion.div key={i}
            initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} transition={{delay:i*0.2,duration:0.5}}
            className={`flex-1 rounded-2xl p-3 ${s.bg} border border-white/60`}>
            <div className={`text-xl font-black font-mono ${s.tc} mb-1`}>{s.label}</div>
            <div className={`text-[11px] font-bold ${s.tc}`}>{s.name}</div>
            <div className="text-[9px] text-slate-400 mb-2">{s.sub}</div>
            <motion.div
              animate={match||(!mismatch)?{opacity:1}:{opacity:0.5}}
              className={`text-base font-black font-mono ${mismatch&&s.label==='C'?'text-red-500':s.tc}`}>
              {s.count}
            </motion.div>
            <div className="text-[9px] text-slate-400">votes</div>
          </motion.div>
        ))}
      </div>

      {/* Convergence arrows */}
      <div className="flex justify-center gap-3 mb-3">
        {[0,1,2].map(i=>(
          <motion.div key={i} animate={{y:[0,4,0]}} transition={{repeat:Infinity,duration:1.2,delay:i*0.15}}>
            <svg width="24" height="16" viewBox="0 0 24 16">
              <path d="M12 0 L12 16 M6 10 L12 16 L18 10" stroke={match?'#22c55e':mismatch&&i===2?'#ef4444':'#8b5cf6'} strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Equals gate */}
      <motion.div
        animate={match?{borderColor:'rgba(34,197,94,0.5)',background:'rgba(240,253,244,0.8)'}:
                 mismatch?{borderColor:'rgba(239,68,68,0.5)',background:'rgba(254,242,242,0.8)'}:
                 {borderColor:'rgba(139,92,246,0.3)',background:'rgba(245,243,255,0.8)'}}
        transition={{duration:0.4}}
        className="rounded-2xl border-2 p-4 text-center transition-all duration-300">
        {!match && !mismatch && (
          <div>
            <div className="text-lg font-black text-violet-500 font-mono mb-1">A = B = C ?</div>
            <div className="text-xs text-slate-400">Waiting for count completion…</div>
          </div>
        )}
        {match && (
          <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}}>
            <div className="text-lg font-black text-green-600 font-mono mb-1">✓ A = B = C</div>
            <div className="text-xs text-green-600 font-semibold">All three sources match — result CERTIFIED</div>
          </motion.div>
        )}
        {mismatch && (
          <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}}>
            <div className="text-lg font-black text-red-600 font-mono mb-1">⚠ A ≠ C — MISMATCH</div>
            <div className="text-xs text-red-500 font-semibold">Forensic investigation triggered · Result FROZEN</div>
          </motion.div>
        )}
      </motion.div>
      <div className="text-[10px] text-slate-400 font-mono text-center mt-3">Demo: match → mismatch detected → repeat</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   THREAT SHIELD DIAGRAM — attack paths blocked visualisation
══════════════════════════════════════════════════════════════════ */
function ThreatShieldDiagram() {
  const [activeAttack, setActiveAttack] = React.useState(0);
  const attacks = [
    { name:'Remote Hack',   icon:'🌐', path:'Network → Node B', block:'No radio hardware', color:'text-red-500',   bg:'bg-red-50',   border:'border-red-200' },
    { name:'Signal Tap',    icon:'📡', path:'RF → Intercept',   block:'Optical QR only',  color:'text-orange-500',bg:'bg-orange-50',border:'border-orange-200'},
    { name:'Memory Forge',  icon:'💾', path:'EEPROM overwrite',  block:'Hash chain locks', color:'text-violet-600',bg:'bg-violet-50',border:'border-violet-200'},
    { name:'Replay Attack', icon:'🔁', path:'Reuse QR token',   block:'Single-use nonce', color:'text-blue-600',  bg:'bg-blue-50',  border:'border-blue-200' },
  ];
  React.useEffect(()=>{
    const t = setInterval(()=>setActiveAttack(a=>(a+1)%attacks.length),2200);
    return ()=>clearInterval(t);
  },[]);
  const a = attacks[activeAttack];
  return (
    <div className="glass-solid rounded-3xl p-6 select-none">
      <div className="text-[11px] font-mono text-violet-400/60 tracking-widest uppercase mb-4">Live Attack Simulation</div>
      {/* Selector */}
      <div className="grid grid-cols-4 gap-1.5 mb-5">
        {attacks.map((att,i)=>(
          <button key={i} onClick={()=>setActiveAttack(i)}
            className={`text-center p-2 rounded-xl text-[10px] font-bold border transition-all duration-200 ${activeAttack===i?att.bg+' '+att.border+' '+att.color:'glass border-white/60 text-slate-400'}`}>
            <div className="text-lg mb-0.5">{att.icon}</div>
            {att.name}
          </button>
        ))}
      </div>
      {/* Attack flow */}
      <AnimatePresence mode="wait">
        <motion.div key={activeAttack} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.25}}>
          <div className="flex items-center gap-3 mb-4">
            {/* Attacker */}
            <div className={`flex-1 text-center p-3 rounded-2xl ${a.bg} border ${a.border}`}>
              <div className="text-2xl mb-1">{a.icon}</div>
              <div className={`text-[11px] font-bold ${a.color}`}>{a.name}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">{a.path}</div>
            </div>
            {/* Arrow with X */}
            <div className="flex flex-col items-center gap-1">
              <motion.div animate={{x:[0,8,0]}} transition={{repeat:Infinity,duration:0.8}}>
                <ArrowRight className={`w-5 h-5 ${a.color}`}/>
              </motion.div>
              <motion.div animate={{scale:[1,1.2,1],opacity:[1,0.6,1]}} transition={{repeat:Infinity,duration:0.6}}
                className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-white"/>
              </motion.div>
            </div>
            {/* Shield */}
            <div className="flex-1 text-center p-3 rounded-2xl glass-green border border-green-200">
              <div className="text-2xl mb-1">🛡️</div>
              <div className="text-[11px] font-bold text-green-700">BLOCKED</div>
              <div className="text-[9px] text-green-600 mt-0.5 font-semibold">{a.block}</div>
            </div>
          </div>
          <div className="text-center py-2 px-4 rounded-2xl bg-green-50 border border-green-200">
            <div className="text-xs font-bold text-green-700">Zero-Gap neutralises this vector at the hardware layer</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   DEPLOYMENT MAP DIAGRAM — India map with phase progress
══════════════════════════════════════════════════════════════════ */
function DeploymentDiagram() {
  const phases = [
    { label:'Phase 1', sub:'Pilot · 500 Booths', pct:100, g:'from-orange-400 to-pink-500', years:'Yr 1–2', states:['MH','DL','KA'] },
    { label:'Phase 2', sub:'Scale · 10 States',  pct:60,  g:'from-indigo-500 to-blue-500', years:'Yr 2–3', states:['MH','DL','KA','UP','TN','AP','WB','GJ','RJ','MP'] },
    { label:'Phase 3', sub:'National · Lok Sabha',pct:0,  g:'from-green-400 to-emerald-500',years:'Yr 3–5', states:['ALL'] },
  ];
  const stateGrid = [
    ['J&K','HP','UK','PB','HR','DL','RJ'],
    ['UP','BR','JH','WB','SK','AR','MZ'],
    ['GJ','MP','CG','OD','MN','NL','MG'],
    ['MH','TS','AP','KA','KL','TN','GA'],
  ];
  const phase1 = ['MH','DL','KA'];
  const phase2 = ['MH','DL','KA','UP','TN','AP','WB','GJ','RJ','MP'];
  return (
    <div className="glass-solid rounded-3xl p-6 select-none">
      <div className="text-[11px] font-mono text-violet-400/60 tracking-widest uppercase mb-4">National Deployment Roadmap</div>
      {/* India state grid */}
      <div className="mb-5 p-3 rounded-2xl bg-violet-50/60 border border-violet-100">
        <div className="text-[10px] text-slate-400 font-mono mb-2">State Coverage</div>
        <div className="space-y-1">
          {stateGrid.map((row,ri)=>(
            <div key={ri} className="flex gap-1">
              {row.map(st=>{
                const p1 = phase1.includes(st);
                const p2 = phase2.includes(st);
                return (
                  <motion.div key={st}
                    initial={{opacity:0,scale:0.7}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
                    transition={{delay:(ri*7+row.indexOf(st))*0.03,duration:0.3}}
                    className={`flex-1 text-center py-1 rounded text-[8px] font-bold border transition-all duration-300
                      ${p1?'bg-gradient-to-br from-orange-400 to-pink-500 text-white border-orange-300':
                        p2?'bg-gradient-to-br from-indigo-400 to-blue-500 text-white border-indigo-300':
                        'bg-white/60 text-slate-300 border-slate-100'}`}>
                    {st}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-2">
          {[{c:'bg-gradient-to-r from-orange-400 to-pink-500',l:'Phase 1'},
            {c:'bg-gradient-to-r from-indigo-400 to-blue-500',l:'Phase 2'},
            {c:'bg-white/60 border border-slate-200',l:'Phase 3'}].map((leg,i)=>(
            <div key={i} className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded ${leg.c}`}/>
              <span className="text-[9px] text-slate-500">{leg.l}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Phase bars */}
      {phases.map((p,i)=>(
        <div key={i} className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <div>
              <span className="text-[11px] font-bold text-slate-700">{p.label}</span>
              <span className="text-[10px] text-slate-400 ml-2">{p.sub}</span>
            </div>
            <span className="text-[10px] font-mono text-violet-500">{p.years}</span>
          </div>
          <div className="h-2.5 rounded-full bg-violet-50 overflow-hidden border border-violet-100">
            <motion.div
              initial={{width:0}} whileInView={{width:`${p.pct}%`}} viewport={{once:true}}
              transition={{delay:i*0.2+0.3,duration:1.2,ease:[0.16,1,0.3,1]}}
              className={`h-full rounded-full bg-gradient-to-r ${p.g}`}/>
          </div>
        </div>
      ))}
      <div className="mt-3 text-center text-[10px] font-mono text-green-600 bg-green-50 border border-green-200 rounded-xl py-2">
        🗳️ Target: Lok Sabha 2029 — Full National Coverage
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   COST COMPARISON DIAGRAM — animated visual breakdown
══════════════════════════════════════════════════════════════════ */
function CostComparisonDiagram() {
  const items = [
    { label:'Node A Terminals',  amt:3675, pct:22, g:'from-indigo-500 to-blue-500', tc:'text-indigo-600' },
    { label:'Node B EVMs',       amt:4463, pct:27, g:'from-violet-500 to-purple-600',tc:'text-violet-600' },
    { label:'Voter Smart Cards', amt:8313, pct:50, g:'from-green-400 to-emerald-500',tc:'text-green-700' },
    { label:'Infrastructure',    amt:1000, pct:6,  g:'from-orange-400 to-pink-500',  tc:'text-orange-600' },
    { label:'Training',          amt:500,  pct:3,  g:'from-pink-400 to-rose-500',    tc:'text-pink-600' },
  ];
  const total = 17951;
  const electionCost = 120000;
  return (
    <div className="glass-solid rounded-3xl p-6 select-none">
      <div className="text-[11px] font-mono text-violet-400/60 tracking-widest uppercase mb-4">One-Time Investment vs Election Cost</div>

      {/* Donut visual using SVG arcs */}
      <div className="flex items-center gap-5 mb-5">
        <div className="relative shrink-0" style={{width:100,height:100}}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle cx="50" cy="50" r="38" fill="none" stroke="#ede9fe" strokeWidth="12"/>
            {/* Segments */}
            {(()=>{
              let offset = 0;
              const circ = 2*Math.PI*38;
              return items.map((item,i)=>{
                const dash = (item.pct/100)*circ;
                const el = (
                  <motion.circle key={i} cx="50" cy="50" r="38" fill="none"
                    stroke={`url(#g${i})`} strokeWidth="12"
                    strokeDasharray={`${dash} ${circ}`}
                    strokeDashoffset={-offset}
                    strokeLinecap="butt"
                    initial={{strokeDasharray:`0 ${circ}`}}
                    whileInView={{strokeDasharray:`${dash} ${circ}`}}
                    viewport={{once:true}}
                    transition={{delay:i*0.15+0.3,duration:0.8,ease:[0.16,1,0.3,1]}}
                    transform="rotate(-90 50 50)"
                  />
                );
                offset += dash;
                return el;
              });
            })()}
            <defs>
              {items.map((_item,i)=>(
                <linearGradient key={i} id={`g${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={['#6366f1','#8b5cf6','#4ade80','#fb923c','#f472b6'][i]}/>
                  <stop offset="100%" stopColor={['#3b82f6','#a855f7','#22c55e','#ec4899','#e11d48'][i]}/>
                </linearGradient>
              ))}
            </defs>
            <text x="50" y="47" textAnchor="middle" fontSize="10" fill="#7c3aed" fontWeight="900" fontFamily="monospace">₹{Math.round(total/1000)}K</text>
            <text x="50" y="59" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">crore</text>
          </svg>
        </div>
        <div className="flex-1 space-y-1.5">
          {items.map((item,i)=>(
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${item.g} shrink-0`}/>
              <div className="flex-1 text-[10px] text-slate-600 truncate">{item.label}</div>
              <div className={`text-[10px] font-bold font-mono ${item.tc}`}>{item.pct}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison bar */}
      <div className="rounded-2xl bg-violet-50/60 border border-violet-100 p-3">
        <div className="text-[10px] text-slate-500 mb-2 font-mono">Zero-Gap vs 2024 Election economic footprint</div>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-slate-500">Zero-Gap (one-time)</span>
              <span className="font-bold font-mono text-violet-600">₹{total.toLocaleString()} Cr</span>
            </div>
            <div className="h-3 rounded-full bg-white/80 overflow-hidden border border-violet-100">
              <motion.div initial={{width:0}} whileInView={{width:`${(total/electionCost)*100}%`}} viewport={{once:true}}
                transition={{duration:1,ease:[0.16,1,0.3,1],delay:0.3}}
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"/>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-slate-500">2024 Election footprint</span>
              <span className="font-bold font-mono text-slate-400">₹{electionCost.toLocaleString()} Cr</span>
            </div>
            <div className="h-3 rounded-full bg-white/80 overflow-hidden border border-slate-200">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-slate-200 to-slate-300"/>
            </div>
          </div>
        </div>
        <div className="mt-2 text-center text-[11px] font-bold text-violet-600">
          ~15% of one election · secures every election after
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFaq, setActiveFaq]   = useState<number|null>(null);
  const [activeProto, setActiveProto] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(()=>{
    const h = ()=>{
      setScrollY(window.scrollY);
      const tot = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(tot>0?(window.scrollY/tot)*100:0);
    };
    window.addEventListener('scroll',h,{passive:true});
    return ()=>window.removeEventListener('scroll',h);
  },[]);

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

      {/* Progress bar */}
      <div className="progress-bar" style={{width:`${scrollPct}%`}} />

      {/* Global dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-60" />

      {/* Large ambient blobs — fixed background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="blob-violet absolute" style={{width:'600px',height:'600px',top:'-200px',left:'-150px',opacity:0.18}} />
        <div className="blob-pink absolute" style={{width:'500px',height:'500px',top:'30%',right:'-200px',opacity:0.15}} />
        <div className="blob-sky absolute" style={{width:'400px',height:'400px',bottom:'-100px',left:'20%',opacity:0.12}} />
      </div>

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY>40?'glass-nav':'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          <button onClick={()=>go('hero')} className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-200">
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
        <section id="hero" className="relative pt-28 sm:pt-36 pb-0 overflow-hidden">
          {/* hero radial wash */}
          <div className="absolute inset-0 hero-wash pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
            {/* Eyebrow */}
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.5,ease}}
              className="flex justify-center mb-8">
              <span className="live-dot">PROPOSED TO ECI · UIDAI · MEITY</span>
            </motion.div>

            {/* H1 */}
            <div className="text-center max-w-5xl mx-auto mb-8 px-2">
              <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.7,ease,delay:0.05}}
                className="text-[2.4rem] xs:text-5xl sm:text-7xl lg:text-[96px] xl:text-[108px] font-black tracking-[-0.03em] sm:tracking-[-0.04em] leading-[0.95] sm:leading-[0.92] text-slate-900">
                Secure India's<br/>
                <span className="gradient-text">elections</span><br/>
                for ever.
              </motion.h1>
            </div>

            {/* Subtext */}
            <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.18,ease}}
              className="text-center text-base sm:text-xl lg:text-2xl text-slate-500 font-normal max-w-2xl mx-auto mb-10 leading-relaxed px-4">
              Zero-Gap makes electronic vote manipulation not merely difficult —
              <span className="text-slate-700 font-medium"> physically and mathematically impossible.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.28,ease}}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16 sm:mb-20 px-4">
              <motion.button whileHover={{scale:1.04}} whileTap={{scale:0.97}} onClick={()=>go('solution')} className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto justify-center">
                Explore Architecture <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.a whileHover={{scale:1.04}} whileTap={{scale:0.97}} href={PDF} target="_blank" rel="noreferrer" className="btn-outline text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto justify-center">
                <FileText className="w-4 h-4" /> Download PDF
              </motion.a>
            </motion.div>

            {/* Hero full-width panel */}
            <motion.div initial={{opacity:0,y:56}} animate={{opacity:1,y:0}} transition={{duration:1,ease,delay:0.35}}
              className="relative max-w-5xl mx-auto">
              {/* ambient glow under panel */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-32 rounded-full bg-violet-400/20 blur-[60px] pointer-events-none" />
              <AirgapPanel />
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6,delay:0.7}}
            className="mt-16 sm:mt-20 border-y border-violet-100/60 bg-white/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 sm:divide-x sm:divide-violet-100">
              {[
                {v:'960M+', l:'Eligible Voters',       g:'from-violet-600 to-indigo-600'},
                {v:'4',     l:'Security Protocols',    g:'from-indigo-600 to-blue-600'},
                {v:'90s',   l:'QR Token Lifespan',     g:'from-green-500 to-emerald-600'},
                {v:'A=B=C', l:'Triple Reconciliation', g:'from-orange-500 to-pink-600'},
              ].map((s,i)=>(
                <motion.div key={i} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.8+i*0.08,duration:0.5,ease}} className="sm:px-8 first:pl-0">
                  <div className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-[-0.04em] font-mono bg-gradient-to-r ${s.g} bg-clip-text text-transparent mb-1`}>{s.v}</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium leading-tight">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            PROBLEM
        ══════════════════════════════════════════════════════════ */}
        <section id="problem" className="py-20 sm:py-32 lg:py-40 bg-page-alt relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <SectionTitle badge="The Problem" title={"Current EVMs\nhave six gaps."} subtitle="India's EVMs are battle-tested — but their monolithic architecture creates attack surfaces that undermine public trust. We close every one." />
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
                  <motion.div whileHover={{y:-5,scale:1.01}} transition={{duration:0.25,ease}} className={`glass rounded-3xl p-6 overflow-hidden group h-full flex flex-col border ${item.ring}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-black font-mono bg-gradient-to-r ${item.g} text-white`}>{item.n}</div>
                      <h3 className="text-sm font-bold text-slate-700">{item.title}</h3>
                    </div>
                    {item.diagram}
                    <p className="text-slate-500 text-xs leading-relaxed flex-1">{item.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SOLUTION — copy L + panel R
        ══════════════════════════════════════════════════════════ */}
        <section id="solution" className="py-20 sm:py-32 lg:py-40 relative overflow-hidden">
          {/* Background shape decorations — fully contained */}
          <div className="absolute top-8 right-8 pointer-events-none select-none opacity-70 hidden lg:block">
            <div className="relative w-48 h-48">
              <div style={{position:'absolute',top:0,right:0}}><Cube size={44} color="linear-gradient(135deg,#6366f1,#8b5cf6)" rotate={18} delay={0} /></div>
              <div style={{position:'absolute',top:52,right:52}}><Sphere size={28} color="linear-gradient(135deg,#f97316,#ec4899)" delay={0.5} /></div>
              <div style={{position:'absolute',top:8,right:62}}><Ring size={32} color="#a78bfa" delay={0.9} /></div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
              <FadeInLeft>
                <span className="eyebrow">The Architecture</span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1.05] sm:leading-[1.0] text-slate-900 mb-5 sm:mb-7">
                  Two nodes.<br /><span className="gradient-text-violet">Zero connection.</span>
                </h2>
                <p className="text-base sm:text-xl text-slate-500 leading-relaxed mb-8 sm:mb-10">
                  Node A handles identity online. Node B casts the ballot offline. The only channel between them is a beam of light carrying a signed QR code.
                </p>
                <ul className="space-y-3 mb-8 sm:mb-10">
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
        <section className="py-20 sm:py-32 lg:py-40 bg-page-alt relative overflow-hidden">
          {/* Background shape decorations — fully contained */}
          <div className="absolute bottom-8 left-8 pointer-events-none select-none opacity-70 hidden lg:block">
            <div className="relative w-44 h-44">
              <div style={{position:'absolute',bottom:0,left:0}}><Cube size={40} color="linear-gradient(135deg,#f97316,#ec4899)" rotate={-15} delay={0} /></div>
              <div style={{position:'absolute',bottom:48,left:48}}><Sphere size={26} color="linear-gradient(135deg,#8b5cf6,#6366f1)" delay={0.6} /></div>
              <div style={{position:'absolute',bottom:4,left:58}}><Ring size={30} color="#22c55e" delay={1} /></div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
              <FadeInLeft>
                <HashPanel />
              </FadeInLeft>
              <FadeInRight>
                <span className="eyebrow">Immutable Memory</span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1.05] sm:leading-[1.0] text-slate-900 mb-5 sm:mb-7">
                  Alter one bit.<br /><span className="gradient-text">Machine locks.</span>
                </h2>
                <p className="text-base sm:text-xl text-slate-500 leading-relaxed mb-8 sm:mb-10">
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
        <section id="protocols" className="py-20 sm:py-32 lg:py-40 relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <SectionTitle center badge="Hardware Security" title="Four protocols that make tampering physically impossible." subtitle="Every security layer operates at the hardware or physics level. Software exploits simply cannot reach them." />
            <div className="grid lg:grid-cols-[380px_1fr] gap-4 lg:gap-6">
              {/* tab list */}
              <div className="space-y-3">
                {protocols.map((p,i)=>(
                  <motion.button key={i} onClick={()=>setActiveProto(i)} whileTap={{scale:0.99}}
                    className={`w-full text-left p-5 rounded-3xl border transition-all duration-200 ${activeProto===i?'glass-solid border-violet-200/60 shadow-lg shadow-violet-100':'glass border-white/60 hover:border-violet-200/40'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.g} flex items-center justify-center shadow-lg ${p.shadow} shrink-0 transition-transform duration-200 ${activeProto===i?'scale-110':''}`}>
                        <p.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className={`text-[10px] font-black font-mono mb-0.5 transition-colors ${activeProto===i?'text-violet-500':'text-slate-300'}`}>{p.n}</div>
                        <div className={`font-bold text-sm transition-colors ${activeProto===i?'text-slate-900':'text-slate-600'}`}>{p.title}</div>
                        <div className={`text-xs transition-colors ${activeProto===i?'text-violet-500':'text-transparent'}`}>{p.sub}</div>
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
              <div className="relative min-h-[420px] sm:min-h-[520px] glass-solid rounded-3xl border border-violet-100/60 overflow-hidden diagram-panel">
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
        <section id="journey" className="py-20 sm:py-32 lg:py-40 bg-page-alt">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-start">
              <FadeInLeft className="lg:sticky lg:top-24">
                <span className="eyebrow">User Experience</span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1.05] sm:leading-[1.0] text-slate-900 mb-5 sm:mb-7">
                  Eight steps.<br /><span className="gradient-text-violet">One secure vote.</span>
                </h2>
                <p className="text-base sm:text-xl text-slate-500 leading-relaxed mb-6 sm:mb-8">
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
        <section className="py-20 sm:py-32 lg:py-40 relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
              <FadeInLeft><ReconcDiagram /></FadeInLeft>
              <FadeInRight>
                <span className="eyebrow">Mathematical Proof</span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1.05] sm:leading-[1.0] text-slate-900 mb-5 sm:mb-7">
                  Three counts.<br /><span className="gradient-text">One truth.</span>
                </h2>
                <p className="text-base sm:text-xl text-slate-500 leading-relaxed mb-8 sm:mb-10">
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
        <section className="py-20 sm:py-32 lg:py-40 bg-page-alt">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <SectionTitle badge="Security Analysis" title="Every attack vector. Neutralised." subtitle="Each known threat against current EVMs — and the exact Zero-Gap mechanism that defeats it." />
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
        <section id="roadmap" className="py-20 sm:py-32 lg:py-40 relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <SectionTitle badge="Implementation" title="Three phases to national deployment." subtitle="A pragmatic five-year pathway built on existing legal authority, manufacturing, and infrastructure." />
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
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
        <section className="py-20 sm:py-32 lg:py-40 bg-page-alt">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-start">
              <FadeInLeft>
                <span className="eyebrow">Investment</span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1.05] sm:leading-[1.0] text-slate-900 mb-5 sm:mb-7">
                  12–18% of one<br /><span className="gradient-text">election's cost.</span>
                </h2>
                <p className="text-base sm:text-xl text-slate-500 leading-relaxed mb-8 sm:mb-10">
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
        <section id="faq" className="py-20 sm:py-32 lg:py-40 relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-24">
              <FadeInLeft>
                <span className="eyebrow">FAQ</span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1.05] sm:leading-[1.0] text-slate-900 mb-4 sm:mb-6">Common<br />questions.</h2>
                <p className="text-base sm:text-lg text-slate-500 leading-relaxed">Everything the Election Commission, academics, and journalists have asked — answered directly.</p>
                <div className="mt-8 sm:mt-10 float-cluster-wrapper hidden sm:block">
                  <FloatCluster variant="a" />
                </div>
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
        <section className="py-24 sm:py-36 lg:py-48 relative overflow-hidden">
          {/* gradient blob bg */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full" style={{background:'radial-gradient(ellipse,rgba(139,92,246,0.15) 0%,rgba(99,102,241,0.08) 50%,transparent 70%)'}} />
          </div>
          <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
            <FadeIn>
              <span className="eyebrow">Ready for Review</span>
              <h2 className="text-3xl sm:text-6xl lg:text-7xl xl:text-[88px] font-black tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1.0] sm:leading-[0.92] text-slate-900 mb-6 sm:mb-8">
                India's elections<br />deserve this.
              </h2>
              <p className="text-base sm:text-xl lg:text-2xl text-slate-500 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed px-2">
                Open source. Peer-reviewable. Built on existing infrastructure. Designed to work within India's constitutional, electoral, and manufacturing frameworks.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0">
                <motion.a whileHover={{scale:1.04}} whileTap={{scale:0.97}} href={PDF} target="_blank" rel="noreferrer" className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto justify-center">
                  <FileText className="w-4 h-4" /> Read the Full PDF <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </motion.a>
                <motion.a whileHover={{scale:1.04}} whileTap={{scale:0.97}} href="mailto:contact@zerogapvoting.in" className="btn-outline text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto justify-center">
                  <Mail className="w-4 h-4" /> Contact for Review
                </motion.a>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-violet-100 py-10 sm:py-14 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-200">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-800">Zero<span className="gradient-text-violet">Gap</span> Voting</div>
              <div className="text-[10px] text-slate-400">by Roshan Kr Singh</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 border border-violet-100">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-indigo-400 shrink-0" />
              <span className="text-[10px] font-semibold text-violet-500 tracking-wide">Proposed to ECI · UIDAI · MeitY</span>
            </div>
            <span className="text-[10px] text-slate-300 tracking-wide">Non-partisan · Open for review</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={PDF} target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-violet-600 transition-colors flex items-center gap-1.5"><FileText className="w-3 h-3" /> PDF</a>
            <a href="mailto:contact@zerogapvoting.in" className="text-xs text-slate-400 hover:text-violet-600 transition-colors flex items-center gap-1.5"><Mail className="w-3 h-3" /> Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
