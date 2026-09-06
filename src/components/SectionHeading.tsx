export default function SectionHeading({
	index,
	eyebrow,
	title,
	align = "left",
}: {
	index: string;
	eyebrow: string;
	title: string;
	align?: "left" | "center";
}) {
	const center = align === "center";
	return (
		<div className={center ? "text-center" : ""}>
			<div
				className={`flex items-center gap-4 ${center ? "justify-center" : ""}`}
			>
				<span className="font-mono text-xs text-cy">FIG-{index}</span>
				<span className="h-px w-14 bg-line" />
				<span className="font-mono text-[10px] uppercase tracking-[0.32em] text-mut">
					{eyebrow}
				</span>
				<span className="hidden h-px flex-1 bg-line sm:block" />
				<span className="hidden font-mono text-[10px] text-mut sm:inline">
					SCALE 1:1
				</span>
			</div>
			<h2 className="mt-6 max-w-4xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl">
				{title}
			</h2>
		</div>
	);
}
