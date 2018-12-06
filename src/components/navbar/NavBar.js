import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

class NavBar extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        name: "?"
      }
    };
  }

  logar(e) {
    alert("logar");
    e.preventDefault();
  }

  logout(e) {
    alert("sair");
    e.preventDefault();
  }

  render() {

    return (
      <header>
        
          <NavLink
            className="nav-link"
            activeClassName="nav-link-active"
            exact
            to="/"
          >
            Timeline
          </NavLink>
          <NavLink
            className="nav-link"
            activeClassName="nav-link-active"
            exact
            to="/bonds"
          >
            Investimentos
          </NavLink>
          <NavLink
            className="nav-link"
            activeClassName="nav-link-active"
            to="/index"
          >
            Indices
          </NavLink>

      </header>
    );
  }
}

export default NavBar;
