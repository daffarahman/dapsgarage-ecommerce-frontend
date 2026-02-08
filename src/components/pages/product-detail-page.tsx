import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import type { Product } from '@/types/product';
import { productsApi } from '@/services/api';
import ProductDetail from './product-detail';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setError('No product ID provided');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const data = await productsApi.getById(id);
                setProduct(data);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to load product. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = (productId: string, quantity: number) => {
        console.log(`Adding ${quantity} of product ${productId} to cart`);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-[1200px]">
                <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 gap-8 md:gap-12">
                    <Skeleton className="w-full h-[400px] rounded-lg" />

                    <div className="flex flex-col gap-6">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-12 w-48" />
                        <Skeleton className="h-px w-full" />
                        <Skeleton className="h-8 w-40" />
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-2xl mx-auto">
                    <CardContent className="p-8 text-center">
                        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
                        <p className="text-muted-foreground mb-6">
                            {error || 'The product you are looking for does not exist.'}
                        </p>
                        <Button
                            onClick={() => navigate('/collections/shop-all')}
                            variant="outline"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Shop
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return <ProductDetail product={product} onAddToCart={handleAddToCart} />;
}
