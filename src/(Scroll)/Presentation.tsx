"use client";

import { motion } from "framer-motion";

const Presentation = () => {
	const paragraphVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 }
	};

	return (
		<div>
			<motion.h2
				className="text-3xl font-bold text-white mb-8"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				About Me
			</motion.h2>
		
			<motion.div 
				className="flex flex-col gap-8 text-slate-200 text-base"
				initial="hidden"
				animate="visible"
				variants={{
					hidden: {},
					visible: {
						transition: {
							staggerChildren: 0.2
						}
					}
				}}
			>
				<motion.p variants={paragraphVariants} transition={{ duration: 0.6 }}>
					I'm a developer passionate about crafting accessible,
					pixel-perfect user interfaces that blend thoughtful design with
					robust engineering. <motion.span 
						className="text-white"
						initial={{ color: "rgb(226, 232, 240)" }}
						animate={{ color: "rgb(255, 255, 255)" }}
						transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
					>My favorite</motion.span> work lies at the intersection of
					design and development, creating experiences that not only look
					great but are meticulously built for performance and usability.
				</motion.p>
				<motion.p variants={paragraphVariants} transition={{ duration: 0.6 }}>
					Currently, I'm a Senior Front-End Engineer at Klaviyo,
					specializing in accessibility. I contribute to the creation and
					maintenance of UI components that power Klaviyo's frontend,
					ensuring our platform meets web accessibility standards and best
					practices to deliver an inclusive user experience.
				</motion.p>
				<motion.p variants={paragraphVariants} transition={{ duration: 0.6 }}>
					In the past, I've had the opportunity to develop software across
					a variety of settings — from advertising agencies and large
					corporations to start-ups and small digital product studios.
					Additionally, I also released a comprehensive video course a few
					years ago, guiding learners through building a web app with the
					Spotify API.
				</motion.p>
				<motion.p variants={paragraphVariants} transition={{ duration: 0.6 }}>
					In my spare time, I'm usually climbing, reading, hanging out
					with my wife and two cats, or running around Hyrule searching
					for Korok seeds K o r o k s e e d s .
				</motion.p>
			</motion.div>
		</div>
	);
};

export default Presentation;