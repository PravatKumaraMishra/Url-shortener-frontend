import type { ReactElement } from "react";
import { useEffect } from "react";
import useTokenStore from "./hooks/Store";
import { Navigate } from "react-router-dom";
import Loader from "./components/Loader";

interface Props {
  children: ReactElement;
  publicPage: boolean;
}
export default function PrivateRoute({ children, publicPage }: Props) {
  const { token, isInitialized, initializeToken } = useTokenStore();

  useEffect(() => {
    initializeToken();
  }, [initializeToken]);

  // Show loader while initializing
  if (!isInitialized) {
    return <Loader />;
  }

  if (publicPage) {
    return token ? <Navigate to="/dashboard" /> : children;
  }
  return !token ? <Navigate to="/login" /> : children;
}
