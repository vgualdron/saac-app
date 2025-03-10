// src/boot/pwa.js

// Verificar si el navegador soporta Service Workers
if ('serviceWorker' in navigator) {
  // Registrar el Service Worker cuando la ventana se haya cargado
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js') // Asegúrate de que la ruta sea correcta
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration)
      })
      .catch((error) => {
        console.log('Error al registrar el Service Worker:', error)
      })
  })
}

// Detectar si la app está en modo PWA (instalada) o en APK
const isPWA = window.matchMedia('(display-mode: standalone)').matches
// const isAndroid = /android/i.test(navigator.userAgent);
// const isIOS = /iphone|ipod|ipad/i.test(navigator.userAgent);

// Variable para el evento beforeinstallprompt
let deferredPrompt

// Si la app no está instalada (modo PWA o app web), gestionar el evento beforeinstallprompt
if (!isPWA) {
  // Escuchar el evento beforeinstallprompt (antes de que el navegador muestre el mensaje de instalación)
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir la acción predeterminada (no mostrar el mensaje automáticamente)
    e.preventDefault()
    // Guardar el evento para mostrar el mensaje más tarde
    deferredPrompt = e

    // Mostrar el botón de instalación solo si el evento ha sido disparado
    const installButton = document.getElementById('installButton')
    if (installButton) {
      installButton.style.display = 'block' // Hacer visible el botón de instalación

      // Cuando el usuario haga clic en el botón de instalación
      installButton.addEventListener('click', () => {
        // Asegúrate de que deferredPrompt no sea null antes de llamar a prompt()
        if (deferredPrompt) {
          // Mostrar el mensaje de instalación
          deferredPrompt.prompt()

          // Esperar la respuesta del usuario
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('El usuario aceptó la instalación')
            } else {
              console.log('El usuario rechazó la instalación')
            }
            // Ocultar el botón después de la acción (instalación aceptada o rechazada)
            installButton.style.display = 'none'
            // Resetear deferredPrompt para que no se use más de una vez
            deferredPrompt = null
          })
        }
      })
    }
  })
} else {
  // Si la app ya está instalada en modo standalone, ocultar el botón
  const installButton = document.getElementById('installButton')
  if (installButton) {
    installButton.style.display = 'none' // Asegurar que el botón de instalación no se muestre en APK
  }
}
