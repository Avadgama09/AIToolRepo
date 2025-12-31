import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChatBar from '../components/ChatBar';
import ResourceCard from '../components/ResourceCard';
import ToolCard from '../components/ToolCard';
import { supabase } from '../supabaseClient';

export default function Home({ user }) {
  const [featuredTools, setFeaturedTools] = useState([]);
  const [latestResources, setLatestResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch first 3 tools for Featured Tools
      const { data: toolsData, error: toolsError } = await supabase
        .from('tools')
        .select()
        .limit(3);

      if (toolsError) console.error('Error fetching tools:', toolsError);
      else setFeaturedTools(toolsData || []);

      // Fetch first 3 resources for Latest Resources
      const { data: resourcesData, error: resourcesError } = await supabase
        .from('resources')
        .select()
        .limit(3);

      if (resourcesError) console.error('Error fetching resources:', resourcesError);
      else setLatestResources(resourcesData || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome, {user?.username}! 👋</h1>
          <p className="text-xl text-blue-100 mb-8">
            Your AI-powered tool repository and prompt crafting platform
          </p>
        </div>
      </div>

      {/* Chat Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ChatBar />
      </div>

      {/* Featured Tools Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">🔥 Featured Tools</h2>
          <p className="text-gray-600 mb-8">Discover our most popular AI tools</p>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading tools...</div>
          ) : featuredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No tools available yet</div>
          )}
        </div>
      </div>

      {/* Resources Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">📚 Latest Resources</h2>
          <p className="text-gray-600 mb-8">Blogs, guides, and playbooks to help you succeed</p>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading resources...</div>
          ) : latestResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No resources available yet</div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Level Up?</h2>
          <p className="text-xl mb-8">Explore our full tool repository and prompt templates</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/tools"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-bold"
            >
              Explore Tools →
            </Link>
            <Link
              to="/prompts"
              className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-blue-700 transition font-bold"
            >
              Learn Prompts →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
