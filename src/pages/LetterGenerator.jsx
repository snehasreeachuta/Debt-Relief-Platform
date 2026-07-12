import { useState, useEffect } from 'react';

export default function LetterGenerator() {
  const [loans, setLoans] = useState([]);
  const [selected, setSelected] = useState('');

  // Load loans from LocalStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('loans');
    if (saved) {
      setLoans(JSON.parse(saved));
    }
  }, []);

  // Find the selected loan object to inject details into the letter
  const selectedLoan = loans.find((l) => l.lender === selected);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-emerald-900">Professional Letter Generator</h2>
      
      {/* Selection Dropdown */}
      <div className="mb-8">
        <label className="block mb-2 font-medium text-slate-700">Select Loan for Negotiation:</label>
        <select 
          className="border-2 border-emerald-200 p-3 w-full rounded-xl focus:border-emerald-500 outline-none transition-all" 
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
        >
          <option value="">-- Choose a Loan --</option>
          {loans.map((l, i) => (
            <option key={i} value={l.lender}>{l.lender} - Balance: ${l.amount}</option>
          ))}
        </select>
      </div>

      {/* Letter Template */}
      {selectedLoan ? (
        <div className="p-12 rounded-xl bg-white shadow-2xl border-t-8 border-emerald-500 text-slate-700">
          <div className="mb-8">
            <p className="font-bold">Date: {new Date().toLocaleDateString()}</p>
            <p className="font-bold">To: Collections Department, {selectedLoan.lender}</p>
          </div>

          <p className="mb-6 font-bold underline">
            Subject: Debt Settlement Proposal for Account Reference: {selectedLoan.lender}
          </p>

          <p className="mb-4">Dear Collections Team,</p>

          <p className="mb-4 leading-relaxed">
            I am writing this letter to formally request a debt settlement regarding my loan account with your institution, 
            currently showing a total outstanding balance of <strong>${selectedLoan.amount}</strong>.
          </p>

          <p className="mb-4 leading-relaxed">
            Due to recent unforeseen financial hardships, I have been unable to maintain my regular repayment schedule 
            of ${selectedLoan.emi} per month. This period of instability has significantly impacted my ability to meet 
            these obligations as originally agreed.
          </p>

          <p className="mb-4 leading-relaxed">
            I remain committed to resolving this debt and restoring my financial standing. Therefore, I would like to 
            formally propose a one-time settlement amount to fully satisfy and close this account. I request your 
            consideration to settle this debt for a reduced percentage of the total outstanding balance, as this 
            represents the maximum amount I am currently able to secure.
          </p>

          <p className="mb-8 leading-relaxed">
            I am eager to resolve this matter amicably. Please review this proposal and provide a written response 
            detailing your willingness to accept this settlement or any alternative arrangements you may suggest.
          </p>

          <div className="mt-10">
            <p>Sincerely,</p>
            <p className="font-bold mt-2">[Your Name]</p>
            <p className="text-sm">[Your Contact Information]</p>
          </div>
        </div>
      ) : (
        <div className="p-8 bg-white rounded-xl border border-slate-200 text-center text-slate-500 shadow-sm">
          Please select a loan from the dropdown above to generate and preview your professional negotiation letter.
        </div>
      )}
    </div>
  );
}