import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Label } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const baseURL = "http://localhost:4000/api/employee/";
const baseURL_register = baseURL + "register";
const baseURL_edit     = baseURL + "edit/";
const baseURL_delete   = baseURL + "delete/";
const baseURL_list     = baseURL + "list";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

function App() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    lastname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionPost = async () => {
    await axios.post(baseURL_register, employeeInfo).then((response) => {
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    });
  };

  const peticionPut = async () => {
    await axios
      .put(baseURL_edit + employeeInfo.id, employeeInfo)
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((item) => {
          if (employeeInfo.id === item.id) {
            item.name = employeeInfo.name;
            item.lastname = employeeInfo.lastname;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      });
  };

  const peticionDelete = async () => {
    await axios.delete(baseURL_delete + employeeInfo.id).then((response) => {
      setData(data.filter((item) => item.id !== employeeInfo.id));
      abrirCerrarModalEliminar();
    });
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const seleccionarEmployee = (item, caso) => {
    setEmployeeInfo(item);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  useEffect(() => {
    async function peticionGet() {
      await axios.get(baseURL_list).then((res) => {
        setData(res.data);
      });
    }
    peticionGet();
  }, []);

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Create new employee</h3>
      <TextField
        name="name"
        className={styles.inputMaterial}
        label="Name"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="lastname"
        className={styles.inputMaterial}
        label="Last Name"
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>
          Insert
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancel</Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Edit Employee Info</h3>
      <TextField
        name="name"
        className={styles.inputMaterial}
        label="name"
        onChange={handleChange}
        value={employeeInfo && employeeInfo.name}
      />
      <br />
      <TextField
        name="lastname"
        className={styles.inputMaterial}
        label="Last name"
        onChange={handleChange}
        value={employeeInfo && employeeInfo.lastname}
      />
      <br />
      <Label>
        <b>Employee ID:</b> {employeeInfo && employeeInfo.id}
      </Label>
      <Label>
        <b>Creation:</b> {employeeInfo && employeeInfo.createdAt}
      </Label>
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>
          Editar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Do you want to delete the information of <b>{employeeInfo && employeeInfo.name} {employeeInfo && employeeInfo.lastname}</b>?
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>
          Sí
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );

  return (
    <div className="App">
      <br></br>
      <br></br>
      <Button onClick={() => abrirCerrarModalInsertar()}>
        Insert Employee
      </Button>
      <br></br>
      <br></br>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>ID number</TableCell>
              <TableCell>Register Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item) => (
              <TableRow key="{item._id}">
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.lastname}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>
                  <Edit
                    className={styles.iconos}
                    onClick={() => seleccionarEmployee(item, "Editar")}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <Delete
                    className={styles.iconos}
                    onClick={() => seleccionarEmployee(item, "Eliminar")}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>

      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}

export default App;
