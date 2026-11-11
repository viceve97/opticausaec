document.addEventListener("DOMContentLoaded", function() {
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
const icon = document.getElementById('menu-icon');

    if (btn && menu) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    menu.classList.toggle('hidden');
                    
                    // Cambiar icono dinámicamente entre barras y 'X' (cerrar)
                    if (menu.classList.contains('hidden')) {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    } else {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-xmark');
                    }
                });

                // Cerrar menú al hacer clic fuera de él
                document.addEventListener('click', function(e) {
                    if (!menu.contains(e.target) && !btn.contains(e.target)) {
                        menu.classList.add('hidden');
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                });
    }
            
});
