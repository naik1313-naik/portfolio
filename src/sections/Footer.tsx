import { useEffect, useRef } from "react";
import { site } from "../data/content";
import { gsap } from "../lib/animations";
import { scrollToId } from "../lib/smooth";

export default function Footer() {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".ft-reveal", {
				y: 24,
				opacity: 0,
				duration: 0.8,
				stagger: 0.08,
				ease: "power4.out",
				scrollTrigger: { trigger: ref.current, start: "top 90%" },
			});
		}, ref);
		return () => ctx.revert();
	}, []);

	const cols: { id: string; label: string }[] = [
		{ id: "hero", label: "Overview" },
		{ id: "about", label: "About" },
		{ id: "projects", label: "Work" },
		{ id: "expertise", label: "Tools" },
		{ id: "journey", label: "Log" },
		{ id: "contact", label: "Contact" },
	];

	const socials = [
		site.socials.x,
		site.socials.dribbble,
		site.socials.linkedin,
	].filter(Boolean);

	return (
		<footer ref={ref} className="relative border-t border-line bg-ink2/60">
			<div className="mx-auto w-full max-w-[1500px] px-6 py-16 sm:px-10 lg:px-16 xl:px-24">
				<div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
					<div className="ft-reveal">
						<button
							type="button"
							onClick={() => scrollToId("#hero")}
							className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-soft"
						>
							<span className="flex h-9 items-center gap-1 border border-line px-2.5 text-cy">
								<span className="led bg-cy" />
								SN
							</span>
							SUMEET_NAIK<span className="blink text-cy">▌</span>
						</button>
						<p className="mt-5 max-w-sm font-mono text-[11px] leading-relaxed uppercase tracking-[0.14em] text-mut">
							{site.tagline}
						</p>
						<div className="mt-6 flex flex-wrap gap-2">
							{socials.map((url) => (
								<a
									key={url}
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									className="border border-line px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mut transition-colors hover:border-cy/60 hover:text-cy"
								>
									{url.replace(/^https?:\/\/(?:www\.)?/, "").split("/")[0]}
								</a>
							))}
						</div>
					</div>

					<div className="ft-reveal grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cy/70">
								index
							</div>
							<ul className="mt-4 space-y-2.5">
								{cols.map((c) => (
									<li key={c.id}>
										<button
											type="button"
											onClick={() => scrollToId(`#${c.id}`)}
											className="font-mono text-[11px] uppercase tracking-[0.2em] text-mut transition-colors hover:text-cy"
										>
											/{c.label}
										</button>
									</li>
								))}
							</ul>
						</div>
						<div>
							<div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cy/70">
								contact
							</div>
							<div className="mt-4 space-y-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mut">
								<a
									href={`mailto:${site.email}`}
									className="block transition-colors hover:text-cy"
								>
									{site.email}
								</a>
								<div>{site.location}</div>
								<div className="flex items-center gap-2">
									<span className="led bg-ok" />
									{site.availability}
								</div>
								<div className="flex items-center gap-2">
									<span className="led bg-cy" />
									calendar: by request
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="border-t border-line">
				<div className="mx-auto flex w-full max-w-[1500px] flex-col items-center justify-between gap-3 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.22em] text-mut sm:flex-row sm:px-10 lg:px-16 xl:px-24">
					<span>
						© {new Date().getFullYear()} {site.name}. All rights reserved.
					</span>
					<span>sheet 05/05 · filed</span>
				</div>
			</div>
		</footer>
	);
}
