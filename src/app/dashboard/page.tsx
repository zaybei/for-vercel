'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Navbar from '../../components/Navbar';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-20 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full p-8">
          <div className="flex justify-center mt-12">
            <DotLottieReact
              src="https://lottie.host/5b253c52-9d81-4fa2-96da-cce3ea59b8ce/8yJwQxD3uw.lottie"
              loop
              autoplay
              style={{ width: '300px', height: '300px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
