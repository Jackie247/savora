import { Bell } from "lucide-react";

const WelcomeCard = ({ firstName, lastName }) => {
  const name = `${firstName ?? ""} ${lastName ?? ""}`.trim();
  
  return (
    <section className="p-6 bg-sidebar-primary [clip-path:ellipse(120%_60%_at_50%_0%)]">
      <div className="flex flex-col">
        {name ? (
          <>
            <span className="text-primary-foreground">Welcome back</span>
            <div className="flex justify-between">
              <span className="text-2xl text-primary-foreground">{name}</span>
              <button type="button">
                <Bell className="text-primary-foreground" />
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="text-2xl text-primary-foreground">
              Welcome to your
            </span>
            <div className="flex justify-between">
              <span className="text-2xl text-primary-foreground">
                Dashboard
              </span>
              <button type="button">
                <Bell className="text-primary-foreground" />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="h-60"></div>
    </section>
  );
};

export default WelcomeCard;
