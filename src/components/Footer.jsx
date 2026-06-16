import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full mt-16 border-t border-white/5 pt-8 pb-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-center md:text-left space-y-1">
        <p className="text-[10px] md:text-xs text-gray-500 font-medium">
          &copy; 2026 VLH E-Sports. All rights reserved. Powered by Free Fire.
        </p>
        <p className="text-[9px] text-gray-600 font-light">
          This portal simulates team operations for the official "Ꭼ-ꮪꮲꭷꮢꭲꮪ. VLH" squad tournament coordination.
        </p>
      </div>

      {/* Social Links List */}
      <div className="flex items-center gap-4">
        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Follow VLH on Instagram"
          className="w-9 h-9 rounded-lg bg-white/2 border border-white/5 hover:border-gold-primary hover:text-gold-primary text-gray-400 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
          </svg>
        </a>

        {/* YouTube */}
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Subscribe to VLH on YouTube"
          className="w-9 h-9 rounded-lg bg-white/2 border border-white/5 hover:border-red-500 hover:text-red-500 text-gray-400 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
          </svg>
        </a>

        {/* Discord */}
        <a
          href="https://discord.gg"
          target="_blank"
          rel="noreferrer"
          aria-label="Join VLH Discord Community"
          className="w-9 h-9 rounded-lg bg-white/2 border border-white/5 hover:border-indigo-500 hover:text-indigo-400 text-gray-400 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:scale-95"
        >
          <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 127.14 96.36">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.43-5c.88-.65,1.72-1.33,2.53-2a75.76,75.76,0,0,0,72.76,0c.81.71,1.65,1.39,2.53,2a68.86,68.86,0,0,1-10.43,5,78.29,78.29,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.07,50.77,123.2,28,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
          </svg>
        </a>

        {/* WhatsApp */}
        <a
          href="https://whatsapp.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Contact VLH on WhatsApp"
          className="w-9 h-9 rounded-lg bg-white/2 border border-white/5 hover:border-emerald-500 hover:text-emerald-500 text-gray-400 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
