import { motion } from 'motion/react';
import { Clock, DollarSign, TrendingUp, Shield, Zap, Users, CheckCircle2, ArrowRight } from 'lucide-react';

interface WhyPizzaAnytimePageProps {
  onNavigate: (page: string) => void;
}

export function WhyPizzaAnytimePage({ onNavigate }: WhyPizzaAnytimePageProps) {
  const reasons = [
    {
      icon: Clock,
      title: '24/7 Operations',
      description: 'Never miss a sale. Our machines operate around the clock, generating revenue even when your business is closed.',
      stats: '24/7'
    },
    {
      icon: DollarSign,
      title: 'Proven ROI',
      description: 'Average 300% return on investment within the first year. Real numbers from real businesses.',
      stats: '300% ROI'
    },
    {
      icon: Zap,
      title: 'Quick Deployment',
      description: 'Get up and running in days, not months. Our streamlined installation process minimizes downtime.',
      stats: '< 3 Days'
    },
    {
      icon: Shield,
      title: 'Enterprise Reliability',
      description: 'Built for high-traffic environments with 98% uptime and comprehensive support coverage.',
      stats: '98% Uptime'
    },
    {
      icon: TrendingUp,
      title: 'Scalable Growth',
      description: 'Start with one unit and scale as your business grows. Flexible deployment options for any size operation.',
      stats: 'Unlimited Scale'
    },
    {
      icon: Users,
      title: 'Zero Staffing Costs',
      description: 'Fully automated operations mean no labor costs, no scheduling headaches, and consistent service quality.',
      stats: '0% Labor'
    }
  ];

  const testimonials = [
    {
      quote: 'Pizza Anytime transformed our revenue stream. We\'re seeing consistent sales even during off-hours.',
      author: 'Sarah Johnson',
      role: 'Operations Manager, Tech Corp'
    },
    {
      quote: 'The ROI exceeded our expectations. Within 8 months, we had recouped our initial investment.',
      author: 'Michael Chen',
      role: 'CFO, Campus Dining Services'
    },
    {
      quote: 'Reliability is unmatched. We\'ve had zero downtime issues in over a year of operation.',
      author: 'Emily Rodriguez',
      role: 'Facility Director, Transit Hub'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Header */}
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
              Why <span className="text-blue-600">Pizza Anytime?</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover the compelling reasons why businesses choose Pizza Anytime for automated food service
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reasons Section */}
      <section className="relative py-24 bg-white">
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#f8fafc"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -4,
                  borderColor: '#2563eb'
                }}
                className="p-8 bg-white border-2 border-slate-200 rounded-xl transition-all group hover:border-blue-600"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all">
                    <reason.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
                    {reason.stats}
                  </span>
                </div>
                <h3 className="text-2xl mb-4 text-slate-900 font-semibold">{reason.title}</h3>
                <p className="text-slate-600 leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 bg-slate-50">
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#ffffff"/>
          </svg>
        </div>
        {/* Curved Bottom Wave Design */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff"/>
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 font-bold text-slate-900">
              What Our <span className="text-blue-600">Clients Say</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real feedback from businesses using Pizza Anytime
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-8 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-600 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.author}</p>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold">Ready to Experience the Difference?</h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Join the growing number of businesses choosing Pizza Anytime for automated food service excellence
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('request-access')}
                className="px-10 py-5 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
              >
                Request Access
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('roi-calculator')}
                className="px-10 py-5 border-2 border-white/50 rounded-lg hover:bg-white/10 transition-colors text-white font-semibold text-lg"
              >
                Calculate ROI
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

