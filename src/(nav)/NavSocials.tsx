"use client";

import GithubSvg from "@/app/svgs/GithubSvg";
import LinkedIn from "@/app/svgs/LinkedIn";
import { JSX } from "react";
import { motion } from "framer-motion";

interface ISocial {
  name: string;
  url: string;
  icon: JSX.Element
}

const socials: ISocial[] = [
  {
    name: "Github",
    url: "https://github.com",
    icon: <GithubSvg />
  },
  {
    name: "YouTube",
    url: "https://LinkedIn.com",
    icon: <LinkedIn />
  },
];

const iconVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.1,
    rotate: [0, -10, 10, -5, 5, 0],
    transition: {
      rotate: {
        duration: 0.5,
        ease: "easeInOut"
      },
      scale: {
        duration: 0.2
      }
    }
  },
  tap: { 
    scale: 0.9,
    transition: {
      duration: 0.1
    }
  }
};

const Social = ({ social }: { social: ISocial }) => {
  const handleOpen = () => {
    window.open(social.url, "_blank");
  };

  return (
    <motion.div
      onClick={handleOpen}
      className="bg-slate-500 hover:bg-slate-300 text-white rounded-lg flex items-center justify-center cursor-pointer mt-6 p-2"
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={iconVariants}
    >
      {social.icon}
    </motion.div>
  );
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const NavSocials = () => {
  return (
    <motion.div 
      className="flex gap-2"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      {socials.map((social, index) => {
        return <Social key={index} social={social} />;
      })}
    </motion.div>
  );
};

export default NavSocials;