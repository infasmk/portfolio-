
import React, { useState } from 'react';
import { motion as motionBase } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

// Fix for framer-motion type issues where initial/animate/exit are not recognized
const motion = motionBase as any;

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-[#050505] relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          <div className="flex flex-col justify-center">
            <h2 className="text-blue-500 font-space font-bold tracking-[0.2em] uppercase text-xs mb-4">
              // CONTACT US
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold font-space text-white mb-8 md:mb-10 tracking-tighter leading-[1.1]">
              LET'S CREATE <br /> SOMETHING <br /> <span className="text-blue-600">ICONIC</span>.
            </h3>
            
            <div className="space-y-4 md:space-y-6 text-zinc-400 text-base md:text-lg">
              <p>Have a project in mind? We'd love to hear about it.</p>
              <div className="pt-6 md:pt-8 space-y-3 md:space-y-4">
                <p className="text-white font-bold text-xl md:text-2xl hover:text-blue-500 transition-colors">
                  <a href="mailto:hello@novastudio.com">hello@novastudio.com</a>
                </p>
                <div className="flex flex-col gap-1 text-sm md:text-base">
                  <p>+1 (555) 000-1234</p>
                  <p>San Francisco, CA & Remote</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-3xl backdrop-blur-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 md:py-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 md:py-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Your Vision</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your project goals..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 md:py-4 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none placeholder:text-zinc-700"
                />
              </div>

              <button
                type="submit"
                disabled={formState !== 'idle'}
                className={`w-full py-4 md:py-5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 ${
                  formState === 'success' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {formState === 'idle' && (
                  <>SEND INQUIRY <Send size={18} /></>
                )}
                {formState === 'sending' && (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {formState === 'success' && (
                  <>SENT SUCCESSFULLY <CheckCircle size={18} /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
