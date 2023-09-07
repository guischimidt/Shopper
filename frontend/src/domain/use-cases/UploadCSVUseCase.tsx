import CSVRepository from "../repositories/CSVRepository";
import { ApiResponse } from "../../interfaces/interfaces";

class UploadCSVUseCase {
    private csvRepository: CSVRepository;

    constructor(csvRepository: CSVRepository) {
        this.csvRepository = csvRepository;
    }

    async execute(file: File): Promise<ApiResponse> {
        try {
            const response = await this.csvRepository.uploadCSVFile(file);
            return response;
        } catch (error) {
            console.error('Erro ao enviar o arquivo para a API:', error);
            throw error;
        }
    }
}

export default UploadCSVUseCase;
