import PetCard from "../components/PetCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../components/ConfirmModal";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import { getPets } from "../api/petService"; // Import the API function

const PetProfileList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    pageSize: 5,
    totalElements: 0,
  });
  const [deletingPet, setDeletingPet] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchPets = async (page = 0) => {
    setLoading(true);
    const MIN_LOADING_TIME = 300;
    const startTime = Date.now();
    try {
      const response = await getPets(page, pagination.pageSize); // Fetch data from the API
      const data = response.data; // Access the `data` property of the response
      const petList = data._embedded?.petListDTOes || []; // Safely access petListDTOes
      setPets(petList);

      // Update pagination state
      setPagination({
        currentPage: data.page?.number || 0,
        totalPages: data.page?.totalPages || 0,
        pageSize: data.page?.size || 5,
        totalElements: data.page?.totalElements || 0,
      });
    } catch (err) {
      console.error("Failed to fetch pets:", err);
      setError("Failed to fetch pets: " + err.message);
    } finally {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, MIN_LOADING_TIME - elapsed);
      setTimeout(() => setLoading(false), delay);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleEdit = (petId) => {
    navigate(`/pets/${petId}/edit`);
  };

  const handleDeleteClick = (pet) => {
    setDeletingPet(pet);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingPet) {
      await removePet(deletingPet.petId);
      setDeletingPet(null);
      setIsDeleteModalOpen(false);
      fetchPets(pagination.currentPage); // Refresh the list after deletion
    }
  };

  const handleOpenPublicProfile = (profileUrl) => {
    if (profileUrl) {
      const publicProfileUrl = `/ms1/public/${profileUrl}`;
      window.open(publicProfileUrl, "_blank");
    } else {
      console.error("No profile URL available for this pet.");
    }
  };

  return (
    <div className="min-h-screen pt-8">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-6 px-8">
        <h1 className="text-2xl text-gray-800">
          {t("allPets")} {pagination.totalElements > 0 ? `(${pagination.totalElements})` : ""}
        </h1>
        <button
          className="bg-goodBlue text-white px-7 py-3 rounded-full shadow-md hover:bg-blue-700"
          onClick={() => navigate("/create")}
        >
          + {t("addPet")}
        </button>
      </div>

      {error && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-xl text-red-500 text-center font-semibold">
            {error}
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader />
        </div>
      ) : pets.length === 0 && !error ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-xl text-center font-semibold">{t("noPet")}</div>
        </div>
      ) : (
        <div className="space-y-5 px-8">
          {pets.map((pet) => (
            <PetCard
              key={pet.petId} // Use petId as the unique key
              pet={pet}
              onEdit={handleEdit}
              onDelete={() => handleDeleteClick(pet)}
              onOpenPublicProfile={handleOpenPublicProfile}
            />
          ))}
          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteConfirm}
            message={t("confirmDeletePet")}
          />
        </div>
      )}

      <div className="flex justify-between items-center mt-8 px-8">
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
      </div>
    </div>
  );
};

export default PetProfileList;