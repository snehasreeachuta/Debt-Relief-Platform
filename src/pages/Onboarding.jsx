import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    // Save salary to localStorage
    localStorage.setItem('userProfile', JSON.stringify({ monthlySalary: salary }));
    navigate('/');
  };

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Set up your profile</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <label className="block">Monthly Income ($):</label>
        <input type="number" className="border p-2 w-full" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded">Save & Continue</button>
      </form>
    </div>
  );
}