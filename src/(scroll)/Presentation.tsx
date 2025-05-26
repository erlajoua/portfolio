"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const Presentation = () => {
  const { t } = useTranslation();
  const [hoveredParagraph, setHoveredParagraph] = useState<number | null>(null);
  
  // Références pour détecter quand les éléments sont visibles
  const titleRef = useRef(null);
  const textContainerRef = useRef(null);
  
  // Vérifier si les éléments sont dans la vue
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.5 });
  const isTextInView = useInView(textContainerRef, { once: false, amount: 0.1 });
  
  // Récupère les paragraphes depuis les traductions
  const paragraphs: string[] = (t('about.paragraphs', { returnObjects: true }) as string[]) || [];
  const aboutTitle: string = t('about.title') || 'About Me';
  const korokSeeds: string = t('about.korokSeeds') || 'Korok seeds';
  
  // Variantes pour les animations des paragraphes
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1 * i,
      },
    }),
  };
  
  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      rotateX: -90,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 1
      } 
    }
  };

  // Fonction pour animer chaque lettre du titre
  const renderAnimatedTitle = (title: string) => {
    return title.split('').map((char, index) => (
      <motion.span
        key={index}
        className="inline-block"
        initial={{ opacity: 0, y: 50, rotateX: -90 }}
        animate={isTitleInView ? 
          { opacity: 1, y: 0, rotateX: 0 } : 
          { opacity: 0, y: 50, rotateX: -90 }
        }
        transition={{
          duration: 0.8,
          delay: 0.3 + (index * 0.05),
          type: "spring",
          damping: 15
        }}
        whileHover={{
          scale: 1.1,
          color: "#00f5ff",
          textShadow: "0 0 20px #00f5ff"
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };

  return (
    <div className="relative">
      {/* Décorations futuristes */}
      <motion.div
        className="absolute -top-8 -left-4 w-16 h-16 border border-cyan-400/20"
        initial={{ rotate: 0, scale: 0 }}
        whileInView={{ rotate: 45, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        viewport={{ once: false }}
      />
      <motion.div
        className="absolute -top-4 -left-2 w-8 h-8 border border-purple-400/30"
        initial={{ rotate: 0, scale: 0 }}
        whileInView={{ rotate: -45, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.7 }}
        viewport={{ once: false }}
      />

      {/* Titre avec effet futuriste */}
      <motion.h2
        ref={titleRef}
        className="orbitron text-4xl lg:text-5xl font-black mb-12 cyber-gradient-text relative"
        initial={{ opacity: 0, y: -30 }}
        animate={isTitleInView ? 
          { opacity: 1, y: 0 } : 
          { opacity: 0, y: -30 }
        }
        transition={{ 
          duration: 1,
          type: "spring",
          stiffness: 100
        }}
      >
        {renderAnimatedTitle(aboutTitle)}
        
        {/* Ligne décorative sous le titre */}
        <motion.div
          className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={isTitleInView ? { width: "120px" } : { width: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </motion.div>

        {/* Particules autour du titre */}
        <motion.div
          className="absolute -top-2 -right-4 w-1 h-1 bg-cyan-400 rounded-full"
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 -left-6 w-0.5 h-0.5 bg-purple-400 rounded-full"
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: [0, -10, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 2.5
          }}
        />
      </motion.h2>
    
      {/* Contenu des paragraphes */}
      <motion.div 
        ref={textContainerRef}
        className="flex flex-col gap-8 text-slate-200 text-base lg:text-lg leading-relaxed relative"
        variants={container}
        initial="hidden"
        animate={isTextInView ? "visible" : "hidden"}
      >
        {paragraphs.map((paragraph, index) => (
          <motion.div
            key={index}
            className="relative group"
            variants={paragraphVariants}
            onHoverStart={() => setHoveredParagraph(index)}
            onHoverEnd={() => setHoveredParagraph(null)}
          >
            {/* Bordure interactive */}
            <motion.div
              className="absolute -left-4 top-0 w-1 bg-gradient-to-b from-cyan-400 to-purple-500"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: hoveredParagraph === index ? "100%" : "0%",
                opacity: hoveredParagraph === index ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Effet de lueur au survol */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-500/5 -mx-4 -my-2 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{
                opacity: hoveredParagraph === index ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.p 
              className="relative z-10 rajdhani font-light cursor-default"
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(
                  /\{korokSeeds\}/g, 
                  `<span class="cyber-highlight">${korokSeeds}</span>`
                )
              }}
              whileHover={{
                x: 5
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Particules pour chaque paragraphe */}
            <motion.div
              className="absolute -right-2 top-2 w-0.5 h-0.5 bg-cyan-400 rounded-full"
              animate={{
                opacity: hoveredParagraph === index ? [0, 1, 0] : 0,
                scale: hoveredParagraph === index ? [0, 1, 0] : 0,
                y: hoveredParagraph === index ? [0, -10, 0] : 0
              }}
              transition={{
                duration: 2,
                repeat: hoveredParagraph === index ? Infinity : 0
              }}
            />
          </motion.div>
        ))}

        {/* Section des compétences/stats futuristes */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: false }}
        >
          {/* Stat 1 */}
          <motion.div
            className="cyber-card p-6 text-center group"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="orbitron text-3xl font-black cyber-gradient-text mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              5+
            </motion.div>
            <div className="rajdhani text-cyan-400 font-semibold uppercase tracking-wider text-sm">
              Years Experience
            </div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            className="cyber-card p-6 text-center group"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="orbitron text-3xl font-black cyber-gradient-text mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              50+
            </motion.div>
            <div className="rajdhani text-cyan-400 font-semibold uppercase tracking-wider text-sm">
              Projects Completed
            </div>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            className="cyber-card p-6 text-center group"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="orbitron text-3xl font-black cyber-gradient-text mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              100%
            </motion.div>
            <div className="rajdhani text-cyan-400 font-semibold uppercase tracking-wider text-sm">
              Client Satisfaction
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Lignes décoratives */}
      <motion.div
        className="absolute bottom-0 right-0 w-24 h-px bg-gradient-to-l from-cyan-400 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        viewport={{ once: false }}
      />
      <motion.div
        className="absolute bottom-4 right-0 w-16 h-px bg-gradient-to-l from-purple-400 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
        viewport={{ once: false }}
      />

      <style jsx>{`
        .cyber-highlight {
          color: #00f5ff;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          display: inline-block;
          transition: all 0.3s ease;
        }
        .cyber-highlight:hover {
          transform: scale(1.1) rotate(-2deg);
          text-shadow: 0 0 10px #00f5ff;
        }
        .cyber-highlight::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, #00f5ff, #8b5cf6);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .cyber-highlight:hover::after {
          transform: scaleX(1);
        }
      `}</style>
    </div>
  );
};

export default Presentation;