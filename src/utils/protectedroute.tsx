import { Navigate } from "react-router-dom";
import type {ReactNode} from "react";
import { useAuth } from "../hooks/useauth";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

