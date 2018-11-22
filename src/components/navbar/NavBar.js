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
            to="/bot"
          >
            Indices
          </NavLink>
        </div>

        <div>
          <h1>
            <a onClick={this.logar.bind(this)} />
          </h1>
        </div>

        <div className="profile">
          <h3 className="userName">{this.state.user.name}</h3>
          <a className="logout" onClick={this.logout.bind(this)}>
            sair
          </a>
        </div>
      </header>
    );
  }
}

export default NavBar;
