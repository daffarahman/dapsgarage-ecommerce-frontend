import axios from 'axios';
import type { Product } from '@/types/product';
import type { Category } from '@/types/category';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const productsApi = {
    getAll: async (): Promise<Product[]> => {
        const response = await api.get<Product[]>('/products');
        return response.data;
    },

    getAllInStock: async (): Promise<Product[]> => {
        const response = await api.get<Product[]>('/products?in_stock=true');
        return response.data;
    },

    getById: async (id: string): Promise<Product> => {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    },

    getNewArrivals: async (): Promise<Product[]> => {
        const response = await api.get<Product[]>('/products?in_stock=true&first=3');
        return response.data;
    },

    getByCategorySlug: async (slug: string, inStockOnly: boolean = false): Promise<Product[]> => {
        const inStockParam = inStockOnly ? '&in_stock=true' : '';
        const response = await api.get<Product[]>(`/products?category=${slug}${inStockParam}`);
        return response.data;
    },
};

export const categoriesApi = {
    getAll: async (): Promise<Category[]> => {
        const response = await api.get<Category[]>('/categories');
        return response.data;
    },

    getBySlug: async (slug: string): Promise<Category> => {
        const response = await api.get<Category>(`/categories/${slug}`);
        return response.data;
    },
};

export default api;

