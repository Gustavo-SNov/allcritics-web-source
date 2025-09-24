import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Heart, MessageCircle, UserPlus } from "lucide-react"

const ActivityFeed = () => {
    const activities = [
        {
            id: 1,
            type: "review",
            icon: Star,
            iconColor: "text-yellow-400",
            message: "You reviewed Oppenheimer",
            time: "2 hours ago"
        },
        {
            id: 2,
            type: "like",
            icon: Heart,
            iconColor: "text-red-400",
            message: "Mike Chen liked your review of The Batman",
            time: "5 hours ago",
            user: {
                name: "Mike Chen",
                avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1"
            }
        },
        {
            id: 3,
            type: "comment",
            icon: MessageCircle,
            iconColor: "text-blue-400",
            message: "Emma Rodriguez commented on your review",
            time: "1 day ago",
            user: {
                name: "Emma Rodriguez",
                avatar: "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1"
            }
        },
        {
            id: 4,
            type: "follow",
            icon: UserPlus,
            iconColor: "text-green-400",
            message: "Alex Thompson started following you",
            time: "2 days ago",
            user: {
                name: "Alex Thompson"
            }
        },
        {
            id: 5,
            type: "review",
            icon: Star,
            iconColor: "text-yellow-400",
            message: "You reviewed House of the Dragon",
            time: "1 week ago"
        }
    ]

    return (
        <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
                <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                            <div className={`w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0`}>
                                <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                    {activity.user && (
                                        <Avatar className="w-5 h-5">
                                            <AvatarImage src={activity.user.avatar} />
                                            <AvatarFallback className="bg-purple-600 text-white text-xs">
                                                {activity.user.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <p className="text-gray-300 text-sm">{activity.message}</p>
                                </div>
                                <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default ActivityFeed;