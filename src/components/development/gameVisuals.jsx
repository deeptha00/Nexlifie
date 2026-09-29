import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Gamepad2, Trophy, Zap } from 'lucide-react';

/**
 * The games visuals — and the only thing on the site that is actually played.
 *
 * Every other mockup in visuals.jsx is a still of a product. This page sells
 * playable builds, so the screen is one: a real one-button runner with jump,
 * double jump on a spendable energy bar, ramping speed and a leaderboard the
 * player climbs. The whole frame is a <button>, which is what makes Space and
 * Enter work without the page ever installing a global key listener that could
 * fight scrolling.
 *
 * The loop runs only while the frame is on screen, and never starts at all
 * under prefers-reduced-motion — a marketing page should not cost a visitor
 * a rAF loop they cannot see or did not ask for.
 */

/* Unit space: x is % of stage width, y is % of stage height above the ground
   line. Converted to px at render time, because a CSS transform percentage
   resolves against the element's own size rather than its parent's. */
const GROUND = 28;
const PLAYER_X = 16;
const PLAYER_W = 3.4;
const PLAYER_H = 7.5;

const GRAVITY = 260;
const JUMP_V = 92;
const AIR_JUMP_V = 78;
const AIR_JUMP_COST = 34;
const ENERGY_REGEN = 22;

const BASE_SPEED = 42;
const MAX_SPEED = 80;
const OBSTACLE_COUNT = 3;

const GRID_TILE = 34;
const BOT_SCORES = [2840, 1960, 1180, 640];

/* Terrain tiles seamlessly: first and last y match, so two copies scrolling
   side by side never show a seam. */
const NEAR_TERRAIN = 'M0,70 L50,44 L100,74 L150,38 L200,66 L250,42 L300,72 L350,48 L400,70';
const FAR_TERRAIN = 'M0,84 L60,62 L120,88 L180,58 L240,82 L300,60 L360,86 L400,84';

const newObstacle = (x) => ({
  x,
  w: 2.6 + Math.random() * 2.2,
  h: 4.5 + Math.random() * 3.5,
});

const freshRun = () => ({
  y: 0,
  vy: 0,
  airJumpUsed: false,
  energy: 100,
  speed: BASE_SPEED,
  dist: 0,
  obstacles: Array.from({ length: OBSTACLE_COUNT }, (_, i) => newObstacle(110 + i * 52)),
});

/* The scrolling row is the inner 200%-wide strip, never the clipping wrapper —
   translating the wrapper would drag its overflow clip along and open a gap. */
const Terrain = ({ innerRef, d, fill, stroke, className }) => (
  <div className={`absolute bottom-0 left-0 w-full overflow-hidden ${className}`} aria-hidden="true">
    <div ref={innerRef} className="flex w-[200%] h-full will-change-transform">
      {[0, 1].map((i) => (
        <svg key={i} viewBox="0 0 400 120" preserveAspectRatio="none" className="w-1/2 h-full shrink-0">
          <path d={`${d} L400,120 L0,120 Z`} fill={fill} />
          <path d={d} fill="none" stroke={stroke} strokeWidth="1.5" />
        </svg>
      ))}
    </div>
  </div>
);

