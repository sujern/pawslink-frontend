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
        const MIN_LOADING_TIME = 300;
        const startTime = Date.now();
        try {
            const response = await getPets();
            setPets(response.data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch pets.");
        } finally {
            const elapsed = Date.now() - startTime;
            const delay = Math.max(0, MIN_LOADING_TIME - elapsed);
            setTimeout(() => setLoading(false), delay);
        }
    }, []);

    const removePet = useCallback(async (id) => {
        setError(null);
        try {
            await deletePets(id);
            await fetchPets();
        } catch (err) {
            setError("Failed to delete pet.");
        }
    }, [fetchPets]);

    return { pets, loading, error, removePet, fetchPets };
};

export default usePets;
