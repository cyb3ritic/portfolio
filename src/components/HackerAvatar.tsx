import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * HackerAvatar
 * -------------------------------------------------------------------------
 * A self-contained, mouse-reactive 3D "hacker" avatar: a low-poly
 * holographic head (phosphor-green wireframe over a translucent fill),
 * an inner rotating circuit core, two shells of drifting binary-digit
 * particles, and a terminal-style HUD overlay.
 *
 * - Move the cursor over it -> the head turns to track you (damped lerp).
 * - Stop moving -> it eases into a slow idle sway.
 * - Click / tap -> triggers a glitch burst (jittered wireframe + ghost
 *   offset copies); it also glitches on its own every 7-15s so it never
 *   looks static in a hero section.
 * - Respects prefers-reduced-motion.
 * - SSR-safe: all Three.js work happens inside useEffect, so it's safe
 *   to import in Next.js / Remix / etc. without a dynamic("no ssr") guard
 *   for the module itself (still fine to lazy-load if you want).
 *
 * Usage:
 *   <HackerAvatar style={{ width: 420, height: 420 }} />
 *
 * Requires: npm install three
 * (three ships its own TypeScript types, so no @types/three needed on
 * recent versions; install it if your three version predates that.)
 */

interface HackerAvatarProps {
  className?: string;
  style?: React.CSSProperties;
}

const COLORS = {
  bg0: "#04070a",
  bg1: "#081410",
  green: "#39ff8a",
  greenDeep: "#0a8f4d",
  amber: "#ffb84d",
  muted: "#5f7a68",
  line: "rgba(57, 255, 138, 0.18)",
};

