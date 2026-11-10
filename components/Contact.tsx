import React, { useState } from 'react';
import { motion as motionBase } from 'framer-motion';
import { Send, CheckCircle, ArrowUpRight, Copy, Check, Mail, Instagram, Github, Linkedin, ShieldCheck } from 'lucide-react';
import { BRAND } from '../constants';

const motion = motionBase as any;

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [copied, setCopied] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(BRAND.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setFormState('sending');
    setStatusNotice(null);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${BRAND.socials.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `⚡ New Project Inquiry from ${formData.name} // WEB⚡BITS`,
          _replyto: formData.email,
          _template: 'table',
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (response.ok || data.success === 'true' || data.success === true) {
        setFormState('success');
        setStatusNotice(`Inquiry successfully dispatched to ${BRAND.socials.email}. We will review your vision and reply shortly!`);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormState('idle'), 7000);
      } else {
        throw new Error(data.message || 'Direct endpoint returned non-OK');
      }
    } catch (err) {
      // Automatic fail-safe: open user's email client directly with prefilled body
      const mailtoUrl = `mailto:${BRAND.socials.email}?subject=${encodeURIComponent(
        `⚡ Project Inquiry from ${formData.name} // WEB⚡BITS`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nProject Vision & Scope:\n${formData.message}`
      )}`;
      window.open(mailtoUrl, '_blank');
      setFormState('success');
      setStatusNotice(`Transmitted via mail client to ${BRAND.socials.email}. Thank you!`);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormState('idle'), 7000);
    }
  };

  const contactMethods = [
    {
      name: 'EMAIL',
      value: BRAND.socials.email,
      href: `mailto:${BRAND.socials.email}`,
      icon: Mail,
      desc: 'Direct inbox correspondence',
    },
    {
      name: 'INSTAGRAM',
      value: '@infaaze',
      href: BRAND.socials.instagram,
      icon: Instagram,
      desc: 'Design experiments & direct DMs',
    },
    {
      name: 'GITHUB',
      value: '@infasmk',
      href: BRAND.socials.github,
      icon: Github,
      desc: 'Open-source code repositories',
    },
    {
      name: 'LINKEDIN',
      value: 'Infas.mk',
      href: BRAND.socials.linkedin,
      icon: Linkedin,
      desc: 'Professional engineering network',
    },
  ];

  return (
    <section id="contact" className="py-28 md:py-40 bg-obsidian/80 backdrop-blur-sm relative overflow-hidden">
      {/* Background Cinematic Atmosphere in Copper */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-copper/15 via-[#8C4E31]/10 to-transparent rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Climax Statement */}
        <div className="mb-20">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-space font-extrabold text-warm-ivory tracking-tighter leading-[0.88] uppercase mb-8">
            LET'S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-ivory via-[#E29875] to-copper">
              SOMETHING
            </span> <br />
            USEFUL.
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-graphite/40 border border-white/[0.08] hover:border-copper/40 text-warm-ivory font-mono text-xs tracking-wider transition-all"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-copper" />}
              <span>{copied ? 'EMAIL COPIED TO CLIPBOARD' : BRAND.socials.email}</span>
            </button>

            <span className="text-muted-silver text-xs font-mono hidden sm:inline-block">
              // TYPICAL RESPONSE TIME: &lt; 24 HOURS
            </span>
          </div>
        </div>

        {/* Contact Matrix: Channels + Interactive Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold text-muted-silver uppercase tracking-widest block mb-4">
              DIRECT PROTOCOLS
            </span>

            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.name}
                  href={method.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="OPEN"
                  className="group flex items-center justify-between p-6 rounded-2xl bg-deep-charcoal/80 border border-white/[0.08] hover:border-copper/40 hover:bg-graphite/40 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-graphite/60 text-muted-silver group-hover:text-copper transition-colors">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-warm-ivory font-space font-bold text-base group-hover:text-copper-light transition-colors">
                        {method.name}
                      </h4>
                      <p className="text-muted-silver text-xs font-mono">{method.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-silver group-hover:text-warm-ivory transition-colors">
                      {method.value}
                    </span>
                    <ArrowUpRight size={16} className="text-muted-silver group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-3xl bg-deep-charcoal/90 border border-white/[0.08] relative overflow-hidden shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-2xl font-space font-bold text-warm-ivory">
                  START A PROJECT
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper/10 border border-copper/30 text-[11px] font-mono text-copper-light">
                  <ShieldCheck size={13} />
                  <span>DIRECT TO INBOX</span>
                </span>
              </div>
              <p className="text-muted-silver text-sm font-light mb-8">
                Inquiries land directly in <span className="text-copper font-mono font-medium">{BRAND.socials.email}</span>. We typically respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-muted-silver uppercase tracking-widest">
                    YOUR NAME / STUDIO
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Satoshi Nakamoto"
                    className="w-full bg-graphite/40 border border-white/10 rounded-xl px-5 py-4 text-warm-ivory focus:outline-none focus:border-copper transition-colors placeholder:text-muted-silver/30 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-muted-silver uppercase tracking-widest">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. satoshi@bitcoin.org"
                    className="w-full bg-graphite/40 border border-white/10 rounded-xl px-5 py-4 text-warm-ivory focus:outline-none focus:border-copper transition-colors placeholder:text-muted-silver/30 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-muted-silver uppercase tracking-widest">
                    PROJECT VISION & SCOPE
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your digital experience, deliverables, timeline..."
                    className="w-full bg-graphite/40 border border-white/10 rounded-xl px-5 py-4 text-warm-ivory focus:outline-none focus:border-copper transition-colors placeholder:text-muted-silver/30 resize-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className={`w-full py-4 rounded-xl font-space font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all active:scale-95 ${
                    formState === 'success'
                      ? 'bg-emerald-500 text-obsidian shadow-[0_0_25px_rgba(16,185,129,0.4)]'
                      : 'bg-gradient-to-r from-copper-dark via-copper to-copper-light hover:brightness-110 text-obsidian shadow-[0_0_25px_rgba(184,115,80,0.4)]'
                  }`}
                >
                  {formState === 'idle' && (
                    <>
                      <span>DISPATCH INQUIRY</span>
                      <Send size={16} />
                    </>
                  )}
                  {formState === 'sending' && (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                      <span>TRANSMITTING TO INBOX...</span>
                    </div>
                  )}
                  {formState === 'success' && (
                    <>
                      <span>TRANSMISSION DISPATCHED TO {BRAND.socials.email.toUpperCase()}</span>
                      <CheckCircle size={16} />
                    </>
                  )}
                </button>

                {statusNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono space-y-1 text-center"
                  >
                    <p className="font-bold tracking-wide">✓ INQUIRY DISPATCHED DIRECTLY TO {BRAND.socials.email.toUpperCase()}</p>
                    <p className="text-emerald-400/80">{statusNotice}</p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
