import EventCard from './EventCard';

/**
 * EventsSection Component
 * -------------------------
 * Renders a grid of event cards using the EVENTS_DATA array.
 *
 * PROPS:
 *  - events: array of event objects
 *  - onRegisterClick: callback to pass down to each EventCard
 *
 * Demonstrates: Mapping over arrays with map(), passing unique keys,
 * and forwarding callback props to child components.
 */
function EventsSection({ events, onRegisterClick }) {
  return (
    <section className="section" id="events">
      <div className="container">
        {/* Section header */}
        <div className="section__header">
          <h2 className="section__title">Upcoming Events</h2>
          <p className="section__subtitle">
            Browse our exciting lineup and reserve your spot today.
          </p>
        </div>

        {/* Grid of event cards rendered with map() */}
        <div className="events-grid">
          {events.map((event) => (
            // Each child in a list must have a unique "key" prop
            <EventCard
              key={event.id}
              event={event}
              onRegisterClick={onRegisterClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventsSection;

