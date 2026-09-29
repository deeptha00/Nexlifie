import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, MessageCircle, RotateCcw, Search, Send, X } from 'lucide-react';
import { chatbotFlow, CHATBOT_START_NODE } from '../../data/chatbotFlow';
import { searchChatbot } from '../../lib/chatbotSearch';

/**
 * The Nexlifie site assistant — a guided, button-driven bot with a free-text
 * box layered on top. Typing runs a client-side keyword search against real
 * site content (`lib/chatbotSearch.js`); there is no AI and no backend, so
 * every result is a real link or a step in `data/chatbotFlow.js`, never a
 * generated answer. It sits stacked above the WhatsApp button (never
 * overlapping it) and fully resets on page navigation, since PageLayout —
 * and this widget with it — remounts per route.
 */
const startOptions = chatbotFlow[CHATBOT_START_NODE].options;
const buildBotMessages = (nodeId) => (chatbotFlow[nodeId]?.bot || []).map((text) => ({ from: 'bot', text }));
const BACK_TO_MENU = { label: '← Back to menu', next: CHATBOT_START_NODE };

let uid = 0;
const withIds = (msgs) => msgs.map((m) => ({ ...m, id: `m${++uid}` }));

const ChatbotWidget = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => withIds(buildBotMessages(CHATBOT_START_NODE)));
  const [activeOptions, setActiveOptions] = useState(startOptions);
  const [query, setQuery] = useState('');
  const scrollRef = useRef(null);
  const launcherRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const goTo = (href) => {
    setOpen(false);
    // Hash anchors need a real page load to land correctly — this app has no
    // client-side scroll-to-hash handling, and hard navigation always works,
    // same as every other in-page anchor on this site.
    if (href.includes('#')) {
      window.location.assign(href);
    } else {
      navigate(href);
    }
  };

  const handleOption = (option) => {
    setMessages((prev) => [...prev, ...withIds([{ from: 'user', text: option.label }])]);

    if (option.href) {
      goTo(option.href);
      return;
    }
    if (option.external) {
      window.open(option.external, '_blank', 'noopener,noreferrer');
      setMessages((prev) => [...prev, ...withIds([{ from: 'bot', text: 'Opened WhatsApp in a new tab. Anything else?' }])]);
      return;
    }
    if (option.next) {
      setMessages((prev) => [...prev, ...withIds(buildBotMessages(option.next))]);
      setActiveOptions(chatbotFlow[option.next].options);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    setMessages((prev) => [...prev, ...withIds([{ from: 'user', text: q }])]);
    const results = searchChatbot(q);

    if (results.length) {
      setMessages((prev) => [
        ...prev,
        ...withIds([{ from: 'bot', text: `Here's what might help with "${q}":` }]),
      ]);
      setActiveOptions([...results, BACK_TO_MENU]);
    } else {
      setMessages((prev) => [
        ...prev,
        ...withIds([{ from: 'bot', text: `Couldn't find a match for "${q}" — here's where to start:` }]),
      ]);
      setActiveOptions(startOptions);
    }
    setQuery('');
  };

  const restart = () => {
    setMessages(withIds(buildBotMessages(CHATBOT_START_NODE)));
    setActiveOptions(startOptions);
    setQuery('');
  };

  return (
    <>
      {/* Launcher — stacked above the WhatsApp button, never overlapping it */}
      <motion.button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={open}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="group fixed bottom-[92px] right-6 md:bottom-[124px] md:right-10 z-[110] w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#111111] border border-green-500/40 flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] hover:border-green-500 transition-colors"
      >
        <div className="absolute -inset-2 bg-green-500/15 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        {open ? (
          <X size={24} className="relative z-10 text-white" />
        ) : (
          <MessageCircle size={24} className="relative z-10 text-green-500" />
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Nexlifie site assistant"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[156px] right-4 left-4 md:left-auto md:bottom-[200px] md:right-10 z-[105] md:w-[380px] max-w-[420px] mx-auto md:mx-0 h-[min(560px,70vh)] rounded-3xl border border-[rgb(var(--ink-rgb)/12%)] bg-[var(--bg-dark)] shadow-[var(--shadow-soft)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[rgb(var(--ink-rgb)/10%)] bg-[#111111] text-white shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-9 h-9 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center shrink-0">
                  <MessageCircle size={16} className="text-green-500" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-tight truncate">Nexlifie Assistant</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-white/40 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    Here to help
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={restart}
                aria-label="Restart conversation"
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-green-400 hover:bg-white/5 transition-colors"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            {/* Transcript */}
            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5"
            >
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                    m.from === 'bot'
                      ? 'self-start bg-[rgb(var(--ink-rgb)/5%)] text-[rgb(var(--ink-rgb)/85%)] rounded-bl-md'
                      : 'self-end bg-green-600 text-white rounded-br-md'
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
            </div>

            {/* Current options — always visible, not part of the scrollback */}
            <div className="shrink-0 border-t border-[rgb(var(--ink-rgb)/10%)] p-3 flex flex-wrap gap-2 max-h-[34%] overflow-y-auto">
              {activeOptions.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleOption(option)}
                  className="group inline-flex items-center gap-1.5 rounded-xl border border-[rgb(var(--ink-rgb)/15%)] bg-[rgb(var(--ink-rgb)/2%)] px-3.5 py-2 text-[12.5px] font-medium text-[rgb(var(--ink-rgb)/80%)] hover:border-green-600 hover:text-green-700 hover:bg-green-600/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                >
                  {option.label}
                  {(option.href || option.external) && (
                    <ArrowUpRight size={12} className="text-[rgb(var(--ink-rgb)/30%)] group-hover:text-green-600 transition-colors" />
                  )}
                </button>
              ))}
            </div>

            {/* Type & search */}
            <form onSubmit={handleSearch} className="shrink-0 flex items-center gap-2 border-t border-[rgb(var(--ink-rgb)/10%)] p-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--ink-rgb)/35%)] pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type what you're looking for..."
                  aria-label="Search Nexlifie"
                  className="w-full rounded-xl border border-[rgb(var(--ink-rgb)/15%)] bg-[rgb(var(--ink-rgb)/2%)] pl-9 pr-3 py-2.5 text-[13px] text-[var(--secondary)] placeholder:text-[rgb(var(--ink-rgb)/35%)] outline-none focus:border-green-600 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={!query.trim()}
                aria-label="Search"
                className="shrink-0 w-9 h-9 rounded-xl bg-green-600 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-green-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
