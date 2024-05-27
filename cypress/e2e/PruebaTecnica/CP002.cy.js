import PaginaInicio from "../../support/PageObjects/PaginaInicio";

describe("Prueba 2", function () {
  it("CP002-Aplicar filtro de equipos-Memoria Interna.128GB-Precio Entre 200Ky300K", function () {
    const paginaInicio = new PaginaInicio();
    paginaInicio.visit();

    const cantidadDeProductosRegex = /Mostrando\s+(\d+)/;

    // Filtrar
    paginaInicio.filtrarPorMemoria("128GB");
    paginaInicio.filtrarPorPrecio("$ 0 - $ 1.000.000");
    paginaInicio.filtrarPorPrecio("$ 200.000 - $ 300.000");

    // Validar aplicación de filtros (Esto no me salió)
    cy.scrollTo("top");
    paginaInicio.filtrosSeleccionados();
    //.should("contain", "128GB$ 200.000 - $ 300.000");

    // Esperar a que los datos del equipo cargen; esto indica que los filtros estan sincronizados con la tabla de resultados.
    const equipoLista = paginaInicio.ubicarEquipoPorPosicion(0);
    equipoLista.find(".product-item-name .name").as("tituloDeEquipoLista");
    cy.get("@tituloDeEquipoLista").should("not.be.empty");

    // Validar cantidad
    let cantidadEsperada;
    cy.get(".total-products > p").then(($valor) => {
      cantidadEsperada = Number(
        $valor.text().match(cantidadDeProductosRegex)[1]
      );
    });

    //Esto solo funciona si todos los elementos estan en una sola pagina. Extender funcionalidad para que encuetre todos.
    cy.get(".products > ol")
      .find("li")
      .then((elementosDeLista) => {
        expect(elementosDeLista.length).to.equal(cantidadEsperada);
      });
  });
});
