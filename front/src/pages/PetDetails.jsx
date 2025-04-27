import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPetById } from "../api/petService.js";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth.js";
import NotFound from "./NotFound.jsx";

const PetDetails = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    async function fetchPet() {
      try {
        const response = await getPetById(petId);
        setPet(response.data);
      } catch {
        setError(t("failedToLoadPetDetails"));
      } finally {
        setLoading(false);
      }
    }
    fetchPet();
  }, [petId, t]);

  if (loading) {
    return <p className="text-center text-gray-500">{t("loadPet")}</p>;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{pet.name}</h1>
        <Link
          to={`/pets/${petId}/edit`}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
        >
          {t("editPet")}
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={pet.imageUrl || "https://via.placeholder.com/200"}
          alt={pet.name || "Unknown Pet"}
          className="w-40 h-40 object-cover rounded-full border border-gray-300 shadow-md"
        />
        <div className="flex-1">
          <p
            className={`inline-block px-4 py-2 rounded-full text-sm ${
              pet.status === "NORMAL"
                ? "bg-green-100 text-green-600"
                : pet.status === "LOST"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {pet.status || t("unknownStatus")}
          </p>
          {pet.bio && (
            <p className="mt-4 text-gray-600 text-sm">{pet.bio}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="text-sm font-medium text-gray-500">{t("species")}</h3>
          <p className="text-lg font-semibold text-gray-800">
            {pet.species || t("unknownSpecies")}
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="text-sm font-medium text-gray-500">{t("breed")}</h3>
          <p className="text-lg font-semibold text-gray-800">
            {pet.breed || t("unknownBreed")}
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="text-sm font-medium text-gray-500">{t("gender")}</h3>
          <p className="text-lg font-semibold text-gray-800">
            {pet.gender || t("unknownGender")}
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="text-sm font-medium text-gray-500">
            {t("dateOfBirth")}
          </h3>
          <p className="text-lg font-semibold text-gray-800">
            {pet.dateOfBirth || t("unknownDateOfBirth")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;