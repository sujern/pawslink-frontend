import { useEffect, useState } from "react";
import { getPublicPet } from "../api/publicService";

const usePublicPet = (profileUrl) => {
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!profileUrl) return;

        async function fetchPet() {
            try {
                const response = await getPublicPet(profileUrl);
                setPet(response.data);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setError(err.response.data.message);
                } else {
                    setError("Failed to load public pet profile!")
                }
            } finally {
                setLoading(false);
            }
        }
        fetchPet();
    }, [profileUrl]);

    return { pet, loading, error };
}

export default usePublicPet;