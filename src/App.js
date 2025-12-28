import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Prompts from './pages/Prompts';
import Resources from './pages/Resources';
import Account from './pages/Account';
import ResourceDetail from './pages/Resources/ResourceDetail';
import ResourceList from './pages/Resources/ResourceList';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        {isAuthenticated && <Navbar user={user} onLogout={handleLogout} />}
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
              } 
            />
            <Route 
              path="/" 
              element={isAuthenticated ? <Home user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/tools" 
              element={isAuthenticated ? <Tools user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/prompts" 
              element={isAuthenticated ? <Prompts user={user} /> : <Navigate to="/login" />} 
            />
            
            {/* --- RESOURCES --- */}
            <Route 
              path="/resources" 
              element={isAuthenticated ? <Resources user={user} /> : <Navigate to="/login" />} 
            />
            {/* List Page (e.g., /resources/guide) */}
            <Route 
              path="/resources/:category" 
              element={isAuthenticated ? <ResourceList user={user} /> : <Navigate to="/login" />} 
            />
            {/* Detail Page (e.g., /resources/guide/123) */}
            <Route 
              path="/resources/:category/:id" 
              element={isAuthenticated ? <ResourceDetail /> : <Navigate to="/login" />} 
            />

            <Route 
              path="/account" 
              element={isAuthenticated ? <Account user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;