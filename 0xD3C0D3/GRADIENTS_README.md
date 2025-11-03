# Sistema de Gradientes por Sección

Este sistema permite configurar gradientes únicos para cada sección del landing page de manera escalable y organizizada.

## Estructura

```
src/
├── data/
│   └── sectionGradients.js      # Configuración centralizada de gradientes
├── components/landing/
│   └── SectionGradient.jsx      # Componente reutilizable
└── pages/
    └── Landing.jsx              # Implementación principal
```

## Cómo funciona

### 1. Configuración de Gradientes (`src/data/sectionGradients.js`)

Cada sección tiene su propio objeto de configuración con:
- **linear**: Gradiente linear principal
- **radial**: Gradiente radial para efectos adicionales  
- **colors**: Paleta de colores para referencia

### 2. Componente SectionGradient (`src/components/landing/SectionGradient.jsx`)

Componente reutilizable que:
- Recibe el ID de la sección y su índice
- Obtiene la configuración de gradiente correspondiente
- Renderiza las capas de gradiente con posicionamiento dinámico

### 3. Implementación en Landing (`src/pages/Landing.jsx`)

- Importa y usa el componente SectionGradient
- Mapea cada sección para generar sus gradientes
- Posiciona los gradientes para que se superpongan entre secciones

## Cómo agregar una nueva sección

1. **Agregar configuración en `sectionGradients.js`:**
```javascript
nuevaSeccion: {
  linear: `linear-gradient(...)`,
  radial: `radial-gradient(...)`,
  colors: {
    primary: '#color1',
    secondary: '#color2', 
    accent: '#color3'
  }
}
```

2. **Agregar sección en `Landing.jsx`:**
```javascript
{ id: 'nuevaSeccion', component: NuevaSeccionComponent, theme: 'tema' }
```

El gradiente se aplicará automáticamente.

## Cómo modificar gradientes existentes

Simplemente edita los valores en `src/data/sectionGradients.js`. Los cambios se aplicarán automáticamente a toda la aplicación.

## Personalización

### Ajustar posicionamiento
En `SectionGradient.jsx`, modifica:
- `top`: Dónde comienza el gradiente
- `height`: Qué tanto se extiende el gradiente

### Agregar efectos adicionales
Puedes agregar más capas de gradiente en el componente SectionGradient.

### Usar colores en otros componentes
```javascript
import { getSectionColors } from '../data/sectionGradients';

const colors = getSectionColors('cybersecurity');
// colors.primary, colors.secondary, colors.accent
```

## Ventajas del sistema

- ✅ **Escalable**: Fácil agregar nuevas secciones
- ✅ **Mantenible**: Configuración centralizada
- ✅ **Reutilizable**: Componente modular
- ✅ **Flexible**: Fácil personalización
- ✅ **Consistente**: Misma estructura para todas las secciones
