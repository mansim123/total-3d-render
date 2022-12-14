import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function TreeReflect() {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/tree/tree-reflect.gltf");

  useEffect(() => {
    gltf.scene.scale.set(0.02, 0.02, 0.02);
    gltf.scene.position.set(-2, -0.5, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  //   useFrame((state, delta) => {
  //     let t = state.clock.getElapsedTime();

  //     let group = gltf.scene.children[0].children[0].children[0];
  //     group.children[0].rotation.x = t * 2;
  //     group.children[2].rotation.x = t * 2;
  //     group.children[4].rotation.x = t * 2;
  //     group.children[6].rotation.x = t * 2;
  //   });

  return <primitive object={gltf.scene} />;
}
