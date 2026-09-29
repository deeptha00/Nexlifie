import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/motion';
import client1 from '../../assets/Logos/3x_logo.png';
import client2 from '../../assets/Logos/Aurelian Logo.png';
import client3 from '../../assets/Logos/bibo_logo.jpg';
import client4 from '../../assets/Logos/bumblebee-logo.jpg';
import client5 from '../../assets/Logos/eyeluxe_logo.png';
import client6 from '../../assets/Logos/keralasoul_logo.png';
import client7 from '../../assets/Logos/trainifie_logo.png';
import client8 from '../../assets/Logos/E-Kody.png';
import client9 from '../../assets/Logos/Orzen.webp';
import client10 from '../../assets/Logos/logo 2.png';
import client11 from '../../assets/Logos/1. Primary Logo.PNG';
import client12 from '../../assets/Logos/ED TECH LOGO -01.PNG';
import client13 from '../../assets/Logos/ELS LOGO G-01.png';
import client14 from '../../assets/Logos/logo-wordmark.webp';
import client15 from '../../assets/Logos/logo.png';

const clients = [
  { name: '3X', logo: client1 },
  { name: 'Aurelian', logo: client2, scale: 2.0 },
  { name: 'Bibo', logo: client3 },
  { name: 'Bumblebee', logo: client4 },
  { name: 'Eyeluxe', logo: client5 },
  { name: 'Kerala Soul', logo: client6 },
  { name: 'Trainifie', logo: client7, scale: 2.2 },
  { name: 'E-Kody', logo: client8 },
  { name: 'Orzen', logo: client9 },
  { name: 'RR Ventures', logo: client10 },
  { name: 'Kriyora', logo: client11 },
  { name: 'ETTC', logo: client12 },
  { name: 'Eyeluxe Store', logo: client13 },
  { name: 'Epic Verse', logo: client14 },
  { name: 'Logo', logo: client15 },
];

const marqueeClients = [...clients, ...clients];

const MediaTrustStrip = () => (
  <section className="bg-[var(--bg-dark)] pb-14 md:pb-20">
    <div className="mx-auto max-w-[1440px] px-6 md:px-10">
      <motion.p
        {...fadeUp(0, 12)}
        className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--ink-rgb)/40%)] mb-8"
      >
        THE BRANDS ALREADY WORKING WITH US
      </motion.p>
    </div>

    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-[var(--bg-dark)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-[var(--bg-dark)] to-transparent z-10 pointer-events-none" />
      <div className="relative flex overflow-hidden">
        <div className="flex items-center gap-10 md:gap-16 w-max pr-10 md:pr-16 animate-marquee-reverse hover:[animation-play-state:paused]">
          {marqueeClients.map((client, i) => (
            <div key={i} className="shrink-0 h-8 md:h-10 flex items-center transition-transform duration-300 hover:scale-110">
              <img
                src={client.logo}
                alt={client.name}
                className="h-full w-auto object-contain"
                style={client.scale ? { transform: `scale(${client.scale})` } : {}}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default MediaTrustStrip;
