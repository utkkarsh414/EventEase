/**
 * EventCard Component
 * --------------------
 * A reusable card that displays information about a single event.
 *
 * PROPS:
 *  - event: { id, title, category, date, description, icon, iconBg }
 *  - onRegisterClick: callback invoked when "Register Now" is clicked
 *
 * Demonstrates: Receiving data via props, rendering dynamic content,
 * and lifting events up to the parent through callback props.
 */
function EventCard({ event, onRegisterClick }) {
  return (
    <div className="event-card">
      {/* Icon with dynamic background color passed via props */}
      <div
        className="event-card__icon"
        style={{ background: event.iconBg }}
      >
        {event.icon}
      </div>

      {/* Event category, title, date and description from props */}
      <div className="event-card__category">{event.category}</div>
      <h3 className="event-card__title">{event.title}</h3>
      <p className="event-card__date">📅 {event.date}</p>
      <p className="event-card__desc">{event.description}</p>

      {/* Register button – calls the parent's handler with the event title */}
      <button
        className="event-card__btn"
        onClick={() => onRegisterClick(event.title)}
      >
        Register Now →
      </button>
    </div>
  );
}

export default EventCard;

