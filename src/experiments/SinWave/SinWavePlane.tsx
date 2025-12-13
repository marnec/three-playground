import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Mesh, PlaneGeometry, Vector3 } from "three";
import { getThemeColorHSL, hslToRgb } from "../../utils/theme";
import SinWaveScene from "../components/SinWaveScene";

function SinWavePlane() {
  return (
    <SinWaveScene>
      <Plane />
    </SinWaveScene>
  );
}

function Plane() {
  const planeRef = useRef<Mesh<PlaneGeometry>>(null);

  const geometryArgs: ThreeElements["planeGeometry"]["args"] = [20, 20, 50, 50];

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

  const colors = new Float32Array(vertexCount * 3).fill(1);

  return (
    <mesh ref={planeRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={geometryArgs}>
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </planeGeometry>
      <meshBasicMaterial wireframe={true} vertexColors={true} />
    </mesh>
  );
}

export default SinWavePlane;
