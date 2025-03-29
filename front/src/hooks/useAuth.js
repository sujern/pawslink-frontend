import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiGetUser } from "../api/auth";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token") || "");
  const navigate = useNavigate();

  const isAuthenticated = () => !!token;

  const login = async (username, password) => {
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROOT}/api/login`,
        { username, password }
      );

      const { token } = response.data;
      localStorage.setItem("access_token", token);
      setToken(token);
      setLoading(false);
      navigate("/pets");
      return response;
    } catch (err) {
      setLoading(false);
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 404) {
          setError("Invalid username or password.");
        } else {
          setError("An error occurred while logging in.");
        }
      } else {
        setError(err.message || "An error occurred while logging in.");
      }
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setUser(null);
  };

  const handleOAuthLogin = (accessToken, refreshToken) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    setToken(accessToken);
    setLoading(false);
  };

  // Fetch user info only when authenticated and user data is missing
  useEffect(() => {
    const fetchUser = async () => {
      if (!token || user) return;

      try {
        const userData = await apiGetUser();
        setUser(userData);
      } catch (error) {
        logout();
        navigate("/");
      }
    };

    fetchUser();
  }, [token, user, logout, navigate]);

  return { login, loading, error, logout, token, user, isAuthenticated, handleOAuthLogin };
};

export default useAuth;
