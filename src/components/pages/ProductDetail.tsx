import { useState } from 'react';
import type { Product } from '@/types/product';
import { getFinalPrice, hasDiscount, getNumericPrice, getNumericDiscount } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface ProductDetailProps {
    product: Product;
    onAddToCart?: (productId: string, quantity: number) => void;
}

export default function ProductDetail({ product, onAddToCart }: ProductDetailProps) {
    const [quantity, setQuantity] = useState(1);
    const finalPrice = getFinalPrice(product);
    const hasProductDiscount = hasDiscount(product);
    const originalPrice = getNumericPrice(product);
    const discountPercent = getNumericDiscount(product);

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => {
            const newValue = prev + delta;
            if (newValue < 1) return 1;
            if (newValue > product.stock) return product.stock;
            return newValue;
        });
    };

    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(product.id, quantity);
        }
    };

    const isOutOfStock = product.stock === 0;

    return (
        <div className="container mx-auto px-4 py-8 max-w-[1200px]">
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 gap-8 md:gap-12">
                <div className="w-full h-full">
                    <Card className="overflow-hidden h-full">
                        <CardContent className="p-0 h-full">
                            <div className="relative w-full h-[400px]">
                                <img
                                    src={product.image_url}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                                {hasProductDiscount && (
                                    <Badge
                                        variant="destructive"
                                        className="absolute top-4 right-4"
                                    >
                                        -{discountPercent}%
                                    </Badge>
                                )}
                                {isOutOfStock && (
                                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                        <Badge variant="secondary" className="text-lg px-6 py-2">
                                            Out of Stock
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col gap-6">
                    <div>
                        <Badge variant="outline">{product.category_name}</Badge>
                    </div>

                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                        {product.title}
                    </h1>

                    <p className="text-muted-foreground text-lg">
                        Year: {product.year}
                    </p>

                    <div className="flex flex-col gap-2">
                        {hasProductDiscount ? (
                            <>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-bold">
                                        Rp {finalPrice.toLocaleString('id-ID')}
                                    </span>
                                    <span className="text-xl text-muted-foreground line-through">
                                        Rp {originalPrice.toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Save Rp {(originalPrice - finalPrice).toLocaleString('id-ID')} ({discountPercent}% off)
                                </p>
                            </>
                        ) : (
                            <span className="text-4xl font-bold">
                                Rp {originalPrice.toLocaleString('id-ID')}
                            </span>
                        )}
                    </div>

                    <Separator />

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Stock:</span>
                        <Badge variant={isOutOfStock ? "secondary" : "default"}>
                            {product.stock} {product.stock === 1 ? 'unit' : 'units'} available
                        </Badge>
                    </div>

                    {!isOutOfStock && (
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium">Quantity</label>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-16 text-center text-lg font-semibold">
                                    {quantity}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleQuantityChange(1)}
                                    disabled={quantity >= product.stock}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    <Button
                        size="lg"
                        className="w-full"
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </Button>

                    {!isOutOfStock && (
                        <div className="bg-muted rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Total:</span>
                                <span className="text-2xl font-bold">
                                    Rp {(finalPrice * quantity).toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-12">
                <Separator className="mb-6" />
                <div className="max-w-4xl">
                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
}