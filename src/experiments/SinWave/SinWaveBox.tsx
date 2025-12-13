import {
  BoxGeometry,
  type BufferAttribute,
  type InterleavedBufferAttribute,
} from "three";
import SinWaveScene from "../components/SinWaveScene";
import { useRef, useEffect, useMemo } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { getThemeColorHSL, hslToRgb } from "../../utils/theme";

function SinWaveBox() {
  return (
    <SinWaveScene>
      <Box />
    </SinWaveScene>
  );
}

function Box() {
  const MIN_DIST = 0.0001;
  const size = 10;
  const segments = 20;
  const geometryArgs: ThreeElements["boxGeometry"]["args"] = [
    size,
    size,
    size,
    segments,
    segments,
    segments,
  ];
  const baseHSL = useMemo(() => getThemeColorHSL("primary"), []);

  const geometry = useRef<BoxGeometry | null>(null);
  const originalPositions = useRef<
    BufferAttribute | InterleavedBufferAttribute | null
  >(null);

  useEffect(() => {
    if (geometry.current) {
      originalPositions.current = geometry.current.attributes.position.clone();
    }
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (!geometry.current || !originalPositions.current) return;

    if (!geometry.current.index) return;

    const { start, count } = geometry.current.groups[0];
    const index = geometry.current.index.array;

    const positions = geometry.current.attributes.position;
    const color = geometry.current.attributes.color;

    for (let i = start; i < count; i++) {
      const vertexIndex = index[i];
      const origX = originalPositions.current.getX(vertexIndex);
      const y = positions.getY(vertexIndex);
      const z = positions.getZ(vertexIndex);

      const d = Math.hypot(y, z);

      // Compute maxD based on angle - find where ray from center intersects edge
      let dampen: number;
      if (d < MIN_DIST) {
        dampen = 1; // at center
      } else {
        const angle = Math.atan2(z, y);
        const cosA = Math.abs(Math.cos(angle));
        const sinA = Math.abs(Math.sin(angle));

        // Distance to edge in each direction
        const maxDY = cosA > MIN_DIST ? (size / 2) / cosA : Infinity;
        const maxDZ = sinA > MIN_DIST ? (size / 2) / sinA : Infinity;
        const maxD = Math.min(maxDY, maxDZ);

        dampen = 1 - d / maxD;
      }
      const frequency = 3;
      const displacement = Math.sin(d * frequency + -t * 2) * 0.5 * dampen;

      const x = origX + displacement;

      positions.setX(vertexIndex, x);

      const lightness = Math.max(
        0.3,
        Math.min(1, baseHSL.l + displacement * 2)
      );

      const [r, g, b] = hslToRgb(baseHSL.h, baseHSL.s, lightness);

      color.setXYZ(vertexIndex, r, g, b);
    }

    positions.needsUpdate = true;
    color.needsUpdate = true;
  });

  const geom = new BoxGeometry(...geometryArgs);
  const vertexCount = geom.attributes.position.count;
  const colors = new Float32Array(vertexCount * 3).fill(1);

  return (
    <mesh>
      <boxGeometry args={geometryArgs} ref={geometry}>
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </boxGeometry>
      <meshBasicMaterial wireframe vertexColors></meshBasicMaterial>
    </mesh>
  );
}

export default SinWaveBox;
