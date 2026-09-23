
window.addEventListener("load", () => {
  cargarProductos();
});


async function cargarProductos() {
  
  const contenedor = document.querySelector("#contenedor-productos");
  const estado = document.querySelector("#estado");

  try {
    
    const respuesta = await fetch("productos.json");

    if (!respuesta.ok) {
      throw new Error(`No se pudo leer productos.json (código ${respuesta.status})`);
    }

    
    const productos = await respuesta.json();

    estado.remove(); 
    mostrarProductos(productos, contenedor);
  } catch (error) {
    estado.textContent = `Error al cargar los productos: ${error.message}`;
    estado.classList.add("estado--error");
    console.error(error);
  }
}


function mostrarProductos(productos, contenedor) {
  productos.forEach((producto) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta");

    const sinStock = producto.stock === 0;
    if (sinStock) tarjeta.classList.add("tarjeta--agotada");

    tarjeta.innerHTML = `
      <div class="tarjeta__cuerpo">
        <span class="tarjeta__categoria">${producto.categoria}</span>
        <h2 class="tarjeta__nombre">${producto.nombre}</h2>
        <p class="tarjeta__descripcion">${producto.descripcion}</p>
      </div>
      <footer class="tarjeta__pie">
        <span class="tarjeta__precio">$${producto.precio.toLocaleString("es-AR")}</span>
        <span class="tarjeta__stock">${sinStock ? "Sin stock" : producto.stock + " disponibles"}</span>
      </footer>
    `;

    contenedor.appendChild(tarjeta);
  });
}