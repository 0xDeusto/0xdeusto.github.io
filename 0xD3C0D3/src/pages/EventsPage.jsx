import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeaderSection from '../components/events/HeaderSection';
import SearchFilterSection from '../components/events/SearchFilterSection';
import UpcomingEventsSection from '../components/events/UpcomingEventsSection';
import PastEventsSection from '../components/events/PastEventsSection';
import EmptyStateSection from '../components/events/EmptyStateSection';
import CTASection from '../components/events/CTASection';
import { upcomingEvents, pastEvents } from '../data/eventsData';

const EventsPage = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrado combinado por tipo y búsqueda
  const filteredUpcomingEvents = upcomingEvents.filter(event => {
    const matchesFilter = filter === 'all' || event.type.toLowerCase() === filter.toLowerCase();
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredPastEvents = pastEvents.filter(event => {
    const matchesFilter = filter === 'all' || event.type.toLowerCase() === filter.toLowerCase();
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Todos los tipos únicos de eventos para el filtro
  const eventTypes = ['all', ...new Set([
    ...upcomingEvents.map(event => event.type.toLowerCase()),
    ...pastEvents.map(event => event.type.toLowerCase())
  ])];

  // Función para resetear los filtros
  const resetFilters = () => {
    setFilter('all');
    setSearchQuery('');
  };

  const hasEvents = filteredUpcomingEvents.length > 0 || filteredPastEvents.length > 0;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      
      <main className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeaderSection />
          <SearchFilterSection 
            filter={filter} 
            setFilter={setFilter} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            eventTypes={eventTypes} 
          />
          
          {hasEvents ? (
            <>
              <UpcomingEventsSection events={filteredUpcomingEvents} />
              <PastEventsSection events={filteredPastEvents} />
            </>
          ) : (
            <EmptyStateSection resetFilters={resetFilters} />
          )}
          
          <CTASection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsPage;