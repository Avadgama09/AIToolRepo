import React from 'react';
import ChatBar from '../components/ChatBar';
import ResourceCard from '../components/ResourceCard';
import ToolCard from '../components/ToolCard';
import { RESOURCES, FEATURED_TOOLS } from '../data/resources';
import { TOOLS } from '../data/tools';

export default function Home({ user }) {
  const featuredTools = TOOLS.slice(0, 3);

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">📚 Latest Resources</h2>
          <p className="text-gray-600 mb-8">Blogs, guides, and playbooks to help you succeed</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RESOURCES.slice(0, 3).map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Level Up?</h2>
          <p className="text-xl mb-8">Explore our full tool repository and prompt templates</p>
          <div className="flex gap-4 justify-center">
            <a href="/tools" className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-bold">
              Explore Tools →
            </a>
            <a href="/prompts" className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-blue-700 transition font-bold">
              Learn Prompts →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
