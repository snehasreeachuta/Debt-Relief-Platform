import { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

const LetterDisplay = ({ letterText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group max-w-4xl mx-auto mt-8">
      <button
        onClick={handleCopy}
        className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg transition-all border z-10 ${
          copied ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50"
        }`}
      >
        {copied ? <><Check size={18} /> Copied!</> : <><Clipboard size={18} /> Copy Letter</>}
      </button>

      <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-lg whitespace-pre-wrap text-slate-700 leading-relaxed min-h-[400px]">
        {letterText}
      </div>
    </div>
  );
};

export default LetterDisplay;