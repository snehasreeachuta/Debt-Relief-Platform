import { useState } from 'react';

const HistoryPage = () => {
  // We use hardcoded data instead of fetching from a server
  const [history] = useState([
    {
      id: 1,
      date: '2026-07-10',
      content: 'Dear SBI Bank, I am writing to request a debt settlement due to financial hardship...'
    },
    {
      id: 2,
      date: '2026-07-05',
      content: 'To Whom It May Concern, I am requesting a lower interest rate on my loan account...'
    }
  ]);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-emerald-800">Negotiation History</h2>

      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white">
            <p className="text-sm text-gray-500 mb-2">{item.date}</p>
            <h3 className="font-semibold text-emerald-700 mb-2">Generated Letter</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;