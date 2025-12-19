import { motion } from 'motion/react';
import { Cpu, Thermometer, Gauge, Wifi, Shield, Wrench, Package, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import vend1Video from '@/assets/vend.mp4';
import vend1Image from '@/assets/draw2.png';

export function ProductPage() {
  const specs = [
    { label: 'Dimensions', value: '72" H × 48" W × 36" D', position: 'left-top' },
    { label: 'Weight', value: '850 lbs', position: 'left-middle' },
    { label: 'Power', value: '220V / 20A', position: 'left-bottom' },
    { label: 'Capacity', value: '70 pizzas', position: 'right-top' },
    { label: 'Cook Time', value: '2-3 minutes', position: 'right-middle' },
    { label: 'Operating Temp', value: '35-95°F', position: 'right-bottom' }
  ];

  const features = [
    {
      icon: Cpu,
      title: 'AI-Powered Cooking',
      description: 'Machine learning algorithms optimize cooking time and temperature for perfect results'
    },
    {
      icon: Thermometer,
      title: 'Temperature Control',
      description: 'Precision heating system maintains optimal cooking conditions'
    },
    {
      icon: Gauge,
      title: 'Real-time Monitoring',
      description: 'Live performance metrics and inventory tracking via cloud dashboard'
    },
    {
      icon: Wifi,
      title: 'IoT Connected',
      description: 'Remote diagnostics and over-the-air software updates'
    },
    {
      icon: Shield,
      title: 'Food Safety',
      description: 'HACCP compliant with automated sanitation cycles'
    },
    {
      icon: Wrench,
      title: 'Easy Maintenance',
      description: 'Modular design with quick-access service panels'
    }
  ];

  const techHighlights = [
    {
      icon: Package,
      title: 'Automated Inventory',
      description: 'Smart sensors track ingredient levels and send alerts for restocking'
    },
    {
      icon: Zap,
      title: 'Energy Efficient',
      description: 'Energy Star certified with eco-mode for low-traffic periods'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1929] via-[#132f4c] to-[#0a1929] overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00c9db]/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Product Image - BIGGER */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#00c9db]/40 shadow-2xl shadow-[#00c9db]/30">
                <video
                  src={vend1Video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[600px] object-cover"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#00c9db]/30 to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 px-6 py-3 bg-gradient-to-r from-[#00c9db] to-[#0088cc] rounded-full shadow-lg shadow-[#00c9db]/50"
              >
                <span className="text-sm">White Label Ready</span>
              </motion.div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00c9db]/20 border border-[#00c9db]/30 rounded-full mb-6">
                <span className="text-[#00c9db]">Enterprise Solution</span>
              </div>

              <h1 className="text-5xl md:text-6xl mb-6 text-white">
                PizzaMatic <span className="text-[#00c9db]">Pro X1</span>
              </h1>

              <p className="text-xl text-[#b2c9e0] mb-8 leading-relaxed">
                The ultimate automated pizza vending solution designed for high-traffic locations. Combining cutting-edge robotics, AI technology, and premium food preparation systems.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-[#0a1929] border-2 border-[#00c9db]/30 rounded-lg">
                  <div className="text-3xl text-[#00c9db] mb-1">70</div>
                  <div className="text-sm text-[#b2c9e0]">Pizza Capacity</div>
                </div>
                <div className="p-4 bg-[#0a1929] border-2 border-[#00c9db]/30 rounded-lg">
                  <div className="text-3xl text-[#00c9db] mb-1">24/7</div>
                  <div className="text-sm text-[#b2c9e0]">Operation</div>
                </div>
                <div className="p-4 bg-[#0a1929] border-2 border-[#00c9db]/30 rounded-lg">
                  <div className="text-3xl text-[#00c9db] mb-1">2-3min</div>
                  <div className="text-sm text-[#b2c9e0]">Cook Time</div>
                </div>
                <div className="p-4 bg-[#0a1929] border-2 border-[#00c9db]/30 rounded-lg">
                  <div className="text-3xl text-[#00c9db] mb-1">IoT</div>
                  <div className="text-sm text-[#b2c9e0]">Connected</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 40px rgba(0, 201, 219, 0.6)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#00c9db] to-[#0088cc] rounded-lg shadow-lg shadow-[#00c9db]/40"
                >
                  Request Quote
                </motion.button>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: '#00c9db',
                    backgroundColor: 'rgba(0, 201, 219, 0.1)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-[#00c9db]/50 rounded-lg transition-colors"
                >
                  Schedule Demo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Specifications with Machine in Center */}
      <section className="py-32 bg-gradient-to-b from-[#132f4c] to-[#0a1929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-white">
              Technical <span className="text-[#00c9db]">Specifications</span>
            </h2>
            <p className="text-xl text-[#b2c9e0]">Detailed product specifications</p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Machine in Center - BIGGER AND MORE PLAYFUL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative mx-auto w-full max-w-2xl"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotateY: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative rounded-3xl overflow-hidden border-4 border-[#00c9db]/60 shadow-2xl shadow-[#00c9db]/50"
              >
                <ImageWithFallback
                  src={vend1Image}
                  alt="PizzaMatic Pro X1 Specifications"
                  className="w-full py-4 h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929]/60 to-transparent" />
              </motion.div>

              {/* Left Side Specs with Lines */}
              <div className="absolute left-0 top-1/4 -translate-x-full pr-8 hidden lg:block">
                {specs.slice(0, 3).map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-16 relative"
                  >
                    <div className="text-right">
                      <div className="inline-block px-6 py-4 bg-[#132f4c] border-2 border-[#00c9db]/40 rounded-xl shadow-lg">
                        <div className="text-sm text-[#b2c9e0] mb-1">{spec.label}</div>
                        <div className="text-xl text-white">{spec.value}</div>
                      </div>
                    </div>
                    {/* Connection Line */}
                    <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-gradient-to-r from-[#00c9db] to-transparent" />
                    <div className="absolute top-1/2 -right-8 w-2 h-2 bg-[#00c9db] rounded-full" />
                  </motion.div>
                ))}
              </div>

              {/* Right Side Specs with Lines */}
              <div className="absolute right-0 top-1/4 translate-x-full pl-8 hidden lg:block">
                {specs.slice(3, 6).map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-16 relative"
                  >
                    <div className="text-left">
                      <div className="inline-block px-6 py-4 bg-[#132f4c] border-2 border-[#00c9db]/40 rounded-xl shadow-lg">
                        <div className="text-sm text-[#b2c9e0] mb-1">{spec.label}</div>
                        <div className="text-xl text-white">{spec.value}</div>
                      </div>
                    </div>
                    {/* Connection Line */}
                    <div className="absolute top-1/2 -left-8 w-8 h-0.5 bg-gradient-to-l from-[#00c9db] to-transparent" />
                    <div className="absolute top-1/2 -left-8 w-2 h-2 bg-[#00c9db] rounded-full" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mobile Specs */}
            <div className="lg:hidden mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-6 py-4 bg-[#132f4c] border-2 border-[#00c9db]/40 rounded-xl"
                >
                  <div className="text-sm text-[#b2c9e0] mb-1">{spec.label}</div>
                  <div className="text-lg text-white">{spec.value}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* White Label Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 max-w-4xl mx-auto p-8 bg-[#00c9db]/10 border-2 border-[#00c9db]/30 rounded-2xl"
          >
            <h3 className="text-2xl mb-4 text-white">White Label Customization</h3>
            <p className="text-[#b2c9e0] mb-6 text-lg">
              Fully customizable branding options available. Add your logo, color scheme, and custom UI elements to match your brand identity.
            </p>
            <ul className="grid md:grid-cols-2 gap-4 text-[#b2c9e0]">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#00c9db] rounded-full" />
                Custom exterior wraps and graphics
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#00c9db] rounded-full" />
                Branded touchscreen interface
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#00c9db] rounded-full" />
                Custom receipt and packaging branding
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#00c9db] rounded-full" />
                Integration with your mobile app
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Advanced Technology Section - MOVED TO LAST */}
      <section className="py-24 bg-gradient-to-b from-[#0a1929] to-[#132f4c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-white">
              Advanced <span className="text-[#00c9db]">Technology</span>
            </h2>
            <p className="text-xl text-[#b2c9e0] max-w-2xl mx-auto">
              Built with enterprise-grade components and intelligent systems
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 60px rgba(0, 201, 219, 0.4)'
                }}
                className="p-6 bg-gradient-to-br from-[#0a1929] to-[#132f4c] border-2 border-[#00c9db]/30 rounded-xl transition-all group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#00c9db] to-[#0088cc] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#00c9db]/40">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl mb-3 text-white">{feature.title}</h3>
                <p className="text-[#b2c9e0]">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Additional Tech Highlights */}
          <div className="grid md:grid-cols-2 gap-6">
            {techHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-8 bg-gradient-to-r from-[#00c9db]/10 to-[#0088cc]/10 border-2 border-[#00c9db]/40 rounded-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00c9db] to-[#0088cc] rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00c9db]/40">
                    <highlight.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-white">{highlight.title}</h3>
                    <p className="text-[#b2c9e0]">{highlight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00c9db]/20 to-[#0088cc]/20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-white">Ready to Deploy?</h2>
            <p className="text-xl text-[#b2c9e0] mb-8">
              Contact our team to discuss pricing, installation, and customization options
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 50px rgba(0, 201, 219, 0.7)'
                }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-[#00c9db] to-[#0088cc] rounded-lg text-lg shadow-lg shadow-[#00c9db]/40"
              >
                Contact Sales
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  borderColor: '#00c9db',
                  backgroundColor: 'rgba(0, 201, 219, 0.1)'
                }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border-2 border-[#00c9db]/50 rounded-lg transition-colors text-lg"
              >
                Download Brochure
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
