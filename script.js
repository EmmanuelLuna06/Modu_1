const menu = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');

// Carrito
let carrito = [];

// Toggle del menú
menu.addEventListener('click', () => {
    sidebar.classList.toggle('menu-toggle');
    menu.classList.toggle('menu-toggle');
    main.classList.toggle('menu-toggle');
});

// Navegación entre páginas
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Obtener la página a mostrar
        const pageName = link.getAttribute('data-page');
        
        // Remover clase 'active' de todas las páginas
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Remover clase 'selected' de todos los links
        navLinks.forEach(nav => {
            nav.classList.remove('selected');
        });
        
        // Agregar clase 'active' a la página seleccionada
        document.getElementById('page-' + pageName).classList.add('active');
        
        // Agregar clase 'selected' al link clickeado
        link.classList.add('selected');
        
        // Cerrar menú en móvil
        if (window.innerWidth <= 500) {
            sidebar.classList.remove('menu-toggle');
            menu.classList.remove('menu-toggle');
            main.classList.remove('menu-toggle');
        }

        // Si es la página carrito, actualizar vista
        if (pageName === 'carrito') {
            actualizarCarrito();
        }
    });
});

// Función para agregar al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    const producto = {
        id: Date.now(),
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        cantidad: 1
    };
    
    carrito.push(producto);
    alert('✅ ' + nombre + ' agregado al carrito');
    console.log('Carrito:', carrito);
}

// Función para actualizar la vista del carrito
function actualizarCarrito() {
    const cartItems = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const btnCheckout = document.getElementById('btnCheckout');
    
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        subtotalElement.textContent = '$0.00';
        totalElement.textContent = '$10.00';
        btnCheckout.disabled = true;
        return;
    }
    
    // Limpiar carrito
    cartItems.innerHTML = '';
    
    let subtotal = 0;
    
    // Crear items del carrito
    carrito.forEach((producto, index) => {
        subtotal += producto.precio * producto.cantidad;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="item-details">
                <h4>${producto.nombre}</h4>
                <p>Cantidad: ${producto.cantidad}</p>
                <p class="item-price">$${(producto.precio * producto.cantidad).toFixed(2)}</p>
            </div>
            <button class="btn-remove" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Calcular totales
    const envio = 10.00;
    const total = subtotal + envio;
    
    subtotalElement.textContent = '$' + subtotal.toFixed(2);
    totalElement.textContent = '$' + total.toFixed(2);
    btnCheckout.disabled = false;
}

// Función para eliminar del carrito
function eliminarDelCarrito(index) {
    const productoEliminado = carrito[index].nombre;
    carrito.splice(index, 1);
    alert('❌ ' + productoEliminado + ' eliminado del carrito');
    actualizarCarrito();
}

// Proceder al pago
document.addEventListener('DOMContentLoaded', function() {
    const btnCheckout = document.getElementById('btnCheckout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function() {
            if (carrito.length > 0) {
                alert('🛒 Total a pagar: $' + (carrito.reduce((sum, p) => sum + (p.precio * p.cantidad), 0) + 10).toFixed(2));
            }
        });
    }
});
