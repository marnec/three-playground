import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, type PropsWithChildren } from "react";
import { PerspectiveCamera as ThreePCam } from "three";
import { usePageVisibility } from "../../hooks/usePageVisibility";

export interface GridProps extends PropsWithChildren {
  autoRotate?: boolean;
}

function GridScene({ autoRotate, children }: GridProps) {
  const [camera, setCamera] = useState<ThreePCam | null>();
  const isVisible = usePageVisibility();

  return (
    <Canvas
      className="w-full h-full"
      frameloop={isVisible ? "always" : "never"}
    >
      <ambientLight intensity={Math.PI / 2} />
      <PerspectiveCamera makeDefault position={[7, 6, 5]} ref={setCamera} />
      {camera && (
        <>
          <OrbitControls
            camera={camera}
            target={[0, -6, 0]}
            autoRotate={autoRotate}
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </>
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

export default GridScene;
