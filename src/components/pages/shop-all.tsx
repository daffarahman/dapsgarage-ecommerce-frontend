import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "../product-card";
import { productsApi } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import SectionHeader from "../section-header";

export default function ShopAll() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showOutOfStock, setShowOutOfStock] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = showOutOfStock
                    ? await productsApi.getAll()
                    : await productsApi.getAllInStock();
                setProducts(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [showOutOfStock]);

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col gap-4 mb-8">
                <SectionHeader title="Shop All" />

                <div className="flex flex-col items-center gap-3">
                    <label
                        htmlFor="show-out-of-stock"
                        className="text-sm font-medium cursor-pointer"
                    >
                        Show out of stock
                    </label>
                    <Switch
                        id="show-out-of-stock"
                        checked={showOutOfStock}
                        onCheckedChange={setShowOutOfStock}
                    />
                </div>
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
                <div className="text-center py-12">
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
