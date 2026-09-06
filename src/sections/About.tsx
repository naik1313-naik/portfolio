import { useEffect, useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import Statue3D from "../components/Statue3D";
import { about, site } from "../data/content";
import { gsap, isTouch } from "../lib/animations";
import { asset } from "../lib/assets";

const SPEC = [
	["designation", "Engineering Student"],
	["specialization", "B.Tech · Internet of Things"],
	["institution", "Presidency University, Bengaluru"],
	["primary discipline", "Software × Data × AI"],
];

export default function About() {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const card = ref.current?.querySelector(".ab-card") as HTMLElement | null;
		if (!card || isTouch()) return;
		const rx = gsap.quickTo(card, "rotationX", {
			duration: 0.6,
			ease: "power3",
			transformPerspective: 1200,
		});
		const ry = gsap.quickTo(card, "rotationY", {
			duration: 0.6,
			ease: "power3",
			transformPerspective: 1200,
		});
		const move = (e: PointerEvent) => {
			const r = card.getBoundingClientRect();
			const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
			const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
			ry(dx * 4);
			rx(-dy * 4);
		};
		const leave = () => {
			rx(0);
			ry(0);
		};
		card.addEventListener("pointermove", move);
		card.addEventListener("pointerleave", leave);
		return () => {
			card.removeEventListener("pointermove", move);
			card.removeEventListener("pointerleave", leave);
		};
	}, []);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".ab-reveal", {
				y: 30,
				opacity: 0,
				duration: 0.8,
				stagger: 0.08,
				ease: "power4.out",
				scrollTrigger: { trigger: ref.current, start: "top 70%" },
			});
			gsap.fromTo(
				".ab-card",
				{ y: 50, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					ease: "power4.out",
					scrollTrigger: { trigger: ".ab-card", start: "top 82%" },
				},
			);
		}, ref);
		return () => ctx.revert();
	}, []);

	return (
		<section id="about" ref={ref} className="relative py-28 sm:py-40 bp-bg">
			<div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-14 px-6 sm:px-10 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:px-16 xl:px-24">
				<div>
					<div className="ab-reveal">
						<SectionHeading
							index="01"
							eyebrow="Operator profile"
							title="Designing at the junction of software, data & AI."
						/>
					</div>

					<div className="ab-reveal mt-9 space-y-4 font-mono text-[13px] leading-relaxed tracking-wide text-mut">
						{about.paragraphs.map((p) => (
							<p key={p}>
								<span className="text-cy">▌</span> {p}
							</p>
						))}
					</div>

					<div className="ab-reveal mt-9 border border-line">
						{SPEC.map(([k, v], i) => (
							<div
								key={k}
								className={`grid grid-cols-[130px_1fr] gap-4 px-4 py-3 ${i > 0 ? "border-t border-line" : ""}`}
							>
								<span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cy/70">
									{k}
								</span>
								<span className="font-mono text-[12px] uppercase tracking-[0.12em] text-soft">
									{v}
								</span>
							</div>
						))}
					</div>

					<div className="ab-reveal mt-7 flex flex-wrap gap-2.5">
						{about.focus.map((f, i) => (
							<span
								key={f}
								className="border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mut"
							>
								<span className="text-cy">0{i + 1}</span> {f}
							</span>
						))}
					</div>

					<div className="ab-reveal mt-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-mut">
						<span className="led bg-ok" />
						{site.location}
					</div>
				</div>

				<div style={{ perspective: 1200 }}>
					<div className="ab-card sheet relative p-3 sm:p-4 [transform-style:preserve-3d]">
						<span className="corner-tl" />
						<span className="corner-tr" />
						<span className="corner-bl" />
						<span className="corner-br" />

						<div className="relative aspect-[4/5] overflow-hidden border border-line">
							<div className="absolute inset-0">
								<Statue3D image={asset("/img/sumeet.jpg")} size={999} />
							</div>
							<div className="pointer-events-none absolute inset-0 bp-bg opacity-30 mix-blend-screen" />
							<div className="scanline absolute inset-0" />

							<div className="absolute left-3 top-3 border border-line bg-ink/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-cy backdrop-blur">
								operator ● sumeet
							</div>
							<div className="absolute right-3 top-3 border border-line bg-ink/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-mut backdrop-blur">
								dwg 01-a
							</div>
							<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between border border-line bg-ink/80 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-mut backdrop-blur">
								<span>fig. operator portrait</span>
								<span className="text-soft">{site.name}</span>
								<span className="flex items-center gap-1.5">
									<span className="led bg-ok" />
									verified
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
