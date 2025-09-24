"use client"
import {useParams} from "next/navigation";
import {useAuth} from "@/contexts/AuthContext";
import {useProfile} from "@/hooks/useProfile";
import ProfileHeader from "@/app/profile/[username]/components/ProfileHeader";
import ProfileStatistics from "@/app/profile/[username]/components/ProfileStatistics";
import ActivityFeed from "@/app/profile/[username]/components/ActivityFeed";
import FavoriteGenres from "@/app/profile/[username]/components/FavoriteGenres";
import ProfileReviews from "@/app/profile/[username]/components/ProfileReviews";
import WatchHistory from "@/app/profile/[username]/components/WatchHistory";
import {useEffect} from "react";

const Profile = () => {
    const params = useParams();
    const username = params.username as string;
    const {user} = useAuth();
    const {userProfile,fetchUserByUsername} = useProfile();

    console.log("Params: ", params);
    console.log("Teste: ", params.username);
    console.log("User Authenticated: ", user);
    console.log("User Profile: ", userProfile);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchUserByUsername(username);
            } catch (error) {
                console.error("Ocorreu um erro ao buscar os dados:", error);
            }
        }
        fetchData();
    }, [fetchUserByUsername])

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-8">
                    <ProfileHeader userProfile={user} onUpdate={() => fetchUserByUsername(username)}/>

                    <ProfileStatistics/>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <ProfileReviews reviews={userProfile?.reviews || []}/>
                            <WatchHistory />
                        </div>

                        <div className="space-y-8">
                            <FavoriteGenres/>
                            <ActivityFeed/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
