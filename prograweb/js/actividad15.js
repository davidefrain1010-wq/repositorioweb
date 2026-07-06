document.addEventListener('DOMContentLoaded', function() {
    const inputNombre = document.getElementById('nombre');
    const inputCalificacion = document.getElementById('calificacion');
    const btnAgregar = document.getElementById('btnAgregar');
    const btnCalcular = document.getElementById('btnCalcular');
    const listaDiv = document.getElementById('listaEstudiantes');
    const inputPromedio = document.getElementById('promedio');
    const inputMasAlto = document.getElementById('masAlto');
    const inputMasBajo = document.getElementById('masBajo');
    const mensajeError = document.getElementById('mensajeError');

    let estudiantes = [];

    function mostrarError(mensaje) {
        mensajeError.textContent = mensaje;
    }

    function limpiarError() {
        mensajeError.textContent = '';
    }

    function limpiarResultados() {
        inputPromedio.value = '';
        inputMasAlto.value = '';
        inputMasBajo.value = '';
    }

    function renderizarLista() {
        if (estudiantes.length === 0) {
            listaDiv.innerHTML = '<p><em>No hay estudiantes agregados aún.</em></p>';
            return;
        }

        let html = '<ul>';
        estudiantes.forEach((est, index) => {
            html += `<li>${index + 1}. ${est.nombre} - Calificación: ${est.calificacion}</li>`;
        });
        html += '</ul>';
        listaDiv.innerHTML = html;
    }

    function agregarEstudiante() {
        limpiarError();
        limpiarResultados();

        const nombre = inputNombre.value.trim();
        const calificacion = parseFloat(inputCalificacion.value);

        if (nombre === '') {
            mostrarError('El nombre del estudiante no puede estar vacío.');
            inputNombre.focus();
            return;
        }

        if (isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
            mostrarError('La calificación debe ser un número válido entre 0 y 100.');
            inputCalificacion.focus();
            return;
        }

        // Crear objeto estudiante
        const estudiante = {
            nombre: nombre,
            calificacion: calificacion
        };

        estudiantes.push(estudiante);
        renderizarLista();

        // Limpiar campos
        inputNombre.value = '';
        inputCalificacion.value = '';
        inputNombre.focus();
    }

    function calcular() {
        limpiarError();
        limpiarResultados();

        if (estudiantes.length === 0) {
            mostrarError('No hay estudiantes para calcular. Agrega al menos uno.');
            return;
        }

        // Calcular promedio
        const total = estudiantes.reduce((sum, est) => sum + est.calificacion, 0);
        const promedio = total / estudiantes.length;
        inputPromedio.value = promedio.toFixed(2);

        // Obtener calificaciones y buscar extremos
        const calificaciones = estudiantes.map(est => est.calificacion);
        const maxCal = Math.max(...calificaciones);
        const minCal = Math.min(...calificaciones);

        // Encontrar estudiantes con esas calificaciones (el primero en caso de empate)
        const estudianteMax = estudiantes.find(est => est.calificacion === maxCal);
        const estudianteMin = estudiantes.find(est => est.calificacion === minCal);

        inputMasAlto.value = estudianteMax ? estudianteMax.nombre : '—';
        inputMasBajo.value = estudianteMin ? estudianteMin.nombre : '—';
    }

    // Eventos
    btnAgregar.addEventListener('click', agregarEstudiante);
    btnCalcular.addEventListener('click', calcular);

    // Enter en los campos para agregar
    inputNombre.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            agregarEstudiante();
        }
    });
    inputCalificacion.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            agregarEstudiante();
        }
    });
});