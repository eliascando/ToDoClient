import { Box } from "@mui/material";
import { useEffect } from "react";

export const ToDos = ({
    titulo,
    text,
    estadoColor
}) => {

    useEffect(() => {
        console.log('ToDos > useEffect > return');
        console.log('ToDos > useEffect > return > titulo: ',titulo);
        console.log('ToDos > useEffect > return > text: ',text);
        console.log('ToDos > useEffect > return > estadoColor: ',estadoColor);
    },[]);

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    bgcolor: 'background.paper',
                    borderRadius: '10px',
                    boxShadow: 1,
                    p: 2,
                    m: 1,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        height: '10%',
                        marginBottom: '10px',
                        backgroundColor: estadoColor
                    }}
                >   
                </div>
                <h1
                    style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif'
                    }}
                >{titulo}</h1>
                <p
                    style={{
                        fontSize: '15px',
                        fontFamily: 'sans-serif'
                    }}
                >{text}</p>
            </Box>
        </>
    );
}