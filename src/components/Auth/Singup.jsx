import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { RegisterService } from '../../services/AuthService';
import './css/Singup.css';

export const Singup = () => {

    const navigate = useNavigate();

    const handleRegisterClick = async() => {
        try{
            const name = document.getElementById('name').value;
            const lastname = document.getElementById('lastname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
    
            let newUser = {
                nombres: name,
                apellidos: lastname,
                correo: email,
                password
            };
    
            let data = await RegisterService(newUser);
            console.log('handleRegisterClick > data: ',data);
            if(data?.Id){
                alert('Usuario creado con exito');
                navigate('/login');
            }
            else{
                alert('Error al crear el usuario');
            }
        }
        catch(error){
            console.log(error);
        }
    }
    return(
        <>
            <Box
                className="RegisterForm"
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                autoComplete="off"
                noValidate={false}
            >
                <TextField
                id="name"
                label="Nombres"
                type="text"
                autoComplete="current-name"
                />

                <TextField
                id="lastname"
                label="Apellidos"
                type="text"
                autoComplete="current-lastname"
                />

                <TextField
                id="email"
                label="Correo electrónico"
                type="email"
                autoComplete="current-email"
                />

                <TextField
                id="password"
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                />

                <Button 
                    className="RegisterButton"
                    variant="contained"
                    onClick={handleRegisterClick}
                >
                    Registrarse
                </Button>
                <p>
                    O
                </p>
                <Button
                    className='RegisterButton'
                    variant="contained"
                    onClick={() => navigate('/login')}
                >
                    Volver
                </Button>
            </Box>
        </>
    );
};
