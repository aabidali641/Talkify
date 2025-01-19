import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Info,
  LogOut,
  Mail,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling menu
  const themeColor = "text-primary"; // DaisyUI theme color class, you can change this dynamically if needed

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className={`w-5 h-5 ${themeColor}`} />
              </div>
              <h1 className="text-lg font-bold">Talkify</h1>
            </Link>
          </div>

          {/* Navbar Links */}
          <div className="hidden md:flex items-center gap-2">
            <Link to={"/about"} className="btn btn-sm gap-2 transition-colors">
              <Info className="size-5" />
              <span className="hidden sm:inline">About Us</span>
            </Link>
            <Link
              to={"/contact"}
              className="btn btn-sm gap-2 transition-colors"
            >
              <Mail className="size-5" />
              <span className="hidden sm:inline">Contact Us</span>
            </Link>
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 transition-colors"
            >
              <Settings className="size-5" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Toggler for Small Screens */}
          <button
            onClick={toggleMenu}
            className={`md:hidden flex items-center justify-center p-2 ${themeColor} transition-all`}
          >
            <span className="sr-only">Open menu</span>
            <svg
              className={`w-6 h-6 ${themeColor}`} // Apply theme color to the toggler icon
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Visible only on small screens) */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } transition-all ease-in-out duration-300`}
      >
        <div className="flex flex-col items-end gap-2 p-4 bg-base-100 shadow-lg">
          {" "}
          {/* Right align links */}
          <Link
            to={"/about"}
            className="w-full text-left py-2 flex items-center gap-2 hover:bg-base-200 rounded-lg"
          >
            <Info className="size-5" />
            <span>About Us</span>
          </Link>
          <Link
            to={"/contact"}
            className="w-full text-left py-2 flex items-center gap-2 hover:bg-base-200 rounded-lg"
          >
            <Mail className="size-5" />
            <span>Contact Us</span>
          </Link>
          <Link
            to={"/settings"}
            className="w-full text-left py-2 flex items-center gap-2 hover:bg-base-200 rounded-lg"
          >
            <Settings className="size-5" />
            <span>Settings</span>
          </Link>
          {authUser && (
            <>
              <Link
                to={"/profile"}
                className="w-full text-left py-2 flex items-center gap-2 hover:bg-base-200 rounded-lg"
              >
                <User className="size-5" />
                <span>Profile</span>
              </Link>

              <button
                className="w-full text-left py-2 flex items-center gap-2 hover:bg-base-200 rounded-lg"
                onClick={logout}
              >
                <LogOut className="size-5" />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
