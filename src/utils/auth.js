export const loginUser = (username, password) => {
  // Mock authentication
  if (username && password.length >= 6) {
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      username: username,
      email: `${username}@artificiallyproductive.com`,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('user', JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, error: 'Invalid credentials' };
};

export const signupUser = (username, password, confirmPassword) => {
  if (!username) return { success: false, error: 'Username is required' };
  if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters' };
  if (password !== confirmPassword) return { success: false, error: 'Passwords do not match' };
  
  return loginUser(username, password);
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
