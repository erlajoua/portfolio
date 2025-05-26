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
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: 50 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col text-white"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h1 
        className="font-bold text-5xl mb-1"
        variants={item}
      >
        {t('nav.firstName')} {t('nav.lastName')}
      </motion.h1>
      
      <motion.h3 
        className="text-xl mb-2"
        variants={item}
      >
        {t('nav.job')}
      </motion.h3>
      
      <motion.span 
        className="text-lg text-slate-200 w-3/5"
        variants={item}
      >
        {t('nav.description')}
      </motion.span>
    </motion.div>
  );
};

export default NavText;