import { useEffect, useRef } from "react";
import { gsap } from "../lib/animations";

export default function Cursor() {
	const x = useRef<HTMLDivElement>(null);
	const label = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (window.matchMedia("(pointer: coarse)").matches) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const px = gsap.quickTo(x.current, "x", { duration: 0.08, ease: "power2" });
		const py = gsap.quickTo(x.current, "y", { duration: 0.08, ease: "power2" });

		const move = (e: PointerEvent) => {
			px(e.clientX);
			py(e.clientY);
		};

		const over = (e: Event) => {
			const el = e.target as HTMLElement;
			const hot = el.closest("a, button, input, textarea, [data-cursor]");
			x.current?.classList.toggle("cur-hot", !!hot);
			label.current?.classList.toggle("cur-hot", !!hot);
		};

		window.addEventListener("pointermove", move, { passive: true });
		window.addEventListener("pointerover", over, { passive: true });
		return () => {
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerover", over);
		};
	}, []);

	return (
		<>
			<div
				ref={x}
				className="pointer-events-none fixed left-0 top-0 z-[250] hidden md:block"
				aria-hidden="true"
			>
				<div className="cur-h absolute -translate-x-1/2 -translate-y-1/2">
					<span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-cy/70" />
					<span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-cy/70" />
					<span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-[1px] bg-cy" />
				</div>
				<div
					ref={label}
					className="cur-label pointer-events-none absolute left-4 top-5 origin-top-left font-mono text-[10px] uppercase tracking-[0.25em] text-cy opacity-0"
				>
					OPEN
				</div>
			</div>
			<style>
				{
					".cur-hot .cur-h span{background:#06080c} .cur-hot.cur-label{opacity:1}"
				}
			</style>
		</>
	);
}
