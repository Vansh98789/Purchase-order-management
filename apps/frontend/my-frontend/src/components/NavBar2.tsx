import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 h-16 border-b bg-white">

      <div className="text-xl font-semibold tracking-wide">
        Ordrly
      </div>

      <NavLink
        to="/vendor-auth"
        className="px-5 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition"
      >
        Login / Signup Vendor
      </NavLink>

    </nav>
  );
};

export default Navbar;