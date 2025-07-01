import React from 'react';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import Home from './pages/Auth/Dashboard/Home';
import Income from './pages/Auth/Dashboard/Income';
import Expense from './pages/Auth/Dashboard/Expense';
import UploadImage from './components/layouts/UploadImage';
import { UserProvider } from './context/userContext';




import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// Root component handles redirect based on authentication
const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

// Main App component
const App = () => {
  return (
    <div>
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/upload-image" element={<UploadImage />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
};

export default App;
