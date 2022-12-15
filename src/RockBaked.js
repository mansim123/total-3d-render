import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function RockBaked() {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/rock/rockBaked.gltf");

  //const crimson = new THREE.Color(0xcccccc);
  //const [currentColor, setCurrentColor] = useState(crimson);

  useEffect(() => {
    //setCurrentColor(crimson);
    gltf.scene.scale.set(0.02, 0.02, 0.02);
    gltf.scene.position.set(0, 2.5, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
        //object.material.color = currentColor;
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
