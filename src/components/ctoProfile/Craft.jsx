import Reveal from './Reveal';
import { disciplines } from '../../data/ctoProfileContent';

export default function Craft() {
  return (
    <section id="craft" className="border-t border-[rgb(var(--cto-line-rgb))] bg-[rgb(var(--cto-surface-rgb)/40%)] scroll-mt-16">
      <div className="cto-wrap py-24 md:py-32 grid md:grid-cols-[0.3fr_1fr] gap-10 md:gap-16">
        <Reveal><p className="cto-kicker">04 / What I build</p></Reveal>
        <div className="border border-[rgb(var(--cto-line-rgb))] divide-y divide-[rgb(var(--cto-line-rgb))] bg-[rgb(var(--cto-base-rgb))]">
          {disciplines.map((d, i) => (
            <Reveal key={d.title} delay={0.04 * i}>
              <div className="group grid md:grid-cols-[3rem_1.1fr_1fr] gap-2 md:gap-8 p-6 md:p-7 hover:bg-[rgb(var(--cto-surface-rgb))] transition-colors">
                <span className="font-cto-mono text-xs text-[rgb(var(--cto-dim-rgb))] pt-1.5">0{i + 1}</span>
                <h3 className="text-xl md:text-2xl font-semibold group-hover:text-[rgb(var(--cto-accent-rgb))] transition-colors">{d.title}</h3>
                <p className="text-[rgb(var(--cto-dim-rgb))] leading-relaxed">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
