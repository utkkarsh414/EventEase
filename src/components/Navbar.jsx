import { useState } from 'react';

/**
 * Navbar Component
 * ----------------
 * Renders a sticky navigation bar with logo and navigation links.
 * Demonstrates: useState for mobile toggle, onClick event handling,
 * conditional className application, and responsive navigation.
 */
function Navbar() {
  // State to track whether mobile menu is open
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle mobile navigation menu
  const handleToggle = () => setMobileOpen((prev) => !prev);

  // Close mobile menu when a nav link is clicked
  const handleLinkClick = (targetId) => {
    setMobileOpen(false);
    // Smooth scroll to the target section
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo */}
        <div className="navbar__logo">
          <div className="navbar__logo-icon">E</div>
          EventEase
        </div>

        {/* Navigation links – dynamically apply mobile-open class */}
        <ul
          className={`navbar__links ${
            mobileOpen ? 'navbar__links--mobile-open' : ''
          }`}
        >
          <li>
            <a className="navbar__link" onClick={() => handleLinkClick('hero')}>
              Home
            </a>
          </li>
          <li>
            <a className="navbar__link" onClick={() => handleLinkClick('events')}>
              Events
            </a>
          </li>
          <li>
            <a className="navbar__link" onClick={() => handleLinkClick('register')}>
              Register
            </a>
          </li>
        </ul>

        {/* Hamburger button (visible on mobile only via CSS) */}
        <button
          className="navbar__toggle"
          onClick={handleToggle}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

