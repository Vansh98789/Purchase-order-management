import { NavLink } from 'react-router-dom';

const links = [
  { to: 'myProduct', label: 'My Products' },
  { to: 'order', label: 'Orders' },
  { to: 'createProduct', label: 'Create Products' },

];

const Navbar = () => {
  return (
    <nav className="bg-[#0e0e12] border-b border-amber-900/20 px-8 h-14 flex items-center justify-between">

      <div className="text-amber-200 text-sm tracking-widest font-semibold">
        Ordrly
      </div>

      <div className="flex items-center gap-6 text-xs uppercase tracking-wider">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? 'text-amber-400'
                  : 'text-amber-700 hover:text-amber-400'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

     

    </nav>
  );
};

export default Navbar;