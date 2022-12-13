import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./style.css";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Groud } from "./Ground";
import { Neck } from "./Neck";
import { Blade } from "./Blade";

function WindShow() {
  return (
    <>
      <OrbitControls target={[0, 1.75, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />

      <Neck />
      <Blade />

      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"blue"} />
      </mesh> */}
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={3}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 5]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Groud />
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <WindShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
