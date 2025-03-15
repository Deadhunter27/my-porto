"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change nav style when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <motion.nav
      className={`fixed top-0 w-full py-4 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto flex justify-between items-center px-5">
        <Link href="/" className="font-bold text-xl relative group">
          <span className="text-white">Reza Aulia Desri</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Hamburger menu */}
        <button
          className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 8 : 0,
              backgroundColor: isOpen ? "#3B82F6" : "#FFFFFF",
            }}
            transition={{ duration: 0.3 }}
            className="absolute w-8 h-0.5 bg-white rounded-full"
            style={{ translateY: "-8px" }}
          />
          <motion.div
            animate={{
              opacity: isOpen ? 0 : 1,
              width: isOpen ? 0 : 32,
            }}
            transition={{ duration: 0.3 }}
            className="absolute w-8 h-0.5 bg-white rounded-full"
          />
          <motion.div
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -8 : 0,
              backgroundColor: isOpen ? "#3B82F6" : "#FFFFFF",
            }}
            transition={{ duration: 0.3 }}
            className="absolute w-8 h-0.5 bg-white rounded-full"
            style={{ translateY: "8px" }}
          />
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
            <NavLink
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              label={item}
            />
          ))}
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-md shadow-lg md:hidden overflow-hidden z-50"
            >
              <motion.div
                className="flex flex-col p-4"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                animate="show"
              >
                {["Home", "About", "Projects", "Skills", "Contact"].map(
                  (item) => (
                    <MobileNavLink
                      key={item}
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      label={item}
                      onClick={() => setIsOpen(false)}
                    />
                  )
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// Desktop navigation link
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="relative group">
      <span className="text-white hover:text-blue-400 transition-colors duration-300">
        {label}
      </span>
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

// Mobile navigation link with animation
function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 },
      }}
    >
      <Link
        href={href}
        className="block py-3 px-4 text-white hover:text-blue-400 border-b border-slate-700/50 transition-all duration-300"
        onClick={onClick}
      >
        {label}
      </Link>
    </motion.div>
  );
}
