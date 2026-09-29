import { useState } from 'react';
import Reveal from './Reveal';
import { layers, nodes, edges, security } from '../../data/ctoProfileContent';

// Diagram geometry (viewBox units)
const W = 640;
const PITCH = 150;
const LABEL_Y = 14;
const NODE_OFF = 28;
const NODE_H = 84;
const R = 8;
const SEC_Y = 3 * PITCH + NODE_OFF + NODE_H + 32;
const SEC_H = 40;
const H = SEC_Y + SEC_H + 4;

const nodeY = (n) => n.layer * PITCH + NODE_OFF;
const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
const layerTag = ['CLIENT', 'SERVICE', 'AI', 'PLATFORM'];
const mono = { fontFamily: "'JetBrains Mono', monospace" };

// Right-angled connector with rounded corners
function edgePath(a, b) {
  const A = byId[a], B = byId[b];
  if (A.layer === B.layer) {
    const y = nodeY(A) + NODE_H / 2;
    return { d: `M ${A.x + A.w} ${y} H ${B.x}`, arrow: false };
  }
  const x1 = A.x + A.w / 2, y1 = nodeY(A) + NODE_H;
  const x2 = B.x + B.w / 2, y2 = nodeY(B);
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  if (Math.abs(dx) < 2 * R) return { d: `M ${x1} ${y1} V ${y2}`, arrow: true };
  const s = Math.sign(dx);
  return {
    d: `M ${x1} ${y1} V ${my - R} Q ${x1} ${my} ${x1 + s * R} ${my} H ${x2 - s * R} Q ${x2} ${my} ${x2} ${my + R} V ${y2}`,
    arrow: true,
  };
}

const stats = [
  ['Layers', layers.length],
  ['Components', nodes.length],
  ['Integrations', edges.length],
  ['Security', 'CEH'],
];

