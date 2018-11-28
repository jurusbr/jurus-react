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
    const pathname = this.props.to;

    return (
      <header>
        <div>
          <NavLink
            className="router-link"
            activeClassName="router-link-active"
            exact
            to="/"
          >
            Timeline
          </NavLink>
          <NavLink
            className="router-link"
            activeClassName="router-link-active"
            exact
            to="/bonds"
          >
            Investimentos
          </NavLink>
          <NavLink
            className="router-link"
            activeClassName="router-link-active"
            to="/index"
          >
            Indices
          </NavLink>
        </div>

      </header>
    );
  }
}

export default NavBar;
