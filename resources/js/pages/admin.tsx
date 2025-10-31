import { Head, router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';

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
    [key: string]: unknown;
}

export default function Admin() {
    const { auth } = usePage<PageProps>().props;
    const [donations, setDonations] = useState<Donation[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, totalAmount: 0, avgAmount: 0, todayCount: 0 });
    const [loading, setLoading] = useState(true);

    const fetchDonations = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        fetchDonations();
    }, [fetchDonations]);

    const calculateStats = (data: Donation[]) => {
        const total = data.length;
        const totalAmount = data.reduce((sum, d) => sum + parseFloat(d.amount), 0);
        const avgAmount = total > 0 ? totalAmount / total : 0;

        const today = new Date().toISOString().split('T')[0];
        const todayCount = data.filter((d) => d.created_at.startsWith(today)).length;

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
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                                    <span className="text-xl font-bold text-white">📊</span>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                                    {auth?.user && <p className="text-sm text-gray-600">Welcome, {auth.user.name}</p>}
                                </div>
                            </div>
                            <nav className="flex items-center gap-4">
                                <a href="/donate" className="font-medium text-gray-600 hover:text-blue-600">
                                    Donate
                                </a>
                                <a href="/" className="font-medium text-gray-600 hover:text-blue-600">
                                    Home
                                </a>
                                <button
                                    onClick={() => router.post('/admin/logout')}
                                    className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </div>
                </header>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
                            <div className="mb-2 flex items-center justify-between">
                                <h3 className="text-sm font-semibold opacity-90">Total Donations</h3>
                                <span className="text-2xl">💰</span>
                            </div>
                            <p className="text-3xl font-bold">
                                ${stats.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="mt-1 text-sm opacity-75">{stats.total} transactions</p>
                        </div>

                        <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg">
                            <div className="mb-2 flex items-center justify-between">
                                <h3 className="text-sm font-semibold opacity-90">Total Donors</h3>
                                <span className="text-2xl">👥</span>
                            </div>
                            <p className="text-3xl font-bold">{stats.total}</p>
                            <p className="mt-1 text-sm opacity-75">Generous supporters</p>
                        </div>

                        <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-lg">
                            <div className="mb-2 flex items-center justify-between">
                                <h3 className="text-sm font-semibold opacity-90">Average Donation</h3>
                                <span className="text-2xl">📈</span>
                            </div>
                            <p className="text-3xl font-bold">
                                ${stats.avgAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="mt-1 text-sm opacity-75">Per transaction</p>
                        </div>

                        <div className="rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-lg">
                            <div className="mb-2 flex items-center justify-between">
                                <h3 className="text-sm font-semibold opacity-90">Today's Donations</h3>
                                <span className="text-2xl">⚡</span>
                            </div>
                            <p className="text-3xl font-bold">{stats.todayCount}</p>
                            <p className="mt-1 text-sm opacity-75">Last 24 hours</p>
                        </div>
                    </div>

                    {/* Recent Donations Table */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                        <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Recent Donations</h2>
                                <button
                                    onClick={fetchDonations}
                                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    </svg>
                                    Refresh
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <svg className="h-8 w-8 animate-spin text-blue-600" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                            </div>
                        ) : donations.length === 0 ? (
                            <div className="py-12 text-center">
                                <div className="mb-4 text-6xl">📭</div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">No donations yet</h3>
                                <p className="text-gray-500">Donations will appear here once they are received.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                                Donor
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                                Message
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {donations.map((donation, index) => (
                                            <tr
                                                key={donation.id}
                                                className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-800">
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
                                                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                                                        {formatCurrency(donation.amount, donation.currency)}
                                                    </span>
                                                </td>
                                                <td className="max-w-xs px-6 py-4">
                                                    <div className="truncate text-sm text-gray-600" title={donation.message}>
                                                        {donation.message || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
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
                    <div className="mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="bg-opacity-20 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white">
                                <span className="text-2xl">🔒</span>
                            </div>
                            <div>
                                <h3 className="mb-1 text-lg font-bold">Powered by WSO2 API Manager</h3>
                                <p className="text-sm text-blue-100">
                                    This dashboard fetches data through WSO2 API Gateway with OAuth2 authentication, rate limiting, and full analytics
                                    tracking.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-12 border-t border-gray-200 bg-white py-6">
                    <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
                        © 2025 Donation Platform. Interview Demo Project - WSO2 API Manager Integration
                    </div>
                </footer>
            </div>
        </>
    );
}
