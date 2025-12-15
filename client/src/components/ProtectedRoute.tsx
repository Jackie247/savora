import { Navigate } from "react-router";
import useAuthStore from "@/store/auth.store";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, loading } = useAuthStore();

  if (loading) return null; // or spinner

  if (!session) {
    return <Navigate to="/log-in" replace />;
  }

  return <>{children}</>;
}
