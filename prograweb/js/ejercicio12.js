document.addEventListener('DOMContentLoaded', function() {
    const inputPesos = document.getElementById('pesos');
    const inputDolares = document.getElementById('dolares');
    const botonConvertir = document.getElementById('btnConvertir');
    const mensajeError = document.getElementById('mensajeError');

    botonConvertir.addEventListener('click', convertirDolares);

    inputPesos.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            convertirDolares();
        }
    });

    function convertirDolares() {
        mensajeError.textContent = '';

        const valorpesos = inputPesos.value.trim();

        if (valorpesos === '') {
            mensajeError.textContent = 'Por favor, ingrese un valor en pesos.';
            inputPesos.focus();
            return;
        }

        const pesos = parseFloat(valorpesos);
        if (isNaN(pesos)) {
            mensajeError.textContent = 'El valor ingresado no es un número válido.';
            inputPesos.focus();
            return;
        }

        const dolares = pesos * 0.055;
        inputDolares.value = dolares.toFixed(2) + ' USD';
    }
});