import { motion } from 'framer-motion';
import { fadeUp } from '../lib/motion';
import client1 from '../assets/Logos/3x_logo.png';
import client2 from '../assets/Logos/Aurelian Logo.png';
import client3 from '../assets/Logos/bibo_logo.jpg';
import client4 from '../assets/Logos/bumblebee-logo.jpg';
import client5 from '../assets/Logos/eyeluxe_logo.png';
import client6 from '../assets/Logos/keralasoul_logo.png';
import client7 from '../assets/Logos/trainifie_logo.png';
import client8 from '../assets/Logos/E-Kody.png';
import client9 from '../assets/Logos/Orzen.webp';
import client10 from '../assets/Logos/logo 2.png';
import client11 from '../assets/Logos/1. Primary Logo.PNG';
import client12 from '../assets/Logos/ED TECH LOGO -01.PNG';
import client13 from '../assets/Logos/ELS LOGO G-01.png';
import client14 from '../assets/Logos/logo-wordmark.webp';

const Clients = ({ headingLevel = 'h2' }) => {
  const Heading = headingLevel;
  const clients = [
    { name: "3X", logo: client1 },
    { name: "Aurelian", logo: client2, scale: 2.0 },
    { name: "Bibo", logo: client3 },
    { name: "Bumblebee", logo: client4 },
    { name: "Eyeluxe", logo: client5 },
    { name: "Kerala Soul", logo: client6 },
    { name: "Trainifie", logo: client7, scale: 2.2 },
    { name: "E-Kody", logo: client8 },
    { name: "Orzen", logo: client9 },
    { name: "RR Ventures", logo: client10 },
    { name: "Kriyora", logo: client11 },
    { name: "ETTC", logo: client12 },
    { name: "Eyeluxe Store", logo: client13 },
    { name: "Epic Verse", logo: client14 },
  ];

  // Duplicate for seamless infinite scrolling
  const marqueeClients = [...clients, ...clients];

  return (
    <section id="clients" className="pt-16 md:pt-20 pb-20 md:pb-32 relative overflow-hidden bg-[var(--bg-dark)] border-t border-[rgb(var(--ink-rgb)/10%)]">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 relative z-20">
        <motion.div className="max-w-2xl mb-14 md:mb-16" {...fadeUp(0)}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[1px] bg-green-600" />
            <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">TRUSTED BY</span>
          </div>
          <Heading className="font-heading text-4xl sm:text-5xl md:text-[52px] leading-[1.1] font-bold text-[var(--secondary)] text-balance">
            Businesses that have<br />grown with us.
          </Heading>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full mt-4">
        <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-[var(--bg-dark)] to-transparent z-30 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-[var(--bg-dark)] to-transparent z-30 pointer-events-none" />

        <div className="relative flex overflow-hidden group">
          <div className="flex items-center gap-4 md:gap-6 w-max pr-4 md:pr-6 animate-marquee-reverse hover:[animation-play-state:paused]">
            {marqueeClients.map((client, i) => (
              <div
                key={`row1-${i}`}
                className="relative w-32 sm:w-40 md:w-48 shrink-0 aspect-[4/3] flex items-center justify-center rounded-2xl bg-white border border-[#111111]/12 shadow-[var(--shadow-lift)] hover:shadow-[var(--shadow-soft)] hover:-translate-y-1 hover:border-green-500/30 transition-all duration-500 overflow-hidden group/client"
              >
                <div className="w-full h-full flex items-center justify-center p-5 transition-transform duration-500 group-hover/client:scale-105">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-full h-full object-contain"
                    style={client.scale ? { transform: `scale(${client.scale})` } : {}}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
