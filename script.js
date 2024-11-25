// Clase ObraDeArte
class ObraDeArte {
    constructor(titulo, artista, descripcion, precio, imagen) {
        this.titulo = titulo;
        this.artista = artista;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
    }

    mostrarDetalles() {
        // Mostrar los detalles de la obra
        document.getElementById('detalle-titulo').textContent = this.titulo;
        document.getElementById('detalle-artista').textContent = `Artista: ${this.artista}`;
        document.getElementById('detalle-descripcion').textContent = this.descripcion;
        document.getElementById('detalle-precio').textContent = `$${this.precio}`;
        document.getElementById('detalle-imagen').src = this.imagen;
        document.getElementById('detalle-obra').style.display = 'flex'; // Mostrar el detalle

        // Asignar la obra actual al botón de agregar al carrito
        const agregarCarritoButton = document.getElementById('agregar-carrito-detalle');
        agregarCarritoButton.onclick = () => carrito.agregarObra(this);
    }
}

// Clase Carrito
class Carrito {
    constructor() {
        this.obras = JSON.parse(localStorage.getItem('carrito')) || [];
        this.actualizarCarrito(); // Actualizar el carrito al cargar la página
    }

    agregarObra(obra) {
        this.obras.push(obra);
        this.actualizarCarrito();
    }

    eliminarObra(index) {
        this.obras.splice(index, 1);
        this.actualizarCarrito();
    }

    vaciarCarrito() {
        this.obras = [];
        this.actualizarCarrito();
    }

    calcularTotal() {
        return this.obras.reduce((total, obra) => total + obra.precio, 0);
    }

    actualizarCarrito() {
        // Guardar el carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(this.obras));

        // Actualizar el contador de obras en el carrito
        document.getElementById('ver-carrito').textContent = `Ver Carrito (${this.obras.length})`;

        // Actualizar la vista del carrito
        this.mostrarCarrito();
    }

    mostrarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        listaCarrito.innerHTML = ''; // Limpiar la lista de carrito

        if (this.obras.length === 0) {
            listaCarrito.innerHTML = '<p>No tienes obras en tu carrito.</p>';
            document.getElementById('total-carrito').textContent = 'TOTAL: $0';
        } else {
            // Mostrar cada obra en el carrito
            this.obras.forEach((obra, index) => {
                const obraCarrito = document.createElement('div');
                obraCarrito.classList.add('obra-carrito');
                obraCarrito.innerHTML = `
                    <p><strong>${obra.titulo}</strong> - $${obra.precio}</p>
                    <div>
                        <button class="eliminar-obra" data-index="${index}">X</button>
                    </div>
                `;
                listaCarrito.appendChild(obraCarrito);
            });

            // Mostrar el total
            document.getElementById('total-carrito').textContent = `TOTAL: $${this.calcularTotal()}`;
        }
    }
}

// Inicialización
const carrito = new Carrito();

// Crear algunas obras de ejemplo
const obras = [
    new ObraDeArte('La Mona Lisa', 'Leonardo da Vinci', 'Un retrato famoso del Renacimiento.', 10000, 'images/obra1.jpg'),
    new ObraDeArte('El Grito', 'Edvard Munch', 'Una de las pinturas más famosas del Expresionismo.', 15000, 'images/obra2.jpg'),
    new ObraDeArte('El Guernica', 'Pablo Picasso', 'Una representación del sufrimiento durante la Guerra Civil Española.', 20000, 'images/obra3.jpg'),
    new ObraDeArte('La Noche Estrellada', 'Vincent van Gogh', 'Una de las pinturas más conocidas de Van Gogh.', 12000, 'images/obra4.jpg'),
    new ObraDeArte('Las Meninas', 'Diego Velázquez', 'Una obra maestra del Barroco Español.', 18000, 'images/obra5.jpg'),
    new ObraDeArte('La Persistencia de la Memoria', 'Salvador Dalí', 'Un icono del surrealismo.', 25000, 'images/obra6.jpg'),
    new ObraDeArte('La Última Cena', 'Leonardo da Vinci', 'Representa la última cena de Jesús con sus discípulos.', 22000, 'images/obra7.jpg'),
    new ObraDeArte('El Beso', 'Gustav Klimt', 'Una pintura famosa que representa el amor y la pasión.', 17000, 'images/obra8.jpg'),
    new ObraDeArte('La Escuela de Atenas', 'Raphael', 'Una de las obras más emblemáticas del Renacimiento.', 20000, 'images/obra9.jpg'),
    new ObraDeArte('La Creación de Adán', 'Michelangelo', 'Parte del techo de la Capilla Sixtina.', 22000, 'images/obra10.jpg'),
    new ObraDeArte('El Jardín de las Delicias', 'Hieronymus Bosch', 'Un famoso tríptico del Renacimiento temprano.', 30000, 'images/obra11.jpg'),
    new ObraDeArte('La Venus de Milo', 'Alejandro de Antioquía', 'Una de las esculturas más famosas de la antigua Grecia.', 35000, 'images/obra12.jpg'),
    new ObraDeArte('La Dama del Armiño', 'Leonardo da Vinci', 'Un retrato de Cecilia Gallerani.', 18000, 'images/obra13.jpg'),
    new ObraDeArte('El nacimiento de Venus', 'Sandro Botticelli', 'La representación mítica de la diosa Venus.', 16000, 'images/obra14.jpg'),
    new ObraDeArte('La Anunciación', 'Leonardo da Vinci', 'Representa el momento en que el Arcángel Gabriel anuncia a María que será la madre de Jesús.', 130000000, 'images/obra15.jpg'),
    new ObraDeArte('La Ronda Nocturna', 'Rembrandt', 'Una de las obras más importantes del Barroco.', 24000, 'images/obra16.jpg'),
    new ObraDeArte('Las Señoritas de Aviñón', 'Pablo Picasso', 'Una de las primeras pinturas cubistas de Picasso.', 28000, 'images/obra17.jpg'),
];


