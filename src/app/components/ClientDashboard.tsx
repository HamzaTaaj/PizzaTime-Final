import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  LogOut, 
  Pizza, 
  Clock, 
  TrendingUp,
  MapPin,
  Settings,
  Bell,
  CreditCard,
  Package,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export function ClientDashboard() {
  const navigate = useNavigate();
  const { customer, signOut, isLoading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Quick stats data (mock for now)
  const stats = [
    { label: 'Total Orders', value: '24', icon: Package, color: 'bg-blue-500' },
    { label: 'Pizzas Enjoyed', value: '67', icon: Pizza, color: 'bg-orange-500' },
    { label: 'Loyalty Points', value: '1,250', icon: Sparkles, color: 'bg-purple-500' },
    { label: 'Savings', value: '$45.00', icon: TrendingUp, color: 'bg-green-500' },
  ];

  // Recent activity (mock for now)
  const recentActivity = [
    { action: 'Pepperoni Pizza purchased', time: '2 hours ago', location: 'Downtown Machine #12' },
    { action: 'Margherita Pizza purchased', time: '1 day ago', location: 'Mall Location #5' },
    { action: 'Points redeemed - Free Pizza', time: '3 days ago', location: 'Airport Terminal A' },
    { action: 'Hawaiian Pizza purchased', time: '1 week ago', location: 'University Center #8' },
  ];

  // Quick actions
  const quickActions = [
    { label: 'Find Machines', icon: MapPin, href: '/product', color: 'text-blue-600' },
    { label: 'View Orders', icon: Package, href: '#', color: 'text-orange-600' },
    { label: 'Payment Methods', icon: CreditCard, href: '#', color: 'text-green-600' },
    { label: 'Settings', icon: Settings, href: '#', color: 'text-slate-600' },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Welcome back, <span className="text-blue-600">{customer?.firstName || customer?.email?.split('@')[0] || 'Pizza Lover'}</span>! 🍕
              </h1>
              <p className="text-slate-600">Here's what's happening with your Pizza Anytime account</p>
            </div>
            <motion.button
              onClick={handleSignOut}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white text-center">
                  {customer?.firstName ? `${customer.firstName} ${customer.lastName || ''}`.trim() : 'Pizza Enthusiast'}
                </h2>
                <p className="text-blue-100 text-center text-sm mt-1">Premium Member</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="text-sm truncate">{customer?.email || 'No email'}</span>
                </div>
                {customer?.phone && (
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone className="w-5 h-5 text-slate-400" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-slate-600">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <span className="text-sm">
                    {customer?.acceptsMarketing ? 'Subscribed to updates' : 'Not subscribed to updates'}
                  </span>
                </div>
                <button className="w-full mt-4 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </motion.div>

            {/* Activity & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {quickActions.map((action) => (
                    <motion.button
                      key={action.label}
                      onClick={() => action.href !== '#' && navigate(action.href)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                      <action.icon className={`w-6 h-6 ${action.color}`} />
                      <span className="text-sm font-medium text-slate-700">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                      className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Pizza className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500">{activity.time}</span>
                          <span className="text-slate-300">•</span>
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500 truncate">{activity.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Promo Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute left-10 bottom-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">🎉 You're 50 points away from a free pizza!</h3>
                <p className="text-orange-100">Keep ordering to unlock your reward</p>
              </div>
              <motion.button
                onClick={() => navigate('/product')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-orange-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap"
              >
                Find a Machine
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
