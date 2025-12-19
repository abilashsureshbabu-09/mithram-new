import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { COMPANY_DETAILS } from '../constants';

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <img 
      src="components/logo.png" 
      alt="Mithram Elite Logo" 
      className="w-10 h-10 object-contain"
      onError={(e) => {
        console.error("Logo not found at components/logo.png");
      }}
    />
    <div className="flex flex-col leading-none">
      <span className="text-xl font-black uppercase tracking-tighter text-gray-900">Mithram</span>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600">Constructions</span>
    </div>
  </div>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: { type: "spring", stiffness: 400, damping: 40 }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 40 }
    }
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    })
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <div className="bg-[#1A1A1A] text-white py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center text-xs tracking-wider">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">📞 {COMPANY_DETAILS.phone}</span>
            <span className="flex items-center gap-2">✉️ {COMPANY_DETAILS.email}</span>
          </div>
          <div className="flex gap-4 font-bold">
            <span className="hover:text-teal-400 cursor-pointer transition-colors uppercase">Residential</span>
            <span>•</span>
            <span className="hover:text-teal-400 cursor-pointer transition-colors uppercase">Commercial</span>
            <span>•</span>
            <span className="hover:text-teal-400 cursor-pointer transition-colors uppercase">Industrial</span>
          </div>
        </div>
      </div>

      <nav className="sticky top-0 w-full z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-bold uppercase transition-colors ${
                  location.pathname === link.href ? 'text-teal-600' : 'hover:text-teal-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/contact" className="hidden md:block">
              <button className="bg-black text-white px-6 py-2.5 rounded-sm font-bold uppercase tracking-wider text-xs hover:bg-gray-800 transition-all transform active:scale-95 shadow-md">
                Get a Quote
              </button>
            </Link>

            <button
              className="md:hidden text-black focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 top-20 z-40 bg-white flex flex-col items-center justify-start pt-12 md:hidden h-[calc(100vh-5rem)] border-t"
            >
              <div className="flex flex-col items-center gap-8 text-xl font-bold uppercase">
                {navLinks.map((link, i) => (
                  <motion.div key={link.href} custom={i} variants={linkVariants}>
                    <Link
                      to={link.href}
                      onClick={toggleMenu}
                      className="hover:text-teal-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div custom={navLinks.length} variants={linkVariants} className="mt-4">
                  <Link to="/contact" onClick={toggleMenu}>
                    <button className="bg-black text-white w-48 h-14 rounded-sm font-bold uppercase tracking-wider shadow-lg">
                      Get a Quote
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;