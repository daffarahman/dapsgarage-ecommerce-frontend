// Product type definition
export interface Product {
    id: string;
    title: string;
    description: string;
    category_id: string;
    year: number;
    image_url: string;
    price: string; // Decimal string from API
    stock: number;
    discount: string; // Decimal string from API
    created_at: string;
    category_name: string;
    category_slug: string;
}

// Helper functions for price calculations
export const getNumericPrice = (product: Product): number => {
    return parseFloat(product.price);
};

export const getNumericDiscount = (product: Product): number => {
    return parseFloat(product.discount);
};

export const getFinalPrice = (product: Product): number => {
    const price = getNumericPrice(product);
    const discount = getNumericDiscount(product);
    return price - (price * discount / 100);
};

export const hasDiscount = (product: Product): boolean => {
    return getNumericDiscount(product) > 0;
};
