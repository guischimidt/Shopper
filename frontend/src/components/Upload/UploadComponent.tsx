import { useState, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface UploadComponentProps {
    onFileUpload: (file: File) => void;
}

function UploadComponent({ onFileUpload }: UploadComponentProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
        if (file) {
            onFileUpload(file);
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
                </div>
            )}
        </div>
    );
}

export default UploadComponent;
