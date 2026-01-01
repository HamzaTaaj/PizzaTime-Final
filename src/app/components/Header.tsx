import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from '@/assets/Untitled.svg';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mobileAboutUsOpen, setMobileAboutUsOpen] = useState(false);

  // Helper function to check if current path matches
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 backdrop-blur-xl bg-white/95 shadow-sm">
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 w-full">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.02 }}
          >
            <img src={logo} alt="Pizza Anytime Logo" className="w-20 h-20 object-contain" />
            <span className="text-2xl tracking-tight font-bold text-slate-900">
              Pizza{" "}
              <span className="text-blue-600">Anytime</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* 1. Home */}
            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ 
                scale: 1.02,
                color: "#2563eb"
              }}
              whileTap={{ scale: 0.98 }}
              className={`relative px-3 py-2 rounded-lg transition-all font-medium ${isActive("/") ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}`}
            >
              <motion.div
                className="absolute inset-0 bg-blue-50 rounded-lg z-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <span className="relative z-10">Home</span>
              {isActive("/") && (
                <motion.div
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-600 z-20 rounded-full"
                  layoutId="activeTab"
                />
              )}
            </motion.button>

            {/* 2. Product Information */}
            <motion.button
              onClick={() => navigate("/product")}
              whileHover={{ 
                scale: 1.02,
                color: "#2563eb"
              }}
              whileTap={{ scale: 0.98 }}
              className={`relative px-3 py-2 rounded-lg transition-all font-medium ${isActive("/product") ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}`}
            >
              <motion.div
                className="absolute inset-0 bg-blue-50 rounded-lg z-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <span className="relative z-10">Product Information</span>
              {isActive("/product") && (
                <motion.div
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-600 z-20 rounded-full"
                  layoutId="activeTab"
                />
              )}
            </motion.button>

            {/* 3. About Us Dropdown */}
            <div className="relative">
              <motion.button
                onMouseEnter={() => setAboutUsOpen(true)}
                whileHover={{ 
                  scale: 1.02,
                  color: "#2563eb"
                }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-1 px-3 py-2 rounded-lg transition-all font-medium ${aboutUsOpen ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}`}
              >
                <motion.div
                  className="absolute inset-0 bg-blue-50 rounded-lg z-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <span className="relative z-10">About Us</span>
                <ChevronDown className="w-4 h-4 relative z-10" />
              </motion.button>

              <AnimatePresence>
                {aboutUsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseLeave={() => setAboutUsOpen(false)}
                    className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden"
                  >
                    <motion.button
                      onClick={() => {
                        navigate("/company");
                        setAboutUsOpen(false);
                      }}
                      whileHover={{ 
                        x: 4,
                        backgroundColor: "#f1f5f9"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full text-left px-4 py-3 text-slate-700 transition-all hover:text-blue-600"
                    >
                      Company Page
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        navigate("/why-pizza-anytime");
                        setAboutUsOpen(false);
                      }}
                      whileHover={{ 
                        x: 4,
                        backgroundColor: "#f1f5f9"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full text-left px-4 py-3 text-slate-700 transition-all hover:text-blue-600"
                    >
                      Why Pizza Anytime
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        navigate("/onsite-support");
                        setAboutUsOpen(false);
                      }}
                      whileHover={{ 
                        x: 4,
                        backgroundColor: "#f1f5f9"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full text-left px-4 py-3 text-slate-700 transition-all hover:text-blue-600"
                    >
                      Onsite Support
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        navigate("/privacy-terms");
                        setAboutUsOpen(false);
                      }}
                      whileHover={{ 
                        x: 4,
                        backgroundColor: "#f1f5f9"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full text-left px-4 py-3 text-slate-700 transition-all hover:text-blue-600"
                    >
                      Privacy Policy/ Terms
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. ROI Calculator */}
            <motion.button
              onClick={() => navigate("/roi-calculator")}
              whileHover={{ 
                scale: 1.02,
                color: "#2563eb"
              }}
              whileTap={{ scale: 0.98 }}
              className={`relative px-3 py-2 rounded-lg transition-all font-medium ${isActive("/roi-calculator") ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}`}
            >
              <motion.div
                className="absolute inset-0 bg-blue-50 rounded-lg z-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <span className="relative z-10">ROI Calculator</span>
              {isActive("/roi-calculator") && (
                <motion.div
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-600 z-20 rounded-full"
                  layoutId="activeTab"
                />
              )}
            </motion.button>

            {/* 5. Marketing */}
            <motion.button
              onClick={() => navigate("/landing")}
              whileHover={{ 
                scale: 1.02,
                color: "#2563eb"
              }}
              whileTap={{ scale: 0.98 }}
              className={`relative px-3 py-2 rounded-lg transition-all font-medium ${isActive("/landing") ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}`}
            >
              <motion.div
                className="absolute inset-0 bg-blue-50 rounded-lg z-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <span className="relative z-10">Marketing</span>
              {isActive("/landing") && (
                <motion.div
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-600 z-20 rounded-full"
                  layoutId="activeTab"
                />
              )}
            </motion.button>

            {/* 6. Request Access */}
            <motion.button
              onClick={() => navigate("/request-access")}
              whileHover={{ 
                scale: 1.02,
                color: "#2563eb"
              }}
              whileTap={{ scale: 0.98 }}
              className={`relative px-3 py-2 rounded-lg transition-all font-medium ${isActive("/request-access") ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}`}
            >
              <motion.div
                className="absolute inset-0 bg-blue-50 rounded-lg z-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <span className="relative z-10">Request Access</span>
              {isActive("/request-access") && (
                <motion.div
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-600 z-20 rounded-full"
                  layoutId="activeTab"
                />
              )}
            </motion.button>

            {/* 7. Contact Us */}
            <motion.button
              onClick={() => navigate("/contact")}
              whileHover={{ 
                scale: 1.02,
                color: "#2563eb"
              }}
              whileTap={{ scale: 0.98 }}
              className={`relative px-3 py-2 rounded-lg transition-all font-medium ${isActive("/contact") ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}`}
            >
              <motion.div
                className="absolute inset-0 bg-blue-50 rounded-lg z-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <span className="relative z-10">Contact Us</span>
              {isActive("/contact") && (
                <motion.div
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-600 z-20 rounded-full"
                  layoutId="activeTab"
                />
              )}
            </motion.button>

            {/* 8. Resources Dropdown */}
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
                        navigate("/manual");
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
                    <motion.button
                      onClick={() => {
                        navigate("/blog");
                        setResourcesOpen(false);
                      }}
                      whileHover={{ 
                        x: 4,
                        backgroundColor: "#f1f5f9"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full text-left px-4 py-3 text-slate-700 transition-all hover:text-blue-600"
                    >
                      Latest Updates
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={() => navigate('/login')}
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
                {/* 1. Home */}
                <motion.button
                  onClick={() => {
                    navigate("/");
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
                
                {/* 2. Product Information */}
                <motion.button
                  onClick={() => {
                    navigate("/product");
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
                  Product Information
                </motion.button>
                
                {/* 3. About Us Dropdown */}
                <div>
                  <motion.button
                    onClick={() => setMobileAboutUsOpen(!mobileAboutUsOpen)}
                    whileHover={{ 
                      x: 8,
                      backgroundColor: "#f1f5f9",
                      color: "#2563eb"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between w-full text-left px-4 py-2 text-slate-700 rounded-lg transition-all font-medium"
                  >
                    <span>About Us</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileAboutUsOpen ? 'rotate-180' : ''}`} />
                  </motion.button>
                  <AnimatePresence>
                    {mobileAboutUsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-8 space-y-2 pt-2">
                          <motion.button
                            onClick={() => {
                              navigate("/company");
                              setMobileMenuOpen(false);
                              setMobileAboutUsOpen(false);
                            }}
                            whileHover={{ 
                              x: 4,
                              backgroundColor: "#f1f5f9",
                              color: "#2563eb"
                            }}
                            className="block w-full text-left px-4 py-2 text-slate-600 rounded-lg transition-all text-sm"
                          >
                            Company Page
                          </motion.button>
                          <motion.button
                            onClick={() => {
                              navigate("/why-pizza-anytime");
                              setMobileMenuOpen(false);
                              setMobileAboutUsOpen(false);
                            }}
                            whileHover={{ 
                              x: 4,
                              backgroundColor: "#f1f5f9",
                              color: "#2563eb"
                            }}
                            className="block w-full text-left px-4 py-2 text-slate-600 rounded-lg transition-all text-sm"
                          >
                            Why Pizza Anytime
                          </motion.button>
                          <motion.button
                            onClick={() => {
                              navigate("/onsite-support");
                              setMobileMenuOpen(false);
                              setMobileAboutUsOpen(false);
                            }}
                            whileHover={{ 
                              x: 4,
                              backgroundColor: "#f1f5f9",
                              color: "#2563eb"
                            }}
                            className="block w-full text-left px-4 py-2 text-slate-600 rounded-lg transition-all text-sm"
                          >
                            Onsite Support
                          </motion.button>
                          <motion.button
                            onClick={() => {
                              navigate("/privacy-terms");
                              setMobileMenuOpen(false);
                              setMobileAboutUsOpen(false);
                            }}
                            whileHover={{ 
                              x: 4,
                              backgroundColor: "#f1f5f9",
                              color: "#2563eb"
                            }}
                            className="block w-full text-left px-4 py-2 text-slate-600 rounded-lg transition-all text-sm"
                          >
                            Privacy Policy/ Terms
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* 4. ROI Calculator */}
                <motion.button
                  onClick={() => {
                    navigate("/roi-calculator");
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
                  ROI Calculator
                </motion.button>
                
                {/* 5. Marketing */}
                <motion.button
                  onClick={() => {
                    navigate("/landing");
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
                  Marketing
                </motion.button>
                
                {/* 6. Request Access */}
                <motion.button
                  onClick={() => {
                    navigate("/request-access");
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
                
                {/* 7. Contact Us */}
                <motion.button
                  onClick={() => {
                    navigate("/contact");
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
                  Contact Us
                </motion.button>
                
                {/* 8. Resources Dropdown */}
                <div>
                  <motion.button
                    onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                    whileHover={{ 
                      x: 8,
                      backgroundColor: "#f1f5f9",
                      color: "#2563eb"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between w-full text-left px-4 py-2 text-slate-700 rounded-lg transition-all font-medium"
                  >
                    <span>Resources</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
                  </motion.button>
                  <AnimatePresence>
                    {mobileResourcesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-8 space-y-2 pt-2">
                          <motion.button
                            onClick={() => {
                              navigate("/manual");
                              setMobileMenuOpen(false);
                              setMobileResourcesOpen(false);
                            }}
                            whileHover={{ 
                              x: 4,
                              backgroundColor: "#f1f5f9",
                              color: "#2563eb"
                            }}
                            className="block w-full text-left px-4 py-2 text-slate-600 rounded-lg transition-all text-sm"
                          >
                            User Manual
                          </motion.button>
                          <motion.button
                            onClick={() => {
                              navigate("/blog");
                              setMobileMenuOpen(false);
                              setMobileResourcesOpen(false);
                            }}
                            whileHover={{ 
                              x: 4,
                              backgroundColor: "#f1f5f9",
                              color: "#2563eb"
                            }}
                            className="block w-full text-left px-4 py-2 text-slate-600 rounded-lg transition-all text-sm"
                          >
                            Latest Updates
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <motion.button
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
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