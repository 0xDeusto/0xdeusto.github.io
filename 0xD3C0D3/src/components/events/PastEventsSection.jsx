import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';

const PastEventsSection = ({ events }) => {
  if (events.length === 0) return null;

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-8">Eventos Pasados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard 
            key={event.id} 
            event={event}
            isUpcoming={false}
          />
        ))}
      </div>
    </div>
  );
};

export default PastEventsSection;