import { motion } from 'motion/react';
import { Zap, Clock, Shield, TrendingUp, ArrowRight, Sparkles, DollarSign, Users, Globe, BarChart3 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import vend1Image from '@/assets/vend1.png';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Fresh pizza delivered instantly, anytime you crave it'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'From order to delivery in under 3 minutes'
    },
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'Restaurant-grade ingredients, automated perfection'
    },
    {
      icon: TrendingUp,
      title: 'Smart Technology',
      description: 'AI-powered cooking ensures consistency every time'
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'High ROI',
      value: '300%',
      description: 'Average return on investment within first year'
    },
    {
      icon: Users,
      title: 'Customer Satisfaction',
      value: '98%',
      description: 'Customers rate their experience as excellent'
    },
    {
      icon: Globe,
      title: 'Market Reach',
      value: '50+',
      description: 'Locations nationwide and expanding'
    },
    {
      icon: BarChart3,
      title: 'Revenue Growth',
      value: '45%',
      description: 'Average monthly revenue increase'
    }
  ];

  const pressReleases = [
    {
      date: 'Dec 15, 2025',
      title: 'Pizza Anytime Expands to 50 Locations Nationwide',
      excerpt: 'Revolutionary vending technology brings fresh pizza to transit hubs and corporate campuses.',
      category: 'Expansion'
    },
    {
      date: 'Nov 28, 2025',
      title: 'Innovation Award: Best Automated Food Service 2025',
      excerpt: 'Industry recognition for pioneering smart vending machine technology.',
      category: 'Awards'
    },
    {
      date: 'Nov 10, 2025',
      title: 'Partnership with Leading Food Chains Announced',
      excerpt: 'Strategic collaboration to revolutionize quick-service restaurant industry.',
      category: 'Partnership'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1929] via-[#132f4c] to-[#0a1929]" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-[#00c9db]/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#0088cc]/10 rounded-full blur-3xl"
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,201,219,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,201,219,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#00c9db]/20 border border-[#00c9db]/30 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-[#00c9db]" />
                <span className="text-[#00c9db]">Next-Gen Food Technology</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-[#b2c9e0] to-[#00c9db] bg-clip-text text-transparent">
                Fresh Pizza,
                <br />
                <span className="text-[#00c9db]">Anytime</span>
              </h1>

              <p className="text-xl text-[#b2c9e0] mb-8 max-w-xl leading-relaxed">
                Experience the future of automated food service. Our cutting-edge vending machines deliver restaurant-quality pizza in minutes, powered by advanced robotics and AI.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 0 40px rgba(0, 201, 219, 0.6)',
                    background: 'linear-gradient(to right, #00e0f3, #00a8cc)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('product')}
                  className="px-8 py-4 bg-gradient-to-r from-[#00c9db] to-[#0088cc] rounded-lg flex items-center gap-2 group shadow-lg shadow-[#00c9db]/40"
                >
                  Explore Technology
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: '#00c9db',
                    backgroundColor: 'rgba(0, 201, 219, 0.1)',
                    boxShadow: '0 0 30px rgba(0, 201, 219, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('request-access')}
                  className="px-8 py-4 border-2 border-[#00c9db]/50 rounded-lg transition-colors"
                >
                  Request Access
                </motion.button>
              </div>
            </motion.div>

            {/* Right Content - Machine Image - BIGGER */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#00c9db]/40 shadow-2xl shadow-[#00c9db]/30">
                {/* Glow Effect - Behind the image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#00c9db]/40 to-transparent z-0" />
                {/* Image - On top of the frame */}
                <div className="relative z-10 scale-120 py-4 pb-10">
                  <ImageWithFallback
                    src={vend1Image}
                    alt="Futuristic Pizza Vending Machine"
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Floating Stats */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 px-6 py-4 bg-[#132f4c] border-2 border-[#00c9db]/40 rounded-xl backdrop-blur-lg shadow-lg"
              >
                <div className="text-3xl text-[#00c9db] mb-1">50+</div>
                <div className="text-sm text-[#b2c9e0]">Locations</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 px-6 py-4 bg-[#132f4c] border-2 border-[#00c9db]/40 rounded-xl backdrop-blur-lg shadow-lg"
              >
                <div className="text-3xl text-[#00c9db] mb-1">&lt;3min</div>
                <div className="text-sm text-[#b2c9e0]">Delivery Time</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-b from-[#0a1929] to-[#132f4c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">
              Why Choose <span className="text-[#00c9db]">Pizza Anytime</span>
            </h2>
            <p className="text-xl text-[#b2c9e0] max-w-2xl mx-auto">
              Cutting-edge technology meets culinary excellence
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
                  y: -8,
                  boxShadow: '0 20px 60px rgba(0, 201, 219, 0.3)',
                  borderColor: 'rgba(0, 201, 219, 0.6)'
                }}
                className="p-6 bg-[#0a1929] border-2 border-[#00c9db]/20 rounded-xl transition-all group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#00c9db] to-[#0088cc] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#00c9db]/30">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl mb-2 text-white">{feature.title}</h3>
                <p className="text-[#b2c9e0]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Benefits Section - NEW */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#132f4c] via-[#0a1929] to-[#132f4c] overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#00c9db]/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">
              Proven <span className="text-[#00c9db]">Business Results</span>
            </h2>
            <p className="text-xl text-[#b2c9e0] max-w-2xl mx-auto">
              Real metrics from our nationwide deployment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 30px 80px rgba(0, 201, 219, 0.4)'
                }}
                className="text-center p-8 bg-gradient-to-br from-[#0a1929] to-[#132f4c] border-2 border-[#00c9db]/30 rounded-2xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#00c9db] to-[#0088cc] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#00c9db]/40">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl mb-3 bg-gradient-to-r from-[#00c9db] to-[#0088cc] bg-clip-text text-transparent">
                  {benefit.value}
                </div>
                <h3 className="text-xl mb-2 text-white">{benefit.title}</h3>
                <p className="text-[#b2c9e0]">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - NEW */}
      <section className="relative py-24 bg-gradient-to-b from-[#0a1929] to-[#132f4c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">
              How It <span className="text-[#00c9db]">Works</span>
            </h2>
            <p className="text-xl text-[#b2c9e0] max-w-2xl mx-auto">
              Three simple steps to fresh, hot pizza
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 items-start">
            {[
              { step: '01', title: 'Select Your Pizza', desc: 'Browse menu and customize your order on the intuitive touchscreen' },
              { step: '02', title: 'Automated Cooking', desc: 'AI-powered system prepares your pizza with precision and care' },
              { step: '03', title: 'Enjoy in Minutes', desc: 'Collect your fresh, hot pizza in under 3 minutes' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-8xl font-bold text-[#00c9db]/10 mb-4">{item.step}</div>
                <h3 className="text-2xl mb-4 text-white">{item.title}</h3>
                <p className="text-[#b2c9e0] text-lg">{item.desc}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-[#00c9db] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl md:text-5xl mb-4">Latest <span className="text-[#00c9db]">Updates</span></h2>
              <p className="text-xl text-[#b2c9e0]">Stay informed about our innovations</p>
            </div>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(0, 201, 219, 0.4)'
              }}
              onClick={() => onNavigate('blog')}
              className="hidden md:flex items-center gap-2 px-6 py-3 border-2 border-[#00c9db] rounded-lg hover:bg-[#00c9db]/10 transition-colors"
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
                  y: -8,
                  boxShadow: '0 20px 60px rgba(0, 201, 219, 0.3)'
                }}
                className="p-6 bg-gradient-to-br from-[#0a1929] to-[#132f4c] border-2 border-[#00c9db]/20 rounded-xl transition-all cursor-pointer group"
                onClick={() => onNavigate('blog')}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#00c9db]/20 text-[#00c9db] rounded-full text-sm">
                    {release.category}
                  </span>
                  <span className="text-sm text-[#b2c9e0]">{release.date}</span>
                </div>
                <h3 className="text-xl mb-3 text-white group-hover:text-[#00c9db] transition-colors">{release.title}</h3>
                <p className="text-[#b2c9e0] mb-4">{release.excerpt}</p>
                <div className="flex items-center gap-2 text-[#00c9db] group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-19 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00c9db]/20 to-[#0088cc]/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-white">Ready to Transform Your Business?</h2>
            <p className="text-xl text-[#b2c9e0] mb-8 max-w-2xl mx-auto">
              Join the future of automated food service with Pizza Anytime vending machines
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 50px rgba(0, 201, 219, 0.7)',
                background: 'linear-gradient(to right, #00e0f3, #00a8cc)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('request-access')}
              className="px-10 py-5 bg-gradient-to-r from-[#00c9db] to-[#0088cc] rounded-lg text-lg shadow-lg shadow-[#00c9db]/40"
            >
              Request a Demo
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
