import React from 'react';
import HeroSection from './components/HeroSection';
import RegistrationForm from './components/RegistrationForm';
import TournamentDetails from './components/TournamentDetails';
import Footer from './components/Footer';
import heroImage from './assets/battle-bg.png';

export default function App() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-dark-bg text-white overflow-x-hidden">
      
      {/* LEFT PANEL: Gaming Hero Panel (Sticky on Desktop, hidden on Mobile/Tablet) */}
      <div className="hidden lg:block lg:w-[42%] xl:w-[38%] sticky top-0 h-screen border-r border-white/5 bg-black">
        <HeroSection />
      </div>

      {/* RIGHT PANEL: Scrollable Form & Tournament Details */}
      <div 
        className="flex-1 relative flex flex-col justify-between min-h-screen overflow-y-auto px-4 sm:px-6 lg:px-12 xl:px-16 pt-8 pb-4 lg:pt-16 z-10"
        style={{
          background: `
            radial-gradient(circle at 85% 15%, rgba(230, 255, 0, 0.02) 0%, transparent 40%),
            radial-gradient(circle at 15% 85%, rgba(207, 168, 59, 0.03) 0%, transparent 45%),
            #08080a
          `
        }}
      >
        {/* Mobile Background Portrait Overlay (Active on Mobile/Tablet only) */}
        <div className="absolute inset-0 z-0 pointer-events-none lg:hidden overflow-hidden">
          <img 
            src={heroImage} 
            alt="Mobile Background" 
            className="w-full h-full object-cover object-center filter brightness-[0.18] contrast-[1.1] saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-dark-bg/95 to-dark-bg"></div>
        </div>

        {/* Branding header visible on mobile/tablet only */}
        <div className="relative z-10 lg:hidden flex flex-col items-center text-center mb-8">
          <h1 className="font-display text-2xl font-black uppercase tracking-wider text-white">
            Ꭼ-ꮪꮲꭷꮢꭲꮪ. <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-neon-yellow">VLH</span>
          </h1>
          <p className="font-display text-[10px] font-bold tracking-[4px] text-gray-400 mt-0.5 uppercase">
            E-SPORTS TOURNAMENT
          </p>
        </div>

        {/* Content Container */}
        <main className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-16 my-auto">
          {/* Split grid for Form Registration & Quick Specs summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side text intro for tablet view since hero panel is hidden */}
            <div className="lg:col-span-5 space-y-4 lg:hidden text-center sm:text-left">
              <span className="px-3 py-1 bg-neon-yellow/10 border border-neon-yellow/20 rounded-md text-[10px] font-display font-semibold tracking-wider text-neon-yellow uppercase">
                LOBBY ID: #FF-VLH06
              </span>
              <h2 className="font-display text-2.5xl font-extrabold uppercase text-white tracking-normal leading-tight">
                Join The <span className="text-neon-yellow drop-shadow-[0_0_12px_rgba(230,255,0,0.3)]">Ultimate</span> Battle
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm font-light max-w-lg leading-relaxed mx-auto sm:mx-0">
                Register your squad and secure your slot for the custom room championship. Dominate the Bermuda battlefield.
              </p>
            </div>

            {/* Form component spans right side */}
            <div className="lg:col-span-12 xl:col-span-10 xl:col-start-2">
              <RegistrationForm />
            </div>
          </div>

          {/* Tournament Additional Details sections */}
          <div className="w-full">
            <TournamentDetails />
          </div>
        </main>

        {/* Social and Credits Footer */}
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
