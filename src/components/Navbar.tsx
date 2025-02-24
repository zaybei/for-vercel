'use client';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md py-4 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex space-x-8">
          <a href="/dashboard" className="text-gray-700 hover:text-blue-600">Projects</a>
          <a href="/tasks" className="text-gray-700 hover:text-blue-600">Tasks</a>
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