/* A playable one-button runner, wearing the HUD of a real game. */
export const GameScreen = () => {
  const frameRef = useRef(null);
  const inView = useInView(frameRef, { margin: '-12%' });
  const reduce = useReducedMotion();
  const live = inView && !reduce;

  const [status, setStatus] = useState('idle'); // idle | playing | over
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const playerRef = useRef(null);
  const shadowRef = useRef(null);
  const energyRef = useRef(null);
  const nearRef = useRef(null);
  const farRef = useRef(null);
  const gridRef = useRef(null);
  const obstacleRefs = useRef([]);

  const run = useRef(null);
  if (run.current === null) run.current = freshRun();
  const scroll = useRef({ near: 0, far: 0, grid: 0 });
  const size = useRef({ w: 0, h: 0 });
  const statusRef = useRef('idle');
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const flushRef = useRef(0);

  /* The stage is fluid, so unit→px needs its live measurements. Plain effects
     throughout: this project prerenders, and useLayoutEffect warns on the
     server. Nothing here needs to beat the first paint — every element's
     resting CSS position is already its correct starting position. */
  useEffect(() => {
    const node = frameRef.current;
    if (!node) return undefined;
    const measure = () => {
      size.current = { w: node.clientWidth, h: node.clientHeight };
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const paint = useCallback(() => {
    const { w, h } = size.current;
    if (!w || !h) return;
    const g = run.current;

    const lift = (g.y / 100) * h;
    if (playerRef.current) {
      playerRef.current.style.transform = `translate3d(0, ${-lift}px, 0)`;
    }
    if (shadowRef.current) {
      const t = Math.min(g.y / 16, 1);
      shadowRef.current.style.transform = `scaleX(${1 - t * 0.55})`;
      shadowRef.current.style.opacity = `${0.55 - t * 0.35}`;
    }
    if (energyRef.current) {
      energyRef.current.style.transform = `scaleX(${Math.max(g.energy, 0) / 100})`;
    }

    g.obstacles.forEach((ob, i) => {
      const node = obstacleRefs.current[i];
      if (!node) return;
      node.style.width = `${(ob.w / 100) * w}px`;
      node.style.height = `${(ob.h / 100) * h}px`;
      node.style.transform = `translate3d(${(ob.x / 100) * w}px, 0, 0)`;
      node.style.opacity = statusRef.current === 'idle' ? '0' : '1';
    });

    if (nearRef.current) nearRef.current.style.transform = `translate3d(${-scroll.current.near}px, 0, 0)`;
    if (farRef.current) farRef.current.style.transform = `translate3d(${-scroll.current.far}px, 0, 0)`;
    if (gridRef.current) gridRef.current.style.transform = `translate3d(${-scroll.current.grid}px, 0, 0)`;
  }, []);

  const endRun = useCallback(() => {
    statusRef.current = 'over';
    setStatus('over');
    const final = Math.floor(run.current.dist);
    setScore(final);
    setBest((b) => Math.max(b, final));
  }, []);

  /* One loop drives the world, the player and the score. Idle still scrolls,
     so an unplayed screen is never a frozen one. */
  useEffect(() => {
    if (!live) {
      cancelAnimationFrame(rafRef.current);
      lastRef.current = 0;
      return undefined;
    }

    const step = (time) => {
      if (!lastRef.current) lastRef.current = time;
      /* Clamped so a backgrounded tab does not resume with one giant step. */
      const dt = Math.min((time - lastRef.current) / 1000, 0.05);
      lastRef.current = time;

      const g = run.current;
      const playing = statusRef.current === 'playing';
      const worldSpeed = playing ? g.speed : BASE_SPEED * 0.45;
      const { w } = size.current;

      if (w) {
        const travel = (worldSpeed / 100) * w * dt;
        scroll.current.near = (scroll.current.near + travel) % w;
        scroll.current.far = (scroll.current.far + travel * 0.45) % w;
        scroll.current.grid = (scroll.current.grid + travel * 0.7) % GRID_TILE;
      }

      let crashed = false;

      if (playing) {
        g.vy -= GRAVITY * dt;
        g.y = Math.max(0, g.y + g.vy * dt);
        if (g.y === 0) {
          g.vy = 0;
          g.airJumpUsed = false;
        }

        g.energy = Math.min(100, g.energy + ENERGY_REGEN * dt);
        g.dist += worldSpeed * dt;
        g.speed = Math.min(MAX_SPEED, BASE_SPEED + g.dist / 90);

        let rightmost = 0;
        g.obstacles.forEach((ob) => {
          rightmost = Math.max(rightmost, ob.x);
        });

        for (let i = 0; i < g.obstacles.length; i += 1) {
          const ob = g.obstacles[i];
          ob.x -= worldSpeed * dt;

          const hit =
            ob.x < PLAYER_X + PLAYER_W &&
            ob.x + ob.w > PLAYER_X &&
            g.y < ob.h;

          if (hit) {
            endRun();
            crashed = true;
            break;
          }

          if (ob.x + ob.w < -8) {
            const gap = 42 + Math.random() * 30;
            const replacement = newObstacle(Math.max(rightmost, 100) + gap);
            g.obstacles[i] = replacement;
            rightmost = replacement.x;
          }
        }

        if (!crashed) {
          flushRef.current += dt;
          if (flushRef.current > 0.1) {
            flushRef.current = 0;
            setScore(Math.floor(g.dist));
          }
        }
      }

      paint();
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastRef.current = 0;
    };
  }, [live, paint, endRun]);

  useEffect(() => {
    paint();
  }, [paint, status]);

  const tap = useCallback(() => {
    if (reduce) return;

    if (statusRef.current === 'playing') {
      const g = run.current;
      if (g.y === 0) {
        g.vy = JUMP_V;
      } else if (!g.airJumpUsed && g.energy >= AIR_JUMP_COST) {
        g.vy = AIR_JUMP_V;
        g.energy -= AIR_JUMP_COST;
        g.airJumpUsed = true;
      }
      return;
    }

    run.current = freshRun();
    scroll.current = { near: 0, far: 0, grid: 0 };
    flushRef.current = 0;
    setScore(0);
    statusRef.current = 'playing';
    setStatus('playing');
  }, [reduce]);

  const board = [...BOT_SCORES.map((s) => ({ score: s, you: false })), { score, you: true }]
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return (
    <div
      ref={frameRef}
      className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#07080A] aspect-[16/10]"
    >
      {/* stage */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 110%, rgba(34,197,94,0.28) 0%, rgba(34,197,94,0.04) 45%, transparent 70%)',
          }}
        />
        <div
          ref={gridRef}
          className="absolute -left-12 -right-12 inset-y-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: `${GRID_TILE}px ${GRID_TILE}px`,
            maskImage: 'linear-gradient(to top, black, transparent 75%)',
            WebkitMaskImage: 'linear-gradient(to top, black, transparent 75%)',
          }}
        />

        <Terrain
          innerRef={farRef}
          d={FAR_TERRAIN}
          fill="#0A0C0B"
          stroke="rgba(34,197,94,0.18)"
          className="h-2/5"
        />
        <Terrain
          innerRef={nearRef}
          d={NEAR_TERRAIN}
          fill="#0B0D0C"
          stroke="rgba(34,197,94,0.45)"
          className="h-1/3"
        />

        {/* obstacles — a fixed pool, recycled off the left edge */}
        {Array.from({ length: OBSTACLE_COUNT }).map((_, i) => (
          <span
            key={i}
            ref={(node) => {
              obstacleRefs.current[i] = node;
            }}
            className="absolute left-0 rounded-[2px] bg-red-400/75 shadow-[0_0_12px_rgba(248,113,113,0.45)] opacity-0 will-change-transform"
            style={{ bottom: `${GROUND}%` }}
          />
        ))}

        {/* the player, and the shadow that sells the jump */}
        <span
          ref={shadowRef}
          className="absolute rounded-full bg-black/70 blur-[1px] will-change-transform"
          style={{ left: `${PLAYER_X}%`, bottom: `${GROUND - 0.6}%`, width: `${PLAYER_W}%`, height: '3px' }}
        />
        <span
          ref={playerRef}
          className="absolute rounded-sm bg-green-400/90 shadow-[0_0_14px_rgba(74,222,128,0.55)] will-change-transform"
          style={{
            left: `${PLAYER_X}%`,
            bottom: `${GROUND}%`,
            width: `${PLAYER_W}%`,
            height: `${PLAYER_H}%`,
          }}
        />

        {/* ground line */}
        <span
          className="absolute left-0 right-0 h-[1px] bg-green-400/25"
          style={{ bottom: `${GROUND}%` }}
        />
      </div>

      {/* HUD — decorative; the play surface below carries the interaction */}
      <div
        className="absolute top-0 left-0 right-0 flex items-start justify-between p-3 md:p-4 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 md:w-9 md:h-9 rounded-lg border border-green-400/50 bg-green-400/10 flex items-center justify-center shrink-0">
            <Gamepad2 size={14} className="text-green-400" />
          </span>
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Zap size={9} className="text-green-400" />
              <span className="block w-16 md:w-20 h-1.5 rounded-full bg-white/12 overflow-hidden">
                <span
                  ref={energyRef}
                  className="block h-full w-full origin-left rounded-full bg-green-400/80 will-change-transform"
                />
              </span>
            </div>
            <p className="font-mono text-[8px] tracking-[0.16em] text-white/35 leading-none">
              DOUBLE JUMP
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="rounded-lg bg-black/45 backdrop-blur-sm px-2.5 py-1.5 text-right">
            <p className="font-mono text-[8px] text-white/40 leading-none mb-1">SCORE</p>
            <p className="font-mono text-[11px] font-bold text-white leading-none tabular-nums">
              {score.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg bg-black/45 backdrop-blur-sm px-2.5 py-1.5 text-right">
            <p className="font-mono text-[8px] text-white/40 leading-none mb-1">BEST</p>
            <p className="font-mono text-[11px] font-bold text-green-400 leading-none tabular-nums">
              {best.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* HUD — leaderboard, with the player's live run slotted into it */}
      <div
        className="hidden sm:block absolute top-1/2 -translate-y-1/2 right-3 md:right-4 w-[112px] md:w-[130px] rounded-xl bg-black/50 backdrop-blur-sm border border-white/[0.08] p-2.5 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex items-center gap-1.5 mb-2.5">
          <Trophy size={9} className="text-green-400" />
          <span className="font-mono text-[8px] tracking-widest text-white/45">LIVE</span>
        </div>
        {board.map((row, i) => (
          <div key={row.you ? 'you' : `bot-${row.score}`} className="flex items-center gap-1.5 mb-1.5 last:mb-0">
            <span className={`font-mono text-[8px] ${row.you ? 'text-green-400' : 'text-white/30'}`}>
              {i + 1}
            </span>
            <span
              className={`w-3.5 h-3.5 rounded-full shrink-0 ${row.you ? 'bg-green-400/30' : 'bg-white/[0.09]'}`}
            />
            <span
              className={`font-mono text-[8px] tabular-nums ${row.you ? 'text-green-400' : 'text-white/35'}`}
            >
              {row.you ? 'YOU' : row.score.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* overlays */}
      <AnimatePresence>
        {status !== 'playing' && (
          <motion.div
            key={status}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#07080A]/55 backdrop-blur-[2px] pointer-events-none px-6 text-center"
          >
            {status === 'over' && (
              <>
                <p className="font-mono text-[9px] tracking-[0.3em] text-red-400/80 mb-2">RUN ENDED</p>
                <p className="font-heading text-2xl md:text-3xl font-bold text-white mb-1 tabular-nums">
                  {score.toLocaleString()}
                </p>
                <p className="font-mono text-[9px] text-white/45 mb-5">BEST {best.toLocaleString()}</p>
              </>
            )}
            {status === 'idle' && (
              <p className="font-heading text-lg md:text-xl font-bold text-white mb-2">
                {reduce ? 'Playable demo' : 'Jump the blocks.'}
              </p>
            )}
            <motion.span
              animate={reduce ? { opacity: 1 } : { opacity: [0.45, 1, 0.45] }}
              transition={reduce ? { duration: 0 } : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-green-400/40 bg-green-400/10 px-4 py-2 font-mono text-[9px] tracking-[0.2em] text-green-300"
            >
              {reduce ? 'MOTION DISABLED' : status === 'over' ? 'TAP TO RETRY' : 'TAP OR PRESS SPACE'}
            </motion.span>
            {status === 'idle' && !reduce && (
              <p className="mt-4 font-mono text-[8px] tracking-[0.16em] text-white/35">
                TAP AGAIN MID-AIR TO DOUBLE JUMP
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* The play surface. A real button, so Space and Enter work when it is
          focused and never when it is not. */}
      <button
        type="button"
        onClick={tap}
        disabled={reduce}
        aria-label={
          status === 'playing' ? 'Jump' : 'Play the runner demo'
        }
        className="absolute inset-0 z-30 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-inset disabled:cursor-default"
        style={{ touchAction: 'manipulation' }}
      />
    </div>
  );
};

/* Multiplayer is a backend problem before it is a gameplay feature. */
const LOBBY_PHASES = [
  ['READY', 'READY', 'PICKING', 'OPEN'],
  ['READY', 'READY', 'READY', 'OPEN'],
  ['READY', 'READY', 'READY', 'READY'],
  ['READY', 'READY', 'READY', 'READY'],
  ['READY', 'READY', 'READY', 'READY'],
];

export const LobbyCard = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-12%' });
  const reduce = useReducedMotion();
  const live = inView && !reduce;

  const [phase, setPhase] = useState(0);
  const [ping, setPing] = useState(42);

  useEffect(() => {
    if (!live) return undefined;
    const id = setInterval(() => setPhase((p) => (p + 1) % LOBBY_PHASES.length), 1700);
    return () => clearInterval(id);
  }, [live]);

  useEffect(() => {
    if (!live) return undefined;
    const id = setInterval(() => setPing(38 + Math.floor(Math.random() * 14)), 1200);
    return () => clearInterval(id);
  }, [live]);

  const states = LOBBY_PHASES[phase];
  const countdown = phase >= 2 ? 5 - phase : null;

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[10px] tracking-[0.2em] text-white/45">MATCH LOBBY</p>
        <span className="inline-flex items-center gap-1.5">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            animate={live ? { opacity: [1, 0.35, 1] } : { opacity: 1 }}
            transition={live ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
          />
          <AnimatePresence mode="wait">
            <motion.span
              key={countdown === null ? 'sync' : 'start'}
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-[9px] text-green-400 tabular-nums"
            >
              {countdown === null ? `SYNCED · ${ping}ms` : `STARTING IN ${countdown}`}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {states.map((state, i) => {
          const isReady = state === 'READY';
          return (
            <motion.div
              key={i}
              animate={{
                borderColor: isReady ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.1)',
                backgroundColor: isReady ? 'rgba(74,222,128,0.07)' : 'rgba(255,255,255,0.02)',
              }}
              transition={{ duration: 0.35 }}
              className="rounded-xl border p-2.5 text-center"
            >
              <motion.span
                animate={{ backgroundColor: isReady ? 'rgba(74,222,128,0.25)' : 'rgba(255,255,255,0.07)' }}
                transition={{ duration: 0.35 }}
                className="block w-6 h-6 rounded-full mx-auto mb-2"
              />
              <p className="font-mono text-[9px] text-white/55 leading-none mb-1">P{i + 1}</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={state}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className={`font-mono text-[7px] leading-none ${isReady ? 'text-green-400' : 'text-white/30'}`}
                >
                  {state}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
