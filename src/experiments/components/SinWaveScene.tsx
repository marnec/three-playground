import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, type PropsWithChildren } from "react";
import { PerspectiveCamera as ThreePCam } from "three";

export interface SinWaveProps extends PropsWithChildren {
  autoRotate?: boolean;
}

function SinWaveScene({ autoRotate, children }: SinWaveProps) {
  const [camera, setCamera] = useState<ThreePCam | null>();

  return (
    <Canvas className="w-full h-full">
      <ambientLight intensity={Math.PI / 2} />
      <PerspectiveCamera makeDefault position={[20, 10, 10]} ref={setCamera} />
      {camera && (
        <OrbitControls
          camera={camera}
          autoRotate={autoRotate}
          enableZoom={false}
          enablePan={false}
        />
      )}
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

      {children}
    </Canvas>
  );
}

export default SinWaveScene;
