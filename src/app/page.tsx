"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Nav from "../(Nav)/Nav";
import Presentation from "../(Scroll)/Presentation";
import Experiences from "../(Scroll)/Experiences";
import Projects from "../(Scroll)/Projects";

export default function Home() {
	// Référence au conteneur principal
	const mainRef = useRef<HTMLDivElement>(null);

	// S'assurer que la page commence par About au chargement
	useEffect(() => {
		// Défiler vers le haut de la page au chargement
		window.scrollTo(0, 0);
	}, []);

	// Fonction pour un défilement fluide lorsqu'on clique sur les liens du menu
	useEffect(() => {
		const smoothScroll = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const anchor = target.closest('a');
			
			if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
				e.preventDefault();
				const id = anchor.getAttribute('href')?.substring(1);
				const element = document.getElementById(id || '');
				
				if (element) {
					window.scrollTo({
						top: element.offsetTop,
						behavior: 'smooth'
					});
				}
			}
		};
		
		document.addEventListener('click', smoothScroll);
		return () => document.removeEventListener('click', smoothScroll);
	}, []);

	return (
		<motion.div 
			ref={mainRef}
			className="w-full min-h-screen bg-slate-900 flex flex-col lg:flex-row"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
		>
			{/* Section de navigation fixe à gauche */}
			<div className="lg:fixed lg:w-1/2 lg:h-screen">
				<Nav />
			</div>
			
			{/* Section de contenu défilable à droite */}
			<div className="lg:w-1/2 lg:ml-auto">
				<section id="about" className="min-h-screen py-24 px-8 lg:pl-0 lg:pr-64">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Presentation />
					</motion.div>
				</section>
				
				<section id="experience" className="min-h-screen py-24 px-8 lg:pl-0 lg:pr-64">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: false, amount: 0.3 }}
					>
						<Experiences />
					</motion.div>
				</section>
				
				<section id="projects" className="min-h-screen py-24 px-8 lg:pl-0 lg:pr-64">
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
};