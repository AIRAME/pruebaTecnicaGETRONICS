class PaginaCarritoDeCompras {
  listaDeCarrito() {
    return cy.get("#shopping-cart-table");
  }

  buscarProductoEnLista(producto) {
    return this.listaDeCarrito().contains(producto);
  }
}
export default PaginaCarritoDeCompras;
