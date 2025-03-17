import { useState, useEffect, useCallback } from "react";
import { deleteContact, getContacts, postContact, putContact } from "../api/contactService";
import useAuth from "./useAuth";


const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();


  const fetchContacts = useCallback(async () => {
    setLoading(true);
    // console.log("Current Token:", token); // ตรวจสอบ token
    try {
      const response = await getContacts();
      console.log("Response data:", response.data);
      setContacts(response.data);
      setError(null);
    } catch (err) {
      console.log("Current Token:", token); // ตรวจสอบ token
      console.error("Failed to fetch pets", err.response ? err.response.data : err.message);
      setError("Failed to fetch pets.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const createContact = async (newContact) => {
    try {
      if (!token) throw new Error("No token found");
      await postContact(newContact, token);
      fetchContacts();
    } catch (err) {
      console.error("Failed to add contact:", err);
      setError("Failed to add contact.");
    }
  };

  const editContact = async (id, updatedData) => {
    try {
      if (!token) throw new Error("No token found");
      await putContact(id, updatedData, token);
      fetchContacts();
    } catch (err) {
      console.error("Failed to edit contact:", err);
      setError("Failed to edit contact.");
    }
  };

  const removeContact = async (id) => {
    try {
      if (!token) throw new Error("No token found");
      await deleteContact(id, token);
      fetchContacts();
    } catch (err) {
      console.error("Failed to delete contact:", err);
      setError("Failed to delete contact.");
    }
  };

  return { contacts, loading, error, createContact, fetchContacts, removeContact, editContact };
};

export default useContacts;