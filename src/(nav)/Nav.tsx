"use client";

import { motion } from "framer-motion";
import NavText from "./NavText";
import NavMenu from "./NavMenu";
import NavSocials from "./NavSocials";
import { useState, useEffect } from "react";

const Nav = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [systemStatus, setSystemStatus] = useState("ONLINE");

  // Horloge système futuriste
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animation du conteneur principal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      className="h-full py-24 px-8 lg:pl-16 lg:pr-8 flex flex-col justify-between relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grille décorative */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px"
          }}
          animate={{
            backgroundPosition: ["0px 0px", "20px 20px"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Particules flottantes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Header système */}
      <motion.div
        className="absolute top-4 left-8 right-8"
        variants={sectionVariants}
      >
        <div className="flex justify-between items-center text-xs orbitron text-cyan-400/60 font-mono">
          <div className="flex items-center gap-4">
            <motion.div
              className="flex items-center gap-2"
              animate={{
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>SYS_STATUS: {systemStatus}</span>
            </motion.div>
            <div>VER: 2.1.4</div>
          </div>
          <motion.div
            className="font-mono"
            key={currentTime}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {currentTime}
          </motion.div>
        </div>
        
        {/* Ligne de séparation */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-cyan-400/20 via-cyan-400/60 to-cyan-400/20 mt-2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </motion.div>

      {/* Section principale */}
      <motion.div 
        className="flex flex-col gap-16 relative z-10"
        variants={sectionVariants}
      >
        {/* Texte principal */}
        <motion.div
          className="relative"
          variants={sectionVariants}
        >
          {/* Décoration de code */}
          <motion.div
            className="absolute -top-8 -left-4 orbitron text-xs text-cyan-400/40 font-mono"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
          >
            {'<Header>'}
          </motion.div>
          
          <NavText />
          
          <motion.div
            className="absolute -bottom-4 -left-4 orbitron text-xs text-cyan-400/40 font-mono"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
          >
            {'</Header>'}
          </motion.div>
        </motion.div>

        {/* Menu de navigation */}
        <motion.div
          className="relative"
          variants={sectionVariants}
        >
          {/* Décoration de code */}
          <motion.div
            className="absolute -top-6 -left-4 orbitron text-xs text-purple-400/40 font-mono"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.5 }}
          >
            {'<Navigation>'}
          </motion.div>

          <NavMenu />

          <motion.div
            className="absolute -bottom-4 -left-4 orbitron text-xs text-purple-400/40 font-mono"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3 }}
          >
            {'</Navigation>'}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Section footer */}
      <motion.div
        className="relative z-10"
        variants={sectionVariants}
      >
        {/* Décoration de code */}
        <motion.div
          className="absolute -top-6 -left-4 orbitron text-xs text-pink-400/40 font-mono"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.5 }}
        >
          {'<Socials>'}
        </motion.div>

        <NavSocials />

        <motion.div
          className="absolute -bottom-4 -left-4 orbitron text-xs text-pink-400/40 font-mono"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 4 }}
        >
          {'</Socials>'}
        </motion.div>

        {/* Informations système en bas */}
        <motion.div
          className="mt-8 pt-4 border-t border-cyan-400/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5 }}
        >
          <div className="flex flex-col gap-2 text-xs orbitron text-cyan-400/50 font-mono">
            <div className="flex justify-between">
              <span>MEMORY: 85.4% USED</span>
              <span>CPU: 23.7%</span>
            </div>
            <div className="flex justify-between">
              <span>UPTIME: 2847h</span>
              <span>PING: 12ms</span>
            </div>
            
            {/* Barre de progression décorative */}
            <motion.div
              className="w-full h-1 bg-slate-700 rounded mt-2 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: "85.4%" }}
                transition={{ duration: 2, delay: 5.2 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scan line décorative */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
        animate={{
          y: ["0%", "100%"]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 3
        }}
      />

      {/* Éléments décoratifs fixes */}
      <motion.div
        className="absolute top-1/3 -right-4 w-8 h-px bg-gradient-to-l from-cyan-400 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 -right-4 w-12 h-px bg-gradient-to-l from-purple-400 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      />
      <motion.div
        className="absolute top-2/3 -right-4 w-6 h-px bg-gradient-to-l from-pink-400 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 3 }}
      />

      {/* Points de connexion */}
      <motion.div
        className="absolute top-1/3 -right-1 w-2 h-2 bg-cyan-400 transform rotate-45"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.2 }}
      />
      <motion.div
        className="absolute top-1/2 -right-1 w-2 h-2 bg-purple-400 transform rotate-45"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.7 }}
      />
      <motion.div
        className="absolute top-2/3 -right-1 w-2 h-2 bg-pink-400 transform rotate-45"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3.2 }}
      />
    </motion.div>
  );
};

export default Nav;