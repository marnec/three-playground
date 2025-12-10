import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import {
    DoubleSide,
    Mesh,
    PlaneGeometry,
    PerspectiveCamera as ThreePCam,
    Vector3
} from "three";


function SinWavePlane() {
  const [mycam, setMycam] = useState<ThreePCam | null>();

  return (
    <Canvas className="w-full h-full">
      <ambientLight intensity={Math.PI / 2} />
      <PerspectiveCamera makeDefault position={[20, 10, 10]} ref={setMycam} />
      {mycam && <CameraControls camera={mycam} />}
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

      <Plane />
      {/* <PointGrid /> */}
    </Canvas>
  );
}

function Plane() {
  const planeRef = useRef<Mesh<PlaneGeometry>>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (!planeRef.current) return;

    const position = planeRef.current.geometry.attributes.position;
    const vPos = new Vector3();

    for (let i = 0; i < position.count; i++) {
      vPos.fromBufferAttribute(position, i);
      let z = Math.sin(
        -t * 2 + Math.hypot(position.getX(i) * 2, position.getY(i) * 2)
      );

      position.setZ(i, z / 3);
    }

    position.needsUpdate = true;
  });

  return (
    <mesh ref={planeRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20, 100, 100]} />
      <meshBasicMaterial side={DoubleSide} color={0xffff00} wireframe={true} />
    </mesh>
  );
}



export default SinWavePlane;
