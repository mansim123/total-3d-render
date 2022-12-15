import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./style.css";
import { PresentationControls, Sky } from "@react-three/drei";
import { Ground } from "./Ground";
import { Neck } from "./Neck";
import { Blade } from "./Blade";
// import { Roundhouse } from "./Roundhouse";
// import { RockBaked } from "./RockBaked";
// import { Dog } from "./Dog";
// import { House } from "./House";
// import { Rock } from "./Rock";
// import { TreeReflect } from "./TreeReflect";
// import { TreeTexture } from "./TreeTexture";
import { BallSticks } from "./BallSticks";
// import Ocean from "./Ocean";
import { Html, useProgress } from "@react-three/drei";

function WindShow() {
  return (
    <>
      {/* <OrbitControls target={[0, 1.75, 0]} maxPolarAngle={1.45} /> */}
      {/* <PerspectiveCamera makeDefault fov={50} position={[8, 2, 5]} /> */}
      <color args={[0, 0, 0]} attach="background" />

      {/* <Neck />
      <Blade /> */}
      <BallSticks />
      {/* <Dog /> */}
      {/* <Roundhouse /> */}
      {/* <RockBaked /> */}
      {/* <House /> */}
      {/* <Rock /> */}
      {/* <TreeReflect />

      <TreeTexture /> */}

      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"blue"} />
      </mesh> */}

      <spotLight
        color={[1, 0.4, 1]}
        intensity={2}
        angle={2}
        penumbra={0.5}
        position={[10, 5, 10]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        color={[1, 1, 1]}
        intensity={1}
        angle={2}
        penumbra={0.5}
        position={[15, 10, -15]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />
    </>
  );
}

function App() {
  function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }

  return (
    <>
      <section id="trigger">
        <h1 id="number">0</h1>
      </section>

      {/* <Canvas id="Canvas" shadows camera={{ position: [0, 0, 10], fov: 50 }}> */}
      <Canvas id="Canvas" shadows>
        <Suspense fallback={<Loader />}>
          <PresentationControls
            global
            config={{ mass: 1, tension: 170, friction: 26 }}
            speed={2}
            rotation={[0.1, 0, 0]}
            polar={[0, Math.PI / 2]}
            azimuth={[-Infinity, Infinity]}
          >
            <WindShow />
            <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
          </PresentationControls>
          {/* <Ocean /> */}
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
