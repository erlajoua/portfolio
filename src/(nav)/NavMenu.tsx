"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface IStep {
  name: string;
  href: string;
}

const NavMenu = () => {
  const { t } = useTranslation();
  
  // Récupère les steps depuis les traductions
  const steps: IStep[] = (t('nav.menu', { returnObjects: true }) as IStep[]) || [
    { name: "ABOUT", href: "#about" },
    { name: "EXPERIENCE", href: "#experience" }, 
    { name: "PROJECTS", href: "#projects" }
  ];
  
  const [selected, setSelected] = useState<IStep | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Détection améliorée de la section active
  useEffect(() => {
    if (steps.length === 0) return;
    
    window.scrollTo(0, 0);
    setSelected(steps[0]);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      const sections = steps.map(step => {
        const id = step.href.substring(1);
        const element = document.getElementById(id);
        return { step, element };
      });
      
      let activeSection = sections[0].step;
      
      for (const { step, element } of sections) {
        if (element && element.offsetTop <= scrollPosition + 300) {
          activeSection = step;
        }
      }
      
      setSelected(activeSection);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [steps.length]);

  const handleSelect = (step: IStep) => {
    setSelected(step);
  };

  return (
    <motion.div 
      className="flex flex-col gap-6 relative"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {/* Ligne verticale décorative */}
      <motion.div
        className="absolute -left-8 top-0 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.5, delay: 1 }}
      />

      {steps.map((step, index) => {
        const isSelected = selected?.href === step.href;
        const isHovered = hoveredIndex === index;
        
        return (
          <motion.div
            key={index}
            className="relative"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <motion.a
              onClick={() => handleSelect(step)}
              href={step.href}
              className={`group flex items-center cursor-pointer relative z-10 ${
                isSelected ? 'text-white' : 'text-slate-400'
              }`}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Barre de navigation futuriste */}
              <motion.div
                className="relative flex items-center"
                initial={false}
                animate={{
                  scale: isSelected || isHovered ? 1.1 : 1,
                }}
              >
                {/* Barre principale */}
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 relative overflow-hidden"
                  initial={{ width: 30 }}
                  animate={{ 
                    width: isSelected ? 80 : isHovered ? 60 : 30,
                    background: isSelected 
                      ? "linear-gradient(90deg, #00f5ff, #8b5cf6, #ff006e)"
                      : isHovered
                      ? "linear-gradient(90deg, #00f5ff, #8b5cf6)"
                      : "linear-gradient(90deg, #00f5ff, #64748b)"
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Effet de scan */}
                  <AnimatePresence>
                    {(isSelected || isHovered) && (
                      <motion.div
                        className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Points décoratifs */}
                <motion.div
                  className="w-2 h-2 bg-cyan-400 ml-2 rounded-full"
                  animate={{
                    scale: isSelected ? [1, 1.5, 1] : 1,
                    backgroundColor: isSelected ? "#00f5ff" : isHovered ? "#8b5cf6" : "#64748b"
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Texte du menu */}
              <motion.span
                className="ml-4 rajdhani font-bold text-sm tracking-[0.2em] uppercase relative"
                animate={{ 
                  color: isSelected ? "#ffffff" : isHovered ? "#00f5ff" : "#94a3b8",
                  textShadow: isSelected ? "0 0 10px #00f5ff" : "none"
                }}
                transition={{ duration: 0.3 }}
              >
                {step.name}
                
                {/* Underline effet */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-cyan-400 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: isSelected ? "100%" : isHovered ? "100%" : "0%",
                    opacity: isSelected || isHovered ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            </motion.a>

            {/* Effet de lueur au survol */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 -z-10 blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>

            {/* Particules décoratives pour l'élément actif */}
            <AnimatePresence>
              {isSelected && (
                <>
                  <motion.div
                    className="absolute -right-4 top-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0, 1, 0],
                      x: [0, 20, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: 0
                    }}
                  />
                  <motion.div
                    className="absolute -right-2 top-1/4 w-0.5 h-0.5 bg-purple-400 rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0, 1, 0],
                      x: [0, 15, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: 0.5
                    }}
                  />
                </>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Indicateur numérique */}
      <motion.div
        className="absolute -right-16 top-0 orbitron text-xs text-cyan-400 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {String(steps.findIndex(step => step.href === selected?.href) + 1).padStart(2, '0')}/
        {String(steps.length).padStart(2, '0')}
      </motion.div>
    </motion.div>
  );
};

export default NavMenu;