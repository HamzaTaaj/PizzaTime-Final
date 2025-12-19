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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#00c9db]/20 backdrop-blur-xl bg-[#082032]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate("home")}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#00c9db] to-[#0088cc] rounded-lg flex items-center justify-center shadow-lg shadow-[#00c9db]/30">
              <span className="text-white text-xl">🍕</span>
            </div>
            <span className="text-2xl tracking-tight">
              Pizza{" "}
              <span className="text-[#00c9db]">Anytime</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <motion.button
              onClick={() => onNavigate("home")}
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                color: currentPage === "home" ? "#00e0f3" : "#ffffff"
              }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-3 py-2 rounded-lg transition-all ${currentPage === "home" ? "text-[#00c9db]" : "text-[#b2c9e0]"}`}
            >
              <motion.div
                className="absolute inset-0 bg-[#00c9db]/10 rounded-lg z-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
              />
              <span className="relative z-10">Home</span>
              <motion.div
                className="absolute -bottom-0.5 left-0 right-0 h-1 bg-[#00c9db] z-20 rounded-full shadow-lg shadow-[#00c9db]/50"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.button>

            {/* Resources Dropdown */}
            <div className="relative">
              <motion.button
                onMouseEnter={() => setResourcesOpen(true)}
                whileHover={{ 
                  scale: 1.1, 
                  y: -2,
                  color: resourcesOpen ? "#00e0f3" : "#ffffff"
                }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${resourcesOpen ? "text-[#00c9db]" : "text-[#b2c9e0]"}`}
              >
                <motion.div
                  className="absolute inset-0 bg-[#00c9db]/10 rounded-lg z-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                />
                <span className="relative z-10">Resources</span>
                <ChevronDown className="w-4 h-4 relative z-10" />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c9db] z-20"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseLeave={() => setResourcesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-56 bg-[#082032] border border-[#00c9db]/30 rounded-lg shadow-xl overflow-hidden"
                  >
                    <motion.button
                      onClick={() => {
                        onNavigate("blog");
                        setResourcesOpen(false);
                      }}
                      whileHover={{ 
                        x: 4,
                        backgroundColor: "rgba(0, 201, 219, 0.3)",
                        color: "#ffffff"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full text-left px-4 py-3 text-[#b2c9e0] transition-all"
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
                        backgroundColor: "rgba(0, 201, 219, 0.3)",
                        color: "#ffffff"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full text-left px-4 py-3 text-[#b2c9e0] transition-all"
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
                scale: 1.1, 
                y: -2,
                color: currentPage === "product" ? "#00e0f3" : "#ffffff"
              }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-3 py-2 rounded-lg transition-all ${currentPage === "product" ? "text-[#00c9db]" : "text-[#b2c9e0]"}`}
            >
              <motion.div
                className="absolute inset-0 bg-[#00c9db]/10 rounded-lg z-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
              />
              <span className="relative z-10">Our Machine</span>
              <motion.div
                className="absolute -bottom-0.5 left-0 right-0 h-1 bg-[#00c9db] z-20 rounded-full shadow-lg shadow-[#00c9db]/50"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.button>

            {/* <button 
              className="text-[#b2c9e0] hover:text-white transition-colors"
            >
              Why Pizza Anytime?
            </button> */}

            <motion.button
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                color: "#ffffff"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative px-3 py-2 rounded-lg text-[#b2c9e0] transition-all"
            >
              <motion.div
                className="absolute inset-0 bg-[#00c9db]/10 rounded-lg z-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
              />
              <span className="relative z-10">ROI Calculator</span>
              <motion.div
                className="absolute -bottom-0.5 left-0 right-0 h-1 bg-[#00c9db] z-20 rounded-full shadow-lg shadow-[#00c9db]/50"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.button>

            <motion.button
              onClick={() => onNavigate("request-access")}
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                color: currentPage === "request-access" ? "#00e0f3" : "#ffffff"
              }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-3 py-2 rounded-lg transition-all ${currentPage === "request-access" ? "text-[#00c9db]" : "text-[#b2c9e0]"}`}
            >
              <motion.div
                className="absolute inset-0 bg-[#00c9db]/10 rounded-lg z-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
              />
              <span className="relative z-10">Request Access</span>
              <motion.div
                className="absolute -bottom-0.5 left-0 right-0 h-1 bg-[#00c9db] z-20 rounded-full shadow-lg shadow-[#00c9db]/50"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                color: "#ffffff"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative px-3 py-2 rounded-lg text-[#b2c9e0] transition-all"
            >
              <motion.div
                className="absolute inset-0 bg-[#00c9db]/10 rounded-lg z-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
              />
              <span className="relative z-10">Contact</span>
              <motion.div
                className="absolute -bottom-0.5 left-0 right-0 h-1 bg-[#00c9db] z-20 rounded-full shadow-lg shadow-[#00c9db]/50"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                color: "#ffffff"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative px-3 py-2 rounded-lg text-[#b2c9e0] transition-all"
            >
              <motion.div
                className="absolute inset-0 bg-[#00c9db]/10 rounded-lg z-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
              />
              <span className="relative z-10">Privacy</span>
              <motion.div
                className="absolute -bottom-0.5 left-0 right-0 h-1 bg-[#00c9db] z-20 rounded-full shadow-lg shadow-[#00c9db]/50"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.1,
                y: -2,
                boxShadow: "0 0 40px rgba(0, 201, 219, 0.7)",
                background: "linear-gradient(to right, #00e0f3, #00b8d4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-to-r from-[#00c9db] to-[#0088cc] rounded-lg shadow-lg shadow-[#00c9db]/30 transition-all"
            >
              Login
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
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
              className="lg:hidden overflow-hidden border-t border-[#00c9db]/20"
            >
              <div className="py-4 space-y-3">
                <motion.button
                  onClick={() => {
                    onNavigate("home");
                    setMobileMenuOpen(false);
                  }}
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "rgba(0, 201, 219, 0.15)",
                    color: "#00c9db"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-[#b2c9e0] rounded-lg transition-all"
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
                    backgroundColor: "rgba(0, 201, 219, 0.15)",
                    color: "#00c9db"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-[#b2c9e0] rounded-lg transition-all"
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
                    backgroundColor: "rgba(0, 201, 219, 0.15)",
                    color: "#00c9db"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-[#b2c9e0] rounded-lg transition-all"
                >
                  Our Machine
                </motion.button>
                <motion.button
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "rgba(0, 201, 219, 0.15)",
                    color: "#00c9db"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-[#b2c9e0] rounded-lg transition-all"
                >
                  Why Pizza Anytime?
                </motion.button>
                <motion.button
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "rgba(0, 201, 219, 0.15)",
                    color: "#00c9db"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-[#b2c9e0] rounded-lg transition-all"
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
                    backgroundColor: "rgba(0, 201, 219, 0.15)",
                    color: "#00c9db"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-[#b2c9e0] rounded-lg transition-all"
                >
                  Request Access
                </motion.button>
                <motion.button
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "rgba(0, 201, 219, 0.15)",
                    color: "#00c9db"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-[#b2c9e0] rounded-lg transition-all"
                >
                  Contact
                </motion.button>
                <motion.button
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "rgba(0, 201, 219, 0.15)",
                    color: "#00c9db"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-left px-4 py-2 text-[#b2c9e0] rounded-lg transition-all"
                >
                  Privacy
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    boxShadow: "0 0 30px rgba(0, 201, 219, 0.6)",
                    background: "linear-gradient(to right, #00e0f3, #00b8d4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-2.5 bg-gradient-to-r from-[#00c9db] to-[#0088cc] rounded-lg shadow-lg shadow-[#00c9db]/30 transition-all"
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