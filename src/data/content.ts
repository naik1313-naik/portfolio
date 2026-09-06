export interface Project {
	id: string;
	title: string;
	category: string;
	year: string;
	type: "web" | "app" | "data" | "ml";
	description: string;
	stack: string[];
	feature: string;
	image?: string;
	links: { label: string; url: string }[];
	metric: { value: number; suffix: string; label: string };
}

export interface Skill {
	id: string;
	label: string;
	level: number;
	blurb: string;
}

export interface TimelineItem {
	period: string;
	type: string;
	role: string;
	org: string;
	body: string;
	tags: string[];
}

export const site = {
	name: "Sumeet Naik",
	firstName: "Sumeet",
	role: "Engineering Student · B.Tech in IoT",
	tagline:
		"Building at the crossroads of software development, data analysis and artificial intelligence.",
	location: "Bengaluru, India · Open to internships",
	availability: "Open to internships & collaborations",
	email: "sumeetnaik2005@gmail.com",
	formAction: "https://formsubmit.co/ajax/sumeetnaik2005@gmail.com",
	socials: {
		github: "https://github.com/naik1313-naik",
		linkedin: "https://www.linkedin.com/in/sumeet-naik-engeneering-student",
		x: "https://x.com",
		dribbble: "https://dribbble.com",
	},
};

export const stats = [
	{ value: 20, suffix: "+", label: "Projects on GitHub" },
	{ value: 10, suffix: "+", label: "Hackathons & jams" },
	{ value: 5, suffix: "+", label: "Tech stacks shipped" },
	{ value: 100, suffix: "%", label: "Open to internships" },
];

export const about = {
	paragraphs: [
		"I'm an engineering student at Presidency University, Bengaluru, specializing in the Internet of Things — with a deep interest at the crossroads of software development, data analysis and artificial intelligence.",
		"I love understanding how complex systems work and turning ideas into functional, innovative solutions — smart IoT prototypes, full-stack web apps, machine-learning projects. I explore in public, and learn fastest by shipping.",
	],
	focus: [
		"Internet of Things",
		"AI & Machine Learning",
		"Full-Stack Web",
		"Data Analysis",
	],
};

export const marquee = [
	"Internet of Things",
	"React 19",
	"AI / ML",
	"TypeScript",
	"GSAP",
	"GLSL Shaders",
	"Node.js",
	"Python",
	"Tailwind v4",
	"Data Analysis",
	"Full-Stack",
	"WebGL",
];

export const projects: Project[] = [
	{
		id: "energyai",
		title: "EnergyAI Forecast",
		category: "AI / Machine Learning",
		year: "2025",
		type: "ml",
		description:
			"Flask + scikit-learn system that trains a Random Forest on household consumption, predicts future energy use and visualizes savings.",
		stack: ["Python", "Flask", "Scikit-learn", "Random Forest"],
		feature: "ML forecasting engine",
		links: [
			{
				label: "Code",
				url: "https://github.com/naik1313-naik/ai-energy-prediction",
			},
		],
		metric: { value: 94, suffix: "%", label: "forecast accuracy" },
	},
	{
		id: "gvplumbing",
		title: "GV Enterprises",
		category: "Business Website",
		year: "2025",
		type: "web",
		description:
			"Premium Next.js showroom for a plumbing & sanitary store — glassmorphic UI, cinematic slideshow, Framer Motion micro-animations.",
		stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
		feature: "Cinematic glassmorphism",
		image: "/img/projects/gvplumbing.jpg",
		links: [
			{ label: "Live", url: "https://gvplumbing-eta.vercel.app" },
			{ label: "Code", url: "https://github.com/naik1313-naik/gvplumbing" },
		],
		metric: { value: 100, suffix: "", label: "Lighthouse performance" },
	},
	{
		id: "sentinelai",
		title: "SentinelAI",
		category: "AI · Smart City",
		year: "2025",
		type: "web",
		description:
			"Smart-city safety platform concept — AI-driven city monitoring with live surveillance views and analytics.",
		stack: ["HTML5", "CSS3", "JavaScript", "AI UI"],
		feature: "Smart-city dashboard",
		image: "/img/projects/sentinelai.jpg",
		links: [
			{ label: "Live", url: "https://urbanwatch-ai.vercel.app" },
			{ label: "Code", url: "https://github.com/naik1313-naik/urbanwatch-ai" },
		],
		metric: { value: 12, suffix: "×", label: "feeds, one dashboard" },
	},
	{
		id: "smartspend",
		title: "SmartSpend",
		category: "Fintech App",
		year: "2025",
		type: "app",
		description:
			"Full-stack expense & budget tracker — React + Recharts dashboard, JWT auth and real-time sync over WebSockets backed by SQL.",
		stack: ["React", "Node.js", "WebSocket", "SQL"],
		feature: "Real-time finance dashboard",
		links: [{ label: "Code", url: "https://github.com/naik1313-naik/ttt" }],
		metric: { value: 1.2, suffix: "k", label: "transactions tracked / mo" },
	},
	{
		id: "collegems",
		title: "College Management",
		category: "Full-Stack System",
		year: "2024",
		type: "data",
		description:
			"JWT role-based system for Admin, Teacher & Student — courses, attendance and fee payments via Razorpay on Express + PostgreSQL.",
		stack: ["Node.js", "Express", "PostgreSQL", "React"],
		feature: "RBAC · Razorpay payments",
		links: [
			{
				label: "Code",
				url: "https://github.com/naik1313-naik/college-management-system",
			},
		],
		metric: { value: 3, suffix: "", label: "roles · one codebase" },
	},
	{
		id: "nexamart",
		title: "NexaMart",
		category: "E-commerce",
		year: "2024",
		type: "web",
		description:
			"Polished multi-page storefront with product catalog, cart flows, authentication pages and responsive commerce layouts.",
		stack: ["HTML5", "CSS3", "JavaScript", "Responsive UX"],
		feature: "Multi-page storefront",
		image: "/img/projects/nexamart.jpg",
		links: [
			{ label: "Live", url: "https://ecommerce-website-rust-eight.vercel.app" },
			{
				label: "Code",
				url: "https://github.com/naik1313-naik/ecommerce-website",
			},
		],
		metric: { value: 6, suffix: "+", label: "pages, one cohesive system" },
	},
];

