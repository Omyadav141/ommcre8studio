import type { SVGProps } from "react";

// Accent colors matching Accenture vector aesthetic
const PURPLE = "#A855F7";
const PURPLE_DEEP = "#9333EA";
const PURPLE_GLOW = "#C084FC";
const WHITE = "#FFFFFF";
const WHITE_MUTED = "rgba(255, 255, 255, 0.4)";
const STROKE_COLOR = "#FFFFFF";

/**
 * Homepage Hero Illustration:
 * Accenture-style isometric architectural vector line art depicting
 * digital engineering, cinema production, robotic camera rig, and creative craftsmanship.
 */
export function HeroIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 620 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-[560px] mx-auto select-none"
      {...props}
    >
      <defs>
        {/* Glow filter for Accenture purple elements */}
        <filter id="purple-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="purple-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7E22CE" />
        </linearGradient>
        <linearGradient id="screen-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#581C87" />
        </linearGradient>
      </defs>

      {/* Background ambient technical grid / coordinates */}
      <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
        <line x1="40" y1="460" x2="580" y2="460" />
        <line x1="80" y1="360" x2="540" y2="360" />
        <line x1="120" y1="200" x2="500" y2="200" />
        <circle cx="530" cy="90" r="3" fill="rgba(255,255,255,0.2)" />
        <circle cx="90" cy="140" r="3" fill="rgba(255,255,255,0.2)" />
        <circle cx="560" cy="400" r="3" fill="rgba(255,255,255,0.2)" />
      </g>

      {/* Floating technical coordinates / tags */}
      <text x="70" y="50" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="monospace" letterSpacing="2">
        SYS.ENGINEERING // 01
      </text>
      <text x="440" y="50" fill={PURPLE_GLOW} fontSize="9" fontFamily="monospace" letterSpacing="2">
        CINEMA.NODE // 4K
      </text>

      {/* ============================================================== */}
      {/* 1. UPPER GANTRY / CONVEYOR SYSTEM (Accenture style top bridge) */}
      {/* ============================================================== */}
      {/* Structural beam across the top */}
      <rect x="180" y="110" width="370" height="14" rx="3" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <line x1="240" y1="110" x2="240" y2="124" stroke={STROKE_COLOR} strokeWidth="1.5" />
      <line x1="320" y1="110" x2="320" y2="124" stroke={STROKE_COLOR} strokeWidth="1.5" />
      <line x1="400" y1="110" x2="400" y2="124" stroke={STROKE_COLOR} strokeWidth="1.5" />
      <line x1="480" y1="110" x2="480" y2="124" stroke={STROKE_COLOR} strokeWidth="1.5" />

      {/* Support pillars descending from gantry */}
      <path d="M 520 124 L 520 260 L 512 260 L 512 124" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <path d="M 210 124 L 210 210 L 202 210 L 202 124" stroke={STROKE_COLOR} strokeWidth="1.8" />

      {/* Upper Inspector / Director character on the platform */}
      {/* Safety Hard-Hat in vibrant purple (Accenture signature) */}
      <path
        d="M 430 76 C 430 52 468 52 468 76 Z"
        fill={PURPLE}
        stroke={STROKE_COLOR}
        strokeWidth="1.8"
      />
      <rect x="424" y="74" width="50" height="6" rx="2" fill={PURPLE} stroke={STROKE_COLOR} strokeWidth="1.5" />
      {/* Face contour */}
      <path d="M 436 80 L 436 94 C 436 100 442 104 448 104 L 454 104 C 460 104 466 100 466 94 L 466 80" stroke={STROKE_COLOR} strokeWidth="1.8" />
      {/* Eye / profile feature */}
      <circle cx="444" cy="88" r="1.5" fill={WHITE} />
      {/* Body / Shoulders */}
      <path d="M 426 110 L 426 102 C 426 97 435 96 448 96 C 461 96 470 97 470 102 L 470 110" stroke={STROKE_COLOR} strokeWidth="1.8" />
      {/* Digital Clipboard with glowing purple screen */}
      <rect x="372" y="80" width="38" height="50" rx="3" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0D0F14" />
      <rect x="378" y="86" width="26" height="36" rx="2" fill="url(#screen-grad)" filter="url(#purple-glow)" opacity="0.9" />
      {/* Clipboard clamp */}
      <rect x="384" y="76" width="14" height="6" rx="2" stroke={STROKE_COLOR} strokeWidth="1.5" fill={WHITE} />
      {/* Arm holding clipboard */}
      <path d="M 426 104 L 406 104 L 406 110" stroke={STROKE_COLOR} strokeWidth="1.8" />

      {/* Conveyor belt module on gantry */}
      <rect x="250" y="94" width="32" height="16" rx="2" stroke={STROKE_COLOR} strokeWidth="1.8" fill={PURPLE} />
      <circle cx="260" cy="102" r="3" fill={WHITE} />
      <circle cx="272" cy="102" r="3" fill={WHITE} />

      {/* ============================================================== */}
      {/* 2. ARTICULATED ROBOTIC CINEMA CAMERA RIG (Center-Left)        */}
      {/* ============================================================== */}
      {/* Base on floor */}
      <rect x="130" y="440" width="80" height="20" rx="4" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <line x1="145" y1="460" x2="145" y2="475" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <line x1="195" y1="460" x2="195" y2="475" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <rect x="120" y="475" width="100" height="10" rx="2" stroke={STROKE_COLOR} strokeWidth="1.8" />

      {/* Joint 1 (Base pivot) */}
      <circle cx="170" cy="426" r="14" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <circle cx="170" cy="426" r="6" fill={PURPLE} />

      {/* Arm segment 1 (Ascending diagonal) */}
      <path d="M 163 416 L 203 294 L 219 299 L 179 421 Z" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0D0F14" />
      {/* Hydraulic piston cylinder */}
      <path d="M 185 410 L 225 330" stroke={STROKE_COLOR} strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Joint 2 (Elbow) */}
      <circle cx="211" cy="296" r="16" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <circle cx="211" cy="296" r="7" fill={PURPLE} />

      {/* Arm segment 2 (Extending forward) */}
      <path d="M 221 286 L 315 224 L 324 237 L 230 299 Z" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0D0F14" />

      {/* Joint 3 (Wrist gimbal) */}
      <circle cx="320" cy="230" r="12" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <circle cx="320" cy="230" r="5" fill={PURPLE_GLOW} />

      {/* Cinema Camera assembly mounted on robotic wrist */}
      {/* Camera Body */}
      <rect x="330" y="206" width="56" height="42" rx="4" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#090B0E" />
      {/* Top handle */}
      <path d="M 342 206 L 342 194 L 374 194 L 374 206" stroke={STROKE_COLOR} strokeWidth="1.8" />
      {/* Lens with matte box hood */}
      <polygon points="386,214 426,204 426,248 386,238" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0D0F14" />
      {/* Lens core glowing accent */}
      <circle cx="406" cy="226" r="7" fill={PURPLE} opacity="0.8" />
      <circle cx="406" cy="226" r="3" fill={WHITE} />
      {/* Side monitor on camera displaying purple timeline */}
      <rect x="334" y="214" width="24" height="18" rx="2" fill="url(#screen-grad)" stroke={STROKE_COLOR} strokeWidth="1" />
      {/* Recording tally light */}
      <circle cx="380" cy="212" r="3" fill="#EF4444" />

      {/* ============================================================== */}
      {/* 3. ARCHITECT / ENGINEER WORKSTATION (Om Yadav & Software Craft)*/}
      {/* ============================================================== */}
      {/* Modern floating architectural desk */}
      <rect x="330" y="380" width="220" height="12" rx="3" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0F1218" />
      {/* Desk angled legs */}
      <line x1="350" y1="392" x2="340" y2="480" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <line x1="530" y1="392" x2="540" y2="480" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <line x1="340" y1="480" x2="360" y2="480" stroke={STROKE_COLOR} strokeWidth="2" />
      <line x1="520" y1="480" x2="540" y2="480" stroke={STROKE_COLOR} strokeWidth="2" />

      {/* Main Ultra-wide Workstation Display */}
      <rect x="360" y="290" width="94" height="66" rx="4" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0A0C10" />
      <rect x="366" y="296" width="82" height="54" rx="2" fill="url(#screen-grad)" filter="url(#purple-glow)" opacity="0.85" />
      {/* Code syntax lines inside screen */}
      <line x1="372" y1="306" x2="400" y2="306" stroke={WHITE} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="372" y1="316" x2="428" y2="316" stroke={WHITE} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <line x1="382" y1="326" x2="436" y2="326" stroke={WHITE} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <line x1="372" y1="336" x2="410" y2="336" stroke={WHITE} strokeWidth="1.5" strokeLinecap="round" />
      {/* Display stand */}
      <path d="M 402 356 L 402 380 L 412 380 L 412 356" stroke={STROKE_COLOR} strokeWidth="1.5" />
      <rect x="394" y="378" width="26" height="3" rx="1.5" stroke={STROKE_COLOR} strokeWidth="1" fill={WHITE} />

      {/* Second Display (Vertical/Mobile preview) */}
      <rect x="466" y="280" width="46" height="78" rx="4" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0A0C10" />
      <rect x="470" y="284" width="38" height="70" rx="2" fill="#090B0E" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      {/* 9:16 Reel preview video waveform inside vertical display */}
      <rect x="474" y="292" width="30" height="38" rx="2" fill={PURPLE} opacity="0.4" />
      <circle cx="489" cy="311" r="5" fill={PURPLE_GLOW} />
      <line x1="474" y1="336" x2="498" y2="336" stroke={WHITE} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="474" y1="344" x2="490" y2="344" stroke={PURPLE_GLOW} strokeWidth="1.5" strokeLinecap="round" />
      {/* Stand */}
      <line x1="489" y1="358" x2="489" y2="380" stroke={STROKE_COLOR} strokeWidth="1.5" />

      {/* Engineer / Craftsman (Om Yadav character) seated at desk */}
      {/* Head / Hair */}
      <circle cx="430" cy="380" r="14" stroke={STROKE_COLOR} strokeWidth="1.8" />
      {/* Clean glasses */}
      <rect x="432" y="377" width="10" height="6" rx="2" stroke={STROKE_COLOR} strokeWidth="1.2" fill={PURPLE} />
      {/* Torso / Jacket */}
      <path d="M 416 394 L 416 460 C 416 464 422 466 430 466 C 438 466 444 464 444 460 L 444 394" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0D0F14" />
      {/* Arms reaching to keyboard */}
      <path d="M 420 404 L 396 404 L 388 388" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <path d="M 438 404 L 416 404 L 406 388" stroke={STROKE_COLOR} strokeWidth="1.8" />
      {/* Keyboard on desk */}
      <rect x="380" y="382" width="36" height="5" rx="1.5" stroke={STROKE_COLOR} strokeWidth="1.2" fill="#1A1D24" />

      {/* Ergonomic task chair */}
      {/* Chair back */}
      <path d="M 406 396 L 406 450" stroke={STROKE_COLOR} strokeWidth="3" strokeLinecap="round" />
      {/* Chair base & wheels */}
      <line x1="424" y1="466" x2="424" y2="490" stroke={STROKE_COLOR} strokeWidth="2" />
      <line x1="404" y1="490" x2="444" y2="490" stroke={STROKE_COLOR} strokeWidth="2" />
      <circle cx="404" cy="492" r="2.5" fill={WHITE} />
      <circle cx="444" cy="492" r="2.5" fill={WHITE} />

      {/* Coffee mug with rising steam lines */}
      <rect x="344" y="370" width="10" height="11" rx="2" stroke={STROKE_COLOR} strokeWidth="1.2" fill="#1E232D" />
      <path d="M 354 373 C 357 373 357 378 354 378" stroke={STROKE_COLOR} strokeWidth="1.2" />
      <path d="M 347 366 C 347 363 350 361 350 358" stroke={WHITE} strokeWidth="1" strokeLinecap="round" opacity="0.6" />

      {/* Architectural Potted Plant on desk/floor (Accenture signature) */}
      <path d="M 520 440 L 526 480 L 550 480 L 556 440 Z" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0D0F14" />
      {/* Plant leaves */}
      <path d="M 538 440 C 538 410 520 414 520 400 C 530 400 538 420 538 440 Z" stroke={STROKE_COLOR} strokeWidth="1.5" fill={PURPLE} opacity="0.7" />
      <path d="M 538 440 C 538 404 554 408 554 394 C 544 394 538 414 538 440 Z" stroke={STROKE_COLOR} strokeWidth="1.5" fill={PURPLE} opacity="0.7" />
      <path d="M 538 440 C 538 390 538 380 538 380 C 538 380 542 410 538 440 Z" stroke={STROKE_COLOR} strokeWidth="1.8" />

      {/* ============================================================== */}
      {/* 4. CREATIVE SCIENTIST / RESEARCHER (Left character with flask)*/}
      {/* ============================================================== */}
      {/* Technologist in lab coat / creative apron */}
      {/* Hair bun and glasses */}
      <circle cx="86" cy="268" r="5" stroke={STROKE_COLOR} strokeWidth="1.5" />
      <circle cx="96" cy="282" r="13" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <circle cx="102" cy="280" r="3" stroke={STROKE_COLOR} strokeWidth="1.2" fill={PURPLE} />
      {/* Coat / body */}
      <path d="M 82 295 L 74 380 L 114 380 L 108 295 Z" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0D0F14" />
      {/* Legs */}
      <line x1="84" y1="380" x2="84" y2="440" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <line x1="104" y1="380" x2="104" y2="440" stroke={STROKE_COLOR} strokeWidth="1.8" />
      {/* Shoes */}
      <rect x="76" y="440" width="16" height="6" rx="2" stroke={STROKE_COLOR} strokeWidth="1.5" />
      <rect x="98" y="440" width="16" height="6" rx="2" stroke={STROKE_COLOR} strokeWidth="1.5" />

      {/* Left arm holding chemical / innovation flask with glowing purple liquid */}
      <path d="M 94 305 L 120 305 L 126 320" stroke={STROKE_COLOR} strokeWidth="1.8" />
      {/* Erlenmeyer Flask */}
      <path d="M 124 316 L 128 316 L 128 322 L 138 338 C 140 342 136 346 130 346 L 122 346 C 116 346 112 342 114 338 L 124 322 Z" stroke={STROKE_COLOR} strokeWidth="1.5" fill="#0A0C10" />
      {/* Purple glowing liquid inside flask */}
      <path d="M 116 335 L 136 335 C 137 337 136 344 130 344 L 122 344 C 116 344 115 337 116 335 Z" fill={PURPLE} filter="url(#purple-glow)" />
      {/* Bubbles rising */}
      <circle cx="126" cy="328" r="1.5" fill={WHITE} />
      <circle cx="124" cy="324" r="1" fill={WHITE} />

      {/* ============================================================== */}
      {/* 5. METRIC TOKENS & FLOATING CODE SCHEMATICS                   */}
      {/* ============================================================== */}
      {/* Performance speed badge floating near top right */}
      <g transform="translate(480, 160)">
        <rect x="0" y="0" width="94" height="42" rx="8" stroke={STROKE_COLOR} strokeWidth="1.5" fill="#0D0F14" />
        <text x="12" y="18" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">LCP SPEED</text>
        <text x="12" y="34" fill={PURPLE_GLOW} fontSize="14" fontWeight="bold" fontFamily="monospace">&lt; 0.8s</text>
        <circle cx="80" cy="18" r="4" fill={PURPLE} />
      </g>

      {/* Conversion increase metric badge floating near center left */}
      <g transform="translate(60, 160)">
        <rect x="0" y="0" width="104" height="42" rx="8" stroke={STROKE_COLOR} strokeWidth="1.5" fill="#0D0F14" />
        <text x="12" y="18" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">INQUIRY FUNNEL</text>
        <text x="12" y="34" fill={WHITE} fontSize="14" fontWeight="bold" fontFamily="monospace">+44% CONV</text>
        <polygon points="86,22 92,28 80,28" fill={PURPLE} />
      </g>
    </svg>
  );
}

