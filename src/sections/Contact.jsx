import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Rocket } from 'lucide-react';
import TypewriterText from '../components/ui/TypewriterText';

const Contact = () => {
  const [step, setStep] = useState('IDLE'); // IDLE, ANALYZING, GENERATING, READY, SENDING, SUCCESS
  const [prompt, setPrompt] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [blueprint, setBlueprint] = useState(null);
  const scrollRef = useRef(null);

  const isValidPhone = leadPhone.replace(/\D/g, '').length >= 10;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [step, blueprint, prompt]);

  const analyzePrompt = (text) => {
    const lower = text.toLowerCase();
    let type = "Custom Digital Platform";
    let stack = ["React", "Node.js", "PostgreSQL", "AWS"];
    let timeline = "2 Weeks";
    let focus = "Scalable Architecture";

    if (lower.includes("app") || lower.includes("mobile")) {
      type = "Mobile Application";
      stack = ["React Native", "Node.js", "Firebase", "GCP"];
      timeline = "2 Weeks";
      focus = "Cross-Platform Ecosystem";
    }
    if (lower.includes("ecommerce") || lower.includes("store") || lower.includes("shop")) {
      type = "E-Commerce System";
      stack = ["Next.js", "Stripe", "Supabase", "Vercel"];
      timeline = "2 Weeks";
      focus = "Conversion & Transactions";
    }
    if (lower.includes("ai") || lower.includes("machine") || lower.includes("bot")) {
      type = "AI-Integrated Platform";
      stack = ["React", "Python/FastAPI", "OpenAI / LLMs", "Vector DB"];
      timeline = "2 Weeks";
      focus = "Neural Processing & Automation";
    }

    return { type, stack, timeline, focus };
  };

  const handleInitialize = () => {
    if (!prompt.trim()) return;
    setStep('ANALYZING');
    setTimeout(() => {
      setStep('GENERATING');
      setBlueprint(analyzePrompt(prompt));
      setTimeout(() => setStep('READY'), 3000);
    }, 2000);
  };

  const handleSubmitToEngineering = async (contactInfo) => {
    setStep('SENDING');
    const formData = new FormData();
    formData.append('email', 'lead_from_ai_architect@nexlifie.com');
    formData.append('phone', contactInfo);
    formData.append('message', `PHONE: ${contactInfo}\n\nPROMPT:\n${prompt}\n\nBLUEPRINT:\nType: ${blueprint.type}\nFocus: ${blueprint.focus}\nStack: ${blueprint.stack.join(', ')}`);
    try {
      await fetch("https://formspree.io/f/xykljnyo", {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      setStep('SUCCESS');
    } catch {
      setStep('SUCCESS');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-48 relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-green-500/5 blur-[100px] md:blur-[180px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side */}
          <div className="relative text-center lg:text-left">
            <span className="text-green-500 font-black tracking-[0.5em] md:tracking-[0.8em] text-[10px] md:text-[12px] uppercase mb-6 block">Nexlifie AI Architect</span>
            <h2 className="text-4xl sm:text-6xl md:text-[80px] lg:text-[100px] font-black mb-8 md:mb-12 tracking-tighter leading-[0.9] uppercase">
              ENGINEER <br /><span className="text-white/10">THE FUTURE.</span>
            </h2>
            <p className="text-base md:text-xl text-white/50 font-light leading-relaxed tracking-wide max-w-lg mx-auto lg:mx-0 mb-10">
              Skip the standard form. Describe your vision to our AI Architect below. It will analyze your requirements and instantly generate a strategic engineering blueprint.
            </p>

            <div className="space-y-6 md:space-y-8 glass-cinematic p-6 md:p-8 rounded-3xl border-white/5 inline-block text-left w-full max-w-lg shadow-[0_0_50px_rgba(34,197,94,0.05)]">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/40 group-hover:bg-green-500 group-hover:text-black transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-white/20 tracking-[0.3em] font-mono block mb-1">Direct Channel</span>
                  <p className="text-lg font-bold text-white tracking-tight">info@nexlifie.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/40 group-hover:bg-green-500 group-hover:text-black transition-all duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-white/20 tracking-[0.3em] font-mono block mb-1">Line Secure</span>
                  <p className="text-lg font-bold text-white tracking-tight">+91 9591522856</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: AI Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-cinematic rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[500px] md:h-[650px] relative bg-[#050505]/95 backdrop-blur-3xl"
          >
            {/* Terminal Header */}
            <div className="bg-white/5 px-6 py-4 flex items-center gap-4 border-b border-white/5 shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-[10px] font-mono text-white/40 tracking-widest ml-4">nexlifie-ai-architect-v2.1</span>
            </div>

            {/* Terminal Body */}
            <div ref={scrollRef} className="flex-1 p-6 md:p-8 overflow-y-auto font-mono text-sm md:text-base space-y-6 scroll-smooth">
              <div className="flex items-start gap-4">
                <span className="text-green-500 w-24 shrink-0 select-none">NEXLIFIE{'>'}</span>
                <p className="text-white/80 leading-relaxed">Hey, How can we help you?</p>
              </div>

              {(step === 'IDLE' || prompt) && (
                <div className="flex items-start gap-4 w-full">
                  <span className="text-blue-400 w-24 shrink-0 select-none">YOU{'>'}</span>
                  {step === 'IDLE' ? (
                    <div className="w-full relative group">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., We need a cross-platform mobile app for booking Reservation services with an AI styling assistant..."
                        className="w-full bg-transparent border-none outline-none text-white/90 placeholder:text-white/20 resize-none min-h-[100px] focus:ring-0 p-0 shadow-none focus:outline-none"
                        style={{ boxShadow: 'none' }}
                      />
                      <div className="absolute -inset-2 bg-green-500/5 blur-xl -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                    </div>
                  ) : (
                    <p className="text-white/60 whitespace-pre-wrap">{prompt}</p>
                  )}
                </div>
              )}

              {step !== 'IDLE' && (
                <div className="flex items-start gap-4">
                  <span className="text-green-500 w-24 shrink-0 select-none">NEXLIFIE{'>'}</span>
                  <div className="text-white/80">
                    <TypewriterText text="Analyzing your requirements..." speed={10} />
                    {step === 'ANALYZING' && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-green-500 ml-1 translate-y-1"
                      />
                    )}
                  </div>
                </div>
              )}

              {(step === 'GENERATING' || step === 'READY' || step === 'SENDING' || step === 'SUCCESS') && blueprint && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4 transition-opacity duration-1000">
                  <span className="text-green-500 w-24 shrink-0 select-none">NEXLIFIE{'>'}</span>
                  <div className="w-full">
                    <p className="text-green-400 mb-4 font-bold border-b border-green-500/20 pb-2 inline-block">-- BLUEPRINT GENERATED --</p>
                    <div className="space-y-3 mb-6 bg-green-500/5 p-4 md:p-6 rounded-xl border border-green-500/20 w-full text-white/80 shadow-[0_0_30px_rgba(34,197,94,0.05)]">
                      <p><span className="text-white/40 uppercase tracking-wider text-[10px] w-24 inline-block">Type:</span> <span className="text-white">{blueprint.type}</span></p>
                      <p><span className="text-white/40 uppercase tracking-wider text-[10px] w-24 inline-block">Focus:</span> <span className="text-green-400">{blueprint.focus}</span></p>
                      <div className="flex gap-2">
                        <span className="text-white/40 uppercase tracking-wider text-[10px] w-24 shrink-0 mt-1">Stack:</span>
                        <div className="flex flex-wrap gap-2">
                          {blueprint.stack.map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 bg-white/5 rounded border border-white/10 text-xs text-white/90">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'SENDING' && (
                <div className="flex items-start gap-4">
                  <span className="text-yellow-500 w-24 shrink-0 select-none">NEXLIFIE{'>'}</span>
                  <div className="text-white/80">
                    <TypewriterText text="Encrypting payload and transmitting to Nexlifie Engineering..." speed={30} />
                  </div>
                </div>
              )}

              {step === 'SUCCESS' && (
                <div className="flex items-start gap-4">
                  <span className="text-green-500 w-24 shrink-0 select-none">NEXLIFIE{'>'}</span>
                  <div className="text-white/80">
                    <p className="text-green-400 font-bold mb-2">Transmission successful. Mission Logged.</p>
                    <TypewriterText text="Our lead engineer will review this blueprint and contact you shortly. Terminating session." speed={20} />
                  </div>
                </div>
              )}
            </div>

            {/* Terminal Actions Footer */}
            <div className="bg-white/[0.02] p-4 md:p-6 border-t border-white/5 shrink-0 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[9px] md:text-[10px] font-mono text-white/30 tracking-widest uppercase">
                  {step === 'IDLE' ? 'System Ready' : step === 'SUCCESS' ? 'Session Complete' : 'Processing...'}
                </span>
              </div>

              {step === 'IDLE' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleInitialize}
                  className={`bg-green-500 text-black px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all ${!prompt.trim() ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]'}`}
                >
                  Send <Rocket size={14} />
                </motion.button>
              )}

              {step === 'READY' && (
                <div className="flex w-full md:w-auto flex-col md:flex-row gap-3 items-center">
                  <div className="relative w-full md:w-64">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <Phone size={14} className={leadPhone.length > 0 ? (isValidPhone ? "text-green-500" : "text-red-500") : "text-white/40"} />
                    </div>
                    <input
                      type="tel"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="Enter Phone Number"
                      className={`bg-white/5 backdrop-blur-md border rounded-xl pl-10 pr-4 py-3 text-[10px] md:text-xs text-white font-mono tracking-widest outline-none w-full transition-all focus:bg-white/10 ${leadPhone.length > 0 && !isValidPhone ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'border-white/20 focus:border-green-500/80 focus:shadow-[0_0_20px_rgba(34,197,94,0.2)]'}`}
                    />
                    {leadPhone.length > 0 && !isValidPhone && (
                      <span className="absolute -bottom-5 left-2 text-[9px] text-red-500 animate-pulse font-mono tracking-widest uppercase">Minimum 10 Digits</span>
                    )}
                  </div>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={isValidPhone ? { scale: 1.05 } : {}}
                    whileTap={isValidPhone ? { scale: 0.95 } : {}}
                    disabled={!isValidPhone}
                    onClick={() => handleSubmitToEngineering(leadPhone)}
                    className={`px-4 md:px-8 py-3 rounded-xl font-black text-[10px] md:text-xs tracking-wider uppercase flex items-center justify-center gap-3 transition-all ${isValidPhone ? 'bg-green-500 text-black hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'bg-white/5 text-white/40 border border-white/10 cursor-not-allowed'}`}
                  >
                    Send <Rocket size={14} />
                  </motion.button>
                </div>
              )}
            </div>

            {/* Cinematic Overlays */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-10" />
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent shadow-[0_0_15px_#00ff88]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
