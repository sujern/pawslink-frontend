import { useState } from "react";
import { Globe, Pencil, Trash2, ScanQrCode, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getQRcode } from "../api/qrcodeService";
import QRCodeModal from "./QRCodeModal";

const PetCard = ({ pet, onEdit, onDelete, onOpenPublicProfile, onFound }) => {
  const [qrCode, setQrCode] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);

  const handleShowQR = async () => {
    const qrUrl = await getQRcode(pet.profileUrl);
    if (qrUrl) {
      setQrCode(qrUrl);
      setShowQRModal(true);
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl shadow-md p-4 hover:bg-gray-50 transition relative group">
      <Link to={`/pets/${pet.petId}`} className="flex items-center space-x-4">
        <img
          src={pet.imageUrl || "https://via.placeholder.com/100"}
          alt={pet.name}
          className="w-20 h-20 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{pet.name}</h2>
          <p className="text-gray-500">{pet.breed}</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${
              pet.status === "NORMAL"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {pet.status.toLowerCase()}
          </span>
        </div>
      </Link>

      <div className="absolute top-1/2 -translate-y-1/2 right-4 flex space-x-2 items-center gap-4">
        {pet.status === "LOST" && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFound(pet.petId);
              }}
              className="flex justify-center items-center bg-white hover:bg-gray-300 text-green-600 w-10 h-10 rounded-full shadow-md transition"
              title="Mark as Found"
            >
              <CheckCircle className="w-5 h-5" />
            </button>

            <div className="h-10 w-px bg-gray-300 mx-4"></div>
          </>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenPublicProfile(pet.profileUrl);
          }}
          className="flex justify-center items-center bg-blue-200 hover:bg-blue-300 text-blue-600 w-10 h-10 rounded-full shadow-md transition"
          title="Open Public Profile"
        >
          <Globe className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleShowQR();
          }}
          className="flex justify-center items-center bg-green-200 hover:bg-green-300 text-green-600 w-10 h-10 rounded-full shadow-md transition"
          title="QR Code Profile"
        >
          <ScanQrCode className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(pet.petId);
          }}
          className="flex justify-center items-center bg-yellow-200 hover:bg-yellow-300 text-yellow-600 w-10 h-10 rounded-full shadow-md transition"
          title="Edit"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(pet.petId);
          }}
          className="flex justify-center items-center bg-red-200 hover:bg-red-300 text-red-600 w-10 h-10 rounded-full shadow-md transition"
          title="Delete"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <QRCodeModal
        isOpen={showQRModal}
        qrCode={qrCode}
        petName={pet.name}
        onClose={() => setShowQRModal(false)}
      />
    </div>
  );
};

PetCard.propTypes = {
  pet: PropTypes.shape({
    petId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    breed: PropTypes.string,
    status: PropTypes.oneOf(["NORMAL", "LOST"]).isRequired,
    imageUrl: PropTypes.string,
    profileUrl: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOpenPublicProfile: PropTypes.func.isRequired,
};

export default PetCard;
