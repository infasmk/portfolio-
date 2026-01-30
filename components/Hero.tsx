
import React, { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Environment, ContactShadows, Points, PointMaterial, TorusKnot, MeshWobbleMaterial } from '@react-three/drei';
import { motion as motionBase } from 'framer-motion';
import * as THREE from 'three';

// Fix for framer-motion type issues where initial/animate/exit are not recognized
const motion = motionBase as any;

const Stars = () => {
  const ref = useRef<any>(null!);
  const [positions] = useMemo(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return [pos];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.05;
    ref.current.rotation.x = t * 0.02;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
};

const AbstractSculpture = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const shellRef = useRef<THREE.Mesh>(null!);
  const { mouse } = useThree();

  const debrisPositions = useMemo(() => {
    const pos = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Smooth group rotation following mouse
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.5, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.5, 0.05);
      
      // Subtle breathing animation
      const scale = 1 + Math.sin(t) * 0.05;
      groupRef.current.scale.set(scale, scale, scale);
    }
    
    // Constant secondary rotation
    if (coreRef.current) coreRef.current.rotation.z = t * 0.2;
    if (shellRef.current) {
      shellRef.current.rotation.y = -t * 0.1;
      shellRef.current.rotation.x = t * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Distorted Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <TorusKnot ref={coreRef} args={[0.8, 0.25, 200, 32]} scale={1.2}>
          <MeshDistortMaterial
            color="#2563eb"
            speed={3}
            distort={0.4}
            radius={1}
            metalness={0.8}
            roughness={0.2}
            emissive="#1e3a8a"
            emissiveIntensity={0.5}
          />
        </TorusKnot>
      </Float>

      {/* Outer Wireframe Shell */}
      <Sphere ref={shellRef} args={[1.8, 16, 16]}>
        <meshStandardMaterial 
          color="#3b82f6" 
          wireframe 
          transparent 
          opacity={0.15} 
          metalness={1}
          roughness={0}
        />
      </Sphere>

      {/* Floating Particle Debris Around the Model */}
      <Points positions={debrisPositions} stride={3}>
        <PointMaterial 
          transparent 
          color="#60a5fa" 
          size={0.05} 
          sizeAttenuation 
          depthWrite={false} 
          opacity={0.5}
        />
      </Points>
    </group>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 opacity-60 md:opacity-100">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#3b82f6" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#1d4ed8" />
          
          <Suspense fallback={null}>
            <Stars />
            <AbstractSculpture />
            <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={15} blur={2.5} far={4} color="#000000" />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] md:text-xs font-bold tracking-[0.2em] mb-6 md:mb-8 uppercase">
            Future of Digital Experiences
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-space font-extrabold tracking-tighter leading-[0.9] text-white mb-6 md:mb-8">
            CREATIVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-indigo-600">UNIVERSE</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-xl mx-auto text-zinc-400 text-base md:text-lg lg:text-xl font-light mb-10 md:mb-12 px-4"
        >
          We build high-end interactive platforms that blend cutting-edge technology with cinematic storytelling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6"
        >
          <button 
            onClick={() => {
              const el = document.getElementById('projects');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 rounded-full text-white font-bold transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            EXPLORE PROJECTS
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('about');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-zinc-300 rounded-full font-bold hover:bg-white/10 transition-all"
          >
            OUR PHILOSOPHY
          </button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-zinc-700 flex justify-center pt-2"
      >
        <div className="w-1 h-1.5 md:h-2 bg-blue-500 rounded-full" />
      </motion.div>
    </section>
  );
};

export default Hero;
