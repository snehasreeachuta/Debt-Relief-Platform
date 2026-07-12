import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-b border-emerald-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-600 cursor-pointer flex items-center gap-2" onClick={() => navigate('/')}>
          💰 DebtRelief<span className="text-emerald-900">.AI</span>
        </h1>
        <div className="flex gap-2">
          {['Dashboard', 'Predictor', 'Generator', 'History'].map((item) => (
            <button 
              key={item}
              onClick={() => navigate(item === 'Dashboard' ? '/' : `/${item.toLowerCase()}`)} 
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all duration-300"
            >
              {item}
            </button>
          ))}
          <button onClick={onLogout} className="ml-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold transition-all shadow-md hover:shadow-lg">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;