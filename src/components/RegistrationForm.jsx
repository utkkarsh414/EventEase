import { useState, useEffect } from 'react';

/**
 * RegistrationForm Component
 * ---------------------------
 * A controlled form that collects student registration details,
 * validates inputs client-side, and persists data to localStorage.
 *
 * PROPS:
 *  - events: array of event objects (used to populate the event dropdown)
 *  - registrations: current registration list (to check for duplicates)
 *  - onRegister: callback invoked with the new registration object
 *  - preselectedEvent: event title auto-filled when "Register Now" is clicked
 *
 * Demonstrates:
 *  - useState for form values, errors, and success state
 *  - Controlled inputs with value + onChange
 *  - onSubmit for form handling
 *  - Client-side validation with meaningful error messages
 *  - Conditional rendering for errors and success
 */

// Department and academic year options
const DEPARTMENTS = [
  'Computer Science',
  'IT',
  'Mechanical',
  'Civil',
  'Electronics',
];

const YEARS = ['First Year', 'Second Year', 'Third Year', 'Final Year'];

function RegistrationForm({
  events,
  registrations,
  onRegister,
  preselectedEvent,
}) {
  // ---- State: form field values (controlled inputs) ----
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    department: '',
    year: '',
    event: '',
  });

  // ---- State: validation error messages ----
  const [errors, setErrors] = useState({});

  // ---- State: success message after registration ----
  const [success, setSuccess] = useState(null);

  // ---- State: duplicate registration error ----
  const [duplicateError, setDuplicateError] = useState('');

  /**
   * Effect: When "Register Now" is clicked on an EventCard,
   * the preselectedEvent prop changes, so we update the form's
   * event field and scroll to the registration section.
   */
  useEffect(() => {
    if (preselectedEvent) {
      // Strip the timestamp suffix appended by App to force re-trigger
      const eventTitle = preselectedEvent.split('|')[0];
      setFormData((prev) => ({ ...prev, event: eventTitle }));
      const el = document.getElementById('register');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [preselectedEvent]);

  /**
   * Generic onChange handler for all controlled inputs.
   * Uses the input's name attribute to update the correct field.
   * Clears the field-specific error when the user types.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error for this field as soon as the user corrects it
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }

    // Also clear duplicate error when user changes email or event
    if ((name === 'email' || name === 'event') && duplicateError) {
      setDuplicateError('');
    }
  };

  /**
   * Validate all form fields.
   * Returns an object with field names as keys and error messages as values.
   */
  const validate = () => {
    const newErrors = {};

    // Name: required, at least 2 characters
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    // Email: required, must match a basic email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Mobile: required, must be exactly 10 digits
    const mobileRegex = /^\d{10}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!mobileRegex.test(formData.mobile.trim())) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits.';
    }

    // Department: must be selected
    if (!formData.department) {
      newErrors.department = 'Please select your department.';
    }

    // Academic year: must be selected
    if (!formData.year) {
      newErrors.year = 'Please select your academic year.';
    }

    // Event: must be selected
    if (!formData.event) {
      newErrors.event = 'Please select an event to register for.';
    }

    return newErrors;
  };

  /**
   * Form submission handler.
   * Validates, checks for duplicates, creates a registration, and resets the form.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    setSuccess(null);
    setDuplicateError('');

    // Run validation
    const validationErrors = validate();
    setErrors(validationErrors);

    // If there are errors, do not proceed
    if (Object.keys(validationErrors).length > 0) return;

    // Check for duplicate registration (same email + same event)
    const isDuplicate = registrations.some(
      (reg) =>
        reg.email.toLowerCase() === formData.email.trim().toLowerCase() &&
        reg.event === formData.event
    );

    if (isDuplicate) {
      setDuplicateError(
        `You have already registered for "${formData.event}" with this email.`
      );
      return;
    }

    // Build the registration object
    const newRegistration = {
      id: Date.now().toString(), // Unique ID based on timestamp
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      mobile: formData.mobile.trim(),
      department: formData.department,
      year: formData.year,
      event: formData.event,
    };

    // Pass new registration up to the parent (App) via callback prop
    onRegister(newRegistration);

    // Show success message
    setSuccess({
      name: newRegistration.name,
      event: newRegistration.event,
    });

    // Reset the form fields
    setFormData({
      name: '',
      email: '',
      mobile: '',
      department: '',
      year: '',
      event: '',
    });

    // Auto-dismiss success message after 5 seconds
    setTimeout(() => setSuccess(null), 5000);
  };

  return (
    <section className="section section--alt" id="register">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">Register for an Event</h2>
          <p className="section__subtitle">
            Fill in your details below to secure your spot.
          </p>
        </div>

        <div className="form-wrapper">
          {/* Conditional rendering: show success message */}
          {success && (
            <div className="form__success">
              <div className="form__success-icon">✅</div>
              <h4>Registration Successful!</h4>
              <p>
                <strong>{success.name}</strong> has been registered for{' '}
                <strong>{success.event}</strong>.
              </p>
            </div>
          )}

          {/* Conditional rendering: show duplicate error */}
          {duplicateError && (
            <div className="form__duplicate">⚠️ {duplicateError}</div>
          )}

          {/* Registration form – onSubmit handler */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="form__row">
              <label className="form__label" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form__input ${errors.name ? 'form__input--error' : ''}`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
              {/* Conditional rendering: show field error */}
              {errors.name && <p className="form__error">⚠ {errors.name}</p>}
            </div>

            {/* Email Address */}
            <div className="form__row">
              <label className="form__label" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form__input ${errors.email ? 'form__input--error' : ''}`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="form__error">⚠ {errors.email}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="form__row">
              <label className="form__label" htmlFor="mobile">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                className={`form__input ${errors.mobile ? 'form__input--error' : ''}`}
                placeholder="10-digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && (
                <p className="form__error">⚠ {errors.mobile}</p>
              )}
            </div>

            {/* Department – dropdown (controlled select) */}
            <div className="form__row">
              <label className="form__label" htmlFor="department">
                Department
              </label>
              <select
                id="department"
                name="department"
                className={`form__select ${errors.department ? 'form__select--error' : ''}`}
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">— Select Department —</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="form__error">⚠ {errors.department}</p>
              )}
            </div>

            {/* Academic Year – dropdown */}
            <div className="form__row">
              <label className="form__label" htmlFor="year">
                Academic Year
              </label>
              <select
                id="year"
                name="year"
                className={`form__select ${errors.year ? 'form__select--error' : ''}`}
                value={formData.year}
                onChange={handleChange}
              >
                <option value="">— Select Year —</option>
                {YEARS.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
              {errors.year && <p className="form__error">⚠ {errors.year}</p>}
            </div>

            {/* Select Event – dropdown populated from events prop */}
            <div className="form__row">
              <label className="form__label" htmlFor="event">
                Select Event
              </label>
              <select
                id="event"
                name="event"
                className={`form__select ${errors.event ? 'form__select--error' : ''}`}
                value={formData.event}
                onChange={handleChange}
              >
                <option value="">— Select Event —</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.title}>
                    {ev.title}
                  </option>
                ))}
              </select>
              {errors.event && (
                <p className="form__error">⚠ {errors.event}</p>
              )}
            </div>

            {/* Submit button */}
            <button type="submit" className="form__submit">
              Submit Registration
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default RegistrationForm;
