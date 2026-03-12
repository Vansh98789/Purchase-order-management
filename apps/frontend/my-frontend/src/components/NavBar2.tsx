import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-10 h-16 
                    bg-white/10 backdrop-blur-md 
                    border-b border-white/10">

      <div className="text-2xl font-bold tracking-wide text-white">
        Ordrly
      </div>

      <NavLink
        to="/vendor-auth"
        className="px-5 py-2.5 text-sm font-semibold rounded-lg
                   bg-gradient-to-r from-indigo-500 to-purple-600
                   text-white shadow-md
                   hover:shadow-xl hover:scale-105
                   transition-all duration-300"
      >
        Login / Signup Vendor
      </NavLink>

    </nav>
  );
};

export default Navbar;