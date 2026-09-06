import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
export const isTouch = () =>
	typeof window !== "undefined" &&
	(window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);
