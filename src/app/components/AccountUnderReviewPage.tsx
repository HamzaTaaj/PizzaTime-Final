import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Clock, Mail, LogOut, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function AccountUnderReviewPage() {
  const navigate = useNavigate();
  const { customer, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Sign Out Button */}
        <div className="flex justify-end mb-6">
          <motion.button
            onClick={handleSignOut}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </motion.button>
        </div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12 text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Clock className="w-12 h-12 text-blue-600" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Your Account is Under Review
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Thank you for submitting your access request. Our team is currently reviewing your account details.
          </motion.p>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  What's Next?
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  We'll send you an email at <span className="font-semibold text-blue-600">{customer?.email || 'your email'}</span> once your account has been verified and approved. 
                  After approval, you'll be able to access all features and place orders.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-2 gap-4 mb-8 text-left"
          >
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Account Verification</h4>
                <p className="text-sm text-slate-600">We're verifying your business information</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Email Notification</h4>
                <p className="text-sm text-slate-600">You'll receive an email when approved</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="pt-6 border-t border-slate-200"
          >
            <p className="text-slate-600 mb-4">
              Questions about your account? Contact our support team.
            </p>
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
