import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand } from "mdbreact";

class HeaderMain extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
      <MDBNavbar color="warning-color-dark" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Lista de compras</strong>
        </MDBNavbarBrand>
      </MDBNavbar>
    );
  }
}

export default HeaderMain;