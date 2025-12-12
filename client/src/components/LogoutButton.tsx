import { supabase } from "@/lib/supabase/client";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/log-in");
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      Sign Out
    </Button>
  );
}
