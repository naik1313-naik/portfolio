import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { asset } from "../lib/assets";

export default function Statue3D({
	image,
	size = 132,
}: { image: string; size?: number }) {
	const mount = useRef<HTMLDivElement>(null);
	const [missing, setMissing] = useState(false);

	useEffect(() => {
		const el = mount.current;
		if (!el) return;

		let cancelled = false;
		let renderer: THREE.WebGLRenderer | null = null;
		let model: THREE.Object3D | null = null;
		let raf = 0;
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		let visible = true;

		const io = new IntersectionObserver(
			([e]) => {
				visible = e.isIntersecting;
				if (!visible) cancelAnimationFrame(raf);
			},
			{ threshold: 0.05 },
		);

		const load = async () => {
			if (cancelled) return;
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(42, 1, 0.05, 100);
			camera.position.z = 2.4;

			renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setClearColor(0x000000, 0);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setSize(el.clientWidth, el.clientHeight, false);
			el.appendChild(renderer.domElement);

			scene.add(new THREE.AmbientLight(0x8892ff, 0.85));
			const key = new THREE.DirectionalLight(0xffffff, 1.7);
			key.position.set(2, 3, 4);
			scene.add(key);
			const rc = new THREE.DirectionalLight(0x25d6ee, 1.1);
			rc.position.set(-3, 1, -2);
			scene.add(rc);
			const rv = new THREE.DirectionalLight(0x7c5cff, 1.1);
			rv.position.set(3, -1, -2);
			scene.add(rv);

			const loader = new GLTFLoader();
			loader.load(
				asset("/models/statue.glb"),
				(gltf) => {
					if (cancelled) return;
					model = gltf.scene;
					const box = new THREE.Box3().setFromObject(model);
					const center = box.getCenter(new THREE.Vector3());
					const dims = box.getSize(new THREE.Vector3());
					model.position.set(-center.x, -center.y, -center.z);
					const maxDim = Math.max(dims.x, dims.y, dims.z);
					camera.position.z = Math.max(maxDim * 1.35, 1.2);
					camera.lookAt(0, 0, 0);
					scene.add(model);
				},
				undefined,
				() => {
					if (!cancelled) setMissing(true);
				},
			);

			const onResize = () => {
				if (renderer) renderer.setSize(el.clientWidth, el.clientHeight, false);
			};
			window.addEventListener("resize", onResize);
			io.observe(el);

			const tick = () => {
				raf = requestAnimationFrame(tick);
				if (!visible || !renderer) return;
				if (model && !reduceMotion) model.rotation.y += 0.008;
				renderer.render(scene, camera);
			};
			tick();

			return () => {
				window.removeEventListener("resize", onResize);
			};
		};

		const cleanupPromise = load();

		return () => {
			cancelled = true;
			cancelAnimationFrame(raf);
			io.disconnect();
			if (renderer) {
				renderer.dispose();
				renderer.domElement.remove();
				renderer = null;
			}
			void cleanupPromise;
		};
	}, []);

	if (missing) {
		return (
			<div
				className="h-full w-full"
				style={{
					padding: 2,
					background:
						"linear-gradient(135deg, rgb(94 230 255 / 0.4), rgb(255 158 77 / 0.2))",
					borderRadius: 8,
				}}
			>
				<img
					src={image}
					alt="Sumeet Naik"
					draggable={false}
					className="h-full w-full rounded-[7px] object-cover object-[center_28%]"
				/>
			</div>
		);
	}

	return (
		<div
			className="relative shrink-0"
			style={{ width: size, height: size }}
			aria-hidden="true"
		>
			<div
				className="absolute inset-0 rounded-full"
				style={{ background: "rgba(94,230,255,0.08)", filter: "blur(28px)" }}
			/>
			<div
				className="pointer-events-none absolute inset-x-0 bottom-1 mx-auto h-1/4 rounded-full blur-md"
				style={{
					background:
						"radial-gradient(ellipse at center, rgba(37,214,238,0.35), transparent 70%)",
				}}
			/>
			<div ref={mount} className="absolute inset-0" />
		</div>
	);
}
