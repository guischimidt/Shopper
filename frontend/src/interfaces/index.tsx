export interface DataItem {
    code: number;
    name: string;
    sales_price: string;
    new_price: string;
    errors: string[];
}

export interface UpdateItem {
    code: number;
    new_price: string;
}

export interface ApiResponse {
    message: string;
    processedData: DataItem[];
}
