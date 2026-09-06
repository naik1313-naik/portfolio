import { type HTMLAttributes, type ReactNode, useEffect, useRef } from "react";
import { gsap, isTouch } from "../lib/animations";

interface Props extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	strength?: number;
}

export default function Magnetic({
	children,
	strength = 0.3,
	className = "",
	...rest
}: Props) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el || isTouch()) return;
		const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
		const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

		const move = (e: PointerEvent) => {
			const r = el.getBoundingClientRect();
			xTo((e.clientX - (r.left + r.width / 2)) * strength);
			yTo((e.clientY - (r.top + r.height / 2)) * strength);
		};
		const leave = () => {
			xTo(0);
			yTo(0);
		};
		el.addEventListener("pointermove", move);
		el.addEventListener("pointerleave", leave);
		return () => {
			el.removeEventListener("pointermove", move);
			el.removeEventListener("pointerleave", leave);
		};
	}, [strength]);

	return (
		<div ref={ref} className={`will-change-transform ${className}`} {...rest}>
			{children}
		</div>
	);
}
