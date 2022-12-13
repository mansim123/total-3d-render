import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { GUI } from "dat.gui";

// based on "Chevrolet Corvette (C7)" (https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
// by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
export function Blade() {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/windmill/wind-blade.gltf");

  const gui = new GUI();

  var rotationSpeed = { speed: 0.5 };
  gui.add(rotationSpeed, "speed", 0.5, 10);

  useEffect(() => {
    gltf.scene.scale.set(0.001, 0.001, 0.001);
    gltf.scene.position.set(0, 2.5, 0);

    //gui.add(gltf.scene.rotation, "z", 0).name("WindMill Speed");

    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  useFrame((state) => {
    let t = state.clock.getElapsedTime();

    gltf.scene.rotation.z = t * -rotationSpeed.speed;

    //let group = gltf.scene.children[0].children[0].children[0];
    // group.children[0].rotation.x = t * 2;
    // group.children[2].rotation.x = t * 2;
    // group.children[4].rotation.x = t * 2;
    // group.children[6].rotation.x = t * 2;
  });

  return <primitive object={gltf.scene} />;
}
