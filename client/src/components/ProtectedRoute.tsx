import { Navigate } from "react-router";
import { useLoading, useSession } from "@/store/auth.store";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const loading = useLoading();

  if (loading) return null; // or spinner

  if (!session) {
    return <Navigate to="/log-in" replace />;
  }

  return <>{children}</>;
}
