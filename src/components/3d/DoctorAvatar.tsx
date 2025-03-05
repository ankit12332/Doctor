import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const DoctorModel: React.FC = () => {
  const { scene } = useGLTF('/models/doctor.glb');

  useEffect(() => {
    // 1) Compute the bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());

    // 2) Re-center the model around (0,0,0)
    //    Note: We use -= center.x (instead of += scene.position.x - center.x).
    scene.position.x -= center.x;
    scene.position.y -= center.y;
    scene.position.z -= center.z;

    // 3) Scale the model bigger
    scene.scale.set(1.7, 1.7, 1.7);

    // 4) Shift the model downward if needed
    //    This ensures the head is within the camera’s view.
    scene.position.y -= 1.2; // tweak this number
  }, [scene]);

  return <primitive object={scene} dispose={null} />;
};

export default DoctorModel;
