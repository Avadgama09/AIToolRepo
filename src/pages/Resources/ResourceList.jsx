import React, { useEffect, useState, useCallback } from 'react'; // Added useCallback
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { ArrowLeft, Clock } from 'lucide-react'; // Removed 'Calendar'

export default function ResourceList() {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) + 's' : 'Resources';

  // Wrap fetch function in useCallback to stop the warning
  const fetchResources = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('type', categoryTitle.slice(0, -1));

    if (error) console.error('Error fetching resources:', error);
    else setItems(data || []);
    
    setLoading(false);
  }, [categoryTitle]); // It only re-creates if categoryTitle changes

  useEffect(() => {
    fetchResources();
  }, [fetchResources]); // Now it's a valid dependency

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/resources" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Categories
        </Link>

        <h1 className="text-3xl font-bold mb-8 text-gray-900">{categoryTitle}</h1>

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                {item.image_url && (
                  <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
                )}
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {item.type}
                    </span>
                    <div className="flex items-center text-gray-400 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {item.read_time}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  
                  <Link 
  to={`/resources/${category}/${item.id}`} 
  className="text-blue-600 text-sm font-semibold hover:underline inline-block mt-4"
>
  Read More →
</Link>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No {categoryTitle} found yet.</p>
            <p className="text-sm text-gray-400">Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}