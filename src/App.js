import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./style.css";
import { OrbitControls, PerspectiveCamera, Sky } from "@react-three/drei";
// import { Groud } from "./Ground";
import { Neck } from "./Neck";
import { Blade } from "./Blade";
// import { TreeReflect } from "./TreeReflect";
// import { TreeTexture } from "./TreeTexture";
import Ocean from "./Ocean";
import { Html, useProgress } from "@react-three/drei";

function WindShow() {
  return (
    <>
      <OrbitControls target={[0, 1.75, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />

      <Neck />
      <Blade />
      {/* <TreeReflect />
      <TreeTexture /> */}

      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"blue"} />
      </mesh> */}

      <spotLight
        color={[1, 0.4, 1]}
        intensity={3}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 5]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        color={[1, 1, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      {/* <Groud /> */}
    </>
  );
}

function App() {
  function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }

  return (
    <Canvas shadows>
      <Suspense fallback={<Loader />}>
        <WindShow />
        <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
        <Ocean />
      </Suspense>
    </Canvas>
  );
}

export default App;
