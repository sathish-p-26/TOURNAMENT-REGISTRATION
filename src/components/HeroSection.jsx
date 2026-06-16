import React, { useEffect, useRef } from 'react';
import heroImage from '../assets/battle-bg.png';

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    const particles = [];
    const maxParticles = 45;

    class SparkParticle {
      constructor() {
        this.reset(true);
      }

      reset(scatter = false) {
        this.x = Math.random() * width;
        this.y = scatter ? Math.random() * height : height + Math.random() * 40;
        this.size = Math.random() * 2.2 + 0.6;
        this.vy = -(Math.random() * 1.0 + 0.3);
        this.vx = (Math.random() - 0.5) * 0.7;
        this.alpha = Math.random() * 0.6 + 0.15;
        this.decay = Math.random() * 0.003 + 0.0012;
        this.color = Math.random() > 0.45 ? 'neon' : 'gold';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;

        if (this.alpha <= 0 || this.x < 0 || this.x > width || this.y < -10) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        if (this.color === 'neon') {
          ctx.fillStyle = 'rgba(230, 255, 0, 0.85)';
          ctx.shadowColor = '#e6ff00';
          ctx.shadowBlur = this.size * 2.5;
        } else {
          ctx.fillStyle = 'rgba(207, 168, 59, 0.85)';
          ctx.shadowColor = '#cfa83b';
          ctx.shadowBlur = this.size * 2.5;
        }

        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize sparks
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new SparkParticle());
    }

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative flex flex-col justify-between p-8 md:p-12 overflow-hidden h-full min-h-[400px] lg:min-h-0">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src={heroImage}
          alt="Esports Cup Championship"
          className="w-full h-full object-cover object-center filter brightness-[0.28] contrast-[1.15] saturate-[0.9] transition-transform duration-[6000ms] hover:scale-105"
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-dark-bg via-transparent to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/95 via-dark-bg/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(207,168,59,0.12)_0%,transparent_70%)] mix-blend-color-dodge"></div>
      </div>

      {/* Floating Canvas Sparks */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none"></canvas>

      {/* Content Header */}
      <div className="relative z-20">
        <div className="w-12 h-1 bg-gradient-to-r from-neon-yellow to-gold-primary mb-5 rounded shadow-[0_0_10px_rgba(230,255,0,0.5)]"></div>
        <h1 className="font-display text-2xl md:text-3.5xl font-black tracking-wider uppercase drop-shadow-lg text-white">
          Ꭼ-ꮪꮲꭷꮢꭲꮪ. <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-neon-yellow font-black">VLH</span>
        </h1>
        <p className="font-display text-xs font-bold tracking-[6px] text-gray-400 mt-1 uppercase">
          E-SPORTS TOURNAMENT
        </p>
      </div>

      {/* Center Hero Message */}
      <div className="relative z-20 my-auto py-10 max-w-lg">
        <h2 className="font-display text-3xl md:text-5xl font-extrabold uppercase text-white tracking-wide leading-tight">
          Join The <span className="text-neon-yellow drop-shadow-[0_0_15px_rgba(230,255,0,0.35)]">Ultimate</span> Battle
        </h2>
        <p className="text-gray-400 text-sm md:text-base mt-4 font-light leading-relaxed">
          Register your squad, sync with the lobby coordinates, and dominate the battlefield under the official VLH banner.
        </p>
        
        {/* Quick specs pill boxes */}
        <div className="flex flex-wrap gap-3 mt-6">
          <span className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-md text-[11px] font-display font-semibold tracking-wider text-gold-primary uppercase">
            🏆 ₹17,500 Pool
          </span>
          <span className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-md text-[11px] font-display font-semibold tracking-wider text-neon-yellow uppercase">
            🗺️ Bermuda Map
          </span>
          <span className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-md text-[11px] font-display font-semibold tracking-wider text-white uppercase">
            👥 Squad Mode
          </span>
        </div>
      </div>

      {/* Bottom Tournament Highlights */}
      <div className="relative z-20 self-start hidden md:flex items-center gap-8 px-6 py-4 bg-dark-bg/45 backdrop-blur-md border border-white/5 rounded-xl shadow-lg">
        <div className="flex flex-col">
          <span className="font-display text-neon-yellow text-lg font-extrabold">Rank #1</span>
          <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-0.5">Lobby Level</span>
        </div>
        <div className="w-[1px] h-8 bg-white/10"></div>
        <div className="flex flex-col">
          <span className="font-display text-white text-lg font-extrabold">25 Jun</span>
          <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-0.5">Battle Date</span>
        </div>
        <div className="w-[1px] h-8 bg-white/10"></div>
        <div className="flex flex-col">
          <span className="font-display text-gold-primary text-lg font-extrabold">100 slots</span>
          <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-0.5">Maximum Teams</span>
        </div>
      </div>
    </div>
  );
}
