import { Navigate } from "react-router-dom";
import { Children, useAuth } from "../context/userAuth";

export const Protected = ({ children }: Children) => {
  const { state } = useAuth();
  if (!state.user) {
    return <Navigate to='/login' replace={true} />;
  }
  return children;
};
