import axios, { AxiosResponse } from 'axios';

class ApiService {
    async uploadCSVFile(formData: FormData): Promise<AxiosResponse<any>> {
        try {
            const response = await axios.post('http://localhost:3000/api/upload-csv', formData, {
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
}

const apiService = new ApiService();
export default apiService;
