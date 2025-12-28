import React, { useState } from 'react';
import { generatePrompt } from '../../utils/api';

export default function Prompts({ user }) {
  const [topic, setTopic] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    const result = await generatePrompt(topic);
    
    if (result.success) {
      setGeneratedPrompt(result.prompt);
    } else {
      setGeneratedPrompt('Error: ' + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">✨ Prompt Generator</h1>
        <p className="text-gray-600 mb-12">Generate powerful AI prompts for any task</p>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What do you want to create a prompt for?
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g., I need a tool to automate my Instagram posts"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="4"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition font-medium"
            >
              {loading ? 'Generating...' : 'Generate Prompt'}
            </button>
          </form>
        </div>

        {generatedPrompt && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-lg font-bold mb-4">Generated Prompt</h3>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="text-gray-800">{generatedPrompt}</p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(generatedPrompt)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              📋 Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
