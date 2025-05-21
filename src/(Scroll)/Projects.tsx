"use client";

import { motion } from "framer-motion";

interface IProject {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
}

const projects: IProject[] = [
    {
        title: "Portfolio Website",
        description: "A personal portfolio website built with Next.js and Framer Motion to showcase my work and experience.",
        technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS"],
        link: "https://portfolio.com",
        github: "https://github.com/portfolio"
    },
    {
        title: "Music Streaming App",
        description: "A web application that allows users to search for and play music using the Spotify API.",
        technologies: ["React", "Node.js", "Express", "Spotify API"],
        link: "https://music-app.com",
        github: "https://github.com/music-app"
    },
    {
        title: "E-commerce Platform",
        description: "A full-stack e-commerce platform with user authentication, product catalog, and payment processing.",
        technologies: ["Next.js", "MongoDB", "Stripe", "Auth0"],
        link: "https://ecommerce.com",
        github: "https://github.com/ecommerce"
    }
];

const ProjectCard = ({ project, index }: { project: IProject; index: number }) => {
    return (
        <motion.div
            className="rounded-2xl p-6 mb-6 bg-slate-800/50"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
        >
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-slate-300 mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                    <motion.span
                        key={techIndex}
                        className="text-xs px-3 py-1 rounded-full bg-teal-400/10 text-teal-300"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + (techIndex * 0.1) }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(45, 212, 191, 0.2)" }}
                    >
                        {tech}
                    </motion.span>
                ))}
            </div>
            
            <div className="flex gap-4">
                {project.link && (
                    <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-300 hover:text-teal-200 text-sm"
                        whileHover={{ scale: 1.05, x: 3 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Project →
                    </motion.a>
                )}
                
                {project.github && (
                    <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-white text-sm"
                        whileHover={{ scale: 1.05, x: 3 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        GitHub
                    </motion.a>
                )}
            </div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <div>
            <motion.h2
                className="text-2xl font-bold text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5 }}
            >
                Featured Projects
            </motion.h2>
            
            <div>
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>
        </div>
    );
};

export default Projects;