const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => b !== 0 ? a / b : 'Error: División por cero';

function calcularOperacion(tipo) {
    const num1 = document.getElementById('numero1').value.trim();
    const num2 = document.getElementById('numero2').value.trim();
    const resultadoInput = document.getElementById('resultado');

    if (num1 === '' || num2 === '') {
        Swal.fire({
            icon: 'error',
            title: 'Campos vacíos',
            text: 'Por favor, ingresa ambos números.',
            confirmButtonColor: '#927dc1'
        });
        return;
    }

    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
        Swal.fire({
            icon: 'error',
            title: 'Valores no válidos',
            text: 'Asegúrate de ingresar números válidos.',
            confirmButtonColor: '#927dc1'
        });
        return;
    }

    let resultado;

    switch (tipo) {
        case 'sumar':
            resultado = sumar(a, b);
            break;
        case 'restar':
            resultado = restar(a, b);
            break;
        case 'multiplicar':
            resultado = multiplicar(a, b);
            break;
        case 'dividir':
            resultado = dividir(a, b);
            break;
        default:
            resultado = 'Operación no válida';
    }

    resultadoInput.value = resultado;
}