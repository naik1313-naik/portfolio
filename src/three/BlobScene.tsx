import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";

function WireMesh() {
	const g = useRef<THREE.Group | null>(null);
	const inner = useRef<THREE.Mesh | null>(null);
	useFrame((state) => {
		const t = state.clock.elapsedTime;
		if (g.current) {
			g.current.rotation.y = t * 0.25;
			g.current.rotation.x = Math.sin(t * 0.15) * 0.4;
		}
		if (inner.current) {
			inner.current.rotation.y = -t * 0.5;
			inner.current.rotation.z = t * 0.2;
		}
	});
	return (
		<group ref={g} position={[0, 0, 0]}>
			<mesh>
				<icosahedronGeometry args={[1.4, 1]} />
				<meshBasicMaterial
					color="#5ee6ff"
					wireframe
					transparent
					opacity={0.5}
				/>
			</mesh>
			<mesh>
				<icosahedronGeometry args={[1.05, 0]} />
				<meshBasicMaterial
					color="#5ee6ff"
					wireframe
					transparent
					opacity={0.2}
				/>
			</mesh>
			<mesh ref={inner} position={[0, 0, 0]}>
				<torusGeometry args={[1.75, 0.012, 12, 140]} />
				<meshBasicMaterial color="#eaf4ff" transparent opacity={0.6} />
			</mesh>
			<mesh ref={inner}>
				<torusGeometry args={[2, 0.01, 12, 140]} />
				<meshBasicMaterial color="#ff9e4d" transparent opacity={0.35} />
			</mesh>
			<mesh>
				<sphereGeometry args={[1.5, 12, 12]} />
				<meshBasicMaterial
					color="#5ee6ff"
					wireframe
					transparent
					opacity={0.08}
				/>
			</mesh>
		</group>
	);
}

function Axis() {
	return (
		<group>
			<line>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						args={[new Float32Array([-3.2, 0, 0, 3.2, 0, 0]), 3]}
					/>
				</bufferGeometry>
				<lineBasicMaterial color="#5ee6ff" transparent opacity={0.25} />
			</line>
			<line>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						args={[new Float32Array([0, -3.2, 0, 0, 3.2, 0]), 3]}
					/>
				</bufferGeometry>
				<lineBasicMaterial color="#5ee6ff" transparent opacity={0.25} />
			</line>
			<line>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						args={[new Float32Array([0, 0, -3.2, 0, 0, 3.2]), 3]}
					/>
				</bufferGeometry>
				<lineBasicMaterial color="#5ee6ff" transparent opacity={0.25} />
			</line>
		</group>
	);
}

export default function BlobScene() {
	const wrap = useRef<HTMLDivElement>(null);
	const [running, setRunning] = useState(true);

	useEffect(() => {
		const el = wrap.current;
		if (!el) return;
		const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), {
			threshold: 0.1,
		});
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<div ref={wrap} className="absolute inset-0">
			<Canvas
				frameloop={running ? "always" : "never"}
				dpr={[1, 1.8]}
				camera={{ position: [0, 0, 5.2], fov: 42 }}
				gl={{ antialias: true, alpha: true }}
				style={{ background: "transparent" }}
			>
				<Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
					<WireMesh />
				</Float>
				<Axis />
				<Sparkles
					count={90}
					scale={5}
					size={1.8}
					speed={0.3}
					color="#5ee6ff"
					opacity={0.5}
				/>
			</Canvas>
		</div>
	);
}
