import { useState, useEffect } from "react";
import { getScanStatistics } from "../api/scanRecordAPI";  // ใช้ฟังก์ชันจาก api/scanRecordAPI

const useScanStats = () => {
    const [stats, setStats] = useState({ daily: {}, monthly: {} });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await getScanStatistics();
                console.log("Fetched data:", data);
                setStats(data || { daily: {}, monthly: {} });
            } catch (err) {
                setError(err.message || "Failed to fetch statistics");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
};

export default useScanStats;
