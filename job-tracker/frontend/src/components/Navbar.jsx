import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar" role="banner">
      <div className="nav-inner">
        <div className="brand">JobTracker</div>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <span className="hamburger" />
        </button>

        <nav
          className={`nav-links ${open ? "open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            className={({ isActive }) => "nav-button" + (isActive ? " active" : "")}
            onClick={() => setOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) => "nav-button" + (isActive ? " active" : "")}
            onClick={() => setOpen(false)}
          >
            Add Job
          </NavLink>

          <NavLink
            to="/activities"
            className={({ isActive }) => "nav-button" + (isActive ? " active" : "")}
            onClick={() => setOpen(false)}
          >
            Activities
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
