import { Link } from 'react-router-dom';
import { profile } from '../../data/ceoProfileContent';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[rgb(var(--ceo-bg-rgb))] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-white/40 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <nav className="flex items-center gap-5">
          <Link to={profile.website} className="transition-colors hover:text-[rgb(var(--ceo-accent-rgb))]">
            {profile.websiteLabel}
          </Link>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-[rgb(var(--ceo-accent-rgb))]">
            LinkedIn
          </a>
          <a href={profile.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-[rgb(var(--ceo-accent-rgb))]">
            Instagram
          </a>
        </nav>
      </div>
    </footer>
  );
}
