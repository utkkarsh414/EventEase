import { useState, useEffect } from 'react';

// Import all components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventsSection from './components/EventsSection';
import RegistrationForm from './components/RegistrationForm';
import RegistrationList from './components/RegistrationList';
import Footer from './components/Footer';

/**
 * ===================================================
 * EVENTS DATA
 * ===================================================
 * Sample event objects used throughout the application.
 * Each object is passed as props to EventCard components.
 */
const EVENTS_DATA = [
  {
    id: 1,
    title: 'TechFest',
    category: 'Technical Festival',
    date: 'December 15, 2026',
    description:
      'A grand technical festival featuring workshops, hackathons, robotics, and guest talks from industry leaders.',
    icon: '💻',
    iconBg: '#EFF6FF',
  },
  {
    id: 2,
    title: 'CodeSprint',
    category: 'Coding Competition',
    date: 'January 10, 2027',
    description:
      'A fast-paced competitive programming contest challenging students to solve algorithmic problems under time pressure.',
    icon: '⚡',
    iconBg: '#FEF3C7',
  },
  {
    id: 3,
    title: 'Cultural Night',
    category: 'College Cultural Event',
    date: 'January 25, 2027',
    description:
      'An evening of dance, music, drama, and art showcasing the diverse cultural talent of our college community.',
    icon: '🎭',
    iconBg: '#FCE7F3',
  },
  {
    id: 4,
    title: 'InnovateX',
    category: 'Project Exhibition',
    date: 'February 8, 2027',
    description:
      'Present your innovative projects and prototypes to a panel of judges, industry mentors, and fellow students.',
    icon: '🚀',
    iconBg: '#ECFDF5',
  },
];

/**
 * ===================================================
 * LOCAL STORAGE KEY
 * ===================================================
 * Used to persist and retrieve registrations from the browser's localStorage.
 */
const STORAGE_KEY = 'eventease_registrations';

/**
 * ===================================================
 * App Component (Root)
 * ===================================================
 * The top-level component that manages application state
 * and composes all child components.
 *
 * STATE:
 *  - registrations: array of registered student objects
 *  - preselectedEvent: event title set when "Register Now" is clicked on an EventCard
 *
 * Demonstrates:
 *  - useState for global state management
 *  - useEffect for data persistence (localStorage)
 *  - Lifting state up: child components communicate through callbacks
 *  - Props: passing data and callbacks down the component tree
 */
function App() {
  /**
   * Initialize registrations from localStorage.
   * useState accepts a lazy initializer function so we only read
   * localStorage once, during the first render.
   */
  const [registrations, setRegistrations] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  /**
   * Track which event was clicked on from an EventCard's "Register Now" button.
   * This is passed as a prop to RegistrationForm to pre-fill the event dropdown.
   */
  const [preselectedEvent, setPreselectedEvent] = useState('');

  /**
   * useEffect: Sync registrations to localStorage whenever they change.
   * The dependency array [registrations] ensures this runs only when
   * the registrations state updates.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
  }, [registrations]);

  /**
   * Callback: Add a new registration.
   * Passed as a prop to RegistrationForm (lifting state up pattern).
   */
  const handleRegister = (newRegistration) => {
    setRegistrations((prev) => [...prev, newRegistration]);
  };

  /**
   * Callback: Delete a registration by its id.
   * Passed as a prop to RegistrationList.
   * Uses filter() to create a new array without the deleted item.
   */
  const handleDelete = (id) => {
    setRegistrations((prev) => prev.filter((reg) => reg.id !== id));
  };

  /**
   * Callback: Set the pre-selected event when "Register Now" is clicked.
   * Passed as a prop to EventsSection → EventCard.
   * Uses Date.now() to force the effect to re-trigger even if the same event is clicked.
   */
  const handleRegisterClick = (eventTitle) => {
    setPreselectedEvent(eventTitle + '|' + Date.now());
    // We append a timestamp so useEffect in RegistrationForm triggers
    // even if the same event is clicked twice in a row.
    // The form strips the timestamp suffix below.
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero / Banner Section */}
      <Hero />

      {/* Upcoming Events – passes events data and register callback as props */}
      <EventsSection
        events={EVENTS_DATA}
        onRegisterClick={handleRegisterClick}
      />

      {/* Registration Form – receives events, registrations, and callbacks */}
      <RegistrationForm
        events={EVENTS_DATA}
        registrations={registrations}
        onRegister={handleRegister}
        preselectedEvent={preselectedEvent}
      />

      {/* Registered Participants List */}
      <RegistrationList
        registrations={registrations}
        onDelete={handleDelete}
      />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
