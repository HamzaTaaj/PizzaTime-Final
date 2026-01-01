import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  if (!isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}

// Page wrapper with animation
function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="overflow-visible"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden overflow-y-visible">
      <Header />
      
      <main className="overflow-visible">
        <PageWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/manual" element={<ManualPage />} />
            <Route path="/request-access" element={<RequestAccessPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/why-pizza-anytime" element={<WhyPizzaAnytimePage />} />
            <Route path="/onsite-support" element={<OnsiteSupportPage />} />
            <Route path="/roi-calculator" element={<ROICalculatorPage />} />
            <Route path="/privacy-terms" element={<PrivacyTermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </PageWrapper>
      </main>

      <Footer />

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