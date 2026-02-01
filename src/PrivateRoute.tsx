import type { ReactElement } from "react";
import useTokenStore from "./hooks/Store";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactElement;
  publicPage: boolean;
}
export default function PrivateRoute({ children, publicPage }: Props) {
  const { token } = useTokenStore();

  if (publicPage) {
    return token ? <Navigate to="/dashboard" /> : children;
  }
  return !token ? <Navigate to="/login" /> : children;
}
