import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import HospitalModel from './DoctorAvatar';
import { OrbitControls, Environment } from '@react-three/drei';

const Scene3D: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7.5]} intensity={0.8} />
      <Suspense fallback={null}>
        <HospitalModel />
        <OrbitControls enableZoom={false} enablePan={false} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};

export default Scene3D;
