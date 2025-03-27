import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const OAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOAuthLogin } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      handleOAuthLogin(accessToken, refreshToken);
      navigate("/pets");
    } else {
      navigate("/login", { state: { error: 'Google login failed' } });
    }
  }, [location, navigate, handleOAuthLogin]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Processing Google login...</p>
    </div>
  );
};

export default OAuthRedirect;