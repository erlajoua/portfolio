"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface IProject {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
}

const ProjectCard = ({ project, index }: { project: IProject; index: number }) => {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    return (
        <motion.div 
            className="w-full mb-8 relative group"
            initial={{ opacity: 0, x: 100, rotateY: 30 }}
            whileInView={{ 
                opacity: 1, 
                x: 0, 
                rotateY: 0,
                transition: { 
                    type: "spring",
                    stiffness: 80,
                    damping: 15,
                    delay: index * 0.2
                }
            }}
            viewport={{ once: false, amount: 0.3 }}
        >
            <motion.div 
                className="cyber-card p-8 relative overflow-hidden cursor-pointer bg-slate-800/30"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={() => setIsActive(!isActive)}
                whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
            >
                {/* Bordures animées */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                />
                <motion.div
                    className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-pink-400 to-transparent"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                />
                <motion.div
                    className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                />

                {/* Indicateur de statut */}
                <motion.div
                    className="absolute top-4 right-4 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: (index * 0.2) + 0.5 }}
                >
                    <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <span className="orbitron text-xs text-green-400 font-bold uppercase tracking-wider">
                        ACTIVE
                    </span>
                </motion.div>

                {/* Numéro de projet */}
                <motion.div
                    className="absolute top-4 left-4 orbitron text-xs text-cyan-400/50 font-mono"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index * 0.2) + 0.3 }}
                >
                    PROJECT_{String(index + 1).padStart(2, '0')}
                </motion.div>

                {/* Contenu principal */}
                <div className="pt-8 space-y-6">
                    {/* Titre du projet */}
                    <motion.h3 
                        className="orbitron text-2xl lg:text-3xl font-black text-white mb-4 relative"
                        initial={{ opacity: 0 }}
                        whileInView={{ 
                            opacity: 1,
                            transition: { delay: (index * 0.2) + 0.4 }
                        }}
                        viewport={{ once: false }}
                    >
                        {project.title}
                        
                        {/* Ligne de soulignement */}
                        <motion.div
                            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-400"
                            initial={{ width: 0 }}
                            animate={{ 
                                width: isHovered ? "100%" : "30%",
                                boxShadow: isHovered ? "0 0 15px rgba(139, 92, 246, 0.8)" : "none"
                            }}
                            transition={{ duration: 0.5 }}
                        />
                    </motion.h3>
                    
                    {/* Description */}
                    <motion.p 
                        className="text-slate-300 text-base leading-relaxed rajdhani font-light"
                        initial={{ opacity: 0 }}
                        whileInView={{ 
                            opacity: 1,
                            transition: { delay: (index * 0.2) + 0.5 }
                        }}
                        viewport={{ once: false }}
                    >
                        {project.description}
                    </motion.p>
                    
                    {/* Technologies */}
                    <motion.div 
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { delay: (index * 0.2) + 0.6 }
                        }}
                        viewport={{ once: false }}
                    >
                        {project.technologies.map((tech, techIndex) => (
                            <motion.span
                                key={techIndex}
                                className="tech-tag px-3 py-1 text-xs font-bold relative overflow-hidden cursor-pointer"
                                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                whileInView={{ 
                                    opacity: 1, 
                                    scale: 1,
                                    rotate: 0,
                                    transition: { 
                                        delay: (index * 0.2) + 0.6 + (techIndex * 0.1),
                                        type: "spring",
                                        stiffness: 100
                                    }
                                }}
                                viewport={{ once: false }}
                                whileHover={{ 
                                    scale: 1.1,
                                    boxShadow: "0 0 15px rgba(139, 92, 246, 0.8)"
                                }}
                            >
                                {/* Effet de lueur au survol */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.6 }}
                                />
                                
                                <span className="relative z-10 rajdhani font-bold uppercase tracking-wider">
                                    {tech}
                                </span>
                            </motion.span>
                        ))}
                    </motion.div>
                    
                    {/* Boutons d'action */}
                    <motion.div 
                        className="flex gap-4 pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { delay: (index * 0.2) + 0.8 }
                        }}
                        viewport={{ once: false }}
                    >
                        {project.link && (
                            <motion.a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cyber-btn px-4 py-2 text-sm font-bold relative overflow-hidden group"
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 0 20px rgba(0, 245, 255, 0.5)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 rajdhani font-bold uppercase tracking-wider">
                                    {t('projects.viewProject')} →
                                </span>
                                
                                {/* Particules d'activation */}
                                <motion.div
                                    className="absolute top-1 right-1 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        repeatDelay: 0.5
                                    }}
                                />
                            </motion.a>
                        )}
                        
                        {project.github && (
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cyber-btn px-4 py-2 text-sm font-bold relative overflow-hidden group border-purple-400 text-purple-400"
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 rajdhani font-bold uppercase tracking-wider">
                                    {t('projects.github')}
                                </span>
                                
                                {/* Icône GitHub stylisée */}
                                <motion.div
                                    className="absolute top-1 left-1 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        repeatDelay: 0.5,
                                        delay: 0.2
                                    }}
                                />
                            </motion.a>
                        )}
                    </motion.div>
                </div>

                {/* Éléments décoratifs géométriques */}
                <motion.div
                    className="absolute bottom-4 right-4 w-3 h-3 border border-cyan-400"
                    animate={{
                        rotate: isHovered ? 180 : 0,
                        scale: isHovered ? 1.2 : 1,
                        borderColor: isHovered ? "#8b5cf6" : "#00f5ff"
                    }}
                    transition={{ duration: 0.5 }}
                />
                <motion.div
                    className="absolute bottom-8 right-8 w-1 h-1 bg-purple-400"
                    animate={{
                        rotate: isHovered ? -180 : 0,
                        scale: isHovered ? 1.5 : 1,
                        backgroundColor: isHovered ? "#00f5ff" : "#8b5cf6"
                    }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                />

                {/* Scan lines décoratifs */}
                <AnimatePresence>
                    {isHovered && (
                        <>
                            <motion.div
                                className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                exit={{ scaleX: 0, opacity: 0 }}
                                transition={{ duration: 0.8 }}
                            />
                            <motion.div
                                className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                exit={{ scaleX: 0, opacity: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            />
                        </>
                    )}
                </AnimatePresence>

                {/* Particules flottantes pour les projets actifs */}
                <AnimatePresence>
                    {isHovered && (
                        <>
                            {[...Array(4)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                                    style={{
                                        left: `${15 + i * 20}%`,
                                        top: `${20 + (i % 2) * 40}%`
                                    }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ 
                                        scale: [0, 1, 0],
                                        opacity: [0, 1, 0],
                                        y: [0, -25, 0],
                                        x: [0, 10, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.3
                                    }}
                                />
                            ))}
                        </>
                    )}
                </AnimatePresence>

                {/* Code décoratif */}
                <motion.div
                    className="absolute bottom-2 left-4 orbitron text-xs text-cyan-400/30 font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {'</Project>'}
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
        <div className="relative">
            {/* Titre de section futuriste */}
            <motion.div
                className="relative mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.8 }}
            >
                <motion.h2
                    className="orbitron text-3xl lg:text-4xl font-black text-white mb-4 relative"
                    initial={{ opacity: 0, x: -50, rotateX: -90 }}
                    whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                    viewport={{ once: false, amount: 0.8 }}
                    transition={{ 
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100
                    }}
                >
                    {t('projects.title')}
                    
                    {/* Ligne décorative sous le titre */}
                    <motion.div
                        className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: "250px" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        viewport={{ once: false }}
                    />
                    
                    {/* Éléments géométriques */}
                    <motion.div
                        className="absolute -top-6 -right-12 w-6 h-6 border-2 border-purple-400"
                        initial={{ scale: 0, rotate: 0 }}
                        whileInView={{ scale: 1, rotate: 45 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        viewport={{ once: false }}
                    />
                    <motion.div
                        className="absolute -top-2 -right-4 w-2 h-2 bg-cyan-400"
                        initial={{ scale: 0, rotate: 0 }}
                        whileInView={{ scale: 1, rotate: 45 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        viewport={{ once: false }}
                    />
                    <motion.div
                        className="absolute -bottom-2 right-8 w-3 h-3 border border-pink-400"
                        initial={{ scale: 0, rotate: 0 }}
                        whileInView={{ scale: 1, rotate: 45 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                        viewport={{ once: false }}
                    />
                </motion.h2>

                {/* Statistiques des projets */}
                <motion.div
                    className="absolute -right-20 top-0 flex flex-col items-end gap-1"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                    viewport={{ once: false }}
                >
                    <span className="orbitron text-sm text-cyan-400/70 font-mono">
                        TOTAL: {String(projects.length).padStart(2, '0')}
                    </span>
                    <span className="orbitron text-xs text-purple-400/70 font-mono">
                        STATUS: ACTIVE
                    </span>
                </motion.div>
            </motion.div>
            
            {/* Grille de projets */}
            <div className="space-y-6">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>

            {/* Section de fermeture avec style terminal */}
            <motion.div
                className="mt-20 p-6 cyber-card bg-slate-900/80 border-green-400/50"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                viewport={{ once: false }}
            >
                <motion.div
                    className="flex items-center gap-4 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    viewport={{ once: false }}
                >
                    <motion.div
                        className="w-3 h-3 bg-green-400 rounded-full"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <span className="orbitron text-green-400 font-bold text-sm uppercase tracking-wider">
                        PORTFOLIO_SYSTEM_ONLINE
                    </span>
                </motion.div>

                <motion.div
                    className="flex items-center gap-2 text-xs font-mono text-green-400/70"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    viewport={{ once: false }}
                >
                    <span>{'>'}</span>
                    <motion.span
                        animate={{
                            opacity: [1, 0, 1]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        _
                    </motion.span>
                    <span className="ml-2">Interested in collaboration? Contact me.</span>
                </motion.div>

                {/* Ligne de données */}
                <motion.div
                    className="mt-4 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 2, delay: 1.6 }}
                    viewport={{ once: false }}
                />
            </motion.div>
        </div>
    );
};

export default Projects;