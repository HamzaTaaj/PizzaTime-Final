import { motion, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Zap, Clock, Shield, TrendingUp, ArrowRight, Building2, DollarSign, Users, Globe, BarChart3, Award, CheckCircle2, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import vend1Image from '@/assets/vend1.png';
import { useRef, useEffect, useState } from 'react';

// Letter-by-letter animation component
function AnimatedTitle({ text, className = '', highlightText = '', highlightClassName = '' }: { text: string; className?: string; highlightText?: string; highlightClassName?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const parts = text.split(highlightText);
  let charIndex = 0;

  return (
    <h2 ref={ref} className={className}>
      {parts.map((part, partIndex) => (
        <span key={partIndex}>
          {part.split('').map((char) => {
            const currentIndex = charIndex++;
            return (
              <motion.span
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.3,
                  delay: 0.2 + (currentIndex * 0.02)
                }}
                style={{ display: 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            );
          })}
          {partIndex < parts.length - 1 && (
            <span className={highlightClassName}>
              {highlightText.split('').map((char) => {
                const currentIndex = charIndex++;
                return (
                  <motion.span
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.2 + (currentIndex * 0.02)
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                );
              })}
            </span>
          )}
        </span>
      ))}
    </h2>
  );
}

// Animated Counter Component
function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2 }: { value: number | string; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Handle string values like "50+" or percentages
      if (typeof value === 'string') {
        // Extract number from strings like "300%", "98%", "50+", "45%"
        const match = value.match(/(\d+)/);
        if (match) {
          const numValue = parseInt(match[1]);
          const hasPlus = value.includes('+');
          const hasPercent = value.includes('%');
          
          const startTime = Date.now();
          const startValue = 0;
          const endValue = numValue;

          const animate = () => {
            const now = Date.now();
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
            
            setCount(currentValue as any);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value as any);
            }
          };

          requestAnimationFrame(animate);
        } else {
          setCount(value as any);
        }
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

  // For string values with numbers, format the display
  if (typeof value === 'string' && typeof count === 'number') {
    const hasPlus = value.includes('+');
    const hasPercent = value.includes('%');
    return (
      <span ref={ref}>
        {prefix}{count}{hasPercent ? '%' : ''}{hasPlus ? '+' : ''}{suffix}
      </span>
    );
  }

  return (
    <span ref={ref}>
      {prefix}{typeof value === 'string' ? value : count}{suffix}
    </span>
  );
}

export function HomePage() {
  const navigate = useNavigate();
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
      excerpt: 'Revolutionary vending technology brings fresh pizza to transit hubs and corporate campuses.',
      category: 'Expansion',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
      imageAlt: 'Pizza/food service image from Unsplash'
    },
    {
      date: 'Nov 28, 2025',
      title: 'Innovation Award: Best Automated Food Service 2025',
      excerpt: 'Industry recognition for pioneering smart vending machine technology.',
      category: 'Awards',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop',
      imageAlt: 'Pizza/food image from Unsplash'
    },
    {
      date: 'Nov 10, 2025',
      title: 'Partnership with Leading Food Chains Announced',
      excerpt: 'Strategic collaboration to revolutionize quick-service restaurant industry.',
      category: 'Partnership',
      image: 'https://images.unsplash.com/photo-1571066811602-716837d681de?w=600&h=400&fit=crop',
      imageAlt: 'Pizza/food image from Unsplash'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#0f172a] rounded-b-[3rem]">
        {/* Attractive Background Design */}
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
            className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-[#2563eb] rounded-full"
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
            className="absolute -bottom-1/4 -left-1/4 w-[700px] h-[700px] bg-[#3b82f6] rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.06, 0.10, 0.06],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#60a5fa] rounded-full"
          />
        </div>

        {/* Curved Bottom Wave Design */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff" />
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e293b] border border-[#2563eb]/30 rounded-full mb-6"
              >
                <Building2 className="w-4 h-4 text-[#60a5fa]" />
                <span className="text-[#60a5fa] font-medium text-sm">Enterprise Solutions</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 font-bold text-white leading-tight">
                Automated Food
                <br />
                <span className="text-[#60a5fa]">Service Excellence</span>
              </h1>

              <p className="text-xl text-[#cbd5e1] mb-8 max-w-xl leading-relaxed">
                Pizza Anytime™ from High Sierra Vending turns an ordinary corner of your business into a 24-hour profit center—without locking you into someone else's rules or recipes. Our lease-to-own plan is the lowest monthly cost among major competitors, as little as $28 per day, so you start earning margin from day one while building equity in the machine itself.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <motion.button
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/request-access')}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg flex items-center gap-2 group font-medium"
                >
                  Request Access
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>

            {/* Right Content - Machine Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <div className="relative z-10 scale-110">
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
                className="absolute -top-6 -right-6 px-6 py-4 bg-white border border-slate-200 rounded-xl"
              >
                <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                <div className="text-sm text-slate-600 font-medium">Locations</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 px-6 py-4 bg-white border border-slate-200 rounded-xl"
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
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          {/* <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#0f172a"/>
          </svg> */}
        </div>
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
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#ffffff" />
          </svg>
        </div>
        {/* Curved Bottom Wave Design */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff" />
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
                  scale: 1.03
                }}
                className="text-center p-8 bg-white border border-slate-200 rounded-2xl transition-all"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-5xl mb-3 font-bold text-blue-600">
                  <AnimatedCounter value={benefit.value} duration={2} />
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
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#f1f5f9" />
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
                <div className="text-8xl font-bold text-[#2563eb] mb-4">{item.step}</div>
                <h3 className="text-2xl mb-4 text-slate-900 font-semibold">{item.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{item.desc}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-blue-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
        {/* Curved Bottom Wave Design */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f1f5f9" />
          </svg>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section id="blog" className="relative py-24 bg-slate-50 overflow-hidden">
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#ffffff" />
          </svg>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <AnimatedTitle 
                text="Latest Updates" 
                className="text-4xl md:text-5xl mb-4 font-bold text-slate-900"
                highlightText="Updates"
                highlightClassName="text-blue-600"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xl text-slate-600 mt-4"
              >
                Stay informed about our innovations
              </motion.p>
            </div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{
                scale: 1.02
              }}
              onClick={() => navigate('/blog')}
              className="hidden md:inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600/90 transition-all shadow-md hover:shadow-lg group mt-6 md:mt-0"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressReleases.map((release, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                whileHover={{
                  y: -4
                }}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all cursor-pointer group hover:border-blue-600 hover:shadow-lg"
                onClick={() => navigate('/blog')}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={release.image}
                    alt={release.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content Container */}
                <div className="p-6">
                  {/* Category Badge and Date */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-sm font-medium">
                      {release.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span className="text-xs text-slate-500">{release.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-slate-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                    {release.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {release.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:gap-3 transition-all group/link">
                    Read More
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.article>
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
            <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold">Ready to Transform Your Operations?</h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Discover how enterprise-grade automated food service solutions can drive efficiency and growth
            </p>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('request-access')}
              className="px-10 py-5 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Request Access
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
