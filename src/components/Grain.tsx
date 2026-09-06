export default function Grain() {
	return (
		<div
			className="pointer-events-none fixed inset-0 z-[90] overflow-hidden opacity-[0.05]"
			aria-hidden="true"
		>
			<div
				className="absolute -inset-[100%] h-[300%] w-[300%] animate-grain bg-repeat"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
				}}
			/>
			<style>
				{
					"@keyframes grainShift{0%,100%{transform:translate(0,0)}20%{transform:translate(-2%,1%)}40%{transform:translate(1%,-2%)}60%{transform:translate(-1%,-1%)}80%{transform:translate(2%,2%)}}.animate-grain{animation:grainShift 1.2s steps(4) infinite}"
				}
			</style>
		</div>
	);
}
