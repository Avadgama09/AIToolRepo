import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook
import { BookOpen, FileText, PlayCircle, Layers, TrendingUp, Shield } from 'lucide-react';

export default function Resources() {
  const navigate = useNavigate(); // Initialize the hook

  const categories = [
    { id: 'blog', title: 'Blogs', icon: BookOpen, desc: 'Latest trends & AI news', color: 'bg-blue-100 text-blue-600' },
    { id: 'guide', title: 'Guides', icon: Layers, desc: 'Step-by-step tutorials', color: 'bg-green-100 text-green-600' },
    { id: 'playbook', title: 'Playbooks', icon: PlayCircle, desc: 'Actionable business strategies', color: 'bg-purple-100 text-purple-600' },
    { id: 'cheatsheet', title: 'Cheat Sheets', icon: FileText, desc: 'Quick reference PDFs', color: 'bg-orange-100 text-orange-600' },
    { id: 'case-study', title: 'Case Studies', icon: TrendingUp, desc: 'Real-world examples', color: 'bg-pink-100 text-pink-600' },
    { id: 'newsletter', title: 'Newsletters', icon: Shield, desc: 'Weekly AI digests', color: 'bg-indigo-100 text-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Resource Library</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master AI with our curated collection of guides, playbooks, and strategic insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => navigate(`/resources/${cat.id}`)} // Navigate on click!
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 group"
            >
              <div className={`w-14 h-14 ${cat.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {cat.title}
              </h3>
              <p className="text-gray-500">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}