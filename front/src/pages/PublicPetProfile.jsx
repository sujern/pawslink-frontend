import { Mail, Phone, Link as LinkIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import usePublicPet from "../hooks/usePublicPet";
import useLocationPermission from "../hooks/useLocationPermission";
import NotFound from "./NotFound";

const PublicPetProfile = () => {
  const { profileUrl } = useParams();
  const { pet, loading, error } = usePublicPet(profileUrl);
  const { t } = useTranslation();
  const { locationError, isRequestingLocation, requestLocationPermission } =
    useLocationPermission(pet?.petId);

  const getStatusStyles = (status) =>
    status === "NORMAL"
      ? "bg-green-500/20 text-green-600"
      : "bg-yellow-500/20 text-yellow-600";

  const getDotStyles = (status) =>
    status === "NORMAL" ? "bg-green-500" : "bg-red-500";

  const getContactLink = (type, value) => {
    if (type === "email") {
      return {
        href: `mailto:${value}`,
        icon: <Mail size={18} className="mr-2" />,
      };
    } else if (type === "line") {
      return {
        href: `https://line.me/ti/p/~${value}`,
        icon: <LinkIcon size={18} className="mr-2" />,
      };
    } else if (/^\d+$/.test(value)) {
      return {
        href: `tel:${value}`,
        icon: <Phone size={18} className="mr-2" />,
      };
    } else if (value.startsWith("http://") || value.startsWith("https://")) {
      return { href: value, icon: <LinkIcon size={18} className="mr-2" /> };
    } else {
      return null;
    }
  };

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    const days = today.getDate() - birthDate.getDate();

    let adjustedYears = years;
    let adjustedMonths = months;
    let adjustedDays = days;

    if (adjustedDays < 0) {
      adjustedMonths -= 1;
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      adjustedDays += previousMonth.getDate();
    }

    if (adjustedMonths < 0) {
      adjustedYears -= 1;
      adjustedMonths += 12;
    }

    if (adjustedYears > 0) {
      return `${adjustedYears} ${adjustedYears === 1 ? t("year") : t("years")}`;
    } else if (adjustedMonths > 0) {
      return `${adjustedMonths} ${
        adjustedMonths === 1 ? t("month") : t("months")
      } ${
        adjustedDays > 0
          ? `${adjustedDays} ${adjustedDays === 1 ? t("day") : t("days")}`
          : ""
      }`;
    } else {
      return `${adjustedDays} ${adjustedDays === 1 ? t("day") : t("days")}`;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <p className="text-gray-500 text-xl">{t("loadPet")}</p>
      </div>
    );
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      {locationError && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {locationError}
        </div>
      )}

      <div className="relative w-40 h-40 mb-4">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover rounded-full border-4 border-blue-300 shadow-xl"
        />
      </div>

      <span
        className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full ${getStatusStyles(
          pet.status
        )}`}
      >
        <span
          className={`w-2 h-2 me-1 rounded-full ${getDotStyles(pet.status)}`}
        ></span>
        {pet.status.toLowerCase()}
      </span>

      <h1 className="text-3xl font-bold text-gray-800 mt-3">{pet.name}</h1>

      {pet.bio && (
        <p className="text-center text-md text-gray-600 mt-2 mb-4 max-w-md italic">
          {pet.bio}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 p-6 bg-white rounded-xl shadow-xl border max-w-md w-full">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-medium text-gray-500">{t("species")}</h3>
          <p className="text-lg font-bold text-gray-800">{pet.species}</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-medium text-gray-500">{t("breed")}</h3>
          <p className="text-lg font-bold text-gray-800">{pet.breed}</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-medium text-gray-500">{t("gender")}</h3>
          <p className="text-lg font-bold text-gray-800">{pet.gender}</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-medium text-gray-500">{t("age")}</h3>
          <p className="text-lg font-bold text-gray-800">
            {calculateAge(pet.dateOfBirth)}
          </p>
        </div>
      </div>

      {pet.status !== "NORMAL" && (
        <div className="mt-6 w-full max-w-md space-y-4">
          <button
            onClick={requestLocationPermission}
            disabled={isRequestingLocation}
            className="flex items-center justify-center w-full py-3 px-6 rounded-2xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-md hover:shadow-lg transition text-lg"
          >
            {isRequestingLocation ? (
              <span className="animate-pulse">{t("loadingLocation")}</span>
            ) : (
              <>📍 {t("shareLocation")}</>
            )}
          </button>

          {pet.contacts.map((contact) => {
            const contactInfo = getContactLink(
              contact.contactType,
              contact.contactValue
            );

            return contactInfo ? (
              <a
                key={contact.contactId}
                href={contactInfo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 px-6 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition text-lg"
              >
                {contactInfo.icon}
                {contact.contactType}
              </a>
            ) : (
              <div
                key={contact.contactId}
                className="flex items-center justify-center w-full py-3 px-6 rounded-2xl bg-gray-200 text-gray-500 font-semibold shadow-md text-lg cursor-not-allowed"
              >
                {contact.contactType}
              </div>
            );
          })}

          {locationError && (
            <p className="text-red-500 text-center text-sm mt-2">
              {locationError}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PublicPetProfile;