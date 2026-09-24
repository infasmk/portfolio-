import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { Lock, X, Copy, Check, Plus, Trash2, Sparkles, ExternalLink, Code2, Eye, RefreshCw } from 'lucide-react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

const motion = motionBase as any;

interface ProjectCodeGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  nextId?: number;
}

const SAMPLE_PRESET = {
  title: 'Hyperion Spatial Engine',
  subheading: 'WebGPU 3D Simulation Platform',
  createdBy: 'Infas.mk // WEB⚡BITS',
  image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
  description: 'Next-generation spatial computation canvas running real-time neural post-processing shaders and volumetric particle fields at locked 60FPS.',
  features: [
    'Sub-10ms frame budget with WebGPU compute pipelines',
    'Real-time procedural physics with GPU particle simulation',
    'Adaptive viewport responsiveness across mobile & desktop'
  ],
  link: 'https://aevo-22.vercel.app/',
  featured: true,
};

export const ProjectCodeGenerator: React.FC<ProjectCodeGeneratorProps> = ({
  isOpen,
  onClose,
  nextId = 9,
}) => {
  const [id, setId] = useState<number>(nextId);
  const [title, setTitle] = useState('');
  const [subheading, setSubheading] = useState('');
  const [createdBy, setCreatedBy] = useState('Infas.mk // WEB⚡BITS');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [link, setLink] = useState('');
  const [featured, setFeatured] = useState(true);

  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [copied, setCopied] = useState(false);

  // Features list helpers
  const handleFeatureChange = (index: number, val: string) => {
    const updated = [...features];
    updated[index] = val;
    setFeatures(updated);
  };

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleRemoveFeature = (index: number) => {
    if (features.length === 1) {
      setFeatures(['']);
    } else {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };

  const loadSample = () => {
    setTitle(SAMPLE_PRESET.title);
    setSubheading(SAMPLE_PRESET.subheading);
    setCreatedBy(SAMPLE_PRESET.createdBy);
    setImage(SAMPLE_PRESET.image);
    setDescription(SAMPLE_PRESET.description);
    setFeatures([...SAMPLE_PRESET.features]);
    setLink(SAMPLE_PRESET.link);
    setFeatured(SAMPLE_PRESET.featured);
  };

  const handleClear = () => {
    setTitle('');
    setSubheading('');
    setCreatedBy('Infas.mk // WEB⚡BITS');
    setImage('');
    setDescription('');
    setFeatures(['']);
    setLink('');
    setFeatured(false);
  };

  // Generate clean TypeScript Code block
  const validFeatures = features.map((f) => f.trim()).filter((f) => f.length > 0);

  const generateTypeScriptCode = (): string => {
    const lines: string[] = [];
    lines.push('  {');
    lines.push(`    id: ${id},`);
    lines.push(`    title: ${JSON.stringify(title || 'Untitled Project')},`);

    if (subheading.trim()) {
      lines.push(`    subheading: ${JSON.stringify(subheading.trim())},`);
    }

    if (createdBy.trim()) {
      lines.push(`    createdBy: ${JSON.stringify(createdBy.trim())},`);
    }

    lines.push(`    image: ${JSON.stringify(image.trim() || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200')},`);
    lines.push(`    description: ${JSON.stringify(description.trim() || 'Project summary description.')},`);

    if (validFeatures.length > 0) {
      lines.push('    features: [');
      validFeatures.forEach((feat, idx) => {
        const isLast = idx === validFeatures.length - 1;
        lines.push(`      ${JSON.stringify(feat)}${isLast ? '' : ','}`);
      });
      lines.push('    ],');
    }

    if (link.trim()) {
      lines.push(`    link: ${JSON.stringify(link.trim())},`);
    }

    lines.push(`    featured: ${featured}`);
    lines.push('  },');

    return lines.join('\n');
  };

  const generatedCode = generateTypeScriptCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Preview Project Object
  const previewProject: Project = {
    id: id || 99,
    title: title || 'Preview Project Title',
    subheading: subheading || 'Category / Subtitle',
    createdBy: createdBy || 'Infas.mk',
    image: image.trim() || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    description: description || 'Enter a project description on the left to see how your live card layout renders with typography, glassmorphism, and responsive spacing.',
    features: validFeatures.length > 0 ? validFeatures : ['Sample key feature point 01', 'Sample key feature point 02'],
    link: link || 'https://example.com',
    featured,
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-[#090b10] border border-cyan-500/30 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.2)] flex flex-col overflow-hidden z-10 text-white"
        >
          {/* Top Bar Header */}
          <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Lock size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-space font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
                    PROJECT CODE GENERATOR
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold uppercase">
                    Admin Tool
                  </span>
                </div>
                <p className="text-zinc-400 text-xs font-mono">
                  Fill in your project details, click generate, and copy the snippet directly into <code className="text-cyan-300">projects.ts</code>.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={loadSample}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all"
                title="Fill sample project details"
              >
                <Sparkles size={13} className="text-cyan-400" />
                <span>Fill Sample</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Main Body: Two Columns (Form on left, Code/Preview on right) */}
          <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* Left Column: Form Details (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-7 space-y-5 overflow-y-auto">
              {/* Row 1: ID & Featured Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Project ID <span className="text-zinc-600">(Number)</span>
                  </label>
                  <input
                    type="number"
                    value={id}
                    onChange={(e) => setId(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none font-mono text-sm text-white transition-all"
                    placeholder="e.g. 9"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Showcase Status
                  </label>
                  <label className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 cursor-pointer hover:border-cyan-500/40 transition-all select-none">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
                    />
                    <div className="text-xs font-mono">
                      <span className={featured ? 'text-cyan-300 font-bold' : 'text-zinc-400'}>
                        {featured ? 'Featured on Main Screen' : 'Catalog Only'}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Project Title */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Project Title <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Aevo Data Matrix"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none font-space font-bold text-sm text-white placeholder:text-zinc-600 transition-all"
                />
              </div>

              {/* Row 2: Subheading & Created By */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Subheading / Category <span className="text-zinc-600">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={subheading}
                    onChange={(e) => setSubheading(e.target.value)}
                    placeholder="e.g. 3D Web Experience"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none font-mono text-sm text-white placeholder:text-zinc-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Created By <span className="text-zinc-600">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    placeholder="e.g. Infas.mk // WEB⚡BITS"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none font-mono text-sm text-white placeholder:text-zinc-600 transition-all"
                  />
                </div>
              </div>

              {/* Cover Image URL */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-mono uppercase text-zinc-400">
                    Cover Image URL <span className="text-cyan-400">*</span>
                  </label>
                  {image && (
                    <a
                      href={image}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Check Image</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none font-mono text-xs text-white placeholder:text-zinc-600 transition-all"
                  />
                  {image && (
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-black">
                      <img src={image} alt="Thumb" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Project Description <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A clear, professional summary of what this project does, key technical highlights, and impact..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none font-mono text-xs leading-relaxed text-white placeholder:text-zinc-600 transition-all resize-none"
                />
              </div>

              {/* Live Website Link */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Website Live Link <span className="text-zinc-600">(Direct Visit URL)</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://my-live-website.com"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none font-mono text-xs text-white placeholder:text-zinc-600 transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                    <ExternalLink size={14} />
                  </div>
                </div>
              </div>

              {/* Key Features Bullet Highlights */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400">
                      Key Feature Highlights <span className="text-zinc-600">(Optional Bullets)</span>
                    </label>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      Leave empty if no bullets needed — it won't show.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-all"
                  >
                    <Plus size={12} />
                    <span>Add Point</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-cyan-400 text-xs font-mono">⚡</span>
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        placeholder={`Feature point ${idx + 1} (e.g. 60FPS fluid physics)`}
                        className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none font-mono text-xs text-white placeholder:text-zinc-600 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="p-2 rounded-lg bg-white/[0.03] hover:bg-rose-500/20 text-zinc-500 hover:text-rose-400 border border-white/5 transition-all"
                        title="Remove point"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Action Controls */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5"
                >
                  <RefreshCw size={12} />
                  <span>Reset Form</span>
                </button>
              </div>
            </div>

            {/* Right Column: Code Output & Live Card Preview (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between bg-black/40">
              <div>
                {/* Tab Switcher: Code vs Preview */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex rounded-xl bg-white/[0.05] p-1 border border-white/10">
                    <button
                      type="button"
                      onClick={() => setActiveTab('code')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                        activeTab === 'code'
                          ? 'bg-cyan-400 text-black font-bold shadow'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Code2 size={13} />
                      <span>TypeScript Code</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('preview')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                        activeTab === 'preview'
                          ? 'bg-cyan-400 text-black font-bold shadow'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Eye size={13} />
                      <span>Card Preview</span>
                    </button>
                  </div>

                  <span className="text-[11px] font-mono text-zinc-500">
                    Ready to paste
                  </span>
                </div>

                {/* Tab 1: Formatted TypeScript Output */}
                {activeTab === 'code' ? (
                  <div className="relative">
                    <div className="p-4 rounded-2xl bg-[#050608] border border-cyan-500/20 font-mono text-[11px] sm:text-xs text-cyan-200 overflow-x-auto leading-relaxed shadow-inner max-h-[380px] overflow-y-auto">
                      <pre className="text-zinc-300">
                        <code>{generatedCode}</code>
                      </pre>
                    </div>

                    <div className="mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-zinc-400">
                      💡 <strong className="text-zinc-200">Instructions:</strong> Copy this object and paste it inside the <span className="text-cyan-400">PROJECTS</span> array in <code className="text-white">projects.ts</code>.
                    </div>
                  </div>
                ) : (
                  /* Tab 2: Live Card Preview */
                  <div className="flex flex-col items-center justify-center p-2">
                    <div className="w-full max-w-sm">
                      <ProjectCard
                        project={previewProject}
                        index={0}
                        total={1}
                        compact={true}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Big Action: Copy to Clipboard Button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`w-full py-3.5 px-6 rounded-2xl font-space font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl ${
                    copied
                      ? 'bg-emerald-500 text-black shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:opacity-95 shadow-cyan-500/30'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={18} />
                      <span>COPIED TO CLIPBOARD! ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      <span>COPY CODE TO CLIPBOARD</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectCodeGenerator;
