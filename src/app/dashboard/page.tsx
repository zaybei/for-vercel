'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import CreateProjectModal from '../../components/CreateProjectModal';
import ProjectCard from '../../components/ProjectCard';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface Project {
  id: string;
  name: string;
  description: string;
  created_at: string;
  users: {
    full_name: string;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: userData } = await supabase
        .from('users')
        .select('role, full_name')
        .eq('id', user.id)
        .single();

      if (userData) {
        setUserRole(userData.role);
        setFullName(userData.full_name);
      }
    }
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*, users(full_name)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return;
    }

    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
    fetchProjects();
  }, []);

  const handleProjectCreated = () => {
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onOpenCreateProjectModal={() => setIsModalOpen(true)} />
      <div className="pt-20 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full p-8">
          <div className="flex flex-col items-center space-y-6">
            {loading ? (
              <p>Loading projects...</p>
            ) : projects.length > 0 ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    name={project.name}
                    description={project.description}
                    createdAt={project.created_at}
                    creatorName={project.users.full_name}
                    userRole={userRole}
                    onDelete={async (id) => {
                      const { error } = await supabase
                        .from('projects')
                        .delete()
                        .eq('id', id);
                      
                      if (!error) {
                        fetchProjects();
                      }
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6">
                <DotLottieReact
                  src="https://lottie.host/5b253c52-9d81-4fa2-96da-cce3ea59b8ce/8yJwQxD3uw.lottie"
                  loop
                  autoplay
                  style={{ width: '300px', height: '300px' }}
                />
                <div className="text-center space-y-4">
                  <p className="text-gray-700 text-lg">
                    No projects yet. Why not create one?
                  </p>
                  {userRole === 'admin' && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create Project
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <CreateProjectModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onProjectCreated={handleProjectCreated}
          />
        </div>
      </div>

      {fullName && userRole && (
        <div className="fixed bottom-4 left-4 bg-black text-white px-4 py-2 rounded-full">
          {fullName} ({userRole})
        </div>
      )}
    </div>
  );
}
