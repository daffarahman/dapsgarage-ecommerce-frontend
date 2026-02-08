import { NewArrivals } from "@/components/new_arrivals";
import homeBanner from "@/assets/img/home-banner.png";

export default function Home() {
    return (
        <div>
            <div className="w-full">
                <img
                    src={homeBanner}
                    alt="Home Banner"
                    className="w-full h-auto object-cover border-b"
                />
            </div>
            <NewArrivals />
        </div>
    )
}