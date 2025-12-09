import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";

const MobileHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between items-center w-full p-6 bg-white shadow-md relative">
      <div id="logo">
        <a href="/" className="text-xl font-bold">
          Savora
        </a>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:block">
        <ul className="flex space-x-6">
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <a href="/expenses">Expenses</a>
          </li>
          <li>
            <a href="/options">Options</a>
          </li>
          <li>
            <a href="/help">Help</a>
          </li>
        </ul>
      </nav>

      <div className="hidden md:flex items-center space-x-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile menu drawer */}
      {open && (
  <div className="fixed inset-0 bg-white z-50 md:hidden flex flex-col">
    {/* Close button */}
    <button
      onClick={() => setOpen(false)}
      aria-label="Close menu"
      className="absolute top-4 right-4 p-2"
    >
      <X size={28} />
    </button>

    <nav className="p-6 ">
      <ul className="flex flex-col space-y-4">
        <li><a href="/" onClick={() => setOpen(false)}>Dashboard</a></li>
        <li><a href="/expenses" onClick={() => setOpen(false)}>Expenses</a></li>
        <li><a href="/options" onClick={() => setOpen(false)}>Options</a></li>
        <li><a href="/help" onClick={() => setOpen(false)}>Help</a></li>
      </ul>
    </nav>

    <div className="p-6 border-t">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  </div>
)}

    </header>
  );
};

export default MobileHeader;
