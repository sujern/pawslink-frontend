import PropTypes from "prop-types";

const QRCodeModal = ({ isOpen, qrCode, petName, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg z-60 w-[400px] max-w-full"
        onClick={(e) => e.stopPropagation()} // ป้องกันการปิด Modal เมื่อคลิกภายใน
      >
        <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">
          QR Code for {petName}
        </h3>
        {qrCode ? (
          <img
            src={qrCode}
            alt="QR Code"
            className="w-60 h-60 mx-auto mb-6"
          />
        ) : (
          <p className="text-red-500 text-center">Failed to load QR Code</p>
        )}
        <div className="flex justify-center space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
          {qrCode && (
            <a
              href={qrCode}
              download={`${petName.replace(/\s+/g, "_")}_QR_Code.png`}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

QRCodeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, 
  qrCode: PropTypes.string, 
  petName: PropTypes.string.isRequired, 
  onClose: PropTypes.func.isRequired, 
};

export default QRCodeModal;