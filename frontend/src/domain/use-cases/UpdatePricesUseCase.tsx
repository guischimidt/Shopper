import CSVRepository from "../repositories/CSVRepository";
import { ApiResponse, UpdateItem } from "../../interfaces/interfaces";

class UpdatePricesUseCase {
    private csvRepository: CSVRepository;

    constructor(csvRepository: CSVRepository) {
        this.csvRepository = csvRepository;
    }

    async execute(data: UpdateItem[]): Promise<ApiResponse> {
        try {
            const response = await this.csvRepository.updatePrices(data);
            return response;
        } catch (error) {
            console.error('Erro ao enviar o arquivo para a API:', error);
            throw error;
        }
    }
}

export default UpdatePricesUseCase;
