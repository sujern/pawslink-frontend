import { LogOut } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-center p-4 mb-4">
      <div className="flex justify-between items-center overflow-hidden transition-all w-52 ml-3">
        <div className="leading-4">
          <h4 className="font-semibold">
            {user ? user.username : "Loading..."}
          </h4>
          <span className="text-xs text-gray-600">
            {user ? user.email : ""}
          </span>
        </div>
        <LogOut size={20} className="cursor-pointer text-red-500" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default UserProfile;
