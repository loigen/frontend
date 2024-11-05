import { useState, useEffect } from "react";
import { getRequest } from "../utils/service";

export const useFetchRecipient = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members?.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return;

      try {
        const response = await getRequest(
          `https://backend-production-c8da.up.railway.app/auth/signup/user/find/${recipientId}`
        );

        if (response.error) {
          setError(response.error);
          return;
        }

        setRecipientUser(response);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      }
    };

    getUser();
  }, [recipientId, chat, user]);

  return { recipientUser, error };
};