/**
 * Services Page Illustration:
 * Full-stack software architecture, cloud microservices, and design systems.
 */
export function ServicesIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 540 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-[480px] mx-auto select-none"
      {...props}
    >
      <defs>
        <filter id="serv-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Isometric Grid Floor */}
      <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
        <line x1="40" y1="340" x2="500" y2="340" />
        <line x1="100" y1="280" x2="440" y2="280" />
      </g>

      {/* Tier 1: Cloud & Database Foundation (Bottom stack) */}
      <rect x="150" y="270" width="240" height="44" rx="6" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0A0C10" />
      <circle cx="175" cy="292" r="5" fill={PURPLE} filter="url(#serv-glow)" />
      <circle cx="195" cy="292" r="5" fill={WHITE} opacity="0.4" />
      <circle cx="215" cy="292" r="5" fill={WHITE} opacity="0.4" />
      <line x1="250" y1="292" x2="360" y2="292" stroke={WHITE} strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Tier 2: API & Application Engine (Middle stack) */}
      <rect x="170" y="200" width="200" height="44" rx="6" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0F1218" />
      <rect x="186" y="214" width="36" height="16" rx="3" fill={PURPLE} />
      <text x="192" y="226" fill={WHITE} fontSize="9" fontWeight="bold" fontFamily="monospace">API</text>
      <line x1="236" y1="222" x2="340" y2="222" stroke={WHITE} strokeWidth="1.5" strokeLinecap="round" />

      {/* Tier 3: High-Craft UI & Design Systems (Top stack) */}
      <rect x="190" y="130" width="160" height="44" rx="6" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#141720" />
      <rect x="206" y="144" width="20" height="16" rx="2" stroke={STROKE_COLOR} strokeWidth="1.2" fill={PURPLE} />
      <line x1="236" y1="148" x2="320" y2="148" stroke={WHITE} strokeWidth="1.5" />
      <line x1="236" y1="156" x2="290" y2="156" stroke={PURPLE_GLOW} strokeWidth="1.5" />

      {/* Connecting Vertical Data Conduits */}
      <line x1="270" y1="174" x2="270" y2="200" stroke={PURPLE} strokeWidth="2" strokeDasharray="3 3" />
      <line x1="270" y1="244" x2="270" y2="270" stroke={PURPLE} strokeWidth="2" strokeDasharray="3 3" />

      {/* Robotic Placement Arm (Right) */}
      <circle cx="430" cy="210" r="12" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <circle cx="430" cy="210" r="5" fill={PURPLE} />
      <path d="M 424 200 L 380 152 L 366 156" stroke={STROKE_COLOR} strokeWidth="1.8" />
      {/* Precision gripper placing token */}
      <rect x="350" y="148" width="16" height="12" rx="2" fill={PURPLE} stroke={STROKE_COLOR} strokeWidth="1.2" />

      {/* Architect with Diagnostic Tablet (Left) */}
      <circle cx="95" cy="190" r="11" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <path d="M 85 186 C 85 174 105 174 105 186" fill={PURPLE} stroke={STROKE_COLOR} strokeWidth="1.5" />
      <path d="M 85 201 L 76 270 L 114 270 L 105 201 Z" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0D0F14" />
      <rect x="110" y="210" width="28" height="38" rx="2" stroke={STROKE_COLOR} strokeWidth="1.5" fill="#090B0E" />
      <rect x="114" y="216" width="20" height="26" rx="1.5" fill={PURPLE} opacity="0.8" />
    </svg>
  );
}

