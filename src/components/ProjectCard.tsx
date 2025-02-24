'use client';
import { format } from 'date-fns';

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  creatorName: string;
  onDelete: (id: string) => void;
  userRole: string | null;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, name, description, createdAt, creatorName, onDelete, userRole }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="text-sm text-gray-500">
            <p>Created by: {creatorName}</p>
            <p>Created on: {format(new Date(createdAt), 'MMM dd, yyyy')}</p>
          </div>
        </div>
        {userRole === 'admin' && (
          <button 
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
            title="Delete project"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>


  );
};

export default ProjectCard;
