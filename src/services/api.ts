import axios from 'axios';
import type { Product } from '@/types/product';
import type { Category } from '@/types/category';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Products API
export const productsApi = {
    // Get all products
    getAll: async (): Promise<Product[]> => {
        const response = await api.get<Product[]>('/products');
        return response.data;
    },

    // Get single product by ID
    getById: async (id: string): Promise<Product> => {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    },
};

// Categories API
export const categoriesApi = {
    // Get all categories
    getAll: async (): Promise<Category[]> => {
        const response = await api.get<Category[]>('/categories');
        return response.data;
    },

    // Get single category by slug
    getBySlug: async (slug: string): Promise<Category> => {
        const response = await api.get<Category>(`/categories/${slug}`);
        return response.data;
    },
};

export default api;

