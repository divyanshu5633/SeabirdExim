'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';

const DESKTOP_VIDEO_SRC = '/images/seabird_trade_journey_desktop.mp4';
const MOBILE_VIDEO_SRC = '/images/seabird_trade_journey_mobile.mp4';

export default function CinematicFilmExperience() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const hasNavigatedRef = useRef(false);

  // 1. Detect Screen Size (Desktop vs Mobile)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Navigation to existing Home page
  const enterWebsite = useCallback(() => {
    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;
    setIsTransitioning(true);
    setTimeout(() => {
      if (typeof window !== 'undefined') window.location.href = '/?skip=true';
      else router.push('/?skip=true');
    }, 300);
  }, [router]);

  const handleSkip = useCallback(() => enterWebsite(), [enterWebsite]);

  // Keyboard shortcut: Escape or Space to skip
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape' || e.code === 'Space') {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleSkip]);

  // 3. Video Time Updates & Brand Reveal Synchronization
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const t = video.currentTime;

    if (t >= 8.6) {
      // 8.6s onwards: Brand Reveal phase
      setBrandVisible(true);
    } else {
      setBrandVisible(false);
    }
  };

  // 4. Sound toggle
  const toggleMute = () => {
    const v = videoRef.current;
    if (v) {
      v.muted = !v.muted;
      setIsMuted(v.muted);
    }
  };

  // Fallback timer if video does not fire onEnded
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!hasNavigatedRef.current) {
        enterWebsite();
      }
    }, 13000);
    return () => clearTimeout(fallbackTimer);
  }, [enterWebsite]);

  const activeVideoSrc = isMobile ? MOBILE_VIDEO_SRC : DESKTOP_VIDEO_SRC;

  return (
    <div
      className={`relative w-full h-screen overflow-hidden select-none bg-[#030812] transition-opacity duration-400 ${
        isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ touchAction: 'none' }}
    >
      {/* ── CINEMATIC VIDEO (Desktop & Mobile with dedicated branded streams) ── */}
      <video
        key={activeVideoSrc}
        ref={videoRef}
        src={activeVideoSrc}
        autoPlay
        muted={isMuted}
        playsInline
        preload="auto"
        onCanPlay={() => setIsReady(true)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={enterWebsite}
        className="absolute inset-0 w-full h-full object-cover block"
      />

      {/* Cinematic top & bottom subtle gradients */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

      {/* ── TOP BAR: BRAND IDENTITY & ACTIONS ────────────────────────────── */}
      <header className="absolute top-0 left-0 right-0 px-4 py-3 sm:px-8 sm:py-5 flex items-center justify-between z-30">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.18em] sm:tracking-[0.22em] text-white/75 uppercase truncate max-w-[200px] sm:max-w-none">
            {isMobile ? 'SEABIRD EXIM • TRADE JOURNEY' : 'SEABIRD EXIM • INTERNATIONAL TRADE JOURNEY'}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle button */}
          <button
            onClick={toggleMute}
            className="p-1.5 sm:p-2 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 text-white/70 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>

          {/* SKIP INTRO BUTTON */}
          <button
            onClick={handleSkip}
            className="group flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/45 hover:bg-black/75 border border-white/20 hover:border-amber-400/80 backdrop-blur-md text-white/90 hover:text-white transition-all duration-200 shadow-lg cursor-pointer"
            aria-label="Skip intro"
          >
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
              SKIP INTRO
            </span>
            <ArrowRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* ── BRAND REVEAL OVERLAY (8.6s onward) ───────────────────────────── */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none transition-all duration-700 ${
          brandVisible ? 'opacity-100 bg-[#030914]/92 backdrop-blur-[4px]' : 'opacity-0 bg-transparent'
        }`}
      >
        <div className="text-center px-5 sm:px-6 flex flex-col items-center">
          {/* Official Seabird EXIM Logo */}
          <div
            className="mb-5 sm:mb-6 drop-shadow-[0_8px_28px_rgba(0,0,0,0.8)]"
            style={{ opacity: brandVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.15s' }}
          >
            <Image
              src="/images/logo-horizontal-white.svg"
              alt="Seabird EXIM — Global Trade Operations"
              width={340}
              height={60}
              sizes="(max-width: 480px) 240px, (max-width: 768px) 280px, 340px"
              className="h-auto w-[220px] sm:w-[280px] md:w-[340px] object-contain"
              priority
            />
          </div>

          {/* Glowing amber accent line */}
          <div
            className="w-12 sm:w-14 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4 sm:mb-5 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
            style={{ opacity: brandVisible ? 1 : 0, transition: 'opacity 0.7s ease 0.4s' }}
          />

          {/* Official Taglines */}
          <div style={{ opacity: brandVisible ? 1 : 0, transition: 'opacity 0.7s ease 0.55s' }}>
            <p className="text-[11px] sm:text-[13px] font-semibold text-amber-400 tracking-[0.24em] sm:tracking-[0.3em] uppercase mb-1 sm:mb-1.5">
              QUALITY FROM INDIA.
            </p>
            <p className="text-[10px] sm:text-xs font-medium text-white/60 tracking-[0.22em] sm:tracking-[0.28em] uppercase">
              BUILT FOR GLOBAL BUYERS.
            </p>
          </div>
        </div>
      </div>

      {/* ── LOADING SPINNER ──────────────────────────────────────────────── */}
      {!isReady && (
        <div className="absolute inset-0 bg-[#030812] z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-amber-400/25 border-t-amber-400 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-[10px] font-mono text-white/45 tracking-[0.25em] uppercase">
              LOADING TRADE JOURNEY
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
