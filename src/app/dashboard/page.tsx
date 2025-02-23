'use client';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to the Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
