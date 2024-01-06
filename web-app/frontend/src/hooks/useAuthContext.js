import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  // Get the current user and authentication methods from the context.
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
