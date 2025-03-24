import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { apiGetUser } from "../api/auth";

const useWebSocket = () => {
  const API_ROOT = import.meta.env.VITE_API_ROOT;

  const [stompClient, setStompClient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await apiGetUser();
        setUserId(userData.userId);
      } catch (error) {
        // Suppress error logging
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_ROOT}/ws`),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (msg) => console.log("STOMP Debug: ", msg), // Optional: Keep debug logs
      onConnect: () => {
        console.log("✅ Connected to WebSocket");

        client.subscribe(`/topic/scan-notification/${userId}`, (message) => {
          setNotifications((prev) => [...prev, JSON.parse(message.body)]);
        });
      },
      onStompError: (frame) => {
        // Suppress STOMP error logging
      },
      onWebSocketError: (e) => {
        // Suppress WebSocket error logging
      },
      onDisconnect: () => {
        // Suppress disconnect warnings
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [userId, API_ROOT]);

  return notifications;
};

export default useWebSocket;