"use client";

import { useEffect, useRef } from "react";
import { geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import type { GeoPermissibleObjects } from "d3-geo";

const TILT = -22;
const SWAY = 25; // degrees either side of the visitor's zone
const SWAY_PERIOD = 40_000;
const SETTLE_MS = 2200;

// The visitor's 15° time-zone band, traced along both meridians, stopping short of the poles.
function zoneBand(centerLon: number): GeoPermissibleObjects {
  const w = centerLon - 7.5;
  const e = centerLon + 7.5;
  const ring: [number, number][] = [];
  for (let lat = -72; lat <= 72; lat += 2) ring.push([w, lat]);
  for (let lat = 72; lat >= -72; lat -= 2) ring.push([e, lat]);
  ring.push(ring[0]);
  return { type: "Polygon", coordinates: [ring] };
}

/** Wireframe globe that turns to face the visitor's time zone, then sways around it. Drag to spin. */
export default function TimeZoneGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const zoneLon = (-new Date().getTimezoneOffset() / 60) * 15;
    const band = zoneBand(zoneLon);
    const graticule = geoGraticule10();
    const sphere: GeoPermissibleObjects = { type: "Sphere" };
    let land: GeoPermissibleObjects | null = null;

    const projection = geoOrthographic().precision(0.6).clipAngle(90);
    const path = geoPath(projection, ctx);
    const css = getComputedStyle(canvas);
    const coral = css.getPropertyValue("--color-coral").trim() || "#ff3b63";
    const offwhite = css.getPropertyValue("--color-offwhite").trim() || "#f3f2ef";

    const target = -zoneLon;
    let lon = reduced ? target : target + 70;
    let size = 0;

    const draw = () => {
      if (!size) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      projection.scale(size / 2 - 1).translate([size / 2, size / 2]).rotate([lon, TILT]);

      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = offwhite;
      ctx.globalAlpha = 0.07;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      path(band);
      ctx.fillStyle = coral;
      ctx.globalAlpha = 0.14;
      ctx.fill();
      ctx.globalAlpha = 0.45;
      ctx.stroke();

      if (land) {
        ctx.beginPath();
        path(land);
        ctx.strokeStyle = coral;
        ctx.globalAlpha = 0.85;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      ctx.beginPath();
      path(sphere);
      ctx.strokeStyle = offwhite;
      ctx.globalAlpha = 0.18;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    // Ease in toward the visitor's zone, then sway gently around it so it stays in view.
    // Paused while off screen or dragging.
    let raf = 0;
    let settleFrom = lon;
    let settleStart = 0;
    let dragging = false;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (dragging) return;
      if (!settleStart) settleStart = now;
      const t = Math.min((now - settleStart) / SETTLE_MS, 1);
      if (t < 1) {
        lon = settleFrom + (target - settleFrom) * (1 - Math.pow(1 - t, 4));
      } else {
        const s = now - settleStart - SETTLE_MS;
        lon = target + SWAY * (1 - Math.exp(-s / 4000)) * Math.sin((s / SWAY_PERIOD) * Math.PI * 2);
      }
      draw();
    };
    const play = () => {
      cancelAnimationFrame(raf);
      if (!reduced) raf = requestAnimationFrame(tick);
    };
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play();
      else cancelAnimationFrame(raf);
    });

    const resize = new ResizeObserver(() => {
      size = canvas.clientWidth;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.height = Math.round(size * dpr);
      draw();
    });

    let startX = 0;
    let startLon = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startLon = lon;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      lon = startLon + (e.clientX - startX) * 0.35;
      draw();
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      // Ease back to the visitor's zone the short way round.
      settleFrom = target + ((((lon - target + 180) % 360) + 360) % 360) - 180;
      settleStart = 0;
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    let cancelled = false;
    fetch("/data/world-mesh.json")
      .then((r) => r.json())
      .then((data: GeoPermissibleObjects) => {
        if (cancelled) return;
        land = data;
        draw();
      })
      .catch(() => {});

    resize.observe(canvas);
    visibility.observe(canvas);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      resize.disconnect();
      visibility.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="aspect-square w-full cursor-grab touch-pan-y active:cursor-grabbing"
    />
  );
}
