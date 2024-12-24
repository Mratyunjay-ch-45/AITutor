import React from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from '../Scene';
import { useGLTF } from '@react-three/drei';

import { OrbitControls, Environment } from '@react-three/drei';
function Room(props){
  const { scene } = useGLTF('/RoboRoom.glb');
   return <primitive object={scene} {...props} />;
 }
const ThreejsModel = () => {
  return (
    <div className="canvas-container flex justify-center items-center">
        <Canvas 
          camera={{ 
            position: [15, 4, 0],
            fov: 45
          }}
          style={{width:'100vw',height:'100vh'}}
        >
        {/* Lighter gradient background */}
        <color attach="background" args={['#CBD5E1']} />
        
        {/* Ambient lighting for overall visibility */}
        <ambientLight intensity={0.5} />
        
        {/* Main directional light */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.8}
          castShadow
        />

        {/* Fill light from opposite side */}
        <pointLight 
          position={[-5, 3, -5]} 
          intensity={0.4} 
          color="#CBD5E1"
        />

        {/* Ground plane with grid */}
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -0.5, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial 
            color="#CBD5E1"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>

        <OrbitControls 
          minDistance={3}
          maxDistance={10}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 0.65}
          enablePan={false}
        />

        <Suspense fallback={null}>
          <Model 
            scale={2.7}
            position={[0, -0.4, 0]} 
            rotation={[0, Math.PI / 2, 0]}
          />
          <Room scale={3} position={[0, 1.9, 0]} rotation={[0, Math.PI / 2, 0]} />
         
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
      
    </div>
  );
}

export default ThreejsModel;
