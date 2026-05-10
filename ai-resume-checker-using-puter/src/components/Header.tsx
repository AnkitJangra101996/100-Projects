import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import CoinImage from '../assets/coin-image.png';
import { usePricingModal } from "../context/pricingModal";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const { setModalOpen } = usePricingModal();

  return (
    <header className="fixed z-50 top-0 transition-all duration-300 bg-brand-dark/80 backdrop-blur-md border-b border-white/5 min-h-17.5 flex items-center flex-row w-full justify-between">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center w-full">
        <Link to={"/"} className="font-display">
          <span className="bg-brand-yellow py-2 px-1 text-black rounded-md">
            AI Resume
          </span>{" "}
          Analyzer
        </Link>
        {isAuthenticated && (
          <div className="flex flex-row items-center gap-6">
            <div className="flex gap-2 flex-row-reverse">
              <span>{user?.credits}</span>
              <img src={CoinImage} className="w-5 h-auto object-contain" />
            </div>
            {user?.credits === 0 ? <>
              <button onClick={() => setModalOpen()} className="primary-button">
                Purchase Credits
              </button>
            </> : <Link to={"/upload-resume"} className="primary-button">
              Analyze Resume
            </Link>}
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="secondary-button"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
