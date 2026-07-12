import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [loans, setLoans] = useState([]);
  const [newLoan, setNewLoan] = useState({ lender: '', amount: '', overdue: '', emi: '' });

  useEffect(() => {
    const saved = localStorage.getItem('loans');
    if (saved) setLoans(JSON.parse(saved));
  }, []);

  const handleAddLoan = (e) => {
    e.preventDefault();
    const updated = [...loans, newLoan];
    setLoans(updated);
    localStorage.setItem('loans', JSON.stringify(updated));
    setNewLoan({ lender: '', amount: '', overdue: '', emi: '' });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-slate-800">Financial Overview</h1>
      
      {/* Colorful Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg text-white">
          <p className="text-emerald-100 text-sm font-medium">Total Outstanding</p>
          <h3 className="text-3xl font-bold mt-1">${loans.reduce((s, l) => s + Number(l.amount), 0)}</h3>
        </div>
        <div className="p-6 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-lg text-white">
          <p className="text-blue-100 text-sm font-medium">Active Loans</p>
          <h3 className="text-3xl font-bold mt-1">{loans.length}</h3>
        </div>
        <div className="p-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-lg text-white">
          <p className="text-orange-100 text-sm font-medium">Average EMI</p>
          <h3 className="text-3xl font-bold mt-1">${loans.length > 0 ? (loans.reduce((s, l) => s + Number(l.emi), 0) / loans.length).toFixed(0) : 0}</h3>
        </div>
      </div>

      {/* Form and Table remain standard for clarity */}
      {/* (You can keep your existing form/table code here for functionality) */}
    </div>
  );
}