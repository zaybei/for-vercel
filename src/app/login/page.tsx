'use client';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (error) {
      if (error.message === 'Email not confirmed') {
        setError('Please check your email to confirm your account before logging in.');
      } else if (error.message === 'Invalid login credentials') {
        setError('Invalid email or password. Please try again.');
      } else if (error.message === 'User not found') {
        setError('No account found with this email. Please sign up.');
      } else {
        setError(error.message);
      }
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative">
      <Link href="/" className="absolute top-6 left-6 text-2xl font-bold text-white">
        Plooma
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        {error && (
          <div className="mt-6 p-3 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-6 text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-black text-white placeholder:text-black/50"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-black text-white placeholder:text-black/50"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="font-medium text-blue-400 hover:text-blue-300">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
