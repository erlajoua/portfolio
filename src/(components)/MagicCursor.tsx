"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MagicCursor = () => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateCursor = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', updateCursor);
        
        // Ajouter les événements aux éléments interactifs
        const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', updateCursor);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <motion.div
                className="magic-cursor"
                animate={{
                    x: cursorPos.x,
                    y: cursorPos.y,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 400,
                    mass: 0.5,
                }}
                style={{
                    background: isHovering 
                        ? "radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)",
                }}
            />
            
            {/* Traînée de particules */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="magic-cursor-trail"
                    animate={{
                        x: cursorPos.x,
                        y: cursorPos.y,
                    }}
                    transition={{
                        type: "spring",
                        damping: 30 + i * 10,
                        stiffness: 200 - i * 30,
                        mass: 0.8 + i * 0.2,
                    }}
                    style={{
                        opacity: 0.6 - i * 0.1,
                        scale: 1 - i * 0.1,
                    }}
                />
            ))}
        </>
    );
};
// Composant curseur magique
export default MagicCursor;
