import PetCard from "../components/PetCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../components/ConfirmModal";
import usePets from "../hooks/usePets";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";

const PetProfileList = () => {
  const { pets, loading, fetchPets, error, removePet } = usePets(); // ดึงข้อมูลจาก usePets hook
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


  useEffect(() => {
    fetchPets().then(() => console.log("Pets fetched successfully"));
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
    <div className=" min-h-screen pt-8">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-6 px-8">
        <h1 className="text-2xl text-gray-800">
          {t("allPets")}{" "}
          {pets && pets.length > 0 ? `(${pets.length})` : ""}
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
          <div className=" text-xl text-red-500 text-center font-semibold ">
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
              key={pet.petId}
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
    </div>
  );
};

export default PetProfileList;
