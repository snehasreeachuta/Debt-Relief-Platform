import React, { useState } from 'react';
import { authAPI } from '../services/api';

export default function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', full_name: '', monthly_income: 0 });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const res = await authAPI.login({ username: formData.email, password: formData.password });
        localStorage.setItem('token', res.data.access_token);
        onLoginSuccess();
      } else {
        await authAPI.register(formData);
        const res = await authAPI.login({ username: formData.email, password: formData.password });
        localStorage.setItem('token', res.data.access_token);
        onLoginSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-white mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="text-slate-400 text-center mb-6 text-sm">AI-Powered Debt Relief Platform</p>
        
        {error && <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg text-sm mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase">Full Name</label>
                <input type="text" required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 mt-1" 
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase">Monthly Income ($)</label>
                <input type="number" required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 mt-1" 
                  onChange={(e) => setFormData({...formData, monthly_income: parseFloat(e.target.value)})} />
              </div>
            </>
          )}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase">Email Address</label>
            <input type="email" required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 mt-1" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase">Password</label>
            <input type="password" required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 mt-1" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition duration-200 mt-2">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <p className="text-slate-400 text-center mt-6 text-sm">
          {isLogin ? "Don't have an account? " : "Already registered? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-400 hover:underline font-semibold">
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}