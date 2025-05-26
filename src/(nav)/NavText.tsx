"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const NavText = () => {
  const { t } = useTranslation();
  const [glitchActive, setGlitchActive] = useState(false);

  // Effet de glitch sur le nom
  const triggerGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 1000);
  };

  // Déclencher l'effet glitch au chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerGlitch();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Variantes pour les animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -50, rotateX: -90 },
    show: { 
      opacity: 1, 
      x: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  const nameVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 50
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col text-white relative"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Ligne de scan décorative */}
      <div className="scan-line"></div>
      
      {/* Nom avec effet futuriste */}
      <motion.h1 
        className="orbitron font-black text-5xl lg:text-6xl mb-2 cyber-gradient-text cyber-glow uppercase tracking-wider cursor-pointer"
        variants={nameVariants}
        onClick={triggerGlitch}
        onHoverStart={triggerGlitch}
        style={{
          perspective: "1000px",
        }}
        animate={glitchActive ? {
          x: [0, -2, 2, -1, 1, 0],
          textShadow: [
            "0 0 5px #00f5ff",
            "2px 0 0 #ff006e, -2px 0 0 #00f5ff",
            "0 0 5px #8b5cf6",
            "0 0 20px #00f5ff"
          ]
        } : {}}
        transition={{ duration: 0.5 }}
      >
        {t('nav.firstName')}<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('nav.lastName')}
        </span>
      </motion.h1>
      
      {/* Titre de poste */}
      <motion.h3 
        className="rajdhani text-xl lg:text-2xl mb-4 font-semibold tracking-widest uppercase"
        variants={item}
        style={{
          color: "var(--cyber-blue)",
          textShadow: "0 0 10px var(--cyber-blue)"
        }}
      >
        <span className="inline-block">{'>'}</span> {t('nav.job')}
      </motion.h3>
      
      {/* Description avec effet de typing */}
      <motion.div
        className="rajdhani text-lg text-slate-300 w-4/5 leading-relaxed font-light"
        variants={item}
      >
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, delay: 1.5 }}
          className="inline-block overflow-hidden whitespace-nowrap"
        >
          {t('nav.description')}
        </motion.span>
        <motion.span
          className="inline-block w-2 h-6 bg-cyan-400 ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>

      {/* Particules décoratives */}
      <div className="absolute -top-4 -right-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 -left-2 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-4 right-8 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>

      {/* Lignes décoratives */}
      <motion.div
        className="absolute left-0 bottom-0 h-px bg-gradient-to-r from-cyan-400 via-purple-500 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: "60%" }}
        transition={{ duration: 1.5, delay: 2 }}
      />
      
      <motion.div
        className="absolute -left-4 top-1/2 w-px h-16 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
        initial={{ height: 0 }}
        animate={{ height: "4rem" }}
        transition={{ duration: 1, delay: 2.5 }}
      />
    </motion.div>
  );
};

export default NavText;