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
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4 flex items-center gap-6 group">
      {/* Profile Image */}
      <Link
        to={`/pets/${pet.petId}`}
        className="flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={pet.imageUrl || "https://via.placeholder.com/100"}
          alt={pet.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-blue-300 shadow-sm"
        />
      </Link>

      {/* Pet Info */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/pets/${pet.petId}`}
          className="block"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-bold text-gray-800 truncate">{pet.name}</h2>
          <p className="text-gray-500 truncate">{pet.breed || "-"}</p>
          <span
            className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold capitalize ${
              pet.status === "NORMAL"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {pet.status.toLowerCase()}
          </span>
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {pet.status === "LOST" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFound(pet.petId);
            }}
            className="flex items-center justify-center bg-green-100 hover:bg-green-200 text-green-600 w-10 h-10 rounded-full shadow-sm transition"
            title="Mark as Found"
          >
            <CheckCircle className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenPublicProfile(pet.profileUrl);
          }}
          className="flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-600 w-10 h-10 rounded-full shadow-sm transition"
          title="Open Public Profile"
        >
          <Globe className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleShowQR();
          }}
          className="flex items-center justify-center bg-green-100 hover:bg-green-200 text-green-600 w-10 h-10 rounded-full shadow-sm transition"
          title="QR Code"
        >
          <ScanQrCode className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(pet.petId);
          }}
          className="flex items-center justify-center bg-yellow-100 hover:bg-yellow-200 text-yellow-600 w-10 h-10 rounded-full shadow-sm transition"
          title="Edit"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(pet.petId);
          }}
          className="flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 w-10 h-10 rounded-full shadow-sm transition"
          title="Delete"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* QR Modal */}
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
  onFound: PropTypes.func,
};

export default PetCard;