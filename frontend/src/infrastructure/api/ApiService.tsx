import axios, { AxiosResponse } from 'axios';
import { UpdateItem } from '../../interfaces';

const API_BASE_URL = import.meta.env.VITE_API_URL;

class ApiService {
    async uploadCSVFile(formData: FormData): Promise<AxiosResponse<any>> {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/upload-csv`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response;
        } catch (error) {
            console.error('Erro ao enviar o arquivo para a API:', error);
            throw error;
        }
    }

    async updatePrices(data: UpdateItem[]): Promise<any> {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/update-prices`, data);
            return response;
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error);
            throw error;
        }
    }
}

const apiService = new ApiService();
export default apiService;
