import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uWaveHeight;
  uniform float uWaveFrequency;
  varying vec2 vUv;

  void main() {
    vec3 pos = position;
    float wave1 = sin(pos.x * uWaveFrequency + uTime * uSpeed) * uWaveHeight;
    float wave2 = cos(pos.y * uWaveFrequency * 0.8 + uTime * uSpeed * 1.2) * uWaveHeight * 0.5;
    pos.z = wave1 + wave2;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    float gradient = vUv.y + sin(vUv.x * 3.0 + uTime * 0.2) * 0.1;
    vec3 color = mix(uColor1, uColor2, smoothstep(0.0, 0.5, gradient));
    color = mix(color, uColor3, smoothstep(0.5, 1.0, gradient));
    gl_FragColor = vec4(color, uOpacity);
  }
`;

export default function NeuralRibbon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    const segments = isMobile ? 64 : 128;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 5, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ribbon geometry
    const geometry = new THREE.PlaneGeometry(22, 14, segments, segments);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uSpeed: { value: 0.8 },
        uWaveHeight: { value: 1.5 },
        uWaveFrequency: { value: 0.5 },
        uColor1: { value: new THREE.Color(0.04, 0.09, 0.16) },
        uColor2: { value: new THREE.Color(0.12, 0.23, 0.37) },
        uColor3: { value: new THREE.Color(0.02, 0.71, 0.83) },
        uOpacity: { value: 0.9 },
      },
      side: THREE.DoubleSide,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Post-processing (Bloom)
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      isMobile ? 0.3 : 0.6,
      0.5,
      0.85
    );
    composer.addPass(bloomPass);

    // Clock
    const clock = new THREE.Clock();

    // Mouse handler
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Touch handler
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = (e.touches[0].clientY / window.innerHeight) * 2 - 1;
      }
    };
    window.addEventListener('touchmove', onTouchMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed;

      // Smooth mouse rotation
      targetRotationRef.current.y = mouseRef.current.x * 0.15;
      targetRotationRef.current.x = -mouseRef.current.y * 0.1;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.05;
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.05;
      mesh.rotation.y = currentRotationRef.current.y;
      mesh.rotation.x = currentRotationRef.current.x;

      composer.render();
    };
    animate();

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      bloomPass.resolution.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      composer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
