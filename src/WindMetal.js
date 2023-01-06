import React, { useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function WindMetal(props) {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/windmill/wind-metal.gltf");
  //console.log(props);
  //const crimson = new THREE.Color(0xcccccc);
  //const [currentColor, setCurrentColor] = useState(crimson);

  const newScale = props.scale / 1000;

  const [myScale, setMyScale] = useState(newScale);

  useEffect(() => {
    //setCurrentColor(crimson);
    console.log(gltf);
    gltf.scene.scale.set(0.01, 0.01, 0.01);
    gltf.scene.position.set(0, 2.8, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 1;
        //object.material.color = currentColor;
      }
    });

    setMyScale(newScale);
    gltf.scene.scale.set(myScale, myScale, myScale);
  }, [gltf, props, myScale, newScale]);

  //console.log((gltf.scene.scale.x = props.value));
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
