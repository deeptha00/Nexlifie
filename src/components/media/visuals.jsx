import {
  Bookmark, Grid3x3, Heart, Home, MessageCircle, Play, PlusSquare, Search, Send, User,
} from 'lucide-react';
import { BrowserFrame, PhoneFrame } from '../development/parts';

/**
 * Signature interface visuals for the Media page — mockups of the actual
 * deliverables (a feed, a campaign dashboard, a content calendar, a reel),
 * so the page shows the work instead of only describing it.
 *
 * Built on the same BrowserFrame / PhoneFrame chrome as the Development
 * page's visuals, for one consistent visual language site-wide. Every number
 * here is placeholder UI geometry, never a claimed result.
 */

/* ── Social: a feed built to be followed ──────────────────────────── */

export const SocialGrid = ({ className = '' }) => (
  <PhoneFrame className={className}>
    <div className="flex flex-col aspect-[9/19]" aria-hidden="true">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600/70 to-[#111111]/70" />
          <div>
            <div className="h-2 w-16 rounded-full bg-[#111111]/20 mb-1.5" />
            <div className="h-1.5 w-10 rounded-full bg-[#111111]/10" />
          </div>
        </div>
        <span className="rounded-lg bg-green-600 px-2.5 py-1.5 text-[8px] font-bold text-white leading-none">
          FOLLOW
        </span>
      </div>

      {/* stories */}
      <div className="flex items-center gap-2.5 px-4 pb-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`w-9 h-9 rounded-full shrink-0 ${
              i === 0 ? 'bg-white border-2 border-dashed border-[#111111]/20' : 'bg-gradient-to-br from-green-600/40 to-[#111111]/20 p-[2px]'
            }`}
          />
        ))}
      </div>

      {/* grid */}
      <div className="grid grid-cols-3 gap-[2px] flex-1">
        {[
          'from-green-600/25 to-[#111111]/10',
          'from-[#111111]/15 to-green-600/10',
          'from-green-600/35 to-[#111111]/15',
          'from-[#111111]/10 to-[#111111]/25',
          'from-green-600/20 to-[#111111]/20',
          'from-[#111111]/20 to-green-600/25',
          'from-green-600/15 to-[#111111]/10',
          'from-[#111111]/25 to-[#111111]/10',
          'from-green-600/30 to-[#111111]/15',
        ].map((grad, i) => (
          <div key={i} className={`relative aspect-square bg-gradient-to-br ${grad}`}>
            {(i === 1 || i === 5) && (
              <Play size={13} className="absolute top-1.5 right-1.5 text-white drop-shadow" fill="white" />
            )}
          </div>
        ))}
      </div>

      {/* tab bar */}
      <div className="flex items-center justify-around border-t border-[#111111]/8 px-4 py-3 bg-[#FBFBFA]">
        {[Home, Search, PlusSquare, Grid3x3, User].map((Icon, i) => (
          <Icon key={i} size={16} className={i === 0 ? 'text-green-600' : 'text-[#111111]/25'} />
        ))}
      </div>
    </div>
  </PhoneFrame>
);

/* ── Performance: judged on cost per lead, not likes ──────────────── */

export const CampaignDashboard = ({ className = '' }) => (
  <BrowserFrame label="ads.yourbrand.com/campaigns" className={className}>
    <div className="p-4 md:p-6" aria-hidden="true">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-[#111111] px-2.5 py-1.5 text-[9px] font-semibold text-white leading-none">
            Campaigns
          </span>
          <span className="rounded-lg px-2.5 py-1.5 text-[9px] font-medium text-[#111111]/40 leading-none">
            Ad sets
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-green-600/10 px-2.5 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
          <span className="font-mono text-[8px] font-semibold text-green-700 tracking-wide">LIVE</span>
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 md:gap-3 mb-4">
        {['Reach', 'Cost / lead', 'Conversions'].map((label, i) => (
          <div key={label} className="rounded-lg bg-[#111111]/[0.035] p-2.5 md:p-3">
            <p className="text-[8px] md:text-[9px] font-medium text-[#111111]/45 mb-2 leading-none">{label}</p>
            <div className="h-3 w-3/5 rounded-full bg-[#111111]/[0.16] mb-2" />
            <div className={`h-1.5 rounded-full ${i === 1 ? 'w-2/5 bg-green-600/50' : 'w-3/5 bg-[#111111]/12'}`} />
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-[#111111]/8 p-3 md:p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="h-2 w-16 rounded-full bg-[#111111]/12" />
          <div className="flex gap-1.5">
            <span className="w-8 h-4 rounded bg-green-600/15" />
            <span className="w-8 h-4 rounded bg-[#111111]/[0.06]" />
          </div>
        </div>
        <svg viewBox="0 0 280 64" className="w-full h-12 md:h-14">
          <defs>
            <linearGradient id="mediaAdsArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 L35,42 L70,46 L105,26 L140,32 L175,16 L210,22 L245,8 L280,14 L280,64 L0,64 Z"
            fill="url(#mediaAdsArea)"
          />
          <polyline
            points="0,50 35,42 70,46 105,26 140,32 175,16 210,22 245,8 280,14"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="rounded-lg border border-[#111111]/8 overflow-hidden">
        <div className="grid grid-cols-[1.6fr_0.8fr_0.8fr] gap-3 border-b border-[#111111]/8 bg-[#FBFBFA] px-3.5 py-2">
          {['Campaign', 'Channel', 'Status'].map((h) => (
            <span key={h} className="text-[8px] font-semibold uppercase tracking-wider text-[#111111]/40">
              {h}
            </span>
          ))}
        </div>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="grid grid-cols-[1.6fr_0.8fr_0.8fr] gap-3 items-center px-3.5 py-2.5 border-b border-[#111111]/5 last:border-b-0"
          >
            <div className="h-1.5 rounded-full bg-[#111111]/12" style={{ width: `${70 - i * 10}%` }} />
            <div className="h-1.5 w-2/3 rounded-full bg-[#111111]/[0.09]" />
            <span
              className={`justify-self-start rounded-md px-2 py-1 text-[7px] font-semibold leading-none ${
                i !== 2 ? 'bg-green-600/12 text-green-700' : 'bg-[#111111]/[0.06] text-[#111111]/45'
              }`}
            >
              {i !== 2 ? 'Active' : 'Paused'}
            </span>
          </div>
        ))}
      </div>
    </div>
  </BrowserFrame>
);

/* ── Content: planned weeks out, never a scramble on Monday ───────── */

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const calendarPosts = [
  { day: 0, label: 'Reel' },
  { day: 1, label: 'Post' },
  { day: 2, label: 'Story' },
  { day: 2, label: 'Ad' },
  { day: 4, label: 'Reel' },
  { day: 5, label: 'Post' },
];

export const ContentCalendarBoard = ({ className = '' }) => (
  <BrowserFrame label="planner.yourbrand.com/this-week" className={className}>
    <div className="p-4 md:p-6" aria-hidden="true">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-bold text-[#111111]">This week</p>
        <span className="rounded-md bg-[#111111]/[0.06] px-2.5 py-1.5 font-mono text-[8px] font-semibold text-[#111111]/50 leading-none">
          6 SCHEDULED
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 md:gap-2">
        {days.map((d, i) => (
          <div key={d} className="flex flex-col gap-1.5">
            <span className="text-center font-mono text-[8px] font-semibold text-[#111111]/35 tracking-wide">
              {d}
            </span>
            <div className="rounded-lg border border-[#111111]/8 bg-[#FBFBFA] min-h-[76px] md:min-h-[92px] p-1 md:p-1.5 flex flex-col gap-1">
              {calendarPosts
                .filter((p) => p.day === i)
                .map((p, j) => (
                  <span
                    key={j}
                    className={`rounded-md px-1 py-1.5 text-center text-[7px] md:text-[8px] font-semibold leading-none ${
                      j === 0 ? 'bg-green-600 text-white' : 'bg-[#111111]/[0.08] text-[#111111]/55'
                    }`}
                  >
                    {p.label}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </BrowserFrame>
);

/* ── Video: built for the scroll, not the boardroom ────────────────── */

export const ReelPlayer = ({ className = '' }) => (
  <PhoneFrame className={className}>
    <div className="relative flex flex-col aspect-[9/19] overflow-hidden bg-[#0E0F0E]" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 70% at 50% 100%, rgba(34,197,94,0.28) 0%, rgba(34,197,94,0.04) 45%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />

      {/* progress + badge */}
      <div className="relative z-10 px-3.5 pt-3.5">
        <div className="flex gap-1 mb-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-[2px] flex-1 rounded-full ${i === 1 ? 'bg-white' : 'bg-white/25'}`} />
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-sm px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="font-mono text-[8px] tracking-widest text-white/85">AI VIDEO</span>
        </span>
      </div>

      {/* play button */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <span className="w-14 h-14 rounded-full bg-white/12 backdrop-blur-sm border border-white/25 flex items-center justify-center">
          <Play size={20} className="text-white ml-0.5" fill="white" />
        </span>
      </div>

      {/* engagement rail */}
      <div className="absolute right-3 bottom-24 z-10 flex flex-col items-center gap-4">
        {[Heart, MessageCircle, Send, Bookmark].map((Icon, i) => (
          <span key={i} className="flex flex-col items-center gap-1">
            <Icon size={18} className="text-white/90" fill={i === 0 ? 'white' : 'none'} />
          </span>
        ))}
      </div>

      {/* caption */}
      <div className="relative z-10 px-3.5 pb-4">
        <div className="h-2 w-2/3 rounded-full bg-white/70 mb-2" />
        <div className="h-1.5 w-2/5 rounded-full bg-white/35" />
      </div>
    </div>
  </PhoneFrame>
);
