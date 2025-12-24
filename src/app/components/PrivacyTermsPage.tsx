import { motion } from 'motion/react';
import { Shield, FileText, CreditCard, Lock } from 'lucide-react';

export function PrivacyTermsPage() {
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
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-medium text-sm">Legal & Privacy</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 text-slate-900 font-bold">
              Privacy Policy & <span className="text-blue-600">Terms</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Your privacy and rights are important to us
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-24 bg-white">
        {/* Curved Top Wave Design */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#f8fafc"/>
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Privacy Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl text-slate-900 font-bold">Privacy Policy</h2>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 mb-4">
                <strong>Last Updated:</strong> December 2025
              </p>
              <p className="text-slate-600 mb-4">
                Pizza Anytime ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
              </p>
              
              <h3 className="text-xl text-slate-900 font-semibold mt-8 mb-4">Information We Collect</h3>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>Personal information (name, email, phone number, business address)</li>
                <li>Business information (company name, industry, location details)</li>
                <li>Usage data (how you interact with our services)</li>
                <li>Technical data (IP address, browser type, device information)</li>
              </ul>

              <h3 className="text-xl text-slate-900 font-semibold mt-8 mb-4">How We Use Your Information</h3>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>To provide and maintain our services</li>
                <li>To process your requests and transactions</li>
                <li>To communicate with you about our services</li>
                <li>To improve and optimize our services</li>
                <li>To comply with legal obligations</li>
              </ul>

              <h3 className="text-xl text-slate-900 font-semibold mt-8 mb-4">Data Security</h3>
              <p className="text-slate-600 mb-4">
                We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h3 className="text-xl text-slate-900 font-semibold mt-8 mb-4">Your Rights</h3>
              <p className="text-slate-600 mb-4">
                You have the right to access, update, or delete your personal information. You may also opt-out of certain communications from us. To exercise these rights, please contact us at privacy@pizzaanytime.com.
              </p>
            </div>
          </motion.div>

          {/* Terms of Service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl text-slate-900 font-bold">Terms of Service</h2>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 mb-4">
                <strong>Last Updated:</strong> December 2025
              </p>
              <p className="text-slate-600 mb-4">
                By accessing or using Pizza Anytime services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
              </p>

              <h3 className="text-xl text-slate-900 font-semibold mt-8 mb-4">Use License</h3>
              <p className="text-slate-600 mb-4">
                Permission is granted to temporarily access Pizza Anytime services for personal or commercial use. This is the grant of a license, not a transfer of title.
              </p>

              <h3 className="text-xl text-slate-900 font-semibold mt-8 mb-4">Service Availability</h3>
              <p className="text-slate-600 mb-4">
                We strive to maintain service availability but do not guarantee uninterrupted access. We reserve the right to modify or discontinue services at any time.
              </p>

              <h3 className="text-xl text-slate-900 font-semibold mt-8 mb-4">Limitation of Liability</h3>
              <p className="text-slate-600 mb-4">
                Pizza Anytime shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.
              </p>

              <h3 className="text-xl text-slate-900 font-semibold mt-8 mb-4">Governing Law</h3>
              <p className="text-slate-600 mb-4">
                These terms shall be governed by and construed in accordance with the laws of the State of California, United States.
              </p>
            </div>
          </motion.div>

          {/* Refund Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl text-slate-900 font-bold">Refund Policy</h2>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 mb-4">
                <strong>Last Updated:</strong> December 2025
              </p>

              <h3 className="text-xl text-slate-900 font-semibold mt-8 mb-4">Refund Eligibility</h3>
              <p className="text-slate-600 mb-4">
                Refund requests must be submitted within 30 days of purchase. Refunds are subject to the following conditions:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>Machine must be in original condition and packaging</li>
                <li>All accessories and documentation must be included</li>
                <li>Refund requests must be approved by our support team</li>
                <li>Shipping costs are non-refundable</li>
              </ul>

              <h3 className="text-xl text-slate-900 font-semibold mt-8 mb-4">Processing Time</h3>
              <p className="text-slate-600 mb-4">
                Approved refunds will be processed within 10-15 business days. Refunds will be issued to the original payment method.
              </p>

              <h3 className="text-xl text-slate-900 font-semibold mt-8 mb-4">Contact for Refunds</h3>
              <p className="text-slate-600 mb-4">
                To request a refund, please contact our support team at refunds@pizzaanytime.com or call 1-800-PIZZA-24.
              </p>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-blue-50 border-2 border-blue-200 rounded-xl"
          >
            <h3 className="text-2xl mb-4 text-slate-900 font-semibold">Questions About Our Policies?</h3>
            <p className="text-slate-600 mb-4">
              If you have any questions about our Privacy Policy, Terms of Service, or Refund Policy, please contact us:
            </p>
            <div className="space-y-2 text-slate-600">
              <p><strong>Email:</strong> legal@pizzaanytime.com</p>
              <p><strong>Phone:</strong> 1-800-PIZZA-24</p>
              <p><strong>Address:</strong> 123 Innovation Drive, Tech Park, Suite 500, San Francisco, CA 94105</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

