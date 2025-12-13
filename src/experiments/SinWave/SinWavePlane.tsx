import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import {
  DoubleSide,
  Mesh,
  PlaneGeometry,
  PerspectiveCamera as ThreePCam,
  Vector3,
} from "three";
import { getThemeColorHSL, hslToRgb } from "../../utils/theme";

function SinWavePlane() {
  const [mycam, setMycam] = useState<ThreePCam | null>();

  return (
    <Canvas className="w-full h-full">
      <ambientLight intensity={Math.PI / 2} />
      <PerspectiveCamera makeDefault position={[20, 10, 10]} ref={setMycam} />
      {mycam && <OrbitControls camera={mycam} enableZoom={false} enablePan={false} />}
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

  const geometryArgs: [number, number, number, number] = [20, 20, 50, 50];

  const baseHSL = useMemo(() => getThemeColorHSL("primary"), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (!planeRef.current) return;

    const position = planeRef.current.geometry.attributes.position;
    const color = planeRef.current.geometry.attributes.color;
    const vPos = new Vector3();

    for (let i = 0; i < position.count; i++) {
      vPos.fromBufferAttribute(position, i);
      let z = Math.sin(
        -t * 2 + Math.hypot(position.getX(i) * 2, position.getY(i) * 2)
      );

      position.setZ(i, z / 3);

      const lightness = Math.max(0.3, Math.min(1, baseHSL.l + z * 0.8));

      const [r, g, b] = hslToRgb(baseHSL.h, baseHSL.s, lightness);

      color.setXYZ(i, r, g, b);
    }

    position.needsUpdate = true;
    color.needsUpdate = true;
  });

  const geom = new PlaneGeometry(...geometryArgs);
  const vertexCount = geom.attributes.position.count;

  // Make an initial color buffer
  const colors = new Float32Array(vertexCount * 3).fill(1);

  return (
    <mesh ref={planeRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={geometryArgs}>
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </planeGeometry>
      <meshBasicMaterial
        side={DoubleSide}
        wireframe={true}
        vertexColors={true}
      />
    </mesh>
  );
}

export default SinWavePlane;
