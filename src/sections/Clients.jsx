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
  ];

  // Duplicate for seamless infinite scrolling
  const marqueeClients = [...clients, ...clients];

  return (
    <section id="clients" className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-black/40">
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-green-500 font-black tracking-[0.5em] md:tracking-[1em] text-[10px] md:text-[12px] uppercase mb-4 md:mb-8 block">
            Network Partners
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter uppercase leading-none">
            TRUSTED <span className="text-white/10">BY.</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Edge Gradient Masks for smooth fade out */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-6 md:gap-8 lg:gap-10 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30, // Adjust speed (higher is slower)
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {marqueeClients.map((client, i) => (
            <div
              key={i}
              className="relative group w-36 sm:w-44 md:w-48 lg:w-56 shrink-0 flex items-center justify-center aspect-square rounded-2xl bg-black border border-white/10 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <div className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  style={client.scale ? { transform: `scale(${client.scale})` } : {}}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
