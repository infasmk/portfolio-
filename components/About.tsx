
import React from 'react';
import { motion as motionBase } from 'framer-motion';

// Fix for framer-motion type issues where initial/animate/exit are not recognized
const motion = motionBase as any;

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: -20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative z-10 overflow-hidden rounded-3xl group aspect-[4/5] sm:aspect-square md:aspect-auto shadow-2xl shadow-blue-500/5">
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
                alt="Studio Environment"
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-24 h-24 md:w-40 md:h-40 border border-blue-500/20 rounded-full animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-blue-600/5 blur-[80px] md:blur-[100px]" />
          </motion.div>

          <motion.div 
            className="space-y-6 md:space-y-8 order-1 lg:order-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-blue-500 font-space font-bold tracking-[0.2em] uppercase text-xs mb-4">
                // OUR STORY
              </h2>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold font-space text-white leading-[1.1] tracking-tighter">
                Crafting digital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-white italic">masterpieces</span> <br />
                since 2018.
              </h3>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-lg"
            >
              We are a team of multidisciplinary creatives, developers, and dreamers based in the digital ether. Our work bridges the gap between pure technology and human emotion, creating lasting impressions through immersive web environments.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 md:gap-8 pt-4"
            >
              <div className="group bg-white/5 p-4 md:p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-500">
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">120+</h4>
                <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-wider font-bold">Projects Launched</p>
              </div>
              <div className="group bg-white/5 p-4 md:p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-500">
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">15</h4>
                <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-wider font-bold">Industry Awards</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="pt-6"
            >
              <button className="group relative text-white font-bold text-sm md:text-base inline-flex items-center gap-2">
                <span className="relative z-10">LEARN MORE ABOUT US</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500 transform origin-left scale-x-100 group-hover:scale-x-110 transition-transform duration-500" />
                <div className="w-8 h-[1px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
