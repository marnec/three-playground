import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import {
  BufferGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera as ThreePCam
} from "three";

function SinWaveGrid() {
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

      <PointGrid />
    </Canvas>
  );
}

function PointGrid() {
  const gridSize = 21;
  const positions = useMemo(() => {
    const coords: [number, number, number][] = [];
    for (let x = 0; x < gridSize; x++)
      for (let z = 0; z < gridSize; z++)
        coords.push([x + 0.5 - gridSize / 2, 0, z + 0.5 - gridSize / 2]);
    return coords;
  }, [gridSize]);

  const meshRefs = useRef<
    Array<Mesh<BufferGeometry, MeshBasicMaterial> | null>
  >([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRefs.current.forEach((m, i) => {
      if (!m) return;

      const [x, _, z] = positions[i];

      const radius = Math.hypot(x, z);

      const y = Math.sin(-t + radius);

      m.position.y = y;
      m.material.color.setHSL(
        0.5,
        Math.max(0.5, y % 0.7),
        Math.max(0.3, 1 - (y % 1))
      );

      m.updateMatrix();
    });
  });

  return (
    <>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el: Mesh<BufferGeometry, MeshBasicMaterial> | null) =>
            (meshRefs.current[i] = el)
          }
          position={pos}
          scale={0.1}
        >
          <sphereGeometry />
          <meshBasicMaterial />
        </mesh>
      ))}
    </>
  );
}

export default SinWaveGrid;
