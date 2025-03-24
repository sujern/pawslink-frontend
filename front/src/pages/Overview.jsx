import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className=" min-h-screen px-20 pt-8">
      <h1 className="text-3xl">Overview Page</h1>
    </div>
  )
}

export default Overview;