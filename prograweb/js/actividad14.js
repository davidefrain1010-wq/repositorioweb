document.addEventListener('DOMContentLoaded', function() {
    const inputNumeros = document.getElementById('numeros');
    const inputMayor = document.getElementById('mayor');
    const inputMenor = document.getElementById('menor');
    const inputPromedio = document.getElementById('promedio');
    const btnCalcular = document.getElementById('btnCalcular');
    const mensajeError = document.getElementById('mensajeError');

    function limpiarErrores() {
        mensajeError.textContent = '';
    }

    function mostrarError(mensaje) {
        mensajeError.textContent = mensaje;
    }

    function calcular() {
        limpiarErrores();
        inputMayor.value = '';
        inputMenor.value = '';
        inputPromedio.value = '';

        const texto = inputNumeros.value.trim();

        if (texto === '') {
            mostrarError('Por favor, ingresa al menos un número.');
            inputNumeros.focus();
            return;
        }

        const partes = texto.split(',').map(item => item.trim());
        const numeros = partes.map(Number);

        const invalidos = numeros.some(isNaN);
        if (invalidos || partes.length === 0) {
            mostrarError('Asegúrate de ingresar solo números separados por comas.');
            inputNumeros.focus();
            return;
        }

        if (numeros.length === 0) {
            mostrarError('No se detectaron números válidos.');
            return;
        }

        const mayor = Math.max(...numeros);
        const menor = Math.min(...numeros);
        const suma = numeros.reduce((acc, val) => acc + val, 0);
        const promedio = suma / numeros.length;

        inputMayor.value = mayor;
        inputMenor.value = menor;
        inputPromedio.value = promedio.toFixed(2);
    }

    btnCalcular.addEventListener('click', calcular);

    inputNumeros.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcular();
        }
    });
});