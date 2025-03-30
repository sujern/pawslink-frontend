import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const HomePage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/pets");
    }
  }, [token, navigate]);

  return (
    <div>
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 min-h-screen flex items-center px-8">
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto">
          <div className="max-w-lg text-center md:text-left">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Online platform for consolidating pet-related links and
              information.
            </h1>
            <p className="text-gray-800 text-lg mb-8">
              Online platform for consolidating pet-related links and
              information.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-white text-blue-600 px-6 py-3 border border-blue-600 rounded-full font-semibold hover:bg-blue-100 transition-all"
              >
                Sign up
              </button>
            </div>
          </div>
          <div>
            <img
              src="https://pawslink-bucket.s3.ap-southeast-2.amazonaws.com/profile.png"
              alt="Pet Profile Example"
              className="w-[500px] h-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white min-h-screen flex items-center px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto">
          <div className="max-w-lg text-center md:text-left">
            <h2 className="text-6xl font-bold mb-6 leading-tight">
              Generate a QR code to share your PawsLink from your contact
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              PawsLink helps you create a professional pet profile and generate
              sharable QR codes effortlessly.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition-all"
            >
              Get Start
            </button>
          </div>
          <div>
            <img
              src="https://pawslink-bucket.s3.ap-southeast-2.amazonaws.com/qrcode.png"
              alt="QR Code Example"
              className="w-[400px] h-auto rounded-lg hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
