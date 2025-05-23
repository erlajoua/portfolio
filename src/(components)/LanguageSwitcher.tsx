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

  // Trouve la langue actuelle basée sur i18n.language
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Bouton principal */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-slate-800/70 backdrop-blur-md border border-slate-600/50 
                     rounded-full px-3 py-2 text-white hover:bg-slate-700/70 transition-all duration-200
                     shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm">{currentLanguage.flag}</span>
          <motion.svg
            className="w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>

        {/* Menu déroulant */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-48 bg-slate-800/90 backdrop-blur-md 
                         border border-slate-600/50 rounded-2xl shadow-xl overflow-hidden"
            >
              {languages.map((language, index) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChangeClick(language)}
                  disabled={currentLanguage.code === language.code}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200
                             hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed ${
                               currentLanguage.code === language.code 
                                 ? 'bg-teal-500/20 text-teal-300' 
                                 : 'text-white hover:text-teal-300'
                             }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: currentLanguage.code === language.code ? 0 : 5 }}
                >
                  <span className="text-xs">{language.flag}</span>
                  <span className="text-xs font-medium">{language.name}</span>
                  {currentLanguage.code === language.code && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-teal-400 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
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