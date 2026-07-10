import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe, Smartphone, Code, Layers, Cpu, Cloud,
  PenTool, ShoppingCart, Megaphone, Search, ArrowRight, MousePointerClick
} from 'lucide-react';

// Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// Premium Images
import imgWebDev from '../assets/services/svc_webdev_1783719676795.png';
import imgMobile from '../assets/services/svc_mobile_1783719685835.png';
import imgWebApps from '../assets/services/svc_webapps_1783719695477.png';
import imgAi from '../assets/services/svc_ai_1783719704495.png';
import imgCustom from '../assets/services/svc_custom_1783719714105.png';
import imgCloud from '../assets/services/svc_it_cloud_1783720054870.png';
import imgUiUx from '../assets/services/svc_uiux_1783719758983.png';
import imgEcommerce from '../assets/services/svc_ecommerce_1783719769172.png';
import imgMarketing from '../assets/services/svc_marketing_1783719779010.png';
import imgSeo from '../assets/services/svc_seo_1783719788695.png';

const services = [
  { icon: Globe,        slug: 'website-development',  title: "Website Development",    text: "Stunning, high-performance websites tailored to your brand identity.", image: imgWebDev },
  { icon: Smartphone,   slug: 'mobile-apps',          title: "Mobile Apps",            text: "Native and cross-platform mobile experiences for iOS and Android.", image: imgMobile },
  { icon: Code,         slug: 'web-applications',     title: "Web Applications",       text: "Complex, scalable systems built with modern full-stack architectures.", image: imgWebApps },
  { icon: Cpu,          slug: 'ai-solutions',         title: "AI Solutions",           text: "Integrating machine learning into your core business workflows.", image: imgAi },
  { icon: Layers,       slug: 'custom-software',      title: "Custom Software",        text: "Bespoke internal tools engineered to power your operations.", image: imgCustom },
  { icon: Cloud,        slug: 'cloud-solutions',      title: "Cloud Solutions",        text: "Robust cloud infrastructure design, migration, and deployment.", image: imgCloud },
  { icon: PenTool,      slug: 'ui-ux-design',         title: "UI / UX Design",         text: "User-centric interfaces that convert visitors into loyal customers.", image: imgUiUx },
  { icon: ShoppingCart, slug: 'ecommerce',            title: "E-commerce",             text: "Scalable online stores with seamless payment and inventory flows.", image: imgEcommerce },
  { icon: Megaphone,    slug: 'digital-marketing',    title: "Digital Marketing",      text: "Growth-focused strategies to dominate search, social, and beyond.", image: imgMarketing },
  { icon: Search,       slug: 'seo-optimization',     title: "SEO Optimization",       text: "Optimizing your digital visibility for maximum organic reach.", image: imgSeo },
];

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-[#020202]">
      {/* Background Decor */}
      <div className="absolute inset-0 digital-grid-system opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-0 relative z-10">
        
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16 flex flex-col items-center text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-green-500" />
            <span className="text-[10px] md:text-xs font-mono text-green-500 tracking-[0.4em] uppercase">System Capabilities</span>
            <div className="w-12 h-[1px] bg-green-500" />
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-black tracking-tighter leading-[0.9] uppercase drop-shadow-2xl mb-8">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-emerald-600">Services</span>
          </h2>
        </motion.div>

        {/* 3D Coverflow Swiper */}
        <div className="w-full max-w-[1400px] mx-auto pb-10">
          <style>
            {`
              .swiper-pagination-bullet {
                background: rgba(255,255,255,0.2) !important;
                opacity: 1 !important;
                transition: all 0.3s ease;
              }
              .swiper-pagination-bullet-active {
                background: #22c55e !important;
                transform: scale(1.5) !important;
                box-shadow: 0 0 10px rgba(34,197,94,0.5);
              }
            `}
          </style>
          
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: true,
              scale: 0.9,
            }}
            speed={400}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full !pt-10 !pb-20"
          >
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <SwiperSlide key={i} className="!w-[320px] sm:!w-[400px] md:!w-[500px]">
                  <Link to={`/services/${s.slug}`} className="block h-[480px] md:h-[580px]">
                    <div className="w-full h-full bg-[#020202] rounded-[3rem] p-8 md:p-10 relative overflow-hidden border border-white/10 flex flex-col group shadow-[0_30px_60px_rgba(0,0,0,0.8)] cursor-pointer hover:border-green-500/40 transition-all duration-500">
                    
                    {/* Premium Background Image */}
                    <div className="absolute inset-0 w-full h-full z-0">
                      <img 
                        src={s.image} 
                        alt={s.title} 
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-all duration-700 group-hover:scale-110" 
                      />
                      {/* Gradient Overlay to ensure text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/20 to-[#020202]" />
                    </div>

                    {/* Number Watermark */}
                    <div className="absolute -top-10 -right-6 text-[180px] font-black text-white/[0.04] pointer-events-none select-none z-10 group-hover:text-white/[0.08] transition-colors duration-700">
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <div className="relative z-20 flex flex-col h-full">
                      
                      {/* Icon */}
                      <div className="w-16 h-16 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-green-500 mb-auto shadow-[0_0_30px_rgba(34,197,94,0.1)] group-hover:bg-green-500 group-hover:text-black group-hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] transition-all duration-500">
                        <Icon size={32} strokeWidth={1.5} />
                      </div>
                      
                      {/* Content */}
                      <div className="mt-auto">
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-tight group-hover:text-green-400 transition-colors drop-shadow-lg">
                          {s.title}
                        </h3>
                        <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-[320px] group-hover:text-white/90 transition-colors drop-shadow-md font-light">
                          {s.text}
                        </p>
                        
                        {/* Interactive Button */}
                        <div className="flex items-center gap-4 w-full">
                          <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 group-hover:bg-green-500 group-hover:border-green-500 group-hover:text-black group-hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-500 shrink-0">
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                          <span className="text-sm font-bold tracking-widest text-white/60 uppercase group-hover:text-green-400 transition-colors duration-500">
                            Discover Scope
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                  </Link>
                </SwiperSlide>

              )
            })}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default Services;
