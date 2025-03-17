import { Pencil, Trash2 } from "lucide-react";
import PropTypes from "prop-types";

const ContactCard = ({ contact, onEdit, onDelete }) => {
  const getContactLink = (value) => {
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return value;
    } else if (/^\d+$/.test(value)) {
      return `tel:${value}`;
    } else {
      return null;
    }
  };

  const contactLink = getContactLink(contact.contactValue);

  return (
    <li className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {contact.contactType}
        </h2>

        {contactLink ? (
          <a
            href={contactLink}
            target={contactLink.startsWith("tel:") ? "_self" : "_blank"}
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
          className="p-2 hover:bg-gray-600 rounded-full transition"
        >
          <Pencil className="w-5 h-5 text-gray-500 hover:text-gray-200" />
        </button>

        <button
          onClick={() => onDelete(contact.contactId)}
          className="p-2 hover:bg-gray-600 rounded-full transition"
        >
          <Trash2 className="w-5 h-5 text-gray-500 hover:text-gray-200" />
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