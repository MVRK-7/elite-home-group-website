// EHG monogram — vectorized from the approved ChatGPT wordmark so it stays
// razor-sharp at any size and recolors via `currentColor` (ink on light
// sections, gold/cream on dark). viewBox and paths traced 1:1 from the art.
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 690 616"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Elite Home Group"
      fill="currentColor"
    >
      <g transform="translate(0,616) scale(0.1,-0.1)" stroke="none">
        <path d="M5633 5550 c-242 -44 -395 -220 -424 -488 -6 -64 -9 -759 -7 -2057 l3 -1960 27 -80 c63 -184 179 -295 361 -342 81 -21 242 -21 326 1 138 35 257 130 316 250 69 140 65 72 63 1306 l-3 1115 -290 0 -290 0 0 -105 0 -105 178 -3 177 -2 0 -968 c0 -656 -4 -987 -11 -1027 -31 -167 -138 -255 -310 -255 -134 0 -235 64 -281 178 l-23 57 0 2010 c0 1591 3 2019 13 2052 21 69 71 133 132 167 52 29 61 31 165 31 128 0 163 -13 232 -88 78 -85 77 -71 83 -777 l5 -625 110 0 110 0 0 655 0 655 -23 65 c-58 163 -174 274 -341 326 -58 18 -230 26 -298 14z" />
        <path d="M605 5508 c-3 -7 -4 -1102 -3 -2433 l3 -2420 495 0 495 0 0 105 0 105 -377 3 -378 2 0 1105 0 1105 353 2 352 3 0 105 0 105 -352 3 -353 2 0 995 0 995 308 1 c169 1 339 4 377 8 l70 6 0 105 0 105 -493 3 c-389 2 -494 0 -497 -10z" />
        <path d="M2865 5508 c-3 -7 -4 -1102 -3 -2433 l3 -2420 115 0 115 0 3 1213 2 1212 310 0 310 0 2 -1212 3 -1213 115 0 115 0 0 2430 0 2430 -115 0 -115 0 -3 -1107 -2 -1108 -310 0 -310 0 -2 1108 -3 1107 -113 3 c-84 2 -114 -1 -117 -10z" />
      </g>
    </svg>
  );
}
