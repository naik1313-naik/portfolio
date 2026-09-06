import { useEffect, useState } from "react";

const BOOT = [
	"> mount /volume/sumeet-core ............ OK",
	"> load identity.bin ..................... OK",
	"> compile design_shader.glsl ........... OK",
	"> init render pipeline ................. OK",
	"> calibrate interface .................. OK",
	"> access granted — welcome, Sumeet.",
];

export default function Preloader({ onDone }: { onDone: () => void }) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (reduced) {
			onDone();
			return;
		}

		window.scrollTo(0, 0);
		document.body.style.overflow = "hidden";

		const rx = setInterval(() => {
			setCount((c) => {
				if (c >= 100) {
					clearInterval(rx);
					return 100;
				}
				return c + Math.ceil((100 - c) / 8) + 1;
			});
		}, 70);

		return () => clearInterval(rx);
	}, [onDone]);

	useEffect(() => {
		if (count < 100) return;
		const t = setTimeout(() => {
			document.body.style.overflow = "";
			onDone();
		}, 480);
		return () => clearTimeout(t);
	}, [count, onDone]);

	const bar = "█".repeat(Math.round(count / 4));

	return (
		<div
			id="preloader"
			className="bp-bg fixed inset-0 z-[300] flex items-center justify-center"
			style={{ opacity: count >= 90 ? 0 : 1, transition: "opacity 0.5s ease" }}
		>
			<div className="scanline absolute inset-0" />
			<div className="sheet relative w-[min(92vw,620px)] px-6 py-8 sm:px-10">
				<span className="corner-tl" />
				<span className="corner-tr" />
				<span className="corner-bl" />
				<span className="corner-br" />

				<div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-cy">
					<span>sys.init − sumeet_naik.portfolio</span>
					<span className="flex items-center gap-2">
						<span className="led bg-ok" />
						<span>v2.0</span>
					</span>
				</div>
				<div className="mt-3 h-px tickline" />

				<div className="mt-7 space-y-2.5 font-mono text-[11px] leading-relaxed text-mut sm:text-xs">
					{BOOT.slice(0, Math.min(6, Math.floor((count / 100) * 6))).map(
						(l) => (
							<p key={l}>{l}</p>
						),
					)}
					{count < 100 && (
						<p className="text-soft">
							{count < 30
								? "> probing 3d core ................. "
								: count < 60
									? "> spinning statue ................. "
									: "> polishing corners ............... "}
							<span className="blink text-cy">▌</span>
						</p>
					)}
				</div>

				<div className="mt-9 flex items-center gap-4">
					<div className="h-3 flex-1 overflow-hidden border border-line">
						<div
							className="h-full bg-cy/80 transition-all duration-150"
							style={{ width: `${count}%` }}
						/>
					</div>
					<span className="font-mono text-xs tracking-widest text-cy">
						{String(count).padStart(3, "0")}%
					</span>
				</div>
				<div className="mt-2 font-mono text-[10px] tracking-[0.3em] text-mut">
					{bar || "···"}
				</div>
			</div>
		</div>
	);
}
