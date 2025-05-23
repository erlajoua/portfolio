"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const Presentation = () => {
  const { t } = useTranslation();
  
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
        staggerChildren: 0.12,
        delayChildren: 0.04 * i,
      },
    }),
  };
  
  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      x: -40,
      filter: "blur(8px)"
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring",
        damping: 16,
        stiffness: 100,
        duration: 0.8
      } 
    }
  };
  
  // Effet de mot surligné
  const highlightVariants = {
    initial: {
      backgroundSize: "0% 100%",
      backgroundPosition: "0% 100%",
    },
    animate: {
      backgroundSize: "100% 100%",
      backgroundPosition: "0% 100%",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Fonction pour animer chaque lettre du titre
  const renderAnimatedTitle = (title: string) => {
    return title.split('').map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isTitleInView ? 
          { opacity: 1, scale: 1 } : 
          { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 0.5,
          delay: 0.2 + (index * 0.05)
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };

  return (
    <div>
      <motion.h2
        ref={titleRef}
        className="text-3xl font-bold text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={isTitleInView ? 
          { opacity: 1, y: 0, x: 0 } : 
          { opacity: 0, y: -20 }
        }
        transition={{ 
          duration: 0.7,
          type: "spring",
          stiffness: 100
        }}
      >
        {renderAnimatedTitle(aboutTitle)}
      </motion.h2>
    
      <motion.div 
        ref={textContainerRef}
        className="flex flex-col gap-8 text-slate-200 text-base"
        variants={container}
        initial="hidden"
        animate={isTextInView ? "visible" : "hidden"}
      >
        {paragraphs.map((paragraph, index) => (
          <motion.p 
            key={index} 
            variants={paragraphVariants}
            dangerouslySetInnerHTML={{
              __html: paragraph.replace(
                /\{korokSeeds\}/g, 
                `<span class="text-white font-medium korok-seeds">${korokSeeds}</span>`
              )
            }}
          />
        ))}
      </motion.div>

      <style jsx>{`
        .korok-seeds {
          display: inline-block;
          cursor: pointer;
        }
        .korok-seeds:hover {
          transform: scale(1.1) rotate(-5deg);
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Presentation;