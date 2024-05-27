class PaginaDetalleProducto {
  abrirCalculadoraDeCuotas() {
    return cy.contains("Calculá tus cuotas").click();
  }
  seleccionarBanco(banco) {
    cy.contains("Banco Emisor").click();
    //Forcé el click porque en la UI hay un elemento padre con display none
    return cy.get("li").contains(banco).click({ force: true });
  }
  seleccionarTarjeta(tarjeta) {
    cy.contains("Card").click();
    //Forcé el click porque en la UI hay un elemento padre con display none
    return cy.get("li").contains(tarjeta).click({ force: true });
  }
  presionarBotonCalcularCuotas() {
    return cy.contains("Calcular cuotas").click();
  }
  tiposDeCuotas() {
    return cy.get("#bodyTable");
  }
  botonDeCompra() {
    return cy.get("#swatch_attribute_card");
  }
  presionarBotonComprar() {
    return this.botonDeCompra().click();
  }
}
export default PaginaDetalleProducto;
