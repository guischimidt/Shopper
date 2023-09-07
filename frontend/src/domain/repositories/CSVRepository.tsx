import apiService from '../../infrastructure/api/ApiService';
import { ApiResponse } from '../../interfaces/interfaces';

class CSVRepository {
    async uploadCSVFile(file: File): Promise<ApiResponse> {
        try {
            const formData = new FormData();
            formData.append('csvFile', file);

            const response = await apiService.uploadCSVFile(formData);

            const apiResponse: ApiResponse = {
                message: response.data.message,
                processedData: response.data.processedData,
            };

            return apiResponse;
        } catch (error) {
            console.error('Erro ao enviar o arquivo para a API:', error);
            throw error;
        }
    }
}

export default CSVRepository;
