import apiService from '../../infrastructure/api/ApiService';

class CSVRepository {

    async uploadCSVFile(file: File): Promise<void> {
        try {
            const formData = new FormData();
            formData.append('csvFile', file);

            // Chame o serviço de API para enviar o arquivo
            await apiService.uploadCSVFile(formData);


        } catch (error) {
            console.error('Erro ao enviar o arquivo para a API:', error);
            throw error;
        }
    }
}

export default CSVRepository;