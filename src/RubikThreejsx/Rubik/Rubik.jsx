import PropTypes from "prop-types";
import * as THREE from "three";
import Cube from "../Cube/Cube";

const Rubik = ({ scene }) => {
  const dimensions = 3;
  const cubeSize = 3;
  const spacing = 0.5;

  const increment = cubeSize + spacing; // total distance to move from one cube center to the next
  const positionOffset = (dimensions - 1) / 2;

  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xe21818 }), // Red
    new THREE.MeshBasicMaterial({ color: 0xff885b }), // Orange
    new THREE.MeshBasicMaterial({ color: 0x4f75ff }), // Blue
    new THREE.MeshBasicMaterial({ color: 0x0d6837 }), // Green
    new THREE.MeshBasicMaterial({ color: 0xf0f0f0 }), // White
    new THREE.MeshBasicMaterial({ color: 0xfccd2a }), // Yellow
  ];

  const cubes = [];
  for (let i = 0; i < dimensions; i++) {
    for (let j = 0; j < dimensions; j++) {
      for (let k = 0; k < dimensions; k++) {
        const x = (i - positionOffset) * increment;
        const y = (j - positionOffset) * increment;
        const z = (k - positionOffset) * increment;
        cubes.push(
          <Cube
            key={`${i}-${j}-${k}`}
            scene={scene}
            position={new THREE.Vector3(x, y, z)}
            cubeSize={cubeSize}
            materials={materials}
          />
        );
      }
    }
  }

  return <>{cubes}</>;
};

Rubik.propTypes = {
  scene: PropTypes.object.isRequired,
};

export default Rubik;
