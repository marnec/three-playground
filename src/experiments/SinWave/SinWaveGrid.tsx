import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BufferGeometry, Mesh, MeshBasicMaterial } from "three";
import { getThemeColorHSL } from "../../utils/theme";
import SinWaveScene, { type SinWaveProps } from "../components/SinWaveScene";

function SinWaveGrid({ autoRotate }: SinWaveProps) {
  return (
    <SinWaveScene autoRotate={autoRotate}>
      <SphericalPointsGrid />
    </SinWaveScene>
  );
}

function SphericalPointsGrid() {
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

  const { h } = useMemo(() => getThemeColorHSL("primary"), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRefs.current.forEach((m, i) => {
      if (!m) return;

      const [x, _, z] = positions[i];

      const radius = Math.hypot(x, z);

      const y = Math.sin(-t + radius);

      m.position.y = y;
      m.material.color.setHSL(
        h,
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
