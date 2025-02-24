'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Navbar from '../../components/Navbar';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        if (!session) {
          router.push('/login');
          return;
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('User error:', userError);
          throw userError;
        }

        if (!user) {
          router.push('/login');
          return;
        }

        const { data: userData, error: queryError } = await supabase
          .from('users')
          .select('role, full_name')
          .eq('id', user.id)
          .single();

        if (queryError) {
          console.error('Query error:', queryError);
          throw queryError;
        }

        if (!userData) {
          router.push('/login');
          return;
        }
        
        setUserRole(userData.role);
        setFullName(userData.full_name);

      } catch (error) {
        console.error('Error in getSession:', error);
        router.push('/login');
      }
    };

    getSession();
  }, [router, supabase]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-20 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full p-8">
          <div className="flex flex-col items-center space-y-6">
            <DotLottieReact
              src="https://lottie.host/5b253c52-9d81-4fa2-96da-cce3ea59b8ce/8yJwQxD3uw.lottie"
              loop
              autoplay
              style={{ width: '300px', height: '300px' }}
            />
            {userRole === 'admin' ? (
              <div className="text-center space-y-4">
                <p className="text-gray-700 text-lg">
                  No projects yet. Why not create one?
                </p>
                <button
                  onClick={() => router.push('/projects/create')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Project
                </button>
              </div>
            ) : (
              <p className="text-gray-700 text-lg">
                No projects or tasks assigned to you yet.
              </p>
            )}
          </div>
        </div>

    {fullName && userRole && (
      <div className="fixed bottom-4 left-4 bg-black text-white px-4 py-2 rounded-full">
        {fullName} ({userRole})
      </div>
    )}
      </div>
    </div>
  );
}
