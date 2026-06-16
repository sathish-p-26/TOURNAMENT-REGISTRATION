import React, { useState, useRef } from 'react';

export default function RegistrationForm() {
  const cardRef = useRef(null);
  const [formData, setFormData] = useState({
    teamName: '',
    uid: '',
    ign: '',
    whatsapp: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Parallax Tilt Handlers
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    // Skip on touch-enabled screens for performance
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = Math.min(Math.max(x / rect.width, 0), 1);
    const py = Math.min(Math.max(y / rect.height, 0), 1);

    const tiltX = (py - 0.5) * -12; // tilt degrees up/down
    const tiltY = (px - 0.5) * 12;  // tilt degrees left/right

    card.style.setProperty('--rx', `${tiltX}deg`);
    card.style.setProperty('--ry', `${tiltY}deg`);
    card.style.setProperty('--mouse-x', `${px * 100}%`);
    card.style.setProperty('--mouse-y', `${py * 100}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease, border-color 0.6s ease';
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--mouse-x', '50%');
    card.style.setProperty('--mouse-y', '50%');
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transition = 'transform 0.1s ease-out, box-shadow 0.4s ease, border-color 0.4s ease';
  };

  // Validation
  const validate = () => {
    const errors = {};
    if (!formData.teamName.trim() || formData.teamName.trim().length < 2)
      errors.teamName = 'Team name must be at least 2 characters.';
    if (!/^\d{9,12}$/.test(formData.uid.trim()))
      errors.uid = 'UID must be 9–12 digits (numbers only).';
    if (!formData.ign.trim())
      errors.ign = 'In-game name is required.';
    if (!/^\+?[0-9]{10,15}$/.test(formData.whatsapp.trim()))
      errors.whatsapp = 'Enter a valid WhatsApp number (e.g. +919876543210).';
    return errors;
  };

  // Input Change Handler
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear the field error as the user types
    if (fieldErrors[id]) {
      setFieldErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  // Submit Form — POST to n8n webhook
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    // Validate before submitting
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("https://n8n-latest-s0yo.onrender.com/webhook/team_form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(result.message || "Request failed");
      }

      setSubmitSuccess(true);

    } catch (err) {
      setSubmitError("Failed to submit. Check webhook.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      teamName: '',
      uid: '',
      ign: '',
      whatsapp: '',
    });
    setFieldErrors({});
  };

  return (
    <div className="w-full max-w-lg mx-auto lg:my-auto">
      {/* 3D tilt card wrapper */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: 'perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
          transformStyle: 'preserve-3d'
        }}
        className="glass-card glass-card-hover rounded-2xl p-6 md:p-10 relative overflow-hidden"
      >
        {/* Dynamic Glow Background Canvas overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-50"
          style={{
            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(230,255,0,0.06) 0%, transparent 60%)'
          }}
        ></div>

        {/* Success State Overlay */}
        {submitSuccess ? (
          <div className="relative z-10 flex flex-col items-center text-center py-10 animate-fade-in">
            <div className="w-16 h-16 bg-neon-yellow/10 border border-neon-yellow/30 rounded-full flex items-center justify-center text-neon-yellow text-3xl mb-6 shadow-[0_0_20px_rgba(230,255,0,0.2)]">
              ✓
            </div>
            <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wider mb-3">
              REGISTRATION <span className="text-neon-yellow">SECURED</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-sm mb-8 leading-relaxed">
              Your squad <span className="text-gold-primary font-bold">"{formData.teamName}"</span> is officially queued for the championship lobby coordinates. WhatsApp verification is pending.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button
                type="button"
                onClick={() => { resetForm(); setSubmitSuccess(false); }}
                className="w-full py-3.5 bg-white/5 border border-white/10 hover:border-gold-primary hover:text-gold-primary text-sm font-display font-bold uppercase rounded-lg tracking-wider transition-all duration-300 active:scale-95"
              >
                REGISTER ANOTHER SQUAD
              </button>

            </div>
          </div>
        ) : (
          /* Main Form Section */
          <div className="relative z-10">
            <div className="mb-6">
              <h2 className="font-display text-xl md:text-2xl font-extrabold text-white uppercase tracking-tight">
                TOURNAMENT <span className="text-neon-yellow">REGISTRATION</span>
              </h2>
              <p className="text-gray-400 text-xs md:text-sm mt-1">
                Enter your squad details and secure your slot.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Team Name */}
              <div className="space-y-1.5">
                <label className="block font-display text-[10px] md:text-xs font-bold tracking-wider text-gold-primary uppercase">
                  Team Name
                </label>
                <div className={`relative flex items-center bg-dark-input border rounded-lg input-glow-focus transition-all duration-300 ${fieldErrors.teamName ? 'border-red-500/60' : 'border-white/5'}`}>
                  <span className="pl-3 text-gray-500 flex items-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    placeholder="Enter your squad name"
                    className="w-full bg-transparent border-none py-3 px-3 text-sm text-white placeholder-white/20 outline-none"
                  />
                </div>
                {fieldErrors.teamName && (
                  <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    {fieldErrors.teamName}
                  </p>
                )}
              </div>

              {/* Free Fire UID */}
              <div className="space-y-1.5">
                <label className="block font-display text-[10px] md:text-xs font-bold tracking-wider text-gold-primary uppercase">
                  Free Fire UID
                </label>
                <div className={`relative flex items-center bg-dark-input border rounded-lg input-glow-focus transition-all duration-300 ${fieldErrors.uid ? 'border-red-500/60' : 'border-white/5'}`}>
                  <span className="pl-3 text-gray-500 flex items-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="uid"
                    value={formData.uid}
                    onChange={handleChange}
                    placeholder="Enter your UID"
                    className="w-full bg-transparent border-none py-3 px-3 text-sm text-white placeholder-white/20 outline-none"
                  />
                </div>
                {fieldErrors.uid && (
                  <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    {fieldErrors.uid}
                  </p>
                )}
              </div>

              {/* In-Game Name (IGN) */}
              <div className="space-y-1.5">
                <label className="block font-display text-[10px] md:text-xs font-bold tracking-wider text-gold-primary uppercase">
                  In-Game Name
                </label>
                <div className={`relative flex items-center bg-dark-input border rounded-lg input-glow-focus transition-all duration-300 ${fieldErrors.ign ? 'border-red-500/60' : 'border-white/5'}`}>
                  <span className="pl-3 text-gray-500 flex items-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="ign"
                    value={formData.ign}
                    onChange={handleChange}
                    placeholder="Enter IGN"
                    className="w-full bg-transparent border-none py-3 px-3 text-sm text-white placeholder-white/20 outline-none"
                  />
                </div>
                {fieldErrors.ign && (
                  <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    {fieldErrors.ign}
                  </p>
                )}
              </div>

              {/* WhatsApp Number */}
              <div className="space-y-1.5">
                <label className="block font-display text-[10px] md:text-xs font-bold tracking-wider text-gold-primary uppercase">
                  WhatsApp Number
                </label>
                <div className={`relative flex items-center bg-dark-input border rounded-lg input-glow-focus transition-all duration-300 ${fieldErrors.whatsapp ? 'border-red-500/60' : 'border-white/5'}`}>
                  <span className="pl-3 text-gray-500 flex items-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <input
                    type="tel"
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="Enter WhatsApp number (e.g. +919876543210)"
                    className="w-full bg-transparent border-none py-3 px-3 text-sm text-white placeholder-white/20 outline-none"
                  />
                </div>
                {fieldErrors.whatsapp && (
                  <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    {fieldErrors.whatsapp}
                  </p>
                )}
              </div>



              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 glow-btn-glow text-black font-display font-extrabold uppercase rounded-lg tracking-wider transition-all duration-300 disabled:opacity-75 disabled:pointer-events-none active:scale-95"
                >
                  {isSubmitting ? 'CONNECTING LOG LOBBY...' : 'REGISTER NOW'}
                </button>

              </div>

              {/* Webhook Error Message */}
              {submitError && (
                <p className="mt-3 text-xs text-red-400 text-center flex items-center justify-center gap-1.5">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {submitError}
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
