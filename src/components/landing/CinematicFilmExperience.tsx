'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

// ─── TIMELINE ──────────────────────────────────────────────────────────────
// Stage 1  Origin Port & Truck Arrival     0.0s – 2.0s
// Stage 2  Crane Hoist & Container Lift    1.8s – 4.2s
// Stage 3  Vessel Departure + Wake         3.8s – 6.2s
// Stage 4  Open Ocean Transit              5.8s – 8.2s
// Stage 5  Destination Port + Unloading   7.8s – 9.8s
// Stage 6  Final Delivery Truck            9.4s – 11.0s
// Brand Reveal                            10.5s onward
// Auto-redirect to /                      12.0s
const TOTAL_DURATION = 12.0;
const BRAND_REVEAL_START = 10.0;

interface StageLabel {
  code: string;
  stage: string;
  detail: string;
}

const STAGE_LABELS: Record<number, StageLabel> = {
  1: { code: '01', stage: 'ORIGIN TERMINAL', detail: 'EXPORT CARGO — TRUCK ARRIVES AT GANTRY BAY' },
  2: { code: '02', stage: 'CRANE HOIST & STOWAGE', detail: 'STS SPREADER LOCKS — CONTAINER LIFTS TO VESSEL' },
  3: { code: '03', stage: 'VESSEL DEPARTURE', detail: 'CONTAINER SHIP UNDERWAY — PORT RECEDING' },
  4: { code: '04', stage: 'OPEN OCEAN TRANSIT', detail: 'DEEP SEA VOYAGE — INDIA TO GLOBAL MARKETS' },
  5: { code: '05', stage: 'DESTINATION PORT', detail: 'STS CRANE DISCHARGES CONTAINER TO CHASSIS' },
  6: { code: '06', stage: 'INLAND DELIVERY', detail: 'CONTAINER CLEARED — MOVING TO FINAL DESTINATION' },
};

const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);

