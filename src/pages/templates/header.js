import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

export class Header extends Component {


    state = {
        isOpen: false,
        categories: this.props.categories ? this.props.categories : false,
        lists: this.props.lists ? this.props.lists : false,
        products: this.props.products ? this.props.products : false
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
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem className={this.state.lists ? 'active' : ''}>
                            <MDBNavLink to="/lists">Listas</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem className={this.state.products ? 'active' : ''}>
                            <MDBNavLink to="/products">Produtos</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem className={this.state.categories ? 'active' : ''}>
                            <MDBNavLink to="/categories">Categorias</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default Header;