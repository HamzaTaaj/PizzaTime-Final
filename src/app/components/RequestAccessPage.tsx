import { motion } from 'motion/react';
import { Lock, Mail, User, MapPin, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export function RequestAccessPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1929] via-[#132f4c] to-[#0a1929] overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-1/2 right-0 w-[600px] h-[600px] bg-[#00c9db]/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00c9db]/20 border border-[#00c9db]/30 rounded-full mb-6">
              <Lock className="w-4 h-4 text-[#00c9db]" />
              <span className="text-[#00c9db]">Secure Access Portal</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 text-white">
              Request <span className="text-[#00c9db]">Access</span>
            </h1>
            <p className="text-xl text-[#b2c9e0] max-w-2xl mx-auto">
              Join the Pizza Anytime network and revolutionize your food service operations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.75fr] gap-18">
            {/* Left Side - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-3xl mb-8 text-white">Why Join Us?</h2>
                <div className="space-y-8">
                  {[
                    {
                      title: 'Early Access',
                      description: 'Be among the first to deploy our cutting-edge vending technology'
                    },
                    {
                      title: 'Exclusive Benefits',
                      description: 'Special pricing and priority support for early adopters'
                    },
                    {
                      title: 'Training & Support',
                      description: 'Comprehensive onboarding and 24/7 technical assistance'
                    },
                    {
                      title: 'Analytics Dashboard',
                      description: 'Real-time insights and performance metrics for your machines'
                    }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-[#00c9db] to-[#0088cc] rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00c9db]/40">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg mb-1 text-white">{benefit.title}</h3>
                        <p className="text-[#b2c9e0]">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-[#00c9db]/10 border-2 border-[#00c9db]/30 rounded-xl">
                <h3 className="text-lg mb-2 text-white">Need Help?</h3>
                <p className="text-[#b2c9e0] mb-4">
                  Our team is here to assist you with the application process
                </p>
                <div className="flex items-center gap-2 text-[#00c9db]">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:access@pizzaanytime.com" className="hover:underline">
                    access@pizzaanytime.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="p-8 bg-gradient-to-br from-[#132f4c] to-[#0a1929] border-2 border-[#00c9db]/30 rounded-2xl shadow-2xl">
                <h2 className="text-2xl mb-8 text-white">Create Your Account</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name and Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm mb-2 text-[#b2c9e0]">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00c9db]/50" />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-[#0a1929] border-2 border-[#00c9db]/30 rounded-lg focus:outline-none focus:border-[#00c9db] transition-colors text-white placeholder-[#b2c9e0]/50"
                          placeholder="John"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm mb-2 text-[#b2c9e0]">
                        Last Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00c9db]/50" />
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-[#0a1929] border-2 border-[#00c9db]/30 rounded-lg focus:outline-none focus:border-[#00c9db] transition-colors text-white placeholder-[#b2c9e0]/50"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2 text-[#b2c9e0]">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00c9db]/50" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-[#0a1929] border-2 border-[#00c9db]/30 rounded-lg focus:outline-none focus:border-[#00c9db] transition-colors text-white placeholder-[#b2c9e0]/50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Password and Confirm Password */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="password" className="block text-sm mb-2 text-[#b2c9e0]">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00c9db]/50" />
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-[#0a1929] border-2 border-[#00c9db]/30 rounded-lg focus:outline-none focus:border-[#00c9db] transition-colors text-white placeholder-[#b2c9e0]/50"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm mb-2 text-[#b2c9e0]">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00c9db]/50" />
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-[#0a1929] border-2 border-[#00c9db]/30 rounded-lg focus:outline-none focus:border-[#00c9db] transition-colors text-white placeholder-[#b2c9e0]/50"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="block text-sm mb-2 text-[#b2c9e0]">
                      Business Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3 w-5 h-5 text-[#00c9db]/50" />
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={1}
                        className="w-full pl-12 pr-4 py-3 bg-[#0a1929] border-2 border-[#00c9db]/30 rounded-lg focus:outline-none focus:border-[#00c9db] transition-colors text-white placeholder-[#b2c9e0]/50 resize-none"
                        placeholder="123 Business Street, City, State, ZIP"
                      />
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-1 w-4 h-4 rounded border-2 border-[#00c9db]/30 bg-[#0a1929] checked:bg-[#00c9db] focus:ring-2 focus:ring-[#00c9db]/50"
                    />
                    <label htmlFor="terms" className="text-sm text-[#b2c9e0]">
                      I agree to the{' '}
                      <a href="#" className="text-[#00c9db] hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-[#00c9db] hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 0 40px rgba(0, 201, 219, 0.6)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-[#00c9db] to-[#0088cc] rounded-lg shadow-lg shadow-[#00c9db]/40 transition-all"
                  >
                    Request Access
                  </motion.button>

                  <p className="text-center text-sm text-[#b2c9e0]">
                    Already have an account?{' '}
                    <a href="#" className="text-[#00c9db] hover:underline">
                      Sign in here
                    </a>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Note */}
      <section className="py-16 bg-gradient-to-r from-[#00c9db]/10 to-[#0088cc]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Lock className="w-12 h-12 text-[#00c9db] mx-auto mb-4" />
            <h3 className="text-2xl mb-4 text-white">Your Data is Secure</h3>
            <p className="text-[#b2c9e0] max-w-2xl mx-auto">
              We use industry-standard encryption to protect your information. Your data will never be shared with third parties without your explicit consent.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
