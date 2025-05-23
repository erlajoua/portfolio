"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface IProject {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
}

const ProjectCard = ({ project, index }: { project: IProject; index: number }) => {
    const { t } = useTranslation();

    return (
        <motion.div 
            className="w-full rounded-3xl mb-4"
            initial={{ opacity: 0, x: 100, y: 50 }}
            whileInView={{ 
                opacity: 1, 
                x: 0, 
                y: 0,
                transition: { 
                    type: "spring",
                    stiffness: 90,
                    damping: 14,
                    delay: index * 0.15
                }
            }}
            viewport={{ once: false, amount: 0.3 }}
        >
            <motion.div 
                className="flex flex-col w-full h-full p-8 rounded-3xl cursor-pointer bg-slate-800/50"
                whileHover={{ backgroundColor: "rgba(30, 41, 59, 0.8)", scale: 1.02 }}
                transition={{ duration: 0.2 }}
            >
                <motion.h3 
                    className="text-xl font-bold text-white mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ 
                        opacity: 1,
                        transition: { delay: (index * 0.15) + 0.3 }
                    }}
                    viewport={{ once: false }}
                >
                    {project.title}
                </motion.h3>
                
                <motion.p 
                    className="text-slate-300 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ 
                        opacity: 1,
                        transition: { delay: (index * 0.15) + 0.4 }
                    }}
                    viewport={{ once: false }}
                >
                    {project.description}
                </motion.p>
                
                <motion.div 
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: (index * 0.15) + 0.5 }
                    }}
                    viewport={{ once: false }}
                >
                    {project.technologies.map((tech, techIndex) => (
                        <motion.span
                            key={techIndex}
                            className="text-xs px-3 py-1 rounded-full bg-teal-400/10 text-teal-300"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ 
                                opacity: 1, 
                                x: 0,
                                transition: { delay: (index * 0.15) + 0.5 + (techIndex * 0.05) }
                            }}
                            viewport={{ once: false }}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(45, 212, 191, 0.2)" }}
                        >
                            {tech}
                        </motion.span>
                    ))}
                </motion.div>
                
                <motion.div 
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: (index * 0.15) + 0.6 }
                    }}
                    viewport={{ once: false }}
                >
                    {project.link && (
                        <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-300 hover:text-teal-200 text-sm"
                            whileHover={{ scale: 1.05, x: 3 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {t('projects.viewProject')} →
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
                            {t('projects.github')}
                        </motion.a>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    const { t } = useTranslation();

    // Récupère les projets depuis les traductions
    const projects: IProject[] = t('projects.list', { returnObjects: true }) as IProject[] || [];

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
                {t('projects.title')}
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