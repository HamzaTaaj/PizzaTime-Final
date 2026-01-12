import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Mail,
  Phone,
  LogOut,
  Clock,
  TrendingUp,
  Settings,
  Bell,
  CreditCard,
  Package,
  ChevronRight,
  MapPin,
} from "lucide-react";

export function ClientDashboard() {
  const navigate = useNavigate();
  const { customer, signOut, isLoading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  /* -------------------- REAL SHOPIFY DATA -------------------- */

  const orders = customer?.orders?.edges || [];

  const totalOrders = orders.length;

  const totalSpend = orders.reduce((sum: number, edge: any) => {
    const amount = parseFloat(edge.node.totalPrice?.amount || "0");
    return sum + amount;
  }, 0);

  const accountStatus = customer?.tags?.includes("approved")
    ? "Approved"
    : customer?.tags?.includes("pending")
    ? "Pending Approval"
    : "Standard";

  const memberSince = customer?.createdAt
    ? new Date(customer.createdAt).toLocaleDateString()
    : "—";

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders.toString(),
      icon: Package,
      color: "bg-blue-500",
    },
    {
      label: "Total Spend",
      value: `$${totalSpend.toFixed(2)}`,
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      label: "Account Status",
      value: accountStatus,
      icon: User,
      color: "bg-purple-500",
    },
    {
      label: "Member Since",
      value: memberSince,
      icon: Clock,
      color: "bg-slate-500",
    },
  ];

  const recentOrders = orders.slice(0, 5).map((edge: any) => ({
    id: edge.node.id,
    name: edge.node.name,
    date: new Date(edge.node.processedAt).toLocaleDateString(),
    total: `$${edge.node.totalPrice.amount}`,
  }));

  const quickActions = [
    { label: "Find Machines", icon: MapPin, href: "/product" },
    { label: "View Orders", icon: Package, href: "#" },
    { label: "Payment Methods", icon: CreditCard, href: "#" },
    { label: "Settings", icon: Settings, href: "#" },
  ];

  /* -------------------- UI -------------------- */

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Welcome back,{" "}
                <span className="text-blue-600">
                  {customer?.firstName || customer?.email}
                </span>
                !
              </h1>
              <p className="text-slate-600">
                Your Pizza Anytime account overview
              </p>
            </div>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
              >
                <div
                  className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-blue-600 p-6 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {customer?.firstName
                    ? `${customer.firstName} ${customer.lastName || ""}`.trim()
                    : "Customer"}
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  {accountStatus} Customer
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="text-sm truncate">{customer?.email}</span>
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
                    {customer?.acceptsMarketing
                      ? "Subscribed to updates"
                      : "Not subscribed to updates"}
                  </span>
                </div>

                <button className="w-full mt-4 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 text-sm font-medium flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Orders & Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() =>
                        action.href !== "#" && navigate(action.href)
                      }
                      className="flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl"
                    >
                      <action.icon className="w-6 h-6 text-blue-600" />
                      <span className="text-sm font-medium text-slate-700">
                        {action.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Recent Orders
                  </h3>
                  <button className="text-sm text-blue-600 font-medium flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {recentOrders.length === 0 ? (
                  <p className="text-sm text-slate-500">No orders found.</p>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50"
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">
                            Order {order.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {order.date} • {order.total}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
