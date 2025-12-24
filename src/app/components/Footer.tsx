import { motion } from 'motion/react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-xl">🍕</span>
              </div>
              <span className="text-xl font-bold text-slate-900">
                Pizza <span className="text-blue-600">Anytime</span>
              </span>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Pizza Anytime™ from High Sierra Vending turns an ordinary corner of your business into a 24-hour profit center—without locking you into someone else's rules or recipes.
            </p>
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 rounded-lg flex items-center justify-center transition-colors text-slate-600 hover:text-blue-600"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 rounded-lg flex items-center justify-center transition-colors text-slate-600 hover:text-blue-600"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 rounded-lg flex items-center justify-center transition-colors text-slate-600 hover:text-blue-600"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 rounded-lg flex items-center justify-center transition-colors text-slate-600 hover:text-blue-600"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-6 font-semibold text-slate-900">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('product')}
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Our Machine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Latest Updates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('manual')}
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  User Manual
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg mb-6 font-semibold text-slate-900">Resources</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('onsite-support')}
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Onsite Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy-terms')}
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('company')}
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-6 font-semibold text-slate-900">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@pizza-vending-machine.com" className="text-slate-600 hover:text-blue-600 transition-colors">
                  info@pizza-vending-machine.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <a href="tel:+18886991731" className="text-slate-600 hover:text-blue-600 transition-colors">
                  (888) 699-1731
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">
                  4600 Snyder Ave, E<br />
                  Carson City, Nevada, 89701
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-sm">
              © {currentYear} High Sierra Vending, LLC. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <button
                onClick={() => onNavigate('privacy-terms')}
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onNavigate('privacy-terms')}
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}