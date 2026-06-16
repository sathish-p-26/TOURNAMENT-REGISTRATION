import React, { useState, useEffect } from 'react';

export default function TournamentDetails() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown calculations targeting June 25, 2026, 7:00 PM (19:00)
  useEffect(() => {
    const targetDate = new Date('2026-06-25T19:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-12">
      {/* SECTION 1: UPCOMING TOURNAMENT BANNER */}
      <section className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:border-gold-primary/30">
        <div className="absolute top-0 right-0 bg-neon-yellow text-black text-[10px] font-display font-extrabold uppercase px-4 py-1.5 rounded-bl-xl tracking-wider animate-pulse shadow-[0_0_15px_rgba(230,255,0,0.3)]">
          LOBBY OPEN
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] text-gold-primary font-display font-bold uppercase tracking-[2px] block">
              FEATURED EVENT
            </span>
            <h3 className="text-xl md:text-2xl font-display font-extrabold uppercase tracking-tight text-white">
              VLH CUSTOM ROOM CHAMPIONSHIP
            </h3>
            <p className="text-gray-400 text-xs md:text-sm">
              Standard competitive Free Fire tournament. Form your squad and claim supremacy.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-black/45 border border-white/5 rounded-xl p-4 md:min-w-[400px]">
            <div className="text-center">
              <span className="block text-[10px] text-gray-500 font-display font-bold uppercase">Date</span>
              <span className="text-sm font-semibold text-white">-- ---- 2026</span>
            </div>
            <div className="text-center border-l border-white/5">
              <span className="block text-[10px] text-gray-500 font-display font-bold uppercase">Time</span>
              <span className="text-sm font-semibold text-white">--:-- PM IST</span>
            </div>
            <div className="text-center border-l border-white/5">
              <span className="block text-[10px] text-gray-500 font-display font-bold uppercase">Map</span>
              <span className="text-sm font-semibold text-neon-yellow">Bermuda</span>
            </div>
            <div className="text-center border-l border-white/5">
              <span className="block text-[10px] text-gray-500 font-display font-bold uppercase">Mode</span>
              <span className="text-sm font-semibold text-gold-primary">Squad</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid wrapper for section 2 & 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SECTION 2: PRIZE POOL SECTION */}
        <section className="space-y-4">
          <h4 className="font-display text-sm font-bold tracking-wider text-gold-primary uppercase">
            🏆 Tournament Prize Pool
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {/* 2nd Place */}
            <div className="glass-card rounded-xl p-4 text-center border-white/5 transition-all hover:border-gray-500/20 flex flex-col justify-between">
              <div>
                <span className="text-2xl block mb-1">🥈</span>
                <span className="text-[10px] text-gray-400 font-display font-semibold uppercase block tracking-wider">
                  2nd Place
                </span>
              </div>
              <span className="text-base md:text-lg font-display font-black text-gray-300 mt-3">
                ₹----
              </span>
            </div>

            {/* 1st Place */}
            <div className="glass-card rounded-xl p-5 text-center border-gold-primary/20 bg-gradient-to-b from-gold-primary/5 to-transparent shadow-[0_10px_25px_rgba(207,168,59,0.06)] relative -translate-y-1 transition-all hover:border-gold-primary/40 flex flex-col justify-between">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gold-primary text-black text-[8px] font-display font-extrabold px-2 py-0.5 rounded-full">
                CHAMPION
              </div>
              <div>
                <span className="text-3xl block mb-1">🥇</span>
                <span className="text-[10px] text-gold-primary font-display font-bold uppercase block tracking-wider">
                  1st Place
                </span>
              </div>
              <span className="text-lg md:text-xl font-display font-black text-neon-yellow mt-4">
                ₹----
              </span>
            </div>

            {/* 3rd Place */}
            <div className="glass-card rounded-xl p-4 text-center border-white/5 transition-all hover:border-amber-700/20 flex flex-col justify-between">
              <div>
                <span className="text-2xl block mb-1">🥉</span>
                <span className="text-[10px] text-gray-400 font-display font-semibold uppercase block tracking-wider">
                  3rd Place
                </span>
              </div>
              <span className="text-base md:text-lg font-display font-black text-amber-600 mt-3">
                ₹----
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 3: MATCH TIMING */}
        <section className="space-y-4">
          <h4 className="font-display text-sm font-bold tracking-wider text-gold-primary uppercase">
            🕒 Match Timeline
          </h4>
          <div className="glass-card rounded-xl p-5 space-y-4">
            <div className="relative border-l-2 border-white/5 pl-4 ml-2 space-y-4">
              {/* Point 1 */}
              <div className="relative">
                <span className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-dark-bg shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-white">Registration Close</span>
                  <span className="text-xs font-display font-bold text-red-400">-:-- PM</span>
                </div>
              </div>
              
              {/* Point 2 */}
              <div className="relative">
                <span className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-gold-primary border-2 border-dark-bg shadow-[0_0_10px_rgba(207,168,59,0.5)]"></span>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-white">Room ID & Pass Release</span>
                  <span className="text-xs font-display font-bold text-gold-primary">-:-- PM</span>
                </div>
              </div>
              
              {/* Point 3 */}
              <div className="relative">
                <span className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-neon-yellow border-2 border-dark-bg shadow-[0_0_10px_rgba(230,255,0,0.5)]"></span>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-white">Match Start</span>
                  <span className="text-xs font-display font-bold text-neon-yellow">-:-- PM</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 4: LIVE TOURNAMENT STATUS */}
      <section className="glass-card rounded-xl p-6 md:p-8 space-y-6">
        <h4 className="font-display text-sm font-bold tracking-wider text-gold-primary uppercase">
          ⚡ Live Tournament Status
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Registered Slots Progress Bar */}
          <div className="sm:col-span-2 space-y-3">
            <div className="flex justify-between items-end text-xs">
              <span className="text-gray-400 font-semibold uppercase">Lobby Capacity</span>
              <span className="font-display font-bold text-white"><span className="text-neon-yellow">0</span> / 100 Teams</span>
            </div>
            
            {/* Progress bar container */}
            <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/5 p-[1px]">
              <div 
                className="h-full bg-gradient-to-r from-gold-primary to-neon-yellow rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(230,255,0,0.4)]"
                style={{ width: '0%' }}
              ></div>
            </div>
            
            <div className="flex justify-between text-[10px] text-gray-500 font-semibold tracking-wider">
              <span>LOBBY SLOTS: 100 AVAILABLE</span>
              <span>STATUS: REGISTRATION ACTIVE</span>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center">
            <span className="text-[10px] text-gray-400 font-display font-bold tracking-wider uppercase mb-2">
              LOBBY STARTS IN
            </span>
            <div className="flex items-center gap-1.5">
              {/* Days */}
              <div className="text-center">
                <span className="font-display font-extrabold text-lg md:text-xl text-white block w-7">
                  --
                </span>
                <span className="text-[7px] text-gray-500 font-bold uppercase block tracking-wider mt-0.5">Days</span>
              </div>
              <span className="text-gray-500 font-bold -translate-y-1">:</span>
              
              {/* Hours */}
              <div className="text-center">
                <span className="font-display font-extrabold text-lg md:text-xl text-neon-yellow block w-7">
                  --
                </span>
                <span className="text-[7px] text-gray-500 font-bold uppercase block tracking-wider mt-0.5">Hrs</span>
              </div>
              <span className="text-gray-500 font-bold -translate-y-1">:</span>
              
              {/* Minutes */}
              <div className="text-center">
                <span className="font-display font-extrabold text-lg md:text-xl text-neon-yellow block w-7">
                  --
                </span>
                <span className="text-[7px] text-gray-500 font-bold uppercase block tracking-wider mt-0.5">Min</span>
              </div>
              <span className="text-gray-500 font-bold -translate-y-1">:</span>
              
              {/* Seconds */}
              <div className="text-center">
                <span className="font-display font-extrabold text-lg md:text-xl text-gold-primary block w-7">
                  --
                </span>
                <span className="text-[7px] text-gray-500 font-bold uppercase block tracking-wider mt-0.5">Sec</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