/**
 * Production Page Illustration:
 * Cinema cameras, directional studio lighting, DaVinci Resolve color console, and sound engineering.
 */
export function ProductionIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 540 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-[480px] mx-auto select-none"
      {...props}
    >
      <defs>
        <filter id="prod-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Floor line */}
      <line x1="30" y1="360" x2="510" y2="360" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

      {/* 1. Heavy Cinema Camera on Pedestal Tripod (Left-Center) */}
      {/* Tripod legs */}
      <line x1="180" y1="260" x2="110" y2="360" stroke={STROKE_COLOR} strokeWidth="2" />
      <line x1="180" y1="260" x2="180" y2="360" stroke={STROKE_COLOR} strokeWidth="2" />
      <line x1="180" y1="260" x2="250" y2="360" stroke={STROKE_COLOR} strokeWidth="2" />
      <circle cx="180" cy="254" r="10" stroke={STROKE_COLOR} strokeWidth="1.8" />

      {/* Camera Body */}
      <rect x="144" y="184" width="72" height="52" rx="4" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0A0C10" />
      {/* Top Handle */}
      <path d="M 160 184 L 160 170 L 202 170 L 202 184" stroke={STROKE_COLOR} strokeWidth="1.8" />
      {/* Matte box & Anamorphic Lens */}
      <polygon points="216,192 264,178 264,242 216,228" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0D0F14" />
      <circle cx="240" cy="210" r="10" fill={PURPLE} filter="url(#prod-glow)" opacity="0.85" />
      <circle cx="240" cy="210" r="4" fill={WHITE} />
      {/* Studio Tally indicator light */}
      <circle cx="210" cy="192" r="3" fill="#EF4444" />
      {/* High-nit Director Monitor */}
      <rect x="130" y="194" width="22" height="32" rx="2" stroke={STROKE_COLOR} strokeWidth="1.2" fill={PURPLE} opacity="0.9" />

      {/* 2. Professional Studio Softbox Light on C-Stand (Right) */}
      <line x1="430" y1="120" x2="430" y2="360" stroke={STROKE_COLOR} strokeWidth="2" />
      <line x1="430" y1="360" x2="390" y2="370" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <line x1="430" y1="360" x2="470" y2="370" stroke={STROKE_COLOR} strokeWidth="1.8" />
      {/* Softbox Hood */}
      <polygon points="400,90 460,90 490,150 370,150" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0F1218" />
      {/* Diffuser face with purple ambient glow */}
      <line x1="374" y1="148" x2="486" y2="148" stroke={PURPLE_GLOW} strokeWidth="3" filter="url(#prod-glow)" />

      {/* 3. DaVinci Resolve Color Console Desk (Foreground) */}
      <rect x="250" y="290" width="140" height="34" rx="4" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0D0F14" />
      {/* 3 Color Trackballs with glowing purple rings */}
      <circle cx="276" cy="307" r="10" stroke={STROKE_COLOR} strokeWidth="1.5" />
      <circle cx="276" cy="307" r="5" fill={PURPLE} />
      <circle cx="320" cy="307" r="10" stroke={STROKE_COLOR} strokeWidth="1.5" />
      <circle cx="320" cy="307" r="5" fill={PURPLE} />
      <circle cx="364" cy="307" r="10" stroke={STROKE_COLOR} strokeWidth="1.5" />
      <circle cx="364" cy="307" r="5" fill={PURPLE} />

      {/* Clapperboard floating top left */}
      <g transform="translate(60, 90)">
        <rect x="0" y="16" width="64" height="42" rx="3" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0D0F14" />
        <rect x="0" y="0" width="64" height="16" rx="2" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#141720" />
        {/* Slanted chevron stripes */}
        <line x1="12" y1="0" x2="22" y2="16" stroke={PURPLE} strokeWidth="2.5" />
        <line x1="32" y1="0" x2="42" y2="16" stroke={PURPLE} strokeWidth="2.5" />
        <line x1="52" y1="0" x2="62" y2="16" stroke={PURPLE} strokeWidth="2.5" />
        <text x="10" y="36" fill={WHITE} fontSize="8" fontFamily="monospace" fontWeight="bold">TAKE 01</text>
        <text x="10" y="48" fill={PURPLE_GLOW} fontSize="8" fontFamily="monospace">4K CINEMA</text>
      </g>
    </svg>
  );
}

