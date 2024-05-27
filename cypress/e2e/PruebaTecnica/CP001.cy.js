import PaginaInicio from "../../support/PageObjects/PaginaInicio";
import PaginaDetalleProducto from "../../support/PageObjects/PaginaDetalleProducto";

describe("Prueba 1", function () {
  it("CP001-Validar cuotas en compra de equipo-Cuotas 3-Equipo.A14", function () {
    const paginaInicio = new PaginaInicio();
    const paginaDetalleProducto = new PaginaDetalleProducto();
    paginaInicio.visit();

    //Buscar el equipo Samsung A14
    const equipoLista =
      paginaInicio.ubicarEquipoPorModelo("Samsung Galaxy A14");
    //Verificar que el equipo seleccionado es el A14
    equipoLista.find(".product-item-name .name").as("tituloDeEquipoLista");

    cy.get("@tituloDeEquipoLista")
      .invoke("text")
      .then((titulo) => {
        expect("Samsung Galaxy A14 4G").to.contain(titulo);
      });

    paginaInicio.seleccionarEquipo(equipoLista);
    paginaDetalleProducto.abrirCalculadoraDeCuotas();

    //Seleccionar banco y tarjeta para poder ver opciones de cuotas
    paginaDetalleProducto.seleccionarBanco("BBVA Frances");
    paginaDetalleProducto.seleccionarTarjeta("Visa");
    paginaDetalleProducto.presionarBotonCalcularCuotas();

    paginaDetalleProducto
      .tiposDeCuotas()
      .should("contain", "3 cuotas sin interés");
  });
});
