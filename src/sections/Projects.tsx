import { useEffect, useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import { projects } from "../data/content";
import { gsap } from "../lib/animations";

const TYPE_META: Record<string, { code: string; o: string; n: string }> = {
	app: { code: "WEB", o: "APP", n: "web application" },
	web: { code: "WEB", o: "WEB", n: "web experience" },
	data: { code: "DATA", o: "DAT", n: "data pipeline" },
	ml: { code: "ML", o: "ML ", n: "ml prototype" },
};

function placeholderSvg(num: string, title: string) {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800">
  <rect width="1280" height="800" fill="#0b1521"/>
  <g stroke="#5ee6ff" stroke-opacity="0.1">
    <path d="M0 40h1280M0 80h1280M0 120h1280M0 160h1280M0 200h1280M0 240h1280M0 280h1280M0 320h1280M0 360h1280M0 400h1280M0 440h1280M0 480h1280M0 520h1280M0 560h1280M0 600h1280M0 640h1280M0 680h1280M0 720h1280M0 760h1280"/>
    <path d="M40 0v800M80 0v800M120 0v800M160 0v800M200 0v800M240 0v800M280 0v800M320 0v800M360 0v800M400 0v800M440 0v800M480 0v800M520 0v800M560 0v800M600 0v800M640 0v800M680 0v800M720 0v800M760 0v800M800 0v800M840 0v800M880 0v800M920 0v800M960 0v800M1000 0v800M1040 0v800M1080 0v800M1120 0v800M1160 0v800M1200 0v800M1240 0v800"/>
  </g>
  <g stroke="#5ee6ff" stroke-opacity="0.35">
    <path d="M0 100h1280M0 200h1280M0 300h1280M0 400h1280M0 500h1280M0 600h1280M0 700h1280"/>
    <path d="M100 0v800M200 0v800M300 0v800M400 0v800M500 0v800M600 0v800M700 0v800M800 0v800M900 0v800M1000 0v800M1100 0v800M1200 0v800"/>
  </g>
  <g stroke="#5ee6ff" stroke-opacity="0.5">
    <path d="M32 16h96v16h-96zM1152 16h96v16h-96zM32 768h96v16h-96zM1152 768h96v16h-96z"/>
    <path d="M0 112h1280M0 224h1280M0 336h1280M0 448h1280M0 560h1280M0 672h1280M0 784h1280"/>
    <path d="M112 0v800M224 0v800M336 0v800M448 0v800M560 0v800M672 0v800M784 0v800M896 0v800M1008 0v800M1120 0v800"/>
  </g>
  <text x="640" y="360" text-anchor="middle" fill="#eaf4ff" font-family="monospace" font-size="84" font-weight="700" letter-spacing="8">${title}</text>
  <text x="640" y="420" text-anchor="middle" fill="#5ee6ff" font-family="monospace" font-size="30" letter-spacing="12">DWG-${num}</text>
  <text x="640" y="470" text-anchor="middle" fill="#7d93b3" font-family="monospace" font-size="22" letter-spacing="6">SPEC SHEET · SCALE 1:1</text>
  <path d="M560 560 h160 M640 520 v80" stroke="#ff9e4d" stroke-opacity="0.8"/>
</svg>`;
	return encodeURIComponent(svg);
}

export default function Projects() {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".pr-reveal", {
				y: 40,
				opacity: 0,
				duration: 0.9,
				stagger: 0.08,
				ease: "power4.out",
				scrollTrigger: { trigger: ref.current, start: "top 75%" },
			});
		}, ref);
		return () => ctx.revert();
	}, []);

	return (
		<section id="projects" ref={ref} className="relative py-28 sm:py-40">
			<div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-16 xl:px-24">
				<div className="pr-reveal flex items-end justify-between gap-6">
					<SectionHeading
						index="02"
						eyebrow="Selected artifacts"
						title="Production-ready systems & experiments."
					/>
					<div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mut md:flex">
						<span className="led bg-cy" />
						render: paper
					</div>
				</div>

				<div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
					{projects.map((p, i) => {
						const meta = TYPE_META[p.type] ?? {
							code: "PROJ",
							o: "PRJ",
							n: "project",
						};
						const num = String(i + 1).padStart(2, "0");
						return (
							<article
								key={p.title}
								className="pr-reveal group relative"
								data-cursor
							>
								<div className="sheet relative overflow-hidden">
									<span className="corner-tl" />
									<span className="corner-tr" />
									<span className="corner-bl" />
									<span className="corner-br" />

									<div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-mut">
										<span>
											<span className="text-cy">dwg-{num}</span> · {meta.n}
										</span>
										<span className="flex items-center gap-1.5">
											<span
												className={`led ${meta.code === "DATA" ? "bg-or" : "bg-cy"}`}
											/>
											{meta.code}
										</span>
									</div>

									<div className="relative aspect-[16/10] overflow-hidden">
										<img
											src={p.image ?? `/img/projects/${p.type}.png`}
											alt={p.title}
											loading="lazy"
											className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
											onError={(e) => {
												const t = e.currentTarget;
												if (t.dataset.fb) return;
												t.dataset.fb = "1";
												t.src = `data:image/svg+xml;utf8,${placeholderSvg(num, p.title)}`;
											}}
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-80" />
										<div className="absolute inset-0 bp-bg opacity-20 mix-blend-screen" />

										<div className="absolute right-3 top-3 font-display text-6xl font-black leading-none text-soft/10 transition-all duration-500 group-hover:text-cy/25 group-hover:-translate-y-1">
											{num}
										</div>

										<div className="absolute bottom-0 left-0 right-0 p-5">
											<span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cy">
												{meta.code} · {p.year ?? "2026"}
											</span>
											<h3 className="mt-1.5 font-display text-2xl font-bold uppercase tracking-tight text-soft">
												{p.title}
											</h3>
											<p className="mt-1.5 font-mono text-[11px] leading-relaxed text-mut sm:max-w-[46ch]">
												{p.description}
											</p>
										</div>

										<div className="absolute inset-0 flex items-center justify-center gap-3 bg-ink/60 opacity-0 backdrop-blur-sm transition-opacity duration-400 group-hover:opacity-100">
											{p.links.map((l) => (
												<a
													key={l.label}
													href={l.url}
													target="_blank"
													rel="noopener noreferrer"
													className="border border-cy/70 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-cy transition-colors hover:bg-cy hover:text-ink"
												>
													{l.label} ↗
												</a>
											))}
										</div>
									</div>

									<div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-mut">
										<span>
											scale 1:1 ·{" "}
											<span className="flex items-center gap-2">
												<span className="led bg-or/70" /> in revision
											</span>
										</span>
										<span>{p.stack.join(" / ")}</span>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
