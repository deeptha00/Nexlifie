import { profile } from '../../data/ctoProfileContent';

export default function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--cto-line-rgb))]">
      <div className="cto-wrap py-8 flex flex-col sm:flex-row justify-between gap-3 font-cto-mono text-xs text-[rgb(var(--cto-dim-rgb))]">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.title} · {profile.company} · {profile.location}</span>
      </div>
    </footer>
  );
}
