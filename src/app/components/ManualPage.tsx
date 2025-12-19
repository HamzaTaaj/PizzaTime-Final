import { motion } from 'motion/react';
import { Download, FileText, BookOpen, Video, HelpCircle, CheckCircle } from 'lucide-react';

export function ManualPage() {
  const manuals = [
    {
      title: 'Quick Start Guide',
      description: 'Get started with your PizzaMatic Pro X1 in minutes',
      size: '2.4 MB',
      pages: '12 pages',
      version: 'v1.2',
      type: 'PDF',
      icon: FileText
    },
    {
      title: 'Complete User Manual',
      description: 'Comprehensive guide covering all features and operations',
      size: '15.8 MB',
      pages: '86 pages',
      version: 'v1.2',
      type: 'PDF',
      icon: BookOpen
    },
    {
      title: 'Installation Guide',
      description: 'Step-by-step installation and setup instructions',
      size: '8.5 MB',
      pages: '34 pages',
      version: 'v1.2',
      type: 'PDF',
      icon: FileText
    },
    {
      title: 'Maintenance Manual',
      description: 'Regular maintenance and troubleshooting procedures',
      size: '6.2 MB',
      pages: '28 pages',
      version: 'v1.2',
      type: 'PDF',
      icon: FileText
    },
    {
      title: 'Technical Specifications',
      description: 'Detailed technical specifications and diagrams',
      size: '4.1 MB',
      pages: '18 pages',
      version: 'v1.2',
      type: 'PDF',
      icon: FileText
    },
    {
      title: 'Safety & Compliance',
      description: 'Safety guidelines and regulatory compliance documentation',
      size: '3.7 MB',
      pages: '22 pages',
      version: 'v1.2',
      type: 'PDF',
      icon: FileText
    }
  ];

  const videos = [
    {
      title: 'Machine Setup Tutorial',
      duration: '12:34',
      thumbnail: 'https://images.unsplash.com/photo-1754195451509-00c25c20fdde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdmVuZGluZyUyMG1hY2hpbmV8ZW58MXx8fHwxNzY2MDY1NjY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Daily Maintenance Routine',
      duration: '8:15',
      thumbnail: 'https://images.unsplash.com/photo-1689942007101-de5d836afcf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NjYwNjY3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Troubleshooting Common Issues',
      duration: '15:42',
      thumbnail: 'https://images.unsplash.com/photo-1652212976547-16d7e2841b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBibHVlfGVufDF8fHx8MTc2NjAxMzUyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const faqs = [
    {
      question: 'What file formats are the manuals available in?',
      answer: 'All manuals are provided in PDF format for easy viewing on any device.'
    },
    {
      question: 'How often are the manuals updated?',
      answer: 'We release updated documentation with each software version. Current version is v1.2.'
    },
    {
      question: 'Can I access training materials?',
      answer: 'Yes, video tutorials and training materials are available in the resources section below.'
    },
    {
      question: 'Is technical support available?',
      answer: '24/7 technical support is available for all Pizza Anytime machine owners.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#082032] via-[#0a2a3f] to-[#082032] overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-96 h-96 bg-[#008B8B]/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#008B8B]/20 border border-[#008B8B]/30 rounded-full mb-6">
              <BookOpen className="w-4 h-4 text-[#00D1FF]" />
              <span className="text-[#00D1FF]">Documentation Center</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6">
              User <span className="text-[#008B8B]">Manuals</span>
            </h1>
            <p className="text-xl text-[#D9DEE2] max-w-2xl mx-auto">
              Access comprehensive documentation, guides, and training materials for your PizzaMatic Pro X1
            </p>
          </motion.div>
        </div>
      </section>

      {/* Download Manuals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl mb-4">
              Download <span className="text-[#008B8B]">Documentation</span>
            </h2>
            <p className="text-xl text-[#D9DEE2]">
              All manuals are current as of version 1.2 (December 2025)
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manuals.map((manual, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 bg-gradient-to-br from-[#082032] to-[#0a2a3f] border border-[#008B8B]/20 rounded-xl hover:border-[#008B8B]/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#008B8B] to-[#00D1FF] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <manual.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-[#008B8B]/20 text-[#00D1FF] rounded-full text-sm">
                    {manual.type}
                  </span>
                </div>

                <h3 className="text-xl mb-2">{manual.title}</h3>
                <p className="text-[#D9DEE2] mb-4 text-sm">{manual.description}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-[#D9DEE2]">
                  <span>{manual.size}</span>
                  <span>•</span>
                  <span>{manual.pages}</span>
                  <span>•</span>
                  <span>{manual.version}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-[#008B8B] to-[#00D1FF] rounded-lg flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Bulk Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 bg-gradient-to-r from-[#008B8B]/10 to-[#00D1FF]/10 border border-[#008B8B]/30 rounded-xl"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl mb-2">Complete Documentation Package</h3>
                <p className="text-[#D9DEE2]">Download all manuals in a single ZIP file (40.7 MB)</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#008B8B] to-[#00D1FF] rounded-lg flex items-center gap-2 whitespace-nowrap"
              >
                <Download className="w-5 h-5" />
                Download All
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-16 bg-gradient-to-b from-transparent to-[#0a2a3f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl mb-4">
              Video <span className="text-[#008B8B]">Tutorials</span>
            </h2>
            <p className="text-xl text-[#D9DEE2]">
              Step-by-step video guides for setup and maintenance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden mb-4 aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#082032]/60 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#008B8B] to-[#00D1FF] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <h3 className="text-lg group-hover:text-[#008B8B] transition-colors">{video.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl mb-4">
              Frequently Asked <span className="text-[#008B8B]">Questions</span>
            </h2>
            <p className="text-xl text-[#D9DEE2]">
              Common questions about our documentation
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gradient-to-br from-[#082032] to-[#0a2a3f] border border-[#008B8B]/20 rounded-xl hover:border-[#008B8B]/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#008B8B] to-[#00D1FF] rounded-lg flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2">{faq.question}</h3>
                    <p className="text-[#D9DEE2]">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-24 bg-gradient-to-r from-[#008B8B]/10 to-[#00D1FF]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#008B8B] to-[#00D1FF] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl mb-6">Need Additional Support?</h2>
            <p className="text-xl text-[#D9DEE2] mb-8">
              Our technical support team is available 24/7 to assist you
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#008B8B] to-[#00D1FF] rounded-lg"
              >
                Contact Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-[#008B8B] rounded-lg hover:bg-[#008B8B]/10 transition-colors"
              >
                Schedule Training
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
