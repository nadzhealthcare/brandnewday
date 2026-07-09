"use client";

// 2D map clip: a car drives a route to the pinned destination, leaving a
// glowing trail. Pure inline SVG + SMIL so it scales with the card and needs
// no JS timers.
export default function CarRouteClip() {
  const ROUTE = "M30 192 L90 192 L90 120 L190 120 L190 60 L252 60";
  const DUR = "6s";

  return (
    <svg
      viewBox="0 0 300 225"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="A car driving to the pinned home location"
    >
      <defs>
        <linearGradient id="crBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a1620" />
          <stop offset="1" stopColor="#1d090d" />
        </linearGradient>
        <radialGradient id="crBeam" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe6a3" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffe6a3" stopOpacity="0" />
        </radialGradient>
        <filter id="crGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
      </defs>

      {/* map background */}
      <rect width="300" height="225" fill="url(#crBg)" />

      {/* road grid */}
      <g stroke="#55232f" strokeWidth="9" strokeLinecap="round">
        <line x1="-5" y1="60" x2="305" y2="60" />
        <line x1="-5" y1="120" x2="305" y2="120" />
        <line x1="-5" y1="192" x2="305" y2="192" />
        <line x1="90" y1="-5" x2="90" y2="230" />
        <line x1="190" y1="-5" x2="190" y2="230" />
        <line x1="252" y1="-5" x2="252" y2="230" />
      </g>
      <g stroke="#4a1d28" strokeWidth="5" strokeLinecap="round" opacity="0.7">
        <line x1="-5" y1="28" x2="305" y2="28" />
        <line x1="-5" y1="160" x2="305" y2="160" />
        <line x1="40" y1="-5" x2="40" y2="230" />
        <line x1="140" y1="-5" x2="140" y2="230" />
      </g>
      {/* lane dashes */}
      <g stroke="#e9d6b0" strokeWidth="1" strokeDasharray="4 7" opacity="0.18">
        <line x1="-5" y1="120" x2="305" y2="120" />
        <line x1="190" y1="-5" x2="190" y2="230" />
      </g>

      {/* faint full route */}
      <path d={ROUTE} fill="none" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

      {/* glowing traveled trail */}
      <path
        d={ROUTE}
        pathLength={100}
        fill="none"
        stroke="#f7d774"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#crGlow)"
        strokeDasharray="100"
      >
        <animate attributeName="stroke-dashoffset" values="100;0;0" keyTimes="0;0.8;1" dur={DUR} repeatCount="indefinite" />
      </path>
      <path
        d={ROUTE}
        pathLength={100}
        fill="none"
        stroke="#ffe9a8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="100"
      >
        <animate attributeName="stroke-dashoffset" values="100;0;0" keyTimes="0;0.8;1" dur={DUR} repeatCount="indefinite" />
      </path>

      {/* destination pin */}
      <g transform="translate(252 60)">
        <circle r="6" fill="#f7d774" opacity="0.5">
          <animate attributeName="r" values="6;16;6" dur="1.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="1.6s" repeatCount="indefinite" />
        </circle>
        <path d="M0 -16 C7 -16 11 -11 11 -5 C11 3 0 12 0 12 C0 12 -11 3 -11 -5 C-11 -11 -7 -16 0 -16 Z" fill="#8a1524" stroke="#ffe9a8" strokeWidth="1.2" />
        <circle cy="-5" r="3.6" fill="#ffe9a8" />
      </g>

      {/* car (points +x; rotate=auto orients it along the route) */}
      <g>
        <ellipse cx="24" cy="0" rx="18" ry="8" fill="url(#crBeam)" />
        <rect x="-14" y="-8" width="28" height="16" rx="5" fill="#8a3145" stroke="#a94356" strokeWidth="0.8" />
        <rect x="-7" y="-6" width="13" height="12" rx="3" fill="#d69aa8" />
        <circle cx="12.5" cy="-4.5" r="2" fill="#fff2c8" />
        <circle cx="12.5" cy="4.5" r="2" fill="#fff2c8" />
        <animateMotion dur={DUR} repeatCount="indefinite" rotate="auto" keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="linear">
          <mpath href="#carpath" />
        </animateMotion>
      </g>

      {/* motion path reference for the car */}
      <path id="carpath" d={ROUTE} fill="none" stroke="none" />

      {/* status badge */}
      <g>
        <rect x="10" y="10" width="96" height="20" rx="10" fill="#000000" opacity="0.35" />
        <circle cx="22" cy="20" r="3.5" fill="#3ddc84">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <text x="31" y="24" fontSize="10" fill="#ffffff" fontFamily="sans-serif" fontWeight="600">
          Clinician en route
        </text>
      </g>
    </svg>
  );
}
