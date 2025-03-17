// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { getPetById, putPet } from "../api/petService.js";
// import ConfirmationModal from "../components/ConfirmModal.jsx";
// import usePets from "../hooks/usePets.js";
// import { useTranslation } from "react-i18next";

// const EditPet = () => {
//   const { petId } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     species: "",
//     breed: "",
//     dateOfBirth: "",
//     gender: "MALE",
//     imageUrl: "",
//     status: "NORMAL",
//     bio: "",
//     profileUrl: "",
//     file: null,
//   });
//   const [loading, setLoading] = useState(true);
//   const [preview, setPreview] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { t } = useTranslation();

//   const fetchPet = async () => {
//     try {
//       const { data: petData } = await getPetById(petId);
//       setFormData({
//         name: petData.name || "",
//         species: petData.species || "",
//         breed: petData.breed || "",
//         dateOfBirth: petData.dateOfBirth || "",
//         gender: petData.gender || "MALE",
//         imageUrl: petData.imageUrl || "",
//         status: petData.status || "NORMAL",
//         bio: petData.bio || "",
//         profileUrl: petData.profileUrl || "",
//         file: null,
//       });
//       setPreview(petData.imageUrl || null);
//     } catch (err) {
//       console.error("Error fetching pet:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPet();
//   }, [petId]);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       const file = files[0];
//       setFormData((prev) => ({ ...prev, file }));
//       setPreview(file ? URL.createObjectURL(file) : formData.imageUrl);
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleConfirmSave = async () => {
//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "file" && formData[key]) {
//         formDataToSend.append(key, formData[key]);
//       } else if (key !== "file") {
//         formDataToSend.append(key, formData[key] || "");
//       }
//     });

//     try {
//       setIsSubmitting(true);
//       await putPet(petId, formDataToSend);

//       setFormData({
//         name: "",
//         species: "",
//         breed: "",
//         dateOfBirth: "",
//         gender: "MALE",
//         imageUrl: "",
//         status: "NORMAL",
//         bio: "",
//         profileUrl: "",
//         file: null,
//       });
//       setPreview(null);
//       navigate(`/pets/${petId}`);
//     } catch (err) {
//       console.error("Error updating pet:", err);
//       alert("Failed to save pet details. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//       setIsModalOpen(false);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold mb-6 text-center">{t("editPet")}</h1>
//       <div className="flex flex-col items-center mb-6 relative">
//         {preview ? (
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-52 h-52 object-cover rounded-full border"
//           />
//         ) : (
//           <div className="w-52 h-52 rounded-full bg-gray-200 flex items-center justify-center border">
//             <span className="text-gray-500">{t("noImage")}</span>
//           </div>
//         )}
//         <div className="absolute bottom-0 translate-y-1/2">
//           <label
//             htmlFor="fileInput"
//             className="bg-indigo-600 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
//           >
//             {t("uploadImage")}
//           </label>
//           <input
//             type="file"
//             id="fileInput"
//             name="file"
//             onChange={handleChange}
//             className="hidden"
//           />
//         </div>
//       </div>
//       <form className="space-y-4">
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             {t("name")}:
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             {t("species")}:
//           </label>
//           <input
//             type="text"
//             name="species"
//             value={formData.species}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             {t("breed")}:
//           </label>
//           <input
//             type="text"
//             name="breed"
//             value={formData.breed}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             {t("dateOfBirth")}:
//           </label>
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             {t("gender")}:
//           </label>
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
//             required
//           >
//             <option value="MALE">{t("male")}</option>
//             <option value="FEMALE">{t("female")}</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             {t("profileUrl")}:
//           </label>
//           <input
//             type="url"
//             name="profileUrl"
//             value={formData.profileUrl}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             {t("status")}:
//           </label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
//             required
//           >
//             <option value="NORMAL">{t("normal")}</option>
//             <option value="LOST">{t("lost")}</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             {t("bio")}:
//           </label>
//           <textarea
//             name="bio"
//             value={formData.bio}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
//           />
//         </div>
//         <button
//           type="button"
//           onClick={openModal}
//           className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
//         >
//           {isSubmitting ? "Saving..." : "Save Changes"}
//         </button>
//       </form>

//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onConfirm={handleConfirmSave}
//         message={t("confirmEdit")}
//       />
//     </div>
//   );
// };

// export default EditPet;
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPetById, putPet } from "../api/petService.js";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../components/ConfirmModal.jsx"; // เพิ่ม import modal

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
  const [showConfirmation, setShowConfirmation] = useState(false); // ใช้ในการควบคุมการแสดง modal

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
          status: petData.status || "NORMAL",
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

    // ถ้าไม่มีการอัปโหลดไฟล์ใหม่, ให้ตรวจสอบว่า imageUrl มีค่าหรือไม่
    if (!formData.file && !formData.imageUrl) {
      newErrors.file = t("uploadImage"); // แจ้งว่าให้เลือกไฟล์
    }

    // ตรวจสอบฟิลด์ที่ต้องการ
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
    setShowConfirmation(true); // แสดง modal เมื่อกด submit
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

        {[
          { label: "name", type: "text", isRequired: true },
          { label: "species", type: "text", isRequired: true },
          { label: "breed", type: "text", isRequired: true },
          { label: "dateOfBirth", type: "date", isRequired: true },
        ].map(({ label, type, isRequired }) => (
          <div key={label}>
            <label className="block text-gray-700 font-medium mb-1">
              {t(label)}:{isRequired && <span className="text-red-500">*</span>}{" "}
              {/* สัญลักษณ์ * สำหรับฟิลด์ที่จำเป็น */}
            </label>
            <input
              type={type}
              name={label}
              value={formData[label]}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 ${
                errors[label] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[label] && (
              <p className="text-red-500 text-sm">{errors[label]}</p>
            )}
          </div>
        ))}

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {t("gender")}:
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
            {t("status")}:
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
            {t("saveChanges")}
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCancelConfirmation}
        onConfirm={handleConfirmationSubmit}
        message={t("areYouSure")}
      />
    </div>
  );
};

export default EditPet;
