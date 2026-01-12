import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, MapPin, CheckCircle2, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fadeInUp, staggerContainer, viewportConfig, slideInLeft, slideInRight } from '../utils/animations';

export function RequestAccessPage() {
  const navigate = useNavigate();
  const { signUp, isLoading: submitting } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    location: '',
    machineCount: '',
    role: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'email_taken'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setErrorMessage('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setSubmitStatus('error');
      setErrorMessage('Passwords do not match');
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setSubmitStatus('error');
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    // Use signUp from AuthContext with all form fields
    const result = await signUp({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      acceptsMarketing: true,
      // Additional business fields
      company: formData.company,
      location: formData.location,
      machineCount: formData.machineCount,
      role: formData.role,
      message: formData.message,
    });

    if (result.success) {
      setSubmitStatus('success');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        company: '',
        location: '',
        machineCount: '',
        role: '',
        message: ''
      });
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else if (result.errorCode === 'EMAIL_TAKEN') {
      // Email already exists - prompt sign in
      setSubmitStatus('email_taken');
      setErrorMessage('Please sign in to update your request details.');
    } else {
      setSubmitStatus('error');
      setErrorMessage(result.error || 'Failed to create account. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Header */}
      <section className="relative py-24 overflow-hidden bg-blue-50 rounded-b-[3rem]">

        {/* Curved Bottom Wave Design */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
              <Lock className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-medium text-sm">Enterprise Access Portal</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 text-slate-900 font-bold">
              Request <span className="text-blue-600">Access</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join the Pizza Anytime enterprise network and transform your food service operations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative py-16 pb-24 bg-white">
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#f8fafc" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.75fr] gap-18">
            {/* Left Side - Benefits */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={slideInLeft}
              className="space-y-10"
            >
              <div>
                <h2 className="text-3xl mb-8 text-slate-900 font-bold">Enterprise Benefits</h2>
                <motion.div
                  variants={staggerContainer}
                  className="space-y-8"
                >
                  {[
                    {
                      title: 'Priority Deployment',
                      description: 'Expedited access to our enterprise-grade vending technology solutions'
                    },
                    {
                      title: 'Enterprise Pricing',
                      description: 'Competitive pricing and volume discounts for enterprise clients'
                    },
                    {
                      title: 'Dedicated Support',
                      description: 'Comprehensive onboarding and 24/7 enterprise technical assistance'
                    },
                    {
                      title: 'Business Intelligence',
                      description: 'Advanced analytics dashboard with real-time performance metrics'
                    }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg mb-1 text-slate-900 font-semibold">{benefit.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
                <h3 className="text-lg mb-2 text-slate-900 font-semibold">Need Assistance?</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Our enterprise team is available to assist with the application process
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:access@pizzaanytime.com" className="hover:underline">
                    access@pizzaanytime.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={slideInRight}
            >
              <div className="p-8 bg-white border-2 border-slate-200 rounded-2xl shadow-xl">
                <h2 className="text-2xl mb-8 text-slate-900 font-semibold">Request Access</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name and Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm mb-2 text-slate-700 font-medium">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400"
                          placeholder="John"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm mb-2 text-slate-700 font-medium">
                        Last Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email and Company */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm mb-2 text-slate-700 font-medium">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm mb-2 text-slate-700 font-medium">
                        Company *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400"
                          placeholder="Company Name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="password" className="block text-sm mb-2 text-slate-700 font-medium">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          minLength={8}
                          className="w-full pl-12 pr-12 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400"
                          placeholder="Min. 8 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm mb-2 text-slate-700 font-medium">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          minLength={8}
                          className="w-full pl-12 pr-12 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400"
                          placeholder="Confirm password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Password Requirements Hint */}
                  <p className="text-xs text-slate-500 -mt-2">
                    Password must be at least 8 characters long
                  </p>

                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm mb-2 text-slate-700 font-medium">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  {/* Machine Count and Role */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="machineCount" className="block text-sm mb-2 text-slate-700 font-medium">
                        How many machines are you interested in?
                      </label>
                      <input
                        type="number"
                        id="machineCount"
                        name="machineCount"
                        value={formData.machineCount}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400"
                      />
                    </div>

                    <div>
                      <label htmlFor="role" className="block text-sm mb-2 text-slate-700 font-medium">
                        I am a...
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900"
                      >
                        <option value="">Select an option</option>
                        <option value="Operator">Operator</option>
                        <option value="Restaurant Owner">Restaurant Owner</option>
                        <option value="Site/Operations Manager">Site/Operations Manager</option>
                        <option value="Cafeteria Manager">Cafeteria Manager</option>
                        <option value="Interested in Providing Info to a Location">Interested in Providing Info to a Location</option>
                        <option value="New Business">New Business</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm mb-2 text-slate-700 font-medium">
                      Anything else you'd like us to know about your request?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400 resize-none"
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-50 border-2 border-green-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle2 className="w-5 h-5" />
                        <p className="font-medium">Request submitted successfully! We'll be in touch soon.</p>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'email_taken' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg"
                    >
                      <div className="text-amber-800">
                        <p className="font-medium mb-2">An account with this email already exists.</p>
                        <p className="text-sm mb-3">{errorMessage}</p>
                        <button
                          type="button"
                          onClick={() => navigate('/login')}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
                        >
                          Sign In to Your Account
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border-2 border-red-200 rounded-lg"
                    >
                      <p className="text-red-700 font-medium">{errorMessage}</p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={!submitting ? {
                      scale: 1.02,
                      boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
                    } : {}}
                    whileTap={!submitting ? { scale: 0.98 } : {}}
                    className={`w-full py-4 rounded-lg shadow-lg shadow-blue-600/20 transition-all font-semibold flex items-center justify-center gap-2 ${
                      submitting 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Send Request'
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Note */}
      <section className="relative py-16 bg-blue-50">
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#ffffff" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
          >
            <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl mb-4 text-slate-900 font-semibold">Enterprise-Grade Security</h3>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We employ industry-standard encryption and security protocols to protect your information. Your data will never be shared with third parties without your explicit consent.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
