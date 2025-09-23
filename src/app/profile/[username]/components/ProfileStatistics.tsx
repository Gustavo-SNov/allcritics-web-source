import {Card} from "@/components/ui/card";
import { Star, Eye, Heart, MessageCircle, TrendingUp, Award } from "lucide-react"

const ProfileStatistics = () => {
    const stats = [
        {
            label: "Reviews Written",
            value: "127",
            icon: MessageCircle,
            color: "text-blue-400",
            bgColor: "bg-blue-400/10"
        },
        {
            label: "Content Watched",
            value: "342",
            icon: Eye,
            color: "text-green-400",
            bgColor: "bg-green-400/10"
        },
        {
            label: "Average Rating",
            value: "4.2",
            icon: Star,
            color: "text-yellow-400",
            bgColor: "bg-yellow-400/10"
        },
        {
            label: "Likes Received",
            value: "1.2K",
            icon: Heart,
            color: "text-red-400",
            bgColor: "bg-red-400/10"
        },
        {
            label: "Followers",
            value: "856",
            icon: TrendingUp,
            color: "text-purple-400",
            bgColor: "bg-purple-400/10"
        },
        {
            label: "Achievements",
            value: "12",
            icon: Award,
            color: "text-orange-400",
            bgColor: "bg-orange-400/10"
        }
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat) => (
                <Card key={stat.label} className="bg-gray-800/50 border-gray-700 p-4 text-center hover:bg-gray-800/70 transition-colors">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                </Card>
            ))}
        </div>
    )
}


export default ProfileStatistics;