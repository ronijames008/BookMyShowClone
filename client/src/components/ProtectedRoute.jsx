import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../apiCalls/users";

// This component checks if the user is authenticated by checking for a token in local storage.
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      const tokenInfo = await validateToken();
      if (!token || !tokenInfo.success) {
        navigate("/login");
      }
    })();
  }, [navigate]);

  return <div>{children}</div>;
}

export default ProtectedRoute;
