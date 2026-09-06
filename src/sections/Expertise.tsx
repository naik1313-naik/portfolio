import { useEffect, useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import { services, skills } from "../data/content";
import { gsap } from "../lib/animations";

function Gauge({ level, label }: { level: number; label: string }) {
	const ring = useRef<SVGCircleElement>(null);
	const num = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const R = 44;
		const C = 2 * Math.PI * R;
		if (ring.current) ring.current.style.strokeDasharray = String(C);

		const obj = { v: 0 };
		const tl = gsap.to(obj, {
			v: level,
			duration: 1.4,
			ease: "power3.out",
			scrollTrigger: { trigger: ring.current, start: "top 90%" },
			onUpdate: () => {
				if (ring.current)
					ring.current.style.strokeDashoffset = String(C * (1 - obj.v / 100));
				if (num.current) num.current.textContent = String(Math.round(obj.v));
			},
			onComplete: () => {
				if (num.current) num.current.textContent = String(Math.round(obj.v));
			},
		});
		return () => {
			tl.scrollTrigger?.kill();
			tl.kill();
		};
	}, [level]);

	return (
		<div>
			<div className="relative mx-auto h-28 w-28">
				<svg
					viewBox="0 0 100 100"
					className="h-full w-full -rotate-90"
					aria-hidden="true"
				>
					<circle
						cx="50"
						cy="50"
						r={44}
						fill="none"
						stroke="rgb(94 230 255 / 0.12)"
						strokeWidth="3"
						strokeDasharray="276"
					/>
					<circle
						ref={ring}
						cx="50"
						cy="50"
						r={44}
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="square"
						strokeDashoffset="276"
					/>
				</svg>
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span ref={num} className="font-display text-2xl font-bold text-soft">
						0
					</span>
					<span className="font-mono text-[9px] uppercase tracking-[0.2em] text-mut">
						/100
					</span>
				</div>
			</div>
			<p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-mut">
				{label}
			</p>
		</div>
	);
}

export default function Expertise() {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".ex-reveal", {
				y: 30,
				opacity: 0,
				stagger: 0.06,
				duration: 0.8,
				ease: "power4.out",
				scrollTrigger: { trigger: ref.current, start: "top 72%" },
			});
		}, ref);
		return () => ctx.revert();
	}, []);

	return (
		<section id="expertise" ref={ref} className="relative py-28 sm:py-40 bp-bg">
			<div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-16 xl:px-24">
				<div className="ex-reveal flex items-end justify-between gap-6">
					<SectionHeading
						index="03"
						eyebrow="Instrumentation & tools"
						title="Calibrated skills, on spec."
					/>
					<span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-mut md:flex">
						tolerance: <span className="text-cy">±5%</span>
					</span>
				</div>

				<div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
					{skills.map((s) => (
						<div key={s.label} className="ex-reveal">
							<div className="text-cy">
								<Gauge level={s.level} label={s.label} />
							</div>
							<p className="mx-auto mt-3 max-w-[18ch] text-center font-mono text-[10px] leading-relaxed uppercase tracking-[0.14em] text-mut">
								{s.blurb}
							</p>
						</div>
					))}
				</div>

				{services.length > 0 && (
					<div className="mt-20 border-t border-line">
						<div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
							{services.map((s, i) => (
								<div
									key={s.title}
									className="group relative bg-ink2 p-7 transition-colors hover:bg-ink2/60"
								>
									<span className="absolute right-4 top-4 font-mono text-[10px] text-cy/40">
										SPEC-{String(i + 1).padStart(2, "0")}
									</span>
									<div className="font-mono text-2xl text-cy">{s.icon}</div>
									<h3 className="mt-4 font-display text-xl font-bold uppercase tracking-tight text-soft">
										{s.title}
									</h3>
									<p className="mt-2 font-mono text-[11px] leading-relaxed text-mut">
										{s.description}
									</p>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
