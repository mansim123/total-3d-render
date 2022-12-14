import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { GUI } from "dat.gui";

export function Blade() {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/windmill/wind-blade.gltf");

  const gui = new GUI();

  var rotationSpeed = { speed: 0.5 };
  gui.add(rotationSpeed, "speed", 0.5, 10);
  //const crimson = new THREE.Color(0xdc143c);
  //const teal = new THREE.Color(0x008080);
  // const steelblue = new THREE.Color(0xcccccc);

  //const [currentColor, setCurrentColor] = useState(steelblue);

  useEffect(
    (gui) => {
      //setCurrentColor(steelblue);
      gltf.scene.scale.set(0.001, 0.001, 0.001);
      gltf.scene.position.set(0, 3, 0);

      //gui.add(gltf.scene.rotation, "z", 0).name("WindMill Speed");

      gltf.scene.traverse((object) => {
        if (object instanceof Mesh) {
          //console.log(TextureLoader);
          object.castShadow = true;
          object.receiveShadow = true;
          object.material.envMapIntensity = 20;
          console.log(object.material.color);
          //object.material.color = currentColor;
        }
      });
      return () => {
        gui.destroy();
      };
    },
    [gltf]
  );

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
