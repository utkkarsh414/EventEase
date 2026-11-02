/**
 * Footer Component
 * -----------------
 * Renders a simple, professional footer with branding and quick links.
 * This is a presentational component with no state.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          {/* Brand info */}
          <div className="footer__brand">
            <h3>🎓 EventEase</h3>
            <p>
              A college event registration platform helping students discover
              and participate in campus activities.
            </p>
          </div>

          {/* Quick links */}
          <div className="footer__links-group">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#hero">Home</a>
              </li>
              <li>
                <a href="#events">Events</a>
              </li>
              <li>
                <a href="#register">Register</a>
              </li>
              <li>
                <a href="#participants">Participants</a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="footer__links-group">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="#">eventease@college.edu</a>
              </li>
              <li>
                <a href="#">+91 98765 43210</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          © {new Date().getFullYear()} EventEase. Built with React &amp; Vite.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

