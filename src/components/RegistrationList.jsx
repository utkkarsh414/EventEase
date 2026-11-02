/**
 * RegistrationList Component
 * ----------------------------
 * Displays all registered participants dynamically.
 *
 * PROPS:
 *  - registrations: array of registration objects
 *  - onDelete: callback invoked with the registration id to delete
 *
 * Demonstrates:
 *  - Conditional rendering for empty state vs. populated list
 *  - map() to render a list with unique keys
 *  - onClick event handling to delete a registration
 *  - Lifting state up via callback props
 */
function RegistrationList({ registrations, onDelete }) {
  return (
    <section className="section" id="participants">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">Registered Participants</h2>
          <p className="section__subtitle">
            {registrations.length > 0
              ? `${registrations.length} student${registrations.length > 1 ? 's' : ''} registered so far.`
              : 'No registrations yet.'}
          </p>
        </div>

        <div className="reg-list">
          {/* Conditional rendering: empty state */}
          {registrations.length === 0 ? (
            <div className="reg-list__empty">
              <div className="reg-list__empty-icon">📋</div>
              <h4>No Registrations Yet</h4>
              <p>Be the first to register for an event above!</p>
            </div>
          ) : (
            // Populated list rendered with map() and unique keys
            <div className="reg-list__items">
              {registrations.map((reg) => (
                <div className="reg-list__item" key={reg.id}>
                  <div className="reg-list__info">
                    <h4>{reg.name}</h4>
                    <p>
                      {reg.department} · {reg.year}
                    </p>
                    <span className="reg-list__event-badge">{reg.event}</span>
                  </div>

                  {/* Delete button – onClick calls parent's onDelete */}
                  <button
                    className="reg-list__delete"
                    onClick={() => onDelete(reg.id)}
                  >
                    ✕ Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default RegistrationList;

