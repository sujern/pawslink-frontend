
// import { useState } from "react";
// import axios from "axios";

// const useAuth = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(localStorage.getItem("access_token") || '');

//     const login = async (username, password) => {
//         setError(null);

//         // Validate if username and password are provided
//         if (!username.trim() || !password.trim()) {
//             setError("Please enter both username and password.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_API_ROOT}/api/login`,
//                 { username, password }
//             );

//             const { token } = response.data;
//             localStorage.setItem("access_token", token);
//             setToken(token);
//             setLoading(false);
//             return response;

//         } catch (err) {
//             setLoading(false);

//             // Handle error responses from the server
//             if (err.response) {
//                 if (err.response.status === 401 || err.response.status === 404) {
//                     setError("Invalid username or password.");
//                 } else {
//                     setError("An error occurred while logging in.");
//                 }
//             } else {
//                 setError(err.message || "An error occurred while logging in.");
//             }

//             throw err;
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem("access_token");
//         setToken(null);
//         setUser(null);
//     };

//     return { login, loading, error, logout, token };
// };

// export default useAuth;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("access_token") || "");
    const navigate = useNavigate();
    const isAuthenticated = () => !!token;


    useEffect(() => {
        if (!token) {
            navigate("/login"); // ถ้ายังไม่ได้ล็อกอิน ให้ไปที่หน้า login
        }
    }, [token, navigate]);

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
            navigate("/pets"); // เมื่อ login สำเร็จ ให้ไปที่หน้า dashboard หรือหน้าหลัก
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
        navigate("/login"); // เมื่อ logout เสร็จ ให้กลับไปที่หน้า login
    };

    return { login, loading, error, logout, token, isAuthenticated };
};

export default useAuth;
