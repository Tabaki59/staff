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


const array = [
  {
      "key": "1",
      "name": "Борис",
      "surname": "Вишневский",
      "patronymic": "Васильевич",
      "position": 1,
      "bday": "2012-04-23T18:25:43.511Z",
      "sex": "Муж.",
      "startday": "2016-04-23T18:25:43.511Z",
      "finishday": "2018-04-23T18:25:43.511Z",
      "rights": "on"
      },
      {
        "key": "2",
        "name": "Борис",
        "surname": "Вишневский",
        "patronymic": "Александрович",
        "position": 2,
        "bday": "2012-04-23T18:25:43.511Z",
        "sex": "Муж.",
        "startday": "2016-04-23T18:25:43.511Z",
        "finishday": "2018-04-23T18:25:43.511Z",
        "rights": "on"
        },
        {
          "key": "3",
          "name": "Борис",
          "surname": "Вишневский",
          "patronymic": "Лазаревич",
          "position": 3,
          "bday": "2012-04-23T18:25:43.511Z",
          "sex": "Муж.",
          "startday": "2016-04-23T18:25:43.511Z",
          "finishday": "2018-04-23T18:25:43.511Z",
          "rights": ""
          },
          {
            "key": "4",
            "name": "Борис",
            "surname": "Вишневский",
            "patronymic": "Настоящевич",
            "position": 4,
            "bday": "2012-04-23T18:25:43.511Z",
            "sex": "Муж.",
            "startday": "2016-04-23T18:25:43.511Z",
            "finishday": "2018-04-23T18:25:43.511Z",
            "rights": ""
            }
]

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
      console.log(array)
      array.map((el) => localStorage.setItem(el.key, JSON.stringify(el)))
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
