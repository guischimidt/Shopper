import { useEffect, useState, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface UploadComponentProps {
    onFileUpload: (file: File) => void;
}

function UploadComponent({ onFileUpload }: UploadComponentProps) {
    const [fileUpload, setFileUpload] = useState<File | null>(null);
    const [inputKey, setInputKey] = useState(Date.now());

    useEffect(() => {
        if (fileUpload) {
            onFileUpload(fileUpload);
            setFileUpload(null);
            setInputKey(Date.now());
        }
    }, [fileUpload]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        file ? setFileUpload(file) : "";
    };

    return (
        <div>
            <input
                key={inputKey}
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
        </div>
    );
}

export default UploadComponent;
