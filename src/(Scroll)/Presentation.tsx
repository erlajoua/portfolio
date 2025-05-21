"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Presentation = () => {
  // Références pour détecter quand les éléments sont visibles
  const titleRef = useRef(null);
  const textContainerRef = useRef(null);
  
  // Vérifier si les éléments sont dans la vue
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.5 });
  const isTextInView = useInView(textContainerRef, { once: false, amount: 0.1 });
  
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
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isTitleInView ? 
            { opacity: 1, scale: 1 } : 
            { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: 0.5,
            delay: 0.2
          }}
        >A</motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isTitleInView ? 
            { opacity: 1, scale: 1 } : 
            { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: 0.5,
            delay: 0.25
          }}
        >b</motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isTitleInView ? 
            { opacity: 1, scale: 1 } : 
            { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: 0.5,
            delay: 0.3
          }}
        >o</motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isTitleInView ? 
            { opacity: 1, scale: 1 } : 
            { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: 0.5,
            delay: 0.35
          }}
        >u</motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isTitleInView ? 
            { opacity: 1, scale: 1 } : 
            { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: 0.5,
            delay: 0.4
          }}
        >t</motion.span>
        &nbsp;
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isTitleInView ? 
            { opacity: 1, scale: 1 } : 
            { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: 0.5,
            delay: 0.45
          }}
        >M</motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isTitleInView ? 
            { opacity: 1, scale: 1 } : 
            { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: 0.5,
            delay: 0.5
          }}
        >e</motion.span>
      </motion.h2>
    
      <motion.div 
        ref={textContainerRef}
        className="flex flex-col gap-8 text-slate-200 text-base"
        variants={container}
        initial="hidden"
        animate={isTextInView ? "visible" : "hidden"}
      >
        <motion.p variants={paragraphVariants}>
          I'm a developer passionate about crafting accessible,
          pixel-perfect user interfaces that blend thoughtful design with
          robust engineering. <motion.span 
            className="text-white font-medium"
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(96, 165, 250, 0.2) 0%, rgba(96, 165, 250, 0.4) 100%)",
              backgroundRepeat: "no-repeat",
              padding: "0 4px",
              borderRadius: "2px",
            }}
            variants={highlightVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: false }}
          >My favorite</motion.span> work lies at the intersection of
          design and development, creating experiences that not only look
          great but are meticulously built for performance and usability.
        </motion.p>
        
        <motion.p variants={paragraphVariants}>
          Currently, I'm a <motion.span 
            className="text-white font-medium"
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(96, 165, 250, 0.2) 0%, rgba(96, 165, 250, 0.4) 100%)",
              backgroundRepeat: "no-repeat",
              padding: "0 4px",
              borderRadius: "2px",
            }}
            variants={highlightVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: false }}
          >Senior Front-End Engineer</motion.span> at Klaviyo,
          specializing in accessibility. I contribute to the creation and
          maintenance of UI components that power Klaviyo's frontend,
          ensuring our platform meets web accessibility standards and best
          practices to deliver an inclusive user experience.
        </motion.p>
        
        <motion.p variants={paragraphVariants}>
          In the past, I've had the opportunity to develop software across
          a variety of settings — from advertising agencies and large
          corporations to start-ups and small digital product studios.
          Additionally, I also released a comprehensive video course a few
          years ago, guiding learners through building a web app with the
          Spotify API.
        </motion.p>
        
        <motion.p variants={paragraphVariants}>
          In my spare time, I'm usually climbing, reading, hanging out
          with my wife and two cats, or running around Hyrule searching
          for <motion.span
            className="text-white font-medium"
            style={{ display: "inline-block" }}
            initial={{ opacity: 1 }}
            whileHover={{ 
              scale: 1.1, 
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 }
            }}
          >Korok seeds</motion.span>.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Presentation;