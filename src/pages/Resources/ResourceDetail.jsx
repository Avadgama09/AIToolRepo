import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Optional: Install if you want pretty formatting

export default function ResourceDetail() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResource = async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error('Error:', error);
      else setResource(data);
      setLoading(false);
    };

    fetchResource();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!resource) return <div className="text-center py-20">Resource not found</div>;

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <Link to={`/resources/${resource.type.toLowerCase()}`} className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to {resource.type}s
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {resource.type}
            </span>
            <span className="text-gray-500 text-xs flex items-center">
              <Clock className="w-3 h-3 mr-1" /> {resource.read_time}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{resource.title}</h1>
          <p className="text-xl text-gray-500">{resource.description}</p>
        </div>

        {/* The Content (Markdown) */}
        <article className="prose prose-blue prose-lg max-w-none text-gray-800">
           {/* If you installed react-markdown, use <ReactMarkdown>{resource.content}</ReactMarkdown> */}
           {/* If not, use this simple whitespace-preserver: */}
           <div className="whitespace-pre-wrap font-serif leading-relaxed">
             {resource.content}
           </div>
        </article>

      </div>
    </div>
  );
}
