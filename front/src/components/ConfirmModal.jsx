import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const ConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    message = "Are you sure you want to proceed?" 
}) => {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (isProcessing) return;
    setIsProcessing(true); 
    await onConfirm();
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <p className="text-gray-700 text-center mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            disabled={isProcessing}
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg ${
              isProcessing
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            disabled={isProcessing}
          >
            {isProcessing ? t("processing") : t("confirm")}
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