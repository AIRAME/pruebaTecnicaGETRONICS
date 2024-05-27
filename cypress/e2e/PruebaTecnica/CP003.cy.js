import PaginaDetalleProducto from "../../support/PageObjects/PaginaDetalleProducto";
import PaginaInicio from "../../support/PageObjects/PaginaInicio";

describe("Prueba 3", function () {
  it("CP003-Intentar seleccionar cuotas en compra de equipo-Cuotas.60-Tercero de la lista-Banco.credicoop-Tarjeta.Visa", function () {
    const paginaInicio = new PaginaInicio();
    const paginaDetalleProducto = new PaginaDetalleProducto();
    paginaInicio.visit();

    //Buscar y hacer click en el tercer equipo de la lista
    const equipoLista = paginaInicio.ubicarEquipoPorPosicion(2);
    equipoLista.find(".product-item-name .name").as("tituloDeEquipoLista");

    // Esperar a que los datos del equipo cargen
    cy.get("@tituloDeEquipoLista").should("not.be.empty");

    // Recordar titulo del equipo
    let tercerEquipoLista;
    cy.get("@tituloDeEquipoLista").then((elementoLista) => {
      tercerEquipoLista = elementoLista.text();
    });

    paginaInicio.seleccionarEquipo(equipoLista);

    // Verificar que el titulo haya cargado
    cy.get(".page-title").should("be.visible");

    let tercerEquipoPagina;
    cy.get(".page-title")
      .find(".base")
      .then((elementoPagina) => {
        tercerEquipoPagina = elementoPagina.text();
        // Verificar que se haya seleccionado el 3er equipo en la lista
        expect(tercerEquipoLista).to.contain(tercerEquipoPagina);
      });

    //Seleccionar banco Credicoop con tarjeta VISA para ver cuotas
    paginaDetalleProducto.abrirCalculadoraDeCuotas();
    paginaDetalleProducto.seleccionarBanco("Credicoop");
    paginaDetalleProducto.seleccionarTarjeta("Visa");
    paginaDetalleProducto.presionarBotonCalcularCuotas();

    //Verificar que no exista un medio de pago con 60 cuotas para el banco Credicoop con tarjeta VISA
    paginaDetalleProducto.tiposDeCuotas().should("not.have.text", "60 cuotas");
  });
});
