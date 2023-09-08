import apiService from '../../infrastructure/api/ApiService';
import { ApiResponse, UpdateItem } from '../../interfaces';

class Repository {
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

    async updatePrices(data: UpdateItem[]): Promise<ApiResponse> {
        try {

            const response = await apiService.updatePrices(data);

            return response.data;
        } catch (error) {
            console.error('Erro ao enviar o arquivo para a API:', error);
            throw error;
        }
    }
}

export default Repository;
