import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Users, Trophy, Calendar, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

// NBA Official Colors
const NBA_COLORS = {
  primary: '#1D428A',    // NBA Blue
  secondary: '#C8102E',  // NBA Red
  accent: '#FFFFFF',     // White
  dark: '#000000'        // Black
};

const AppLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  // Scroll handler for navbar and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowScrollTop(scrollPosition > 400);
      setIsNavbarFixed(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Teams', icon: Users, path: '/teams' },
    { name: 'Players', icon: Trophy, path: '/players' },
    { name: 'Schedule', icon: Calendar, path: '/schedule' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <header className={`${
        isNavbarFixed ? 'fixed top-0 w-full animate-slideDown' : ''
      } bg-gradient-to-r from-blue-700 to-red-600 text-white shadow-lg z-50`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="font-black text-2xl" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
                NBA Corner
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map(({ name, icon: Icon, path }) => (
                <Link
                  key={name}
                  to={path}
                  className="group flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-white/20 transition-all duration-300"
                >
                  <Icon className="transform group-hover:scale-110 transition-transform duration-300" size={20} />
                  <span className="font-bold">{name}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-white/20 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden px-4 pb-4 animate-slideDown">
            {navItems.map(({ name, icon: Icon, path }) => (
              <Link
                key={name}
                to={path}
                className="flex items-center space-x-2 w-full px-3 py-2 rounded-md hover:bg-white/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon size={20} />
                <span className="font-bold">{name}</span>
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-700 to-red-600 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-black mb-4">NBA STATS</h3>
              <p className="opacity-90">Your ultimate destination for NBA statistics and analysis.</p>
            </div>
            <div>
              <h3 className="text-xl font-black mb-4">QUICK LINKS</h3>
              <ul className="space-y-2">
                {navItems.map(({ name, path }) => (
                  <li key={name}>
                    <Link to={path} className="hover:text-gray-300 transition-colors font-bold">{name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-black mb-4">FOLLOW US</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300 transition-colors font-bold">Twitter</a>
                <a href="#" className="hover:text-gray-300 transition-colors font-bold">Facebook</a>
                <a href="#" className="hover:text-gray-300 transition-colors font-bold">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <p className="font-bold">&copy; 2024 NBA Stats. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors animate-fadeIn"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default AppLayout;