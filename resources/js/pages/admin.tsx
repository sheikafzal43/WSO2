import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Donation {
    id: number;
    donor_name: string;
    donor_email: string;
    amount: string;
    currency: string;
    message: string;
    created_at: string;
}

interface Stats {
    total: number;
    totalAmount: number;
    avgAmount: number;
    todayCount: number;
}

interface PageProps {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    [key: string]: any;
}

export default function Admin() {
    const { auth } = usePage<PageProps>().props;
    const [donations, setDonations] = useState<Donation[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, totalAmount: 0, avgAmount: 0, todayCount: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const response = await fetch('/api/donations');
            const result = await response.json();
            
            if (result.success) {
                setDonations(result.data);
                calculateStats(result.data);
            }
        } catch (error) {
            console.error('Error fetching donations:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (data: Donation[]) => {
        const total = data.length;
        const totalAmount = data.reduce((sum, d) => sum + parseFloat(d.amount), 0);
        const avgAmount = total > 0 ? totalAmount / total : 0;
        
        const today = new Date().toISOString().split('T')[0];
        const todayCount = data.filter(d => d.created_at.startsWith(today)).length;

        setStats({ total, totalAmount, avgAmount, todayCount });
    };

    const formatCurrency = (amount: string, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'USD',
        }).format(parseFloat(amount));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <>
            <Head title="Admin Dashboard" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xl font-bold">📊</span>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                                    {auth?.user && (
                                        <p className="text-sm text-gray-600">Welcome, {auth.user.name}</p>
                                    )}
                                </div>
                            </div>
                            <nav className="flex items-center gap-4">
                                <a href="/donate" className="text-gray-600 hover:text-blue-600 font-medium">Donate</a>
                                <a href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</a>
                                <button
                                    onClick={() => router.post('/admin/logout')}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
                                >
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold opacity-90">Total Donations</h3>
                                <span className="text-2xl">💰</span>
                            </div>
                            <p className="text-3xl font-bold">
                                ${stats.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="text-sm opacity-75 mt-1">{stats.total} transactions</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold opacity-90">Total Donors</h3>
                                <span className="text-2xl">👥</span>
                            </div>
                            <p className="text-3xl font-bold">{stats.total}</p>
                            <p className="text-sm opacity-75 mt-1">Generous supporters</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold opacity-90">Average Donation</h3>
                                <span className="text-2xl">📈</span>
                            </div>
                            <p className="text-3xl font-bold">
                                ${stats.avgAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="text-sm opacity-75 mt-1">Per transaction</p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold opacity-90">Today's Donations</h3>
                                <span className="text-2xl">⚡</span>
                            </div>
                            <p className="text-3xl font-bold">{stats.todayCount}</p>
                            <p className="text-sm opacity-75 mt-1">Last 24 hours</p>
                        </div>
                    </div>

                    {/* Recent Donations Table */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Recent Donations</h2>
                                <button
                                    onClick={fetchDonations}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Refresh
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            </div>
                        ) : donations.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📭</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No donations yet</h3>
                                <p className="text-gray-500">Donations will appear here once they are received.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Donor</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {donations.map((donation, index) => (
                                            <tr 
                                                key={donation.id} 
                                                className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
                                                        {donation.id}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{donation.donor_name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-600">{donation.donor_email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                                                        {formatCurrency(donation.amount, donation.currency)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 max-w-xs">
                                                    <div className="text-sm text-gray-600 truncate" title={donation.message}>
                                                        {donation.message || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDate(donation.created_at)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* WSO2 Info */}
                    <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">🔒</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Powered by WSO2 API Manager</h3>
                                <p className="text-blue-100 text-sm">
                                    This dashboard fetches data through WSO2 API Gateway with OAuth2 authentication, 
                                    rate limiting, and full analytics tracking.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 py-6 mt-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
                        © 2025 Donation Platform. Interview Demo Project - WSO2 API Manager Integration
                    </div>
                </footer>
            </div>
        </>
    );
}
