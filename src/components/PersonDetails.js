import React, { Component } from "react";
import {
  IconButton,
  Switch,
  FormControlLabel,
  FormGroup,
  Button,
  ListItem,
  Modal,
  Box,
  TextField
} from "@mui/material";
import { Delete, RemoveRedEye, Create } from "@material-ui/icons";
import "../App.css";

export default function ChangePerson({ positions, element }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton aria-label="RemoveRedEye" onClick={handleOpen}>
        <RemoveRedEye />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box className="Modal">
        <div>
              <TextField
                value={element.surname}
                disabled={true}
                required
              />
            </div>
            <div>
              <TextField
                value={element.name}
                disabled={true}
                required
              />
            </div>
            <div>
              <TextField
                value={element.patronymic}
                disabled={true}
                required
              />
            </div>
            <div>
              <TextField
                value={positions[element.position].position}
                disabled={true}
                required
              />
            </div>
            <div>
              <TextField
                value={element.sex}
                disabled={true}
                required
              />
            </div>
            <div>
              <TextField
                value={element.bday}
                disabled={true}
                required
              />
            </div>
            <div>
              <TextField
                value={element.startday}
                disabled={true}
                required
              />
            </div>
            <div>
              <TextField
                value={element.finishday}
                disabled={true}
                required
              />
            </div>
            <div>
              <TextField
                value={element.rights == '' ? 'Нет прав' : 'Есть права'}
                disabled={true}
                required
              />
            </div>
          <Button
            variant="contained"
            onClick={handleClose}
            color="error"
            sx={{ marginRight: "1%" }}
          >
            Закрыть
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
