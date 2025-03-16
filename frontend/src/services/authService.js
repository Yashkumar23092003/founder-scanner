import jwtDecode from 'jwt-decode';

// Generate a simple JWT-like token (not as secure as a real JWT)
const generateToken = (user) => {
  // Create a simple payload
  const payload = {
    id: user.id,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days expiration
  };
  
  // Convert to base64
  const base64Payload = btoa(JSON.stringify(payload));
  // This is not a proper JWT, just a simulation
  return `mock-jwt.${base64Payload}.signature`;
};

// Get users from localStorage
const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Register user
export const register = async (userData) => {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const users = getUsers();
  
  // Check if user already exists
  if (users.find(user => user.email === userData.email)) {
    throw new Error('User already exists');
  }
  
  // Create new user (hash password in a real app)
  const newUser = {
    id: Date.now().toString(),
    name: userData.name,
    email: userData.email,
    password: userData.password, // WARNING: Passwords should be hashed in a real app
    company: userData.company || '',
    role: 'user',
    createdAt: new Date().toISOString()
  };
  
  // Add to users array
  users.push(newUser);
  saveUsers(users);
  
  // Create token
  const token = generateToken(newUser);
  
  // Store in localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    company: newUser.company
  }));
  
  return {
    success: true,
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      company: newUser.company
    }
  };
};

// Login user
export const login = async (email, password) => {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const users = getUsers();
  
  // Find user
  const user = users.find(u => u.email === email);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Check password (should use proper comparison in a real app)
  if (user.password !== password) {
    throw new Error('Invalid credentials');
  }
  
  // Create token
  const token = generateToken(user);
  
  // Store in localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    company: user.company
  }));
  
  return {
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company
    }
  };
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

// Get JWT token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    // Check token expiration
    const decoded = token.split('.')[1];
    const payload = JSON.parse(atob(decoded));
    return payload.exp > Date.now() / 1000;
  } catch (err) {
    return false;
  }
};

// Get user profile
export const getUserProfile = async () => {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = getCurrentUser();
  if (!user) {
    throw new Error('Not authenticated');
  }
  
  return {
    success: true,
    user
  };
}; 