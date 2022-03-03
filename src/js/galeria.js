document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
});

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('img');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i; // .dataset nos ayuda a crear atributos personalizados dentro del HTML

        // Añadir la función de mostrarImagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('li');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e) {
    // metodo parseInt convierte un string en un numero
    const id = parseInt(e.target.dataset.imagenId)

    // Generando la imagen
    const imagen = document.createElement('img');
    imagen.src = `build/img/grande/${id}.webp`;
    imagen.classList.add('imagen-grande');

    const overlay = document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //Cuando se da click en cualquier lado, cerrar iamgen
    overlay.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    // Boton para cerrar la imagen
    const cerrarImagen = document.createElement('p');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    // Cuando se presiona, se cierra la imagen
    cerrarImagen.onclick = function() {
        overlay.remove();
    }

    overlay.appendChild(cerrarImagen);

    // Mostrar imagen el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}