/**
 * About Page Illustration:
 * Atelier workspace of founder Om Yadav, multi-display architecture, and direct craftsmanship.
 */
export function AboutIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 540 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-[480px] mx-auto select-none"
      {...props}
    >
      <defs>
        <filter id="about-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Floor */}
      <line x1="40" y1="360" x2="500" y2="360" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

      {/* Bookshelf / studio hardware rack (Left) */}
      <rect x="60" y="120" width="80" height="240" rx="3" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0A0C10" />
      <line x1="60" y1="180" x2="140" y2="180" stroke={STROKE_COLOR} strokeWidth="1.5" />
      <line x1="60" y1="240" x2="140" y2="240" stroke={STROKE_COLOR} strokeWidth="1.5" />
      <line x1="60" y1="300" x2="140" y2="300" stroke={STROKE_COLOR} strokeWidth="1.5" />
      {/* Design monographs / film awards on shelf */}
      <rect x="74" y="146" width="12" height="34" rx="1.5" fill={PURPLE} stroke={STROKE_COLOR} strokeWidth="1" />
      <rect x="90" y="140" width="14" height="40" rx="1.5" fill="#181B22" stroke={STROKE_COLOR} strokeWidth="1" />
      <circle cx="100" cy="215" r="12" stroke={STROKE_COLOR} strokeWidth="1.2" fill={PURPLE} opacity="0.6" />

      {/* Architectural Studio Desk (Center-Right) */}
      <rect x="180" y="270" width="280" height="14" rx="3" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0D0F14" />
      <line x1="200" y1="284" x2="190" y2="360" stroke={STROKE_COLOR} strokeWidth="1.8" />
      <line x1="440" y1="284" x2="450" y2="360" stroke={STROKE_COLOR} strokeWidth="1.8" />

      {/* Main Studio Console Monitor */}
      <rect x="230" y="160" width="120" height="84" rx="4" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#090B0E" />
      <rect x="238" y="168" width="104" height="68" rx="2" fill={PURPLE} opacity="0.8" filter="url(#about-glow)" />
      {/* Stand */}
      <line x1="290" y1="244" x2="290" y2="270" stroke={STROKE_COLOR} strokeWidth="2" />
      <line x1="274" y1="270" x2="306" y2="270" stroke={STROKE_COLOR} strokeWidth="2" />

      {/* Founder Om Yadav seated in task chair */}
      <circle cx="380" cy="220" r="16" stroke={STROKE_COLOR} strokeWidth="1.8" />
      {/* Modern specs */}
      <rect x="382" y="217" width="12" height="7" rx="2" stroke={STROKE_COLOR} strokeWidth="1.2" fill={PURPLE} />
      {/* Body */}
      <path d="M 362 236 L 362 310 C 362 316 370 320 380 320 C 390 320 398 316 398 310 L 398 236" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0F1218" />
      {/* Chair */}
      <line x1="380" y1="320" x2="380" y2="360" stroke={STROKE_COLOR} strokeWidth="2.5" />
      <line x1="360" y1="360" x2="400" y2="360" stroke={STROKE_COLOR} strokeWidth="2.5" />

      {/* Architectural Desk Lamp with cone of light */}
      <line x1="200" y1="270" x2="210" y2="210" stroke={STROKE_COLOR} strokeWidth="1.5" />
      <line x1="210" y1="210" x2="226" y2="216" stroke={STROKE_COLOR} strokeWidth="1.5" />
      <polygon points="220,210 236,216 230,224" stroke={STROKE_COLOR} strokeWidth="1.5" fill={PURPLE} />
    </svg>
  );
}

