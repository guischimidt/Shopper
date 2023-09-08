import Repository from "../repositories/Repository";
import { ApiResponse } from "../../interfaces";

class UploadCSVUseCase {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async execute(file: File): Promise<ApiResponse> {
        try {
            const response = await this.repository.uploadCSVFile(file);
            return response;
        } catch (error) {
            console.error('Erro ao enviar o arquivo para a API:', error);
            throw error;
        }
    }
}

export default UploadCSVUseCase;
