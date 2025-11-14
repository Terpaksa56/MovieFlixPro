import { Link } from "react-router-dom";

const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
    >
      {children}
    </Link>
  );
};

export default NavLink;
