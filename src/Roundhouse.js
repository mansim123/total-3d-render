import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Mesh } from "three";

export function Roundhouse() {
  const fbx = useLoader(FBXLoader, process.env.PUBLIC_URL + "models/character/rock.fbx");
  //console.log(fbx);
  //const crimson = new THREE.Color(0xcccccc);
  //const [currentColor, setCurrentColor] = useState(crimson);

  useEffect(() => {
    //setCurrentColor(crimson);
    console.log(fbx);
    fbx.scale.set(0.05, 0.05, 0.05);
    fbx.position.set(0, 5, 0);
    fbx.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
        //object.material.color = currentColor;
      }
    });
  }, [fbx]);

  //   useFrame((state, delta) => {
  //     let t = state.clock.getElapsedTime();

  //     let group = gltf.scene.children[0].children[0].children[0];
  //     group.children[0].rotation.x = t * 2;
  //     group.children[2].rotation.x = t * 2;
  //     group.children[4].rotation.x = t * 2;
  //     group.children[6].rotation.x = t * 2;
  //   });

  return <primitive object={fbx} />;
}
