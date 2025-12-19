import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductPage } from './components/ProductPage';
import { BlogPage } from './components/BlogPage';
import { ManualPage } from './components/ManualPage';
import { RequestAccessPage } from './components/RequestAccessPage';
import { Footer } from './components/Footer';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a1929] text-white overflow-x-hidden overflow-y-visible">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="overflow-visible"
        >
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {currentPage === 'product' && <ProductPage />}
          {currentPage === 'blog' && <BlogPage />}
          {currentPage === 'manual' && <ManualPage />}
          {currentPage === 'request-access' && <RequestAccessPage />}
        </motion.main>
      </AnimatePresence>

      <Footer onNavigate={handleNavigate} />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-[#00c9db] to-[#0088cc] rounded-full flex items-center justify-center shadow-lg shadow-[#00c9db]/50 hover:shadow-xl hover:shadow-[#00c9db]/70 transition-shadow z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cursor Follow Effect */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-[#00c9db]/5 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
          y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 50
        }}
      />
    </div>
  );
}