"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const NavText = () => {
  const { t } = useTranslation();

  // Variantes pour les animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  const nameAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
        duration: 1
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
      {/* Élément décoratif en arrière-plan */}
      <motion.div
        className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      
      <motion.div
        variants={nameAnimation}
        className="relative mb-2"
      >
        <h1 className="font-bold text-4xl lg:text-5xl mb-1 relative">
          <span className="text-gradient-blue">
            {t('nav.firstName')}
          </span>
          {" "}
          <span className="text-white">
            {t('nav.lastName')}
          </span>
          
          {/* Ligne décorative sous le nom */}
          <motion.div
            className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          />
        </h1>
      </motion.div>
      
      <motion.h3 
        className="text-lg lg:text-xl mb-4 text-blue-200 font-medium"
        variants={item}
      >
        {t('nav.job')}
      </motion.h3>
      
      <motion.div
        variants={item}
        className="relative"
      >
        <span className="text-base lg:text-lg text-slate-300 leading-relaxed block max-w-md">
          {t('nav.description')}
        </span>
        
        {/* Point lumineux décoratif */}
        <motion.div
          className="absolute -right-4 top-4 w-2 h-2 bg-cyan-400 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Effet de lueur subtile */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </motion.div>
  );
};

export default NavText;