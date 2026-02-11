import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { productsApi } from "@/api/product";
import type { Product } from "@/types/product";
import SectionHeader from "./section-header";
import { Skeleton } from "@/components/ui/skeleton";

export function NewArrivals() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const data = await productsApi.getNewArrivals();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching new arrivals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewArrivals();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <SectionHeader title="New Arrivals" />
                <div className="grid grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col">
                            <Skeleton className="w-full aspect-[4/5] rounded-lg mb-6" />
                            <Skeleton className="h-4 w-3/4 mx-auto mb-2" />
                            <Skeleton className="h-4 w-1/2 mx-auto" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <SectionHeader title="New Arrivals" />
            <div className="grid grid-cols-3 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
