import { motion } from 'framer-motion';
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

const Clients = () => {
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
  ];

  // Duplicate for seamless infinite scrolling
  const marqueeClients = [...clients, ...clients];

  return (
    <section id="clients" className="pt-8 md:pt-16 lg:pt-20 pb-20 md:pb-32 relative overflow-hidden bg-black/40">
      {/* Ambient background glows - hidden on mobile to improve performance */}
      <div className="hidden md:block absolute top-1/2 left-0 w-96 h-96 bg-green-500/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      <div className="hidden md:block absolute top-1/2 right-0 w-96 h-96 bg-green-500/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 relative z-20">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-green-500/50" />
            <span className="text-green-500 font-black tracking-[0.5em] md:tracking-[0.8em] text-[9px] md:text-[11px] uppercase">
              Network Partners
            </span>
            <div className="w-8 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-green-500/50" />
          </div>
          
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-tighter uppercase leading-none drop-shadow-2xl">
            TRUSTED <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5">BY.</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex flex-col gap-8 md:gap-12 mt-10">
        {/* Edge Gradient Masks for smooth fade out */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-56 bg-gradient-to-r from-[#070707] to-transparent z-30 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-56 bg-gradient-to-l from-[#070707] to-transparent z-30 pointer-events-none" />

        {/* Row 1 - Left to Right */}
        <div className="relative flex overflow-hidden group">
          <div className="flex items-center gap-6 md:gap-10 w-max pr-6 md:pr-10 animate-marquee-reverse hover:[animation-play-state:paused]">
            {marqueeClients.map((client, i) => (
              <div
                key={`row1-${i}`}
                className="relative w-36 sm:w-44 md:w-56 shrink-0 aspect-[4/3] flex items-center justify-center rounded-2xl bg-black border border-white/5 group-hover/client:border-green-500/40 hover:bg-[#050505] transition-all duration-500 overflow-hidden cursor-crosshair group/client shadow-lg"
              >
                {/* Accent glow on hover */}
                <div className="absolute inset-0 bg-green-500/0 group-hover/client:bg-green-500/5 transition-colors duration-500 mix-blend-overlay" />
                
                <div className="w-full h-full flex items-center justify-center p-4 transition-transform duration-700 group-hover/client:scale-110">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-full h-full object-contain drop-shadow-md"
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