// Mostrar las obras en la galería
const galeria = document.getElementById('galeria');
obras.forEach((obra, index) => {
    const obraElement = document.createElement('div');
    obraElement.classList.add('obra');
    obraElement.innerHTML = `
        <img src="${obra.imagen}" alt="${obra.titulo}">
        <h3>${index + 1} - ${obra.titulo}</h3>
        <h4>${obra.artista}</h4>
        <p>$${obra.precio}</p>
    `;
    
    // Al hacer clic en la obra, mostramos sus detalles
    obraElement.addEventListener('click', () => obra.mostrarDetalles());
    
    // Asignamos el evento de "Agregar al carrito" solo una vez por obra
    const agregarCarritoButton = document.createElement('button');
    agregarCarritoButton.textContent = "Agregar al Carrito";
    agregarCarritoButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que el clic también active el "click" de la obra
        carrito.agregarObra(obra);
    });
    
    obraElement.appendChild(agregarCarritoButton);
    galeria.appendChild(obraElement);
});

// Mostrar el carrito cuando el usuario haga clic en el botón "Ver Carrito"
document.getElementById('ver-carrito').addEventListener('click', () => {
    document.getElementById('carrito-detalles').style.display = 'flex'; // Mostrar el carrito
});

// Cerrar el carrito
document.getElementById('cerrar-carrito').addEventListener('click', () => {
    document.getElementById('carrito-detalles').style.display = 'none';
});

// Eliminar obra del carrito
document.getElementById('lista-carrito').addEventListener('click', (event) => {
    if (event.target.classList.contains('eliminar-obra')) {
        const index = event.target.getAttribute('data-index');
        carrito.eliminarObra(index);
    }
});

// Vaciar carrito
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito.vaciarCarrito();
});

// Eventos para cerrar el detalle de la obra
document.getElementById('cerrar-detalle').addEventListener('click', () => {
    document.getElementById('detalle-obra').style.display = 'none';
});

// Filtrar las obras según el término de búsqueda
document.getElementById('buscar').addEventListener('click', () => {
    const terminoBusqueda = document.getElementById('input-buscar').value.toLowerCase();
    
    // Filtrar las obras
    const obrasFiltradas = obras.filter(obra => {
        return obra.titulo.toLowerCase().includes(terminoBusqueda) || 
               obra.artista.toLowerCase().includes(terminoBusqueda);
    });

    // Mostrar las obras filtradas
    mostrarObras(obrasFiltradas);
});

// Función para mostrar las obras en la galería
function mostrarObras(obrasParaMostrar) {
    galeria.innerHTML = ''; // Limpiar la galería
    obrasParaMostrar.forEach((obra, index) => {
        const obraElement = document.createElement('div');
        obraElement.classList.add('obra');
        obraElement.innerHTML = `
            <img src="${obra.imagen}" alt="${obra.titulo}">
            <h3>${index + 1} - ${obra.titulo}</h3>
            <p>${obra.artista}</p>
            <p>$${obra.precio}</p>
        `;
        
        // Al hacer clic en la obra, mostramos sus detalles
        obraElement.addEventListener('click', () => obra.mostrarDetalles());
        
        // Asignamos el evento de "Agregar al carrito"
        const agregarCarritoButton = document.createElement('button');
        agregarCarritoButton.textContent = "Agregar al Carrito";
        agregarCarritoButton.addEventListener('click', (event) => {
            event.stopPropagation();
            carrito.agregarObra(obra);
        });
        
        obraElement.appendChild(agregarCarritoButton);
        galeria.appendChild(obraElement);
    });
}

// Mostrar todas las obras inicialmente
mostrarObras(obras);
