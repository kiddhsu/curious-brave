import type { ReactNode } from 'react'

type IconProps = {
  name: string
  className?: string
  size?: number
}

const paths: Record<string, ReactNode> = {
  body: (
    <>
      <circle cx="32" cy="22" r="10" fill="#ffb4a2" />
      <path d="M16 54c2-12 10-18 16-18s14 6 16 18" fill="#ff6b4a" />
    </>
  ),
  creatures: (
    <>
      <circle cx="24" cy="30" r="10" fill="#f5a524" />
      <circle cx="18" cy="22" r="3" fill="#f5a524" />
      <circle cx="30" cy="22" r="3" fill="#f5a524" />
      <path d="M40 48c-2-10 2-18 10-20 2 10-2 18-10 20Z" fill="#3d9b6e" />
      <path d="M32 50V34" stroke="#2f7a52" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  space: (
    <>
      <circle cx="32" cy="32" r="14" fill="#3a6ea5" />
      <ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="8"
        fill="none"
        stroke="#7ec8ff"
        strokeWidth="3"
        transform="rotate(-20 32 32)"
      />
      <circle cx="48" cy="16" r="3" fill="#ffe27a" />
    </>
  ),
  lab: (
    <>
      <path d="M24 12h16v14l10 24H14L24 26V12Z" fill="#e67e22" />
      <rect x="22" y="8" width="20" height="6" rx="2" fill="#f5a524" />
      <circle cx="28" cy="40" r="3" fill="#fff4d6" />
      <circle cx="38" cy="44" r="2" fill="#fff4d6" />
    </>
  ),
  bone: (
    <>
      <rect x="18" y="28" width="28" height="8" rx="4" fill="#f0e6d2" />
      <circle cx="16" cy="26" r="6" fill="#f0e6d2" />
      <circle cx="16" cy="38" r="6" fill="#f0e6d2" />
      <circle cx="48" cy="26" r="6" fill="#f0e6d2" />
      <circle cx="48" cy="38" r="6" fill="#f0e6d2" />
    </>
  ),
  eye: (
    <>
      <ellipse cx="32" cy="32" rx="20" ry="12" fill="#fff" stroke="#1c2b2a" strokeWidth="3" />
      <circle cx="32" cy="32" r="7" fill="#2f6fed" />
      <circle cx="34" cy="30" r="2" fill="#fff" />
    </>
  ),
  tummy: (
    <>
      <ellipse cx="32" cy="34" rx="16" ry="14" fill="#ffb4a2" />
      <path d="M24 34c2 4 4 6 8 6s6-2 8-6" stroke="#ff6b4a" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  ),
  sweat: (
    <>
      <path d="M32 12c8 12 12 18 12 24a12 12 0 1 1-24 0c0-6 4-12 12-24Z" fill="#4ea8de" />
    </>
  ),
  fingerprint: (
    <>
      <circle cx="32" cy="32" r="18" fill="none" stroke="#ff6b4a" strokeWidth="3" />
      <path d="M22 34c2 8 8 12 10 12s8-4 10-12" fill="none" stroke="#ff6b4a" strokeWidth="3" />
      <path d="M26 28c1 6 4 10 6 10s5-4 6-10" fill="none" stroke="#ff6b4a" strokeWidth="3" />
    </>
  ),
  sleep: (
    <>
      <path d="M14 40c0-12 8-20 18-20s18 8 18 20" fill="#9b8cff" />
      <circle cx="40" cy="18" r="8" fill="#ffe27a" />
    </>
  ),
  bird: (
    <>
      <ellipse cx="30" cy="34" rx="14" ry="10" fill="#5b8def" />
      <path d="M40 30c8-2 14-8 16-14-8 2-14 8-16 14Z" fill="#7ec8ff" />
      <circle cx="24" cy="30" r="2" fill="#1c2b2a" />
      <path d="M16 34l-6 2 6 2" fill="#f5a524" />
    </>
  ),
  leaf: (
    <>
      <path d="M32 50V22" stroke="#2f7a52" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 36c-10-2-16-10-14-18 10 2 16 10 14 18Z" fill="#3d9b6e" />
      <path d="M32 42c10-2 16-10 14-18-10 2-16 10-14 18Z" fill="#5cbc86" />
    </>
  ),
  cat: (
    <>
      <circle cx="32" cy="34" r="14" fill="#f5a524" />
      <path d="M20 22l4 8M44 22l-4 8" stroke="#f5a524" strokeWidth="6" strokeLinecap="round" />
      <circle cx="26" cy="32" r="2" fill="#1c2b2a" />
      <circle cx="38" cy="32" r="2" fill="#1c2b2a" />
      <path d="M28 40c2 2 6 2 8 0" stroke="#1c2b2a" strokeWidth="2" fill="none" />
    </>
  ),
  seed: (
    <>
      <ellipse cx="32" cy="38" rx="10" ry="14" fill="#8b5a2b" />
      <path d="M32 24c0-8 6-12 10-14-2 8-6 12-10 14Z" fill="#3d9b6e" />
    </>
  ),
  frog: (
    <>
      <ellipse cx="32" cy="36" rx="16" ry="12" fill="#3d9b6e" />
      <circle cx="22" cy="24" r="6" fill="#5cbc86" />
      <circle cx="42" cy="24" r="6" fill="#5cbc86" />
      <circle cx="22" cy="24" r="2" fill="#1c2b2a" />
      <circle cx="42" cy="24" r="2" fill="#1c2b2a" />
    </>
  ),
  bee: (
    <>
      <ellipse cx="32" cy="34" rx="14" ry="10" fill="#f5a524" />
      <path d="M22 34h20M26 28h12M26 40h12" stroke="#1c2b2a" strokeWidth="3" />
      <path
        d="M18 24c4-8 10-8 14 0M46 24c-4-8-10-8-14 0"
        fill="#dff6f1"
        stroke="#1fa6a0"
        strokeWidth="2"
      />
    </>
  ),
  daynight: (
    <>
      <circle cx="22" cy="32" r="12" fill="#f5a524" />
      <circle cx="44" cy="32" r="12" fill="#3a6ea5" />
      <circle cx="48" cy="28" r="2" fill="#ffe27a" />
    </>
  ),
  moon: (
    <path
      d="M40 12a18 18 0 1 0 10 28 14 14 0 1 1-10-28Z"
      fill="#ffe27a"
    />
  ),
  meteor: (
    <>
      <path d="M12 12l24 24" stroke="#ff6b4a" strokeWidth="4" strokeLinecap="round" />
      <circle cx="40" cy="40" r="8" fill="#f5a524" />
      <path d="M18 14l6 2M14 20l2 6" stroke="#ffd166" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  helmet: (
    <>
      <path d="M12 36c0-12 8-20 20-20s20 8 20 20v4H12v-4Z" fill="#2f6fed" />
      <rect x="10" y="38" width="44" height="8" rx="3" fill="#f5a524" />
    </>
  ),
  salt: (
    <>
      <path d="M20 18h24l4 28H16l4-28Z" fill="#7ec8ff" />
      <circle cx="28" cy="36" r="2" fill="#fff" />
      <circle cx="36" cy="40" r="2" fill="#fff" />
      <circle cx="32" cy="30" r="2" fill="#fff" />
    </>
  ),
  ice: (
    <>
      <rect x="18" y="20" width="28" height="28" rx="6" fill="#b8ecff" />
      <path d="M24 28h16M32 22v20M26 34h12" stroke="#2f6fed" strokeWidth="3" opacity="0.5" />
    </>
  ),
  bubble: (
    <>
      <circle cx="24" cy="36" r="10" fill="#7ec8ff" opacity="0.8" />
      <circle cx="40" cy="28" r="14" fill="#a8e6ff" opacity="0.85" />
      <circle cx="36" cy="22" r="3" fill="#fff" />
    </>
  ),
  magnet: (
    <>
      <path d="M18 16h12v20a8 8 0 0 0 16 0V16h12v20a20 20 0 0 1-40 0V16Z" fill="#ff5a5a" />
      <rect x="18" y="12" width="12" height="10" fill="#2f6fed" />
      <rect x="34" y="12" width="12" height="10" fill="#2f6fed" />
    </>
  ),
  shadow: (
    <>
      <circle cx="28" cy="22" r="8" fill="#1c2b2a" />
      <path d="M18 48c2-12 6-18 10-18s8 6 10 18" fill="#1c2b2a" />
      <ellipse cx="44" cy="50" rx="14" ry="6" fill="#5a6e6b" opacity="0.45" />
    </>
  ),
  static: (
    <>
      <circle cx="32" cy="22" r="10" fill="#ffb4a2" />
      <path d="M18 20c-4-6-2-10 0-10M46 20c4-6 2-10 0-10M14 28c-6-2-8-6-8-8M50 28c6-2 8-6 8-8" stroke="#f5a524" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 36c2 10 8 16 12 16s10-6 12-16" fill="#7ec8ff" />
    </>
  ),
  star: (
    <path
      d="M32 10 38 24l16 2-12 12 3 16-13-8-13 8 3-16L16 26l16-2Z"
      fill="#f5a524"
    />
  ),
  heart: (
    <path
      d="M32 50s-16-10-16-22a10 10 0 0 1 20 0 10 10 0 0 1 20 0c0 12-16 22-16 22Z"
      fill="#ff5a7a"
    />
  ),
  emotion: (
    <path
      d="M32 50s-16-10-16-22a10 10 0 0 1 20 0 10 10 0 0 1 20 0c0 12-16 22-16 22Z"
      fill="#f5a524"
    />
  ),
  community: (
    <>
      <path d="M12 34 32 16l20 18v22H12V34Z" fill="#2f6fed" />
      <rect x="26" y="38" width="12" height="16" rx="2" fill="#fff4d6" />
    </>
  ),
  sun: (
    <>
      <circle cx="32" cy="32" r="12" fill="#f5a524" />
      <path
        d="M32 8v6M32 50v6M8 32h6M50 32h6M14 14l4 4M46 46l4 4M14 50l4-4M46 18l4-4"
        stroke="#f5a524"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  ),
  taste: (
    <>
      <ellipse cx="32" cy="36" rx="14" ry="16" fill="#ff8fab" />
      <path d="M24 28c2 6 6 10 8 10s6-4 8-10" fill="#ff5a7a" />
    </>
  ),
  muscle: (
    <>
      <path d="M18 40c0-10 6-16 12-16 2 0 4 2 6 2s4-2 6-2c6 0 12 6 12 16" fill="#ff6b4a" />
      <circle cx="24" cy="24" r="6" fill="#ffb4a2" />
    </>
  ),
  fish: (
    <>
      <ellipse cx="30" cy="32" rx="16" ry="10" fill="#4ea8de" />
      <path d="M46 32l10-8v16L46 32Z" fill="#2f6fed" />
      <circle cx="22" cy="30" r="2" fill="#1c2b2a" />
    </>
  ),
  ant: (
    <>
      <circle cx="22" cy="32" r="6" fill="#5a3a22" />
      <circle cx="34" cy="32" r="7" fill="#5a3a22" />
      <circle cx="46" cy="32" r="5" fill="#5a3a22" />
      <path d="M18 24l-4-6M26 24l0-8M40 24l4-6" stroke="#5a3a22" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  root: (
    <>
      <path d="M32 12v16" stroke="#3d9b6e" strokeWidth="4" />
      <path d="M32 28c-8 8-12 16-10 22M32 28c8 8 12 16 10 22M32 32c-4 6-4 12 0 16M32 32c4 6 4 12 0 16" stroke="#8b5a2b" strokeWidth="3" strokeLinecap="round" fill="none" />
    </>
  ),
  earth: (
    <>
      <circle cx="32" cy="32" r="16" fill="#3a6ea5" />
      <path d="M20 28c6-4 12-2 16 2s10 6 14 2" stroke="#5cbc86" strokeWidth="5" fill="none" />
      <path d="M18 38c8 2 14-2 20 2" stroke="#5cbc86" strokeWidth="4" fill="none" />
    </>
  ),
  rocket: (
    <>
      <path d="M32 8c8 8 12 20 12 28l-12 8-12-8c0-8 4-20 12-28Z" fill="#ff6b4a" />
      <circle cx="32" cy="28" r="4" fill="#7ec8ff" />
      <path d="M20 44l4-6M44 44l-4-6M32 48v8" stroke="#f5a524" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  palette: (
    <>
      <circle cx="32" cy="32" r="18" fill="#fff4d6" stroke="#e67e22" strokeWidth="3" />
      <circle cx="24" cy="26" r="4" fill="#ff5a5a" />
      <circle cx="36" cy="22" r="4" fill="#2f6fed" />
      <circle cx="40" cy="34" r="4" fill="#3d9b6e" />
      <circle cx="28" cy="38" r="4" fill="#f5a524" />
    </>
  ),
  float: (
    <>
      <ellipse cx="32" cy="40" rx="20" ry="8" fill="#7ec8ff" />
      <circle cx="28" cy="28" r="10" fill="#ffb4a2" />
    </>
  ),
  mirror: (
    <>
      <rect x="16" y="12" width="32" height="40" rx="6" fill="#cfe8ff" stroke="#3a6ea5" strokeWidth="3" />
      <path d="M22 20h12" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  smile: (
    <>
      <circle cx="32" cy="32" r="18" fill="#ffe27a" />
      <circle cx="24" cy="28" r="3" fill="#1c2b2a" />
      <circle cx="40" cy="28" r="3" fill="#1c2b2a" />
      <path d="M22 36c4 8 16 8 20 0" stroke="#1c2b2a" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  ),
  compare: (
    <>
      <circle cx="22" cy="28" r="10" fill="#ffd166" />
      <circle cx="42" cy="36" r="14" fill="#7ec8ff" />
    </>
  ),
  lonely: (
    <>
      <circle cx="32" cy="24" r="10" fill="#c5d0ce" />
      <path d="M18 50c2-12 8-18 14-18s12 6 14 18" fill="#c5d0ce" />
    </>
  ),
  sorry: (
    <>
      <circle cx="32" cy="32" r="18" fill="#ffd6e0" />
      <path d="M22 28h6M36 28h6M24 40c4 4 12 4 16 0" stroke="#ff6b4a" strokeWidth="3" strokeLinecap="round" fill="none" />
    </>
  ),
  night: (
    <>
      <path d="M40 12a18 18 0 1 0 10 28 14 14 0 1 1-10-28Z" fill="#3a6ea5" />
      <circle cx="44" cy="18" r="2" fill="#ffe27a" />
    </>
  ),
  calm: (
    <>
      <circle cx="32" cy="32" r="18" fill="#d9f5e4" />
      <path d="M20 32h24M24 24c4 2 8 2 12 0M24 40c4 2 8 2 12 0" stroke="#3d9b6e" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  light: (
    <>
      <rect x="14" y="12" width="12" height="40" rx="4" fill="#1c2b2a" />
      <circle cx="20" cy="22" r="4" fill="#ff5a5a" />
      <circle cx="20" cy="32" r="4" fill="#ffe27a" />
      <circle cx="20" cy="42" r="4" fill="#3d9b6e" />
      <path d="M28 40h18v8H28" fill="#8899a6" />
    </>
  ),
  recycle: (
    <>
      <path d="M20 40 28 22h8l-4 8h10l-14 20-4-6Z" fill="#3d9b6e" />
      <path d="M44 24 36 42h-8l4-8H22l14-20 4 6Z" fill="#1fa6a0" />
    </>
  ),
  queue: (
    <>
      <circle cx="16" cy="28" r="6" fill="#2f6fed" />
      <circle cx="32" cy="28" r="6" fill="#2f6fed" />
      <circle cx="48" cy="28" r="6" fill="#2f6fed" />
      <path d="M16 40v8M32 40v8M48 40v8" stroke="#2f6fed" strokeWidth="4" />
    </>
  ),
  book: (
    <>
      <path d="M12 16h18v36H12a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4Z" fill="#2f6fed" />
      <path d="M52 16H34v36h18a4 4 0 0 0 4-4V20a4 4 0 0 0-4-4Z" fill="#7ec8ff" />
    </>
  ),
  help: (
    <>
      <circle cx="22" cy="28" r="8" fill="#ffb4a2" />
      <circle cx="42" cy="28" r="8" fill="#ffb4a2" />
      <path d="M14 48c2-10 6-14 8-14h4c2 0 6 4 8 14M34 48c2-10 6-14 8-14h4c2 0 6 4 8 14" fill="#2f6fed" />
    </>
  ),
  crosswalk: (
    <>
      <rect x="8" y="28" width="48" height="12" fill="#1c2b2a" />
      <rect x="12" y="28" width="6" height="12" fill="#fff4d6" />
      <rect x="24" y="28" width="6" height="12" fill="#fff4d6" />
      <rect x="36" y="28" width="6" height="12" fill="#fff4d6" />
      <rect x="48" y="28" width="6" height="12" fill="#fff4d6" />
    </>
  ),
  park: (
    <>
      <path d="M18 40c0-12 8-20 14-20s14 8 14 20" fill="#3d9b6e" />
      <rect x="28" y="40" width="8" height="12" fill="#8b5a2b" />
      <circle cx="48" cy="24" r="8" fill="#f5a524" />
    </>
  ),
  thanks: (
    <>
      <path d="M32 48s-14-8-14-18a9 9 0 0 1 18 0 9 9 0 0 1 18 0c0 10-14 18-14 18Z" fill="#ff6b4a" />
      <path d="M20 22c4-8 10-8 12-2M44 22c-4-8-10-8-12-2" stroke="#f5a524" strokeWidth="3" strokeLinecap="round" fill="none" />
    </>
  ),
  lock: (
    <>
      <rect x="16" y="28" width="32" height="24" rx="4" fill="#5a6e6b" />
      <path d="M22 28v-6a10 10 0 0 1 20 0v6" fill="none" stroke="#5a6e6b" strokeWidth="4" />
      <circle cx="32" cy="40" r="3" fill="#fff4d6" />
    </>
  ),
  question: (
    <>
      <circle cx="32" cy="32" r="22" fill="#fff" />
      <path
        d="M24 24c0-6 4-10 8-10s8 4 8 8c0 6-8 7-8 14"
        stroke="#1fa6a0"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="32" cy="44" r="3" fill="#1fa6a0" />
    </>
  ),
}

export function Icon({ name, className, size = 28 }: IconProps) {
  const content = paths[name] ?? paths.question
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden
      focusable="false"
    >
      {content}
    </svg>
  )
}
