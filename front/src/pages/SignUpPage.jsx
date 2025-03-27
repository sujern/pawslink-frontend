import React, { useEffect, useState } from "react";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-dom";
import { PawPrint, CheckCircle, XCircle } from "lucide-react";
import useAuth from "../hooks/useAuth";

const SignUpPage = () => {
  const { formData, error, success, loading, handleChange, handleSubmit } =
    useSignUp();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [passwordValidation, setPasswordValidation] = useState([]);

  useEffect(() => {
    if (token) {
      navigate("/pets");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  const validatePassword = (password) => {
    const validations = [
      {
        message: "At least 12 characters long",
        isValid: password.length >= 12,
      },
      {
        message: "At least one uppercase letter",
        isValid: /[A-Z]/.test(password),
      },
      {
        message: "At least one lowercase letter",
        isValid: /[a-z]/.test(password),
      },
      {
        message: "At least one number",
        isValid: /[0-9]/.test(password),
      },
      {
        message: "At least one special character",
        isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      },
    ];
    return validations;
  };

  const handlePasswordChange = (e) => {
    handleChange(e);
    const results = validatePassword(e.target.value);
    setPasswordValidation(results);
  };

  return (
    <div className="flex h-screen justify-center items-center bg-blue-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-4 border-blue-200 relative">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-300 w-12 h-12 flex items-center justify-center rounded-full shadow-md">
          <PawPrint className="text-white w-6 h-6" />
        </div>
        <h2 className="text-3xl font-semibold text-center text-blue-600 mt-6 mb-6">
          🐾 Sign Up
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">
            Registration successful!
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-500">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-500">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-blue-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50"
              required
            />
            <ul className="mt-2 space-y-1">
              {passwordValidation.map((validation, index) => (
                <li
                  key={index}
                  className={`flex items-center text-sm ${
                    validation.isValid ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {validation.isValid ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  {validation.message}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-500">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-400 text-white p-3 rounded-lg mt-4 hover:bg-blue-500 disabled:bg-blue-300 transition-all"
            disabled={loading || passwordValidation.some((v) => !v.isValid)}
          >
            {loading ? "Signing Up..." : "🐶 Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm text-blue-500 mt-4">
          Already have an account?
          <button
            onClick={() => navigate("/login")}
            className="text-yellow-500 font-semibold hover:underline ml-1"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
