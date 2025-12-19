/* eslint-disable react/react-in-jsx-scope */
import { useSession } from "@/store/auth.store";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoutButton } from "./LogoutButton";
import { LoginButton } from "./LoginButton";

const MobileHeader = () => {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header
      data-testid="mobile-header"
      className="flex justify-between items-center w-full p-6 bg-white shadow-md relative"
    >
      <div id="logo">
        <a href="/" className="text-xl font-bold">
          Savora
        </a>
      </div>

      <button
        type="button"
        className="md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col">
          <div className="bg-background">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 right-4 p-2"
            >
              <X size={28} />
            </button>

            <nav className="p-6">
              <ul className="flex flex-col space-y-4">
                <li>
                  <a href="/" onClick={() => setOpen(false)}>
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/expenses" onClick={() => setOpen(false)}>
                    Expenses
                  </a>
                </li>
                <li>
                  <a href="/accounts" onClick={() => setOpen(false)}>
                    Accounts
                  </a>
                </li>
                <li>
                  <a href="/options" onClick={() => setOpen(false)}>
                    Options
                  </a>
                </li>
                <li>
                  <a href="/help" onClick={() => setOpen(false)}>
                    Help
                  </a>
                </li>
              </ul>
            </nav>
            <div className="pb-4">
              {session ? <LogoutButton /> : <LoginButton />}
            </div>
          </div>

          <div className="bg-foreground/50 h-full"></div>
        </div>
      )}
    </header>
  );
};

export default MobileHeader;
