import { Grid, type GridMaterialType } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Mesh, Plane, Vector3 } from "three";
import { getThemeColor } from "../../utils/theme";
import GridScene from "../components/GridScene";

function LerpGrid() {
  return (
    <GridScene>
      <GridContent />
    </GridScene>
  );
}

function GridContent() {
  const primary = getThemeColor("primary");
  const accent = getThemeColor("accent");

  const groundPlane = useMemo(() => new Plane(new Vector3(0, 1, 0), 0), []);
  const intersectionPoint = useMemo(() => new Vector3(), []);

  const { pointer, camera, raycaster } = useThree();

  const box = useRef<Mesh | null>(null);

  const boxSize = 0.5;
  const sectionSize = 2;

  const gridConfig: GridMaterialType = {
    infiniteGrid: true,
    cellSize: 0.5,
    cellColor: primary,
    sectionSize
  };

  useFrame((_, delta) => {
    if (!box.current) return;

    raycaster.setFromCamera(pointer, camera);

    const intersection = raycaster.ray.intersectPlane(
      groundPlane,
      intersectionPoint
    );

    if (!intersection) return;

    const {x, z} = intersection;

    const targetX = Math.round(x / sectionSize) * sectionSize
    const targetZ = Math.round(z / sectionSize) * sectionSize

    
    const lerpFactor = 1 - Math.pow(0.0001, delta); 
    
    box.current.position.x += (targetX - box.current.position.x) * lerpFactor
    box.current.position.z += (targetZ - box.current.position.z) * lerpFactor
  });


  return (
    <>
      <Grid {...gridConfig} />
      <mesh position={[0, boxSize/2, 0]} ref={box}>
        <meshBasicMaterial color={accent} />
        <boxGeometry args={[boxSize, boxSize, boxSize]} />
      </mesh>
    </>
  );
}

export default LerpGrid;
