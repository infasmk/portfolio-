import React, { useState } from 'react';
import { motion as motionBase } from 'framer-motion';
import { Send, CheckCircle, ArrowUpRight, Copy, Check, MessageSquare, Mail, Instagram, Github, Linkedin } from 'lucide-react';
import { BRAND } from '../constants';

const motion = motionBase as any;

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(BRAND.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormState('idle'), 5000);
    }, 1200);
  };

  const contactMethods = [
    {
      name: 'EMAIL',
      value: BRAND.socials.email,
      href: `mailto:${BRAND.socials.email}`,
      icon: Mail,
      desc: 'Direct conversation',
    },
    {
      name: 'WHATSAPP',
      value: 'Instant Chat',
      href: BRAND.socials.whatsapp,
      icon: MessageSquare,
      desc: 'Quick inquiries',
    },
    {
      name: 'GITHUB',
      value: '@infasmk',
      href: BRAND.socials.github,
      icon: Github,
      desc: 'Code repository',
    },
    {
      name: 'INSTAGRAM',
      value: '@infasmk',
      href: BRAND.socials.instagram,
      icon: Instagram,
      desc: 'Design experiments',
    },
  ];

  return (
    <section id="contact" className="py-28 md:py-40 bg-[#050505] relative overflow-hidden">
      {/* Background Cinematic Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/10 via-cyan-500/5 to-transparent rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10 md:mb-16">
          <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">
            // 05 INITIATE COLLABORATION
          </span>
          <div className="h-[1px] w-24 bg-white/10" />
        </div>

        {/* Climax Statement */}
        <div className="mb-20">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-space font-extrabold text-white tracking-tighter leading-[0.88] uppercase mb-8">
            LET'S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-blue-500">
              SOMETHING
            </span> <br />
            USEFUL.
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-500/50 text-white font-mono text-xs tracking-wider transition-all"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'EMAIL COPIED TO CLIPBOARD' : BRAND.socials.email}</span>
            </button>

            <span className="text-zinc-500 text-xs font-mono hidden sm:inline-block">
              // TYPICAL RESPONSE TIME: &lt; 24 HOURS
            </span>
          </div>
        </div>

        {/* Contact Matrix: Channels + Interactive Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-4">
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
                  className="group flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/[0.03] text-zinc-400 group-hover:text-cyan-400 transition-colors">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-space font-bold text-base group-hover:text-cyan-300 transition-colors">
                        {method.name}
                      </h4>
                      <p className="text-zinc-500 text-xs font-mono">{method.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                      {method.value}
                    </span>
                    <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
              className="p-8 md:p-12 rounded-3xl bg-[#090a0f] border border-white/10 relative overflow-hidden shadow-2xl"
            >
              <h3 className="text-2xl font-space font-bold text-white mb-2">
                START A PROJECT
              </h3>
              <p className="text-zinc-400 text-sm font-light mb-8">
                Tell us about your objectives, timeline, and vision.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                    YOUR NAME / STUDIO
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Satoshi Nakamoto"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-zinc-700 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. satoshi@bitcoin.org"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-zinc-700 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                    PROJECT VISION & SCOPE
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your digital experience, deliverables, timeline..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-zinc-700 resize-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState !== 'idle'}
                  className={`w-full py-4 rounded-xl font-space font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all active:scale-95 ${
                    formState === 'success'
                      ? 'bg-emerald-500 text-black'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-[0_0_25px_rgba(37,99,235,0.4)]'
                  }`}
                >
                  {formState === 'idle' && (
                    <>
                      <span>DISPATCH INQUIRY</span>
                      <Send size={16} />
                    </>
                  )}
                  {formState === 'sending' && (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  {formState === 'success' && (
                    <>
                      <span>TRANSMISSION RECEIVED</span>
                      <CheckCircle size={16} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
