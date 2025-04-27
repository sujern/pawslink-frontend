import { Pencil, Trash2, Mail, Phone, Link as LinkIcon } from "lucide-react";
import PropTypes from "prop-types";

const ContactCard = ({ contact, onEdit, onDelete }) => {
  const getContactLink = (type, value) => {
    if (type === "email") {
      return { href: `mailto:${value}`, icon: <Mail className="w-5 h-5 text-blue-500" /> };
    } else if (type === "line") {
      return { href: `https://line.me/ti/p/~${value}`, icon: <LinkIcon className="w-5 h-5 text-green-500" /> };
    } else if (value.startsWith("http://") || value.startsWith("https://")) {
      return { href: value, icon: <LinkIcon className="w-5 h-5 text-blue-400" /> };
    } else if (/^\d+$/.test(value)) {
      return { href: `tel:${value}`, icon: <Phone className="w-5 h-5 text-green-600" /> };
    } else {
      return null;
    }
  };

  const contactLink = getContactLink(contact.contactType, contact.contactValue);

  return (
    <li className="flex items-center justify-between bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        {/* Logo / Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
          {contactLink?.icon || <LinkIcon className="w-5 h-5 text-gray-400" />}
        </div>

        {/* Contact Details */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 capitalize">
            {contact.contactType}
          </h2>
          {contactLink ? (
            <a
              href={contactLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-words"
            >
              {contact.contactValue}
            </a>
          ) : (
            <p className="text-gray-500">{contact.contactValue}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(contact.contactId)}
          className="flex items-center justify-center bg-yellow-100 hover:bg-yellow-200 text-yellow-600 w-10 h-10 rounded-full shadow-sm"
        >
          <Pencil className="w-5 h-5" />
        </button>

        <button
          onClick={() => onDelete(contact.contactId)}
          className="flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 w-10 h-10 rounded-full shadow-sm"
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