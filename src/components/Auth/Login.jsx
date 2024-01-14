import { TextField, Box, Button, Typography } from "@mui/material";
import { LoginService } from "../../services/AuthService";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UsuarioContext";
import './css/Login.css';

export const Login = () => {

    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLoginClick = async(e) => {
        try{
            e.preventDefault();
            let correo = document.getElementById('email').value;
            let password = document.getElementById('password').value;
    
            if(correo === '' || password === ''){
                alert('Todos los campos son obligatorios');
                return;
            }
            else{
                let data = await LoginService(correo, password);
                console.log('Inicio de sesion: ',data);
                if(data?.Token){
                    localStorage.setItem('user', JSON.stringify(data));
                    setUser(data);
                    console.log('Inicio de sesion exitoso');
                    navigate('/home');
                }
                else{
                    setError(true);
                    console.log('Inicio de sesion fallido');
                }
                return;
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <>
            <Box
                className="LoginForm"
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                autoComplete="off"
                noValidate={false}
            >
                <TextField
                id="email"
                label="Correo electrónico"
                type="email"
                autoComplete="current-email"
                error={error}
                />
                <TextField
                id="password"
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                error={error}
                />
                {error ? (<Typography
                    variant="span"
                    component="div"
                    sx={{ flexGrow: 1 }}
                    style={{
                        color: 'red',
                        fontSize: '15px',
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        marginTop: '10px',
                        marginBottom: '10px'
                    }}
                >
                    Correo o contraseña incorrectos
                </Typography>) :'' }
                
                <Button 
                    className="LoginButton"
                    variant="contained"
                    onClick={handleLoginClick}
                >
                    Iniciar sesión
                </Button>
            <br></br>
            <h3>¿No tienes una cuenta?</h3>
            <Button
                variant="text"
                onClick={() => navigate('/singup')}
            >
                Registrate
            </Button>
            </Box>
        </>

    );
};
