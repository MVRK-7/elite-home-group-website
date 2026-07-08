import { useEffect, useMemo, useRef } from 'react';
import './Hero.css';

const homePhotoModules = import.meta.glob('../assets/hero-homes/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const HOME_PHOTOS = Object.keys(homePhotoModules)
  .sort()
  .map((key) => homePhotoModules[key]);

const CARD_COUNT = HOME_PHOTOS.length;

// Scroll runway: MORPH_VH drives the circle-to-arc unfurl, PAN_VH then keeps
// rotating that same arc around its circle — like a Ferris wheel — so cards
// that started off-screen swing into the crest before the next section.
const MORPH_VH = 90;
const PAN_VH = 95;
const SPLIT = MORPH_VH / (MORPH_VH + PAN_VH);
// Once the sticky pin releases, the hero scrolls away under its own weight —
// keep the wheel turning a bit further during that exit instead of freezing,
// so it reads as still spinning off screen while Stats scrolls up beneath it.
const EXIT_VH = 55;
const EXIT_ROTATE_FRACTION = 0.35;

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cards = useMemo(
    () =>
      Array.from({ length: CARD_COUNT }, (_, i) => ({
        i,
        photo: HOME_PHOTOS[i % HOME_PHOTOS.length],
      })),
    [],
  );

  useEffect(() => {
    const stage = stageRef.current;
    const hero = heroRef.current;
    if (!stage || !hero) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const els = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    const N = els.length || 1;

    const layout = (p: number, panT: number) => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const m = Math.min(W, H);
      const isMobile = W < 768;
      const circleR = Math.min(m * (isMobile ? 0.46 : 0.42), 430);
      const circleScale = isMobile ? 0.62 : 1;
      const wheelRadius = Math.min(W, H * 1.5) * (isMobile ? 1.4 : 1.05);
      const apexY = H * (isMobile ? 0.32 : 0.24);
      const wheelCenterY = apexY + wheelRadius;
      const spread = isMobile ? 104 : 132;
      const startAngle = -90 - spread / 2;
      const step = spread / (N - 1);
      const ascale = isMobile ? 1.2 : 1.5;

      // The 18 cards stay clustered in their original dense arc (spread degrees
      // wide) — that's what keeps the crest looking full. Instead of sliding
      // that cluster sideways, rotate it around the wheel's own center, so it
      // swings along the same curve a Ferris wheel car would follow, carrying
      // previously off-screen cards through the crest as others swing past it.
      const wheelRotate = spread * 0.4 * panT;

      els.forEach((el, i) => {
        const ca = (i / N) * 360;
        const cr = (ca * Math.PI) / 180;
        const cx = Math.cos(cr) * circleR;
        const cy = Math.sin(cr) * circleR;
        const crot = ca + 90;

        const aa = startAngle + i * step + wheelRotate;
        const ar = (aa * Math.PI) / 180;
        const ax = Math.cos(ar) * wheelRadius;
        const ay = Math.sin(ar) * wheelRadius + wheelCenterY;
        const arot = aa + 90;

        const X = lerp(cx, ax, p);
        const Y = lerp(cy, ay, p);
        const R = lerp(crot, arot, p);
        const S = lerp(circleScale, ascale, p);

        el.style.transform = `translate(-50%,-50%) translate(${X}px,${Y}px) rotate(${R}deg) scale(${S})`;
        el.style.opacity = '1';
      });
    };

    els.forEach((el, i) => {
      el.style.transition = 'transform 1.15s cubic-bezier(.16,1,.3,1), opacity .7s ease';
      el.style.transitionDelay = `${i * 30}ms`;
    });

    let introDone = false;
    const raf1 = requestAnimationFrame(() => requestAnimationFrame(() => layout(0, 0)));

    const progress = () => {
      const total = hero.offsetHeight - window.innerHeight;
      const t = Math.min(1, Math.max(0, window.scrollY / (total || 1)));
      const p = Math.min(1, t / SPLIT);
      const basePanT = SPLIT >= 1 ? 0 : Math.min(1, Math.max(0, (t - SPLIT) / (1 - SPLIT)));

      // Beyond `total` the section is no longer pinned and is scrolling away
      // on its own — use that overshoot to keep adding rotation.
      const exitPx = Math.max(0, window.scrollY - total);
      const exitT = Math.min(1, exitPx / ((EXIT_VH / 100) * window.innerHeight));
      const panT = basePanT + exitT * EXIT_ROTATE_FRACTION;

      return { p, panT };
    };

    const onScroll = () => {
      const { p, panT } = progress();
      if (introDone) layout(p, panT);

      const heroText = heroTextRef.current;
      if (heroText) {
        heroText.style.opacity = String(Math.max(0, 1 - p * 2.6));
        heroText.style.transform = `translate(-50%,-50%) translateY(${-30 * p}px)`;
        heroText.style.pointerEvents = p > 0.25 ? 'none' : 'auto';
      }
      const caption = captionRef.current;
      if (caption) caption.style.opacity = String(Math.max(0, (p - 0.5) / 0.32));
      const cue = cueRef.current;
      if (cue) cue.style.opacity = String(Math.max(0, 1 - p * 3));
    };

    const introTimer = setTimeout(() => {
      introDone = true;
      els.forEach((el) => {
        el.style.transition = 'none';
        el.style.transitionDelay = '0ms';
      });
      onScroll();
    }, 1550);

    const onResize = () => {
      if (introDone) {
        const { p, panT } = progress();
        layout(p, panT);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(introTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className="hero"
      style={{ height: `${100 + MORPH_VH + PAN_VH}vh` }}
    >
      <div ref={stageRef} className="hero-stage">
        {cards.map((card) => (
          <div
            key={card.i}
            ref={(el) => {
              cardRefs.current[card.i] = el;
            }}
            className="hero-card"
          >
            <img className="hero-card-bg" src={card.photo} alt="" />
            <div className="hero-card-shade" />
          </div>
        ))}

        <div ref={heroTextRef} className="hero-text">
          <div className="hero-kicker">Kingman &middot; Arizona</div>
          <h1 className="hero-title">Homes worth coming home to.</h1>
          <p className="hero-sub">
            A boutique real estate team guiding Northern Arizona buyers and sellers with
            clarity, care, and quiet confidence.
          </p>
          <a href="#contact" className="hero-cta">
            Book a consultation <span className="hero-cta-arrow">&rarr;</span>
          </a>
        </div>

        <div ref={captionRef} className="hero-caption">
          <div className="hero-caption-kicker">A collection across Northern Arizona</div>
          <div className="hero-caption-title">A life, well placed.</div>
          <a href="#listings" className="hero-caption-link">
            Explore the collection <span className="hero-caption-arrow">&rarr;</span>
          </a>
        </div>

        <div ref={cueRef} className="hero-cue">
          <span>Scroll</span>
          <span className="hero-cue-line" />
        </div>
      </div>
    </section>
  );
}
