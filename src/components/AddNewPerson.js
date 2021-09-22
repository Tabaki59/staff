import * as React from "react";
import {
  Button,
  Modal,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

export default function AddNewPerson({ isAdmin, positions, GetData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [patronymic, setPatronymic] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [bday, setBday] = React.useState(new Date());
  const [sex, setSex] = React.useState("");
  const [startday, setStartday] = React.useState(new Date());
  const [finishday, setFinishday] = React.useState(new Date());
  const [rights, setRights] = React.useState(false);

  const handleSubmit = (event) => {
    let key = generateHexString(10)
    let user = {
      key: key,
      name: name,
      surname: surname,
      patronymic: patronymic,
      position: position,
      bday: bday,
      sex: sex,
      startday: startday,
      finishday: finishday,
      rights: rights,
    };
    localStorage.setItem(key, JSON.stringify(user));
    handleClose();
    GetData();
    event.preventDefault();
  };

  function generateHexString(length) {
    var ret = "";
    while (ret.length < length) {
      ret += Math.random().toString(16).substring(2);
    }
    return ret.substring(0,length);
  }

  return (
    <div>
      <Button
        variant="contained"
        className="AddButton"
        disabled={isAdmin ? false : true}
        onClick={handleOpen}
      >
        Добавить сотрудника
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className="Modal">
          <form id="add" onSubmit={handleSubmit} className="form">
            <div>
              <TextField
                label="Фамилия"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
            <div>
              <TextField
                label="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <TextField
                label="Отчество"
                value={patronymic}
                onChange={(e) => setPatronymic(e.target.value)}
                required
              />
            </div>
            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Должность</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={position}
                  label="position"
                  onChange={(e) => setPosition(e.target.value)}
                >
                  {positions.map((el) => (
                    <MenuItem value={el.key}>{el.position}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Дата рождения"
                value={bday}
                onChange={(newValue) => {
                  setBday(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <FormControl component="fieldset">
              <FormLabel component="legend">Пол</FormLabel>
              <RadioGroup
                aria-label="gender"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={(e) => setSex(e.target.value)}
              >
                <FormControlLabel
                  value="Жен."
                  control={<Radio />}
                  label="Жен."
                />
                <FormControlLabel
                  value="Муж."
                  control={<Radio />}
                  label="Муж."
                />
              </RadioGroup>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Дата приема на работу"
                value={startday}
                onChange={(newValue) => {
                  setStartday(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Дата увольнения"
                value={finishday}
                onChange={(newValue) => {
                  if (newValue < startday) {
                    alert("Ошибка, вы не могли уволить его не приняв");
                  } else {
                    setFinishday(newValue);
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <div>
              <input
                name="rights"
                type="checkbox"
                onChange={(e) => setRights(e.target.value)}
              />
              Права присутствуют
            </div>
            <div className="BottomButtons">
              <Button
                variant="contained"
                form="add"
                type="submit"
                color="success"
                sx={{ marginRight: "1%" }}
              >
                Добавить
              </Button>
              <Button
                variant="contained"
                onClick={handleClose}
                color="error"
                sx={{ marginRight: "1%" }}
              >
                Закрыть
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
