import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown, MDBDropdownToggle, MDBDropdownItem, MDBDropdownMenu, MDBIcon } from "mdbreact";
import { Link } from 'react-router-dom';
import {getUser} from '../../services/auth';

const {sub} = getUser();

export class Header extends Component {
    
    state = {
        isOpen: false,
        categories: this.props.categories ? this.props.categories : false,
        lists: this.props.lists ? this.props.lists : false,
        products: this.props.products ? this.props.products : false,
        users: this.props.users ? this.props.users : false
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
                        <MDBNavItem className={this.state.users ? 'active' : ''}>
                            <MDBNavLink to="/users">Usuários</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <MDBIcon icon="user" /> {sub.username}
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default">
                                    <Link to="/changeuser">Alterar dados</Link>
                                    <MDBDropdownItem divider />
                                    <Link to="/logout">Sair</Link>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default Header;