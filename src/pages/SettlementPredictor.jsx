import { useState, useEffect } from 'react';

export default function SettlementPredictor() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('loans');
    if (saved) setLoans(JSON.parse(saved));
  }, []);

  const totalDebt = loans.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Settlement Predictor</h2>
      <div className="p-6 bg-emerald-50 rounded-lg">
        <p className="text-lg">Total Debt to be Settled:</p>
        <h1 className="text-4xl font-bold text-emerald-800">${totalDebt}</h1>
        <p className="mt-4 text-sm text-emerald-600">Based on your {loans.length} active loans.</p>
      </div>
    </div>
  );
}