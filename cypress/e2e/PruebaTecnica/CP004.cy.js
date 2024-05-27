import PaginaDetalleProducto from "../../support/PageObjects/PaginaDetalleProducto";
import PaginaInicio from "../../support/PageObjects/PaginaInicio";
import PaginaCarritoDeCompras from "../../support/PageObjects/PaginaCarritoDeCompras";

describe("Prueba 4,", function () {
  it("CP0004-Validar que se agregue un equipo al carrito de compras.Primero de la lista.", function () {
    const paginaInicio = new PaginaInicio();
    const paginaDetalleProducto = new PaginaDetalleProducto();
    const paginaCarritoDeCompras = new PaginaCarritoDeCompras();

    paginaInicio.visit();

    //Buscar el primer equipo de la lista
    const equipoLista = paginaInicio.ubicarEquipoPorPosicion(0);
    equipoLista.find(".product-item-name .name").as("tituloDeEquipoLista");

    // Esperar a que los datos del equipo cargen
    cy.get("@tituloDeEquipoLista").should("not.be.empty");

    // Recordar el modelo seleccionado
    let tituloDeProducto;
    cy.get("@tituloDeEquipoLista").then((elementoTitulo) => {
      tituloDeProducto = elementoTitulo.text();

      paginaInicio.seleccionarEquipo(equipoLista);

      //Verificar que el boton Comprar sea visible antes de hacer click
      paginaDetalleProducto.botonDeCompra().should("be.visible");

      //Agregar al carrito, haciendo click en el boton Comprar
      paginaDetalleProducto.presionarBotonComprar();

      //Verificar que haya entrado a la página de carrito
      cy.url().should("contain", "checkout");

      //Verificar que la tabla del carrito de compras sea visible
      paginaCarritoDeCompras.listaDeCarrito().should("be.visible");

      //Verificar que el equipo queda agregado al carrito
      const productoEnLista =
        paginaCarritoDeCompras.buscarProductoEnLista(tituloDeProducto);

      let modeloPrimerEquipoEnCarrito;
      productoEnLista.then((elementoCarrito) => {
        modeloPrimerEquipoEnCarrito = elementoCarrito.text();
        expect(modeloPrimerEquipoEnCarrito).to.contain(tituloDeProducto);
      });
    });
  });
});
