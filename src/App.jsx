import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaDiscord, FaSoundcloud, FaYoutube, FaSteam } from 'react-icons/fa';
import './App.css';

const Star = ({ mouseX, mouseY }) => {
  // Random static positions and properties
  const initialX = useRef(Math.random() * 100);
  const initialY = useRef(Math.random() * 100);
  const size = useRef(Math.random() * 2 + 1);
  const depth = useRef(Math.random() * 30 + 10); // How much it moves with mouse
  const opacity = useRef(Math.random() * 0.5 + 0.3);

  // Parallax motion based on mouse position
  const x = useTransform(mouseX, [0, window.innerWidth], [depth.current, -depth.current]);
  const y = useTransform(mouseY, [0, window.innerHeight], [depth.current, -depth.current]);

  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      className="star"
      style={{
        position: 'absolute',
        background: 'white',
        borderRadius: '50%',
        width: size.current + 'px',
        height: size.current + 'px',
        left: initialX.current + '%',
        top: initialY.current + '%',
        x: springX,
        y: springY,
        opacity: opacity.current,
        boxShadow: `0 0 ${size.current * 2}px white`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, opacity.current, 0],
        scale: [0, 1, 0]
      }}
      transition={{
        duration: Math.random() * 10 + 5,
        repeat: Infinity,
        delay: Math.random() * 5,
        ease: "easeInOut"
      }}
    />
  );
};

const App = () => {
  const [stars, setStars] = useState([]);
  const mouseX = useMotionValue(window.innerWidth / 2);
  const mouseY = useMotionValue(window.innerHeight / 2);

  // Springs for the main mouse glow to make it feel "magnetic"
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    // Generate star data
    const newStars = Array.from({ length: 120 }).map((_, i) => ({ id: i }));
    setStars(newStars);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/bewwe01', label: 'Github' },
    { icon: FaDiscord, url: 'https://discord.com/users/710568997015257180', label: 'Discord' },
    { icon: FaSoundcloud, url: 'https://soundcloud.com/bewwe', label: 'Soundcloud' },
    { icon: FaYoutube, url: 'https://www.youtube.com/channel/UCLATAYoq05Nrhhi6cZl-UeA', label: 'YouTube' },
    { icon: FaSteam, url: 'https://steamcommunity.com/id/bewwe/', label: 'Steam' },
  ];

  return (
    <div className="app-container">
      {/* Interactive Background */}
      <div className="interactive-background">
        <div className="stars-wrapper">
          {stars.map((star) => (
            <Star key={star.id} mouseX={mouseX} mouseY={mouseY} />
          ))}
        </div>

        {/* Cursor Following Glow */}
        <motion.div
          className="mouse-glow"
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />

        {/* Subtle Static Atmosphere */}
        <div className="nebula-aura" />
      </div>

      {/* Main Glassmorphic Panel */}
      <motion.main
        className="main-area"
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1
          className="title"
          whileHover={{
            scale: 1.05,
            textShadow: "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4)"
          }}
          transition={{ duration: 0.4 }}
        >
          bewwe
        </motion.h1>

        <motion.div className="social-links">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-item"
              whileHover={{ scale: 1.2, y: -5, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              title={link.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.2 + index * 0.1,
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              <link.icon className="social-icon-svg" />
            </motion.a>
          ))}
        </motion.div>
      </motion.main>

      {/*credit */}
      {/* <div className="copyright">© 2026 bewwe</div> */}
    </div>
  );
};

export default App;
