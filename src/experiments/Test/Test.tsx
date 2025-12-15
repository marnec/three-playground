import { Canvas } from "@react-three/fiber";
import Box from "./Box";
import { Vector3 } from "three";
import { usePageVisibility } from "../../hooks/usePageVisibility";

function Test() {
  const isVisible = usePageVisibility();

  return (
    <Canvas className="w-full h-full" frameloop={isVisible ? "always" : "never"}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box position={new Vector3(-1.2, 0, 0)} />
      <Box position={new Vector3(1.2, 0, 0)} />
    </Canvas>
  );
}

export default Test;
