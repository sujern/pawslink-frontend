import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const ConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    message = "Are you sure you want to proceed?" 
}) => {
  const { t } = useTranslation()
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <p className="text-gray-700 text-center mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            {t("cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export default ConfirmationModal;