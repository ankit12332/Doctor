import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const DoctorAvatar: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const deviceCount = 12; // 1 central node + 11 IoT devices

  // Generate random positions for IoT devices on a spherical shell (radius 2-3)
  const devices = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < deviceCount - 1; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random();
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      arr.push(new THREE.Vector3(x, y, z));
    }
    return arr;
  }, [deviceCount]);

  // Create connections from the central node (at origin) to each device
  const connections = useMemo(() => {
    return devices.map((device) => ({
      start: new THREE.Vector3(0, 0, 0),
      end: device,
    }));
  }, [devices]);

  // Create and update the line geometry for connections
  const linesGeometry = useRef<THREE.BufferGeometry>(null);
  useEffect(() => {
    if (linesGeometry.current) {
      const positions: number[] = [];
      connections.forEach(({ start, end }) => {
        positions.push(start.x, start.y, start.z);
        positions.push(end.x, end.y, end.z);
      });
      linesGeometry.current.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      linesGeometry.current.computeBoundingSphere();
    }
  }, [connections]);

  // Rotate the entire network slowly for a dynamic effect
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central AI Core Node */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ff6363" emissive="#ff6363" emissiveIntensity={0.5} />
      </mesh>

      {/* IoT Device Nodes */}
      {devices.map((pos, idx) => (
        <mesh key={idx} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#34d399" />
        </mesh>
      ))}

      {/* Connection Lines */}
      <lineSegments>
        <bufferGeometry ref={linesGeometry} />
        <lineBasicMaterial color="#9ca3af" transparent opacity={0.8} />
      </lineSegments>
    </group>
  );
};

export default DoctorAvatar;
