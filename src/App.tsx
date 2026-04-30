import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, ShieldAlert, WifiOff, HardDrive, Fingerprint, Cpu, CheckCircle2,
  Lock, ExternalLink, Printer, Database, Activity, FileText, Menu, X,
  Layers, ArrowRight, Globe, Users, Clock, Zap, Eye, ChevronDown,
  CreditCard, Server, MapPin, BarChart3, AlertTriangle, Key, Radio
} from 'lucide-react';
import {
  FadeIn, FadeInLeft, FadeInRight, ScaleIn, StaggerChildren, StaggerItem, GlassCard,
  SectionTitle, AnimatedCounter, ParticleBackground, GridBackground,
  GlowOrb, ProtocolVisual, QRCodePayload, HashChainVisual,
  ComparisonRow, TimelinePhase, StatBar, AccordionItem
} from './components';

const PdfLink = "https://www.slideshare.net/slideshow/zero-gap-voting-architecture-securing-india-s-electronic-voting-system/287278728?utm_source=clipboard_share_button&utm_campaign=slideshare_make_sharing_viral_v2&utm_variation=control&utm_medium=share";

export default function App() {
  const [activeProtocol, setActiveProtocol] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Vulnerabilities', id: 'problem' },
    { label: 'Architecture', id: 'solution' },
    { label: 'Protocols', id: 'protocols' },
    { label: 'Journey', id: 'journey' },
    { label: 'Roadmap', id: 'roadmap' },
  ];

  const protocols = [
    { title: "Optical Airgap", subtitle: "Severing the Wire", icon: WifiOff, desc: "No cables. No Bluetooth. No WiFi. No RF signals of any kind. The only information that travels between Node A and Node B is light — photons captured by a dedicated optical scanner reading a time-signed QR code.", color: "bg-kesari-500/10 border-kesari-500/20", iconBg: "bg-kesari-500/20", iconColor: "text-kesari-400", accent: "text-kesari-400" },
    { title: "Hash Chain Ledger", subtitle: "Immutable Memory", icon: Database, desc: "Every vote record is chained to the previous using SHA-256 hashing. Altering even a single bit anywhere in history breaks the entire chain, instantly detectable on next boot, permanently locking the machine.", color: "bg-orange-500/10 border-orange-500/20", iconBg: "bg-orange-500/20", iconColor: "text-orange-400", accent: "text-orange-400" },
    { title: "Hardware Watchdog", subtitle: "Guaranteed Recovery", icon: Activity, desc: "An independent microcontroller monitors the main software every 10ms via hardware ping. If the ping stops for any reason — crash, freeze, or tampering — it physically cuts power and forces a cold reboot in under 30ms.", color: "bg-india-green-500/10 border-india-green-500/20", iconBg: "bg-india-green-500/20", iconColor: "text-india-green-400", accent: "text-india-green-400" },
    { title: "VVPAT Proof Layer", subtitle: "Physical Ground Truth", icon: Printer, desc: "Before any vote is committed to digital memory, a paper slip is printed showing the voter's choice. The slip is displayed for 5 seconds behind glass, then deposited into a sealed ballot box. Paper is the legally binding record.", color: "bg-ashoka-500/10 border-ashoka-500/20", iconBg: "bg-ashoka-500/20", iconColor: "text-ashoka-400", accent: "text-ashoka-400" }
  ];

  const faqs = [
    { q: "Can digital systems always be hacked?", a: "The Zero-Gap architecture agrees — which is why security does not rely on software integrity alone. The physical airgap, hardware watchdog, and paper VVPAT mean even a fully compromised software stack cannot alter election outcomes without physically detectable evidence. We anchor trust in physics and mathematics, not code." },
    { q: "What if biometric authentication fails for rural or elderly voters?", a: "Dual-biometric redundancy: fingerprint is primary, but near-infrared iris scanning serves as automatic fallback — the same system used by Aadhaar across 1.4 billion enrollees. Iris specifically addresses worn fingerprints common among agricultural and manual-labour voters." },
    { q: "Who controls the QR signing keys?", a: "Keys are managed exclusively by the Election Commission of India under the same constitutional protections as current EVM firmware. A multi-party key ceremony ensures no single actor — individual or organization — can generate or compromise signing keys." },
    { q: "What if Node A loses server connectivity at a rural booth?", a: "Node A needs only a momentary exchange — comparable to a UPI transaction. An offline queue mode buffers authentication requests during connectivity interruptions. The voter receives their QR code once connectivity is briefly restored, with zero impact on Node B's operation." },
    { q: "Is this too complex and expensive to deploy?", a: "Node A uses the same hardware as Aadhaar e-KYC terminals already manufactured by BEL. Node B uses the same microcontroller architecture as current EVMs. VVPAT is already Supreme Court-mandated. This is tighter integration of existing components, not entirely new hardware." },
    { q: "How does this prevent cross-constituency voting?", a: "Node B's PROM chip is pre-flashed with only the authorized voter ID list for that specific constituency. If a voter's hashed ID from Node A is not found in Node B's read-only PROM, the QR code is cryptographically rejected — the machine simply will not unlock." },
  ];

  const globalPrecedents = [
    { country: "Estonia", year: "2005", feature: "NFC chip voter ID cards for national elections", parallel: "Section 5 Smart Card", status: "Active", flag: "\ud83c\uddea\ud83c\uddea" },
    { country: "Brazil", year: "2008", feature: "Biometric fingerprint authentication for 156M voters", parallel: "Node A Biometric Auth", status: "Active", flag: "\ud83c\udde7\ud83c\uddf7" },
    { country: "Philippines", year: "2010", feature: "Paper ballot as primary legal record, digital as derived", parallel: "VVPAT Ground Truth", status: "Active", flag: "\ud83c\uddf5\ud83c\udded" },
    { country: "Netherlands", year: "2008", feature: "Scraped e-voting after RF signal leak vulnerability", parallel: "Validates Airgap Design", status: "Cautionary", flag: "\ud83c\uddf3\ud83c\uddf1" },
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-slate-200 relative">

      {/* Hidden SEO meta content */}
      <span className="sr-only">Zero-Gap Voting Architecture by Roshan Kr Singh (roshhellwett) — An open-source technical blueprint for secure electronic voting in India. Proposed to the Election Commission of India, UIDAI, and MeitY. Contact: roshhellwett@icloud.com | GitHub: github.com/roshhellwett</span>

      {/* Background Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <GridBackground />
        <GlowOrb className="w-[600px] h-[600px] bg-kesari-600/5 top-[-200px] left-[-200px]" />
        <GlowOrb className="w-[800px] h-[800px] bg-ashoka-600/5 top-[30%] right-[-300px]" />
        <GlowOrb className="w-[600px] h-[600px] bg-india-green-600/5 bottom-[-100px] left-[20%]" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-dark-950/90 backdrop-blur-xl border-b border-dark-800/50 shadow-lg shadow-dark-950/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <motion.div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-kesari-500 to-kesari-700 flex items-center justify-center shadow-lg shadow-kesari-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-black text-base text-white leading-none">ZeroGap</span>
              <span className="hidden sm:block text-[9px] text-slate-500 font-bold leading-none mt-0.5">VOTING ARCHITECTURE</span>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white transition-all duration-300 rounded-lg hover:bg-dark-800/50 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-kesari-500">
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={PdfLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-kesari-500 to-kesari-600 text-white font-semibold text-sm shadow-lg shadow-kesari-500/20 hover:shadow-kesari-500/40 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-kesari-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950">
              <FileText className="w-4 h-4" />
              PDF Report
            </motion.a>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-dark-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-kesari-500" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-dark-950/95 backdrop-blur-xl border-b border-dark-800/50 overflow-hidden"
            >
              <div className="flex flex-col p-4 sm:p-6 gap-2">
                {navItems.map(item => (
                  <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left py-3 px-4 rounded-xl text-slate-300 font-semibold hover:bg-dark-800/50 hover:text-white hover:translate-x-1 transition-all duration-300">
                    {item.label}
                  </button>
                ))}
                <a href={PdfLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 mt-2 rounded-xl bg-gradient-to-r from-kesari-500 to-kesari-600 text-white font-semibold hover:shadow-lg hover:shadow-kesari-500/30 transition-all duration-300">
                  <FileText className="w-5 h-5" /> Read PDF Report
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10">

        {/* ==================== HERO SECTION ==================== */}
        <section id="hero" className="min-h-screen flex items-center justify-center pt-16 relative">
          <ParticleBackground />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative py-20 sm:py-24">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] opacity-[0.02] animate-rotate-slow pointer-events-none">
              <svg viewBox="0 0 500 500" fill="none" stroke="white" strokeWidth="1">
                <circle cx="250" cy="250" r="200" strokeDasharray="8 4" />
                <circle cx="250" cy="250" r="150" strokeDasharray="4 8" />
                <circle cx="250" cy="250" r="100" />
              </svg>
            </div>

            <ScaleIn>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass text-kesari-400 text-sm font-bold tracking-wider uppercase mb-8">
                <div className="w-2 h-2 rounded-full bg-kesari-500 animate-pulse" />
                An Open Technical Blueprint
              </div>
            </ScaleIn>

            <FadeIn delay={0.15}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-6 sm:mb-8 leading-[1.05]">
                <span className="text-white">The </span>
                <span className="gradient-text">Zero-Gap</span>
                <br />
                <span className="text-white">Voting</span>
                <span className="text-slate-500"> Architecture</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base sm:text-lg md:text-xl text-slate-400 font-medium mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed px-4">
                Making electronic vote manipulation not merely difficult — but <span className="text-white font-bold">physically and mathematically impossible</span>.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="text-sm md:text-base text-slate-500 font-medium mb-8 sm:mb-12 max-w-2xl mx-auto">
                A dual-node, cryptographically secured system for India&apos;s 960 million voters.
                Optical airgap. Immutable hash chains. Hardware watchdogs. Triple reconciliation.
              </p>
            </FadeIn>

            <FadeIn delay={0.45} className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => scrollTo('solution')} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-kesari-500 to-kesari-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-kesari-500/25 hover:shadow-kesari-500/40 transition-shadow flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-kesari-500">
                See How It Works <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={PdfLink} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 glass text-white rounded-2xl font-bold text-lg hover:bg-dark-800/50 transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-kesari-500">
                <FileText className="w-5 h-5 text-kesari-400" /> Download Full Report
              </motion.a>
            </FadeIn>

            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest hidden sm:block">Scroll to explore</span>
              <ChevronDown className="w-5 h-5 text-slate-600" />
            </motion.div>
          </div>
        </section>

        {/* ==================== STATS BAR ==================== */}
        <section className="py-12 sm:py-16 border-y border-dark-800/50 bg-dark-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: Users, value: 960, suffix: "M+", label: "Eligible Voters", color: "text-kesari-400" },
                { icon: Shield, value: 4, suffix: "", label: "Security Protocols", color: "text-ashoka-400" },
                { icon: Zap, value: 90, suffix: "s", label: "QR Token Validity", color: "text-india-green-400" },
                { icon: Lock, value: 3, suffix: "", label: "Independent Tallies", color: "text-purple-400" },
              ].map((stat, i) => (
                <StaggerItem key={i} className="text-center">
                  <stat.icon className={`w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 ${stat.color}`} />
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-500">{stat.label}</div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* ==================== PROBLEM SECTION ==================== */}
        <section id="problem" className="py-20 sm:py-24 lg:py-32 relative">
          <GlowOrb className="w-[400px] h-[400px] bg-red-600/5 top-20 right-[-100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              badge="The Problem"
              title="Why the Current System Has Gaps"
              subtitle="India's EVMs are a proven platform, but their monolithic design creates attack surfaces that undermine public trust. These are the six critical vulnerabilities we must address."
            />

            <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
              {[
                { icon: ShieldAlert, title: "Monolithic Machine", desc: "Identity validation, ballot casting, and vote storage all handled within one physical unit. A compromised machine compromises all three functions simultaneously.", color: "from-red-500/10 to-red-600/5 border-red-500/20", iconBg: "bg-red-500/20", iconColor: "text-red-400" },
                { icon: WifiOff, title: "Signal Interception", desc: "Digital signals between validation and voting units create a man-in-the-middle attack vector. Wires and wireless connections can be intercepted, spoofed, or replayed by anyone with physical booth access.", color: "from-orange-500/10 to-orange-600/5 border-orange-500/20", iconBg: "bg-orange-500/20", iconColor: "text-orange-400" },
                { icon: HardDrive, title: "Flat Memory Storage", desc: "Traditional EEPROM uses a flat, unprotected write structure. A skilled technician with physical access during transport can theoretically overwrite voting history records without detection.", color: "from-yellow-500/10 to-yellow-600/5 border-yellow-500/20", iconBg: "bg-yellow-500/20", iconColor: "text-yellow-400" },
                { icon: Eye, title: "GUI Black Box", desc: "Replacing physical buttons with a touchscreen GUI means voters cannot independently verify that their tap registered the correct candidate. The OS layer becomes a trust vulnerability.", color: "from-ashoka-500/10 to-ashoka-600/5 border-ashoka-500/20", iconBg: "bg-ashoka-500/20", iconColor: "text-ashoka-400" },
                { icon: Users, title: "Multiple Voting", desc: "Without a real-time, tamper-proof ledger, preventing the same voter from casting ballots across different booths or constituencies depends on paper records and human vigilance alone.", color: "from-purple-500/10 to-purple-600/5 border-purple-500/20", iconBg: "bg-purple-500/20", iconColor: "text-purple-400" },
                { icon: Clock, title: "Incomplete Transactions", desc: "A system crash mid-vote creates an ambiguous state. Did the vote register? Was it double-counted? The current architecture has no hardware-level guarantee of clean state recovery.", color: "from-india-green-500/10 to-india-green-600/5 border-india-green-500/20", iconBg: "bg-india-green-500/20", iconColor: "text-india-green-400" },
              ].map((item, i) => (
                <StaggerItem key={i} className="h-full flex flex-col">
                  <GlassCard className="h-full group hover:border-opacity-40">
                    <div className={`w-14 h-14 rounded-xl ${item.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-black text-white mb-3">{item.title}</h3>
                    <p className="text-slate-400 font-medium text-sm leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* ==================== DUAL-NODE ARCHITECTURE ==================== */}
        <section id="solution" className="py-20 sm:py-24 lg:py-32 relative bg-dark-900/20">
          <GlowOrb className="w-[500px] h-[500px] bg-ashoka-600/5 bottom-0 left-[-200px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              badge="The Paradigm Shift"
              title="The Dual-Node Architecture"
              subtitle="A strictly segregated system where absolutely NO electronic signal passes between the identity terminal and the ballot machine. Only light crosses the gap."
            />

            <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 relative">
              <FadeInLeft className="flex-1 h-full flex flex-col">
                <GlassCard className="h-full border-ashoka-500/20 hover:border-ashoka-500/40">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-ashoka-500/20 to-ashoka-600/10 border border-ashoka-500/20"><Fingerprint className="text-ashoka-400 w-8 h-8" /></div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-black text-white">Node A</h3>
                      <p className="text-ashoka-400 text-sm font-bold uppercase tracking-wider">Online Identity Terminal</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">The voter&apos;s first point of contact. Operated exclusively by an election official. The ONLY component connected to any external network.</p>
                  <ul className="space-y-3">
                    {[
                      { text: "Aadhaar Biometric Fingerprint Scan", detail: "ISO/IEC 19794-2 compliant" },
                      { text: "Near-Infrared Iris Fallback", detail: "ISO/IEC 19794-6 compliant" },
                      { text: "NFC Smart Card Reader (EMV chip)", detail: "ISO/IEC 14443 contactless" },
                      { text: "Generates Time-Signed QR Token", detail: "RSA-4096 / Ed25519, 90s TTL" },
                      { text: "TLS 1.3 Encrypted Server Link", detail: "National voter auth database" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-dark-800/40 border border-dark-700/30">
                        <CheckCircle2 className="w-5 h-5 text-ashoka-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm font-bold text-slate-200">{item.text}</div>
                          <div className="text-xs text-slate-500 code-text">{item.detail}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </FadeInLeft>

              <FadeIn delay={0.15} className="hidden lg:flex flex-col items-center justify-center gap-4 px-4 min-w-[180px]">
                <div className="w-px h-24 bg-gradient-to-b from-transparent via-dark-700 to-transparent" />
                <div className="relative">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="w-20 h-20 rounded-full border-2 border-dashed border-kesari-500/20 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-kesari-500/10 to-kesari-600/5 border border-kesari-500/20 flex items-center justify-center"><WifiOff className="w-6 h-6 text-kesari-400" /></div>
                  </motion.div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs font-black text-kesari-400 bg-dark-950 px-3 py-1 rounded-full border border-kesari-500/20">OPTICAL AIRGAP</span>
                  </div>
                </div>
                <div className="w-px h-24 bg-gradient-to-b from-transparent via-dark-700 to-transparent" />
              </FadeIn>

              <FadeInRight className="flex-1 h-full flex flex-col">
                <GlassCard className="h-full border-kesari-500/20 hover:border-kesari-500/40">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-kesari-500/20 to-kesari-600/10 border border-kesari-500/20"><Cpu className="text-kesari-400 w-8 h-8" /></div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-black text-white">Node B</h3>
                      <p className="text-kesari-400 text-sm font-bold uppercase tracking-wider">Offline Airgapped EVM</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">The ballot casting machine. Zero network capability. No Wi-Fi chip, no Bluetooth module, no physical network port. Its only input: an optical QR scanner.</p>
                  <ul className="space-y-3">
                    {[
                      { text: "Hardware Optical QR Scanner", detail: "Read-only sensor, no USB port" },
                      { text: "10\" Capacitive Touchscreen", detail: "High-contrast candidate display" },
                      { text: "PROM Read-Only Voter List", detail: "Pre-flashed per constituency" },
                      { text: "EEPROM Hash Chain Ledger", detail: "Cryptographic immutability" },
                      { text: "Integrated VVPAT Printer", detail: "Behind glass verification pane" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-dark-800/40 border border-dark-700/30">
                        <CheckCircle2 className="w-5 h-5 text-kesari-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm font-bold text-slate-200">{item.text}</div>
                          <div className="text-xs text-slate-500 code-text">{item.detail}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* ==================== QR CODE PAYLOAD ==================== */}
        <section className="py-20 sm:py-24 lg:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <FadeInLeft>
                <div className="max-readable">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-kesari-400 text-sm font-bold tracking-wider uppercase mb-6">
                    <Key className="w-4 h-4" /> Cryptographic Payload
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                    The QR Code That<br /><span className="gradient-text">Crosses the Gap</span>
                  </h2>
                  <p className="text-base sm:text-lg text-slate-400 font-medium mb-6 sm:mb-8 leading-relaxed">
                    Node A generates a time-sensitive, cryptographically signed QR token. Node B verifies the signature using a public key burned into its read-only firmware — all offline, all in milliseconds.
                  </p>
                  <div className="space-y-4">
                    {[
                      { icon: Clock, text: "90-second time-to-live — expires automatically", color: "text-kesari-400" },
                      { icon: Zap, text: "Single-use nonce prevents replay attacks", color: "text-ashoka-400" },
                      { icon: Lock, text: "RSA-4096 / Ed25519 signature by ECI", color: "text-india-green-400" },
                      { icon: MapPin, text: "Constituency code ties voter to specific booth", color: "text-purple-400" },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 group hover:text-kesari-400 transition-colors">
                        <item.icon className={`w-5 h-5 ${item.color} shrink-0 group-hover:scale-110 transition-transform`} />
                        <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeInLeft>
              <FadeInRight><QRCodePayload /></FadeInRight>
            </div>
          </div>
        </section>

        {/* ==================== PROTOCOLS SECTION ==================== */}
        <section id="protocols" className="py-20 sm:py-24 lg:py-32 relative bg-dark-900/20">
          <GlowOrb className="w-[500px] h-[500px] bg-kesari-600/5 top-0 left-[30%]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              badge="Hardware Security"
              title="Four Interference-Proof Protocols"
              subtitle="Each protocol operates at the hardware or physical layer — making software-only attacks completely irrelevant. Select a protocol to explore."
            />

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              <div className="w-full lg:w-5/12 space-y-3">
                {protocols.map((p, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setActiveProtocol(idx)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 ${activeProtocol === idx ? `glass border ${p.color} shadow-lg` : 'bg-dark-800/30 border border-dark-700/30 hover:bg-dark-800/50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${p.iconBg} flex items-center justify-center ${activeProtocol === idx ? 'scale-110' : ''} transition-transform`}>
                        <p.icon className={`w-6 h-6 ${p.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-black text-lg truncate ${activeProtocol === idx ? 'text-white' : 'text-slate-400'}`}>{p.title}</h3>
                        <p className={`text-xs font-bold ${p.accent} ${activeProtocol === idx ? 'opacity-100' : 'opacity-0'} transition-opacity`}>{p.subtitle}</p>
                      </div>
                      <ArrowRight className={`w-5 h-5 ${activeProtocol === idx ? p.iconColor : 'text-slate-700'} transition-colors shrink-0`} />
                    </div>
                    {activeProtocol === idx && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-sm text-slate-400 leading-relaxed mt-4 pt-4 border-t border-white/5">
                        {p.desc}
                      </motion.p>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="w-full lg:w-7/12">
                <GlassCard className="h-full min-h-[380px] sm:min-h-[420px] flex items-center justify-center" hover={false}>
                  <AnimatePresence mode="wait">
                    <motion.div key={activeProtocol} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="w-full">
                      <ProtocolVisual type={activeProtocol} />
                    </motion.div>
                  </AnimatePresence>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

         {/* ==================== HASH CHAIN SECTION ==================== */}
         <section className="py-20 sm:py-24 lg:py-32 relative">
           <div className="max-w-7xl mx-auto px-4 sm:px-6">
             <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
               <FadeInLeft><HashChainVisual /></FadeInLeft>
               <FadeInRight>
                 <div className="max-readable">
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-orange-400 text-sm font-bold tracking-wider uppercase mb-6">
                     <Database className="w-4 h-4" /> Immutable Memory
                   </div>
                   <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                     The Hash Chain<br /><span className="text-orange-400">Cannot Be Broken</span>
                   </h2>
                   <p className="text-base sm:text-lg text-slate-400 font-medium mb-6 leading-relaxed">
                     The EEPROM ledger uses the same mathematical principle as blockchain technology — implemented at hardware level in firmware C/C++. Every vote entry contains the hash of its predecessor.
                   </p>
                   <div className="space-y-4">
                     {[
                       { step: "01", text: "Vote is cast and encrypted" },
                       { step: "02", text: "SHA-256 hash of vote is computed" },
                       { step: "03", text: "Previous entry's hash is linked" },
                       { step: "04", text: "Combined hash stored as new entry" },
                     ].map((item, i) => (
                       <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 p-3 rounded-xl bg-dark-800/40 border border-dark-700/30 hover:border-orange-500/30 hover:bg-dark-800/60 transition-all duration-300 group">
                         <span className="text-sm font-black code-text text-orange-400 group-hover:scale-110 transition-transform">{item.step}</span>
                         <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{item.text}</span>
                       </motion.div>
                     ))}
                   </div>
                 </div>
               </FadeInRight>
             </div>
           </div>
         </section>

        {/* ==================== VOTER JOURNEY ==================== */}
        <section id="journey" className="py-20 sm:py-24 lg:py-32 relative bg-dark-900/20">
          <GlowOrb className="w-[500px] h-[500px] bg-india-green-600/5 bottom-0 right-[-100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              badge="User Experience"
              title="The Voter's Journey"
              subtitle="Eight frictionless steps from arrival to completed vote. Every stage is cryptographically verified, physically witnessed, and immutably recorded."
            />

            <div className="max-w-4xl mx-auto space-y-4">
              {[
                { step: "01", title: "Arrival & Smart Card Tap", desc: "The voter approaches Node A and taps their NFC Voter ID smart card on the terminal. Node A pre-fetches the voter's enrolment record from the national database.", color: "from-ashoka-500 to-ashoka-600", icon: CreditCard },
                { step: "02", title: "Biometric Authentication", desc: "Fingerprint scan is performed against the national database. If confidence falls below threshold, near-infrared iris scanning activates automatically as fallback.", color: "from-ashoka-500 to-ashoka-700", icon: Fingerprint },
                { step: "03", title: "Server Validation", desc: "The national voter authentication server confirms this voter has not already voted in this election cycle. Cross-constituency duplication is checked in real time.", color: "from-ashoka-600 to-ashoka-800", icon: Server },
                { step: "04", title: "QR Token Generation", desc: "Node A generates a time-signed, RSA-4096 encrypted QR code valid for exactly 90 seconds. The token contains the voter's hashed ID, constituency code, timestamp, and single-use nonce.", color: "from-kesari-500 to-kesari-600", icon: Zap },
                { step: "05", title: "Airgap Crossing", desc: "The voter physically walks from Node A into the voting booth and presents the QR code to Node B's optical scanner. No wire, no signal, no network — only light crosses the gap.", color: "from-kesari-500 to-orange-600", icon: WifiOff },
                { step: "06", title: "Offline Verification", desc: "Node B verifies the QR signature against its burned-in public key, checks the voter ID against its read-only PROM chip, and validates the timestamp and nonce — all completely offline.", color: "from-kesari-600 to-orange-700", icon: Lock },
                { step: "07", title: "Ballot Casting & VVPAT", desc: "The voter selects their candidate on the touchscreen. A paper slip is printed showing their choice, displayed behind glass for 5 seconds, then deposited into the sealed ballot box.", color: "from-india-green-500 to-india-green-600", icon: Printer },
                { step: "08", title: "Hash Chain Commit", desc: "Only after the physical paper is secured does the software commit the vote to the EEPROM hash chain. The machine returns to idle, ready for the next voter.", color: "from-india-green-600 to-india-green-700", icon: CheckCircle2 },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <motion.div whileHover={{ x: 8, transition: { duration: 0.3, ease: "easeInOut" } }} className="flex items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-dark-800/30 border border-dark-700/30 hover:border-dark-600/50 hover:bg-dark-800/50 transition-all duration-300 group">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                      <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm font-black code-text text-slate-600 group-hover:text-slate-500 transition-colors">STEP {s.step}</span>
                        <h4 className="text-base sm:text-lg font-black text-white group-hover:text-kesari-400 transition-colors">{s.title}</h4>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{s.desc}</p>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== TRIPLE RECONCILIATION ==================== */}
        <section className="py-20 sm:py-24 lg:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              badge="Mathematical Proof"
              title="Triple Reconciliation: A = B = C"
              subtitle="Before any election result is declared valid, three completely independent datasets must align perfectly. If any layer diverges, the exact point of interference is identified."
            />

            <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-12 items-stretch">
              {[
                { title: "Node A Server Log", desc: "Total authenticated voters who received QR codes from the national database.", label: "TOTAL A", icon: Server, color: "from-ashoka-500 to-ashoka-700", glow: "glow-blue" },
                { title: "Node B EEPROM Ledger", desc: "Total votes digitally committed to the cryptographic hash chain on the offline machine.", label: "TOTAL B", icon: Database, color: "from-kesari-500 to-kesari-700", glow: "glow-orange" },
                { title: "VVPAT Ballot Box", desc: "Total physical paper slips deposited in the sealed, tamper-evident ballot box.", label: "TOTAL C", icon: Printer, color: "from-india-green-500 to-india-green-700", glow: "glow-green" },
              ].map((col, i) => (
                <FadeIn key={i} delay={i * 0.15} className="h-full flex flex-col">
                  <GlassCard className={`h-full text-center ${col.glow} hover:scale-[1.02] hover:border-opacity-50`}>
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${col.color} flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg`}>
                      <col.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white mb-2 sm:mb-3">{col.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6 leading-relaxed">{col.desc}</p>
                    <div className={`text-3xl sm:text-4xl font-black code-text bg-gradient-to-r ${col.color} bg-clip-text text-transparent`}>{col.label}</div>
                  </GlassCard>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.5}>
              <div className="max-w-3xl mx-auto">
                <GlassCard className="text-center" hover={false}>
                  <Layers className="w-10 h-10 text-slate-600 mx-auto mb-4" />
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black code-text text-white mb-4">
                    A <span className="text-kesari-400">=</span> B <span className="text-kesari-400">=</span> C
                  </div>
                  <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
                    If all three match &rarr; Result declared valid and published.<br />
                    If any two disagree &rarr; System logs identify exact divergence &rarr; Targeted investigation triggered.
                  </p>
                </GlassCard>
              </div>
            </FadeIn>
          </div>
        </section>

         {/* ==================== THREAT ANALYSIS TABLE ==================== */}
         <section className="py-20 sm:py-24 lg:py-32 relative bg-dark-900/20">
           <div className="max-w-7xl mx-auto px-4 sm:px-6">
             <SectionTitle
               badge="Security Analysis"
               title="Threat Vector Comparison"
               subtitle="Every known attack vector against the current EVM system — and exactly how Zero-Gap's architecture neutralizes it."
             />

             <FadeIn>
               <div className="overflow-x-auto rounded-2xl">
                 <div className="glass-card rounded-2xl overflow-hidden min-w-[640px] hover:border-dark-600/50 transition-all duration-300">
                   <table className="w-full">
                     <thead>
                       <tr className="border-b border-dark-700/50 bg-dark-800/50">
                         <th className="p-4 text-left text-xs sm:text-sm font-black text-slate-300 uppercase tracking-wider w-1/4">Threat Vector</th>
                         <th className="p-4 text-left text-xs sm:text-sm font-black text-red-400 uppercase tracking-wider w-1/4">Current EVM</th>
                         <th className="p-4 text-left text-xs sm:text-sm font-black text-india-green-400 uppercase tracking-wider w-1/2">Zero-Gap Defence</th>
                       </tr>
                     </thead>
                     <tbody>
                       <ComparisonRow feature="Remote Network Attack" current="Possible if networked" zerogap="Node B has no radio hardware — physically incapable" delay={0} />
                       <ComparisonRow feature="Signal Interception" current="Wire/wireless can be replayed" zerogap="No signal exists — optical QR + nonce prevents replay" delay={0.05} />
                       <ComparisonRow feature="Memory Tampering" current="Flat EEPROM can be overwritten" zerogap="Hash chain — alteration breaks chain, locks machine" delay={0.1} />
                       <ComparisonRow feature="Multiple Voting" current="Paper ledger + human vigilance" zerogap="Real-time DB check + PROM chip + hash chain" delay={0.15} />
                       <ComparisonRow feature="Cross-Constituency Voting" current="Manual boundary enforcement" zerogap="Voter ID not in PROM chip = cryptographic rejection" delay={0.2} />
                       <ComparisonRow feature="GUI Vote Manipulation" current="Theoretical OS vulnerability" zerogap="VVPAT prints before digital commit — paper is authority" delay={0.25} />
                       <ComparisonRow feature="System Crash Mid-Vote" current="Ambiguous incomplete state" zerogap="HWT purges RAM, cold reboots &lt;30ms — no corrupt state" delay={0.3} />
                       <ComparisonRow feature="Forged QR Code" current="N/A" zerogap="RSA-4096/Ed25519 impossible without ECI private key" delay={0.35} />
                       <ComparisonRow feature="QR Replay Attack" current="N/A" zerogap="Single-use nonce — second scan rejected at verification" delay={0.4} />
                       <ComparisonRow feature="Physical Machine Theft" current="Vote data accessible" zerogap="Hash chain check on boot — broken chain locks machine" delay={0.45} />
                     </tbody>
                   </table>
                 </div>
               </div>
             </FadeIn>
           </div>
         </section>

        {/* ==================== SMART CARD SECTION ==================== */}
        <section className="py-20 sm:py-24 lg:py-32 relative">
          <GlowOrb className="w-[400px] h-[400px] bg-ashoka-600/5 top-20 left-[-100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <FadeInLeft>
                <div className="max-readable">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-ashoka-400 text-sm font-bold tracking-wider uppercase mb-6">
                    <CreditCard className="w-4 h-4" /> Voter ID Smart Card
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                    Chipped EPIC Card<br /><span className="gradient-text-blue">Faster Authentication</span>
                  </h2>
                  <p className="text-base sm:text-lg text-slate-400 font-medium mb-6 leading-relaxed">
                    Upgrade the current Voter ID (EPIC) card to an EMV-compliant smart card — the same technology already deployed across India's banking system via RuPay and Aadhaar ecosystem.
                  </p>
                  <div className="space-y-3">
                    {[
                      { title: "EMV Secure Element", desc: "Same chip standard as Indian bank cards. Self-destructs data if physically opened." },
                      { title: "NFC Contactless + Contact", desc: "ISO/IEC 14443 contactless tap + ISO/IEC 7816 contact interface for redundancy." },
                      { title: "Encrypted Data Only", desc: "Stores hashed Voter ID, constituency code, biometric reference — never raw biometrics." },
                      { title: "5-Second Auth", desc: "Reduces authentication from 15-20 seconds to under 5 seconds via pre-fetch." },
                      { title: "Backward Compatible", desc: "Carries existing EPIC barcode for legacy system compatibility during transition." },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-4 rounded-xl bg-dark-800/40 border border-dark-700/30 hover:border-dark-600/50 hover:bg-dark-800/60 transition-all duration-300 cursor-default group">
                        <div className="text-sm font-bold text-white mb-1 group-hover:text-ashoka-400 transition-colors">{item.title}</div>
                        <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{item.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeInLeft>

              <FadeInRight>
                <div className="flex items-center justify-center" style={{ perspective: '1000px' }}>
                  <motion.div
                    whileHover={{ rotateY: 15, rotateX: 5 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative w-72 sm:w-80 h-44 sm:h-52 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700/50 p-5 sm:p-6 shadow-2xl"
                  >
                    <div className="w-10 h-8 sm:w-12 sm:h-9 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 mb-3 sm:mb-4 flex items-center justify-center">
                      <div className="w-7 h-5 sm:w-8 sm:h-6 rounded border border-yellow-700/30" />
                    </div>
                    <div className="text-base sm:text-lg font-black text-white mb-0.5 sm:mb-1">VOTER ID CARD</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 code-text mb-3 sm:mb-4">EPIC &bull; EMV COMPLIANT</div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-[10px] text-slate-500 mb-0.5">ELECTOR</div>
                        <div className="text-xs sm:text-sm font-bold text-slate-300">ROSHAN KUMAR SINGH</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 mb-0.5">CONSTITUENCY</div>
                        <div className="text-xs sm:text-sm font-bold text-kesari-400 code-text">MH-2847</div>
                      </div>
                    </div>
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-1"><Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ashoka-400/50" /></div>
                  </motion.div>
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>

         {/* ==================== COST BREAKDOWN ==================== */}
         <section className="py-20 sm:py-24 lg:py-32 relative bg-dark-900/20">
           <div className="max-w-7xl mx-auto px-4 sm:px-6">
             <SectionTitle
               badge="Investment"
               title="Cost & Feasibility"
               subtitle="A one-time investment of Rs. 14,750–21,150 crore — approximately 12-18% of a single general election's economic footprint. Serves every election thereafter."
             />

             <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
               <FadeInLeft className="h-full flex flex-col">
                 <GlassCard hover={false} className="h-full">
                  <h3 className="text-lg sm:text-xl font-black text-white mb-6 sm:mb-8 flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-kesari-400" /> Hardware Cost Breakdown
                  </h3>
                  <div className="space-y-5 sm:space-y-6">
                    <StatBar label="Node A (Auth Terminal)" amount="3,150–4,200 Cr" total="21,150" color="text-ashoka-400" delay={0} />
                    <StatBar label="Node B (Upgraded EVM)" amount="3,675–5,250 Cr" total="21,150" color="text-kesari-400" delay={0.1} />
                    <StatBar label="Voter ID Smart Cards" amount="7,125–9,500 Cr" total="21,150" color="text-india-green-400" delay={0.2} />
                    <StatBar label="Server Infrastructure" amount="500–1,500 Cr" total="21,150" color="text-purple-400" delay={0.3} />
                    <StatBar label="Training & Logistics" amount="300–700 Cr" total="21,150" color="text-yellow-400" delay={0.4} />
                  </div>
                  <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-dark-700/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-sm font-bold text-slate-400">TOTAL ONE-TIME</span>
                      <span className="text-xl sm:text-2xl font-black code-text gradient-text">Rs. 14,750–21,150 Cr</span>
                    </div>
                  </div>
                </GlassCard>
              </FadeInLeft>

              <FadeInRight className="h-full flex flex-col">
                <div className="space-y-6 h-full">
                  <GlassCard>
                    <h3 className="text-lg sm:text-xl font-black text-white mb-3 sm:mb-4 flex items-center gap-3">
                      <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-ashoka-400" /> Manufacturing Readiness
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">No new manufacturing capability is needed. Every component uses existing Indian production lines.</p>
                    <div className="space-y-3">
                      {[
                        { text: "Node A = Aadhaar e-KYC terminal (BEL already makes it)" },
                        { text: "Node B = same microcontroller as current EVMs" },
                        { text: "Smart Card = same EMV lines as RuPay cards" },
                        { text: "VVPAT = already Supreme Court mandated" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors duration-300">
                          <CheckCircle2 className="w-4 h-4 text-india-green-400 shrink-0 group-hover:text-india-green-300 transition-colors" /> {item.text}
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  <GlassCard>
                    <h3 className="text-lg sm:text-xl font-black text-white mb-3 sm:mb-4 flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" /> Context
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      India's 2024 General Election total economic impact exceeded Rs. 1.2 lakh crore.
                      Zero-Gap represents a one-time investment of just <span className="text-white font-bold">12-18%</span> of a single election's economic footprint —
                      deployed once, serving every future election with only incremental maintenance costs.
                    </p>
                  </GlassCard>
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* ==================== IMPLEMENTATION ROADMAP ==================== */}
        <section id="roadmap" className="py-20 sm:py-24 lg:py-32 relative">
          <GlowOrb className="w-[500px] h-[500px] bg-india-green-600/5 top-0 right-[-100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              badge="Implementation"
              title="Phased Rollout Roadmap"
              subtitle="A pragmatic five-year pathway from pilot to national deployment — building on existing legal authority and manufacturing capability."
            />

            <div className="max-w-3xl mx-auto">
              <TimelinePhase phase="Phase 1" title="Pilot Programme" year="Years 1–2" color="orange" description="Controlled pilot in select state assembly elections to validate the architecture in real-world conditions." items={["Deploy Zero-Gap in 500 booths across 2-3 state elections", "Run parallel with existing EVM system for comparison", "Collect biometric success rates, auth time, uptime data", "Publish independent audit via ECI Technical Expert Committee", "Budget: Rs. 150-300 crore"]} delay={0} />
              <TimelinePhase phase="Phase 2" title="Infrastructure Build-Out" year="Years 2–3" color="blue" description="National-scale infrastructure deployment and workforce training." items={["National Voter ID Smart Card rollout via UIDAI infrastructure", "Manufacture Node A & B through BEL at national scale", "Train election officials on dual-node workflow", "Establish QR signing key management under ECI authority", "Amend Conduct of Elections Rules 1961", "Budget: Rs. 7,125-9,500 crore"]} delay={0.15} />
              <TimelinePhase phase="Phase 3" title="National Deployment" year="Years 3–5" color="green" description="Full deployment for Lok Sabha General Elections with complete system integration." items={["Full deployment for Lok Sabha General Elections", "Retired EVMs evaluated for Node B repurposing", "VVPAT audit upgraded to 100% recount capability", "Parliamentary amendment to Section 61A of RPA 1951", "Budget: Rs. 6,825-9,950 crore"]} delay={0.3} />
            </div>
          </div>
        </section>

        {/* ==================== GLOBAL PRECEDENTS ==================== */}
        <section className="py-20 sm:py-24 lg:py-32 relative bg-dark-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              badge="Global Validation"
              title="International Precedents"
              subtitle="Four countries whose experiences directly validate components of the Zero-Gap architecture — proving each concept works at national scale."
            />

            <StaggerChildren className="grid sm:grid-cols-2 gap-5 sm:gap-6 items-stretch">
              {globalPrecedents.map((p, i) => (
                <StaggerItem key={i} className="h-full flex flex-col">
                  <GlassCard className="h-full hover:border-opacity-50">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl sm:text-4xl shrink-0">{p.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg sm:text-xl font-black text-white">{p.country}</h3>
                          <span className="text-xs font-bold code-text text-slate-500 bg-dark-800 px-2 py-0.5 rounded">{p.year}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${p.status === 'Active' ? 'text-india-green-400 bg-india-green-500/10' : 'text-red-400 bg-red-500/10'}`}>{p.status}</span>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">{p.feature}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <ArrowRight className="w-3 h-3 text-kesari-400 shrink-0" />
                          <span className="text-kesari-400 font-bold">Zero-Gap Parallel: {p.parallel}</span>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* ==================== LEGAL PATHWAY ==================== */}
        <section className="py-20 sm:py-24 lg:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              badge="Legal Framework"
              title="Regulatory Pathway"
              subtitle="Zero-Gap is designed as a modification under existing legal authority — not a replacement requiring entirely new legislation."
            />

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto items-stretch">
              <FadeInLeft className="h-full flex flex-col">
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ashoka-500/20 to-ashoka-600/10 border border-ashoka-500/20 flex items-center justify-center"><Shield className="w-6 h-6 text-ashoka-400" /></div>
                    <div>
                      <h3 className="text-lg font-black text-white">RPA 1951</h3>
                      <p className="text-xs text-slate-500 font-bold">Representation of the People Act</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-india-green-400 mt-0.5 shrink-0" /> Section 61A: ECI authorized to use voting machines</li>
                    <li className="flex items-start gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-india-green-400 mt-0.5 shrink-0" /> Section 61B: Use with modifications as ECI directs</li>
                    <li className="flex items-start gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-india-green-400 mt-0.5 shrink-0" /> Zero-Gap = modification, not replacement</li>
                  </ul>
                </GlassCard>
              </FadeInLeft>
              <FadeInRight className="h-full flex flex-col">
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kesari-500/20 to-kesari-600/10 border border-kesari-500/20 flex items-center justify-center"><Globe className="w-6 h-6 text-kesari-400" /></div>
                    <div>
                      <h3 className="text-lg font-black text-white">Supreme Court</h3>
                      <p className="text-xs text-slate-500 font-bold">Subramanian Swamy vs ECI (2013)</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-india-green-400 mt-0.5 shrink-0" /> Court directed ECI to introduce VVPAT with all EVMs</li>
                    <li className="flex items-start gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-india-green-400 mt-0.5 shrink-0" /> 2019 &amp; 2023: Physical paper verification constitutionally required</li>
                    <li className="flex items-start gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-india-green-400 mt-0.5 shrink-0" /> Zero-Gap fulfils mandate more completely than current system</li>
                  </ul>
                </GlassCard>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* ==================== FAQ SECTION ==================== */}
        <section className="py-20 sm:py-24 lg:py-32 relative bg-dark-900/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <SectionTitle
              badge="Questions & Answers"
              title="Anticipated Objections Addressed"
              subtitle="Direct responses to the most common technical and operational concerns about the Zero-Gap architecture."
            />

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <AccordionItem question={faq.q} answer={faq.a} isOpen={activeFaq === i} onClick={() => setActiveFaq(activeFaq === i ? null : i)} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== CONCLUSION CTA ==================== */}
        <section className="py-20 sm:py-24 lg:py-32 relative">
          <GlowOrb className="w-[600px] h-[600px] bg-kesari-600/10 top-0 left-1/2 -translate-x-1/2" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-kesari-400 text-sm font-bold tracking-wider uppercase mb-8">
                <Shield className="w-4 h-4" /> Trust in Physics &amp; Mathematics
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8 leading-tight">It Transforms the Question From:</h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-slate-500 mb-6 sm:mb-8 italic">&ldquo;Can we trust this software?&rdquo;</div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <ArrowRight className="w-8 h-8 text-kesari-400 mx-auto mb-6 sm:mb-8" />
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-6 sm:mb-8">
                <span className="gradient-text">&ldquo;Can we trust physics and mathematics?&rdquo;</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-lg sm:text-xl text-white font-bold mb-10 sm:mb-12">&mdash; and the answer to the second question is yes.</p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 max-w-4xl mx-auto mb-12 sm:mb-16">
                {[
                  { icon: WifiOff, label: "Optical Airgap" },
                  { icon: Database, label: "Hash Chain" },
                  { icon: Activity, label: "Watchdog" },
                  { icon: Printer, label: "VVPAT" },
                  { icon: Layers, label: "Reconciliation" },
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeInOut" } }} className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl bg-dark-800/30 border border-dark-700/30 hover:border-kesari-500/30 hover:bg-dark-800/50 transition-all duration-300 cursor-default group">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-kesari-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 text-center leading-tight group-hover:text-slate-300 transition-colors">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.7}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={PdfLink} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-kesari-500 to-kesari-600 text-white rounded-2xl font-black text-base sm:text-lg shadow-xl shadow-kesari-500/25 hover:shadow-kesari-500/40 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-kesari-500 group">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" /> Download the Full PDF Report
                </motion.a>
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="mailto:roshhellwett@icloud.com" className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 glass text-white rounded-2xl font-bold text-base sm:text-lg hover:bg-dark-800/70 hover:border-dark-600/50 transition-all duration-300 flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-kesari-500 group">
                  <ExternalLink className="w-5 h-5 text-kesari-400 group-hover:scale-110 group-hover:text-kesari-300 transition-all duration-300" /> Contact the Author
                </motion.a>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-12 sm:py-16 border-t border-dark-800/50 relative z-10 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-kesari-500 to-kesari-700 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-black text-base text-white leading-none">ZeroGap</span>
                  <span className="block text-[9px] text-slate-500 font-bold leading-none mt-0.5">VOTING ARCHITECTURE</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                An open technical blueprint for securing electronic voting through physics, mathematics, and irreversible hardware.
              </p>
            </div>

            <div>
              <h4 className="font-black text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
                <div className="space-y-2">
                  {navItems.map(item => (
                    <button key={item.id} onClick={() => scrollTo(item.id)} className="block text-sm text-slate-500 hover:text-kesari-400 hover:translate-x-1 transition-all duration-300 font-medium focus:outline-none focus-visible:ring-1 focus-visible:ring-kesari-500 rounded">
                      {item.label}
                    </button>
                  ))}
                  <a href="https://github.com/roshhellwett" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 hover:text-kesari-400 transition-all duration-300 font-medium group">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:text-kesari-400 transition-all duration-300" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 2.952.761.858-.239 1.787-.357 2.708-.36.92.003 1.849.121 2.708.36 1.944-1.083 2.952-.761 2.952-.761.652 1.652.241 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    <span>GitHub Profile</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                  </a>
                </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="font-black text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-bold text-white">Roshan Kr Singh</div>
                  <a href="mailto:roshhellwett@icloud.com" className="text-sm text-slate-500 hover:text-kesari-400 transition-colors">roshhellwett@icloud.com</a>
                </div>
                <div>
                  <div className="text-xs text-slate-600 font-bold">SUBMITTED TO</div>
                  <div className="text-sm text-slate-500">Election Commission of India, UIDAI, MeitY</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 font-bold">DATE</div>
                  <div className="text-sm text-slate-500">April 2026</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-dark-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600 font-medium">Open Source Proposal &mdash; Freely use, adapt, or improve.</p>
            <p className="text-xs text-slate-600 font-medium">2026 Zero-Gap Voting Architecture. All rights reserved.</p>
          </div>
        </div>
         </footer>
      </div>
    );
  }
