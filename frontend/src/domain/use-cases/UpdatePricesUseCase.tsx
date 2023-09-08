import Repository from "../repositories/Repository";
import { ApiResponse, UpdateItem } from "../../interfaces/interfaces";

class UpdatePricesUseCase {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async execute(data: UpdateItem[]): Promise<ApiResponse> {
        try {
            const response = await this.repository.updatePrices(data);
            return response;
        } catch (error) {
            console.error('Erro ao atualizar os preços:', error);
            throw error;
        }
    }
}

export default UpdatePricesUseCase;
