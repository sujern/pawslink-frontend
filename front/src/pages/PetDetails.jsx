import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPetById } from "../api/petService.js";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth.js";

const PetDetails = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    async function fetchPet() {
      try {
        const response = await getPetById(petId);
        setPet(response.data);
      } catch {
        setError("Failed to load pet details!");
      } finally {
        setLoading(false);
      }
    }
    fetchPet();
  }, [petId]);

  if (loading) {
    return <p>{t("loadPet")}</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="relative">
        <div className="relative">
          <Link
            to={`/pets/${petId}/edit`}
            className="absolute top-0 right-0 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
          >
            {t("editPet")}
          </Link>
        </div>
      </div>

      <img
        src={pet.imageUrl || "https://via.placeholder.com/200"}
        alt={pet.name || "Unknown Pet"}
        className="w-40 h-40 rounded-full mx-auto object-cover mb-6"
      />
      <p className="text-center text-gray-500 mb-6">{pet.bio}</p>
      <div className="border border-gray-300 bg-transparent p-6 rounded-md">
        <h2 className="text-2xl font-bold text-center mt-4 text-gray-800">
          {pet.name}
        </h2>
        <p className="text-center text-gray-500">
          {pet.breed || "Unknown Breed"}
        </p>
        <p className="text-center text-gray-500">
          <span className="font-bold p-2"> {t("gender")} : </span>
          {pet.gender.toLowerCase() || "Unknown gender"} |{" "}
          <span className="font-bold p-2"> {t("species")} : </span>
          {pet.species.toLowerCase() || "Unknown species"}
        </p>
        <p className="text-center text-gray-500">
          {pet.dateOfBirth || "Unknow dateOfBirth"}
        </p>
        <p className="text-center mt-4">
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm ${
              pet.status === "NORMAL"
                ? "bg-green-500/20 text-green-600"
                : pet.status === "LOST"
                ? "bg-yellow-500/20 text-yellow-600"
                : "bg-gray-500/20 text-gray-600"
            }`}
          >
            {pet.status || "Unknown Status"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PetDetails;
