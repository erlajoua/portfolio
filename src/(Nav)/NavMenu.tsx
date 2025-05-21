"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IStep {
	name: string;
	href: string;
}

const steps: IStep[] = [
	{ name: "ABOUT", href: "#about" },
	{ name: "EXPERIENCE", href: "#experience" },
	{ name: "PROJECTS", href: "#projects" },
];

const NavMenu = () => {
	const [selected, setSelected] = useState<IStep>(steps[0]);

	// Détection améliorée de la section active
	useEffect(() => {
		// S'assurer que la page commence par About et défiler vers le haut au chargement
		window.scrollTo(0, 0);
		setSelected(steps[0]);
		
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			
			const sections = steps.map(step => {
				const id = step.href.substring(1);
				const element = document.getElementById(id);
				return { step, element };
			});
			
			// Trouver la section actuellement visible
			let activeSection = sections[0].step;
			
			for (const { step, element } of sections) {
				if (element && element.offsetTop <= scrollPosition + 300) {
					activeSection = step;
				}
			}
			
			setSelected(activeSection);
		};
		
		window.addEventListener("scroll", handleScroll);
		
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleSelect = (step: IStep) => {
		setSelected(step);
	};

	return (
		<motion.div 
			className="flex flex-col gap-4"
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			{steps.map((step, index) => {
				const isSelected = selected === step;
				
				return (
					<motion.a
						onClick={() => {
							handleSelect(step);
						}}
						href={step.href}
						key={index}
						className="group flex items-center cursor-pointer hover:text-white"
						whileHover={{ x: 5 }}
						transition={{ duration: 0.2 }}
					>
						<motion.div
							className={`flex h-[2px] items-center justify-center ${
								isSelected ? "bg-white" : "bg-slate-200"
							}`}
							initial={{ width: isSelected ? 80 : 40 }}
							animate={{ 
								width: isSelected ? 80 : 40,
								backgroundColor: isSelected ? "rgb(255, 255, 255)" : "rgb(226, 232, 240)"
							}}
							whileHover={{ width: 80, backgroundColor: "rgb(255, 255, 255)" }}
							transition={{ duration: 0.3 }}
						></motion.div>
						<motion.span
							className="ml-2 text-sm"
							animate={{ 
								color: isSelected ? "rgb(255, 255, 255)" : "rgb(226, 232, 240)"
							}}
							whileHover={{ color: "rgb(255, 255, 255)" }}
							transition={{ duration: 0.3 }}
						>
							{step.name}
						</motion.span>
						

					</motion.a>
				);
			})}
		</motion.div>
	);
};

export default NavMenu;