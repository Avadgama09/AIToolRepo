import React from 'react';
import { getInitials, formatDate } from '../utils/helpers';

export default function Account({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">👤 My Account</h1>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
              {getInitials(user?.username || 'User')}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold">{user?.username}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold mb-4">Account Information</h3>
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-medium">Username:</span> {user?.username}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Member Since:</span>{' '}
                {user?.createdAt ? formatDate(user.createdAt) : 'Today'}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
