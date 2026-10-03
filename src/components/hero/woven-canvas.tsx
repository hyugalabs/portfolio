"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLES = 15000;
const MOUSE_RADIUS = 1.5;

export default function WovenCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const positions = new Float32Array(PARTICLES * 3);
    const origins = new Float32Array(PARTICLES * 3);
    const colors = new Float32Array(PARTICLES * 3);
    const velocities = new Float32Array(PARTICLES * 3);

    const knot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);
    const knotPos = knot.attributes.position;
    const color = new THREE.Color();
    for (let i = 0; i < PARTICLES; i++) {
      const v = i % knotPos.count;
      const k = i * 3;
      origins[k] = positions[k] = knotPos.getX(v);
      origins[k + 1] = positions[k + 1] = knotPos.getY(v);
      origins[k + 2] = positions[k + 2] = knotPos.getZ(v);
      color.setHSL(Math.random(), 0.8, 0.5);
      colors[k] = color.r;
      colors[k + 1] = color.g;
      colors[k + 2] = color.b;
    }
    knot.dispose();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let mx = 0;
    let my = 0;
    const onMouseMove = (e: MouseEvent) => {
      mx = ((e.clientX / window.innerWidth) * 2 - 1) * 3;
      my = (-(e.clientY / window.innerHeight) * 2 + 1) * 3;
    };
    window.addEventListener("mousemove", onMouseMove);

    const start = performance.now();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      for (let k = 0; k < PARTICLES * 3; k += 3) {
        const px = positions[k];
        const py = positions[k + 1];
        const pz = positions[k + 2];
        let vx = velocities[k];
        let vy = velocities[k + 1];
        let vz = velocities[k + 2];

        const dx = px - mx;
        const dy = py - my;
        const dist = Math.sqrt(dx * dx + dy * dy + pz * pz);
        if (dist < MOUSE_RADIUS) {
          const f = ((MOUSE_RADIUS - dist) * 0.01) / dist;
          vx += dx * f;
          vy += dy * f;
          vz += pz * f;
        }

        vx = (vx + (origins[k] - px) * 0.001) * 0.95;
        vy = (vy + (origins[k + 1] - py) * 0.001) * 0.95;
        vz = (vz + (origins[k + 2] - pz) * 0.001) * 0.95;

        positions[k] = px + vx;
        positions[k + 1] = py + vy;
        positions[k + 2] = pz + vz;
        velocities[k] = vx;
        velocities[k + 1] = vy;
        velocities[k + 2] = vz;
      }
      geometry.attributes.position.needsUpdate = true;

      points.rotation.y = ((performance.now() - start) / 1000) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}
