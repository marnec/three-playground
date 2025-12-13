import { useFrame } from "@react-three/fiber";
import type { Properties } from "@react-three/fiber/dist/declarations/src/core/utils";
import { useRef, useState } from "react";
import type { Mesh } from "three";
import { useThemeColor } from "../../hooks/useThemeColor";

function Box(props?: Partial<Properties<Mesh>>) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const primaryColor = useThemeColor("primary");
  const accentColor = useThemeColor("accent");
  useFrame((_, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x += delta;
  });
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? accentColor : primaryColor} />
    </mesh>
  );
}

export default Box;
