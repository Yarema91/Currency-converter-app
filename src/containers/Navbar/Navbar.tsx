import React, { useCallback, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Selector from '../../components/Selector';
// import { ICurrency } from '../models/ICurrency';
import "./Navbar.scss"


const defaultFormValues = {
  imageUrl: '',
  title: '',
  body: ''
};

type FieldName = "title" | "body" | "imageUrl";

const Header = () => {


  return (

    <nav className="navbar navbar-expand-lg navbar-light" >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse lg" id="navbarTogglerDemo03">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item me-3">
              <NavLink
                className="nav-link"
                exact to="/"
                activeClassName="active"
              >
                <i className="bi bi-cash-coin"></i> Conversion
              </NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink
                className="nav-link"
                to="/history"
                activeClassName="active"
              >
                <i className="bi bi-journal-text "></i> History
              </NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink
                className="nav-link"
                to="/comparison"
                activeClassName="active"
              >
                <i className="bi bi-chevron-bar-contract"></i> Comparison
              </NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink
                className="nav-link"
                to="/graph"
                activeClassName="active">
                <i className="bi bi-bar-chart"></i> Graph
              </NavLink>
            </li>
          </ul>
          <div>
            <div className="input-group me-2 currency-converter d--flex a--center j--spaceBetween" style={{ display: "flex" }} >
              <Selector />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
