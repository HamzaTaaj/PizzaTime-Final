import { motion, useInView } from 'motion/react';
import { Shield, FileText, RefreshCw, Lock } from 'lucide-react';
import { useRef } from 'react';

export function PrivacyTermsPage() {
  const privacyRef = useRef(null);
  const termsRef = useRef(null);
  const refundsRef = useRef(null);
  const contactRef = useRef(null);
  
  const privacyInView = useInView(privacyRef, { once: true, margin: "-100px" });
  const termsInView = useInView(termsRef, { once: true, margin: "-100px" });
  const refundsInView = useInView(refundsRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-blue-50 rounded-b-[3rem]">
        {/* Animated Background Blob */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600 rounded-full blur-3xl"
        />
        
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
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-blue-600 font-medium text-sm mb-4"
            >
              Legal Information
            </motion.p>
            <h1 className="text-5xl md:text-6xl mb-6 text-slate-900 font-bold">
              Privacy, Terms & <span className="text-blue-600">Policies</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Please review our policies to understand how we protect your information and govern our services.
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
          {/* Section 1: Privacy Policy */}
          <motion.div
            ref={privacyRef}
            initial={{ opacity: 0, y: 30 }}
            animate={privacyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0 }}
            className="mb-16"
            id="privacy"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl text-slate-900 font-bold">Privacy Policy</h2>
            </div>
            
            <div className="space-y-6">
              {/* Content Item 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={privacyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h3 className="text-xl text-slate-900 font-semibold mb-3">Welcome to High Sierra Vending LLC</h3>
                <p className="text-slate-600">
                  By accessing or using our website, you agree to be bound by these terms and conditions (Terms). If you do not agree with any part of these Terms, please do not use our website.
                </p>
              </motion.div>

              {/* Content Item 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={privacyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h3 className="text-xl text-slate-900 font-semibold mb-3">Privacy and Data Sharing</h3>
                <p className="text-slate-600">
                  Your personal information is used only to enhance our services. We do not share your data with any third party. High Sierra Vending LLC is committed to protecting your privacy. We do not share, sell, rent, or lease your personal data to any third parties for their marketing purposes. Any information collected on this site will be kept strictly confidential and will not be disclosed to any third party without your prior consent, except as required by law. No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
                </p>
              </motion.div>

              {/* Content Item 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={privacyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h3 className="text-xl text-slate-900 font-semibold mb-3">Communication Preferences</h3>
                <p className="text-slate-600">
                  By providing your mobile number to High Sierra Vending LLC, you agree that you may receive periodic text messages from us regarding your inquiries, orders, or updates about our products and services. Standard text messaging rates may apply as provided by your mobile carrier. If you wish to opt out of receiving text messages from us, you can do so at any time. To stop receiving text messages, please reply "STOP" to any text message you receive from High Sierra Vending LLC. After you send the SMS message "STOP" to us, we will send you an SMS message to confirm that you have been unsubscribed. After this, you will no longer receive SMS messages from us. If you want to start receiving messages again, you can sign up as you did the first time. If at any time you forget what keywords are supported, just text "HELP" to the number from which you received the messages. After you send the SMS message "HELP" to us, we will respond with instructions on how to use our service as well as how to unsubscribe. Please note that opting out of receiving text messages may impact your use of our services, as certain notifications and updates may only be provided via SMS.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Section 2: Terms of Service */}
          <motion.div
            ref={termsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={termsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
            id="terms"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl text-slate-900 font-bold">Terms of Service</h2>
            </div>
            
            <div className="space-y-6">
              {/* Content Item 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={termsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h3 className="text-xl text-slate-900 font-semibold mb-3">Use of Website</h3>
                <p className="text-slate-600">
                  This website is intended to provide information about Pizza Anytime services and related products or services. You agree to use this site only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of this site by any third party.
                </p>
              </motion.div>

              {/* Content Item 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={termsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h3 className="text-xl text-slate-900 font-semibold mb-3">Intellectual Property</h3>
                <p className="text-slate-600">
                  The content, layout, design, data, databases, and graphics on this website are protected by intellectual property laws and are owned by High Sierra Vending LLC or its licensors, unless otherwise stated. You may not reproduce, download, transmit or retransmit, manipulate or store on any other website or electronic retrieval system, any material from this site without prior written consent.
                </p>
              </motion.div>

              {/* Content Item 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={termsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <h3 className="text-xl text-slate-900 font-semibold mb-3">Liability</h3>
                <p className="text-slate-600">
                  High Sierra Vending LLC does not guarantee the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors, and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                </p>
              </motion.div>

              {/* Content Item 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={termsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <h3 className="text-xl text-slate-900 font-semibold mb-3">Links to Other Websites</h3>
                <p className="text-slate-600">
                  This website may include links to external websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
                </p>
              </motion.div>

              {/* Content Item 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={termsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <h3 className="text-xl text-slate-900 font-semibold mb-3">Changes to Terms</h3>
                <p className="text-slate-600">
                  High Sierra Vending LLC reserves the right to change these terms at any time by posting changes online. Your continued use of this site after changes are posted constitutes your acceptance of this agreement as modified.
                </p>
              </motion.div>

              {/* Content Item 6 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={termsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <h3 className="text-xl text-slate-900 font-semibold mb-3">Governing Law</h3>
                <p className="text-slate-600">
                  These terms shall be governed by and interpreted in accordance with the laws of the United States.
                </p>
              </motion.div>

              {/* Content Item 7 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={termsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.9 }}
              >
                <h3 className="text-xl text-slate-900 font-semibold mb-3">Contact Information</h3>
                <p className="text-slate-600">
                  For any questions or queries regarding these terms, please contact us at info@highsierravending.com
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Section 3: Refund Policy */}
          <motion.div
            ref={refundsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={refundsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
            id="refunds"
          >
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl text-slate-900 font-bold">Refund Policy</h2>
            </div>
            
            <div className="space-y-6">
              {/* Content Item 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={refundsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <h3 className="text-xl text-slate-900 font-semibold mb-3">Refund Policy</h3>
                <p className="text-slate-600">
                  For information about refunds, please contact us directly at info@highsierravending.com or (888) 699-1731. Our team will assist you with any refund inquiries based on your specific situation and our company policies.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            ref={contactRef}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-blue-50 border-2 border-blue-200 rounded-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl mb-4 text-slate-900 font-semibold text-center"
            >
              Questions About Our Policies?
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-slate-600 mb-4 text-center"
            >
              Contact us at <a href="mailto:info@highsierravending.com" className="text-blue-600 hover:underline">info@highsierravending.com</a> or call <a href="tel:+18886991731" className="text-blue-600 hover:underline">(888) 699-1731</a>
            </motion.p>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center text-slate-600"
          >
            <p>© 2025 High Sierra Vending, LLC</p>
            <p className="mt-2">The Pizza Vending Machine people.</p>
            <p className="mt-2">
              <a href="mailto:Info@HighSierraVending.com" className="text-blue-600 hover:underline">Info@HighSierraVending.com</a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
