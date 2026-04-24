const menu = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');

// Toggle del menú
menu.addEventListener('click',()=>{
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
    });
});
