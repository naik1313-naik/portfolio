export default function Marquee({
	items,
	reverse = false,
}: { items: string[]; reverse?: boolean }) {
	const row = [
		...items.map((item) => ({ item, k: `a-${item}` })),
		...items.map((item) => ({ item, k: `b-${item}` })),
	];
	return (
		<div
			className="relative overflow-hidden border-y border-line bg-ink2/50 py-4"
			aria-hidden="true"
		>
			<div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
			<div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
			<div
				className={`flex w-max gap-0 whitespace-nowrap ${reverse ? "animate-marquee-slow" : "animate-marquee"}`}
			>
				{row.map(({ item, k }) => (
					<span key={k} className="flex items-center">
						<span className="px-6 font-mono text-xs uppercase tracking-[0.3em] text-mut">
							<span className="text-cy">▸</span> {item}
						</span>
						<span className="h-3 w-px bg-cy/40" />
					</span>
				))}
			</div>
		</div>
	);
}
