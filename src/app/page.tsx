"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../(nav)/Nav";
import Presentation from "../(scroll)/Presentation";
import Experiences from "../(scroll)/Experiences";
import Projects from "../(scroll)/Projects";
import { useInitTranslation } from "@/hooks/useInitTranslation";
import { Loader2 } from "lucide-react";
import LanguageSwitcher from "@/(components)/LanguageSwitcher";

export default function Home() {
	const mainRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isLoading, setIsLoading] = useState(true);
	const initTranslation = useInitTranslation();

	// Effet de chargement futuriste
	useEffect(() => {
		if (initTranslation) {
			const timer = setTimeout(() => {
				setIsLoading(false);
			}, 1500); // Délai pour l'effet de chargement
			return () => clearTimeout(timer);
		}
	}, [initTranslation]);

	// S'assurer que la page commence par About au chargement
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Suivre la position du curseur pour l'effet de halo
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({
				x: e.clientX,
				y: e.clientY,
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	// Défilement fluide
	useEffect(() => {
		const smoothScroll = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const anchor = target.closest("a");

			if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
				e.preventDefault();
				const id = anchor.getAttribute("href")?.substring(1);
				const element = document.getElementById(id || "");

				if (element) {
					window.scrollTo({
						top: element.offsetTop,
						behavior: "smooth",
					});
				}
			}
		};

		document.addEventListener("click", smoothScroll);
		return () => document.removeEventListener("click", smoothScroll);
	}, []);

	// Écran de chargement futuriste
	if (isLoading || !initTranslation) {
		return (
			<div className="w-full min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
				{/* Background futuriste pour le loader */}
				<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
				
				{/* Grille animée */}
				<div className="absolute inset-0 opacity-20">
					<motion.div
						className="w-full h-full"
						style={{
							backgroundImage: `
								linear-gradient(rgba(0, 245, 255, 0.3) 1px, transparent 1px),
								linear-gradient(90deg, rgba(0, 245, 255, 0.3) 1px, transparent 1px)
							`,
							backgroundSize: "50px 50px"
						}}
						animate={{
							backgroundPosition: ["0px 0px", "50px 50px"],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "linear"
						}}
					/>
				</div>

				{/* Loader central */}
				<motion.div
					className="relative z-10 flex flex-col items-center gap-8"
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8 }}
				>
					{/* Logo/Nom futuriste */}
					<motion.h1
						className="orbitron text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
						animate={{
							backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							ease: "easeInOut"
						}}
						style={{
							backgroundSize: "200% 200%"
						}}
					>
						INITIALIZING
					</motion.h1>

					{/* Barre de progression futuriste */}
					<div className="w-80 h-1 bg-slate-700 relative overflow-hidden">
						<motion.div
							className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500"
							initial={{ width: "0%" }}
							animate={{ width: "100%" }}
							transition={{ duration: 1.5, ease: "easeInOut" }}
						/>
						<motion.div
							className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
							animate={{
								x: ["-100%", "100%"]
							}}
							transition={{
								duration: 1,
								repeat: Infinity,
								ease: "easeInOut"
							}}
						/>
					</div>

					{/* Texte de chargement */}
					<motion.p
						className="rajdhani text-cyan-400 text-lg font-semibold uppercase tracking-wider"
						animate={{
							opacity: [0.5, 1, 0.5]
						}}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: "easeInOut"
						}}
					>
						Loading Experience...
					</motion.p>

					{/* Particules flottantes */}
					{[...Array(6)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute w-1 h-1 bg-cyan-400 rounded-full"
							style={{
								left: `${20 + i * 10}%`,
								top: `${30 + (i % 2) * 40}%`
							}}
							animate={{
								y: [0, -20, 0],
								opacity: [0, 1, 0],
								scale: [0, 1, 0]
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								delay: i * 0.3,
								ease: "easeInOut"
							}}
						/>
					))}
				</motion.div>

				{/* Scan lines */}
				<motion.div
					className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
					animate={{
						y: ["0vh", "100vh"]
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "linear"
					}}
				/>
			</div>
		);
	}

	return (
		<motion.div
			ref={mainRef}
			className="w-full min-h-screen bg-slate-900 flex flex-col lg:flex-row relative overflow-hidden"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
		>
			<LanguageSwitcher />

			{/* Halo futuriste qui suit le curseur */}
			<motion.div
				className="pointer-events-none fixed opacity-30 rounded-full blur-3xl z-0"
				animate={{
					x: mousePosition.x - 200,
					y: mousePosition.y - 200,
				}}
				transition={{
					type: "spring",
					damping: 30,
					stiffness: 400,
					mass: 0.8,
				}}
				style={{
					width: "400px",
					height: "400px",
					background: "radial-gradient(circle, rgba(0, 245, 255, 0.4) 0%, rgba(139, 92, 246, 0.2) 40%, transparent 70%)",
				}}
			/>

			{/* Particules flottantes globales */}
			{[...Array(8)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
					style={{
						left: `${10 + i * 12}%`,
						top: `${20 + (i % 3) * 30}%`
					}}
					animate={{
						y: [0, -50, 0],
						x: [0, 20, 0],
						opacity: [0, 0.8, 0],
						scale: [0, 1, 0]
					}}
					transition={{
						duration: 4 + i * 0.5,
						repeat: Infinity,
						delay: i * 0.8,
						ease: "easeInOut"
					}}
				/>
			))}

			{/* Section de navigation fixe à gauche */}
			<motion.div
				className="lg:fixed lg:w-1/2 lg:h-screen z-10 relative"
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 1, delay: 0.3 }}
			>
				{/* Bordure futuriste */}
				<div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-50" />
				<div className="absolute right-0 top-1/4 w-4 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
				<div className="absolute right-0 top-1/2 w-6 h-px bg-gradient-to-r from-purple-400 to-transparent" />
				<div className="absolute right-0 top-3/4 w-4 h-px bg-gradient-to-r from-pink-400 to-transparent" />
				
				<Nav />
			</motion.div>

			{/* Section de contenu défilable à droite */}
			<div className="lg:w-1/2 lg:ml-auto z-10 relative">
				{/* Section About */}
				<section
					id="about"
					className="min-h-screen py-24 px-8 lg:pl-0 lg:pr-16 relative"
				>
					{/* Décorations de section */}
					<motion.div
						className="absolute top-8 right-8 w-8 h-8 border border-cyan-400/30"
						initial={{ rotate: 0, scale: 0 }}
						whileInView={{ rotate: 45, scale: 1 }}
						transition={{ duration: 1 }}
						viewport={{ once: false }}
					/>
					<motion.div
						className="absolute top-16 right-4 w-4 h-4 border border-purple-400/30"
						initial={{ rotate: 0, scale: 0 }}
						whileInView={{ rotate: -45, scale: 1 }}
						transition={{ duration: 1, delay: 0.2 }}
						viewport={{ once: false }}
					/>

					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: false, amount: 0.3 }}
					>
						<Presentation />
					</motion.div>
				</section>

				{/* Section Experience */}
				<section
					id="experience"
					className="min-h-screen py-24 px-8 lg:pl-0 lg:pr-16 relative"
				>
					{/* Ligne de séparation futuriste */}
					<motion.div
						className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
						initial={{ scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						transition={{ duration: 1 }}
						viewport={{ once: false }}
					/>

					<motion.div
						initial={{ opacity: 0, x: 100 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: false, amount: 0.2 }}
					>
						<Experiences />
					</motion.div>
				</section>

				{/* Section Projects */}
				<section
					id="projects"
					className="min-h-screen py-24 px-8 lg:pl-0 lg:pr-16 relative"
				>
					{/* Ligne de séparation futuriste */}
					<motion.div
						className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
						initial={{ scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						transition={{ duration: 1 }}
						viewport={{ once: false }}
					/>

					{/* Décorations de fin */}
					<motion.div
						className="absolute bottom-8 left-8 w-12 h-px bg-gradient-to-r from-cyan-400 to-transparent"
						initial={{ scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						transition={{ duration: 1, delay: 0.5 }}
						viewport={{ once: false }}
					/>
					<motion.div
						className="absolute bottom-4 left-8 w-8 h-px bg-gradient-to-r from-purple-400 to-transparent"
						initial={{ scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						transition={{ duration: 1, delay: 0.7 }}
						viewport={{ once: false }}
					/>

					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: false, amount: 0.2 }}
					>
						<Projects />
					</motion.div>
				</section>
			</div>

			{/* Scan line globale */}
			<motion.div
				className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
				animate={{
					y: ["0vh", "100vh"]
				}}
				transition={{
					duration: 4,
					repeat: Infinity,
					ease: "linear",
					repeatDelay: 2
				}}
			/>
		</motion.div>
	);
}