import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/product";
import { getNumericPrice, getNumericDiscount, getFinalPrice, hasDiscount } from "@/types/product";
import { Link } from "react-router";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const originalPrice = getNumericPrice(product);
    const discountedPrice = getFinalPrice(product);
    const discount = getNumericDiscount(product);

    const isOutOfStock = product.stock === 0;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price).replace('IDR', 'Rp');
    };

    return (
        <Link to={`/collections/product/${product.id}`}>
            <Card className="group cursor-pointer border-0 shadow-none bg-transparent overflow-hidden">
                <CardContent className="p-0">
                    <div className="w-full aspect-[4/5] overflow-hidden bg-muted mb-6 rounded-lg relative">
                        <img
                            src={product.image_url}
                            alt={product.title}
                            className={`w-full h-full object-cover transition-transform duration-500 ${isOutOfStock ? 'opacity-50' : 'group-hover:scale-105'
                                }`}
                        />
                        {isOutOfStock && (
                            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                <Badge variant="outline" className="bg-muted text-muted-foreground border-none px-4 py-2 text-sm font-bold uppercase pointer-events-none">
                                    Out of Stock
                                </Badge>
                            </div>
                        )}
                        {hasDiscount(product) && !isOutOfStock && (
                            <Badge variant="destructive" className="absolute top-3 right-3 px-2.5 py-1 text-xs font-bold pointer-events-none">
                                -{discount}%
                            </Badge>
                        )}
                    </div>
                </CardContent>
                <CardHeader className="p-0 flex flex-col items-center text-center space-y-1">
                    <CardTitle className="text-sm font-medium uppercase tracking-tight leading-tight max-w-[200px]">
                        {product.title}
                    </CardTitle>
                    <div className="flex max-sm:flex-col items-center gap-2 mt-2">
                        {hasDiscount(product) ? (
                            <>
                                <p className={`text-base font-bold ${isOutOfStock ? 'text-muted-foreground' : 'text-destructive'}`}>
                                    {formatPrice(discountedPrice)}
                                </p>
                                <p className="text-sm text-muted-foreground line-through">
                                    {formatPrice(originalPrice)}
                                </p>
                            </>
                        ) : (
                            <p className={`text-base font-semibold ${isOutOfStock ? 'text-muted-foreground' : ''}`}>
                                {formatPrice(originalPrice)}
                            </p>
                        )}
                    </div>
                </CardHeader>
            </Card>
        </Link>
    );
}
