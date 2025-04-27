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
      const scanRecords = data._embedded?.scanRecordResponses || [];
      setScanRecords(scanRecords);

      setPagination({
        currentPage: data.page?.number || 0,
        totalPages: data.page?.totalPages || 0,
        pageSize: data.page?.size || 8,
        totalElements: data.page?.totalElements || 0,
      });
    } catch (err) {
      console.error("Failed to fetch scan records:", err);
      setScanRecords([]);
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
    <div className="min-h-screen pt-12 px-4 sm:px-8">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-6">
        <h1 className="text-2xl text-gray-800">
          {t("history")}{" "}
          {pagination.totalElements > 0 ? `(${pagination.totalElements})` : ""}
        </h1>
      </div>

      <div className="overflow-x-auto bg-white p-6 rounded-2xl shadow-md">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-goodBlue text-white rounded-t-lg">
            <tr>
              <th className="p-4 text-left font-semibold">{t("pet")}</th>
              <th className="p-4 text-left font-semibold">{t("image")}</th>
              <th className="p-4 text-left font-semibold">{t("address")}</th>
              <th className="p-4 text-left font-semibold">{t("scannedAt")}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="h-[300px]">
                  <div className="flex justify-center items-center h-full">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : scanRecords.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-12 text-gray-500 text-lg"
                >
                  {t("noRecords")}
                </td>
              </tr>
            ) : (
              scanRecords.map((record) => (
                <tr
                  key={record.scanId}
                  className="border-b hover:bg-gray-100 transition cursor-pointer"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${record.latitude},${record.longitude}`,
                      "_blank",
                      "noopener noreferrer"
                    )
                  }
                >
                  <td className="p-4">{record.petName}</td>
                  <td className="p-4">
                    <img
                      src={
                        record.petImageUrl || "https://via.placeholder.com/50"
                      }
                      alt={record.petName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                    />
                  </td>
                  <td className="p-4">{record.address || t("noData")}</td>
                  <td className="p-4">
                    {new Date(record.scannedAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {pagination.totalElements > pagination.pageSize && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 0}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                pagination.currentPage === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {t("previous")}
            </button>

            <span className="text-gray-600 font-medium">
              {t("page")} {pagination.currentPage + 1} {t("of")}{" "}
              {pagination.totalPages}
            </span>

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage + 1 === pagination.totalPages}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                pagination.currentPage + 1 === pagination.totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {t("next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanRecordLog;