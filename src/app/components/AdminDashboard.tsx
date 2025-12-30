import { motion } from 'motion/react';
import { 
  Lock, 
  LogOut, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock,
  Mail,
  Building2,
  MapPin,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAuthUser, removeAuthToken, apiCall } from '../utils/auth';
import { fadeInUp, staggerContainer, viewportConfig } from '../utils/animations';

interface AccessRequest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  location: string;
  machineCount: string;
  role: string;
  message: string;
  submittedAt: string;
  status: string;
}

interface AdminDashboardProps {
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps = {}) {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedRequest, setSelectedRequest] = useState<AccessRequest | null>(null);
  const user = getAuthUser();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiCall('/api/get-access-requests');
      
      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }

      const data = await response.json();
      setRequests(data.requests);
    } catch (err) {
      setError('Failed to load access requests. Please try again.');
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (customerId: number, newStatus: string) => {
    try {
      const response = await apiCall('/api/update-request-status', {
        method: 'POST',
        body: JSON.stringify({ customerId, status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Refresh the list
      await fetchRequests();
      setSelectedRequest(null);
    } catch (err) {
      alert('Failed to update status. Please try again.');
      console.error('Error updating status:', err);
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    if (onLogout) {
      onLogout();
    } else if (onNavigate) {
      onNavigate('login');
    }
  };

  const filteredRequests = requests.filter(req => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-slate-50">
      {/* Header */}
      <section className="relative py-12 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Lock className="w-8 h-8 text-white" />
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              </div>
              <p className="text-blue-100">
                Welcome back, {user?.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-slate-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 font-medium">Total Requests</span>
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-slate-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 font-medium">Pending</span>
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-slate-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 font-medium">Approved</span>
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-slate-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 font-medium">Rejected</span>
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters and List */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-6 flex gap-3">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === status
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border-2 border-slate-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
              <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={fetchRequests}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="bg-white border-2 border-slate-200 rounded-xl p-12 text-center">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">No {filter !== 'all' ? filter : ''} requests found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-xl font-bold text-slate-900">
                          {request.firstName} {request.lastName}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          request.status === 'approved' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail className="w-4 h-4" />
                          <span>{request.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Building2 className="w-4 h-4" />
                          <span>{request.company}</span>
                        </div>
                        {request.location && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <MapPin className="w-4 h-4" />
                            <span>{request.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-slate-600">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(request.submittedAt)}</span>
                        </div>
                      </div>

                      {request.role && (
                        <div className="mb-4">
                          <span className="text-sm font-medium text-slate-700">Role: </span>
                          <span className="text-sm text-slate-600">{request.role}</span>
                        </div>
                      )}

                      {request.machineCount && (
                        <div className="mb-4">
                          <span className="text-sm font-medium text-slate-700">Machines Interested: </span>
                          <span className="text-sm text-slate-600">{request.machineCount}</span>
                        </div>
                      )}

                      {request.message && (
                        <div className="bg-slate-50 rounded-lg p-4">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="w-4 h-4 text-slate-400 mt-1" />
                            <div>
                              <p className="text-sm font-medium text-slate-700 mb-1">Message:</p>
                              <p className="text-sm text-slate-600">{request.message}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(request.id, 'approved')}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium whitespace-nowrap"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(request.id, 'rejected')}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium whitespace-nowrap"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </>
                      )}
                      {request.status !== 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(request.id, 'pending')}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap"
                        >
                          <Clock className="w-4 h-4" />
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

