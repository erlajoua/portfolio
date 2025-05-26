"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { handleChangeLanguage } from "@/hooks/useInitTranslation";
import { useTranslation } from "react-i18next";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "EN"},
  { code: "fr", name: "Français", flag: "FR" }
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChangeClick = async (language: Language) => {
    setIsOpen(false);
    if (language.code !== i18n.language) {
      await handleChangeLanguage(language.code);
    }
  };

  return (
    <div className="fixed top-8 right-8 z-50">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: -20, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Bouton principal futuriste */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border border-cyan-400/50 px-4 py-2 text-cyan-400 cyber-border group overflow-hidden"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(0, 245, 255, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Effet de scan au survol */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />

          {/* Particules d'angle */}
          <div className="absolute top-0 left-0 w-1 h-1 bg-cyan-400"></div>
          <div className="absolute top-0 right-0 w-1 h-1 bg-purple-400"></div>
          <div className="absolute bottom-0 left-0 w-1 h-1 bg-pink-400"></div>
          <div className="absolute bottom-0 right-0 w-1 h-1 bg-cyan-400"></div>

          {/* Contenu du bouton */}
          <motion.span 
            className="rajdhani font-bold text-sm tracking-wider uppercase relative z-10"
            animate={{
              textShadow: isOpen ? "0 0 10px #00f5ff" : "none"
            }}
          >
            {currentLanguage.flag}
          </motion.span>

          {/* Icône flèche futuriste */}
          <motion.div
            className="relative z-10"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>

          {/* Ligne de statut */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-cyan-400 to-purple-500"
            animate={{
              width: isOpen ? "100%" : "0%"
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Menu déroulant futuriste */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.9, rotateX: -90 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full right-0 mt-2 w-48 bg-slate-900/90 backdrop-blur-md border border-cyan-400/50 overflow-hidden"
              style={{ transformOrigin: "top right" }}
            >
              {/* Scan line décorative */}
              <motion.div
                className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              />

              {languages.map((language, index) => {
                const isActive = currentLanguage.code === language.code;
                
                return (
                  <motion.button
                    key={language.code}
                    onClick={() => handleLanguageChangeClick(language)}
                    disabled={isActive}
                    className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-all duration-300 relative group overflow-hidden ${
                      isActive 
                        ? 'bg-cyan-400/20 text-cyan-300 cursor-not-allowed' 
                        : 'text-white hover:text-cyan-300 hover:bg-slate-800/50'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={!isActive ? { x: 5 } : {}}
                  >
                    {/* Effet de survol */}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    )}

                    {/* Indicateur de bord */}
                    <motion.div
                      className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-500"
                      initial={{ scaleY: 0 }}
                      animate={{ 
                        scaleY: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0
                      }}
                      whileHover={{ scaleY: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Flag et nom */}
                    <span className="rajdhani font-bold text-xs tracking-wider uppercase relative z-10">
                      {language.flag}
                    </span>
                    <span className="rajdhani font-medium text-sm relative z-10">
                      {language.name}
                    </span>

                    {/* Indicateur actif */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="ml-auto relative z-10"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-2 h-2 bg-cyan-400 rounded-full relative">
                            <motion.div
                              className="absolute inset-0 bg-cyan-400 rounded-full"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Particules pour l'élément actif */}
                    <AnimatePresence>
                      {isActive && (
                        <>
                          <motion.div
                            className="absolute top-2 right-8 w-0.5 h-0.5 bg-cyan-400 rounded-full"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                              opacity: [0, 1, 0], 
                              scale: [0, 1, 0],
                              y: [0, -10, 0]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              delay: index * 0.3
                            }}
                          />
                          <motion.div
                            className="absolute bottom-2 right-12 w-px h-px bg-purple-400 rounded-full"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                              opacity: [0, 1, 0], 
                              scale: [0, 1, 0],
                              x: [0, 5, 0]
                            }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity,
                              delay: index * 0.3 + 0.5
                            }}
                          />
                        </>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}

              {/* Ligne de fermeture */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay pour fermer le menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[-1] backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Particules décoratives */}
        <motion.div
          className="absolute -top-1 -right-1 w-1 h-1 bg-cyan-400 rounded-full"
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1
          }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-purple-400 rounded-full"
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 1.5
          }}
        />
      </motion.div>
    </div>
  );
};

export default LanguageSwitcher;