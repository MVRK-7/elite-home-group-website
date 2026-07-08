import { useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Stats.css';

function useCountUp(target: number, prefix = '', suffix = '') {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ran = false;

    const run = () => {
      const dur = 1400;
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        const v = Math.round(target * e);
        el.textContent = prefix + v.toLocaleString('en-US') + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) {
      run();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !ran) {
            ran = true;
            run();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, prefix, suffix]);

  return ref;
}

function StatBlock({
  target,
  prefix = '',
  suffix = '',
  label,
  delay,
  suffixNote,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay: number;
  suffixNote?: string;
}) {
  const countRef = useCountUp(target, prefix, suffix);
  const { ref, style } = useReveal<HTMLDivElement>(delay);

  return (
    <div ref={ref} style={style}>
      <div ref={countRef} className="stat-value">
        {prefix}0{suffix}
      </div>
      <div className="stat-label">
        {label} {suffixNote && <span className="stat-note">{suffixNote}</span>}
      </div>
    </div>
  );
}

export default function Stats() {
  const heading = useReveal<HTMLDivElement>(0);
  const rating = useReveal<HTMLDivElement>(0.24);

  return (
    <section id="results" className="stats">
      <div className="section-inner">
        <div ref={heading.ref} style={heading.style} className="stats-kicker">
          By the numbers
        </div>
        <div className="stats-grid">
          <StatBlock target={420} suffix="+" label="Homes closed" delay={0} />
          <StatBlock target={180} prefix="$" suffix="M+" label="In total volume" delay={0.08} />
          <StatBlock
            target={14}
            label="Avg. days on market"
            suffixNote="· area 38"
            delay={0.16}
          />
          <div ref={rating.ref} style={rating.style}>
            <div className="stat-value">
              4.9<span className="stat-star">&#9733;</span>
            </div>
            <div className="stat-label">Across 130+ reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}
