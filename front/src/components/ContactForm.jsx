import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ContactForm = ({ onSubmit, onCancel, defaultValues }) => {
  const [contactType, setContactType] = useState("phone"); // Default to "phone"
  const [contactValue, setContactValue] = useState("");
  const [errors, setErrors] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (defaultValues) {
      setContactType(defaultValues.contactType || "phone");
      setContactValue(defaultValues.contactValue || "");
    }
  }, [defaultValues]);

  const validate = () => {
    const newErrors = {};

    if (!contactValue.trim()) {
      newErrors.contactValue = t("requiredField");
    } else if (contactType === "phone" && !/^\d+$/.test(contactValue)) {
      newErrors.contactValue = t("invalidPhoneNumber");
    } else if (
      (contactType === "facebook" ||
        contactType === "instagram" ||
        contactType === "x") &&
      !contactValue.startsWith("http")
    ) {
      newErrors.contactValue = t("invalidUrl");
    } else if (
      contactType === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)
    ) {
      newErrors.contactValue = t("invalidEmail");
    } else if (contactType === "line" && !/^[a-zA-Z0-9._-]+$/.test(contactValue)) {
      newErrors.contactValue = t("invalidLineId");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({ contactType, contactValue });
    setContactType("phone");
    setContactValue("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          {t("contactType")}
        </label>
        <select
          value={contactType}
          onChange={(e) => setContactType(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        >
          <option value="phone">{t("phone")}</option>
          <option value="facebook">{t("facebook")}</option>
          <option value="instagram">{t("instagram")}</option>
          <option value="x">{t("x")}</option>
          <option value="email">{t("email")}</option>
          <option value="line">{t("line")}</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          {t("contactValue")}
        </label>
        <input
          type="text"
          value={contactValue}
          onChange={(e) => setContactValue(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder={t("enterContactValue")}
          required
        />
        {errors.contactValue && (
          <p className="text-red-500 text-sm mt-1">{errors.contactValue}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          {t("cancel")}
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {t("confirm")}
        </button>
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    contactType: PropTypes.string,
    contactValue: PropTypes.string,
  }),
};

export default ContactForm;