export const skills: Skill[] = [
	{
		id: "frontend",
		label: "Frontend Development",
		level: 88,
		blurb: "React, Tailwind and performant, responsive interfaces.",
	},
	{
		id: "ai",
		label: "AI & Machine Learning",
		level: 82,
		blurb:
			"Scikit-learn pipelines and prediction models that turn data into decisions.",
	},
	{
		id: "iot",
		label: "IoT & Embedded Systems",
		level: 84,
		blurb:
			"Smart prototypes, sensor data, connected systems — my B.Tech specialization.",
	},
	{
		id: "fullstack",
		label: "Full-Stack Development",
		level: 86,
		blurb:
			"Node.js, Express and databases — end-to-end apps that run in production.",
	},
	{
		id: "data",
		label: "Data Analysis",
		level: 76,
		blurb:
			"Exploration and insight from raw datasets with Python and visualization.",
	},
	{
		id: "ux",
		label: "UI / UX Design",
		level: 74,
		blurb: "Figma-driven layouts that pair clean structure with usability.",
	},
];

export const services = [
	{
		id: "web",
		index: "01",
		title: "Web & App Development",
		description: "Full-stack web apps — React to Node.js and databases.",
		icon: "⌗",
	},
	{
		id: "ai",
		index: "02",
		title: "AI & Data Projects",
		description:
			"ML models and prediction systems that solve practical problems.",
		icon: "◧",
	},
	{
		id: "iot",
		index: "03",
		title: "IoT & Smart Systems",
		description: "Embedded prototypes and connected devices, brought online.",
		icon: "≋",
	},
];

export const timeline: TimelineItem[] = [
	{
		period: "2024 — Present",
		type: "Education",
		role: "B.Tech · Computer Science (IoT)",
		org: "Presidency University, Bengaluru",
		body: "Coursework spanning IoT, machine learning, programming and embedded systems — a strong theoretical and practical foundation in transformative technologies.",
		tags: ["IoT", "AI & ML", "Embedded", "Programming"],
	},
	{
		period: "2024 — Present",
		type: "Experience",
		role: "Independent Developer",
		org: "Personal Projects · Open Source",
		body: "Shipping end-to-end projects — from AI prediction systems to full-stack apps with auth and payments. Learning in public, one build at a time.",
		tags: ["Python", "Full-Stack", "Machine Learning"],
	},
	{
		period: "Ongoing",
		type: "Communities",
		role: "Hackathons & Tech Communities",
		org: "Coding Competitions · Workshops",
		body: "Actively participating in hackathons, coding competitions, workshops and developer communities.",
		tags: ["Hackathons", "Collaboration", "Learning"],
	},
	{
		period: "Prior — 2024",
		type: "Education",
		role: "Pre-University & Schooling",
		org: "Alva's College of Education · DAV Schools",
		body: "A science-and-mathematics foundation that shaped my path into engineering.",
		tags: ["Science", "Mathematics"],
	},
];
