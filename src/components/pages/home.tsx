import { NewArrivals } from "@/components/new-arrivals";
import homeBanner from "@/assets/img/home-banner.png";
import secondBanner from "@/assets/img/second-banner.png";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <div>
            <Link to="/deals">
                <div className="w-full">
                    <img
                        src={homeBanner}
                        alt="Home Banner"
                        className="w-full h-auto object-cover border-b-2"
                    />
                </div>
            </Link>
            <NewArrivals />
            <Link to="/deals">
                <div className="w-full">
                    <img
                        src={secondBanner}
                        alt="Second Banner"
                        className="w-full h-auto object-cover border-b-2 border-t-2"
                    />
                </div>
            </Link>

            {/* Call to Action Section */}
            <section className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
                        Discover Your Next Favorite
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Browse our complete collection of gaming products, collectibles, and exclusive items.
                        Find exactly what you're looking for.
                    </p>
                    <div className="pt-4">
                        <Button
                            asChild
                            size="lg"
                            className="text-base md:text-lg px-8 py-6 font-semibold"
                        >
                            <Link to="/collections/shop-all">
                                Shop All Products
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}