export default function Architecture() {
  const [sel, setSel] = useState('backend');
  const isSec = sel === 'security';
  const node = byId[sel];
  const links = isSec ? [] : edges.filter(([a, b]) => a === sel || b === sel).map(([a, b]) => byId[a === sel ? b : a]);
  const isLinked = (id) => isSec || sel === id || links.some((l) => l.id === id);

  return (
    <section id="architecture" className="border-t border-[rgb(var(--cto-line-rgb))] bg-[rgb(var(--cto-surface-rgb)/40%)] scroll-mt-16">
      <div className="cto-wrap py-24 md:py-32">
        <div className="grid md:grid-cols-[0.3fr_1fr] gap-10 md:gap-16">
          <Reveal><p className="cto-kicker">02 / Architecture</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl leading-[1.02] font-bold">Technology architecture</h2>
            <p className="mt-6 max-w-2xl text-lg text-[rgb(var(--cto-dim-rgb))] leading-relaxed">
              The platform stack I design and lead: from client applications and backend services to the AI layer and cloud infrastructure, with security applied across every layer.
            </p>
            <dl className="mt-8 inline-grid grid-cols-2 sm:grid-cols-4 border border-[rgb(var(--cto-line-rgb))] divide-x divide-y sm:divide-y-0 divide-[rgb(var(--cto-line-rgb))] bg-[rgb(var(--cto-base-rgb))]">
              {stats.map(([k, v]) => (
                <div key={k} className="px-5 py-3">
                  <dt className="font-cto-mono text-[10px] uppercase tracking-[0.14em] text-[rgb(var(--cto-dim-rgb))]">{k}</dt>
                  <dd className="mt-1 font-cto-mono text-lg text-[rgb(var(--cto-fg-rgb))]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Explorer: diagram + sticky inspector */}
        <Reveal delay={0.15} className="mt-14 hidden lg:block">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 items-start">
            {/* Diagram */}
            <div className="border border-[rgb(var(--cto-line-rgb))] bg-[rgb(var(--cto-base-rgb))]">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[rgb(var(--cto-line-rgb))] font-cto-mono text-[11px] uppercase tracking-wider text-[rgb(var(--cto-dim-rgb))]">
                <span>Fig. 02 — Platform architecture</span>
                <span className="hidden xl:inline">Hover or click a component</span>
              </div>
              <div className="p-5">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label="Platform architecture diagram">
                  <defs>
                    <marker id="cto-arw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                      <path d="M0 1 L9 5 L0 9 z" fill="#4a566a" />
                    </marker>
                    <marker id="cto-arw-on" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                      <path d="M0 1 L9 5 L0 9 z" fill="#2fc7b0" />
                    </marker>
                    <pattern id="cto-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="8" stroke="#2fc7b0" strokeOpacity="0.2" strokeWidth="1" />
                    </pattern>
                  </defs>

                  {/* layer labels */}
                  {layers.map((l, i) => {
                    const label = `L${i + 1} · ${l.label}`;
                    return (
                      <g key={l.id}>
                        <text x="0" y={i * PITCH + LABEL_Y} fontSize="10" letterSpacing="1.4" fill="#2fc7b0" style={mono}>{label}</text>
                        <line x1={label.length * 7.4 + 12} x2={W} y1={i * PITCH + LABEL_Y - 3.5} y2={i * PITCH + LABEL_Y - 3.5} stroke="#232b37" />
                      </g>
                    );
                  })}

                  {/* connections */}
                  {edges.map(([a, b]) => {
                    const { d, arrow } = edgePath(a, b);
                    const on = !isSec && (a === sel || b === sel);
                    return <path key={a + b} d={d} className={`cto-edge ${on ? 'on' : ''}`} markerEnd={arrow ? `url(#${on ? 'cto-arw-on' : 'cto-arw'})` : undefined} />;
                  })}

                  {/* components */}
                  {nodes.map((n) => {
                    const y = nodeY(n);
                    return (
                      <g
                        key={n.id}
                        className={`cto-node ${sel === n.id ? 'sel' : ''}`}
                        tabIndex={0}
                        onMouseEnter={() => setSel(n.id)}
                        onClick={() => setSel(n.id)}
                        onFocus={() => setSel(n.id)}
                        opacity={isLinked(n.id) ? 1 : 0.7}
                      >
                        <rect x={n.x} y={y} width={n.w} height={NODE_H} strokeWidth="1.25" />
                        <rect className="bar" x={n.x} y={y} width="3" height={NODE_H} />
                        <text className="s" x={n.x + n.w - 12} y={y + 20} fontSize="8.5" letterSpacing="1.2" textAnchor="end" style={mono}>{layerTag[n.layer]}</text>
                        <text className="t" x={n.x + 18} y={y + 36} fontSize="17" fontWeight="600">{n.title}</text>
                        {[n.items.slice(0, 2), n.items.slice(2, 4)].filter((r) => r.length).map((row, ri) => (
                          <text key={ri} className="s" x={n.x + 18} y={y + 58 + ri * 15} fontSize="10.5" style={mono}>{row.join(' · ')}</text>
                        ))}
                      </g>
                    );
                  })}

                  {/* security: cross-cutting */}
                  <g className={`cto-node ${isSec ? 'sel' : ''}`} tabIndex={0} onClick={() => setSel('security')} onMouseEnter={() => setSel('security')} onFocus={() => setSel('security')}>
                    <rect x="0" y={SEC_Y} width={W} height={SEC_H} strokeDasharray="5 4" />
                    <rect x="0" y={SEC_Y} width={W} height={SEC_H} fill="url(#cto-hatch)" stroke="none" pointerEvents="none" />
                    <text className="t" x={W / 2} y={SEC_Y + SEC_H / 2 + 4} textAnchor="middle" fontSize="11" letterSpacing="2.4" style={mono}>SECURITY · CEH — APPLIED ACROSS ALL LAYERS</text>
                  </g>
                </svg>
              </div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 px-5 py-3 border-t border-[rgb(var(--cto-line-rgb))] font-cto-mono text-[11px] text-[rgb(var(--cto-dim-rgb))]">
                <span className="flex items-center gap-2"><span className="w-6 h-px bg-[#4a566a]" />Integration</span>
                <span className="flex items-center gap-2"><span className="w-6 h-px bg-[rgb(var(--cto-accent-rgb))]" />Selected path</span>
                <span className="flex items-center gap-2"><span className="w-4 h-3 border border-dashed border-[rgb(var(--cto-accent-rgb)/70%)]" />Cross-cutting</span>
              </div>
            </div>

            {/* Inspector (sticky, always beside the diagram) */}
            <aside className="lg:sticky lg:top-24 border border-[rgb(var(--cto-line-rgb))] bg-[rgb(var(--cto-base-rgb))]" aria-live="polite">
              <div className="px-5 py-3 border-b border-[rgb(var(--cto-line-rgb))] flex items-center justify-between font-cto-mono text-[11px] uppercase tracking-wider text-[rgb(var(--cto-dim-rgb))]">
                <span>Inspector</span>
                <span className="flex items-center gap-1.5">
                  {layers.map((l, i) => (
                    <span
                      key={l.id}
                      className={`h-1.5 w-6 ${
                        !isSec && node.layer === i
                          ? 'bg-[rgb(var(--cto-accent-rgb))]'
                          : isSec
                            ? 'bg-[rgb(var(--cto-accent-rgb)/40%)]'
                            : 'bg-[rgb(var(--cto-line-rgb))]'
                      }`}
                    />
                  ))}
                </span>
              </div>
              <div className="p-6">
                <p className="font-cto-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--cto-dim-rgb))]">
                  {isSec ? 'Cross-cutting concern' : `Layer L${node.layer + 1} · ${layers[node.layer].label}`}
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-[rgb(var(--cto-accent-rgb))]">{isSec ? security.title : node.title}</h3>
                <p className="mt-4 text-[rgb(var(--cto-dim-rgb))] leading-relaxed">{isSec ? security.text : node.text}</p>

                <p className="mt-7 font-cto-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--cto-dim-rgb))]">Technologies</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(isSec ? security.items : node.items).map((t) => (
                    <span key={t} className="border border-[rgb(var(--cto-line-rgb))] bg-[rgb(var(--cto-surface-rgb))] px-2.5 py-1 font-cto-mono text-xs">{t}</span>
                  ))}
                </div>

                <p className="mt-7 font-cto-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--cto-dim-rgb))]">Connects to</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {isSec ? (
                    <span className="text-sm text-[rgb(var(--cto-fg-rgb)/90%)]">All layers</span>
                  ) : (
                    links.map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => setSel(l.id)}
                        className="border border-[rgb(var(--cto-accent-rgb)/50%)] px-2.5 py-1 font-cto-mono text-xs text-[rgb(var(--cto-accent-rgb))] hover:bg-[rgb(var(--cto-accent-rgb))] hover:text-[rgb(var(--cto-base-rgb))] transition-colors"
                      >
                        {l.title} →
                      </button>
                    ))
                  )}
                </div>
              </div>
            </aside>
          </div>
        </Reveal>

        {/* Below lg: stacked layers */}
        <div className="mt-12 lg:hidden space-y-8">
          {layers.map((l, i) => (
            <div key={l.id}>
              <p className="cto-kicker">L{i + 1} · {l.label}</p>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                {nodes.filter((n) => n.layer === i).map((n) => (
                  <div key={n.id} className="border border-[rgb(var(--cto-line-rgb))] border-l-2 border-l-[rgb(var(--cto-accent-rgb))] bg-[rgb(var(--cto-surface-rgb))] p-4">
                    <p className="font-semibold">{n.title}</p>
                    <p className="mt-1 font-cto-mono text-xs text-[rgb(var(--cto-dim-rgb))]">{n.items.join(' · ')}</p>
                    <p className="mt-3 text-sm text-[rgb(var(--cto-dim-rgb))] leading-relaxed">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="border border-dashed border-[rgb(var(--cto-accent-rgb)/60%)] p-4">
            <p className="cto-kicker">Security · across all layers</p>
            <p className="mt-1 font-semibold">Certified Ethical Hacker (CEH)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
