import { Pencil, Trash2 } from "lucide-react";
import PropTypes from "prop-types";

const ContactCard = ({ contact, onEdit, onDelete }) => {
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

  const contactLink = getContactLink(contact.contactType, contact.contactValue);

  return (
    <li className="bg-gray-100 rounded-xl shadow-md p-4 hover:bg-gray-50 transition relative group flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {contact.contactType}
        </h2>

        {contactLink ? (
          <a
            href={contactLink}
            target={contact.contactType === "email" || contact.contactType === "line" ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {contact.contactValue}
          </a>
        ) : (
          <p className="text-gray-600">{contact.contactValue}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(contact.contactId)}
          className="flex justify-center items-center bg-yellow-200 hover:bg-yellow-300 text-yellow-600 w-10 h-10 rounded-full shadow-md transition"
        >
          <Pencil className="w-5 h-5" />
        </button>

        <button
          onClick={() => onDelete(contact.contactId)}
          className="flex justify-center items-center bg-red-200 hover:bg-red-300 text-red-600 w-10 h-10 rounded-full shadow-md transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.shape({
    contactId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    contactType: PropTypes.string.isRequired,
    contactValue: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactCard;