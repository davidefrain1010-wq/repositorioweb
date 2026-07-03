document.addEventListener('DOMContentLoaded', function() {
    const inputKilometros = document.getElementById('kilometro');
    const inputMillas = document.getElementById('millas');
    const botonConvertir = document.getElementById('btnConvertir');
    const mensajeError = document.getElementById('mensajeError');

    botonConvertir.addEventListener('click', convertirMillas);

    inputKilometros.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            convertirMillas();
        }
    });

    function convertirMillas() {
        mensajeError.textContent = '';

        const valorkilometros = inputKilometros.value.trim();

        if (valorkilometros === '') {
            mensajeError.textContent = 'Por favor, ingrese un valor en kilómetros.';
            inputKilometros.focus();
            return;
        }

        const kilometros = parseFloat(valorkilometros);
        if (isNaN(kilometros)) {
            mensajeError.textContent = 'El valor ingresado no es un número válido.';
            inputKilometros.focus();
            return;
        }

        const millas = kilometros * 0.621371;
        inputMillas.value = millas.toFixed(2) + ' mi';
    }
});