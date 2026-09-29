import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';
import { MapPin } from 'lucide-react';
import WhatsAppIcon from './ui/WhatsAppIcon';
import { business } from '../lib/siteConfig';

/* Only link an icon that has a real URL behind it — a "#" href looks broken
   the moment someone clicks it. Add the real profile to business.sameAs in
   siteConfig.js and it appears here automatically. */
const findSameAs = (host) => business.sameAs.find((url) => url.includes(host));
const instagramUrl = findSameAs('instagram.com');
const linkedinUrl = findSameAs('linkedin.com');

const sitemap = [
  { name: 'Development', to: '/development' },
  { name: 'Media', to: '/media' },
  { name: 'About', to: '/about' },
  { name: 'Work', to: '/clients' },
  { name: 'Contact', to: '/contact' },
];

const Footer = () => (
  <footer className="bg-[#111111] text-[#F7F8F6] pb-14 md:pb-16">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="border-t border-white/10 pt-14 md:pt-16 flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        <div>
          <p className="font-heading text-4xl font-black tracking-[0.3em]">NEXLIFIE</p>
          <p className="text-xs font-mono tracking-[0.3em] text-green-500/70 mt-3">Innovate. Build. Grow.</p>
          {/* Visible NAP — must match the Google Business Profile for local ranking. */}
          <address className="not-italic mt-5 flex items-start gap-2 text-sm text-white/45 leading-relaxed">
            <MapPin size={14} className="text-green-500/60 shrink-0 mt-[3px]" />
            <span>
              {business.addressLine}
              <span className="block text-white/30 text-xs mt-1">Serving clients worldwide</span>
            </span>
          </address>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {sitemap.map((link) => (
            <Link key={link.name} to={link.to} className="text-sm text-white/60 hover:text-green-400 transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-start md:items-end gap-4">
          <a href="mailto:info@nexlifie.com" className="text-sm text-white/70 hover:text-green-400 transition-colors">
            info@nexlifie.com
          </a>
          <a href={`tel:${business.phoneE164}`} className="text-sm text-white/70 hover:text-green-400 transition-colors">
            {business.phone}
          </a>
          <div className="flex items-center gap-3">
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-green-400 hover:border-green-400/40 hover:scale-110 transition-all duration-300"
              >
                <Instagram size={15} />
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-green-400 hover:border-green-400/40 hover:scale-110 transition-all duration-300"
              >
                <Linkedin size={15} />
              </a>
            )}
            <a
              href="https://wa.me/919591522856"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-green-400 hover:border-green-400/40 hover:scale-110 transition-all duration-300"
            >
              <WhatsAppIcon size={15} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-14 pt-6 border-t border-white/10 text-xs text-white/30">
        © {new Date().getFullYear()} Nexlifie. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
