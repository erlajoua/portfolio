"use client";

import GithubSvg from "@/app/svgs/GithubSvg";
import LinkedIn from "@/app/svgs/LinkedIn";
import { JSX, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ISocial {
  name: string;
  url: string;
  icon: JSX.Element;
}

const socials: ISocial[] = [
  {
    name: "Github",
    url: "https://github.com",
    icon: <GithubSvg />
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: <LinkedIn />
  },
];

const Social = ({ social, index }: { social: ISocial; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleOpen = () => {
    window.open(social.url, "_blank");
  };

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 + 1 }}
    >
      {/* Container principal */}
      <motion.div
        onClick={handleOpen}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative w-12 h-12 cursor-pointer overflow-hidden bg-slate-800/50 border border-cyan-400/50"
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -5, 5, 0],
          boxShadow: "0 0 20px rgba(0, 245, 255, 0.5)"
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Effet de scan horizontal */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>

        {/* Bordures animées */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{
            opacity: isHovered ? [0, 1, 0] : 0,
            scaleX: isHovered ? [0, 1, 0] : 0
          }}
          transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
          animate={{
            opacity: isHovered ? [0, 1, 0] : 0,
            scaleX: isHovered ? [0, 1, 0] : 0
          }}
          transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0, delay: 0.2 }}
        />
        <motion.div
          className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
          animate={{
            opacity: isHovered ? [0, 1, 0] : 0,
            scaleY: isHovered ? [0, 1, 0] : 0
          }}
          transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0, delay: 0.1 }}
        />
        <motion.div
          className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent"
          animate={{
            opacity: isHovered ? [0, 1, 0] : 0,
            scaleY: isHovered ? [0, 1, 0] : 0
          }}
          transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0, delay: 0.3 }}
        />

        {/* Icône */}
        <motion.div
          className="w-full h-full flex items-center justify-center text-cyan-400 relative z-10"
          animate={{
            color: isHovered ? "#ffffff" : "#00f5ff",
            filter: isHovered ? "drop-shadow(0 0 10px #00f5ff)" : "none"
          }}
          transition={{ duration: 0.3 }}
        >
          {social.icon}
        </motion.div>

        {/* Particules d'angle */}
        <motion.div
          className="absolute top-0 left-0 w-1 h-1 bg-cyan-400"
          animate={{
            opacity: isHovered ? [1, 0, 1] : 0,
            scale: isHovered ? [1, 1.5, 1] : 1
          }}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
        />
        <motion.div
          className="absolute top-0 right-0 w-1 h-1 bg-purple-400"
          animate={{
            opacity: isHovered ? [1, 0, 1] : 0,
            scale: isHovered ? [1, 1.5, 1] : 1
          }}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, delay: 0.1 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-1 h-1 bg-pink-400"
          animate={{
            opacity: isHovered ? [1, 0, 1] : 0,
            scale: isHovered ? [1, 1.5, 1] : 1
          }}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, delay: 0.2 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-1 h-1 bg-cyan-400"
          animate={{
            opacity: isHovered ? [1, 0, 1] : 0,
            scale: isHovered ? [1, 1.5, 1] : 1
          }}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, delay: 0.3 }}
        />
      </motion.div>

      {/* Label au survol */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-900 border border-cyan-400/50 text-cyan-400 text-xs rajdhani font-semibold uppercase tracking-wider whitespace-nowrap"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {social.name}
            <motion.div
              className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 border-l border-b border-cyan-400/50 bg-slate-900 rotate-45"
              style={{ marginTop: "-1px" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const NavSocials = () => {
  return (
    <motion.div 
      className="flex gap-4 items-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      {/* Ligne décorative */}
      <motion.div
        className="w-16 h-px bg-gradient-to-r from-transparent to-cyan-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      />
      
      {/* Texte "CONNECT" */}
      <motion.span
        className="rajdhani text-xs text-cyan-400 font-semibold uppercase tracking-wider"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8 }}
      >
        CONNECT
      </motion.span>

      {/* Icônes sociales */}
      {socials.map((social, index) => (
        <Social key={index} social={social} index={index} />
      ))}

      {/* Particules flottantes */}
      <motion.div
        className="absolute -top-2 -right-2 w-1 h-1 bg-cyan-400 rounded-full"
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          y: [0, -10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 2
        }}
      />
      <motion.div
        className="absolute -bottom-1 left-8 w-0.5 h-0.5 bg-purple-400 rounded-full"
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          x: [0, 10, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 2.5
        }}
      />
    </motion.div>
  );
};

export default NavSocials;