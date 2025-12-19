import { motion } from 'motion/react';
import { Zap, Clock, Shield, TrendingUp, ArrowRight, Building2, DollarSign, Users, Globe, BarChart3, Award, CheckCircle2, Mail, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import vend1Image from '@/assets/vend1.png';
import { useState } from 'react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Marketing form submitted:', formData);
    // Reset form
    setFormData({ firstName: '', lastName: '', email: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const features = [
    {
      icon: Clock,
      title: '24/7 Operations',
      description: 'Uninterrupted service delivery with automated monitoring and maintenance systems'
    },
    {
      icon: Zap,
      title: 'Rapid Deployment',
      description: 'Streamlined installation process with average setup time under 3 minutes per order'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance with industry standards for data protection'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Real-time business intelligence and predictive analytics for optimal performance'
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'ROI Performance',
      value: '300%',
      description: 'Average return on investment within first year of deployment'
    },
    {
      icon: Users,
      title: 'Client Satisfaction',
      value: '98%',
      description: 'Enterprise clients rate service excellence as outstanding'
    },
    {
      icon: Globe,
      title: 'Global Presence',
      value: '50+',
      description: 'Strategic locations across major metropolitan markets'
    },
    {
      icon: BarChart3,
      title: 'Revenue Growth',
      value: '45%',
      description: 'Average monthly revenue increase for enterprise deployments'
    }
  ];

  const pressReleases = [
    {
      date: 'Dec 15, 2025',
      title: 'Pizza Anytime Expands to 50 Locations Nationwide',
      excerpt: 'Strategic expansion brings enterprise-grade vending solutions to corporate campuses and transit hubs.',
      category: 'Expansion'
    },
    {
      date: 'Nov 28, 2025',
      title: 'Industry Recognition: Best Automated Food Service 2025',
      excerpt: 'Award-winning innovation in automated food service technology and operational excellence.',
      category: 'Awards'
    },
    {
      date: 'Nov 10, 2025',
      title: 'Strategic Partnership with Leading Food Service Providers',
      excerpt: 'Enterprise collaboration to transform quick-service restaurant operations through automation.',
      category: 'Partnership'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Subtle Animated Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-1/4 -left-1/4 w-[700px] h-[700px] bg-slate-400 rounded-full blur-3xl"
          />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6"
              >
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600 font-medium text-sm">Enterprise Solutions</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 font-bold text-slate-900 leading-tight">
                Automated Food
                <br />
                <span className="text-blue-600">Service Excellence</span>
              </h1>

              <p className="text-xl text-slate-600 mb-8 max-w-xl leading-relaxed">
                Enterprise-grade automated vending solutions delivering consistent quality and operational efficiency. Transform your food service operations with cutting-edge technology.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('product')}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg flex items-center gap-2 group shadow-lg shadow-blue-600/20 font-medium"
                >
                  Explore Solutions
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: '#f1f5f9',
                    borderColor: '#2563eb'
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('request-access')}
                  className="px-8 py-4 border-2 border-slate-300 rounded-lg transition-colors text-slate-700 font-medium hover:border-blue-600"
                >
                  Schedule Demo
                </motion.button>
              </div>

              {/* Marketing Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <form onSubmit={handleSubmit} className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-lg">
                  <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-1 min-w-0">
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400"
                          placeholder="John"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-600/20 font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      Get Started
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>

            {/* Right Content - Machine Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-900/10 bg-white">
                <div className="relative z-10 p-4">
                  <ImageWithFallback
                    src={vend1Image}
                    alt="Enterprise Pizza Vending Machine"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>

              {/* Corporate Stats Cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 px-6 py-4 bg-white border border-slate-200 rounded-xl shadow-xl backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                <div className="text-sm text-slate-600 font-medium">Locations</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 px-6 py-4 bg-white border border-slate-200 rounded-xl shadow-xl backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-blue-600 mb-1">&lt;3min</div>
                <div className="text-sm text-slate-600 font-medium">Service Time</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 font-bold text-slate-900">
              Enterprise <span className="text-blue-600">Capabilities</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Advanced technology solutions designed for operational excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -4,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  borderColor: '#2563eb'
                }}
                className="p-6 bg-white border-2 border-slate-200 rounded-xl transition-all group hover:border-blue-600"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:scale-110 transition-all">
                  <feature.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl mb-2 text-slate-900 font-semibold">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Benefits Section */}
      <section className="relative py-24 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-slate-50/50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 font-bold text-slate-900">
              Proven <span className="text-blue-600">Business Results</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Measurable outcomes from enterprise deployments nationwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                }}
                className="text-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-5xl mb-3 font-bold text-blue-600">
                  {benefit.value}
                </div>
                <h3 className="text-xl mb-2 text-slate-900 font-semibold">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 font-bold text-slate-900">
              Operational <span className="text-blue-600">Workflow</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Streamlined process for consistent service delivery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 items-start">
            {[
              { step: '01', title: 'Order Selection', desc: 'Intuitive interface enables quick selection and customization of menu items' },
              { step: '02', title: 'Automated Preparation', desc: 'AI-driven systems ensure precision and consistency in every order' },
              { step: '03', title: 'Service Delivery', desc: 'Rapid fulfillment with average service time under 3 minutes' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-8xl font-bold text-blue-50 mb-4">{item.step}</div>
                <h3 className="text-2xl mb-4 text-slate-900 font-semibold">{item.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{item.desc}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-blue-200 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="relative py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl md:text-5xl mb-4 font-bold text-slate-900">Latest <span className="text-blue-600">Updates</span></h2>
              <p className="text-xl text-slate-600">Stay informed about our innovations and achievements</p>
            </div>
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.2)'
              }}
              onClick={() => onNavigate('blog')}
              className="hidden md:flex items-center gap-2 px-6 py-3 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-blue-600 font-medium"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {pressReleases.map((release, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -4,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                }}
                className="p-6 bg-white border border-slate-200 rounded-xl transition-all cursor-pointer group hover:border-blue-600"
                onClick={() => onNavigate('blog')}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                    {release.category}
                  </span>
                  <span className="text-sm text-slate-500">{release.date}</span>
                </div>
                <h3 className="text-xl mb-3 text-slate-900 font-semibold group-hover:text-blue-600 transition-colors">{release.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{release.excerpt}</p>
                <div className="flex items-center gap-2 text-blue-600 group-hover:gap-3 transition-all font-medium">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold">Ready to Transform Your Operations?</h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Discover how enterprise-grade automated food service solutions can drive efficiency and growth
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('request-access')}
              className="px-10 py-5 bg-white text-blue-600 rounded-lg text-lg shadow-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              Schedule a Demo
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
