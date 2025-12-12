import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export function LoginButton() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    navigate("/log-in");
  };

  return (
    <Button onClick={handleLogin} variant="outline">
      Login
    </Button>
  );
}
