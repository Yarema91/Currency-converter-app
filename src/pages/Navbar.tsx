import React, { useCallback, useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, NavLink } from 'react-router-dom';
import { isJSDocVariadicType } from 'typescript';
import { IProject } from '../models/IProject';
import { projectAPI } from '../services/ProductsService';

import projectSlice from '../components/project/projectSlice';
import CurrencyField from '../components/CurrencyField';
import { ICurrency } from '../models/ICurrency';


const defaultFormValues = {
  imageUrl: '',
  title: '',
  body: ''
};

type FieldName = "title" | "body" | "imageUrl";

const Header = () => {

  const [createProject, { error: CreateError, isLoading: CreateIsLoading }] = projectAPI.useCreateProjectMutation()

  // Form =>
  const [projectInput, setProjectInput] = useState<{ title: string, body: string, imageUrl: string }>(defaultFormValues);
  const [isDirty, setIsDirty] = useState<{ [id: string]: boolean }>({ title: false });


  const validationState: { [id: string]: { isInvalid: boolean, message: string }[] } = {
    "title": [
      { isInvalid: projectInput.title === "", message: "Title can not be empty" },
      { isInvalid: (projectInput.title !== "") && projectInput.title?.length < 3, message: "Title is too short" },
    ],
    "body": [
      { isInvalid: projectInput.body === "", message: "Body can not be empty" },
    ]
  };

  const getFieldValidation = (fieldName: FieldName) => {
    const result = validationState[fieldName];
    var isInvalid = result.map(x => x.isInvalid).some(x => x);
    var messages = result.filter(x => x.isInvalid).map(x => x.message);
    return {
      isInvalid: isInvalid,
      messages
    }
  };

  const getFormIsValid = () => {
    return !getFieldValidation("title").isInvalid &&
      !getFieldValidation("body").isInvalid;
  };

  const handleCreate1 = async () => {
    const title = projectInput.title;
    const body = projectInput.body;

    if (!getFormIsValid()) {
      (
        <h1>Input empty...</h1>
      )
    } else {
      await createProject({ title, imageUrl: "https://source.unsplash.com/1600x900/?project-art", body, status: "draft" } as IProject);
      setProjectInput(defaultFormValues);
    }
  }

  return (

    <nav className="navbar navbar-expand-lg   navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
       
        <div className="collapse navbar-collapse lg" id="navbarTogglerDemo03">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item me-3">
            <NavLink className="nav-link" exact to="/" activeClassName="active"><i className="bi bi-cash-coin"></i> Conversion</NavLink>
   
            </li>
            <li className="nav-item me-3">
            <NavLink className="nav-link" to="/history" activeClassName="active"><i className="bi bi-journal-text "></i> History</NavLink>
              
            </li>
            <li className="nav-item me-3">
            <NavLink className="nav-link" to="/comparison" activeClassName="active"><i className="bi bi-chevron-bar-contract"></i> Comparison</NavLink>

            </li>
            <li className="nav-item me-3">
            <NavLink className="nav-link" to="/graph" activeClassName="active"><i className="bi bi-bar-chart"></i> Graph</NavLink>
            </li>
          </ul>

          {/* <form className="d-flex" >
            <div className="currency-converter d--flex a--center j--spaceBetween" style={{ display: "flex" }}>
              <div className="input-group me-2" >
                <button type="button" className="btn btn-outline-secondary">USD</button>
                <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu" >
                  <li><a className="dropdown-item" href="#">USD</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
                <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" />
              </div>

              <i className="bi bi-arrow-left-right me-2 " style={{
                alignItems: "center",
                paddingTop: ".5em"
              }} ></i>

              <div className="input-group me-3">
                <button type="button" className="btn btn-outline-secondary">UAN</button>
                <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">USD</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
                <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" />
              </div>

            </div>
          </form> */}

        </div>
      </div>
    </nav>
  )
}

export default Header
