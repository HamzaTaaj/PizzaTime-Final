import { motion, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, CheckCircle2, TrendingUp, Clock, DollarSign, Users, Zap, Shield, 
  Send, User, Mail, Phone, Cpu, Thermometer, Gauge, Wifi, Wrench, Package, 
  Calculator, Calendar, X
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import vend1Image from '@/assets/vend1.png';
import bellHowellLogo from '@/assets/BellAndHowell2.svg';

// Animated Counter Component
function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2 }: { value: number | string; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      if (typeof value === 'string') {
        setCount(value as any);
        return;
      }

      const startTime = Date.now();
      const startValue = 0;
      const endValue = value as number;

      const animate = () => {
        const now = Date.now();
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        
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

// CTA Popup Component
function CTAPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/request-access');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-white border-slate-200">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold text-slate-900 pr-8">Get Started Today</DialogTitle>
          <DialogClose asChild>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#f1f5f9' }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-0 right-0 p-2 text-slate-500 hover:text-slate-900 rounded-lg transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </DialogClose>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="popup-firstName" className="block text-sm mb-2 text-slate-700 font-medium">
              First Name *
            </label>
            <input
              type="text"
              id="popup-firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400"
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="popup-lastName" className="block text-sm mb-2 text-slate-700 font-medium">
              Last Name *
            </label>
            <input
              type="text"
              id="popup-lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400"
              placeholder="Doe"
            />
          </div>
          <div>
            <label htmlFor="popup-email" className="block text-sm mb-2 text-slate-700 font-medium">
              Email *
            </label>
            <input
              type="email"
              id="popup-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="popup-phone" className="block text-sm mb-2 text-slate-700 font-medium">
              Phone *
            </label>
            <input
              type="tel"
              id="popup-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 placeholder-slate-400"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 font-semibold text-lg hover:bg-blue-700 transition-colors mt-6"
          >
            <Send className="w-5 h-5" />
            Submit
          </motion.button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function MarketingPage() {
  const navigate = useNavigate();
  const [showCTAPopup, setShowCTAPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/request-access');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const specs = [
    { label: 'Dimensions', value: '71" L × 38" W × 89" H', position: 'left-top' },
    { label: 'Net Weight', value: '1,433 lbs', position: 'left-middle' },
    { label: 'Power', value: '208V / 40A (8,700W)', position: 'left-bottom' },
    { label: 'Pizza Capacity', value: '69 pizzas', position: 'right-top' },
    { label: 'Screen Size', value: '55 inches', position: 'right-middle' },
    { label: 'Pizza Size', value: '12 inches', position: 'right-bottom' }
  ];

  // Cash Flow Calculator State
  const [calculatorInputs, setCalculatorInputs] = useState({
    pricePerPizza: 12,
    costOfGoods: 2.50,
    pizzasPerDay: 20,
    operatingDays: 30,
    machineCost: 50000,
    rent: 0,
    revenueShare: 0
  });

  const calculateROI = () => {
    const monthlyRevenue = calculatorInputs.pricePerPizza * calculatorInputs.pizzasPerDay * calculatorInputs.operatingDays;
    const costOfGoodsTotal = calculatorInputs.costOfGoods * calculatorInputs.pizzasPerDay * calculatorInputs.operatingDays;
    const revenueShareCost = calculatorInputs.revenueShare > 0 ? (monthlyRevenue * calculatorInputs.revenueShare / 100) : 0;
    const monthlyCosts = costOfGoodsTotal + calculatorInputs.rent + revenueShareCost;
    const monthlyProfit = monthlyRevenue - monthlyCosts;
    const annualProfit = monthlyProfit * 12;
    const roiPercentage = ((annualProfit - calculatorInputs.machineCost) / calculatorInputs.machineCost) * 100;
    const paybackMonths = monthlyProfit > 0 ? calculatorInputs.machineCost / monthlyProfit : 0;

    return {
      monthlyRevenue,
      monthlyCosts,
      monthlyProfit,
      annualProfit,
      roiPercentage,
      paybackMonths
    };
  };

  const calculatorResults = calculateROI();

  const handleCalculatorInputChange = (field: string, value: number) => {
    setCalculatorInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header with Phone Number Field */}
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
            </motion.div>

            {/* Right Content - Form with Phone */}
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

                  <div>
                    <label htmlFor="phone" className="block text-sm mb-2 text-blue-50 font-medium">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-lg focus:outline-none focus:border-white focus:bg-white/30 transition-colors text-white placeholder-white/60"
                        placeholder="+1 (555) 123-4567"
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

      {/* 2. Technical Specifications */}
      <section className="relative py-24 bg-white">
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#f8fafc" />
          </svg>
        </div>
        {/* Curved Bottom Wave Design */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f1f5f9" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 80, rotateX: -20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ perspective: "1000px" }}
            className="text-center mb-20"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ perspective: "1000px" }}
              className="text-4xl md:text-5xl mb-4 text-slate-900 font-bold"
            >
              Technical <span className="text-blue-600">Specifications</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              style={{ perspective: "1000px" }}
              className="text-xl text-slate-600"
            >
              Every detail is mentioned in the user manual.{' '}
              <motion.button
                onClick={() => navigate('/manual')}
                className="text-blue-600 hover:text-blue-700 underline font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                View User Manual
              </motion.button>
            </motion.p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Machine in Center */}
            <motion.div
              initial={{ opacity: 0, y: 80, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ perspective: "1000px" }}
              className="relative mx-auto w-full max-w-2xl"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-slate-100 rounded-2xl"></div>
                <div className="relative bg-white rounded-xl mx-6 my-6 p-8 border-2 border-slate-200">
                  <div className="absolute inset-0 rounded-xl border border-slate-100 pointer-events-none"></div>
                  <div className="relative bg-slate-50 rounded-lg p-0 border border-slate-200">
                    <div className="relative">
                      <ImageWithFallback
                        src={vend1Image}
                        alt="PizzaMatic Pro X1 Specifications"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Left Side Specs */}
              <div className="absolute left-0 top-1/4 -translate-x-full pr-8 hidden lg:block">
                {specs.slice(0, 3).map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 80, rotateX: -20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + index * 0.1 }}
                    style={{ perspective: "1000px" }}
                    className="mb-16 relative"
                  >
                    <div className="text-right">
                      <div className="inline-block px-6 py-4 bg-white border-2 border-slate-200 rounded-xl shadow-lg">
                        <div className="text-sm text-slate-500 mb-1 font-medium">{spec.label}</div>
                        <div className="text-xl text-slate-900 font-semibold">{spec.value}</div>
                      </div>
                    </div>
                    <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-gradient-to-r from-blue-200 to-transparent" />
                    <div className="absolute top-1/2 -right-8 w-2 h-2 bg-blue-600 rounded-full" />
                  </motion.div>
                ))}
              </div>

              {/* Right Side Specs */}
              <div className="absolute right-0 top-1/4 translate-x-full pl-8 hidden lg:block">
                {specs.slice(3, 6).map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 80, rotateX: -20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + index * 0.1 }}
                    style={{ perspective: "1000px" }}
                    className="mb-16 relative"
                  >
                    <div className="text-left">
                      <div className="inline-block px-6 py-4 bg-white border-2 border-slate-200 rounded-xl shadow-lg">
                        <div className="text-sm text-slate-500 mb-1 font-medium">{spec.label}</div>
                        <div className="text-xl text-slate-900 font-semibold">{spec.value}</div>
                      </div>
                    </div>
                    <div className="absolute top-1/2 -left-8 w-8 h-0.5 bg-gradient-to-l from-blue-200 to-transparent" />
                    <div className="absolute top-1/2 -left-8 w-2 h-2 bg-blue-600 rounded-full" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mobile Specs */}
            <div className="lg:hidden mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + index * 0.1 }}
                  style={{ perspective: "1000px" }}
                  className="px-6 py-4 bg-white border-2 border-slate-200 rounded-xl shadow-sm"
                >
                  <div className="text-sm text-slate-500 mb-1 font-medium">{spec.label}</div>
                  <div className="text-lg text-slate-900 font-semibold">{spec.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Proven Results */}
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

      {/* 4. Ready to Start with CTA Popup and Cash Flow Calculator Button */}
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
                onClick={() => setShowCTAPopup(true)}
                className="px-10 py-5 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Request Access Now
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.getElementById('cash-flow-calculator');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-5 border-2 border-white/50 rounded-lg hover:bg-white/10 transition-colors text-white font-semibold text-lg"
              >
                Calculate Your ROI
              </motion.button>
            </div>
            <p className="mt-6 text-blue-100 text-sm">
              All buttons lead to our Request Access form. Get started in minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. NAMA Compliance */}
      <section className="relative py-24 bg-slate-50">
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#ffffff" />
          </svg>
        </div>
        {/* Curved Bottom Wave Design */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#2563eb" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-slate-900 font-bold">
              NAMA <span className="text-blue-600">Compliance</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Certified compliance with National Automatic Merchandising Association (NAMA) standards
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Shield,
                title: 'Food Safety Compliant',
                description: 'Full HACCP and NAMA food safety certifications ensuring highest hygiene standards'
              },
              {
                icon: Thermometer,
                title: 'Temperature Controlled',
                description: 'Precise temperature monitoring and control systems maintain food safety requirements'
              },
              {
                icon: Wrench,
                title: 'Easy-to-Clean Design',
                description: 'Accessible components and surfaces designed for thorough cleaning and sanitization'
              },
              {
                icon: Package,
                title: 'Commercial-Grade Build',
                description: 'NAMA-certified commercial construction meets industry standards for durability'
              },
              {
                icon: Shield,
                title: 'Secure Access Control',
                description: 'Advanced security features protect inventory and ensure authorized access only'
              },
              {
                icon: CheckCircle2,
                title: 'Reliable Operation',
                description: 'Built to NAMA specifications for consistent, dependable 24/7 performance'
              }
            ].map((feature, index) => (
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
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:scale-110 transition-all">
                  <feature.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl mb-3 text-slate-900 font-semibold">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Bell and Howell */}
      <section className="relative py-24 bg-white">
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#f8fafc" />
          </svg>
        </div>
        {/* Curved Bottom Wave Design */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f1f5f9" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 80, rotateX: -20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ perspective: "1000px" }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl mb-6 font-bold text-slate-900">
                Nationwide Support by <span className="text-blue-600">Bell & Howell</span>
              </h2>
              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                High Sierra Vending partners with Bell & Howell's nationwide technician network to provide rapid, on-site support for every Pizza Anytime™ machine across the lower 48 states.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Coast-to-coast service coverage',
                  'Rapid response times for critical issues',
                  'Certified technicians trained on our systems',
                  'Complete parts and labor warranty',
                  'Email and phone support for machine lifetime',
                  'Preventive maintenance programs'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right Content - Logo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="p-12 bg-white border-2 border-slate-200 rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="bg-white rounded-xl p-6 w-full max-w-xs flex items-center justify-center">
                      <img 
                        src={bellHowellLogo} 
                        alt="Bell & Howell Logo" 
                        className="w-full h-auto max-h-20 object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Trusted nationwide service partner providing professional on-site technical support and maintenance for all Pizza Anytime vending machines.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 8. Cash Flow Calculator with CTA Pop-up */}
      <section id="cash-flow-calculator" className="relative py-24 bg-white">
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
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-medium text-sm">Cash Flow Calculator</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-slate-900 font-bold">
              Calculate Your <span className="text-blue-600">ROI</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Estimate your return on investment with our interactive calculator
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl mb-8 text-slate-900 font-bold">Enter Your Details</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm mb-2 text-slate-700 font-medium">
                    Price per Pizza ($)
                  </label>
                  <input
                    type="number"
                    value={calculatorInputs.pricePerPizza}
                    onChange={(e) => handleCalculatorInputChange('pricePerPizza', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-slate-700 font-medium">
                    Cost of Goods per Pizza ($)
                  </label>
                  <input
                    type="number"
                    min="2.50"
                    step="0.01"
                    value={calculatorInputs.costOfGoods}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 2.50;
                      handleCalculatorInputChange('costOfGoods', value < 2.50 ? 2.50 : value);
                    }}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900"
                  />
                  <p className="text-xs text-slate-500 mt-1">Minimum: $2.50</p>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-slate-700 font-medium">
                    Pizzas per Day
                  </label>
                  <input
                    type="number"
                    value={calculatorInputs.pizzasPerDay}
                    onChange={(e) => handleCalculatorInputChange('pizzasPerDay', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-slate-700 font-medium">
                    Operating Days per Month
                  </label>
                  <input
                    type="number"
                    value={calculatorInputs.operatingDays}
                    onChange={(e) => handleCalculatorInputChange('operatingDays', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-slate-700 font-medium">
                    Monthly Rent ($)
                  </label>
                  <input
                    type="number"
                    value={calculatorInputs.rent}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      handleCalculatorInputChange('rent', value);
                      if (value > 0) {
                        handleCalculatorInputChange('revenueShare', 0);
                      }
                    }}
                    disabled={calculatorInputs.revenueShare > 0}
                    className={`w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 ${
                      calculatorInputs.revenueShare > 0 ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-slate-700 font-medium">
                    Revenue Share (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={calculatorInputs.revenueShare}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      handleCalculatorInputChange('revenueShare', value);
                      if (value > 0) {
                        handleCalculatorInputChange('rent', 0);
                      }
                    }}
                    disabled={calculatorInputs.rent > 0}
                    className={`w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-slate-900 ${
                      calculatorInputs.rent > 0 ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''
                    }`}
                  />
                </div>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl mb-8 text-slate-900 font-bold">Your Results</h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                    <h4 className="text-lg text-slate-700 font-medium">Monthly Revenue</h4>
                  </div>
                  <div className="text-4xl font-bold text-blue-600">
                    ${calculatorResults.monthlyRevenue.toLocaleString()}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-2 border-slate-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-6 h-6 text-slate-600" />
                    <h4 className="text-lg text-slate-700 font-medium">Monthly Costs</h4>
                  </div>
                  <div className="text-4xl font-bold text-slate-700">
                    ${calculatorResults.monthlyCosts.toLocaleString()}
                  </div>
                </div>

                <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    <h4 className="text-lg text-slate-700 font-medium">Monthly Profit</h4>
                  </div>
                  <div className="text-4xl font-bold text-green-600">
                    ${calculatorResults.monthlyProfit.toLocaleString()}
                  </div>
                </div>

                <div className={`p-6 border-2 rounded-xl ${
                  calculatorResults.roiPercentage > 0 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className={`w-6 h-6 ${calculatorResults.roiPercentage > 0 ? 'text-green-600' : 'text-red-600'}`} />
                    <h4 className="text-lg text-slate-700 font-medium">ROI Percentage</h4>
                  </div>
                  <div className={`text-4xl font-bold ${calculatorResults.roiPercentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {calculatorResults.roiPercentage.toFixed(1)}%
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCTAPopup(true)}
                className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. Flexible Financing with North Star Leasing */}
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

      {/* 10. Ready to Turn Unused Floor Space with CTA and Background like Header with Wave Styling */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900">
        {/* Wave Styling at Top */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#f1f5f9"/>
          </svg>
        </div>
        {/* Wave Styling at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff"/>
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold">Ready to Turn Unused Floor Space into Reliable Revenue?</h2>
            <p className="text-xl text-blue-50 mb-8">
              More advanced technology. A more flexible business model. The lowest cost of entry in the category. That's why smart operators choose Pizza Anytime. Ready to turn unused floor space into reliable revenue? Let's get baking.
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(37, 99, 235, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCTAPopup(true)}
              className="px-12 py-5 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CTA Popup */}
      <CTAPopup isOpen={showCTAPopup} onClose={() => setShowCTAPopup(false)} />
    </div>
  );
}
