"use client";

// 2D clip: a doctor stands at the door and presses the bell; the button lights
// up and ring-waves radiate. Inline SVG + SMIL, scales with the card.
export default function DoorbellClip() {
  const DUR = "4s";
  // arm swings from resting (down) to pressing (reaching the bell) and back
  const armKeys = "0;0.26;0.48;0.66;1";
  const armVals =
    "74 147 124; 0 147 124; 0 147 124; 74 147 124; 74 147 124";

  return (
    <svg
      viewBox="0 0 300 225"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="A doctor pressing the doorbell at a home"
    >
      <defs>
        <linearGradient id="dbWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe6d4" />
          <stop offset="1" stopColor="#dcccae" />
        </linearGradient>
        <linearGradient id="dbDoor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7a2f3d" />
          <stop offset="1" stopColor="#571f2a" />
        </linearGradient>
        <radialGradient id="dbGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe08a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffe08a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* wall + floor */}
      <rect width="300" height="225" fill="url(#dbWall)" />
      <rect y="196" width="300" height="29" fill="#bda27c" />
      <rect y="196" width="300" height="3" fill="#a98c66" />
      {/* welcome mat */}
      <rect x="196" y="204" width="86" height="12" rx="2" fill="#8a1524" opacity="0.85" />

      {/* door */}
      <g>
        <rect x="196" y="40" width="90" height="158" rx="4" fill="#3b1620" />
        <rect x="200" y="44" width="82" height="152" rx="3" fill="url(#dbDoor)" />
        {/* panels */}
        <rect x="209" y="54" width="64" height="52" rx="3" fill="none" stroke="#4a1c26" strokeWidth="2" />
        <rect x="209" y="120" width="64" height="66" rx="3" fill="none" stroke="#4a1c26" strokeWidth="2" />
        {/* little window */}
        <rect x="221" y="60" width="40" height="26" rx="2" fill="#cfe0e6" opacity="0.55" />
        <line x1="241" y1="60" x2="241" y2="86" stroke="#4a1c26" strokeWidth="1.4" />
        {/* gold handle */}
        <circle cx="210" cy="124" r="3.4" fill="#e6b649" />
      </g>

      {/* doorbell on the wall */}
      <g>
        <rect x="171" y="86" width="14" height="26" rx="4" fill="#cabfa8" stroke="#a99a7c" strokeWidth="1" />
        {/* ring waves (only visible during the press) */}
        <g fill="none" stroke="#e0902a" strokeWidth="2" strokeLinecap="round">
          <circle cx="178" cy="99" r="6">
            <animate attributeName="r" values="2;2;7;15;15" keyTimes="0;0.26;0.36;0.5;1" dur={DUR} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0;0.9;0;0" keyTimes="0;0.26;0.34;0.5;1" dur={DUR} repeatCount="indefinite" />
          </circle>
          <circle cx="178" cy="99" r="6">
            <animate attributeName="r" values="2;2;2;10;20" keyTimes="0;0.3;0.36;0.5;1" dur={DUR} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0;0.8;0.2;0" keyTimes="0;0.3;0.4;0.5;1" dur={DUR} repeatCount="indefinite" />
          </circle>
        </g>
        {/* glow behind button on press */}
        <circle cx="178" cy="99" r="9" fill="url(#dbGlow)">
          <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.26;0.33;0.5;1" dur={DUR} repeatCount="indefinite" />
        </circle>
        {/* button */}
        <circle cx="178" cy="99" r="3.6" fill="#b9ad95">
          <animate attributeName="fill" values="#b9ad95;#b9ad95;#ffd24d;#b9ad95;#b9ad95" keyTimes="0;0.26;0.34;0.5;1" dur={DUR} repeatCount="indefinite" />
        </circle>
        {/* chime note */}
        <text x="168" y="80" fontSize="11" fill="#e0902a" fontFamily="sans-serif">
          ♪
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.28;0.36;0.46;0.6" dur={DUR} repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -2;0 -8;0 -12" keyTimes="0;0.28;0.36;0.46;0.6" dur={DUR} repeatCount="indefinite" />
        </text>
      </g>

      {/* doctor (front-facing, reaching toward the bell) */}
      <g>
        {/* legs + shoes — drawn first so the torso overlaps their tops */}
        <rect x="125" y="154" width="9" height="42" rx="3" fill="#3a3f4a" />
        <rect x="140" y="154" width="9" height="42" rx="3" fill="#3a3f4a" />
        <ellipse cx="129" cy="197" rx="8" ry="3.5" fill="#26262e" />
        <ellipse cx="145" cy="197" rx="8" ry="3.5" fill="#26262e" />

        {/* far arm hanging at the side, holding a medical bag */}
        <line x1="120" y1="126" x2="104" y2="152" stroke="#7a2f3d" strokeWidth="7" strokeLinecap="round" />
        <circle cx="103" cy="154" r="3" fill="#eebfa0" />
        <rect x="88" y="158" width="22" height="17" rx="3" fill="#5b3a2a" />
        <rect x="95" y="154" width="8" height="6" rx="2" fill="#4a2e20" />

        {/* neck — overlaps the torso top so there's no gap under the head */}
        <rect x="129" y="102" width="8" height="20" fill="#eebfa0" />

        {/* torso (scrubs) — overlaps neck top and leg tops */}
        <rect x="116" y="116" width="38" height="48" rx="9" fill="#7a2f3d" />
        {/* v-neck */}
        <path d="M128 116 l5 9 l5 -9 Z" fill="#eebfa0" />
        {/* stethoscope */}
        <path d="M126 118 q7 13 14 0" fill="none" stroke="#c9ccd2" strokeWidth="1.6" />
        <circle cx="140" cy="133" r="2" fill="#c9ccd2" />

        {/* head + hair (on top, overlapping the neck) */}
        <circle cx="133" cy="95" r="12" fill="#eebfa0" />
        <path d="M121 93 a12 12 0 0 1 24 0 q-4 -6 -12 -6 q-8 0 -12 6 Z" fill="#3a2a22" />

        {/* reaching arm — pivots at the right shoulder (147,124) */}
        <g>
          <animateTransform attributeName="transform" type="rotate" values={armVals} keyTimes={armKeys} dur={DUR} repeatCount="indefinite" />
          {/* upper arm (sleeve) */}
          <line x1="147" y1="124" x2="164" y2="112" stroke="#7a2f3d" strokeWidth="7" strokeLinecap="round" />
          {/* forearm (skin) */}
          <line x1="162" y1="113" x2="178" y2="101" stroke="#eebfa0" strokeWidth="5" strokeLinecap="round" />
          {/* hand */}
          <circle cx="180" cy="100" r="3" fill="#eebfa0" />
        </g>
      </g>
    </svg>
  );
}
