import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Sparkles } from '@react-three/drei';

const HeartShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Beating animation
      const t = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(t * 3) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    }
  });

  const x = 0, y = 0;
  const heartShape = new THREE.Shape();
  // Drawing a heart shape
  heartShape.moveTo( x + 5, y + 5 );
  heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
  heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
  heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
  heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
  heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
  heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

  const extrudeSettings = {
    depth: 4,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} rotation={[Math.PI, 0, 0]} position={[0, 5, 0]} scale={[0.5, 0.5, 0.5]}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshPhongMaterial color="#D4A5A5" shininess={100} specular={new THREE.Color("#ffdddd")} />
      </mesh>
    </Float>
  );
};

const ThreeHeart: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="w-full h-full cursor-pointer" onClick={onClick}>
      <Canvas camera={{ position: [0, 0, 30], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, -10, -10]} angle={0.3} />
        <HeartShape />
        <Sparkles count={100} scale={20} size={4} speed={0.4} opacity={0.5} color="#fff" />
      </Canvas>
    </div>
  );
};

export default ThreeHeart;