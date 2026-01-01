import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Download, FileText, BookOpen, HelpCircle, CheckCircle } from 'lucide-react';
import { fadeInUp, staggerContainer, viewportConfig, scaleUp } from '../utils/animations';

export function ManualPage() {
  const navigate = useNavigate();

  const handleDownload = () => {
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = '/Smart+Pizza+Vending+Machine+draft+manual+EN-Monsterrat-Font-Update20251218.pdf';
    link.download = 'Smart+Pizza+Vending+Machine+draft+manual+EN-Monsterrat-Font-Update20251218.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const faqs = [
    {
      question: 'What file format is the manual available in?',
      answer: 'The user manual is provided in PDF format for easy viewing on any device.'
    },
    {
      question: 'How often is the manual updated?',
      answer: 'We release updated documentation as needed. The current version includes the latest features and operational guidelines.'
    },
    {
      question: 'Is technical support available?',
      answer: 'Yes, email and phone support is included at no cost for the life of your machine. Contact our support team anytime for assistance.'
    },
    {
      question: 'Does the manual cover installation?',
      answer: 'Yes, the manual includes comprehensive setup, operation, and maintenance instructions.'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Header */}
      <section className="relative py-24 overflow-hidden bg-blue-50 rounded-b-[3rem]">

        {/* Curved Bottom Wave Design */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-medium text-sm">Enterprise Documentation</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 text-slate-900 font-bold">
              User <span className="text-blue-600">Manual</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Download the complete user manual for your Pizza Anytime vending machine
            </p>
          </motion.div>
        </div>
      </section>

      {/* Download Manual Section */}
      <section className="relative py-24 bg-white">
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#f8fafc" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)' }}
            className="p-12 bg-gradient-to-br from-blue-50 to-slate-50 border-2 border-blue-200 rounded-2xl shadow-xl transition-all"
          >
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl mb-4 text-slate-900 font-bold">
                Complete User Manual
              </h2>
              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                Comprehensive guide covering setup, operation, maintenance, and troubleshooting for your Pizza Anytime vending machine
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-white rounded-lg border border-slate-200 text-center">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-slate-500">Format</div>
                <div className="text-lg font-semibold text-slate-900">PDF</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-200 text-center">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-slate-500">Content</div>
                <div className="text-lg font-semibold text-slate-900">Complete Guide</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-200 text-center">
                <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-slate-500">Version</div>
                <div className="text-lg font-semibold text-slate-900">Latest</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">What's Included:</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'Installation & Setup Instructions',
                  'Operating Guidelines',
                  'Maintenance Procedures',
                  'Troubleshooting Guide',
                  'Technical Specifications',
                  'Safety & Compliance Information'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-slate-700">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="w-full px-10 py-5 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-3 font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              <Download className="w-6 h-6" />
              Download User Manual
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 bg-white">
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#f1f5f9" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl mb-4 text-slate-900 font-bold">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="text-xl text-slate-600">
              Common questions about our documentation
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-600 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2 text-slate-900 font-semibold">{faq.question}</h3>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="relative py-24 bg-blue-600">
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#ffffff" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={scaleUp}
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-4xl mb-6 text-white font-bold">Need Additional Support?</h2>
            <p className="text-xl text-blue-50 mb-8">
              Our enterprise technical support team is available 24/7 to assist you
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Contact Support
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
