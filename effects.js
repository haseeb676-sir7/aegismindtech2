// Add Three.js for the glowing cube effects
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

// Add glowing cube geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x4a90e2,
    transparent: true,
    opacity: 0.8
});

// ... rest of Three.js setup code 