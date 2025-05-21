"use client";

import LinkSvg from "@/app/svgs/LinkSvg";
import { motion } from "framer-motion";

interface ILink {
	name: string;
	url: string;
}

interface IExperience {
	date: string;
	title: string;
	description: string;
	links?: ILink[];
	languages?: string[];
}

const experiences: IExperience[] = [
	{
		date: "2024 - PRESENT",
		title: "Lead Engineer . Upstatement",
		description:
			"Build, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.",
		languages: [
			"JavaScript",
			"TypeScript",
			"HTML & CSS",
			"React",
			"Next.js",
			"React Native",
			"WordPress",
			"Contentful",
			"Node.js",
			"PHP",
		],
		links: [
			{ name: "MusicKit.js", url: "https://google.com" },
			{ name: "9to5Mac", url: "https://google.com" },
		],
	},
	{
		date: "2018 - 2024",
		title: "Lead Dev Full Stack",
		description:
			"Build, style, and ship high-quality websites for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.",
		languages: [
			"JavaScript",
			"TypeScript",
			"HTML & CSS",
			"Contentful",
			"Node.js",
			"PHP",
		]
	},
];

const Link = ({ link }: { link: ILink }) => {
	const handleLink = (link: ILink) => {
		window.open(link.url, "_blank");
	};

	return (
		<motion.div
			className="rounded-full text-xs font-medium text-white w-fit px-3 py-1 flex gap-2"
			onClick={() => handleLink(link)}
			whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
			whileTap={{ scale: 0.95 }}
		>
			<LinkSvg />
			<span>{link.name}</span>
		</motion.div>
	);
};

const TagLanguage = ({ language }: { language: string }) => {
	return (
		<motion.div 
			className="rounded-full text-xs font-medium bg-teal-400/10 text-teal-300 w-fit px-3 py-1"
			whileHover={{ scale: 1.05, backgroundColor: "rgba(45, 212, 191, 0.2)" }}
		>
			<span>{language}</span>
		</motion.div>
	);
};

const ExperienceCard = ({ experience, index }: { experience: IExperience; index: number }) => {
	return (
		<motion.div 
			className="w-full rounded-3xl mb-4"
			initial={{ opacity: 0, x: -100, y: 50 }}
			whileInView={{ 
				opacity: 1, 
				x: 0, 
				y: 0,
				transition: { 
					type: "spring",
					stiffness: 100,
					damping: 12,
					delay: index * 0.15
				}
			}}
			viewport={{ once: false, amount: 0.3 }}
		>
			<motion.div 
				className="flex w-full h-full p-8 rounded-3xl cursor-pointer"
				whileHover={{ backgroundColor: "rgba(30, 41, 59, 0.5)", scale: 1.02 }}
				transition={{ duration: 0.2 }}
			>
				<div className="w-[120px] flex-shrink-0">
					<motion.span 
						className="text-slate-300 font-semibold text-xs"
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ 
							opacity: 1, 
							x: 0,
							transition: { delay: (index * 0.15) + 0.2 }
						}}
						viewport={{ once: false }}
					>
						{experience.date}
					</motion.span>
				</div>
				<div className="flex flex-col gap-2">
					<motion.span 
						className="text-base text-white font-bold hover:text-teal-300"
						initial={{ opacity: 0 }}
						whileInView={{ 
							opacity: 1,
							transition: { delay: (index * 0.15) + 0.3 }
						}}
						viewport={{ once: false }}
					>
						{experience.title}
					</motion.span>
					<motion.span 
						className="text-slate-300 text-sm"
						initial={{ opacity: 0 }}
						whileInView={{ 
							opacity: 1,
							transition: { delay: (index * 0.15) + 0.4 }
						}}
						viewport={{ once: false }}
					>
						{experience.description}
					</motion.span>
					<motion.div 
						className="flex gap-1 flex-wrap my-2"
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ 
							opacity: 1, 
							y: 0,
							transition: { delay: (index * 0.15) + 0.5 }
						}}
						viewport={{ once: false }}
					>
						{experience.links?.map((link, linkIndex) => {
							return <Link key={linkIndex} link={link} />;
						})}
					</motion.div>
					<motion.div 
						className="flex gap-1 flex-wrap"
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ 
							opacity: 1, 
							y: 0,
							transition: { delay: (index * 0.15) + 0.6 }
						}}
						viewport={{ once: false }}
					>
						{experience.languages?.map((language, langIndex) => {
							return (
								<motion.div
									key={langIndex}
									initial={{ opacity: 0, x: -10 }}
									whileInView={{ 
										opacity: 1, 
										x: 0,
										transition: { delay: (index * 0.15) + 0.6 + (langIndex * 0.05) }
									}}
									viewport={{ once: false }}
								>
									<TagLanguage language={language} />
								</motion.div>
							);
						})}
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	);
};

const Experiences = () => {
	return (
		<div>
			<motion.h2
				className="text-2xl font-bold text-white mb-8"
				initial={{ opacity: 0, x: -30 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: false, amount: 0.8 }}
				transition={{ 
					duration: 0.5,
					type: "spring",
					stiffness: 100
				}}
			>
				Where I've Worked
			</motion.h2>
			
			<div>
				{experiences.map((experience, index) => {
					return <ExperienceCard key={index} experience={experience} index={index} />;
				})}
			</div>
		</div>
	);
};

export default Experiences;