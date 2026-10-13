import {
  AdditiveBlending,
  FrontSide,
  Color,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
  type BufferGeometry,
  type Material,
} from "three";
import { damp } from "@/lib/motion";

export type CoreMode = "hero" | "process";

export type CoreScene = {
  setPointer: (x: number, y: number) => void;
  setProgress: (p: number) => void;
  start: () => void;
  stop: () => void;
  resize: (w: number, h: number) => void;
  dispose: () => void;
};

const SHELLS = 6;
const STONE = new Color("#6a5f52");
const AMBER = new Color("#f0a54a");

/**
 * The "core": a bright centre inside six low-poly shells.
 * hero: shells turn slowly, lean toward the pointer, and drift apart as progress goes 0 → 1.
 * process: shell i is built as progress passes i/6, so the object grows with the six steps.
 */
export function createCoreScene(canvas: HTMLCanvasElement, mode: CoreMode): CoreScene {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0, 9);

  const root = new Group();
  scene.add(root);

  const geometries: BufferGeometry[] = [];
  const materials: Material[] = [];
  const track = <G extends BufferGeometry>(g: G) => (geometries.push(g), g);
  const trackM = <M extends Material>(m: M) => (materials.push(m), m);

  // Core: a solid amber body with a soft additive halo.
  const core = new Mesh(track(new IcosahedronGeometry(0.42, 2)), trackM(new MeshBasicMaterial({ color: AMBER })));
  root.add(core);
  const halo = new Mesh(
    track(new IcosahedronGeometry(0.95, 3)),
    trackM(
      new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        side: FrontSide,
        uniforms: { uColor: { value: AMBER }, uStrength: { value: 0.45 } },
        vertexShader: `varying vec3 vN; varying vec3 vV;
          void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
        fragmentShader: `uniform vec3 uColor; uniform float uStrength; varying vec3 vN; varying vec3 vV;
          void main(){ float f = pow(max(dot(vN, vV), 0.0), 3.0); gl_FragColor = vec4(uColor, f * uStrength); }`,
      }),
    ),
  );
  root.add(halo);

  // Shells: edges of low-poly icosahedra, plus a faint face fill for depth.
  const shells = Array.from({ length: SHELLS }, (_, i) => {
    const radius = 0.85 + i * 0.27;
    const ico = track(new IcosahedronGeometry(radius, i < 2 ? 1 : 0));
    const lineMat = trackM(new LineBasicMaterial({ color: STONE.clone(), transparent: true, opacity: 0.9 }));
    const lines = new LineSegments(track(new EdgesGeometry(ico)), lineMat);
    const fillMat = trackM(
      new MeshBasicMaterial({ color: 0x2a241d, transparent: true, opacity: 0.05, depthWrite: false, polygonOffset: true, polygonOffsetFactor: 1 }),
    );
    const fill = new Mesh(ico, fillMat);
    const g = new Group();
    g.add(fill, lines);
    g.rotation.set(i * 0.7, i * 1.3, i * 0.4);
    root.add(g);
    return { g, lineMat, fillMat, speed: (i % 2 ? -1 : 1) * (0.05 + i * 0.012) };
  });

  let pointerX = 0;
  let pointerY = 0;
  let leanX = 0;
  let leanY = 0;
  let progress = 0;
  let shown = mode === "hero" ? 0 : 0;
  let last = performance.now();
  let running = false;
  let intro = 0; // 0 → 1 once, when the scene first starts

  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    intro = damp(intro, 1, dt, 2.2);
    leanX = damp(leanX, pointerY * 0.35, dt);
    leanY = damp(leanY, pointerX * 0.5, dt);
    shown = damp(shown, progress, dt, 6);

    root.rotation.x = leanX;
    root.rotation.y = leanY;
    root.scale.setScalar(0.85 + 0.15 * intro);

    const pulse = 1 + Math.sin(now / 1400) * 0.03;
    core.scale.setScalar(pulse);

    shells.forEach((s, i) => {
      s.g.rotation.y += s.speed * dt;
      s.g.rotation.x += s.speed * 0.4 * dt;
      if (mode === "hero") {
        // Exploded view as the hero scrolls away.
        const spread = 1 + shown * (0.25 + i * 0.12);
        s.g.scale.setScalar(spread);
        const o = (1 - shown * 0.7) * intro;
        s.lineMat.opacity = 0.9 * o;
        s.fillMat.opacity = 0.05 * o;
        s.lineMat.color.copy(STONE);
      } else {
        // Shell i is built while progress moves through step i.
        const local = Math.min(1, Math.max(0, shown * SHELLS - i));
        s.g.scale.setScalar(1 + (1 - local) * 0.35);
        s.lineMat.opacity = 0.95 * local;
        s.fillMat.opacity = 0.06 * local;
        const isCurrent = local > 0 && local < 1 ? 1 : i === Math.min(SHELLS - 1, Math.floor(shown * SHELLS)) ? 0.6 : 0;
        s.lineMat.color.copy(STONE).lerp(AMBER, isCurrent);
      }
    });

    renderer.render(scene, camera);
  }

  return {
    setPointer(x, y) {
      pointerX = x;
      pointerY = y;
    },
    setProgress(p) {
      progress = p;
    },
    start() {
      if (running) return;
      running = true;
      last = performance.now();
      renderer.setAnimationLoop(frame);
    },
    stop() {
      running = false;
      renderer.setAnimationLoop(null);
    },
    resize(w, h) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    },
    dispose() {
      renderer.setAnimationLoop(null);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
