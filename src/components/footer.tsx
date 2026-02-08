import { Link } from "react-router";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-serif font-semibold tracking-tight">
                            Dap's Garage
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Your trusted destination for premium gaming products and collectibles.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-9 w-9 rounded-md border border-border flex items-center justify-center transition-colors hover:bg-accent hover:text-accent-foreground"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a
                                href="https://instagram.com/dapsgaragesoc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-9 w-9 rounded-md border border-border flex items-center justify-center transition-colors hover:bg-accent hover:text-accent-foreground"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-9 w-9 rounded-md border border-border flex items-center justify-center transition-colors hover:bg-accent hover:text-accent-foreground"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-9 w-9 rounded-md border border-border flex items-center justify-center transition-colors hover:bg-accent hover:text-accent-foreground"
                                aria-label="YouTube"
                            >
                                <Youtube className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link
                                    to="/collections/shop-all"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Shop All
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/deals"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Deals
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider">
                            Customer Service
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shipping"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faq"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/track-order"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Track Order
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider">
                            Stay Updated
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Subscribe to get special offers and updates.
                        </p>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full h-10 pl-10 pr-3 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                                />
                            </div>
                            <button className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} Dap's Garage. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link
                            to="/privacy"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/terms"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
