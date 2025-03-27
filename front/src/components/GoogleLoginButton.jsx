const GoogleLoginButton = () => {
  const API_ROOT = import.meta.env.VITE_API_ROOT;
  const handleGoogleLogin = () => {
    // Redirect to your Spring Boot's Google OAuth endpoint
    window.location.href = `${API_ROOT}/oauth2/authorization/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 p-3 rounded-lg mt-4 border border-gray-300 hover:bg-gray-50 transition-all"
    >
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google logo"
        className="w-5 h-5"
      />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;