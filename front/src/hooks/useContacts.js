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
    const MIN_LOADING_TIME = 300;
    const startTime = Date.now();
    try {
      const response = await getContacts();
      setContacts(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch pets.");
    } finally {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, MIN_LOADING_TIME - elapsed);
      setTimeout(() => setLoading(false), delay);
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
      setError("Failed to add contact.");
    }
  };

  const editContact = async (id, updatedData) => {
    try {
      if (!token) throw new Error("No token found");
      await putContact(id, updatedData, token);
      fetchContacts();
    } catch (err) {
      setError("Failed to edit contact.");
    }
  };

  const removeContact = async (id) => {
    try {
      if (!token) throw new Error("No token found");
      await deleteContact(id, token);
      fetchContacts();
    } catch (err) {
      setError("Failed to delete contact.");
    }
  };

  return { contacts, loading, error, createContact, fetchContacts, removeContact, editContact };
};

export default useContacts;