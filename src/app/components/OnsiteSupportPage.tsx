import { motion } from 'motion/react';
import { Wrench, Clock, Phone, CheckCircle2, Truck, Shield, Headphones, Calendar } from 'lucide-react';

interface OnsiteSupportPageProps {
  onNavigate: (page: string) => void;
}

export function OnsiteSupportPage({ onNavigate }: OnsiteSupportPageProps) {
  const supportServices = [
    {
      icon: Wrench,
      title: 'Installation & Setup',
      description: 'Professional installation by certified technicians. We handle everything from site preparation to final testing.',
      features: ['Site assessment', 'Professional installation', 'System testing', 'Staff training']
    },
    {
      icon: Clock,
      title: '24/7 Monitoring',
      description: 'Round-the-clock remote monitoring ensures optimal performance and proactive issue resolution.',
      features: ['Real-time alerts', 'Performance tracking', 'Predictive maintenance', 'Remote diagnostics']
    },
    {
      icon: Truck,
      title: 'Preventive Maintenance',
      description: 'Regular scheduled maintenance keeps your machines running smoothly and prevents costly downtime.',
      features: ['Scheduled visits', 'Component inspection', 'Cleaning & sanitization', 'Performance optimization']
    },
    {
      icon: Phone,
      title: 'Emergency Support',
      description: 'Rapid response team available 24/7 for urgent issues. Average response time under 2 hours.',
      features: ['24/7 hotline', 'Rapid response', 'Onsite repairs', 'Parts replacement']
    }
  ];

  const supportTiers = [
    {
      name: 'Basic Support',
      description: 'Essential support for standard operations',
      features: [
        'Business hours support',
        'Email support',
        'Remote diagnostics',
        'Software updates'
      ],
      price: 'Included'
    },
    {
      name: 'Premium Support',
      description: 'Enhanced support with priority response',
      features: [
        '24/7 phone support',
        'Priority response',
        'Quarterly maintenance',
        'Dedicated account manager',
        'Performance reports'
      ],
      price: 'Custom'
    },
    {
      name: 'Enterprise Support',
      description: 'Comprehensive support for large deployments',
      features: [
        '24/7 dedicated support',
        'Onsite technician',
        'Monthly maintenance',
        'Custom SLA',
        'Advanced analytics',
        'Training programs'
      ],
      price: 'Custom'
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
              <Headphones className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-medium text-sm">Comprehensive Support</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 text-slate-900 font-bold">
              Onsite <span className="text-blue-600">Support</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Expert support services to keep your operations running smoothly
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Services Section */}
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 font-bold text-slate-900">
              Our Support <span className="text-blue-600">Services</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive support solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {supportServices.map((service, index) => (
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
                <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all">
                  <service.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl mb-4 text-slate-900 font-semibold">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Tiers Section */}
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
              Support <span className="text-blue-600">Tiers</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose the support level that fits your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`p-8 rounded-xl border-2 transition-all ${
                  index === 1 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-slate-200 hover:border-blue-600'
                }`}
              >
                <div className={`text-sm font-semibold mb-2 ${index === 1 ? 'text-blue-100' : 'text-blue-600'}`}>
                  {tier.price}
                </div>
                <h3 className={`text-2xl mb-2 font-semibold ${index === 1 ? 'text-white' : 'text-slate-900'}`}>
                  {tier.name}
                </h3>
                <p className={`mb-6 ${index === 1 ? 'text-blue-50' : 'text-slate-600'}`}>
                  {tier.description}
                </p>
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${index === 1 ? 'text-blue-200' : 'text-blue-600'}`} />
                      <span className={index === 1 ? 'text-blue-50' : 'text-slate-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="relative py-24 overflow-hidden bg-blue-600">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Shield className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold">Need Support?</h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Our support team is ready to help. Contact us anytime for assistance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href="tel:+1-800-PIZZA-24"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Support: 1-800-PIZZA-24
              </motion.a>
              <motion.button
                onClick={() => onNavigate('request-access')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border-2 border-white/50 rounded-lg hover:bg-white/10 transition-colors text-white font-semibold text-lg inline-flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Schedule Service
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

