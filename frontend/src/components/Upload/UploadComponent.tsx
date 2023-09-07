import { useState, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadCSVUseCase from '../../domain/use-cases/UploadCSVUseCase';

interface UploadComponentProps {
    uploadCSVUseCase: UploadCSVUseCase;
}

function UploadComponent(props: UploadComponentProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const handleUploadClick = async () => {
        if (selectedFile) {
            try {
                await props.uploadCSVUseCase.execute(selectedFile);

                setSelectedFile(null);

                console.log('Arquivo enviado com sucesso!');
            } catch (error) {
                console.error('Erro ao enviar o arquivo para a API:', error);
            }
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="csv-upload-input"
            />
            <label htmlFor="csv-upload-input">
                <Button
                    variant="contained"
                    component="span"
                    sx={{ m: 2, '@media (max-width: 600px)': { m: 1 } }}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload CSV
                </Button>
            </label>
            {selectedFile && (
                <div>
                    <p>Arquivo selecionado: {selectedFile.name}</p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUploadClick}
                    >
                        Enviar
                    </Button>
                </div>
            )}
        </div>
    );
}

export default UploadComponent;
