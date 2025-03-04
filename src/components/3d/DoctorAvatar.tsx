import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Group } from 'three';

// Note: This is a simplified 3D component that simulates a doctor avatar
// In a real implementation, you would use an actual 3D model

const DoctorAvatar: React.FC = () => {
  const group = useRef<Group>(null);
  
  // Animate the avatar
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      
      <group ref={group}>
        {/* Simplified doctor representation using basic shapes */}
        <group position={[0, -1, 0]}>
          {/* Head */}
          <mesh position={[0, 2.7, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#f5d0c5" />
          </mesh>
          
          {/* Body */}
          <mesh position={[0, 1.5, 0]}>
            <capsuleGeometry args={[0.5, 1.5, 8, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          
          {/* Stethoscope */}
          <mesh position={[0, 1.8, 0.4]}>
            <torusGeometry args={[0.2, 0.03, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#0ea5e9" />
          </mesh>
          
          {/* Lab coat details */}
          <mesh position={[0, 1.5, 0.51]}>
            <boxGeometry args={[0.8, 1.5, 0.01]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>
      </group>
      
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
    </>
  );
};

export default DoctorAvatar;