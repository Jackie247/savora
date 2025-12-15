import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export function LoginButton() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    navigate("/log-in");
  };

  return (
    <div className="flex w-full justify-center">
      <Button
        className="w-3/4 bg-secondary-foreground text-secondary"
        onClick={handleLogin}
        variant="outline"
      >
        Login
      </Button>
    </div>
  );
}