export default function CinematicFilmExperience() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [label, setLabel] = useState<StageLabel>(STAGE_LABELS[1]);
  const [brandVisible, setBrandVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const hasNavigatedRef = useRef(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const imagesRef = useRef<Record<string, HTMLImageElement>>({});

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Navigate to existing home page
  const enterWebsite = useCallback(() => {
    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;
    setIsTransitioning(true);
    try {
      document.cookie = 'seabird_intro_seen=true; path=/; max-age=86400; SameSite=Lax';
      window.sessionStorage?.setItem('seabird_intro_seen', 'true');
    } catch { /* ignore */ }
    setTimeout(() => {
      if (typeof window !== 'undefined') window.location.href = '/?skip=true';
      else router.push('/?skip=true');
    }, 300);
  }, [router]);

  const handleSkip = useCallback(() => enterWebsite(), [enterWebsite]);

  // Keyboard: Escape / Space to skip
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape' || e.code === 'Space') { e.preventDefault(); handleSkip(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleSkip]);

  // ─── ASSET PRELOAD ─────────────────────────────────────────────────────
  useEffect(() => {
    const mobile = window.innerWidth < 768;
    const assetMap: Record<string, string> = mobile
      ? {
          p1: '/images/cinematic/tj_plate1_origin_m.webp',
          p2: '/images/cinematic/tj_plate2_crane_m.webp',
          p3: '/images/cinematic/tj_plate3_departure_m.webp',
          p4: '/images/cinematic/tj_plate4_ocean_m.webp',
          p5: '/images/cinematic/tj_plate5_destination_m.webp',
          p6: '/images/cinematic/tj_plate6_delivery_m.webp',
        }
      : {
          p1: '/images/cinematic/tj_plate1_origin.webp',
          p2: '/images/cinematic/tj_plate2_crane.webp',
          p3: '/images/cinematic/tj_plate3_departure.webp',
          p4: '/images/cinematic/tj_plate4_ocean.webp',
          p5: '/images/cinematic/tj_plate5_destination.webp',
          p6: '/images/cinematic/tj_plate6_delivery.webp',
        };

    let done = 0;
    const total = Object.keys(assetMap).length;
    Object.entries(assetMap).forEach(([key, src]) => {
      const img = new window.Image();
      img.src = src;
      img.onload = img.onerror = () => {
        imagesRef.current[key] = img;
        done++;
        if (done === total) setIsReady(true);
      };
    });
    const fallback = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(fallback);
  }, []);

  // ─── CANVAS RENDER LOOP ────────────────────────────────────────────────
  useEffect(() => {
    if (!isReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let destroyed = false;
    let elapsed = 0;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    /** Cover-fit image draw with zoom and pan. */
    const drawCover = (
      img: HTMLImageElement | undefined,
      zoom = 1.0,
      panX = 0,
      panY = 0,
      alpha = 1.0,
    ) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      const ir = img.naturalWidth / img.naturalHeight;
      const sr = w / h;
      let rw = sr > ir ? w : h * ir;
      let rh = sr > ir ? w / ir : h;
      rw *= zoom; rh *= zoom;
      ctx.drawImage(img, (w - rw) / 2 + panX * w, (h - rh) / 2 + panY * h, rw, rh);
      ctx.restore();
    };

    /** Radial vignette overlay. */
    const drawVignette = (strength = 0.55) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.save();
      ctx.globalAlpha = strength;
      const g = ctx.createRadialGradient(w / 2, h / 2, h * 0.25, w / 2, h / 2, h * 0.85);
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(1, 'rgba(0,0,0,0.78)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    };

    /** Animated foam wake ellipses. */
    const drawWake = (now: number, progress: number, alpha: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.save();
      ctx.globalAlpha = alpha * Math.min(1, progress * 3);
      for (let i = 0; i < 6; i++) {
        const phase = (now * 0.0025 + i * 1.4) % (Math.PI * 2);
        const wx = w * 0.38 + i * w * 0.055 + Math.sin(phase) * 12;
        const wy = h * 0.62 + i * 9 + Math.cos(phase) * 4;
        const ww = 60 + i * 28;
        const wh = 4 + i * 1.2;
        const wg = ctx.createLinearGradient(wx - ww, wy, wx + ww, wy);
        wg.addColorStop(0, 'rgba(255,255,255,0)');
        wg.addColorStop(0.35, 'rgba(220,240,255,0.18)');
        wg.addColorStop(0.65, 'rgba(220,240,255,0.18)');
        wg.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = wg;
        ctx.beginPath();
        ctx.ellipse(wx, wy, ww, wh, -0.04, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const render = (now: number) => {
      if (destroyed) return;
      if (startTimeRef.current === null) startTimeRef.current = now;
      elapsed = (now - startTimeRef.current) / 1000;
      const t = Math.min(elapsed, TOTAL_DURATION);
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mob = w < 768;

      // Update stage label
      if (t < 1.8)      setLabel(STAGE_LABELS[1]);
      else if (t < 4.0) setLabel(STAGE_LABELS[2]);
      else if (t < 6.0) setLabel(STAGE_LABELS[3]);
      else if (t < 8.0) setLabel(STAGE_LABELS[4]);
      else if (t < 9.8) setLabel(STAGE_LABELS[5]);
      else               setLabel(STAGE_LABELS[6]);

      if (t >= BRAND_REVEAL_START) setBrandVisible(true);
      if (t >= TOTAL_DURATION) { enterWebsite(); return; }

      // Base fill
      ctx.fillStyle = '#04090f';
      ctx.fillRect(0, 0, w, h);

      const imgs = imagesRef.current;

      // ──────────────────────────────────────────────────────────────────
      // STAGE 1 — ORIGIN PORT & TRUCK ARRIVAL (0.0 – 2.0s)
      // Wide aerial shot of commercial container terminal. Camera slowly
      // pushes in toward the gantry bay where the truck has pulled up.
      // Subtle amber dashed line marks the crane alignment target.
      // ──────────────────────────────────────────────────────────────────
      if (t < 2.2) {
        const p = Math.min(1, t / 1.9);
        const zoom = 1.0 + easeInOutCubic(p) * 0.22;
        const panX = mob ? -0.04 * p : -0.05 * p;
        const panY = -0.06 * p;
        const fadeOut = t > 1.7 ? Math.max(0, 1 - (t - 1.7) / 0.45) : 1;
        drawCover(imgs.p1, zoom, panX, panY, fadeOut);
        drawVignette(0.45);
        // Subtle crane alignment guide
        if (p > 0.5 && fadeOut > 0.15) {
          ctx.save();
          ctx.globalAlpha = 0.18 * fadeOut * Math.sin(Math.min(p * 2, 1) * Math.PI);
          ctx.strokeStyle = '#d4a03a';
          ctx.lineWidth = 1;
          ctx.setLineDash([10, 12]);
          const tx = w * (mob ? 0.5 : 0.52) + panX * w;
          ctx.beginPath(); ctx.moveTo(tx, 0); ctx.lineTo(tx, h * 0.75); ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        }
      }

      // ──────────────────────────────────────────────────────────────────
      // STAGE 2 — CRANE HOIST & STOWAGE (1.8 – 4.2s)
      // Camera at crane level. Physical action in 3 phases:
      //   0.0–0.3  Spreader descends and locks (green twistlock glows)
      //   0.3–0.65 Container rises — camera tilts up to follow
      //   0.65–1.0 Crane traverses toward vessel — camera pans right
      // ──────────────────────────────────────────────────────────────────
      if (t >= 1.7 && t < 4.3) {
        const sp = Math.max(0, (t - 1.8) / 2.3);
        const fadeIn  = t < 2.1 ? (t - 1.7) / 0.4 : 1;
        const fadeOut = t > 3.9 ? Math.max(0, 1 - (t - 3.9) / 0.4) : 1;
        const alpha = Math.min(fadeIn, fadeOut);

        let panY = 0, panX = 0, zoom = 1.05;
        if (sp < 0.3) {
          zoom = 1.05 + (sp / 0.3) * 0.04;
        } else if (sp < 0.65) {
          const lp = (sp - 0.3) / 0.35;
          zoom = 1.09 + easeInOutCubic(lp) * 0.08;
          panY = -easeInOutCubic(lp) * 0.07;
        } else {
          const tp = (sp - 0.65) / 0.35;
          zoom = 1.17 + tp * 0.06;
          panY = -0.07 + tp * 0.03;
          panX = easeInOutCubic(tp) * 0.06;
        }
        drawCover(imgs.p2, zoom, panX, panY, alpha);
        drawVignette(0.5);

        // Twistlock engagement: green corner glows at sp 0.08–0.38
        if (sp >= 0.08 && sp <= 0.38) {
          const fp = Math.sin(((sp - 0.08) / 0.3) * Math.PI);
          ctx.save();
          ctx.globalAlpha = alpha * fp * 0.9;
          const cW = mob ? w * 0.72 : w * 0.46;
          const cH = mob ? h * 0.18 : h * 0.22;
          const cX = (w - cW) / 2 + panX * w;
          const cY = (h - cH) / 2 + panY * h + h * 0.06;
          [[cX, cY], [cX + cW, cY], [cX, cY + cH], [cX + cW, cY + cH]].forEach(([cx, cy]) => {
            const g = ctx.createRadialGradient(cx, cy, 1, cx, cy, 20);
            g.addColorStop(0, 'rgba(52,211,153,0.95)');
            g.addColorStop(0.5, 'rgba(52,211,153,0.3)');
            g.addColorStop(1, 'rgba(52,211,153,0)');
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2); ctx.fill();
          });
          ctx.fillStyle = 'rgba(52,211,153,0.88)';
          ctx.font = `700 ${mob ? 10 : 12}px system-ui,sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText('TWISTLOCKS ENGAGED — LIFT AUTHORIZED', w / 2, cY + cH + 20);
          ctx.restore();
        }
      }

      // ──────────────────────────────────────────────────────────────────
      // STAGE 3 — VESSEL DEPARTURE (3.8 – 6.2s)
      // Container ship casts off and moves away from the terminal.
      // Camera pulls back — the port recedes. Animated foam wake builds.
      // ──────────────────────────────────────────────────────────────────
      if (t >= 3.7 && t < 6.3) {
        const sp = Math.max(0, (t - 3.8) / 2.3);
        const fadeIn  = t < 4.1 ? (t - 3.7) / 0.4 : 1;
        const fadeOut = t > 5.9 ? Math.max(0, 1 - (t - 5.9) / 0.4) : 1;
        const alpha = Math.min(fadeIn, fadeOut);
        const zoom = 1.12 - easeOutQuart(sp) * 0.1;
        const panX = -easeInOutCubic(sp) * 0.07;
        drawCover(imgs.p3, zoom, panX, 0, alpha);
        drawVignette(0.5);
        if (!reducedMotion) drawWake(now, sp, alpha * 0.65);
      }

      // ──────────────────────────────────────────────────────────────────
      // STAGE 4 — OPEN OCEAN TRANSIT (5.8 – 8.2s)
      // Vessel underway. Whole-frame hydrodynamic heave simulates real
      // ocean pitch/roll. Slow push-in communicates forward momentum.
      // ──────────────────────────────────────────────────────────────────
      if (t >= 5.7 && t < 8.3) {
        const sp = Math.max(0, (t - 5.8) / 2.3);
        const fadeIn  = t < 6.1 ? (t - 5.7) / 0.4 : 1;
        const fadeOut = t > 7.9 ? Math.max(0, 1 - (t - 7.9) / 0.4) : 1;
        const alpha = Math.min(fadeIn, fadeOut);
        const heaveAngle = reducedMotion ? 0 : Math.sin(elapsed * 1.8) * 0.006;
        const heavePx    = reducedMotion ? 0 : Math.sin(elapsed * 1.8) * 4;
        const zoom = 1.08 + sp * 0.06;
        const panX = -sp * 0.03;
        ctx.save();
        ctx.translate(w / 2, h / 2);
        ctx.rotate(heaveAngle);
        ctx.translate(-w / 2, -h / 2 + heavePx);
        drawCover(imgs.p4, zoom, panX, 0, alpha);
        ctx.restore();
        drawVignette(0.48);
        if (!reducedMotion) drawWake(now, sp, alpha * 0.55);
      }

      // ──────────────────────────────────────────────────────────────────
      // STAGE 5 — DESTINATION PORT (7.8 – 9.8s)
      // Camera arrives at destination terminal, pushing in toward the
      // crane. Green alignment beam marks where the container will land.
      // ──────────────────────────────────────────────────────────────────
      if (t >= 7.7 && t < 9.9) {
        const sp = Math.max(0, (t - 7.8) / 1.8);
        const fadeIn  = t < 8.1 ? (t - 7.7) / 0.4 : 1;
        const fadeOut = t > 9.5 ? Math.max(0, 1 - (t - 9.5) / 0.4) : 1;
        const alpha = Math.min(fadeIn, fadeOut);
        const zoom = 1.08 + easeInOutCubic(sp) * 0.14;
        const panX = mob ? -0.1 - sp * 0.06 : -0.06 - sp * 0.04;
        const panY = -sp * 0.03;
        drawCover(imgs.p5, zoom, panX, panY, alpha);
        drawVignette(0.52);
        if (sp > 0.25 && fadeOut > 0.2) {
          ctx.save();
          ctx.globalAlpha = 0.26 * alpha * Math.sin(sp * Math.PI);
          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([8, 8]);
          ctx.lineDashOffset = -now * 0.04;
          const cx = w * (mob ? 0.7 : 0.65) + panX * w;
          ctx.beginPath(); ctx.moveTo(cx, h * 0.18); ctx.lineTo(cx, h * 0.72); ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        }
      }

      // ──────────────────────────────────────────────────────────────────
      // STAGE 6 — INLAND DELIVERY TRUCK (9.4 – 11.0s)
      // Truck surges forward into camera. Kinetic radial speed lines
      // reinforce velocity and mark the transition to brand reveal.
      // ──────────────────────────────────────────────────────────────────
      if (t >= 9.3 && t < 11.1) {
        const sp = Math.max(0, (t - 9.4) / 1.5);
        const fadeIn  = t < 9.7 ? (t - 9.3) / 0.4 : 1;
        const fadeOut = t > 10.6 ? Math.max(0, 1 - (t - 10.6) / 0.4) : 1;
        const alpha = Math.min(fadeIn, fadeOut);
        const zoom = 1.04 + Math.pow(sp, 2.2) * 0.5;
        const panX = -sp * 0.06;
        const panY =  sp * 0.04;
        drawCover(imgs.p6, zoom, panX, panY, alpha);
        drawVignette(0.5);
        if (sp > 0.45 && !reducedMotion) {
          ctx.save();
          const blurA = Math.pow((sp - 0.45) / 0.55, 1.5) * alpha * 0.3;
          ctx.globalAlpha = blurA;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          const vx = w * 0.5, vy = h * 0.48;
          for (let i = 0; i < 18; i++) {
            const angle = (i / 18) * Math.PI * 2;
            const len = Math.min(w, h) * 0.55;
            ctx.beginPath();
            ctx.moveTo(vx + Math.cos(angle) * 8, vy + Math.sin(angle) * 8);
            ctx.lineTo(vx + Math.cos(angle) * len, vy + Math.sin(angle) * len);
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      destroyed = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isReady, enterWebsite, reducedMotion]);

  // ─── JSX ──────────────────────────────────────────────────────────────
  return (
    <div
      ref={wrapRef}
      className={`relative w-full h-screen overflow-hidden select-none bg-[#04090f] transition-opacity duration-300 ${
        isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ touchAction: 'none' }}
    >
      {/* Full-viewport cinema canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Cinematic top/bottom gradient bars */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/65 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 to-transparent pointer-events-none z-10" />

      {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
      <header className="absolute top-0 left-0 right-0 px-5 py-4 sm:px-8 sm:py-5 flex items-center justify-between z-30">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <span className="hidden sm:block text-[11px] font-mono tracking-[0.22em] text-white/55 uppercase">
            SEABIRD EXIM&nbsp;&nbsp;•&nbsp;&nbsp;INTERNATIONAL TRADE JOURNEY
          </span>
        </div>
        <button
          onClick={handleSkip}
          className="group flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/45 hover:bg-black/70 border border-white/15 hover:border-amber-400/70 backdrop-blur-sm text-white/85 hover:text-white transition-all duration-200 shadow-md cursor-pointer"
          aria-label="Skip intro"
        >
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase">SKIP INTRO</span>
          <ArrowRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </header>

      {/* ── STAGE LABEL (bottom-left) ────────────────────────────────────── */}
      <div
        className="absolute bottom-7 left-5 sm:bottom-9 sm:left-9 z-20 pointer-events-none transition-opacity duration-500"
        style={{ opacity: brandVisible ? 0 : 1 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-amber-400/15 text-amber-300 border border-amber-400/25 tracking-wider">
            {label.code}
          </span>
          <p className="text-[11px] sm:text-xs font-mono tracking-[0.2em] font-semibold text-white/90 uppercase">
            {label.stage}
          </p>
        </div>
        <p className="text-[10px] sm:text-[11px] tracking-wide text-white/50 ml-0.5">
          {label.detail}
        </p>
      </div>

      {/* ── BRAND REVEAL (t >= 10.0s) — Official Seabird EXIM Identity ── */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none transition-all duration-800 ${
          brandVisible ? 'opacity-100 bg-[#040b16]/94 backdrop-blur-[6px]' : 'opacity-0 bg-transparent'
        }`}
      >
        <div className="text-center px-6 flex flex-col items-center">
          {/*
            ── REAL SEABIRD EXIM LOGO ──────────────────────────────────────
            Uses logo-horizontal-white.svg — the full official brand mark
            exactly as it appears in the website, white version for the
            dark cinematic background. No text substitution. No recreation.
            Width is fixed to preserve natural proportions of the SVG.
          ──────────────────────────────────────────────────────────────── */}
          <div
            className="mb-6 drop-shadow-[0_6px_20px_rgba(255,255,255,0.08)]"
            style={{ opacity: brandVisible ? 1 : 0, transition: 'opacity 0.9s ease 0.2s' }}
          >
            <Image
              src="/images/logo-horizontal-white.svg"
              alt="Seabird EXIM — Quality from India, Built for Global Buyers"
              width={320}
              height={55}
              sizes="(max-width: 480px) 220px, (max-width: 768px) 260px, 320px"
              className="h-auto w-[220px] sm:w-[260px] md:w-[320px] object-contain"
              priority
            />
          </div>

          {/* Thin amber rule */}
          <div
            className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400/80 to-transparent mx-auto mb-5"
            style={{ opacity: brandVisible ? 1 : 0, transition: 'opacity 0.7s ease 0.55s' }}
          />

          {/* Taglines */}
          <div
            style={{ opacity: brandVisible ? 1 : 0, transition: 'opacity 0.7s ease 0.7s' }}
          >
            <p className="text-[11px] sm:text-xs font-medium text-amber-400/90 tracking-[0.3em] uppercase mb-1">
              QUALITY FROM INDIA.
            </p>
            <p className="text-[11px] sm:text-xs font-medium text-white/50 tracking-[0.3em] uppercase">
              BUILT FOR GLOBAL BUYERS.
            </p>
          </div>
        </div>
      </div>

      {/* ── LOADING SCREEN ───────────────────────────────────────────────── */}
      {!isReady && (
        <div className="absolute inset-0 bg-[#04090f] z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-amber-400/25 border-t-amber-400 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-[10px] font-mono text-white/40 tracking-[0.25em] uppercase">
              LOADING TRADE JOURNEY
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
