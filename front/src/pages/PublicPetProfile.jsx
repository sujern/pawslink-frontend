import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import usePublicPet from "../hooks/usePublicPet";
import useLocationPermission from "../hooks/useLocationPermission";

const PublicPetProfile = () => {
  const { profileUrl } = useParams();
  const { pet, loading, error } = usePublicPet(profileUrl);
  const { t } = useTranslation();

  const { locationError } = useLocationPermission(pet?.petId);

  const getStatusStyles = (status) =>
    status === "NORMAL" ? "bg-green-500/20 text-green-600" : "bg-yellow-500/20 text-yellow-600";

  const getDotStyles = (status) =>
    status === "NORMAL" ? "bg-green-500" : "bg-red-500";

  const getContactLink = (type, value) => {
    if (type === "email") {
      return `mailto:${value}`;
    } else if (type === "line") {
      return `https://line.me/ti/p/~${value}`;
    } else if (value.startsWith("http://") || value.startsWith("https://")) {
      return value;
    } else if (/^\d+$/.test(value)) {
      return `tel:${value}`;
    } else {
      return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-xl">{t("loadPet")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      {locationError && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {locationError}
        </div>
      )}

      <div className="relative w-40 h-40 mb-4">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-lg"
        />
      </div>

      <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusStyles(pet.status)}`}>
        <span className={`w-2 h-2 me-1 rounded-full ${getDotStyles(pet.status)}`}></span>
        {pet.status.toLowerCase()}
      </span>

      <h1 className="text-3xl font-bold text-gray-800 mt-2">{pet.name}</h1>

      {pet.bio && (
        <p className="text-center text-lg text-gray-600 mt-2 mb-4 max-w-md">{pet.bio}</p>
      )}

      <div className="grid grid-cols-2 gap-4 p-6 bg-white rounded-lg shadow-lg border max-w-md">
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-500">{t("species")}</h3>
          <p className="text-lg font-semibold text-gray-800">{pet.species}</p>
        </div>
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-500">{t("breed")}</h3>
          <p className="text-lg font-semibold text-gray-800">{pet.breed}</p>
        </div>
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-500">{t("gender")}</h3>
          <p className="text-lg font-semibold text-gray-800">{pet.gender}</p>
        </div>
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-500">{t("age")}</h3>
          <p className="text-lg font-semibold text-gray-800">
            {new Date().getFullYear() - new Date(pet.dateOfBirth).getFullYear()}{" "}
            years
          </p>
        </div>
      </div>

      {pet.status !== "NORMAL" && pet.contacts.length > 0 && (
          <div className="mt-6 w-full max-w-md space-y-4">
            {pet.contacts.map((contact) => {
              const link = getContactLink(contact.contactType, contact.contactValue);
              return link ? (
                <a
                    key={contact.contactId}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-3 px-6 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition bg-blue-500 hover:bg-blue-600"
                >
                  {contact.contactType.toUpperCase()}
                </a>
              ) : (
                <div
                    key={contact.contactId}
                    className="block w-full text-center py-3 px-6 rounded-full text-gray-500 font-semibold shadow-lg bg-gray-200 cursor-not-allowed"
                >
                  {contact.contactType.toUpperCase()}
                </div>
              );
            })}
          </div>
      )}
      
    </div>
  );
};

export default PublicPetProfile;