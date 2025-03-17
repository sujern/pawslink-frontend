import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ContactForm = ({ onSubmit, onCancel, defaultValues }) => {
  const [contactType, setContactType] = useState("");
  const [contactValue, setContactValue] = useState("");
  const [errors, setErrors] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (defaultValues) {
      setContactType(defaultValues.contactType || "");
      setContactValue(defaultValues.contactValue || "");
    }
  }, [defaultValues]);

  const validate = () => {
    const newErrors = {}

    if (
        !contactValue.startsWith("http") &&
        !/^\d+$/.test(contactValue)
    ) {
      newErrors.contactValue = t("urlOrPhoneError");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({ contactType, contactValue });
    setContactType("");
    setContactValue("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          {t("title")}
        </label>
        <input
          type="text"
          value={contactType}
          onChange={(e) => setContactType(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder={t("egType")}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          {t("url")}
        </label>
        <input
          type="text"
          value={contactValue}
          onChange={(e) => setContactValue(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder={t("egValue")}
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