"use client"

import {User} from "@/types/User";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Calendar, Edit, MapPin, Settings, Share2} from "lucide-react";
import {useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {formatDistanceToNow} from "date-fns";
import {ptBR} from "date-fns/locale";
import {Badge} from "@/components/ui/badge";

interface ProfileHeaderProps {
    userProfile: User | null;

}

const ProfileHeader = ({userProfile}: ProfileHeaderProps) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const badges: string[] = ["Top Critic", "Early Adopter", "Movie Buff"];
    const joinDate = new Date(userProfile?.createDate || Date.now());

    const formattedRelativeDate: string = formatDistanceToNow(joinDate, {
        addSuffix: true, // Adiciona o prefixo/sufixo ("há" ou "em")
        locale: ptBR,    // Usa o locale para traduzir para português
    });

    return (
        <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-purple-600 to-blue-600 relative"
                 style={{
                     backgroundImage: `url(${userProfile?.coverImgUrl})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center'
                 }}
            >
                <div className="absolute inset-0 bg-black/40"/>
                <div className="absolute top-4 right-4 flex space-x-2">
                    <Button size="sm" variant="outline"
                            className="bg-black/50 border-gray-600 text-white hover:bg-black/70">
                        <Share2 className="w-4 h-4 mr-2"/>
                        Share
                    </Button>
                    <Button size="sm" variant="outline"
                            className="bg-black/50 border-gray-600 text-white hover:bg-black/70">
                        <Settings className="w-4 h-4 mr-2"/>
                        Settings
                    </Button>
                </div>
            </div>
            {/* Profile Info */}
            <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20 md:-mt-16">
                    <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
                        {/* Avatar */}
                        <Avatar className="w-32 h-32 border-4 border-gray-800 shadow-xl">
                            <AvatarImage src={userProfile?.profileImgUrl}/>
                            <AvatarFallback className="bg-purple-600 text-white text-2xl">
                                SJ
                            </AvatarFallback>
                        </Avatar>

                        {/* User Info */}
                        <div className="space-y-2">
                            <div>
                                <h1 className="text-3xl font-bold text-white">{userProfile?.accountName}</h1>
                                <p className="text-purple-400 text-lg">{userProfile?.username}</p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {badges.map((badge) => (
                                    <Badge key={badge} variant="secondary"
                                           className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                                        {badge}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex items-center space-x-4 text-gray-400 text-sm">
                                <div className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4"/>
                                    <span>{userProfile?.email}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Calendar className="w-4 h-4"/>
                                    <span>Joined {formattedRelativeDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-4 md:mt-0">
                        <Button
                            variant="outline"
                            onClick={() => setIsFollowing(!isFollowing)}
                            className={`${
                                isFollowing
                                    ? "bg-purple-600 border-purple-600 text-white hover:bg-purple-700"
                                    : "border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                            }`}
                        >
                            {isFollowing ? "Following" : "Follow"}
                        </Button>
                        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                            <Edit className="w-4 h-4 mr-2"/>
                            Edit Profile
                        </Button>
                    </div>
                </div>

                {/* Bio */}
                <div className="mt-6">
                    <p className="text-gray-300 leading-relaxed max-w-2xl">{userProfile?.biography}</p>
                </div>
            </div>


        </Card>
    )
}

export default ProfileHeader;

