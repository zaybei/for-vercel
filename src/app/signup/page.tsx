'use client';
import { supabase } from '../../lib/supabaseClient';
import { useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setLoading(true);
    
    // Validate email domain
    if (!email.endsWith('@arhpez.com')) {
      setEmailError('Please use an email address from @arhpez.com');
      setLoading(false);
      return;
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      setEmailError('Email already exists');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    await supabase
      .from('users')
      .insert([{ email: email }]);

    setShowSuccess(true);
    setEmail('');
    setPassword('');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="absolute top-6 left-6">
        <Link href="/" className="text-2xl font-bold text-white">Plooma</Link>
      </div>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Get started with Plooma</p>
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
        ) : showSuccess ? (
          <div className="mt-8 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Congratulations!</h2>
              <p className="text-gray-600 mb-6">
                Your account has been successfully created. Please confirm your email before logging in.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSignUp} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all bg-black text-white placeholder:text-black/50"
                placeholder="Enter your @arhpez.com email"
                required
              />
              {emailError && (
                <p className="text-sm text-red-500 mt-1">{emailError}</p>
              )}
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all bg-black text-white placeholder:text-black/50"
                placeholder="Create a password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
