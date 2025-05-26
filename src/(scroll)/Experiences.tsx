"use client";

import LinkSvg from "@/app/svgs/LinkSvg";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";

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

const Link = ({ link, index }: { link: ILink; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleLink = (link: ILink) => {
    window.open(link.url, "_blank");
  };

  return (
    <motion.div
      className="relative cyber-btn text-xs font-bold cursor-pointer px-3 py-2 flex items-center gap-2 overflow-hidden"
      onClick={() => handleLink(link)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 20px rgba(0, 245, 255, 0.5)"
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Effet de scan au survol */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{ 
          rotate: isHovered ? 360 : 0,
          color: isHovered ? "#ffffff" : "#00f5ff"
        }}
        transition={{ duration: 0.3 }}
      >
        <LinkSvg />
      </motion.div>
      <span className="relative z-10 rajdhani font-semibold uppercase tracking-wide">
        {link.name}
      </span>

      {/* Particules d'activation */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              className="absolute top-1 right-1 w-1 h-1 bg-cyan-400 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            />
            <motion.div
              className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-purple-400 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.1 }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TagLanguage = ({ language, index }: { language: string; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative tech-tag px-3 py-1 text-xs font-bold cursor-pointer overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 0 15px rgba(139, 92, 246, 0.6)"
      }}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        delay: index * 0.05,
        type: "spring",
        stiffness: 100
      }}
    >
      {/* Effet holographique */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: isHovered ? ["-100%", "100%"] : "-100%"
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      <span className="relative z-10 rajdhani font-bold uppercase tracking-wider">
        {language}
      </span>

      {/* Points lumineux aux coins */}
      <motion.div
        className="absolute top-0 left-0 w-1 h-1 bg-purple-400"
        animate={{
          opacity: isHovered ? [1, 0, 1] : 0,
          scale: isHovered ? [1, 1.5, 1] : 1
        }}
        transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-1 h-1 bg-cyan-400"
        animate={{
          opacity: isHovered ? [1, 0, 1] : 0,
          scale: isHovered ? [1, 1.5, 1] : 1
        }}
        transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, delay: 0.2 }}
      />
    </motion.div>
  );
};

const ExperienceCard = ({ experience, index }: { experience: IExperience; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="w-full mb-8 relative group"
      initial={{ opacity: 0, x: -100, rotateY: -30 }}
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
        className="cyber-card p-8 relative overflow-hidden cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(0, 245, 255, 0.3)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Ligne de scan */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>

        {/* Layout principal */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Section date */}
          <div className="lg:w-32 flex-shrink-0">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { delay: (index * 0.2) + 0.3 }
              }}
              viewport={{ once: false }}
            >
              <span className="orbitron text-sm text-cyan-400 font-bold uppercase tracking-wider">
                {experience.date}
              </span>
              
              {/* Ligne décorative */}
              <motion.div
                className="w-8 h-px bg-gradient-to-r from-cyan-400 to-purple-500 mt-2"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: (index * 0.2) + 0.5 }}
                viewport={{ once: false }}
              />
            </motion.div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 space-y-4">
            {/* Titre */}
            <motion.h3
              className="text-xl lg:text-2xl text-white font-bold rajdhani hover:text-cyan-300 transition-colors duration-300 relative"
              initial={{ opacity: 0 }}
              whileInView={{ 
                opacity: 1,
                transition: { delay: (index * 0.2) + 0.4 }
              }}
              viewport={{ once: false }}
            >
              {experience.title}
              
              {/* Soulignement animé */}
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
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
              {experience.description}
            </motion.p>

            {/* Liens */}
            {experience.links && experience.links.length > 0 && (
              <motion.div 
                className="flex gap-3 flex-wrap"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: (index * 0.2) + 0.6 }
                }}
                viewport={{ once: false }}
              >
                {experience.links.map((link, linkIndex) => (
                  <Link key={linkIndex} link={link} index={linkIndex} />
                ))}
              </motion.div>
            )}

            {/* Technologies */}
            {experience.languages && experience.languages.length > 0 && (
              <motion.div 
                className="flex gap-2 flex-wrap pt-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: (index * 0.2) + 0.7 }
                }}
                viewport={{ once: false }}
              >
                {experience.languages.map((language, langIndex) => (
                  <TagLanguage 
                    key={langIndex} 
                    language={language} 
                    index={langIndex}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Éléments décoratifs */}
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 bg-cyan-400"
          animate={{
            rotate: isHovered ? 180 : 0,
            scale: isHovered ? 1.5 : 1,
            boxShadow: isHovered ? "0 0 15px rgba(0, 245, 255, 0.8)" : "none"
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400"
          animate={{
            rotate: isHovered ? -180 : 0,
            scale: isHovered ? 1.5 : 1,
            boxShadow: isHovered ? "0 0 10px rgba(139, 92, 246, 0.8)" : "none"
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />

        {/* Particules flottantes pour la carte active */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${20 + i * 20}%`
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [0, -20, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const Experiences = () => {
  const { t } = useTranslation();

  // Récupère les expériences depuis les traductions
  const experiences: IExperience[] = t('experiences.list', { returnObjects: true }) as IExperience[] || [];

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
          {t('experiences.title')}
          
          {/* Ligne décorative sous le titre */}
          <motion.div
            className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500"
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            transition={{ duration: 1.2, delay: 0.5 }}
            viewport={{ once: false }}
          />
          
          {/* Éléments géométriques */}
          <motion.div
            className="absolute -top-4 -right-8 w-4 h-4 border-2 border-cyan-400"
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: 45 }}
            transition={{ duration: 0.5, delay: 1 }}
            viewport={{ once: false }}
          />
          <motion.div
            className="absolute -bottom-2 right-0 w-2 h-2 bg-purple-400"
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: 45 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            viewport={{ once: false }}
          />
        </motion.h2>

        {/* Compteur d'expériences */}
        <motion.div
          className="absolute -right-16 top-0 orbitron text-sm text-cyan-400/70 font-mono"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          viewport={{ once: false }}
        >
          [{String(experiences.length).padStart(2, '0')}]
        </motion.div>
      </motion.div>
      
      {/* Liste des expériences */}
      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} index={index} />
        ))}
      </div>

      {/* Ligne de fermeture */}
      <motion.div
        className="mt-16 flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        viewport={{ once: false }}
      >
        <motion.div
          className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          viewport={{ once: false }}
        />
        <motion.span
          className="orbitron text-xs text-cyan-400/70 font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2 }}
          viewport={{ once: false }}
        >
          END_OF_EXPERIENCE_LOG
        </motion.span>
        <motion.div
          className="w-2 h-2 bg-cyan-400"
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: 45 }}
          transition={{ delay: 2.2 }}
          viewport={{ once: false }}
        />
      </motion.div>
    </div>
  );
};

export default Experiences;