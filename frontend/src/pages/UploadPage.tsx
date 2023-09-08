import { useState } from 'react';
import { Alert, Typography, Container, Box, Button } from '@mui/material';
import UploadComponent from '../components/UploadComponent';
import DataTable from '../components/DataTable';
import UploadCSVUseCase from '../domain/use-cases/UploadCSVUseCase';
import UpdatePricesUseCase from '../domain/use-cases/UpdatePricesUseCase';
import Repository from '../domain/repositories/Repository';
import { DataItem, UpdateItem } from '../interfaces';
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
            const repository = new Repository();
            const useCase = new UploadCSVUseCase(repository);
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
            const repository = new Repository();
            const useCase = new UpdatePricesUseCase(repository);
            const data = await useCase.execute(updateData);

            setMessage(data.message);
            setMessageType('success');
            setMessageOpen(true);
            setApiData([]);
            setFileUploaded(false);

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
                <Typography variant="h5" component="h1" gutterBottom>
                    Atualização de Preços em Massa
                </Typography>
                <Typography variant="subtitle2" component="h2" gutterBottom>
                    Clique em "Validar" para selecionar um arquivo CSV e fazer sua validação.
                </Typography>
                <UploadComponent onFileUpload={handleFileUpload} />
                {hasErrors && (
                    <Alert severity="warning">
                        Corrija os erros abaixo e reenvie seu arquivo
                    </Alert>
                )
                }
                {apiData.length > 0 && <DataTable data={apiData} />}
                {fileUploaded && !hasErrors && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdatePrices}
                        sx={{ m: 2 }}
                    >
                        Atualizar
                    </Button>
                )}

            </Box>
        </Container>
    );
}

export default UploadPage;
