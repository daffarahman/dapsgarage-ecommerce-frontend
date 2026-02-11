import apiClient from '@/lib/axios';
import type { Product } from '@/types/product';

export const productsApi = {
    getAll: async (): Promise<Product[]> => {
        const response = await apiClient.get<Product[]>('/product');
        return response.data;
    },

    getAllInStock: async (): Promise<Product[]> => {
        const response = await apiClient.get<Product[]>('/product?in_stock=true');
        return response.data;
    },

    getById: async (id: string): Promise<Product> => {
        const response = await apiClient.get<Product>(`/product/${id}`);
        return response.data;
    },

    getNewArrivals: async (): Promise<Product[]> => {
        const response = await apiClient.get<Product[]>('/product?in_stock=true&first=3');
        return response.data;
    },

    getByCategorySlug: async (slug: string, inStockOnly: boolean = false): Promise<Product[]> => {
        const inStockParam = inStockOnly ? '&in_stock=true' : '';
        const response = await apiClient.get<Product[]>(`/product?category=${slug}${inStockParam}`);
        return response.data;
    },
};
