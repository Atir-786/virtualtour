"use client";

import React, { useEffect, useRef, useState } from "react";
import * as PANOLENS from "panolens";

const PanolensViewer = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = ["/living.jpg", "/img1.jpg"];

  useEffect(() => {
    const container = containerRef.current;
    let viewer;
    let panorama;

    if (container) {
      // Create the Panolens viewer
      viewer = new PANOLENS.Viewer({
        container: container,
        autoRotate: true,
        autoRotateSpeed: 0.3,
        controlBar: true,
      });

      const loadPanorama = (image) => {
        if (panorama) {
          viewer.remove(panorama);
          panorama.dispose();
        }
        panorama = new PANOLENS.ImagePanorama(image);
        viewer.add(panorama);
      };

      loadPanorama(images[currentIndex]);

      return () => {
        if (viewer) {
          if (panorama) {
            viewer.remove(panorama);
            panorama.dispose();
          }
          viewer.dispose();
        }
      };
    }
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
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Panorama Container */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      ></div>

      {/* Navigation Buttons */}
      <button
        style={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          zIndex: 10,
        }}
        onClick={handlePrev}
      >
        Prev
      </button>

      <button
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          zIndex: 10,
        }}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default PanolensViewer;
