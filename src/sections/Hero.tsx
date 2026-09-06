import { Suspense, lazy, useEffect, useRef } from "react";
import Magnetic from "../components/Magnetic";
import { site, stats } from "../data/content";
import { gsap, isTouch } from "../lib/animations";
import { scrollToId } from "../lib/smooth";

const BlobScene = lazy(() => import("../three/BlobScene"));

function Counter({ value, suffix }: { value: number; suffix?: string }) {
	const ref = useRef<HTMLSpanElement>(null);
	useEffect(() => {
		const obj = { v: 0 };
		const tl = gsap.to(obj, {
			v: value,
			duration: 1.4,
			ease: "power3.out",
			scrollTrigger: { trigger: ref.current, start: "top 92%" },
			onUpdate: () => {
				if (ref.current) ref.current.textContent = String(Math.round(obj.v));
			},
		});
		return () => {
			tl.scrollTrigger?.kill();
			tl.kill();
		};
	}, [value]);
	return (
		<span>
			<span ref={ref}>0</span>
			{suffix}
		</span>
	);
}

export default function Hero({ ready }: { ready: boolean }) {
	const ref = useRef<HTMLElement>(null);
	const spot = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const section = ref.current;
		const el = spot.current;
		if (!section || !el || isTouch()) return;
		const move = (e: PointerEvent) => {
			const r = section.getBoundingClientRect();
			el.style.left = `${((e.clientX - r.left) / (r.right - r.left)) * 100}%`;
			el.style.top = `${((e.clientY - r.top) / (r.bottom - r.top)) * 100}%`;
		};
		section.addEventListener("pointermove", move);
		return () => section.removeEventListener("pointermove", move);
	}, []);

	useEffect(() => {
		if (!ready) return;
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				delay: 0.1,
				defaults: { ease: "power4.out" },
			});
			tl.from(".hx-meta", { opacity: 0, y: -10, duration: 0.5 })
				.from(".hx-line", { yPercent: 115, duration: 0.9 }, "-=0.2")
				.from(".hx-dim", { opacity: 0, duration: 0.5 }, "-=0.5")
				.from(".hx-sub", { opacity: 0, y: 12, duration: 0.6 }, "-=0.3")
				.from(
					".hx-cta",
					{ opacity: 0, y: 14, duration: 0.5, stagger: 0.06 },
					"-=0.3",
				)
				.from(
					".hx-stat",
					{ opacity: 0, y: 14, duration: 0.5, stagger: 0.05 },
					"-=0.3",
				)
				.from(".hx-block", { opacity: 0, y: 20, duration: 0.6 }, "-=0.2");

			gsap.to(".hx-content", {
				yPercent: -8,
				opacity: 0.2,
				ease: "none",
				scrollTrigger: {
					trigger: ref.current,
					start: "top top",
					end: "bottom 25%",
					scrub: true,
				},
			});
			gsap.to(".hx-model", {
				yPercent: 14,
				ease: "none",
				scrollTrigger: {
					trigger: ref.current,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});
		}, ref);
		return () => ctx.revert();
	}, [ready]);

	return (
		<section
			ref={ref}
			id="hero"
			className="relative flex min-h-[100svh] flex-col overflow-hidden bp-bg"
		>
			<div className="pointer-events-none absolute inset-0">
				<div className="scanline absolute inset-0" />
			</div>
			<div className="absolute left-8 top-24 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-mut lg:block">
				12.9716° N · 77.5946° E
			</div>
			<div className="absolute right-8 top-24 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-mut lg:flex">
				<span className="led bg-ok" />
				model sn-01 · systems online
			</div>

			<div className="spotlight" ref={spot} aria-hidden="true" />

			<div className="hx-model absolute inset-y-0 right-0 w-full opacity-60 md:w-[56%]">
				<Suspense fallback={null}>
					<BlobScene />
				</Suspense>
			</div>

			<div className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-line lg:block" />

			<div className="hx-content relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-center px-6 pb-10 pt-28 sm:px-10 lg:px-16 xl:px-24">
				<div className="hx-meta flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-mut">
					<span className="led bg-cy" />
					{site.availability}
					<span className="h-px w-12 bg-line" />
				</div>

				<h1 className="mt-8 font-display font-bold uppercase leading-[0.95] tracking-[-0.01em]">
					<span className="block overflow-hidden">
						<span className="hx-line flex items-baseline gap-4 text-[clamp(2rem,7.5vw,5.8rem)]">
							Sumeet Naik<span className="text-grad-blp">.</span>
							<span className="hidden h-px flex-1 bg-line md:block" />
							<span className="hidden font-mono text-[clamp(0.7rem,1.4vw,1rem)] tracking-[0.3em] text-mut md:inline">
								B.Tech·IoT
							</span>
						</span>
					</span>
				</h1>

				<div className="hx-dim dim dim-ends mt-7 max-w-md">
					<span className="whitespace-nowrap">± 0.02 mm · {site.role}</span>
				</div>

				<p className="hx-sub mt-5 max-w-xl font-mono text-[12px] leading-relaxed uppercase tracking-[0.12em] text-mut sm:text-sm">
					{site.tagline}
				</p>

				<div className="hx-cta mt-9 flex flex-wrap items-center gap-4">
					<Magnetic>
						<button
							type="button"
							onClick={() => scrollToId("#projects")}
							className="group relative border border-cy bg-cy px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink shadow-[0_0_28px_rgb(94_230_255/0.35)] transition-colors hover:bg-transparent hover:text-cy"
						>
							View drawings ▸
						</button>
					</Magnetic>
					<Magnetic>
						<button
							type="button"
							onClick={() => scrollToId("#contact")}
							className="border border-line px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-soft transition-colors hover:border-cy/60 hover:text-cy"
						>
							Open line
						</button>
					</Magnetic>
				</div>

				<div className="hx-stat mt-12 grid max-w-3xl grid-cols-2 sm:grid-cols-4">
					{stats.map((s, i) => (
						<div
							key={s.label}
							className={`border-line px-4 py-3 ${i > 0 ? "border-l" : ""}`}
						>
							<div className="font-display text-2xl font-bold tracking-tight text-soft sm:text-3xl">
								<Counter value={s.value} suffix={s.suffix} />
							</div>
							<p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-mut">
								{s.label}
							</p>
						</div>
					))}
				</div>
			</div>

			<div className="hx-block relative z-10 border-t border-line bg-ink2/70 backdrop-blur">
				<div className="mx-auto grid w-full max-w-[1500px] grid-cols-2 gap-px bg-line font-mono text-[10px] uppercase tracking-[0.22em] text-mut sm:grid-cols-3 md:grid-cols-6">
					{[
						["proj", "sumeet_naik.portfolio"],
						["drawn by", site.name],
						["date", "2026"],
						["scale", "1:1"],
						["rev", "v2.0"],
						["status", "approved ✓"],
					].map(([k, v]) => (
						<div key={k} className="bg-ink2 px-4 py-3">
							<span className="text-cy/60">{k}</span> · {v}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
