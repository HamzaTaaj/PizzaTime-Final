import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({
  currentPage,
  onNavigate,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 backdrop-blur-xl bg-white/95 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate("home")}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white text-xl">🍕</span>
            </div>
            <span className="text-2xl tracking-tight font-bold text-slate-900">
              Pizza{" "}
              <span className="text-blue-600">Anytime</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <motion.button
              onClick={() => onNavigate("home")}
              whileHover={{ 
                scale: 1.02,
                color: "#2563eb"
              }}
              whileTap={{ scale: 0.98 }}
              className={`relative px-3 py-2 rounded-lg transition-all font-medium ${currentPage === "home" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}`}
            >
              <motion.div
                className="absolute inset-0 bg-blue-50 rounded-lg z-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <span className="relative z-10">Home</span>
              {currentPage === "home" && (
                <motion.div
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-600 z-20 rounded-full"
                  layoutId="activeTab"
                />
              )}
            </motion.button>

            {/* Resources Dropdown */}
            <div className="relative">
              <motion.button
                onMouseEnter={() => setResourcesOpen(true)}
                whileHover={{ 
                  scale: 1.02,
                  color: "#2563eb"
                }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-1 px-3 py-2 rounded-lg transition-all font-medium ${resourcesOpen ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}`}
              >
                <motion.div
                  className="absolute inset-0 bg-blue-50 rounded-lg z-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <span className="relative z-10">Resources</span>
                <ChevronDown className="w-4 h-4 relative z-10" />
              </motion.button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseLeave={() => setResourcesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden"
                  >
                    <motion.button
                      onClick={() => {
                        onNavigate("blog");
                        setResourcesOpen(false);
                      }}
                      whileHover={{ 
                        x: 4,
                        backgroundColor: "#f1f5f9"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full text-left px-4 py-3 text-slate-700 transition-all hover:text-blue-600"
                    >
                      Press Releases
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        onNavigate("manual");
                        setResourcesOpen(false);
                      }}
                      whileHover={{ 
                        x: 4,
                        backgroundColor: "#f1f5f9"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full text-left px-4 py-3 text-slate-700 transition-all hover:text-blue-600"
                    >
                      User Manual
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={() => onNavigate("product")}
              whileHover={{ 
                scale: 1.02,
                color: "#2563eb"
              }}
              whileTap={{ scale: 0.98 }}
              className={`relative px-3 py-2 rounded-lg transition-all font-medium ${currentPage === "product" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}`}
            >
              <motion.div
                className="absolute inset-0 bg-blue-50 rounded-lg z-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <span className="relative z-10">Our Machine</span>
              {currentPage === "product" && (
                <motion.div
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-600 z-20 rounded-full"
                  layoutId="activeTab"
                />
              )}
            </motion.button>

            {/* <button 
              className="text-[#b2c9e0] hover:text-white transition-colors"
            >
              Why Pizza Anytime?
            </button> */}

            <motion.button
              whileHover={{ 
                scale: 1.02,
                color: "#2563eb"
              }}
              whileTap={{ scale: 0.98 }}
              className="relative px-3 py-2 rounded-lg text-slate-700 hover:text-blue-600 transition-all font-medium"
            >
              <motion.div
                className="absolute inset-0 bg-blue-50 rounded-lg z-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <span className="relative z-10">ROI Calculator</span>
            </motion.button>

            <motion.button
              onClick={() => onNavigate("request-access")}
              whileHover={{ 
                scale: 1.02,
                color: "#2563eb"
              }}
              whileTap={{ scale: 0.98 }}
              className={`relative px-3 py-2 rounded-lg transition-all font-medium ${currentPage === "request-access" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}`}
            >
              <motion.div
                className="absolute inset-0 bg-blue-50 rounded-lg z-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <span className="relative z-10">Request Access</span>
              {currentPage === "request-access" && (
                <motion.div
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-600 z-20 rounded-full"
                  layoutId="activeTab"
                />
              )}
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.02,
                color: "#2563eb"
              }}
              whileTap={{ scale: 0.98 }}
              className="relative px-3 py-2 rounded-lg text-slate-700 hover:text-blue-600 transition-all font-medium"
            >
              <motion.div
                className="absolute inset-0 bg-blue-50 rounded-lg z-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <span className="relative z-10">Contact</span>
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.02,
                color: "#2563eb"
              }}
              whileTap={{ scale: 0.98 }}
              className="relative px-3 py-2 rounded-lg text-slate-700 hover:text-blue-600 transition-all font-medium"
            >
              <motion.div
                className="absolute inset-0 bg-blue-50 rounded-lg z-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              {/* <span className="relative z-10">Privacy</span> */}
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(37, 99, 235, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all font-medium"
            >
              Login
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-slate-200 bg-white"
            >
              <div className="py-4 space-y-3">
                <motion.button
                  onClick={() => {
                    onNavigate("home");
                    setMobileMenuOpen(false);
                  }}
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "#f1f5f9",
                    color: "#2563eb"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-slate-700 rounded-lg transition-all font-medium"
                >
                  Home
                </motion.button>
                <motion.button
                  onClick={() => {
                    onNavigate("blog");
                    setMobileMenuOpen(false);
                  }}
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "#f1f5f9",
                    color: "#2563eb"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-slate-700 rounded-lg transition-all font-medium"
                >
                  Resources
                </motion.button>
                <motion.button
                  onClick={() => {
                    onNavigate("product");
                    setMobileMenuOpen(false);
                  }}
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "#f1f5f9",
                    color: "#2563eb"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-slate-700 rounded-lg transition-all font-medium"
                >
                  Our Machine
                </motion.button>
                <motion.button
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "#f1f5f9",
                    color: "#2563eb"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-slate-700 rounded-lg transition-all font-medium"
                >
                  Why Pizza Anytime?
                </motion.button>
                <motion.button
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "#f1f5f9",
                    color: "#2563eb"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-slate-700 rounded-lg transition-all font-medium"
                >
                  ROI Calculator
                </motion.button>
                <motion.button
                  onClick={() => {
                    onNavigate("request-access");
                    setMobileMenuOpen(false);
                  }}
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "#f1f5f9",
                    color: "#2563eb"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-slate-700 rounded-lg transition-all font-medium"
                >
                  Request Access
                </motion.button>
                <motion.button
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "#f1f5f9",
                    color: "#2563eb"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-slate-700 rounded-lg transition-all font-medium"
                >
                  Contact
                </motion.button>
                <motion.button
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "#f1f5f9",
                    color: "#2563eb"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-slate-700 rounded-lg transition-all font-medium"
                >
                  Privacy
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(37, 99, 235, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all font-medium"
                >
                  Login
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}