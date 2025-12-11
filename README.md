# 🌍 Comparador de Países — Angular 19 + Firebase Hosting

Aplicación web para buscar países, ver su detalle y sugerencias basadas en similitud geográfica y demográfica.

---

# 🔗 URL Pública (Firebase)

https://browser-countries.web.app/

---

# 📦 Instalación, Ejecución y Despliegue

## 1. Instalación
```
npm install
```

## 2. Ejecutar en desarrollo
```
ng serve -o
```

## 3. Build de producción
```
ng build
```

## 4. Desplegar en Firebase Hosting
```
firebase init hosting
firebase deploy
```

---

#  Arquitectura / Estructura del Proyecto

```
src/app/
  core/
    models/
    services/
  pages/
    home/
    country-detail/
  shared/
    components/
```

---

# Modelo de datos (API RESTCountries)

```ts
Country {
  name: { common: string },
  cca3: string,
  region: string,
  population: number,
  area: number,
  languages: object,
  flags: { png: string }
}
```

---

#  Reglas de Seguridad (Firestore)

Archivo: firestore.rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

Archivo: database.rules.json
```json
{
  "rules": {
    ".read": true,
    ".write": false
  }
}
```

---

#  Estado y Navegación

- Angular Router  
- Rutas:
  - `/` → Home  
  - `/country/:id` → Detalle  

---

# Decisiones Técnicas

- Standalone Components  
- Angular Material  
- shareReplay para caching  
- Separación por capas  
- Algoritmo de similitud simple y explicable

---

#  Escalabilidad y Mantenimiento

- Fácil agregar favoritos, filtros, gráficos  
- Servicios desacoplados  
- Estructura por features  

---

# Seguridad

- Sin almacenamiento de usuarios  
- No hay keys expuestas  
- Firestore bloqueado  

---

#  Rendimiento

- Cache con shareReplay  
- Solo una llamada a la API  

---

#  Accesibilidad

- Labels en formularios  
- Contraste correcto  
- Navegación por teclado  

---

#  Uso de IA

La IA se utilizó para:

- Diseño del algoritmo de similitud  
- Generación de explicaciones  
- Documentación del proyecto  
- Propuestas de mejoras de UI/UX  

Riesgos mitigados:
- Validación manual de lógica  
- Reglas deterministas para evitar sesgos  

---

#  Limitaciones y Siguientes Pasos

- Sin favoritos   
- Similitud básica  
- Pendiente agregar pruebas unitarias  

