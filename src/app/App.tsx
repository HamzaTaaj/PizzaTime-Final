import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductPage } from './components/ProductPage';
import { BlogPage } from './components/BlogPage';
import { ManualPage } from './components/ManualPage';
import { RequestAccessPage } from './components/RequestAccessPage';
import { LandingPage } from './components/LandingPage';
import { CompanyPage } from './components/CompanyPage';
import { WhyPizzaAnytimePage } from './components/WhyPizzaAnytimePage';
import { OnsiteSupportPage } from './components/OnsiteSupportPage';
import { ROICalculatorPage } from './components/ROICalculatorPage';
import { PrivacyTermsPage } from './components/PrivacyTermsPage';
import { ContactPage } from './components/ContactPage';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { ArrowUp } from 'lucide-react';
import { isAuthenticated } from './utils/auth';

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
    // If navigating to admin, check authentication
    if (page === 'admin' && !isAuthenticated()) {
      setCurrentPage('login');
    } else {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    setCurrentPage('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentPage('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden overflow-y-visible">
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
          {currentPage === 'product' && <ProductPage onNavigate={handleNavigate} />}
          {currentPage === 'blog' && <BlogPage onNavigate={handleNavigate} />}
          {currentPage === 'manual' && <ManualPage onNavigate={handleNavigate} />}
          {currentPage === 'request-access' && <RequestAccessPage />}
          {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
          {currentPage === 'company' && <CompanyPage onNavigate={handleNavigate} />}
          {currentPage === 'why-pizza-anytime' && <WhyPizzaAnytimePage onNavigate={handleNavigate} />}
          {currentPage === 'onsite-support' && <OnsiteSupportPage onNavigate={handleNavigate} />}
          {currentPage === 'roi-calculator' && <ROICalculatorPage onNavigate={handleNavigate} />}
          {currentPage === 'privacy-terms' && <PrivacyTermsPage />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />}
          {currentPage === 'admin' && <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />}
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
            className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/50 transition-shadow z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}