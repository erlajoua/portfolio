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
    <div className="fixed top-8 left-8 z-50">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 100 }}
      >
        {/* Bouton principal avec effet glassmorphism */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 bg-slate-800/60 backdrop-blur-xl border border-blue-500/30 
                     rounded-2xl px-4 py-3 text-white hover:border-blue-400/50 transition-all duration-300
                     shadow-lg hover:shadow-blue-500/25 hover:shadow-xl group relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Effet de lueur en arrière-plan */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
          
          <span className="text-sm font-medium relative z-10">{currentLanguage.flag}</span>
          <motion.svg
            className="w-4 h-4 text-blue-300 relative z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>

        {/* Menu déroulant */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-full left-0 mt-3 w-52 bg-slate-800/80 backdrop-blur-xl 
                         border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Bordure lumineuse en haut */}
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              
              {languages.map((language, index) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChangeClick(language)}
                  disabled={currentLanguage.code === language.code}
                  className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200
                             hover:bg-blue-500/20 disabled:cursor-not-allowed relative group ${
                               currentLanguage.code === language.code 
                                 ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-white' 
                                 : 'text-slate-300 hover:text-white'
                             }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ x: currentLanguage.code === language.code ? 0 : 8 }}
                >
                  {/* Indicateur actif */}
                  {currentLanguage.code === language.code && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-cyan-400"
                      layoutId="activeLanguage"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <span className="text-sm font-medium">{language.flag}</span>
                  <span className="text-sm font-medium">{language.name}</span>
                  
                  {/* Point lumineux pour la langue active */}
                  {currentLanguage.code === language.code && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                  )}
                  
                  {/* Effet de lueur sur hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
              
              {/* Bordure lumineuse en bas */}
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
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
              className="fixed inset-0 z-[-1]"
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LanguageSwitcher;