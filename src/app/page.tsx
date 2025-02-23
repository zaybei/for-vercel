'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    let ignore = false;
    
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (isMounted && !ignore) {
        setSession(session);
        if (session) {
          router.push('/dashboard');
        }
      }
    };

    getSession();
    
    return () => {
      isMounted = false;
      ignore = true;
    };
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-white">Blogs</a>
            <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
          </div>
            {session ? (
              <button 
                onClick={handleSignOut}
                className="border border-gray-300 text-gray-300 px-6 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <button 
                onClick={() => router.push('/login')}
                className="border border-gray-300 text-gray-300 px-6 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                Account Login
              </button>
            )}
        </div>
      </nav>
      <main className="w-full px-[110px] relative z-10">
        <div className="pt-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-white">
              Plooma - Your Workflow, Your Way
            </h1>
            <p className="text-xl text-gray-300">
              No clutter, no confusion—just an intuitive way to plan, track, and deliver projects.
            </p>
            <button 
              onClick={() => router.push('/signup')}
              className="bg-white text-black px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 relative"
              >
              Get Started for Free
            </button>
          </div>
          <div className="w-full h-full">
            <DotLottieReact
              src="https://lottie.host/159315e5-4c53-4a49-ad23-0420de4c3e19/RZsA0LeSW6.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </main>
    </div>
  );
}
