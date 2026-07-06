document.addEventListener('DOMContentLoaded', function() {
    const inputEdad = document.getElementById('edad');
    const inputResultado = document.getElementById('resultado');
    const botonVerificar = document.getElementById('btnVerificar');
    const mensajeError = document.getElementById('mensajeError');

    botonVerificar.addEventListener('click', verificarEdad);

    inputEdad.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            verificarEdad();
        }
    });

    function verificarEdad() {
        mensajeError.textContent = '';
        inputResultado.value = '';

        const valorEdad = inputEdad.value.trim();

        if (valorEdad === '') {
            mensajeError.textContent = 'Por favor, ingresa tu edad :^';
            inputEdad.focus();
            return;
        }

        const edad = parseFloat(valorEdad);
        if (isNaN(edad) || edad < 0 || !Number.isInteger(edad)) {
            mensajeError.textContent = 'Ingresa un número entero positivo válido.';
            inputEdad.focus();
            return;
        }

        if (edad >= 18) {
            inputResultado.value = 'Puedes votar :D';
        } else {
            inputResultado.value = 'No puedes votar :(';
        }
    }
});