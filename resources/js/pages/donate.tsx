import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useCallback, useEffect, useState } from 'react';

interface ExchangeRate {
    code: string;
    rate: number;
    symbol: string;
}

interface ExchangeRates {
    [key: string]: ExchangeRate;
}

export default function Donate() {
    const { success } = usePage<{ success?: string }>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        donor_name: '',
        donor_email: '',
        amount: '',
        currency: 'USD',
        message: '',
    });

    const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
    const [loadingRates, setLoadingRates] = useState(true);
    const [equivalentAmount, setEquivalentAmount] = useState<string>('');

    const fetchExchangeRates = useCallback(async () => {
        try {
            const response = await fetch('/api/currency/rates');
            const rates = await response.json();
            setExchangeRates(rates);
        } catch (error) {
            console.error('Failed to fetch exchange rates:', error);
        } finally {
            setLoadingRates(false);
        }
    }, []);

    const calculateEquivalent = useCallback(() => {
        if (!data.amount || !exchangeRates[data.currency]) {
            setEquivalentAmount('');
            return;
        }

        const amount = parseFloat(data.amount);
        if (isNaN(amount)) {
            setEquivalentAmount('');
            return;
        }

        const rate = exchangeRates[data.currency].rate;
        const usdAmount = amount / rate;

        if (data.currency === 'USD') {
            setEquivalentAmount('');
        } else {
            setEquivalentAmount(`≈ $${usdAmount.toFixed(2)} USD`);
        }
    }, [data.amount, data.currency, exchangeRates]);

    useEffect(() => {
        fetchExchangeRates();
    }, [fetchExchangeRates]);

    useEffect(() => {
        calculateEquivalent();
    }, [calculateEquivalent]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/donate', {
            onSuccess: () => {
                reset();
            },
        });
    };

    const predefinedAmounts = [10, 25, 50, 100, 250, 500];

    return (
        <>
            <Head title="Make a Donation" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                                    <span className="text-xl font-bold text-white">💝</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">Donation Platform</h1>
                            </div>
                            <nav className="flex gap-6">
                                <a href="/" className="font-medium text-gray-600 hover:text-blue-600">
                                    Home
                                </a>
                                <a href="/admin" className="font-medium text-gray-600 hover:text-blue-600">
                                    Admin
                                </a>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className="mb-4 text-4xl font-bold md:text-5xl">Make a Difference Today</h2>
                        <p className="mx-auto max-w-2xl text-xl text-blue-100">
                            Your generous donation helps us continue our mission to make the world a better place.
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                    {/* Success Message */}
                    {success && (
                        <div className="animate-fade-in mb-8 flex items-start gap-4 rounded-xl border border-green-200 bg-green-50 p-6">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="mb-1 text-lg font-semibold text-green-900">Thank You!</h3>
                                <p className="text-green-700">Your donation has been received successfully. We appreciate your generosity!</p>
                            </div>
                        </div>
                    )}

                    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                        <div className="p-8">
                            <h3 className="mb-6 text-2xl font-bold text-gray-900">Donation Details</h3>

                            <form onSubmit={submit} className="space-y-6">
                                {/* Personal Information */}
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">Full Name *</label>
                                        <input
                                            type="text"
                                            value={data.donor_name}
                                            onChange={(e) => setData('donor_name', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="John Doe"
                                            required
                                        />
                                        {errors.donor_name && <p className="mt-1 text-sm text-red-600">{errors.donor_name}</p>}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">Email Address *</label>
                                        <input
                                            type="email"
                                            value={data.donor_email}
                                            onChange={(e) => setData('donor_email', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="john@example.com"
                                            required
                                        />
                                        {errors.donor_email && <p className="mt-1 text-sm text-red-600">{errors.donor_email}</p>}
                                    </div>
                                </div>

                                {/* Amount Selection */}
                                <div>
                                    <label className="mb-3 block text-sm font-semibold text-gray-700">Select Amount *</label>
                                    <div className="mb-4 grid grid-cols-3 gap-3 md:grid-cols-6">
                                        {predefinedAmounts.map((amount) => (
                                            <button
                                                key={amount}
                                                type="button"
                                                onClick={() => setData('amount', amount.toString())}
                                                className={`rounded-lg px-4 py-3 font-semibold transition ${
                                                    data.amount === amount.toString()
                                                        ? 'scale-105 bg-blue-600 text-white shadow-lg'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                ${amount}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0.01"
                                                value={data.amount}
                                                onChange={(e) => setData('amount', e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                                placeholder="Custom amount"
                                                required
                                            />
                                            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                                        </div>

                                        <div className="w-32">
                                            <select
                                                value={data.currency}
                                                onChange={(e) => setData('currency', e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="USD">$ USD</option>
                                                <option value="EUR">€ EUR</option>
                                                <option value="GBP">£ GBP</option>
                                                <option value="INR">₹ INR</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Exchange Rate Info */}
                                    {equivalentAmount && (
                                        <div className="mt-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
                                            <div className="flex items-center gap-2 text-sm text-blue-800">
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <span className="font-medium">{equivalentAmount}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Live Exchange Rates */}
                                    {!loadingRates && Object.keys(exchangeRates).length > 0 && (
                                        <div className="mt-3 rounded-lg bg-gray-50 p-3">
                                            <p className="mb-2 text-xs font-semibold text-gray-600">Live Exchange Rates (1 USD =)</p>
                                            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                                                {Object.entries(exchangeRates).map(([code, rate]) => (
                                                    <div key={code} className="flex items-center justify-between text-xs">
                                                        <span className="font-medium text-gray-700">{code}:</span>
                                                        <span className="text-gray-900">
                                                            {rate.symbol}
                                                            {rate.rate.toFixed(2)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="mt-2 text-xs text-gray-500">🔄 Updated every hour • Powered by CurrencyAPI</p>
                                        </div>
                                    )}
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">Message (Optional)</label>
                                    <textarea
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows={4}
                                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="Share why you're donating (optional)"
                                    />
                                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 font-bold text-white shadow-lg transition duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {processing ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            'Complete Donation'
                                        )}
                                    </button>
                                </div>

                                <p className="text-center text-sm text-gray-500">🔒 Secure donation powered by WSO2 API Manager</p>
                            </form>
                        </div>

                        {/* Info Section */}
                        <div className="border-t border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6">
                            <div className="grid gap-6 text-center md:grid-cols-3">
                                <div>
                                    <div className="mb-2 text-3xl">🔒</div>
                                    <h4 className="mb-1 font-semibold text-gray-900">Secure</h4>
                                    <p className="text-sm text-gray-600">Protected by OAuth2 authentication</p>
                                </div>
                                <div>
                                    <div className="mb-2 text-3xl">⚡</div>
                                    <h4 className="mb-1 font-semibold text-gray-900">Fast</h4>
                                    <p className="text-sm text-gray-600">Instant processing via API Gateway</p>
                                </div>
                                <div>
                                    <div className="mb-2 text-3xl">📊</div>
                                    <h4 className="mb-1 font-semibold text-gray-900">Tracked</h4>
                                    <p className="text-sm text-gray-600">Full analytics and monitoring</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-16 bg-gray-900 py-8 text-white">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-gray-400">© 2025 Donation Platform. Powered by WSO2 API Manager & Laravel</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
