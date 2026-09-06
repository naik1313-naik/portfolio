import { useEffect, useRef, useState } from "react";
import { site } from "../data/content";
import { gsap } from "../lib/animations";
import { scrollToId } from "../lib/smooth";

const links = [
	{ id: "about", label: "About" },
	{ id: "projects", label: "Work" },
	{ id: "expertise", label: "Tools" },
	{ id: "journey", label: "Log" },
	{ id: "contact", label: "Contact" },
];

export default function Navbar({ ready }: { ready: boolean }) {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [active, setActive] = useState("");
	const wrap = useRef<HTMLElement>(null);
	const progress = useRef<HTMLDivElement>(null);
	const overlay = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 24);
			const max = document.documentElement.scrollHeight - window.innerHeight;
			if (progress.current) {
				progress.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
			}
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const ids = [
			"hero",
			"about",
			"projects",
			"expertise",
			"journey",
			"contact",
		];
		const obs = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) setActive(e.target.id);
				}
			},
			{ rootMargin: "-40% 0px -55% 0px" },
		);
		for (const id of ids) {
			const el = document.getElementById(id);
			if (el) obs.observe(el);
		}
		return () => obs.disconnect();
	}, []);

	useEffect(() => {
		if (!ready) return;
		gsap.fromTo(
			wrap.current,
			{ yPercent: -110 },
			{ yPercent: 0, duration: 0.8, ease: "power4.out", delay: 0.15 },
		);
	}, [ready]);

	useEffect(() => {
		if (!open) return;
		const linksEl = overlay.current?.querySelectorAll(".mm-link");
		if (!linksEl) return;
		gsap.fromTo(
			linksEl,
			{ x: -24, opacity: 0 },
			{
				x: 0,
				opacity: 1,
				duration: 0.5,
				stagger: 0.05,
				ease: "power3.out",
				delay: 0.1,
			},
		);
	}, [open]);

	const go = (id: string) => {
		setOpen(false);
		document.body.style.overflow = "";
		setTimeout(() => scrollToId(`#${id}`), open ? 250 : 0);
	};

	return (
		<>
			<div
				ref={progress}
				className="fixed inset-x-0 top-0 z-[210] h-[2px] origin-left scale-x-0 bg-cy/90"
			/>
			<header
				ref={wrap}
				className={`fixed inset-x-0 top-0 z-[200] translate-y-[-110%] transition-all duration-500 ${
					scrolled
						? "border-b border-line bg-ink/85 backdrop-blur-xl"
						: "border-b border-transparent"
				}`}
			>
				<nav className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-3.5 sm:px-10 lg:px-16 xl:px-24">
					<button
						type="button"
						onClick={() => go("hero")}
						className="group flex items-center gap-2 font-mono text-xs tracking-widest text-soft"
						aria-label="Back to top"
					>
						<span className="flex h-8 items-center gap-1 border border-line px-2.5 text-cy">
							<span className="led bg-cy" />
							SN
						</span>
						<span className="hidden sm:inline">
							SUMEET_NAIK<span className="blink text-cy">▌</span>
						</span>
					</button>

					<div className="hidden items-center gap-1 lg:flex">
						{links.map((l) => {
							const on = active === l.id;
							return (
								<button
									key={l.id}
									data-id={l.id}
									type="button"
									onClick={() => go(l.id)}
									className={`group px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
										on ? "text-cy" : "text-mut hover:text-soft"
									}`}
								>
									<span className="mr-1.5 font-normal text-cy/50">
										{on ? "▸" : "/"}
									</span>
									{l.label}
									<span
										className={`block h-px w-0 bg-cy transition-all duration-300 group-hover:w-full ${on ? "w-full" : ""}`}
									/>
								</button>
							);
						})}
					</div>

					<div className="hidden items-center gap-4 lg:flex">
						<span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mut">
							status: <span className="text-ok">ready</span>
						</span>
						<button
							type="button"
							onClick={() => go("contact")}
							className="border border-cy/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cy transition-colors hover:bg-cy hover:text-ink"
						>
							Open line
						</button>
					</div>

					<button
						type="button"
						aria-label={open ? "Close menu" : "Open menu"}
						onClick={() => {
							setOpen(!open);
							document.body.style.overflow = open ? "" : "hidden";
						}}
						className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-line lg:hidden"
					>
						<span
							className={`h-px w-5 bg-soft transition-all duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
						/>
						<span
							className={`h-px w-5 bg-soft transition-all duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
						/>
					</button>
				</nav>
			</header>

			<div
				ref={overlay}
				className={`fixed inset-0 z-[190] bp-bg transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
			>
				<nav className="relative mt-24 flex flex-col gap-2 px-7">
					{links.map((l, i) => (
						<button
							key={l.id}
							data-id={l.id}
							type="button"
							onClick={() => go(l.id)}
							className="mm-link flex items-baseline gap-4 border-b border-line py-4 text-left font-display text-3xl font-semibold tracking-tight text-soft"
						>
							<span className="font-mono text-xs text-cy">0{i + 1}/05</span>
							{l.label}
						</button>
					))}
				</nav>
				<div className="absolute bottom-0 inset-x-0 flex items-center justify-between border-t border-line px-7 py-5 font-mono text-[10px] uppercase tracking-[0.25em] text-mut">
					<span>{site.email}</span>
					<span className="flex items-center gap-2">
						<span className="led bg-ok" />
						open to work
					</span>
				</div>
			</div>
		</>
	);
}
