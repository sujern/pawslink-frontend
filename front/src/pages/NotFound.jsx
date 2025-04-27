import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <img
        src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
        alt="Lost Dog"
        className="w-40 h-40 mb-6 animate-bounce-slow"
      />

      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-2 text-center">
        Oops! Looks like you're lost...
      </p>
      <p className="text-md text-gray-500 mb-8 text-center max-w-sm">
        Our little buddy couldn't find the page you're looking for. Let's head back home!
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-md transition"
      >
        🏠 Go Home
      </Link>
    </div>
  );
};

export default NotFound;
