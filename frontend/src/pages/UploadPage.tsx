import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import UploadComponent from '../components/UploadComponent';
import DataTable from '../components/DataTable';
import UploadCSVUseCase from '../domain/use-cases/UploadCSVUseCase';
import UpdatePricesUseCase from '../domain/use-cases/UpdatePricesUseCase';
import CSVRepository from '../domain/repositories/CSVRepository';
import { DataItem, UpdateItem } from '../interfaces/interfaces';
import Button from '@mui/material/Button';
import Message from '../components/Message';

function UploadPage() {
    const [apiData, setApiData] = useState<DataItem[]>([]);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [updateData, setUpdateData] = useState<UpdateItem[]>([]);
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');
    const [messageOpen, setMessageOpen] = useState(false);

    const handleCloseMessage = () => {
        setMessageOpen(false);
    };

    const handleFileUpload = async (file: File) => {
        try {
            const csvRepository = new CSVRepository();
            const useCase = new UploadCSVUseCase(csvRepository);
            const data = await useCase.execute(file);

            setApiData(data.processedData);
            setFileUploaded(true);
            setMessage(data.message);
            setMessageType('success');
            setMessageOpen(true);

            const updateDataArray = data.processedData.map((item) => ({
                code: item.code,
                new_price: item.new_price,
            }));

            setUpdateData(updateDataArray);
        } catch (error) {
            setMessage(`Erro: ${error}`);
            setMessageType('error');
            setMessageOpen(true);
            console.error('Erro ao enviar o arquivo:', error);
        }
    };

    const handleUpdatePrices = async () => {
        try {
            const csvRepository = new CSVRepository();
            const useCase = new UpdatePricesUseCase(csvRepository);
            const data = await useCase.execute(updateData);

            setMessage(data.message);
            setMessageType('success');
            setMessageOpen(true);

            return data;
        } catch (error) {
            setMessage(`Erro: ${error}`);
            setMessageType('error');
            setMessageOpen(true);
            console.error('Erro ao atualizar os preços: ', error);
        }
    };

    const hasErrors = apiData.some(item => item.errors.length > 0);

    return (
        <Container>
            <Message
                type={messageType}
                message={message}
                open={messageOpen}
                onClose={handleCloseMessage}
            />
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
                {apiData.length > 0 && <DataTable data={apiData} />}
                {fileUploaded && !hasErrors && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdatePrices}
                    >
                        Atualizar
                    </Button>
                )}
            </Box>
        </Container>
    );
}

export default UploadPage;
