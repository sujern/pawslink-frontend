import { useEffect, useState, useCallback } from "react";
import { getPets, deletePets, putPet } from "../api/petService";
import useAuth from "../hooks/useAuth";

const usePets = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    const fetchPets = useCallback(async () => {
        setLoading(true);
        // console.log("Current Token:", token); // ตรวจสอบ token
        try {
            const response = await getPets();
            console.log("Response data:", response.data);
            setPets(response.data);
            setError(null);
        } catch (err) {
            console.log("Current Token:", token); // ตรวจสอบ token
            console.error("Failed to fetch pets", err.response ? err.response.data : err.message);
            setError("Failed to fetch pets.");
        } finally {
            setLoading(false);
        }
    }, []);

    const removePet = useCallback(async (id) => {
        setError(null);
        try {
            await deletePets(id);
            await fetchPets();
        } catch (err) {
            console.error("Failed to delete pet:", err);
            setError("Failed to delete pet.");
        }
    }, [fetchPets]);

    return { pets, loading, error, removePet, fetchPets };
};

export default usePets;
