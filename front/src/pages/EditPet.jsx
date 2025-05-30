import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPetById, putPet } from "../api/petService.js";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../components/ConfirmModal.jsx";
import useAuth from "../hooks/useAuth.js";

const EditPet = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    dateOfBirth: "",
    gender: "MALE",
    imageUrl: "",
    status: "NORMAL",
    bio: "",
    profileUrl: "",
    file: null,
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { token } = useAuth();

  const [breedOptions, setBreedOptions] = useState({
    Dog: [],
    Cat: [],
  });

  // Fetch pet details to prefill the form
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const { data: petData } = await getPetById(petId);
        setFormData({
          name: petData.name || "",
          species: petData.species || "",
          breed: petData.breed || "",
          dateOfBirth: petData.dateOfBirth || "",
          gender: petData.gender || "MALE",
          imageUrl: petData.imageUrl || "",
          status: petData.status || "NORMAL", // ใช้ค่า status เดิมที่มีในข้อมูล
          bio: petData.bio || "",
          profileUrl: petData.profileUrl || "",
          file: null,
        });
        setPreview(petData.imageUrl || null);
      } catch (err) {
        console.error("Error fetching pet:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [petId]);

  // Fetch breed options for Dog and Cat
  useEffect(() => {
    if (formData.species === "Dog") {
      fetch("https://api.thedogapi.com/v1/breeds")
        .then((res) => res.json())
        .then((data) => {
          const dogBreeds = data.map((breed) => breed.name);
          setBreedOptions((prev) => ({ ...prev, Dog: dogBreeds }));
        })
        .catch((error) => console.error("Error fetching dog breeds:", error));
    } else if (formData.species === "Cat") {
      fetch("https://api.thecatapi.com/v1/breeds")
        .then((res) => res.json())
        .then((data) => {
          const catBreeds = data.map((breed) => breed.name);
          setBreedOptions((prev) => ({ ...prev, Cat: catBreeds }));
        })
        .catch((error) => console.error("Error fetching cat breeds:", error));
    }
  }, [formData.species]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, file }));
      setPreview(file ? URL.createObjectURL(file) : formData.imageUrl);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const requiredFields = ["name", "species", "breed", "dateOfBirth"];
    const newErrors = {};

    // Check for image upload
    if (!formData.file && !formData.imageUrl) {
      newErrors.file = t("uploadImage");
    }

    // Check required fields
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        const fieldName = t(field);
        newErrors[field] = t("requiredField", { field: fieldName });
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await putPet(petId, formDataToSend);
      navigate(`/pets/${petId}`);
    } catch (error) {
      setErrors({ submit: t("errorUpdatingPet") });
    }
  };

  const handleConfirmationSubmit = () => {
    setShowConfirmation(false);
    handleSubmit();
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">{t("editPet")}</h1>

      {/* Image Upload Section */}
      <div className="flex flex-col items-center mb-6 relative">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-52 h-52 object-cover rounded-full border"
          />
        ) : (
          <div
            className={`w-52 h-52 rounded-full flex items-center justify-center border ${
              errors.file ? "border-red-500" : "border-gray-300"
            }`}
          >
            <span className="text-gray-500">{t("noImage")}</span>
          </div>
        )}

        <div className="absolute bottom-0 translate-y-1/2">
          <label
            htmlFor="file"
            className={`bg-indigo-600 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-700 focus:ring focus:ring-indigo-300`}
          >
            {t("uploadImage")}
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        {errors.file && (
          <p className="text-red-500 text-sm text-center">{errors.file}</p>
        )}
        {errors.submit && (
          <p className="text-red-500 text-sm text-center">{errors.submit}</p>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("name")}:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
          </label>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("species")}:
            <select
              name="species"
              value={formData.species}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            >
              <option value="Dog">{t("dog")}</option>
              <option value="Cat">{t("cat")}</option>
            </select>
          </label>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("breed")}:
            <select
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            >
              <option value="">{t("selectBreed")}</option>
              {breedOptions[formData.species]?.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("dateOfBirth")}:
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
          </label>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("gender")}:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            >
              <option value="MALE">{t("male")}</option>
              <option value="FEMALE">{t("female")}</option>
            </select>
          </label>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("status")}:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            >
              <option value="NORMAL">{t("normal")}</option>
              <option value="LOST">{t("lost")}</option>
            </select>
          </label>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("bio")}:
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
          >
            {t("saveChanges")}
          </button>
        </div>
      </form>

      {showConfirmation && (
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={handleCancelConfirmation}
          onConfirm={handleConfirmationSubmit}
          message={t("areYouSure")}
        />
      )}
    </div>
  );
};

export default EditPet;
