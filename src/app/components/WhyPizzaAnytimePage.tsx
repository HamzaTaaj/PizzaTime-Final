import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Clock, Shield, Zap, TrendingUp, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export function WhyPizzaAnytimePage() {
  const navigate = useNavigate();
  const advantages = [
    {
      icon: Zap,
      title: 'Lightning Fast Service',
      description: 'Get fresh, hot pizza in just 2-3 minutes. No waiting, no delays, just instant satisfaction.'
    },
    {
      icon: Shield,
      title: 'Consistent Quality',
      description: 'Every pizza is made to perfection with our automated precision cooking system. Quality you can trust, every time.'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Craving pizza at 3 AM? We\'re always open. Serve customers round the clock without staffing costs.'
    },
    {
      icon: TrendingUp,
      title: 'Proven Technology',
      description: 'Advanced robotics and AI ensure consistent results. Trusted by operators worldwide.'
    },
    {
      icon: Users,
      title: 'Customer Satisfaction',
      description: 'High ratings and repeat customers. Our machines deliver experiences that keep people coming back.'
    },
    {
      icon: CheckCircle2,
      title: 'Easy to Operate',
      description: 'Simple interface, automated inventory management, and remote monitoring make operations effortless.'
    }
  ];

  const businessAdvantages = [
    'No need for trained chefs or kitchen staff',
    'Minimal space requirements compared to traditional restaurants',
    'Lower operating costs and overhead',
    'Scalable business model - deploy multiple units',
    'Real-time analytics and performance tracking',
    'Remote monitoring and maintenance support',
    'Customizable menu and branding options',
    'HACCP compliant food safety standards'
  ];

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-blue-50 rounded-b-[3rem]">
        {/* Curved Bottom Wave Design */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff"/>
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-medium text-sm">Why Choose Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 text-slate-900 font-bold">
              Why <span className="text-blue-600">Pizza Anytime</span>?
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover what makes our automated pizza vending solution the smart choice for operators and customers alike.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Six Key Advantages Section */}
      <section className="relative py-24 bg-white">
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#f8fafc"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 font-bold text-slate-900">
              Six Key <span className="text-blue-600">Advantages</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -8
                }}
                className="p-6 bg-white border-2 border-slate-200 rounded-xl transition-all group hover:border-blue-600 hover:shadow-lg"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:scale-110 transition-all shadow-md">
                  <advantage.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl mb-3 text-slate-900 font-semibold">{advantage.title}</h3>
                <p className="text-slate-600 leading-relaxed">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - HIDDEN */}
      <section className="hidden">
        {/* Testimonials content kept but hidden */}
      </section>

      {/* Image Background Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://pizza-vending-machine.vercel.app/assets/vend1-C6ea_9JZ.png)',
            backgroundSize: '70%',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
      </section>

      {/* Operational Excellence Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <span className="text-blue-600 font-medium text-sm uppercase tracking-wide">Business Benefits</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl mb-6 font-bold text-slate-900 text-left"
              >
                Operational <span className="text-blue-600">Excellence</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-slate-600 mb-8"
              >
                Our solution is designed to maximize efficiency and minimize complexity, giving you more time to focus on growing your business.
              </motion.p>
            </motion.div>

            {/* Right Column - Advantages List */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {businessAdvantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="flex items-start gap-4 p-4 bg-white border border-slate-200/50 rounded-xl"
                >
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-slate-700 leading-relaxed">{advantage}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-blue-600">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold">Join the Pizza Anytime Network</h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Join the Pizza Anytime network and transform your food service operation
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/product')}
                className="px-10 py-5 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
              >
                View Machine Details
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="px-10 py-5 border-2 border-white/50 rounded-lg hover:bg-white/10 transition-colors text-white font-semibold text-lg"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
