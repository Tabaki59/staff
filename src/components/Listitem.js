/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {
  IconButton,
  Switch,
  FormControlLabel,
  FormGroup,
  Button,
  ListItem,
} from "@mui/material";
import { Delete, RemoveRedEye, Create } from "@material-ui/icons";
import "../App.css";
import ChangePerson from "./ChangePerson";
import PersonDetails from "./PersonDetails"

export default function Item({ isAdmin, positions, element, GetData }) {
   function DeleteItem(key){
    localStorage.removeItem(key)
    GetData();
   }

  return (
    <div className="Item" id={element.key}>
      <div className="PersonName">
        {" "}
        {element.surname + " " + element.name + " " + element.patronymic}{" "}
      </div>
      <div className='ActionButtons'>
        <PersonDetails positions={positions} element = {element}/>
        { isAdmin ? <ChangePerson isAdmin={isAdmin} positions={positions} element = {element} GetData={GetData}/> : null}
        { isAdmin ? <IconButton aria-label="Delete" onClick={() => DeleteItem(element.key)}>
          <Delete />
        </IconButton> : null}
      </div>
    </div>
  );
}
