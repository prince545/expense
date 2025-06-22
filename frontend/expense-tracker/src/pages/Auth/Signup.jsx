import React, { useState } from 'react';
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    const validationErrors = {};
    if (!fullName.trim()) validationErrors.fullName = "Full name is required";
    if (!validateEmail(email)) validationErrors.email = "Invalid email address";
    if (password.length < 6) validationErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) validationErrors.confirmPassword = "Passwords don't match";
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit logic here
    console.log('Signing up with:', { fullName, email, password });
    navigate('/dashboard'); // Redirect after successful signup
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Create Your Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture Upload */}
          <div className="flex justify-center mb-4">
            <label className="cursor-pointer">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="hidden"
              />
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 hover:border-purple-500">
                {profilePic ? (
                  <img 
                    src={URL.createObjectURL(profilePic)} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">+ Photo</span>
                )}
              </div>
            </label>
          </div>

          {/* Full Name */}
          <Input
            label="Full Name"
            type="text"
            value={fullName}
            onChange={setFullName}
            error={errors.fullName}
            placeholder="John Doe"
          />

          {/* Email */}
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            error={errors.email}
            placeholder="your@email.com"
          />

          {/* Password */}
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            error={errors.password}
            placeholder="••••••••"
          />

          {/* Confirm Password */}
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={errors.confirmPassword}
            placeholder="••••••••"
          />

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;