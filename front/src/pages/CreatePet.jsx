import { useState, useRef, useEffect } from "react";
import { createPet } from "../api/petService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../components/ConfirmModal";
import useAuth from "../hooks/useAuth";

const CreatePet = () => {
  const [formData, setFormData] = useState({
    name: "",
    species: "Dog",
    breed: "",
    dateOfBirth: "",
    gender: "Male",
    profileUrl: "",
    status: "Normal",
    bio: "",
    file: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [breedOptions, setBreedOptions] = useState({
    Dog: [],
    Cat: [],
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    fetch("https://api.thedogapi.com/v1/breeds")
      .then((res) => res.json())
      .then((data) => {
        const dogBreeds = data.map((breed) => breed.name);
        setBreedOptions((prev) => ({ ...prev, Dog: dogBreeds }));
      })
      .catch((error) => console.error("Error fetching dog breeds:", error));

    fetch("https://api.thecatapi.com/v1/breeds")
      .then((res) => res.json())
      .then((data) => {
        const catBreeds = data.map((breed) => breed.name);
        setBreedOptions((prev) => ({ ...prev, Cat: catBreeds }));
      })
      .catch((error) => console.error("Error fetching cat breeds:", error));
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file && file.size > 8 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, [name]: t("fileTooLarge") }));
        return;
      }
      setErrors((prev) => ({ ...prev, [name]: "" }));
      setFormData((prev) => ({ ...prev, file }));

      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));

      if (name === "species") {
        setFormData((prev) => ({ ...prev, breed: "" }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["name", "species", "breed", "dateOfBirth", "file"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        const fieldName = field === "file" ? t("uploadImage") : t(field);
        newErrors[field] = t("requiredField", { field: fieldName });
      }
    });

    console.log("Validation errors:", newErrors);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowModal(true);
  };

  const confirmSubmit = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    console.log("FormData being sent:", [...formDataToSend.entries()]);

    try {
      await createPet(formDataToSend);
      navigate("/pets");
    } catch (error) {
      console.error("Error creating pet:", error);
      setErrors({ submit: t("errorCreatingPet") });
    }

    setShowModal(false);
  };

  const cancelSubmit = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">{t("addPet")}</h1>

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
            ref={fileInputRef}
            onChange={handleChange}
            className="hidden"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.file && (
          <p className="text-red-500 text-sm text-center">{errors.file}</p>
        )}
        {errors.submit && (
          <p className="text-red-500 text-sm text-center">{errors.submit}</p>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("name")}:<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={t("enterName")}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("species")}:<span className="text-red-500">*</span>
          </label>
          <select
            name="species"
            value={formData.species}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
          >
            <option value="Dog">{t("dog")}</option>
            <option value="Cat">{t("cat")}</option>
          </select>
        </div>

        {/* Breed Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("breed")}:<span className="text-red-500">*</span>
          </label>
          <select
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 ${
              errors.breed ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">{t("selectBreed")}</option>
            {breedOptions[formData.species].map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          {errors.breed && (
            <p className="text-red-500 text-sm">{errors.breed}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("dateOfBirth")}:<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 ${
              errors.dateOfBirth ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("gender")}:<span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
          >
            <option value="MALE">{t("male")}</option>
            <option value="FEMALE">{t("female")}</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("status")}:<span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
          >
            <option value="NORMAL">{t("normal")}</option>
            <option value="LOST">{t("lost")}</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("bio")}:
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 ${
              errors.bio ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
          >
            {t("createPet")}
          </button>
        </div>
      </form>

      <ConfirmationModal
        isOpen={showModal}
        onClose={cancelSubmit}
        onConfirm={confirmSubmit}
        message={t("confirmCreatePet")}
      />
    </div>
  );
};

export default CreatePet;
