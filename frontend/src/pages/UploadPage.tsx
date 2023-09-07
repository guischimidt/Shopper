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

function UploadPage() {
    const [apiData, setApiData] = useState<DataItem[]>([]);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [updateData, setUpdateData] = useState<UpdateItem[]>([]);

    console.log(updateData);

    const handleFileUpload = async (file: File) => {
        try {
            const csvRepository = new CSVRepository();

            const useCase = new UploadCSVUseCase(csvRepository);

            const data = await useCase.execute(file);

            setApiData(data.processedData);
            setFileUploaded(true);

            const updateDataArray = data.processedData.map((item) => ({
                code: item.code,
                new_price: item.new_price,
            }));
            setUpdateData(updateDataArray);
        } catch (error) {
            console.error('Erro ao enviar o arquivo para a API:', error);
        }
    };

    const handleUpdatePrices = async () => {
        try {
            const csvRepository = new CSVRepository();

            const useCase = new UpdatePricesUseCase(csvRepository);

            const data = await useCase.execute(updateData);
            return data;

        } catch (error) {
            console.error('Erro ao enviar o arquivo para a API:', error);
        }
    };

    const hasErrors = apiData.some(item => item.errors.length > 0);

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
