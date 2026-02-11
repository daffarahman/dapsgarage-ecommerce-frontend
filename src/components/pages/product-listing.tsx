import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Product } from "@/types/product";
import type { Category } from "@/types/category";
import { ProductCard } from "../product-card";
import { productsApi } from "@/api/product";
import { categoriesApi } from "@/api/category";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import SectionHeader from "../section-header";

export default function ProductListing() {
    const { slug } = useParams<{ slug: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showOutOfStock, setShowOutOfStock] = useState(false);

    const isShopAll = slug === 'shop-all';
    const categorySlug = isShopAll ? null : slug;

    const pageTitle = isShopAll ? "Shop All" : (category?.name || "Products");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                if (categorySlug) {
                    try {
                        const categoryData = await categoriesApi.getBySlug(categorySlug);
                        setCategory(categoryData);
                    } catch (err) {
                        console.error("Failed to fetch category:", err);
                    }
                }

                let data: Product[];
                if (categorySlug) {
                    data = await productsApi.getByCategorySlug(categorySlug, !showOutOfStock);
                } else {
                    data = showOutOfStock
                        ? await productsApi.getAll()
                        : await productsApi.getAllInStock();
                }

                setProducts(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categorySlug, showOutOfStock]);

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col gap-4 mb-8">
                <SectionHeader title={pageTitle} />

                {!(!loading && !error && products.length === 0) && (
                    <div className="flex flex-col items-center gap-3">
                        <label
                            htmlFor="show-out-of-stock"
                            className="text-sm font-medium cursor-pointer"
                        >
                            Show out of stock products
                        </label>
                        <Switch
                            id="show-out-of-stock"
                            checked={showOutOfStock}
                            onCheckedChange={setShowOutOfStock}
                        />
                    </div>
                )}
            </div>

            {loading && (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <Skeleton className="w-full aspect-square rounded-lg" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-6 w-1/3" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <div className="text-center py-12">
                    <p className="text-destructive">{error}</p>
                </div>
            )}

            {!loading && !error && products.length === 0 && (
                <div className="text-center py-12 w-full">
                    <p className="text-muted-foreground">No products found.</p>
                </div>
            )}

            {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
