"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const MOUSE_RADIUS = 1.5;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

export default function WovenCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // One particle per knot vertex. The old 15k count wrapped the ~6.6k vertices, so extra
    // particles sat exactly on top of earlier ones (same start, same forces) and were never seen.
    const knot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);
    const knotPos = knot.attributes.position;
    const PARTICLES = knotPos.count;
    const positions = new Float32Array(PARTICLES * 3);
    const origins = new Float32Array(PARTICLES * 3);
    const colors = new Float32Array(PARTICLES * 3);
    const velocities = new Float32Array(PARTICLES * 3);

    const color = new THREE.Color();
    for (let i = 0; i < PARTICLES; i++) {
      const k = i * 3;
      origins[k] = positions[k] = knotPos.getX(i);
      origins[k + 1] = positions[k + 1] = knotPos.getY(i);
      origins[k + 2] = positions[k + 2] = knotPos.getZ(i);
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
        const distSq = dx * dx + dy * dy + pz * pz;
        if (distSq < MOUSE_RADIUS_SQ) {
          const dist = Math.sqrt(distSq);
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

    // Only run the loop while the hero is on screen.
    const visibility = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) animate();
    });
    visibility.observe(mount);

    // Size to the hero (h-svh), not the window, so mobile toolbars showing and
    // hiding mid-scroll don't reallocate the canvas.
    const resize = new ResizeObserver(() => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    });
    resize.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      visibility.disconnect();
      resize.disconnect();
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
