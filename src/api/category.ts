import apiClient from '@/lib/axios';
import type { Category } from '@/types/category';

export const categoriesApi = {
    getAll: async (): Promise<Category[]> => {
        const response = await apiClient.get<Category[]>('/category');
        return response.data;
    },

    getBySlug: async (slug: string): Promise<Category> => {
        const response = await apiClient.get<Category>(`/category/${slug}`);
        return response.data;
    },
};
