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
import MagicCursor from '@/(components)/MagicCursor';

// Composant pour les particules flottantes avec effet magique
const FloatingParticles = () => {
	return (
		<div className="floating-particles">
			{[...Array(30)].map((_, i) => (
				<motion.div
					key={i}
					className="particle"
					initial={{
						x: Math.random() * window.innerWidth,
						y: Math.random() * window.innerHeight,
						opacity: 0,
					}}
					animate={{
						x: Math.random() * window.innerWidth,
						y: Math.random() * window.innerHeight,
						opacity: [0, 0.8, 0],
					}}
					transition={{
						duration: Math.random() * 15 + 10,
						repeat: Infinity,
						ease: "linear",
						delay: Math.random() * 10,
					}}
					style={{
						background: i % 3 === 0 
							? 'linear-gradient(45deg, #60a5fa, #22d3ee)' 
							: i % 3 === 1 
							? '#a855f7' 
							: '#f59e0b',
						borderRadius: '50%',
						width: Math.random() * 3 + 1 + 'px',
						height: Math.random() * 3 + 1 + 'px',
						boxShadow: '0 0 10px currentColor',
					}}
				/>
			))}
		</div>
	);
};

// Composant constellation interactive
const InteractiveConstellation = () => {
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePos({ x: e.clientX, y: e.clientY });
		};
		
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<div className="fixed inset-0 pointer-events-none z-0">
			{[...Array(8)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute w-1 h-1 bg-blue-400 rounded-full"
					initial={{
						x: Math.random() * window.innerWidth,
						y: Math.random() * window.innerHeight,
					}}
					animate={{
						x: mousePos.x + Math.sin(Date.now() * 0.001 + i) * 100,
						y: mousePos.y + Math.cos(Date.now() * 0.001 + i) * 100,
					}}
					transition={{
						type: "spring",
						damping: 20,
						stiffness: 50,
					}}
					style={{
						opacity: 0.6,
						boxShadow: '0 0 15px #60a5fa',
					}}
				/>
			))}
		</div>
	);
};

// Effet de pluie d'étoiles
const StarRain = () => {
	return (
		<div className="fixed inset-0 pointer-events-none z-0">
			{[...Array(15)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute text-yellow-300"
					initial={{
						x: Math.random() * window.innerWidth,
						y: -20,
						opacity: 0,
						rotate: 0,
					}}
					animate={{
						y: window.innerHeight + 50,
						opacity: [0, 1, 0],
						rotate: 360,
					}}
					transition={{
						duration: Math.random() * 3 + 2,
						repeat: Infinity,
						delay: Math.random() * 5,
						ease: "linear",
					}}
					style={{
						fontSize: Math.random() * 8 + 4 + 'px',
					}}
				>
					✨
				</motion.div>
			))}
		</div>
	);
};

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
			<div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					className="flex flex-col items-center gap-4"
				>
					<div className="relative">
						<Loader2 className="h-8 w-8 animate-spin text-blue-400" />
						<div className="absolute inset-0 h-8 w-8 rounded-full border-2 border-blue-400/20 animate-ping"></div>
					</div>
					<p className="text-blue-200 text-sm">Chargement...</p>
				</motion.div>
			</div>
		);
	}

	return (
		<motion.div
			ref={mainRef}
			className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col lg:flex-row relative overflow-hidden"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
		>
			<MagicCursor />
			<LanguageSwitcher />
			<FloatingParticles />
			<InteractiveConstellation />
			<StarRain />
			
			{/* Effet de halo moderne qui suit le curseur avec couleurs magiques */}
			<motion.div
				className="pointer-events-none fixed opacity-25 rounded-full blur-3xl z-0"
				animate={{
					x: mousePosition.x - 200,
					y: mousePosition.y - 200,
				}}
				transition={{
					type: "spring",
					damping: 40,
					stiffness: 200,
					mass: 0.8,
				}}
				style={{
					width: "400px",
					height: "400px",
					background: `conic-gradient(from ${Date.now() * 0.1}deg, 
						rgba(59, 130, 246, 0.4) 0deg, 
						rgba(167, 139, 250, 0.4) 120deg, 
						rgba(236, 72, 153, 0.4) 240deg, 
						rgba(59, 130, 246, 0.4) 360deg)`,
				}}
			/>

			{/* Section de navigation fixe à gauche avec effet glassmorphism */}
			<motion.div 
				className="lg:fixed lg:w-1/2 lg:h-screen z-10"
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<div className="h-full glass-effect border-r border-blue-500/20">
					<Nav />
				</div>
			</motion.div>

			{/* Section de contenu défilable à droite */}
			<div className="lg:w-1/2 lg:ml-auto z-10 relative">
				{/* Séparateur vertical lumineux */}
				<div className="hidden lg:block absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
				
				<section
					id="about"
					className="py-20 px-8 lg:pl-16 lg:pr-16 relative"
				>
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						className="relative"
					>
						{/* Élément décoratif */}
						<div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"></div>
						<Presentation />
					</motion.div>
				</section>

				<section
					id="experience"
					className="min-h-screen py-20 px-8 lg:pl-16 lg:pr-16 relative"
				>
					{/* Ligne de connexion entre les sections */}
					<div className="absolute left-8 top-0 w-px h-20 bg-gradient-to-b from-blue-500/50 to-transparent lg:left-16"></div>
					
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: false, amount: 0.2 }}
						className="relative"
					>
						{/* Élément décoratif */}
						<div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-bl from-cyan-500/15 to-blue-500/15 rounded-full blur-2xl"></div>
						<Experiences />
					</motion.div>
				</section>

				<section
					id="projects"
					className="min-h-screen py-20 px-8 lg:pl-16 lg:pr-16 relative"
				>
					{/* Ligne de connexion entre les sections */}
					<div className="absolute left-8 top-0 w-px h-20 bg-gradient-to-b from-blue-500/50 to-transparent lg:left-16"></div>
					
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: false, amount: 0.2 }}
						className="relative"
					>
						{/* Élément décoratif */}
						<div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-blue-600/10 to-cyan-400/10 rounded-full blur-3xl"></div>
						<Projects />
					</motion.div>
				</section>
			</div>
		</motion.div>
	);
}