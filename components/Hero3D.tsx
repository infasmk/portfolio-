import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Ambient Starfield / Particle Dust
const QuantumParticles = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const [positions] = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return [pos];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.03;
      pointsRef.current.rotation.x = t * 0.015;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.45}
      />
    </Points>
  );
};

// Custom Procedural Metallic W⚡ Monogram Sculpture
const WebBitsMonogram = ({ wireframe = false }: { wireframe?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);
  const { mouse } = useThree();

  // Create custom extruded lightning bolt geometry
  const boltGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Lightning bolt coordinates forming a sharp W / electric bolt
    shape.moveTo(-0.2, 1.4);
    shape.lineTo(0.5, 0.2);
    shape.lineTo(0.05, 0.2);
    shape.lineTo(0.4, -1.4);
    shape.lineTo(-0.4, -0.1);
    shape.lineTo(0.05, -0.1);
    shape.closePath();

    const extrudeSettings = {
      steps: 2,
      depth: 0.35,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 5,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Wing geometry for the "W" facets
  const leftWingGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.2, 1.1);
    shape.lineTo(-0.7, -1.1);
    shape.lineTo(-0.35, -1.1);
    shape.lineTo(-0.6, 0.3);
    shape.lineTo(-0.3, 0.3);
    shape.lineTo(-0.1, 1.1);
    shape.closePath();

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 4,
    });
  }, []);

  const rightWingGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.1, 1.1);
    shape.lineTo(0.3, 0.3);
    shape.lineTo(0.6, 0.3);
    shape.lineTo(0.35, -1.1);
    shape.lineTo(0.7, -1.1);
    shape.lineTo(1.2, 1.1);
    shape.closePath();

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 4,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Natural floating rotation + mouse tracking lerp
      const targetRotX = mouse.y * 0.4 + Math.sin(t * 0.8) * 0.08;
      const targetRotY = mouse.x * 0.5 + t * 0.25;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.12;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.4;
      outerRingRef.current.rotation.z = t * 0.2;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = -t * 0.5;
      innerRingRef.current.rotation.x = -t * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={1.15}>
      {/* Central Lightning Core */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <group position={[-0.05, 0, 0]}>
          <mesh geometry={boltGeometry}>
            <meshStandardMaterial
              color="#0284c7"
              emissive="#0369a1"
              emissiveIntensity={wireframe ? 0.2 : 0.8}
              metalness={0.95}
              roughness={0.12}
              wireframe={wireframe}
            />
          </mesh>

          {/* Left Wing of W */}
          <mesh geometry={leftWingGeo} position={[0, 0, -0.05]}>
            <meshStandardMaterial
              color="#1e293b"
              emissive="#1d4ed8"
              emissiveIntensity={wireframe ? 0.1 : 0.4}
              metalness={0.92}
              roughness={0.18}
              wireframe={wireframe}
            />
          </mesh>

          {/* Right Wing of W */}
          <mesh geometry={rightWingGeo} position={[0, 0, -0.05]}>
            <meshStandardMaterial
              color="#1e293b"
              emissive="#0ea5e9"
              emissiveIntensity={wireframe ? 0.1 : 0.4}
              metalness={0.92}
              roughness={0.18}
              wireframe={wireframe}
            />
          </mesh>
        </group>
      </Float>

      {/* Futuristic Concentric Orbital Gyro Rings */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.6}
          metalness={1}
          roughness={0.1}
          wireframe={wireframe}
        />
      </mesh>

      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.7, 0.015, 16, 80]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#4f46e5"
          emissiveIntensity={0.5}
          metalness={1}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

interface Hero3DProps {
  wireframe?: boolean;
}

export const Hero3D: React.FC<Hero3DProps> = ({ wireframe = false }) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        {/* Electric Blue Key Light */}
        <spotLight position={[5, 6, 6]} angle={0.3} penumbra={1} intensity={3.5} color="#38bdf8" />
        {/* Cyan Accent Rim Light */}
        <pointLight position={[-6, -4, 4]} intensity={2.5} color="#06b6d4" />
        {/* Deep Indigo Backlight */}
        <pointLight position={[0, 0, -5]} intensity={1.8} color="#3b82f6" />

        <QuantumParticles />
        <WebBitsMonogram wireframe={wireframe} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default Hero3D;
