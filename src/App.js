/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Switch, FormControlLabel, FormGroup, Button, ListItem } from "@mui/material";
import "./App.css";
import AddNewPerson from "./components/AddNewPerson";
import Item from "./components/Listitem";

const Positions = [
  { key: 1, position: "Директор" },
  { key: 2, position: "Продавец" },
  { key: 3, position: "Непродавец" },
  { key: 4, position: "Стажер" },
  { key: 5, position: "Дядя охранник" },
];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isAdmin: false,
      positions: Positions,
      data: []
    };
    this.handleChangeSwitch = this.handleChangeSwitch.bind(this);
    this.GetData = this.GetData.bind(this)
  }

   async GetData() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
        keys.map((key) => values.push(JSON.parse(localStorage.getItem(key))))
    this.setState({data: values})
  }

  componentDidMount(){
    this.GetData()
  }

  handleChangeSwitch() {
    let check = this.state.isAdmin;
    this.setState({ isAdmin: !check });
  }

  render() {
    return (
      <div className="Main">
        <Navbar className="Navbar">
          <Navbar.Brand className="Company_name">
            Реестр сотрудников "ООО Мамина Работа"
          </Navbar.Brand>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.isAdmin ? true : false}
                  onChange={this.handleChangeSwitch}
                />
              }
              label="Режим администрирования"
            />
          </FormGroup>
        </Navbar>
        <div className="StaffList">
        {this.state.data.map((element)=>
        <Item key={element.key} isAdmin={this.state.isAdmin} positions={this.state.positions} element={element} GetData={this.GetData}/>
        )}
        </div>
        <AddNewPerson isAdmin={this.state.isAdmin}  positions={this.state.positions} GetData={this.GetData}/>
      </div>
    );
  }
}
