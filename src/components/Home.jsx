import { AppBar, Box, Button, IconButton, Menu,MenuItem, Toolbar, Typography, InputBase, Input, Modal, TextareaAutosize } from "@mui/material";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UsuarioContext";
import { AccountCircle, Add, Search } from "@mui/icons-material";
import { ToDos } from "./layout/ToDos";
import { getToDos, saveToDo } from "../services/ContentService";
import { getEstados } from "../common/GLOBAL";

export const Home = () => {

    const [allToDos, setAllToDos] = useState([]);
    const [filteredToDos, setFilteredToDos] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, setUser } = useContext(UserContext);
    const [filter, setFilter] = useState('');
    const [showModalNew, setShowModalNew] = useState(false);
    const [saveNote, setSaveNote] = useState(false);
    let navigate = useNavigate();

    useEffect(()=>{
        setSaveNote(false);
        const fetchData = async() => {
            let data = await getToDos(user.Id);
            console.log('data: ',data);
            let estadoColor = await getEstados();
            console.log('estadoColor: ',estadoColor);
            data.forEach((item, index) => {
                let estado = estadoColor.find((estado) => estado.nombre === item.estado);
                console.log('estado: ',estado);
                if(estado){
                    data[index].estado = `${estado.color}`;
                }
                else{
                    data[index].estado = 'gray';
                }
            });
            setAllToDos(data);
            setFilteredToDos(data);
        }
        fetchData();
        return () => {
            setAllToDos([]);
            setFilteredToDos([]);
        }
    },[user, saveNote]);

    useEffect(() => {
        const filteredToDos = filter.trim()
            ? allToDos.filter((item) => {
                return item.titulo.toLowerCase().includes(filter.toLowerCase()) || 
                       item.texto.toLowerCase().includes(filter.toLowerCase());
              })
            : allToDos;
    
        setFilteredToDos(filteredToDos);
    }, [filter, allToDos]);
    
    const handleGuardarNew = async() => {
        let titulo = document.getElementById('tituloNew').value;
        let descripcion = document.getElementById('descripcionNew').value;
        let newNote = {
            titulo,
            texto: descripcion,
            idUsuario: user.Id,
        };
        console.log('newNote: ',newNote);
        let response = await saveToDo(newNote);
        console.log('response: ',response);
        if(response?.id){
            alert('Nota creada con exito');
            setShowModalNew(false);
            setSaveNote(true);
        }
        else{
            alert('Error al crear la nota');
        }
    }

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLoguoutClick = () => {
        localStorage.removeItem('user');
        setUser({});
        navigate('/login');
    }

    return(
        <>
            <AppBar
                position="static"
                style={{
                    backgroundColor: 'gray',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {user.Nombres}
                    </Typography>
                    <InputBase
                        sx={{ ml: -10, flex: 1 }}
                        placeholder="Buscar"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={
                            (e) => {
                                console.log(e.target.value);
                                setFilter(e.target.value);
                            }
                        }
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <Search />
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleMenu}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Perfil</MenuItem>
                        <MenuItem onClick={
                            () => {
                                handleClose();
                                handleLoguoutClick();
                            }
                        }>
                            Cerrar Sesión
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Box
                className="Home"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh',
                    backgroundColor: '#f5f5f5',
                    paddingLeft: '10px',
                    paddingRight: '10px'
                }}
            >
                {
                    filteredToDos.map((toDo, index) => (
                        <ToDos
                            key={index}
                            titulo={toDo.titulo}
                            text={toDo.texto}
                            estadoColor={toDo.estado}
                        />
                    ))
                }
                <button
                    className="arrow-up-div fixed-bottom-div"
                    variant="contained"
                    onClick={() => setShowModalNew(true)}
                >
                    <Add />
                </button>
            </Box>
            <Modal
                open={showModalNew}
                onClose={() => setShowModalNew(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        height: '50%',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        borderRadius: '10px',
                        boxShadow: 24,
                        p: 4,
                        padding: '20px',
                    }}
                >
                    <Input
                        id="tituloNew"
                        placeholder="Título"
                        style={{
                            width: '100%',
                            height: '10%',
                            marginBottom: '10px'
                        }}
                    />
                    <TextareaAutosize
                        id="descripcionNew"
                        placeholder="Descripción"
                        style={{
                            width: '100%',
                            height: '70%',
                            marginBottom: '10px'
                        }}
                    />
                    <Button
                        variant="contained"
                        style={{
                            width: '100%',
                            height: '10%',
                            marginBottom: '10px',
                            backgroundColor: 'green',
                        }}
                        onClick={handleGuardarNew}
                    >
                        Guardar
                    </Button>

                </Box>
            </Modal>
        </>
    );
};
