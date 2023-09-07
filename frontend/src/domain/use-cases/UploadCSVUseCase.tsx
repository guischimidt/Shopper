import CSVRepository from "../repositories/CSVRepository";

class UploadCSVUseCase {

    async execute(file: File): Promise<void> {
        try {
            const csvRepository = new CSVRepository();
            // Chame o serviço de API para enviar o arquivo
            await csvRepository.uploadCSVFile(file);


        } catch (error) {
            console.error('Erro ao enviar o arquivo para a API:', error);
            throw error;
        }
    }
}

export default UploadCSVUseCase;