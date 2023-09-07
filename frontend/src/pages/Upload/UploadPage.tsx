import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import UploadComponent from '../../components/Upload/UploadComponent';

const UploadPage: React.FC = () => {
    const handleFileUpload = (file: File) => {
        // Implemente a lógica de processamento do arquivo CSV aqui
        console.log('Arquivo CSV carregado:', file.name);
    };

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Upload de Arquivo CSV
                </Typography>
                <UploadComponent onFileUpload={handleFileUpload} />
            </Box>
        </Container>
    );
};

export default UploadPage;
