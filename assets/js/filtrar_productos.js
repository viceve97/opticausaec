const productos = [
            { id: 1, nombre: "Armazón Exec Clásico", categoria: "hombres", precio: "$70.00", img: "assets/img/catalogo/hombre_1.webp" },
            { id: 2, nombre: "Armazón Titanium Sport", categoria: "hombres", precio: "$68.00", img: "assets/img/catalogo/hombre_2.webp" },
            { id: 3, nombre: "Armazón Vogue Clásico", categoria: "hombres", precio: "$55.00", img: "assets/img/catalogo/hombre_3.webp" },
            { id: 4, nombre: "Armazón Vogue Ejectivo", categoria: "hombres", precio: "$60.00", img: "assets/img/catalogo/hombre_4.webp" },
            { id: 5, nombre: "Montura Moderna Minimalista", categoria: "mujeres", precio: "$50.00", img: "assets/img/catalogo/mujer_1.webp" },
            { id: 6, nombre: "Montura Cat-Eye Elegance", categoria: "mujeres", precio: "$48.00", img: "assets/img/catalogo/mujer_2.webp" },
            { id: 7, nombre: "Lentes Flexibles Infantiles", categoria: "mujeres", precio: "$35.00", img: "assets/img/catalogo/mujer_3.webp" },
            { id: 8, nombre: "Estuche y Kit de Limpieza Pro", categoria: "mujeres", precio: "$15.00", img: "assets/img/catalogo/mujer_4.webp" },
            { id: 9, nombre: "Lentes Junior Colorful", categoria: "ninos", precio: "$30.00", img: "assets/img/catalogo/niño_1.webp" },
            { id: 10, nombre: "Lentes Flexibles Infantiles", categoria: "ninos", precio: "$30.00", img: "assets/img/catalogo/niño_2.webp" },
            { id: 11, nombre: "Armazón Semi-Al aire", categoria: "accesorios", precio: "$12.00", img: "assets/img/catalogo/estuche_1.webp" },
            { id: 12, nombre: "Armazón Semi-Al aire", categoria: "accesorios", precio: "$12.00", img: "assets/img/catalogo/estuche_2.webp" },
            { id: 13, nombre: "Armazón Semi-Al aire", categoria: "accesorios", precio: "$12.00", img: "assets/img/catalogo/estuche_3.webp" },
            { id: 14, nombre: "Líquido Limpiador", categoria: "accesorios", precio: "$10.00", img: "assets/img/catalogo/limpiador_contacto.webp" }
        ];

        let categoriaActual = 'todos';
        let paginaActual = 1;
        const productosPorPagina = 12;

        function obtenerProductosFiltrados() {
            if (categoriaActual === 'todos') return productos;
            return productos.filter(p => p.categoria === categoriaActual);
        }

        function renderizarProductos() {
            const filtrados = obtenerProductosFiltrados();
            const inicio = (paginaActual - 1) * productosPorPagina;
            const fin = inicio + productosPorPagina;
            const productosPagina = filtrados.slice(inicio, fin);

            const grid = document.getElementById('productos-grid');
            grid.innerHTML = '';

            if (productosPagina.length === 0) {
                grid.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">No hay productos disponibles en esta categoría.</p>`;
                document.getElementById('paginacion-container').innerHTML = '';
                return;
            }

            productosPagina.forEach(p => {
                const card = document.createElement('div');
                card.className = "bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between";
                card.innerHTML = `
                    <div>
                        <div class="h-48 rounded-xl overflow-hidden mb-4 bg-rose-50 flex items-center justify-center relative">
                            <img src="${p.img}" alt="${p.nombre}" class="w-full h-full object-cover" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300?text=Optica+USA-EC';">
                        </div>
                        <h3 class="font-bold text-gray-900 text-sm mb-1">${p.nombre}</h3>
                        <p class="text-rose-800 font-extrabold text-base mb-4">${p.precio}</p>
                    </div>
                    <a href="https://wa.me/593985580778?text=Hola,%20deseo%20cotizar%20el%20modelo:%20${encodeURIComponent(p.nombre)}" target="_blank" class="w-full bg-rose-50 text-rose-800 hover:bg-rose-800 hover:text-white font-medium text-xs py-2.5 rounded-lg transition text-center block">
                        Cotizar por WhatsApp
                    </a>
                `;
                grid.appendChild(card);
            });

            renderizarPaginacion(filtrados.length);
        }

        function renderizarPaginacion(totalProductos) {
            const totalPaginas = Math.ceil(totalProductos / productosPorPagina);
            const container = document.getElementById('paginacion-container');
            container.innerHTML = '';

            if (totalPaginas <= 1) return;

            for (let i = 1; i <= totalPaginas; i++) {
                const btn = document.createElement('button');
                btn.innerText = i;
                btn.className = `px-4 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${i === paginaActual ? 'bg-rose-800 text-white shadow' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'}`;
                btn.onclick = () => {
                    paginaActual = i;
                    renderizarProductos();
                    
                    // Desplazamiento controlado con pequeño retraso para garantizar suavidad fluida
                    setTimeout(() => {
                        const destino = document.getElementById('seccion-catalogo');
                        if (destino) {
                            const yOffset = -90; // Deja un espacio cómodo debajo del header fijo
                            const y = destino.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                    }, 50);
                };
                container.appendChild(btn);
            }
        }

        function filtrarCategoria(cat) {
            categoriaActual = cat;
            paginaActual = 1;

            document.querySelectorAll('.cat-btn').forEach(b => {
                b.className = "cat-btn bg-white text-gray-700 border border-gray-200 text-xs font-semibold px-5 py-2.5 rounded-full shadow-sm hover:bg-rose-50 transition cursor-pointer";
            });
            event.target.className = "cat-btn bg-rose-800 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow transition cursor-pointer";

            renderizarProductos();
        }

        document.addEventListener("DOMContentLoaded", () => {
            renderizarProductos();
        });