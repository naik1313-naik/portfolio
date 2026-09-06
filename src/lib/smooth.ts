import Lenis from "lenis";
import { useEffect } from "react";
import { ScrollTrigger, gsap } from "./animations";

let lenis: Lenis | null = null;

export function useSmoothScroll(active = true) {
	useEffect(() => {
		if (!active) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.4 });
		lenis.on("scroll", ScrollTrigger.update);
		const raf = (time: number) => {
			lenis?.raf(time * 1000);
		};
		gsap.ticker.add(raf);
		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove(raf);
			lenis?.destroy();
			lenis = null;
		};
	}, [active]);
}

export function scrollToId(id: string) {
	const target = document.querySelector(id) as HTMLElement | null;
	if (!target) return;
	if (lenis) {
		lenis.scrollTo(target, { offset: 0, duration: 1.4 });
	} else {
		target.scrollIntoView({ behavior: "smooth" });
	}
}
