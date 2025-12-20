import { Grid, type GridMaterialType, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Line, Mesh, Plane, SphereGeometry, Vector3 } from "three";
import { getThemeColor } from "../../utils/theme";
import GridScene from "../components/GridScene";

function Raycasting() {
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

  const line = useRef<Line | null>(null);
  const text = useRef<(Mesh & { text?: string }) | null>(null);
  const sphere = useRef<Mesh<SphereGeometry> | null>(null);

  const sectionSize = 2;
  const sphereRadius = 0.2;

  const gridConfig: GridMaterialType = {
    infiniteGrid: true,
    cellSize: 0.5,
    cellColor: primary,
    sectionColor: primary,
    sectionSize,
  };

  useFrame(() => {
    if (!line.current || !text.current || !sphere.current) return;

    raycaster.setFromCamera(pointer, camera);

    const intersection = raycaster.ray.intersectPlane(
      groundPlane,
      intersectionPoint
    );

    if (!intersection) return;

    const { x, z } = intersection;

    sphere.current.position.set(x, 0, z);

    text.current.text = `x: ${x.toFixed(2)}\nz: ${z.toFixed(2)}`;
    text.current.position.set(x + sphereRadius, 0.1, z - sphereRadius);

    const cameraPosition = camera.position.clone();
    cameraPosition.add(new Vector3(0, -0.08, 0));

    line.current.geometry.setFromPoints([new Vector3(x, 0, z), cameraPosition]);
  });

  return (
    <>
      <Grid {...gridConfig}/>
      <Text
        color="black"
        anchorX="left"
        anchorY="top"
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        ref={text}
        fontSize={0.3}
      >
        x: 0.00{"\n"}z: 0.00
      </Text>
      <mesh ref={sphere}>
        <sphereGeometry
          args={[sphereRadius, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshBasicMaterial wireframe />
      </mesh>

      <line ref={line as unknown as React.RefObject<SVGLineElement>}>
        <bufferGeometry />
        <lineBasicMaterial color={accent} />
      </line>
    </>
  );
}

export default Raycasting;
