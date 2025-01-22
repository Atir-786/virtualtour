"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const PanoramaViewer = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of your images
  const images = [
    "living.jpg",
    "hall.jpg",
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "bed.jpg",
    "/imgai.png",

    "/houseimage1.jpg",
    "/houseimage2.jpg",
    "/download.jpg",
  ];

  useEffect(() => {
    const container = containerRef.current;

    // Create Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0.1);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    let sphereMesh;

    const loadPanorama = (image) => {
      if (sphereMesh) scene.remove(sphereMesh); // Remove previous sphere

      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1);

      const material = new THREE.MeshBasicMaterial({
        map: textureLoader.load(image),
      });

      sphereMesh = new THREE.Mesh(geometry, material);
      scene.add(sphereMesh);
    };

    // Load the first image
    loadPanorama(images[currentIndex]);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="panorama-viewer">
      {/* Panorama Container */}
      <div ref={containerRef} className="panorama-container"></div>

      {/* Navigation Buttons */}
      <button className="prev-button" onClick={handlePrev}>
        Prev
      </button>
      <button className="next-button" onClick={handleNext}>
        Next
      </button>

      <style jsx>{`
        .panorama-viewer {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        .panorama-container {
          width: 100%;
          height: 100%;
        }

        .prev-button,
        .next-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          z-index: 10;
        }

        .prev-button {
          left: 20px;
        }

        .next-button {
          right: 20px;
        }

        .prev-button:hover,
        .next-button:hover {
          background-color: rgba(0, 0, 0, 0.9);
        }
      `}</style>
    </div>
  );
};

export default PanoramaViewer;
