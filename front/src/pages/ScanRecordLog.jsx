import { useEffect, useState } from "react";
import { getScanRecord } from "../api/recordService";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ScanRecordLog = () => {
  const [scanRecords, setScanRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


  useEffect(() => {
    async function fetchScanRecords() {
      setLoading(true);
      const MIN_LOADING_TIME = 300;
      const startTime = Date.now();
      try {
        const data = await getScanRecord();
        setScanRecords(data);
      } catch (err) {
        setError("Failed to fetch scan records: " + err.message);
      } finally {
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, MIN_LOADING_TIME - elapsed);
        setTimeout(() => setLoading(false), delay);
      }
    }

    fetchScanRecords();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-gray-500">
      <Loader />
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen pt-12">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-6 px-8">
        <h1 className="text-2xl text-gray-800">History</h1>
      </div>

      {scanRecords.length === 0 ? (
        <p className="text-center text-gray-500">No scan records found.</p>
      ) : (
        <div className="mx-auto bg-white p-4 rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-goodBlue text-white rounded-t-lg">
                <th className="p-3 text-left rounded-tl-lg">Pet</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left rounded-tr-lg">Scanned At</th>
              </tr>
            </thead>
            <tbody>
              {scanRecords.map((record) => (
                <tr key={record.scanId} className="border-b">
                  <td className="p-3">{record.petName}</td>
                  <td className="p-3">
                    <img
                      src={record.petImageUrl || "https://via.placeholder.com/50"}
                      alt={record.petName}
                      className="w-12 h-12 rounded-full border border-gray-300 object-cover shadow-sm"
                    />
                  </td>
                  <td className="p-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${record.latitude},${record.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {record.latitude.toFixed(6)}, {record.longitude.toFixed(6)}
                    </a>
                  </td>
                  <td className="p-3">{record.address || "N/A"}</td>
                  <td className="p-3">{new Date(record.scannedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ScanRecordLog;