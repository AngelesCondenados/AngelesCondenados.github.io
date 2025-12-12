"use strict";

/*
 Código: Codigo.js
 Propósito general:
 - Controlar el formulario de login (`index.html`) en el cliente.
 - Validar que los campos Usuario/Contraseña no estén vacíos.
 - Mostrar/ocultar la contraseña con el botón "ojo".
 - Intentar comprobar si `inicio.html` existe antes de redirigir y, si existe,
   redirigir a `inicio.html?user=<usuario>` (para mostrar el usuario en la página de destino).

 Notas:
 - Esta validación es solo de ejemplo (client-side). La verificación real de credenciales
   debe hacerse en el servidor y de manera segura.
 - Cuando se trabaja con archivos locales (file://) algunas operaciones fetch pueden fallar.
   Para pruebas fiables usa un servidor local (Live Server, python -m http.server, etc.).
*/

document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a elementos del DOM
    const form = document.getElementById('loginForm');         // formulario principal
    const username = document.getElementById('username');     // input usuario
    const password = document.getElementById('password');     // input contraseña
    const error = document.getElementById('error');           // párrafo para mensajes de error
    const toggle = document.querySelector('.toggle-pass');    // botón para mostrar/ocultar contraseña

    /* ---------- Mostrar / ocultar contraseña ----------
       Comportamiento: al hacer click en el botón alternamos el tipo del input
       entre 'password' y 'text' y cambiamos el texto/aria-label para accesibilidad.
    */
    if (toggle && password) {
        toggle.addEventListener('click', function () {
            if (password.type === 'password') {
                password.type = 'text';
                toggle.textContent = '🙈';
                toggle.setAttribute('aria-label', 'Ocultar contraseña');
            } else {
                password.type = 'password';
                toggle.textContent = '👁️';
                toggle.setAttribute('aria-label', 'Mostrar contraseña');
            }
        });
    }

    /* ---------- Envío del formulario (validación mínima) ----------
       - Evitar el envío por defecto (sin back-end en este ejemplo)
       - Mostrar errores si algún campo está vacío
       - Si ambos campos están presentes: intentar comprobar que inicio.html existe
         y redirigir pasando el usuario en la query string.
    */
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (error) error.textContent = '';
            const userVal = username ? username.value.trim() : '';
            const passVal = password ? password.value.trim() : '';

            // Validación de existencia de valores
            if (!userVal || !passVal) {
                if (error) error.textContent = 'Por favor completa Usuario y Contraseña.';
                return;
            }

            // Indicar al usuario que se inicia sesión (simulación)
            if (error) error.textContent = 'Iniciando sesión...';

            // ---------- Comprobar existencia de inicio.html antes de redirigir ----------
            (async function checkAndRedirect() {
                try {
                    // Intentamos un HEAD para ahorrar transferencia; si no funciona, hacemos GET
                    let resp = await fetch('inicio.html', { method: 'HEAD' });
                    if (!resp || !resp.ok) {
                        // Fallback a GET en caso de que HEAD no esté soportado
                        resp = await fetch('inicio.html', { method: 'GET' });
                    }

                    if (resp && resp.ok) {
                        // Si existe, redirigimos con el usuario en la querystring
                        const target = 'inicio.html?user=' + encodeURIComponent(userVal);
                        setTimeout(function () { window.location.href = target; }, 400);
                    } else {
                        // No existe inicio.html en el servidor/origen
                        if (error) error.textContent = 'No se encontró la página inicio.html en este sitio.';
                    }
                } catch (err) {
                    // Errores de red (p.ej. al usar file:// o problemas CORS)
                    if (error) error.textContent = 'No se pudo comprobar la existencia de inicio.html (error de red).';
                    console.error('Error comprobando inicio.html:', err);
                }
            })();
        });
    }
});