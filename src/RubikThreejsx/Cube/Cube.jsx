import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";

const Cube = ({ scene, position, cubeSize, materials }) => {
  const cubeRef = useRef();

  useEffect(() => {
    // CubeGeometry is now BoxGeometry in newer THREE.js versions
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    // Apply the array of materials to the cube
    const cube = new THREE.Mesh(geometry, materials);
    cube.castShadow = true;
    cube.position.set(position.x, position.y, position.z);
    cubeRef.current = cube;
    scene.add(cube);

    return () => {
      scene.remove(cube);
    };
  }, [scene, position, cubeSize, materials]);

  return null;
};

Cube.propTypes = {
  scene: PropTypes.object.isRequired,
  position: PropTypes.instanceOf(THREE.Vector3).isRequired,
  cubeSize: PropTypes.number.isRequired,
  materials: PropTypes.arrayOf(PropTypes.instanceOf(THREE.Material)).isRequired,
};

export default Cube;
