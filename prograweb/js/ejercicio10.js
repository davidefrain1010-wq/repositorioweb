document.addEventListener('DOMContentLoaded', function() {
    const inputCelsius = document.getElementById('celsius');
    const inputFahrenheit = document.getElementById('fahrenheit');
    const botonConvertir = document.getElementById('btnConvertir');
    const mensajeError = document.getElementById('mensajeError');

    botonConvertir.addEventListener('click', convertirTemperatura);

    inputCelsius.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            convertirTemperatura();
        }
    });

    function convertirTemperatura() {
        mensajeError.textContent = '';
        inputFahrenheit.value = '';

        const valorCelsius = inputCelsius.value.trim();

        if (valorCelsius === '') {
            mensajeError.textContent = 'Por favor, ingrese un valor en grados Celsius.';
            inputCelsius.focus();
            return;
        }

        const celsius = parseFloat(valorCelsius);
        if (isNaN(celsius)) {
            mensajeError.textContent = 'El valor ingresado no es un número válido.';
            inputCelsius.focus();
            return;
        }

        const fahrenheit = (celsius * 9/5) + 32;

        inputFahrenheit.value = fahrenheit.toFixed(2) + ' °F';
    }
});