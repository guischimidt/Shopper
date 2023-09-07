import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import UploadComponent from '../../components/Upload/UploadComponent';
import UploadCSVUseCase from '../../domain/use-cases/UploadCSVUseCase';


function UploadPage() {

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
                <UploadComponent uploadCSVUseCase={new UploadCSVUseCase()} />
            </Box>
        </Container>
    );
}

export default UploadPage;
