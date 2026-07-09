const input = document.getElementById('nuevoElemento');
const botonAgregar = document.getElementById('agregarBtn');
const lista = document.getElementById('lista');

function agregarElemento() {
    const texto = input.value.trim();

    if (texto === '') {
        alert('Escribe algo para agregar a la lista.');
        return;
    }

    const li = document.createElement('li');
    const spanTexto = document.createElement('span');
    spanTexto.textContent = texto;
    li.appendChild(spanTexto);

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', function() {
        li.remove(); 
    });

    li.appendChild(botonEliminar);
    lista.appendChild(li); 

    input.value = '';
    input.focus();
}

botonAgregar.addEventListener('click', agregarElemento);

input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarElemento();
    }
});