/**
 * Work / Flagship Showcase Page Illustration:
 * Launching digital products, mobile responsive viewports, and high-conversion metrics.
 */
export function WorkIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 540 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-[480px] mx-auto select-none"
      {...props}
    >
      <defs>
        <filter id="work-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Floating Flagship Platform Window (True Legal Advice reference) */}
      <rect x="80" y="80" width="280" height="180" rx="6" stroke={STROKE_COLOR} strokeWidth="1.8" fill="#0A0C10" />
      {/* Window header */}
      <rect x="80" y="80" width="280" height="24" rx="6" stroke={STROKE_COLOR} strokeWidth="1.5" fill="#12151C" />
      <circle cx="94" cy="92" r="3" fill="#EF4444" />
      <circle cx="104" cy="92" r="3" fill="#F59E0B" />
      <circle cx="114" cy="92" r="3" fill="#10B981" />
      <text x="130" y="95" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">trulegaladvice.com</text>

      {/* Hero content within preview */}
      <rect x="96" y="116" width="140" height="14" rx="2" fill={PURPLE} filter="url(#work-glow)" opacity="0.9" />
      <rect x="96" y="136" width="248" height="6" rx="2" fill={WHITE} opacity="0.3" />
      <rect x="96" y="148" width="190" height="6" rx="2" fill={WHITE} opacity="0.2" />

      {/* Practice area cards inside window */}
      <rect x="96" y="170" width="76" height="70" rx="4" stroke={STROKE_COLOR} strokeWidth="1.2" fill="#0F1218" />
      <rect x="182" y="170" width="76" height="70" rx="4" stroke={STROKE_COLOR} strokeWidth="1.2" fill="#0F1218" />
      <rect x="268" y="170" width="76" height="70" rx="4" stroke={STROKE_COLOR} strokeWidth="1.2" fill="#0F1218" />
      <circle cx="134" cy="195" r="8" fill={PURPLE} opacity="0.7" />
      <circle cx="220" cy="195" r="8" fill={PURPLE} opacity="0.7" />
      <circle cx="306" cy="195" r="8" fill={PURPLE} opacity="0.7" />

      {/* Floating 9:16 Viral Reel Phone (Right) */}
      <rect x="330" y="150" width="130" height="210" rx="16" stroke={STROKE_COLOR} strokeWidth="2" fill="#08090B" />
      <rect x="338" y="160" width="114" height="190" rx="10" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="#0E1015" />
      {/* Video frame with glowing play button */}
      <circle cx="395" cy="245" r="16" fill={PURPLE} filter="url(#work-glow)" />
      <polygon points="392,238 402,245 392,252" fill={WHITE} />
      <text x="350" y="320" fill={WHITE} fontSize="9" fontWeight="bold" fontFamily="monospace">992K VIEWS</text>
      <text x="350" y="334" fill={PURPLE_GLOW} fontSize="8" fontFamily="monospace">VIRAL REEL</text>
    </svg>
  );
}
