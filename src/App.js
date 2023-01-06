import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import "./style.css";
import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import { Ground } from "./Ground";
import { useControls, folder } from "leva";
import { DirectionalLightHelper, SpotLightHelper } from "three";
// import { Neck } from "./Neck";
// import { Blade } from "./Blade";
// import { Roundhouse } from "./Roundhouse";
// import { RockBaked } from "./RockBaked";
// import { Dog } from "./Dog";
// import { House } from "./House";
// import { Rock } from "./Rock";
// import { TreeReflect } from "./TreeReflect";
// import { TreeTexture } from "./TreeTexture";
// import { BallSticks } from "./BallSticks";
// import Ocean from "./Ocean";
import { WindMetal } from "./WindMetal";
import { Html, useProgress } from "@react-three/drei";

function ShowScene() {
  const light = useRef();
  const SpotlightRef = useRef();
  const SpotlightRef2 = useRef();
  useHelper(SpotlightRef, SpotLightHelper, "cyan");
  useHelper(SpotlightRef2, SpotLightHelper, "blue");
  useHelper(light, DirectionalLightHelper, 2, "red");

  const { SpotLightIntensity, sx, sdis, scolor } = useControls({
    SpotLight: folder({
      SpotLightIntensity: { value: 5, min: 0, max: 50 },
      sx: { value: 1, min: -10, max: 20 },
      sdis: { value: 10, min: 0, max: 20 },
      scolor: "#ff0000",
    }),
  });

  const { SpotLightIntensity2, sx2, sdis2, scolor2 } = useControls({
    SpotLight2: folder({
      SpotLightIntensity2: { value: 5, min: 0, max: 50 },
      sx2: { value: 1, min: -20, max: 20 },
      sdis2: { value: 10, min: 0, max: 20 },
      scolor2: "#0000ff",
    }),
  });

  const { intensity, x } = useControls({
    DirectionalLight: folder({
      intensity: { value: 1, min: 0, max: 25 },
      x: { value: 1, min: -10, max: 10 },
    }),
  });

  const { PointLightIntensity, py, px, pz, pcolor } = useControls({
    PointLight: folder({
      PointLightIntensity: { value: 1, min: 0, max: 25 },
      px: { value: 1, min: -10, max: 10 },
      py: { value: 1, min: -10, max: 10 },
      pz: { value: 1, min: -10, max: 10 },
      pcolor: "#fff",
    }),
  });

  const { scale } = useControls("Wind Scale", {
    windControls: folder({
      scale: {
        value: 1,
        min: 1,
        max: 10,
      },
    }),
  });

  return (
    <>
      {/* <OrbitControls target={[0, 1.75, 0]} maxPolarAngle={1.45} /> */}
      {/* <PerspectiveCamera makeDefault fov={50} position={[8, 2, 5]} /> */}
      <color args={[0, 0, 0]} attach="background" />

      {/* <Neck />
      <Blade /> */}
      {/* <BallSticks /> */}
      {/* <Dog /> */}
      {/* <Roundhouse /> */}
      {/* <RockBaked /> */}
      {/* <House /> */}
      {/* <Rock /> */}
      {/* <TreeReflect />


      <TreeTexture /> */}
      <WindMetal scale={scale} />

      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"blue"} />
      </mesh> */}

      <spotLight
        ref={SpotlightRef}
        color={scolor}
        intensity={SpotLightIntensity}
        angle={150}
        distance={sdis}
        penumbra={0.5}
        position={[sx, 5, 3]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        ref={SpotlightRef2}
        color={scolor2}
        intensity={SpotLightIntensity2}
        angle={150}
        distance={sdis2}
        penumbra={0.5}
        position={[sx2, 5, -3]}
        castShadow
        shadow-bias={-0.0001}
      />
      {/* <ambientLight intensity={intensity} /> */}
      {/* <hemisphereLight args={["#fff", "#333", intensity]} /> */}
      <directionalLight ref={light} position={[x, 5, 0]} intensity={intensity} />
      <pointLight
        color={pcolor}
        position={[px, py, pz]}
        castShadow
        intensity={PointLightIntensity}
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

      <Canvas id="Canvas" shadows camera={{ position: [0, 0, 10], fov: 50 }}>
        {/* <Canvas id="Canvas" shadows> */}
        <Suspense fallback={<Loader />}>
          {/* <PresentationControls
            global
            config={{ mass: 1, tension: 170, friction: 26 }}
            speed={2}
            rotation={[0.1, 0, 0]}
            polar={[0, Math.PI / 2]}
            azimuth={[-Infinity, Infinity]}
            zoom={-10}
          > */}
          <ShowScene />
          {/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}
          {/* <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} /> */}
          <Environment
            files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr"
            ground={{ height: 5, radius: 40, scale: 20 }}
          />
          <OrbitControls
            enableZoom={true}
            makeDefault
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.25}
          />
          {/* </PresentationControls> */}
          {/* <Ocean /> */}
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
