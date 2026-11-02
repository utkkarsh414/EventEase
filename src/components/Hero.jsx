/**
 * Hero Component
 * ---------------
 * Displays the main hero/banner section of the landing page.
 * Demonstrates: Props are not needed here (self-contained),
 * onClick event handling for the CTA button, and smooth scrolling.
 */
function Hero() {
  // Scroll to the Events section when the CTA is clicked
  const handleExploreClick = () => {
    const el = document.getElementById('events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <div className="container">
        {/* Badge label */}
        <div className="hero__badge">🎓 College Event Portal</div>

        {/* Main heading with accent color on key word */}
        <h1 className="hero__title">
          Discover. Participate. <span>Celebrate.</span>
        </h1>

        {/* Description */}
        <p className="hero__description">
          Your one-stop platform for browsing and registering for exciting
          college events — from tech fests to cultural nights. Stay in the loop
          and never miss a moment.
        </p>

        {/* Call-to-action button with onClick handler */}
        <button className="hero__cta" onClick={handleExploreClick}>
          Explore Events ↓
        </button>

        {/* Quick stats for visual appeal */}
        <div className="hero__stats">
          <div className="hero__stat">
            <h3>4+</h3>
            <p>Events</p>
          </div>
          <div className="hero__stat">
            <h3>5</h3>
            <p>Departments</p>
          </div>
          <div className="hero__stat">
            <h3>100%</h3>
            <p>Free</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

