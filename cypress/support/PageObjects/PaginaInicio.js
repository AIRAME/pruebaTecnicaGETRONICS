class PaginaInicio {
  constructor() {
    cy.viewport(1920, 1080);
  }

  visit() {
    cy.visit("https://tiendaonline.movistar.com.ar");
  }

  filtros() {
    return cy.get("#filters-items");
  }

  filtrarPorMarca(marca) {
    return this.filtros()
      .find("[data-code='manufacturer']")
      .contains(marca)
      .click();
  }

  filtrarPorPrecio(precio) {
    return this.filtros()
      .find("[data-code='price']")
      .contains(precio)
      .scrollIntoView()
      .click();
  }

  filtrosSeleccionados() {
    return this.filtros().find("ul");
  }

  filtrarPorMemoria(memoria) {
    return this.filtros()
      .find("[data-code='movistar_internalmemory']")
      .contains(memoria)
      .scrollIntoView()
      .click();
  }

  ubicarEquipoPorModelo(modelo) {
    return cy.get(".products").contains(modelo);
  }

  ubicarEquipoPorPosicion(posicion) {
    return cy.get("[class='products']").find(`li:eq(${posicion})`);
  }

  seleccionarEquipo(elemento) {
    elemento.click();
  }
}

export default PaginaInicio;
