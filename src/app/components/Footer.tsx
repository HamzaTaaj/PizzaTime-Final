import { motion } from 'motion/react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#00c9db]/20 bg-[#0a1929] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00c9db] to-[#0088cc] rounded-lg flex items-center justify-center shadow-lg shadow-[#00c9db]/30">
                <span className="text-white text-xl">🍕</span>
              </div>
              <span className="text-xl">
                Pizza <span className="text-[#00c9db]">Anytime</span>
              </span>
            </div>
            <p className="text-[#b2c9e0] mb-6">
              Revolutionizing food service with cutting-edge automated vending technology.
            </p>
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-[#00c9db]/20 hover:bg-[#00c9db]/30 rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-[#00c9db]/20 hover:bg-[#00c9db]/30 rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-[#00c9db]/20 hover:bg-[#00c9db]/30 rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-[#00c9db]/20 hover:bg-[#00c9db]/30 rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-[#b2c9e0] hover:text-[#00c9db] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('product')}
                  className="text-[#b2c9e0] hover:text-[#00c9db] transition-colors"
                >
                  Our Machine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="text-[#b2c9e0] hover:text-[#00c9db] transition-colors"
                >
                  Press Releases
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('manual')}
                  className="text-[#b2c9e0] hover:text-[#00c9db] transition-colors"
                >
                  User Manual
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#b2c9e0] hover:text-[#00c9db] transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-[#b2c9e0] hover:text-[#00c9db] transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-[#b2c9e0] hover:text-[#00c9db] transition-colors">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="text-[#b2c9e0] hover:text-[#00c9db] transition-colors">
                  Training
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#00c9db] mt-0.5 flex-shrink-0" />
                <a href="mailto:info@pizzaanytime.com" className="text-[#b2c9e0] hover:text-[#00c9db] transition-colors">
                  info@pizzaanytime.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#00c9db] mt-0.5 flex-shrink-0" />
                <a href="tel:+1-800-PIZZA-24" className="text-[#b2c9e0] hover:text-[#00c9db] transition-colors">
                  1-800-PIZZA-24
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#00c9db] mt-0.5 flex-shrink-0" />
                <span className="text-[#b2c9e0]">
                  123 Innovation Drive<br />
                  Tech City, TC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#00c9db]/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#b2c9e0] text-sm">
              © {currentYear} Pizza Anytime. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-[#b2c9e0] hover:text-[#00c9db] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[#b2c9e0] hover:text-[#00c9db] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-[#b2c9e0] hover:text-[#00c9db] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Element */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-[#00c9db] rounded-full blur-3xl pointer-events-none"
      />
    </footer>
  );
}