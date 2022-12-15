import React, { useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
// import { GUI } from "dat.gui";
import gsap from "./helpers/gsap";

export function Blade() {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/windmill/wind-blade.gltf");

  // const gui = new GUI();

  var rotationSpeed = { speed: 0.5 };
  // gui.add(rotationSpeed, "speed", 0.5, 10);
  //const crimson = new THREE.Color(0xdc143c);
  //const teal = new THREE.Color(0x008080);
  // const steelblue = new THREE.Color(0xcccccc);

  //const [currentColor, setCurrentColor] = useState(steelblue);

  useEffect(
    (gui) => {
      var startCount = 0,
        num = { var: startCount };

      //const [currentSpeed, setCurrentSpeed] = useState(1);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#trigger",
            pin: true,
            start: "top top",
            end: "+=2000",
            scrub: true,
            marker: true,
          },
        })
        .to(num, { var: 1000, duration: 5, ease: "none", onUpdate: changeNumber })
        .to({}, { duration: 2 });

      function changeNumber() {
        rotationSpeed = { speed: num.var.toFixed() / 1000 };
        console.log(rotationSpeed);
        gltf.scene.rotation.z = -num.var.toFixed() / 100;
        //setCurrentSpeed(1);
        //setCurrentSpeed(num.var.toFixed() / 1000);
        //console.log(num.var.toFixed());
      }

      //setCurrentColor(steelblue);
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

      console.log(gltf.scene.rotation.z);

      return () => {
        gui.destroy();
      };
    },
    [gltf]
  );

  // useFrame((state) => {
  //   //let t = state.clock.getElapsedTime();
  //   gltf.scene.rotation.z = -rotationSpeed.speed;
  // });

  return <primitive object={gltf.scene} />;
}
