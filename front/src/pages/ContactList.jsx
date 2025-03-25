import useContacts from "../hooks/useContacts";
import ContactCard from "../components/ContactCard";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import ContactForm from "../components/ContactForm";
import ConfirmationModal from "../components/ConfirmModal";
import { useTranslation } from "react-i18next";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ContactList = () => {
  const {
    contacts,
    loading,
    error,
    createContact,
    removeContact,
    editContact,
  } = useContacts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingContact, setDeletingContact] = useState(null);
  const { t } = useTranslation();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


  const handleAddContact = async (newContact) => {
    await createContact(newContact);
    setIsModalOpen(false);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (updatedData) => {
    if (editingContact) {
      await editContact(editingContact.contactId, updatedData);
      setEditingContact(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteClick = (contact) => {
    setDeletingContact(contact);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingContact) {
      await removeContact(deletingContact.contactId);
      setDeletingContact(null);
      setIsDeleteModalOpen(false);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-6 px-8">
        <h1 className="text-2xl text-gray-800">
          {t("allContacts")}{" "}
          {contacts && contacts.length > 0 ? `(${contacts.length})` : ""}
        </h1>
        <button
          className="bg-goodBlue text-white px-7 py-3 rounded-full shadow-md hover:bg-blue-700"
          onClick={() => {
            setEditingContact(null);
            setIsModalOpen(true);
          }}
        >
          + {t("addContact")}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader />
        </div>
      ) : contacts && contacts.length > 0 ? (
        <ul className="space-y-5 px-10">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.contactId}
              contact={contact}
              onEdit={() => handleEdit(contact)}
              onDelete={() => handleDeleteClick(contact)}
            />
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center mt-20">
          <p className="text-gray-500 text-xl">{t("noContactsAvailable")}</p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">
          {editingContact ? t("editContact") : t("addContact")}
        </h2>
        <ContactForm
          defaultValues={editingContact}
          onSubmit={editingContact ? handleEditSubmit : handleAddContact}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={t("confirmDelete")}
      />
    </div>
  );
};

export default ContactList;
