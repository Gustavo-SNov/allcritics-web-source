import Dashboard from "@/components/features/Dashboard";
import ReviewCarousel from "@/components/features/ReviewCarousel";
import TrendingContent from "@/components/features/TrendingContent";

export default function Home() {


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
             <Dashboard/>
             <ReviewCarousel/>
             <TrendingContent/>
        </div>
    );
}
