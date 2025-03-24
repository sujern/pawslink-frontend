import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Loader2, PawPrint } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/pets");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/pets");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-blue-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-4 border-blue-200 relative">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-300 w-12 h-12 flex items-center justify-center rounded-full shadow-md">
          <PawPrint className="text-white w-6 h-6" />
        </div>
        <h2 className="text-3xl font-semibold text-center  text-blue-600 mt-6 mb-6">
          🐾 Welcome Back!
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-blue-500"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-blue-500"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-blue-400 text-white p-3 rounded-lg mt-4 hover:bg-blue-500 disabled:bg-blue-300 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : "🐶 Login"}
          </button>
        </form>
        <p className="text-center text-sm text-blue-500 mt-4">
          Don't have an account?
          <button
            onClick={() => navigate("/register")}
            className="text-yellow-500 font-semibold  hover:underline ml-1"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
