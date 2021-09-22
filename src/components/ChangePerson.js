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
  MenuItem,
  IconButton,
  Checkbox
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
  import { Create } from "@material-ui/icons";

export default function ChangePerson({ isAdmin, positions, element, GetData }) {
  const  user= JSON.parse(localStorage.getItem(element.key))
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = React.useState(user.name);
  const [surname, setSurname] = React.useState(user.surname);
  const [patronymic, setPatronymic] = React.useState(user.patronymic);
  const [position, setPosition] = React.useState(user.position);
  const [bday, setBday] = React.useState(new Date(user.bday));
  const [sex, setSex] = React.useState("");
  const [startday, setStartday] = React.useState(new Date(user.startday));
  const [finishday, setFinishday] = React.useState(new Date(user.finishday));
  const [rights, setRights] = React.useState(user.rights === 'on' ? true : false);

  const handleSubmit = (event) => {
    let key = user.key
    let new_user = {
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
    console.log(new_user)
    localStorage.setItem(key, JSON.stringify(new_user));
    handleClose();
    GetData();
    new_user = null
    event.preventDefault();
  };

  return (
    <div>
       { isAdmin ? <IconButton aria-label="Create" onClick={handleOpen}>
          <Create />
        </IconButton> : null}
      <Modal open={open} onClose={handleClose}>
        <Box className="Modal">
          <form id="change" onSubmit={handleSubmit} className="form">
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
                defaultValue={user.sex}
                name="radio-buttons-group"
                onChange={(e) => setSex(e.target.value)}
                required
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
              <Checkbox
                name="rights"
                defaultChecked ={rights ? true : false}
                onChange={(e) => setRights(e.target.value)}
              />
              Права присутствуют
            </div>
            <div className="BottomButtons">
              <Button
                variant="contained"
                form="change"
                type="submit"
                color="success"
                sx={{ marginRight: "1%" }}
              >
                Внести изменения
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
