import { useEffect, useState } from "react";
import { getScanRecord } from "../api/recordService";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ScanRecordLog = () => {
  const [scanRecords, setScanRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    pageSize: 8,
    totalElements: 0,
  });
  const { token } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchScanRecords = async (page = 0) => {
    setLoading(true);
    const MIN_LOADING_TIME = 300;
    const startTime = Date.now();
    try {
      const data = await getScanRecord(page, pagination.pageSize);
      const scanRecords = data._embedded?.scanRecordResponses || []; // Default to an empty array if undefined
      setScanRecords(scanRecords);
  
      setPagination({
        currentPage: data.page?.number || 0,
        totalPages: data.page?.totalPages || 0,
        pageSize: data.page?.size || 8,
        totalElements: data.page?.totalElements || 0,
      });
    } catch (err) {
      console.error("Failed to fetch scan records:", err);
      setScanRecords([]); // Set an empty array to show the empty state
    } finally {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, MIN_LOADING_TIME - elapsed);
      setTimeout(() => setLoading(false), delay);
    }
  };

  useEffect(() => {
    fetchScanRecords();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      fetchScanRecords(newPage);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-6 px-8">
        <h1 className="text-2xl text-gray-800">
          {t("history")}{" "}
          {pagination.totalElements > 0 ? `(${pagination.totalElements})` : ""}
        </h1>
      </div>

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
            {loading ? (
              <tr>
                <td colSpan="5" className="py-6">
                  <div className="flex justify-center items-center">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : scanRecords.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 pt-20 text-xl">
                  {t("noRecords")}
                </td>
              </tr>
            ) : (
              scanRecords.map((record) => (
                <tr key={record.scanId} className="border-b">
                  <td className="p-3">{record.petName}</td>
                  <td className="p-3">
                    <img
                      src={
                        record.petImageUrl || "https://via.placeholder.com/50"
                      }
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
                      {record.latitude.toFixed(6)},{" "}
                      {record.longitude.toFixed(6)}
                    </a>
                  </td>
                  <td className="p-3">{record.address || "N/A"}</td>
                  <td className="p-3">
                    {new Date(record.scannedAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-8 px-8">
          {pagination.totalElements > pagination.pageSize && (
            <>
              <button
                onClick={() => fetchPets(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 0}
                className={`px-4 py-2 rounded-full ${
                  pagination.currentPage === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-goodBlue text-white hover:bg-blue-600"
                }`}
              >
                Previous
              </button>
              <span>
                page {pagination.currentPage + 1} of {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchPets(pagination.currentPage + 1)}
                disabled={pagination.currentPage + 1 === pagination.totalPages}
                className={`px-4 py-2 rounded-full ${
                  pagination.currentPage + 1 === pagination.totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-goodBlue text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanRecordLog;
