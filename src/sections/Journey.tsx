import { useEffect, useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import { timeline } from "../data/content";
import { gsap } from "../lib/animations";

export default function Journey() {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".jg-reveal", {
				x: -36,
				opacity: 0,
				y: 18,
				duration: 0.8,
				ease: "power4.out",
				stagger: 0.1,
				scrollTrigger: { trigger: ref.current, start: "top 72%" },
			});
		}, ref);
		return () => ctx.revert();
	}, []);

	return (
		<section id="journey" ref={ref} className="relative py-28 sm:py-40">
			<div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-16 xl:px-24">
				<div className="jg-reveal">
					<SectionHeading
						index="04"
						eyebrow="Build log"
						title="Field notes, archived."
					/>
				</div>

				<div className="relative mt-16 pl-2 sm:pl-6">
					<div className="absolute bottom-0 left-0 top-0 hidden w-px bg-line sm:block" />
					<div className="absolute bottom-0 left-0 top-0 hidden w-px bg-cy/30 blur-[2px] sm:block sm:left-[3px]" />

					<div className="space-y-12">
						{timeline.map((t, i) => (
							<div
								key={`${t.type}-${t.period}-${t.role}`}
								className="jg-reveal relative grid grid-cols-1 gap-3 sm:grid-cols-[190px_1fr] sm:gap-8"
							>
								<div className="hidden sm:block">
									<div className="sticky top-28">
										<div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cy/70">
											log/{String(i + 1).padStart(3, "0")}
										</div>
										<div className="mt-2 font-mono text-xl leading-snug text-soft">
											{t.period}
										</div>
										<div className="mt-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mut">
											<span
												className={`led ${t.type.toLowerCase() === "education" ? "bg-or" : "bg-cy"}`}
											/>
											{t.type}
										</div>
									</div>
								</div>

								<div className="relative border border-line bg-ink2/70 px-5 py-6 sm:px-7">
									<span className="corner-tl" />
									<span className="corner-tr" />
									<span className="corner-bl" />
									<span className="corner-br" />
									<span
										className="absolute -left-[7px] top-1/2 hidden h-3.5 w-3.5 border border-cy bg-ink sm:block"
										style={{ transform: "rotate(45deg)" }}
									/>

									<div className="sm:hidden">
										<div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em]">
											<span className="text-soft">{t.period}</span>
											<span className="flex items-center gap-2 text-mut">
												<span
													className={`led ${t.type.toLowerCase() === "education" ? "bg-or" : "bg-cy"}`}
												/>
												{t.type}
											</span>
										</div>
									</div>

									<h3 className="font-display text-xl font-bold uppercase tracking-tight text-soft">
										{t.role}
									</h3>
									<div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-cy">
										{t.org}
									</div>
									<p className="mt-4 font-mono text-[12px] leading-relaxed text-mut">
										{t.body}
									</p>
									<div className="mt-5 flex flex-wrap gap-2">
										{t.tags.map((tag) => (
											<span
												key={tag}
												className="border border-line px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-mut"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
