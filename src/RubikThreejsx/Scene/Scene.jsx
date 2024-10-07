import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Rubik from "../Rubik/Rubik";

function Scene() {
  // Ref for the div element where the renderer will be appended
  const mountRef = useRef();
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(
    new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  );
  const rendererRef = useRef(
    new THREE.WebGLRenderer({ alpha: true, antialias: true }) // antialias reduces "shaky" appearace
  );
  const controlsRef = useRef();

  useEffect(() => {
    const renderer = rendererRef.current;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x303030, 1.0);

    // Increase the resolution of the renderer
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    // Attach renderer to a DOM element
    const mount = mountRef.current;
    mount.appendChild(renderer.domElement);

    const camera = cameraRef.current;
    camera.position.z = 20;

    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
      renderer.render(sceneRef.current, camera);
    };

    animate();

    return () => {
      controls.dispose(); // Clean up controls on component unmount
      mount.removeChild(renderer.domElement); // Remove the renderer from the DOM cleanly
    };
  }, []);

  return (
    <div ref={mountRef}>
      <Rubik scene={sceneRef.current} camera={cameraRef.current} />
    </div>
  );
}

export default Scene;
