import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <>
            <Head title="Admin Login" />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
                <div className="w-full max-w-md">
                    {/* Logo/Header */}
                    <div className="mb-8 text-center">
                        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                            <span className="text-4xl font-bold text-white">🔐</span>
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">Admin Login</h1>
                        <p className="text-gray-600">Donation Management System</p>
                    </div>

                    {/* Login Form */}
                    <div className="rounded-2xl bg-white p-8 shadow-xl">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Email/Username Field */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">Email or Username</label>
                                <input
                                    type="text"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    placeholder="admin@example.com"
                                    required
                                    autoFocus
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-bold text-white shadow-lg transition duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Logging in...
                                    </span>
                                ) : (
                                    'Login to Dashboard'
                                )}
                            </button>
                        </form>

                        {/* Info Box */}
                        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                            <p className="text-center text-sm text-blue-800">🔒 Secure admin access with database authentication</p>
                        </div>

                        {/* Demo Credentials */}
                        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                            <p className="mb-2 text-xs font-semibold text-gray-600">Demo Credentials:</p>
                            <div className="space-y-1 text-xs text-gray-700">
                                <p>
                                    <span className="font-medium">Email:</span> admin@example.com
                                </p>
                                <p>
                                    <span className="font-medium">Password:</span> admin
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-6 text-center">
                        <a href="/" className="text-sm text-gray-600 transition hover:text-blue-600">
                            ← Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