export default function HackerAvatar({ className, style }: HackerAvatarProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const typedLineRef = useRef<HTMLDivElement>(null);
  const statusTextRef = useRef<HTMLSpanElement>(null);
  const nodeIdRef = useRef<HTMLSpanElement>(null);
  const coordXRef = useRef<HTMLSpanElement>(null);
  const coordYRef = useRef<HTMLSpanElement>(null);
  const fpsTextRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    if (!window.WebGLRenderingContext) {
      root.innerHTML =
        '<div style="color:#5f7a68;font:12px monospace;text-align:center;padding:24px;line-height:1.6;">' +
        '<span style="color:#39ff8a">hackavatar.js</span><br/>WebGL is required to render this avatar.</div>';
      return;
    }

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---------- basic setup ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    function fitRenderer() {
      if (!root) return;
      const w = root.clientWidth;
      const h = root.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h || 1;
      camera.updateProjectionMatrix();
    }
    fitRenderer();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(fitRenderer);
      resizeObserver.observe(root);
    } else {
      window.addEventListener("resize", fitRenderer);
    }

    // ---------- lighting ----------
    scene.add(new THREE.AmbientLight(0x0f2417, 1.3));
    const keyLight = new THREE.PointLight(0x39ff8a, 2.2, 10);
    keyLight.position.set(2, 1.5, 3);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x0a8f4d, 1.8, 10);
    rimLight.position.set(-2.5, -1, -2);
    scene.add(rimLight);

    // ---------- head group ----------
    const head = new THREE.Group();
    scene.add(head);

    const baseGeo = new THREE.IcosahedronGeometry(1.45, 3);
    const posAttr = baseGeo.attributes.position as THREE.BufferAttribute;
    const vertexCount = posAttr.count;
    const basePositions = new Float32Array(posAttr.array as Float32Array);
    const phase = new Float32Array(vertexCount);
    for (let i = 0; i < vertexCount; i++) phase[i] = Math.random() * Math.PI * 2;

    const fillMat = new THREE.MeshPhongMaterial({
      color: 0x081a10,
      emissive: 0x0c2b19,
      shininess: 40,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
    });
    const meshFill = new THREE.Mesh(baseGeo, fillMat);
    head.add(meshFill);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x39ff8a,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const meshWire = new THREE.Mesh(baseGeo, wireMat);
    head.add(meshWire);

    // glitch ghost copies (hidden until a glitch burst)
    const wireMatA = new THREE.MeshBasicMaterial({
      color: 0xb9ffd6,
      wireframe: true,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });
    const meshWireA = new THREE.Mesh(baseGeo, wireMatA);
    head.add(meshWireA);
    const wireMatB = new THREE.MeshBasicMaterial({
      color: 0x0a8f4d,
      wireframe: true,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });
    const meshWireB = new THREE.Mesh(baseGeo, wireMatB);
    head.add(meshWireB);

    // inner circuit core
    const coreGeo = new THREE.IcosahedronGeometry(0.55, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffb84d, wireframe: true, transparent: true, opacity: 0.8 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    head.add(core);

    const innerBrainGeo = new THREE.IcosahedronGeometry(0.95, 1);
    const innerBrainMat = new THREE.MeshBasicMaterial({
      color: 0x0a8f4d,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerBrain = new THREE.Mesh(innerBrainGeo, innerBrainMat);
    head.add(innerBrain);

    // eyes
    const eyeGeo = new THREE.SphereGeometry(0.075, 12, 12);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xeaffef });
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.42, 0.12, 1.28);
    const eyeR = eyeL.clone();
    eyeR.position.x = 0.42;
    head.add(eyeL, eyeR);
    const eyeGlow = new THREE.PointLight(0x9dffc4, 1.2, 3);
    eyeGlow.position.set(0, 0.12, 1.4);
    head.add(eyeGlow);

    // ---------- binary particle shells ----------
    function makeDigitTexture(char: string, color: string) {
      const size = 64;
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d") as CanvasRenderingContext2D;
      ctx.font = "bold 42px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.fillStyle = color;
      ctx.fillText(char, size / 2, size / 2 + 2);
      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    }

    function makeParticleShell(char: string, color: string, count: number, rMin: number, rMax: number) {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = rMin + Math.random() * (rMax - rMin);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.85;
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        map: makeDigitTexture(char, color),
        size: 0.16,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.Points(geo, mat);
    }

    const vw = window.innerWidth;
    const particleCount = vw < 400 ? 55 : vw < 640 ? 90 : 160;
    const pOnes = makeParticleShell("1", "#39ff8a", particleCount, 2.1, 3.0);
    const pZeros = makeParticleShell("0", "#0a8f4d", particleCount, 2.4, 3.3);
    scene.add(pOnes, pZeros);

    // ---------- interaction state ----------
    const mouseTarget = { x: 0, y: 0 };
    let lastMoveTime = performance.now();
    let glitchTimer = 0;
    let nextAutoGlitch = 6 + Math.random() * 6;
    const clock = new THREE.Clock();

    function updatePointer(clientX: number, clientY: number) {
      const rect = root!.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((clientY - rect.top) / rect.height) * 2 - 1;
      mouseTarget.x = Math.max(-1, Math.min(1, nx));
      mouseTarget.y = Math.max(-1, Math.min(1, ny));
      lastMoveTime = performance.now();
      if (coordXRef.current) coordXRef.current.textContent = mouseTarget.x.toFixed(2);
      if (coordYRef.current) coordYRef.current.textContent = (-mouseTarget.y).toFixed(2);
    }

    function onPointerMove(e: PointerEvent) {
      updatePointer(e.clientX, e.clientY);
      if (hintRef.current) hintRef.current.classList.add("hackavatar-faded");
    }
    function onPointerDown() {
      glitchTimer = 1.0;
      if (statusTextRef.current) {
        statusTextRef.current.textContent = "GLITCH";
        statusTextRef.current.style.color = COLORS.amber;
        setTimeout(() => {
          if (statusTextRef.current) {
            statusTextRef.current.textContent = "ONLINE";
            statusTextRef.current.style.color = COLORS.green;
          }
        }, 550);
      }
      if (hintRef.current) hintRef.current.classList.add("hackavatar-faded");
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches && e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("touchmove", onTouchMove, { passive: true });

    // node id readout
    function randomHex(len: number) {
      let s = "";
      for (let i = 0; i < len; i++) s += Math.floor(Math.random() * 16).toString(16);
      return "0x" + s.toUpperCase();
    }
    if (nodeIdRef.current) nodeIdRef.current.textContent = randomHex(4);
    const nodeInterval = window.setInterval(() => {
      if (nodeIdRef.current) nodeIdRef.current.textContent = randomHex(4);
    }, 2600);

    // terminal typing line
    const lines = ["booting core...", "tracking cursor", "render loop stable", "awaiting input"];
    let lineIdx = 0;
    let typeTimeout: number | undefined;
    let typeInterval: number | undefined;
    let cancelled = false;

    function typeLine(text: string, cb: () => void) {
      let i = 0;
      if (typedLineRef.current) typedLineRef.current.textContent = "";
      typeInterval = window.setInterval(() => {
        if (cancelled) {
          window.clearInterval(typeInterval);
          return;
        }
        if (typedLineRef.current) typedLineRef.current.textContent = text.slice(0, i + 1);
        i++;
        if (i >= text.length) {
          window.clearInterval(typeInterval);
          typeTimeout = window.setTimeout(cb, 1400);
        }
      }, 28);
    }
    function cycleLines() {
      typeLine(lines[lineIdx], () => {
        lineIdx = (lineIdx + 1) % lines.length;
        if (!cancelled) cycleLines();
      });
    }
    if (!reduceMotion) {
      cycleLines();
    } else if (typedLineRef.current) {
      typedLineRef.current.textContent = "awaiting input";
    }

    // ---------- animation loop ----------
    let curRotY = 0;
    let curRotX = 0;
    let fpsFrames = 0;
    let fpsTime = 0;
    let rafId = 0;

    function animate() {
      rafId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      fpsFrames++;
      fpsTime += dt;
      if (fpsTime > 0.5) {
        if (fpsTextRef.current) fpsTextRef.current.textContent = String(Math.round(fpsFrames / fpsTime));
        fpsFrames = 0;
        fpsTime = 0;
      }

      const idle = performance.now() - lastMoveTime > 2200;
      const idleYaw = idle && !reduceMotion ? Math.sin(t * 0.15) * 0.5 : 0;
      const idlePitch = idle && !reduceMotion ? Math.cos(t * 0.12) * 0.12 : 0;

      const desiredY = idle ? idleYaw : mouseTarget.x * 0.6;
      const desiredX = idle ? idlePitch : -mouseTarget.y * 0.35;
      curRotY += (desiredY - curRotY) * 0.06;
      curRotX += (desiredX - curRotX) * 0.06;
      head.rotation.y = curRotY;
      head.rotation.x = curRotX;

      nextAutoGlitch -= dt;
      if (nextAutoGlitch <= 0 && !reduceMotion) {
        glitchTimer = 0.6;
        nextAutoGlitch = 7 + Math.random() * 8;
      }
      if (glitchTimer > 0) glitchTimer = Math.max(0, glitchTimer - dt * 2.2);

      const amp = reduceMotion ? 0.02 : 0.05;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < vertexCount; i++) {
        const bx = basePositions[i * 3];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];
        const len = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
        const nx = bx / len;
        const ny = by / len;
        const nz = bz / len;
        let d = amp * Math.sin(t * 0.8 + phase[i]);
        if (glitchTimer > 0) {
          const band = Math.sin(by * 9 + t * 45 + phase[i]);
          if (band > 0.75) d += glitchTimer * (Math.random() - 0.5) * 0.9;
        }
        arr[i * 3] = bx + nx * d;
        arr[i * 3 + 1] = by + ny * d;
        arr[i * 3 + 2] = bz + nz * d;
      }
      posAttr.needsUpdate = true;
      baseGeo.computeVertexNormals();

      const gOpac = Math.min(0.6, glitchTimer);
      wireMatA.opacity = gOpac;
      wireMatB.opacity = gOpac;
      meshWireA.position.x = glitchTimer > 0 ? (Math.random() - 0.5) * 0.08 * glitchTimer * 4 : 0;
      meshWireB.position.x = glitchTimer > 0 ? -(Math.random() - 0.5) * 0.08 * glitchTimer * 4 : 0;

      core.rotation.y += dt * 0.6;
      core.rotation.x += dt * 0.35;
      innerBrain.rotation.y -= dt * 0.25;
      const pulse = 0.9 + Math.sin(t * 2.4) * 0.1 + glitchTimer * 0.4;
      core.scale.setScalar(pulse);
      eyeGlow.intensity = 1.1 + Math.sin(t * 3) * 0.3 + glitchTimer * 1.2;

      pOnes.rotation.y += dt * 0.05;
      pOnes.rotation.x += dt * 0.012;
      pZeros.rotation.y -= dt * 0.035;
      pZeros.rotation.x -= dt * 0.008;

      keyLight.intensity = 2.0 + Math.sin(t * 1.5) * 0.3;

      renderer.render(scene, camera);
    }
    animate();

    // ---------- cleanup ----------
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.clearInterval(nodeInterval);
      if (typeInterval) window.clearInterval(typeInterval);
      if (typeTimeout) window.clearTimeout(typeTimeout);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("touchmove", onTouchMove);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener("resize", fitRenderer);

      renderer.dispose();
      baseGeo.dispose();
      coreGeo.dispose();
      innerBrainGeo.dispose();
      eyeGeo.dispose();
      fillMat.dispose();
      wireMat.dispose();
      wireMatA.dispose();
      wireMatB.dispose();
      coreMat.dispose();
      innerBrainMat.dispose();
      eyeMat.dispose();
      pOnes.geometry.dispose();
      pZeros.geometry.dispose();
      (pOnes.material as THREE.PointsMaterial).map?.dispose();
      (pOnes.material as THREE.PointsMaterial).dispose();
      (pZeros.material as THREE.PointsMaterial).map?.dispose();
      (pZeros.material as THREE.PointsMaterial).dispose();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={["hackavatar-root", className].filter(Boolean).join(" ")}
      style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", border: `1px solid ${COLORS.line}`, ...style }}
    >
      <span className="hackavatar-corner hackavatar-tl" />
      <span className="hackavatar-corner hackavatar-tr" />
      <span className="hackavatar-corner hackavatar-bl" />
      <span className="hackavatar-corner hackavatar-br" />

      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />

      <div className="hackavatar-hud hackavatar-hud-tl">
        <div>
          <span className="hackavatar-hi">&gt; cyb3ritic</span>
          <span className="hackavatar-cursor" />
        </div>
        <div ref={typedLineRef}>&nbsp;</div>
      </div>

      <div className="hackavatar-hud hackavatar-hud-bl">
        <div>
          STATUS: <span ref={statusTextRef} className="hackavatar-hi">ONLINE</span>
        </div>
        <div>
          NODE: <span ref={nodeIdRef} className="hackavatar-amber">0x0000</span>
        </div>
      </div>

      <div className="hackavatar-hud hackavatar-hud-br">
        <div>
          X:<span ref={coordXRef} className="hackavatar-hi">0.00</span> Y:
          <span ref={coordYRef} className="hackavatar-hi">0.00</span>
        </div>
        <div>
          FPS: <span ref={fpsTextRef} className="hackavatar-hi">60</span>
        </div>
      </div>

      <div ref={hintRef} className="hackavatar-hint">
        move to track &middot; click to glitch
      </div>

      <style>{`
        .hackavatar-root {
          background: radial-gradient(circle at 50% 38%, ${COLORS.bg1} 0%, #04070a 62%, #020403 100%);
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
          overflow: hidden;
          max-width: 100%;
        }
        @supports not (aspect-ratio: 1 / 1) {
          .hackavatar-root { height: 0; padding-bottom: 100%; }
          .hackavatar-root canvas { position: absolute; inset: 0; }
        }
        .hackavatar-corner { position: absolute; width: 18px; height: 18px; opacity: 0.85; z-index: 8; }
        .hackavatar-tl { top: -1px; left: -1px; border-top: 2px solid ${COLORS.green}; border-left: 2px solid ${COLORS.green}; }
        .hackavatar-tr { top: -1px; right: -1px; border-top: 2px solid ${COLORS.green}; border-right: 2px solid ${COLORS.green}; }
        .hackavatar-bl { bottom: -1px; left: -1px; border-bottom: 2px solid ${COLORS.green}; border-left: 2px solid ${COLORS.green}; }
        .hackavatar-br { bottom: -1px; right: -1px; border-bottom: 2px solid ${COLORS.green}; border-right: 2px solid ${COLORS.green}; }

        .hackavatar-hud {
          position: absolute; z-index: 7; color: ${COLORS.muted}; font-size: 11px;
          letter-spacing: 0.06em; line-height: 1.5; pointer-events: none;
          text-shadow: 0 0 6px rgba(0,0,0,0.6);
        }
        .hackavatar-hi { color: ${COLORS.green}; }
        .hackavatar-amber { color: ${COLORS.amber}; }
        .hackavatar-hud-tl { top: 14px; left: 16px; }
        .hackavatar-hud-bl { bottom: 14px; left: 16px; }
        .hackavatar-hud-br { bottom: 14px; right: 16px; text-align: right; }

        .hackavatar-cursor {
          display: inline-block; width: 6px; height: 11px; background: ${COLORS.green};
          margin-left: 2px; animation: hackavatar-blink 1s steps(1) infinite; vertical-align: -1px;
        }
        @keyframes hackavatar-blink { 50% { opacity: 0; } }

        .hackavatar-hint {
          position: absolute; z-index: 7; top: 14px; right: 16px; font-size: 10px;
          color: ${COLORS.muted}; opacity: 0.85; transition: opacity 0.6s ease;
          text-align: right; letter-spacing: 0.05em;
        }
        .hackavatar-faded { opacity: 0; }

        @media (max-width: 560px) {
          .hackavatar-hud { font-size: 10px; }
          .hackavatar-corner { width: 14px; height: 14px; }
          .hackavatar-hud-tl { top: 10px; left: 10px; }
          .hackavatar-hud-bl { bottom: 10px; left: 10px; }
          .hackavatar-hud-br { bottom: 10px; right: 10px; }
          .hackavatar-hint { top: 10px; right: 10px; font-size: 9px; }
        }
        @media (max-width: 420px) {
          .hackavatar-hint { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hackavatar-cursor { animation: none; opacity: 1; }
        }
      `}</style>
    </div>
  );
}