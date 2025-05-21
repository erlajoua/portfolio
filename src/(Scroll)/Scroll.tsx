import { motion } from "framer-motion";
import Presentation from "./Presentation";
import Experiences from "./Experiences";
import Projects from "./Projects";

const Scroll = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
			}
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
			}
		}
	};

	return (
		<motion.div 
			className="w-1/2 max-h-screen flex flex-col overflow-y-auto py-24 pr-64"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			<motion.div variants={itemVariants}>
				<Presentation />
			</motion.div>
			<motion.div variants={itemVariants}>
				<Experiences />
			</motion.div>
			<motion.div variants={itemVariants}>
				<Projects />
			</motion.div>
		</motion.div>
	);
};

export default Scroll;