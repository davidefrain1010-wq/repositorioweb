const CLAVE_TAREAS = 'tareas';

const manejarTareas = (function() {
    let tareas = [];

    function cargarDesdeStorage() {
        const data = localStorage.getItem(CLAVE_TAREAS);
        tareas = data ? JSON.parse(data) : [];
        return tareas;
    }

    function guardarEnStorage() {
        localStorage.setItem(CLAVE_TAREAS, JSON.stringify(tareas));
    }

    function obtenerTareas() {
        return cargarDesdeStorage();
    }

    function agregarTarea(texto) {
        if (!texto || texto.trim() === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Tarea vacía',
                text: 'Escribe una descripción para la tarea.',
                confirmButtonColor: '#927dc1'
            });
            return false;
        }
        cargarDesdeStorage();
        const nueva = { id: Date.now(), texto: texto.trim(), completada: false };
        tareas.push(nueva);
        guardarEnStorage();
        return true;
    }

    function eliminarTarea(id) {
        cargarDesdeStorage();
        const index = tareas.findIndex(t => t.id === id);
        if (index !== -1) {
            tareas.splice(index, 1);
            guardarEnStorage();
            return true;
        }
        return false;
    }

    function renderizarTareas() {
        const lista = document.getElementById('listaTareas');
        if (!lista) return;
        const tareasActuales = obtenerTareas();
        if (tareasActuales.length === 0) {
            lista.innerHTML = '<li class="vacio">No hay tareas pendientes</li>';
            return;
        }
        lista.innerHTML = tareasActuales.map(t => `
            <li>
                <span>${t.texto}</span>
                <button data-id="${t.id}" class="btn-eliminar">Eliminar</button>
            </li>
        `).join('');

        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                Swal.fire({
                    title: '¿Eliminar tarea?',
                    text: 'Esta acción no se puede deshacer.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#e74c3c',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (eliminarTarea(id)) {
                            renderizarTareas();
                            Swal.fire({
                                icon: 'success',
                                title: 'Eliminada',
                                text: 'La tarea fue eliminada.',
                                confirmButtonColor: '#927dc1',
                                timer: 1500,
                                showConfirmButton: false
                            });
                        }
                    }
                });
            });
        });
    }

    return { obtenerTareas, agregarTarea, eliminarTarea, renderizarTareas };
})();

document.addEventListener('DOMContentLoaded', function() {
    const inputTarea = document.getElementById('nuevaTarea');
    const btnAgregar = document.getElementById('btnAgregar');

    manejarTareas.renderizarTareas();

    btnAgregar.addEventListener('click', function() {
        const texto = inputTarea.value;
        if (manejarTareas.agregarTarea(texto)) {
            inputTarea.value = '';
            manejarTareas.renderizarTareas();
            Swal.fire({
                icon: 'success',
                title: 'Tarea agregada',
                text: 'La tarea se guardó correctamente.',
                confirmButtonColor: '#927dc1',
                timer: 1200,
                showConfirmButton: false
            });
        }
    });

    inputTarea.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') btnAgregar.click();
    });
});