import { useState } from "react";
import axios from "axios";

const useSignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        if (!formData.username || !formData.email || !formData.password) {
            setError("All fields are required.");
            return false;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return false;
        }
        setError("");
        return true;
    };

    const sendRegisterRequest = async () => {
        try {
            setLoading(true);
            setError("");
            setSuccess(false);

            const userPostDto = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            };

            const response = await axios.post(
                `${import.meta.env.VITE_API_ROOT}/api/register`,
                userPostDto,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201 || response.status === 200) {
                setSuccess(true);
            }
        } catch (err) {
            console.error("Error Response:", err.response?.data || err.message);

            if (err.response) {
                setError(
                    err.response.data?.message || "Failed to register. Please try again."
                );
            } else if (err.request) {
                setError("Unable to connect to the server. Please check your network.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            await sendRegisterRequest();
        }
    };

    return {
        formData,
        error,
        success,
        loading,
        handleChange,
        handleSubmit,
    };
};

export default useSignUp;