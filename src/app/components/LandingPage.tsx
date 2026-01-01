import { motion, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, TrendingUp, Clock, DollarSign, Users, Zap, Shield, Send, User, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import vend1Image from '@/assets/vend1.png';
import { useState, useRef, useEffect } from 'react';

// Animated Counter Component
function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2 }: { value: number | string; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Handle string values like "2-3min" or "24/7"
      if (typeof value === 'string') {
        setCount(value as any);
        return;
      }

      // Animate numeric values
      const startTime = Date.now();
      const startValue = 0;
      const endValue = value as number;

      const animate = () => {
        const now = Date.now();
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
        
        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{typeof value === 'string' ? value : count}{suffix}
    </span>
  );
}

export function LandingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - redirect to request access page
    navigate('/request-access');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const benefits = [
    {
      icon: DollarSign,
      title: 'Increase Revenue',
      description: 'Generate consistent revenue 24/7 with automated pizza vending'
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'No staffing needed - fully automated operations'
    },
    {
      icon: TrendingUp,
      title: 'Scale Fast',
      description: 'Deploy multiple units quickly across locations'
    },
    {
      icon: Shield,
      title: 'Proven Technology',
      description: 'Trusted by enterprise clients nationwide'
    }
  ];

  const socialProof = [
    { value: '50+', label: 'Active Locations' },
    { value: '300%', label: 'Average ROI' },
    { value: '98%', label: 'Uptime' },
    { value: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Sales Focused */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 rounded-b-[3rem]">
        {/* Background Design */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-white/10 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-1/4 -left-1/4 w-[700px] h-[700px] bg-white/10 rounded-full"
          />
        </div>

        {/* Curved Bottom Wave Design */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff"/>
          </svg>
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-6"
              >
                <Zap className="w-4 h-4 text-white" />
                <span className="text-white font-medium text-sm">Start Generating Revenue Today</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 font-bold text-white leading-tight">
                Transform Your Business with
                <br />
                <span className="text-blue-200">Automated Pizza Vending</span>
              </h1>

              <p className="text-xl text-blue-50 mb-8 max-w-xl leading-relaxed">
                Pizza Anytime™ from High Sierra Vending turns an ordinary corner of your business into a 24-hour profit center—without locking you into someone else's rules or recipes. Our lease-to-own plan is the lowest monthly cost among major competitors, as little as $28 per day.
              </p>

              {/* Social Proof Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {socialProof.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4"
                  >
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-blue-100">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl md:text-3xl mb-6 text-white font-bold text-center">Get Started Today</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm mb-2 text-blue-50 font-medium">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-lg focus:outline-none focus:border-white focus:bg-white/30 transition-colors text-white placeholder-white/60"
                        placeholder="John"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm mb-2 text-blue-50 font-medium">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-lg focus:outline-none focus:border-white focus:bg-white/30 transition-colors text-white placeholder-white/60"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm mb-2 text-blue-50 font-medium">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-lg focus:outline-none focus:border-white focus:bg-white/30 transition-colors text-white placeholder-white/60"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-white text-blue-600 rounded-lg flex items-center justify-center gap-2 font-semibold text-lg hover:bg-blue-50 transition-colors mt-6"
                  >
                    <Send className="w-5 h-5" />
                    Submit
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Machine Image Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl mb-4 font-bold text-slate-900">
                Proven <span className="text-blue-600">Results</span>
              </h2>
              <h3 className="text-2xl md:text-3xl mb-6 font-semibold text-slate-800">
                See Your Business Grow
              </h3>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Nationwide on-site support is handled through our partnership with Bell and Howell's service network, so downtime stays minimal wherever you operate in the lower 48 states. From installation guidance to real-time monitoring and parts logistics, our team backs your team—so you can focus on serving hungry customers, not troubleshooting hardware.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-6 bg-blue-50 border-2 border-blue-100 rounded-xl"
                >
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    <AnimatedCounter value={300} suffix="%" duration={2} />
                  </div>
                  <div className="text-slate-700 font-medium">Average ROI</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-6 bg-blue-50 border-2 border-blue-100 rounded-xl"
                >
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    <AnimatedCounter value="24/7" duration={1.5} />
                  </div>
                  <div className="text-slate-700 font-medium">Operation</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="p-6 bg-blue-50 border-2 border-blue-100 rounded-xl"
                >
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    <AnimatedCounter value="2-3min" duration={1.5} />
                  </div>
                  <div className="text-slate-700 font-medium">Serve Time</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-6 bg-blue-50 border-2 border-blue-100 rounded-xl"
                >
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    <AnimatedCounter value={99} suffix="%" duration={2} />
                  </div>
                  <div className="text-slate-700 font-medium">Uptime</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={vend1Image}
                  alt="Pizza Vending Machine"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 font-bold text-slate-900">
              Why Choose <span className="text-blue-600">Pizza Anytime?</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to start generating revenue immediately
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
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
                className="p-6 bg-white border-2 border-slate-200 rounded-xl transition-all group hover:border-blue-600"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:scale-110 transition-all">
                  <benefit.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl mb-2 text-slate-900 font-semibold">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Multiple CTAs */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold">Ready to Start Generating Revenue?</h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Join successful businesses already using Pizza Anytime to increase their revenue
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/request-access')}
                className="px-10 py-5 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Request Access Now
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/roi-calculator')}
                className="px-10 py-5 border-2 border-white/50 rounded-lg hover:bg-white/10 transition-colors text-white font-semibold text-lg"
              >
                Calculate Your ROI
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/product')}
                className="px-10 py-5 border-2 border-white/50 rounded-lg hover:bg-white/10 transition-colors text-white font-semibold text-lg"
              >
                View Machine Details
              </motion.button>
            </div>
            <p className="mt-6 text-blue-100 text-sm">
              All buttons lead to our Request Access form. Get started in minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Perfect Locations Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4 font-bold text-slate-900">
              Perfect <span className="text-blue-600">Locations</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-4">
              Any high traffic location with 220V power and hungry people is perfect for your branded machine.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Gas station / travel plaza',
              'Hotel lobby or corridor',
              'Campground general store',
              'Casino gaming floor or food court',
              'Bar or pub entrance',
              'Airport terminal concourse',
              'Sports venue (stadium, arena)',
              'K-12 school cafeteria',
              'College dormitory common area',
              'Apartment-complex clubhouse',
              'Factory break room',
              'Office building lobby or cafeteria',
              'Highway rest stop / service area',
              'Train station concourse',
              'Bus terminal waiting area',
              'Shopping mall food court',
              'Outlet mall promenade',
              'Convention or expo center',
              'Hospital visitor lounge',
              'University student union',
              'Community college quad',
              'Military base exchange / commissary',
              'Truck stop diesel island lobby',
              'Ferry terminal passenger hall',
              'Cruise-ship embarkation hall',
              'Large warehouse or distribution center',
              'Corporate tech campus atrium',
              'Movie-theater megaplex lobby',
              'Bowling-alley arcade zone',
              'Theme-park midway',
              'Water-park locker-area corridor',
              'Ski-resort base lodge',
              'Beach boardwalk pavilion',
              'Zoo or aquarium courtyard',
              'Museum café annex',
              'City-center public library foyer',
              'Night-club district pedestrian strip',
              'Esports arena foyer',
              'Indoor trampoline or laser-tag park',
              'Concert hall or performing-arts center',
              'Farmers-market pavilion (seasonal)',
              'University research-park commons',
              'Logistics-hub employee lounge',
              'Call-center operations facility',
              'Car-rental center at airport',
              'Auto-dealership service lounge',
              'EV-charging superhub waiting area',
              'Large apartment mail-room vestibule',
              'Major festival or fairground (temporary placement)',
              'City parking-garage ground-floor retail nook'
            ].map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.floor(index / 3) * 0.05 }}
                className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-slate-700 text-sm">{location}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Section */}
      <section className="relative py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl mb-4 font-bold text-slate-900">
              Flexible Financing with <span className="text-blue-600">North Star Leasing</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We've partnered with North Star Leasing to make owning a Pizza Anytime vending machine more accessible than ever. Their flexible financing options are designed to fit your business's unique needs—with fast approvals, simple terms, and payment plans that work for your budget. Whether you're launching your first unit or expanding your footprint, North Star Leasing helps you get started quickly without tying up your capital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="relative py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl mb-8 text-slate-900 font-semibold">Trusted by Industry Leaders</h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                'Enterprise Clients',
                '24/7 Support',
                'Proven ROI',
                'Quick Deployment'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-slate-900 font-bold">Ready to Turn Unused Floor Space into Reliable Revenue?</h2>
            <p className="text-xl text-slate-600 mb-8">
              More advanced technology. A more flexible business model. The lowest cost of entry in the category. That's why smart operators choose Pizza Anytime. Ready to turn unused floor space into reliable revenue? Let's get baking.
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(37, 99, 235, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('request-access')}
              className="px-12 py-5 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

