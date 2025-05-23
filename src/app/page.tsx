"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Nav from "../(nav)/Nav";
import Presentation from "../(scroll)/Presentation";
import Experiences from "../(scroll)/Experiences";
import Projects from "../(scroll)/Projects";
import { useInitTranslation } from "@/hooks/useInitTranslation";
import { Loader2 } from "lucide-react";
import LanguageSwitcher from "@/(components)/LanguageSwitcher";

export default function Home() {
	// TOUS LES HOOKS EN PREMIER (avant tout return early)
	const mainRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const initTranslation = useInitTranslation();

	// S'assurer que la page commence par About au chargement
	useEffect(() => {
		// Défiler vers le haut de la page au chargement
		window.scrollTo(0, 0);
	}, []);

	// Suivre la position du curseur
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({
				x: e.clientX,
				y: e.clientY,
			});
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	// Fonction pour un défilement fluide lorsqu'on clique sur les liens du menu
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

	// Loader pendant l'init des traductions (optionnel)
	if (!initTranslation) {
		return (
			<div className="w-full min-h-screen bg-slate-900 flex items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-blue-400" />
			</div>
		);
	}

	return (
		<motion.div
			ref={mainRef}
			className="w-full min-h-screen bg-slate-900 flex flex-col lg:flex-row relative overflow-hidden"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
		>
			<LanguageSwitcher />
			{/* Effet de halo qui suit le curseur */}
			<motion.div
				className="pointer-events-none fixed opacity-40 rounded-full blur-3xl z-0"
				animate={{
					x: mousePosition.x - 150,
					y: mousePosition.y - 150,
				}}
				transition={{
					type: "spring",
					damping: 30,
					stiffness: 400,
					mass: 0.7,
				}}
				style={{
					width: "300px",
					height: "300px",
					background:
						"radial-gradient(circle, rgba(96, 165, 250, 0.8) 0%, rgba(96, 165, 250, 0.1) 70%, transparent 100%)",
				}}
			/>

			{/* Section de navigation fixe à gauche */}
			<div className="lg:fixed lg:w-1/2 lg:h-screen z-10">
				<Nav />
			</div>

			{/* Section de contenu défilable à droite */}
			<div className="lg:w-1/2 lg:ml-auto z-10">
				<section
					id="about"
					className="py-16 px-8 lg:pl-0 lg:pr-64 relative"
				>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Presentation />
					</motion.div>
				</section>

				<section
					id="experience"
					className="min-h-screen py-16 px-8 lg:pl-0 lg:pr-64 relative"
				>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: false, amount: 0.3 }}
					>
						<Experiences />
					</motion.div>
				</section>

				<section
					id="projects"
					className="min-h-screen py-16 px-8 lg:pl-0 lg:pr-64 relative"
				>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: false, amount: 0.3 }}
					>
						<Projects />
					</motion.div>
				</section>
			</div>
		</motion.div>
	);
}
