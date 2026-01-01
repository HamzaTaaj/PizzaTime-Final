import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Building2, Users, Target, Award, Globe, Heart, Lightbulb, CheckCircle2 } from 'lucide-react';

export function CompanyPage() {
  const navigate = useNavigate();
  const sixPoints = [
    {
      icon: Target,
      title: 'Innovation First',
      description: 'We continuously push the boundaries of automated food service technology to deliver cutting-edge solutions.'
    },
    {
      icon: Users,
      title: 'Customer Centric',
      description: 'Our clients success is our success. We build lasting partnerships through exceptional service and support.'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'Every machine is built to the highest standards with rigorous quality control and testing procedures.'
    },
    {
      icon: Globe,
      title: 'Global Vision',
      description: 'We envision a world where fresh, quality food is accessible anytime, anywhere through automation.'
    },
    {
      icon: Heart,
      title: 'Sustainability',
      description: 'Committed to environmental responsibility through energy-efficient designs and sustainable practices.'
    },
    {
      icon: Lightbulb,
      title: 'Continuous Improvement',
      description: 'We never stop learning and improving, using data and feedback to enhance our products and services.'
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
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-medium text-sm">About Pizza Anytime</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 text-slate-900 font-bold">
              Our <span className="text-blue-600">Company</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Leading the revolution in automated food service with innovation, quality, and customer success
            </p>
          </motion.div>
        </div>
      </section>

      {/* Six Points Section */}
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
              Our Core <span className="text-blue-600">Values</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Six fundamental principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sixPoints.map((point, index) => (
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
                  <point.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl mb-4 text-slate-900 font-semibold">{point.title}</h3>
                <p className="text-slate-600 leading-relaxed">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
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
              Contact <span className="text-blue-600">Us</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get in touch with our team - we're here to help
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="p-8 bg-white border-2 border-slate-200 rounded-xl text-center hover:border-blue-600 transition-all"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl mb-4 text-slate-900 font-semibold">Email</h3>
              <p className="text-slate-600 mb-2">General Inquiries</p>
              <a href="mailto:info@pizza-vending-machine.com" className="text-blue-600 hover:underline font-medium">
                info@pizza-vending-machine.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="p-8 bg-white border-2 border-slate-200 rounded-xl text-center hover:border-blue-600 transition-all"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl mb-4 text-slate-900 font-semibold">Phone</h3>
              <p className="text-slate-600 mb-2">24/7 Support</p>
              <a href="tel:+18886991731" className="text-blue-600 hover:underline font-medium">
                (888) 699-1731
              </a>
              <p className="text-slate-600 mt-4 mb-2">Business Hours</p>
              <p className="text-slate-600 font-medium">Mon-Fri: 9AM-6PM EST</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="p-8 bg-white border-2 border-slate-200 rounded-xl text-center hover:border-blue-600 transition-all"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl mb-4 text-slate-900 font-semibold">Address</h3>
              <p className="text-slate-600 leading-relaxed">
                4600 Snyder Ave, E<br />
                Carson City, Nevada, 89701
              </p>
            </motion.div>
          </div>

          {/* Contact Form CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 bg-blue-600 rounded-2xl text-center"
          >
            <h3 className="text-2xl mb-4 text-white font-semibold">Ready to Get Started?</h3>
            <p className="text-blue-50 mb-6 max-w-2xl mx-auto">
              Fill out our request access form to begin your journey with Pizza Anytime
            </p>
            <motion.button
              onClick={() => navigate('/request-access')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Request Access
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

