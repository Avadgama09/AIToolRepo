import React, { useState } from 'react';
import { sendChatMessage } from '../utils/api';

export default function ChatBar() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    const result = await sendChatMessage(message);
    
    if (result.success) {
      setResponse(result.response);
      setMessage('');
    } else {
      setResponse('Error: ' + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Ask Anything, Get Instant AI Responses
      </h2>

      <form onSubmit={handleSend} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What is the best free tool for video editing?"
            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Thinking...' : 'Send'}
          </button>
        </div>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-white border-l-4 border-blue-600 rounded">
          <p className="text-gray-800">{response}</p>
        </div>
      )}
    </div>
  );
}
