// Configuración centralizada de la API
// Cambiar solo esta línea para actualizar el endpoint en toda la aplicación
export const API_BASE_URL = 'https://api.0xdecode.es/api';

// Endpoints disponibles
export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/health`,
  members: `${API_BASE_URL}/members`,
  events: `${API_BASE_URL}/events`,
  eventsAll: `${API_BASE_URL}/events/all`,
  eventsPast: `${API_BASE_URL}/events/past`,
  eventsUpcoming: `${API_BASE_URL}/events/upcoming`,
  server: `${API_BASE_URL}/server`,
  all: `${API_BASE_URL}/all`
};
