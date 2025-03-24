import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWebSocket from "../hooks/useWebSocket";
import { useNavigate } from "react-router-dom";

const WebSocketNotifications = () => {
  const notifications = useWebSocket();
  const navigate = useNavigate();
  const latestNotificationId = useRef(null);

  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotif = notifications[notifications.length - 1];

      if (latestNotificationId.current === latestNotif.id) {
        return;
      }
      latestNotificationId.current = latestNotif.id;

      toast.info(
        <div
          onClick={() => {
            toast.dismiss();
            navigate("/history");
          }}
          style={{ cursor: "pointer" }}
        >
          <span role="img" aria-label="alert">📢 </span>
          <strong className="text-blue-600">{latestNotif.petName}</strong> was scanned at{" "}
          <span className="text-gray-700">{latestNotif.address}</span>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { fontSize: "16px", fontWeight: "500", color: "#333" },
        }
      );
    }

    return () => {
      toast.dismiss();
    };
  }, [notifications, navigate]);

  return null;
};

export default WebSocketNotifications;