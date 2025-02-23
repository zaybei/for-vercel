interface ProjectCardProps {
  title: string;
  description: string;
  progress: number;
}

export default function ProjectCard({ title, description, progress }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
    </div>
  );
}
