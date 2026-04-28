"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ═══════════════════════════════════════════
   ПЛАТФОРМА — поднятый диск с фаской
═══════════════════════════════════════════ */
function Platform() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.3 + Math.sin(s.clock.elapsedTime * 1.2) * 0.08;
  });
  return (
    <mesh ref={ref} position={[0, -1.8, 0]} receiveShadow>
      <cylinderGeometry args={[2.4, 2.6, 0.22, 80, 1, false]} />
      <meshStandardMaterial
        color="#061a18"
        emissive="#14B8A6"
        emissiveIntensity={0.3}
        metalness={0.9}
        roughness={0.2}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════
   КОЛЬЦО — горизонтальное, с анимацией
═══════════════════════════════════════════ */
type RingProps = {
  radius: number;
  tubeRadius: number;
  color: string;
  emissiveIntensity: number;
  speed: number;
  tiltX?: number;
  tiltZ?: number;
  opacity: number;
  segmented?: boolean;
  segmentCount?: number;
};

function Ring({
  radius,
  tubeRadius,
  color,
  emissiveIntensity,
  speed,
  tiltX = -Math.PI / 2,
  tiltZ = 0,
  opacity,
  segmented = false,
  segmentCount = 1,
}: RingProps) {
  const ref = useRef<THREE.Group>(null);

  const geos = useMemo(() => {
    if (!segmented) {
      return [new THREE.TorusGeometry(radius, tubeRadius, 8, 120)];
    }
    const arr: THREE.TorusGeometry[] = [];
    const arc = (Math.PI * 2) / segmentCount;
    const gapFrac = 0.18;
    for (let i = 0; i < segmentCount; i++) {
      const start = i * arc;
      const len = arc * (1 - gapFrac);
      arr.push(new THREE.TorusGeometry(radius, tubeRadius, 6, 40, len));
    }
    return arr;
  }, [radius, tubeRadius, segmented, segmentCount]);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = s.clock.elapsedTime * speed;
    const mat = (ref.current.children[0] as THREE.Mesh)
      ?.material as THREE.MeshStandardMaterial;
    if (mat)
      mat.emissiveIntensity =
        emissiveIntensity + Math.sin(s.clock.elapsedTime * 0.8 + radius) * emissiveIntensity * 0.2;
  });

  return (
    <group ref={ref} rotation={[tiltX, 0, tiltZ]}>
      {geos.map((geo, i) => (
        <mesh
          key={i}
          geometry={geo}
          rotation={[0, 0, ((Math.PI * 2) / segmentCount) * i]}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={emissiveIntensity}
            metalness={0.8}
            roughness={0.15}
            transparent
            opacity={opacity}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════
   ЩИТЫ — группа вложенных 3D-щитов
═══════════════════════════════════════════ */
function ShieldCore() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const shieldShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 1.7);
    s.bezierCurveTo(0.5, 1.65, 1.3, 1.3, 1.3, 0.5);
    s.bezierCurveTo(1.3, -0.5, 0.6, -1.2, 0, -1.7);
    s.bezierCurveTo(-0.6, -1.2, -1.3, -0.5, -1.3, 0.5);
    s.bezierCurveTo(-1.3, 1.3, -0.5, 1.65, 0, 1.7);
    return s;
  }, []);

  const extGeo = useMemo(
    () =>
      new THREE.ExtrudeGeometry(shieldShape, {
        depth: 0.55,
        bevelEnabled: true,
        bevelThickness: 0.22,
        bevelSize: 0.15,
        bevelSegments: 8,
        curveSegments: 48,
      }),
    [shieldShape]
  );

  const innerGeo = useMemo(
    () =>
      new THREE.ExtrudeGeometry(shieldShape, {
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.08,
        bevelSegments: 6,
        curveSegments: 48,
      }),
    [shieldShape]
  );

  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(extGeo, 20), [extGeo]);

  useFrame((s) => {
    if (!groupRef.current) return;
    const t = s.clock.elapsedTime;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current.x * 0.5,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * 0.3 - 0.1,
      0.04
    );
    groupRef.current.position.y =
      -0.1 + Math.sin(t * 0.7) * 0.12;
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* внешний объёмный щит */}
      <mesh geometry={extGeo} castShadow>
        <meshPhysicalMaterial
          color="#0a2e2a"
          emissive="#14B8A6"
          emissiveIntensity={0.45}
          metalness={0.9}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.8}
        />
      </mesh>

      {/* светящийся контур */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial
          color="#2DD4BF"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* внутренний щит — акцентный */}
      <mesh geometry={innerGeo} scale={0.62} position={[0, 0, 0.2]}>
        <meshPhysicalMaterial
          color="#14B8A6"
          emissive="#2DD4BF"
          emissiveIntensity={1.2}
          metalness={0.7}
          roughness={0.1}
          transparent
          opacity={0.85}
          clearcoat={1}
        />
      </mesh>

      {/* пульсирующее ядро */}
      <PulsingCore />
    </group>
  );
}

function PulsingCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (coreRef.current)
      coreRef.current.scale.setScalar(1 + Math.sin(t * 2.2) * 0.08);
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.6 + Math.sin(t * 1.5) * 0.15);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.18 + Math.sin(t * 1.8) * 0.06;
    }
  });
  return (
    <>
      <mesh ref={coreRef} position={[0, 0, 0.55]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#5EEAD4"
          emissiveIntensity={5}
          metalness={1}
          roughness={0}
        />
      </mesh>
      <mesh ref={glowRef} position={[0, 0, 0.55]}>
        <sphereGeometry args={[0.38, 20, 20]} />
        <meshBasicMaterial
          color="#14B8A6"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

/* ═══════════════════════════════════════════
   ОРБИТАЛЬНЫЕ ОБЪЕКТЫ — «зависимости/компоненты»
═══════════════════════════════════════════ */
type OrbiterConfig = {
  orbitRadius: number;
  orbitSpeed: number;
  orbitTilt: number;
  phaseOffset: number;
  size: number;
  color: string;
  shape: "ico" | "octa" | "box" | "tetra";
};

function Orbiters() {
  const groupRef = useRef<THREE.Group>(null);

  const configs = useMemo<OrbiterConfig[]>(
    () => [
      { orbitRadius: 2.2, orbitSpeed: 0.45, orbitTilt: 0.3, phaseOffset: 0, size: 0.18, color: "#2DD4BF", shape: "ico" },
      { orbitRadius: 2.6, orbitSpeed: -0.32, orbitTilt: -0.5, phaseOffset: 1.5, size: 0.14, color: "#14B8A6", shape: "box" },
      { orbitRadius: 2.0, orbitSpeed: 0.55, orbitTilt: 0.8, phaseOffset: 3.0, size: 0.16, color: "#5EEAD4", shape: "octa" },
      { orbitRadius: 3.0, orbitSpeed: -0.28, orbitTilt: -0.2, phaseOffset: 4.5, size: 0.12, color: "#0D9488", shape: "ico" },
      { orbitRadius: 2.4, orbitSpeed: 0.38, orbitTilt: 1.1, phaseOffset: 2.2, size: 0.13, color: "#2DD4BF", shape: "octa" },
      { orbitRadius: 2.8, orbitSpeed: -0.42, orbitTilt: -0.7, phaseOffset: 5.1, size: 0.11, color: "#14B8A6", shape: "box" },
    ],
    []
  );

  useFrame((s) => {
    if (!groupRef.current) return;
    const t = s.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const c = configs[i];
      if (!c) return;
      const a = t * c.orbitSpeed + c.phaseOffset;
      child.position.x = Math.cos(a) * c.orbitRadius;
      child.position.y = Math.sin(a * 0.7 + c.phaseOffset) * c.orbitRadius * Math.sin(c.orbitTilt);
      child.position.z = Math.sin(a) * c.orbitRadius * Math.cos(c.orbitTilt);
      child.rotation.x = t * 0.6 + c.phaseOffset;
      child.rotation.y = t * 0.4;
    });
  });

  const geoFor = (shape: OrbiterConfig["shape"], size: number) => {
    switch (shape) {
      case "ico":   return <icosahedronGeometry args={[size, 0]} />;
      case "octa":  return <octahedronGeometry args={[size, 0]} />;
      case "box":   return <boxGeometry args={[size * 1.6, size * 1.6, size * 1.6]} />;
      case "tetra": return <tetrahedronGeometry args={[size, 0]} />;
    }
  };

  return (
    <group ref={groupRef}>
      {configs.map((c, i) => (
        <mesh key={i} castShadow>
          {geoFor(c.shape, c.size)}
          <meshStandardMaterial
            color={c.color}
            emissive={c.color}
            emissiveIntensity={1.8}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════
   СЦЕНА ЦЕЛИКОМ
═══════════════════════════════════════════ */
function Scene() {
  const { viewport } = useThree();
  const scale = Math.min(viewport.width / 7, 1);

  return (
    <group scale={scale}>
      {/* фоновое свечение снизу — как у Solar */}
      <mesh position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshBasicMaterial
          color="#14B8A6"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <Platform />

      {/* горизонтальные кольца платформы */}
      <group position={[0, -1.68, 0]}>
        <Ring radius={1.5} tubeRadius={0.012} color="#14B8A6" emissiveIntensity={2}   speed={0.25}  opacity={0.9} />
        <Ring radius={2.0} tubeRadius={0.010} color="#2DD4BF" emissiveIntensity={1.5} speed={-0.18} opacity={0.75} segmented segmentCount={6} />
        <Ring radius={2.5} tubeRadius={0.008} color="#14B8A6" emissiveIntensity={1.2} speed={0.14}  opacity={0.55} segmented segmentCount={8} />
        <Ring radius={3.2} tubeRadius={0.006} color="#0D9488" emissiveIntensity={0.9} speed={-0.10} opacity={0.4}  segmented segmentCount={10} />
      </group>

      {/* наклонные орбитальные кольца вокруг щита */}
      <Ring radius={1.7} tubeRadius={0.008} color="#2DD4BF" emissiveIntensity={1.8} speed={0.35}  tiltX={-0.4} tiltZ={0.2} opacity={0.7} />
      <Ring radius={2.2} tubeRadius={0.006} color="#14B8A6" emissiveIntensity={1.4} speed={-0.28} tiltX={0.5}  tiltZ={-0.3} opacity={0.55} segmented segmentCount={5} />
      <Ring radius={2.8} tubeRadius={0.005} color="#5EEAD4" emissiveIntensity={1.0} speed={0.20}  tiltX={-0.8} tiltZ={0.5} opacity={0.4}  segmented segmentCount={7} />

      <ShieldCore />
      <Orbiters />
    </group>
  );
}

/* ═══════════════════════════════════════════
   ЭКСПОРТ
═══════════════════════════════════════════ */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 7], fov: 48 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      shadows
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#020c0a", 10, 28]} />
      <ambientLight intensity={0.2} color="#0f3330" />
      <pointLight position={[0, 5, 3]}   intensity={6}  color="#14B8A6" castShadow />
      <pointLight position={[4, 2, 4]}   intensity={3}  color="#2DD4BF" />
      <pointLight position={[-4, 1, 2]}  intensity={2}  color="#0D9488" />
      <pointLight position={[0, -3, 1]}  intensity={4}  color="#14B8A6" />
      <directionalLight position={[3, 8, 4]} intensity={1.5} color="#5EEAD4" castShadow />
      <Scene />
    </Canvas>
  );
}
