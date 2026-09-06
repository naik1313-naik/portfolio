import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Magnetic from "../components/Magnetic";
import SectionHeading from "../components/SectionHeading";
import { site } from "../data/content";
import { gsap } from "../lib/animations";
import { scrollToId } from "../lib/smooth";

type Status = "idle" | "sending" | "sent" | "open";

export default function Contact() {
	const ref = useRef<HTMLElement>(null);
	const [status, setStatus] = useState<Status>("idle");
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".ct-reveal", {
				y: 30,
				opacity: 0,
				stagger: 0.08,
				duration: 0.8,
				ease: "power4.out",
				scrollTrigger: { trigger: ref.current, start: "top 72%" },
			});
		}, ref);
		return () => ctx.revert();
	}, []);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (status === "sending" || status === "sent") return;
		setStatus("sending");

		const data = Object.fromEntries(new FormData(form).entries());
		try {
			const res = await fetch(site.formAction, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(data),
			});
			if (res.ok) setStatus("sent");
			else setStatus("open");
		} catch {
			setStatus("open");
		}
	};

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(site.email);
			setCopied(true);
			setTimeout(() => setCopied(false), 2500);
		} catch {
			window.location.href = `mailto:${site.email}`;
		}
	};

	return (
		<section id="contact" ref={ref} className="relative py-28 sm:py-40 bp-bg">
			<div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-16 xl:px-24">
				<div className="ct-reveal">
					<SectionHeading
						index="05"
						eyebrow="Transmission form"
						title="Submit a request for proposal."
					/>
				</div>

				<div className="ct-reveal mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
					<div className="flex flex-col justify-center border border-line bg-ink2/70 p-7 sm:p-9">
						<span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cy">
							<span className="led bg-ok" />
							channel: {site.availability}
						</span>
						<h3 className="mt-5 font-display text-3xl font-bold uppercase leading-none tracking-tight text-soft sm:text-4xl">
							Let&apos;s build
							<br />
							at spec.
						</h3>
						<p className="mt-4 font-mono text-[12px] leading-relaxed text-mut">
							Got a brief, an idea, or an intern seat open? Transmit it below.
							Response within 24 business hours.
						</p>

						<button
							type="button"
							onClick={copyEmail}
							className="group mt-9 flex items-center justify-between border border-line px-5 py-4 font-mono text-sm tracking-[0.15em] text-soft transition-colors hover:border-cy/60"
						>
							<span>{site.email}</span>
							<span className="text-[10px] uppercase tracking-[0.2em] text-cy">
								{copied ? "copied ✓" : "copy ⧉"}
							</span>
						</button>

						<div className="mt-8 grid grid-cols-2 gap-2">
							<a
								href={`mailto:${site.email}`}
								className="border border-line px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-mut transition-colors hover:border-cy/60 hover:text-cy"
							>
								mail
							</a>
							{site.socials.linkedin && (
								<a
									href={site.socials.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="border border-line px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-mut transition-colors hover:border-cy/60 hover:text-cy"
								>
									linkedin
								</a>
							)}
						</div>
					</div>

					<div className="sheet relative p-6 sm:p-8">
						<span className="corner-tl" />
						<span className="corner-tr" />
						<span className="corner-bl" />
						<span className="corner-br" />

						<div className="flex items-center justify-between border-b border-line pb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-mut">
							<span>form 09-W · contact</span>
							<span className="flex items-center gap-1.5">
								<span
									className={`led ${status === "sent" ? "bg-ok" : status === "sending" ? "bg-or blink" : "bg-cy"}`}
								/>
								{status === "sent"
									? "transmitted"
									: status === "sending"
										? "transmitting"
										: "ready"}
							</span>
						</div>

						<form onSubmit={onSubmit} className="mt-6 space-y-4">
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<label className="block">
									<span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mut">
										name *
									</span>
									<input
										required
										name="name"
										type="text"
										className="mt-2 w-full border border-line bg-ink/40 px-3.5 py-3 font-mono text-sm text-soft outline-none transition-colors placeholder:text-mut/40 focus:border-cy"
										placeholder="Jane Doe"
									/>
								</label>
								<label className="block">
									<span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mut">
										email *
									</span>
									<input
										required
										name="email"
										type="email"
										className="mt-2 w-full border border-line bg-ink/40 px-3.5 py-3 font-mono text-sm text-soft outline-none transition-colors placeholder:text-mut/40 focus:border-cy"
										placeholder="jane@company.com"
									/>
								</label>
							</div>
							<label className="block">
								<span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mut">
									subject *
								</span>
								<input
									required
									name="subject"
									type="text"
									className="mt-2 w-full border border-line bg-ink/40 px-3.5 py-3 font-mono text-sm text-soft outline-none transition-colors placeholder:text-mut/40 focus:border-cy"
									placeholder="Internship opportunity · Project inquiry"
								/>
							</label>
							<label className="block">
								<span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mut">
									message *
								</span>
								<textarea
									required
									name="message"
									rows={5}
									className="mt-2 w-full resize-none border border-line bg-ink/40 px-3.5 py-3 font-mono text-sm text-soft outline-none transition-colors placeholder:text-mut/40 focus:border-cy"
									placeholder="Describe the brief — tools, timeline, deliverables…"
								/>
							</label>

							<div className="flex items-center justify-between pt-2">
								<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mut">
									{status === "sent"
										? "~ ack received ✓ will reply shortly"
										: "encrypted on transmit"}
								</p>
								<Magnetic>
									<button
										type="submit"
										className="border border-cy bg-cy px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-cy"
									>
										{status === "sending"
											? "Transmitting…"
											: status === "sent"
												? "Sent ✓"
												: "Transmit ▸"}
									</button>
								</Magnetic>
							</div>

							{status === "open" && (
								<p className="border border-or/50 bg-or/10 px-4 py-3 font-mono text-[11px] text-or">
									Transmit failed — open{" "}
									<button
										type="button"
										onClick={() => scrollToId("#hero")}
										className="underline"
									>
										home
									</button>
									? Email directly at {site.email} instead.
								</p>
							)}
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
