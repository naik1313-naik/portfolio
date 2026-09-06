import { useEffect, useState } from "react";
import Cursor from "./components/Cursor";
import Grain from "./components/Grain";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import { marquee } from "./data/content";
import { useSmoothScroll } from "./lib/smooth";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Expertise from "./sections/Expertise";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Journey from "./sections/Journey";
import Projects from "./sections/Projects";

export default function App() {
	const [ready, setReady] = useState(false);
	useSmoothScroll(ready);

	useEffect(() => {
		document.body.style.overflow = ready ? "" : "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, [ready]);

	return (
		<div className="bg-ink font-sans text-white antialiased">
			<a
				href="#main"
				className="sr-only fixed left-4 top-4 z-[400] bg-cy px-5 py-2.5 text-sm font-bold text-ink"
			>
				Skip to content
			</a>
			{!ready && <Preloader onDone={() => setReady(true)} />}
			<Cursor />
			<Grain />
			<Navbar ready={ready} />

			<main id="main">
				<Hero ready={ready} />
				<Marquee items={marquee} />
				<About />
				<Projects />
				<Marquee items={marquee} reverse />
				<Expertise />
				<Journey />
				<Contact />
			</main>
			<Footer />
		</div>
	);
}
