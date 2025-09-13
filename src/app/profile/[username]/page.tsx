"use client"
import {useParams} from "next/navigation";

const Profile = () => {
    const params = useParams();
    console.log("Params: ",params);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-8">

              </div>
            </div>
        </div>

    );
}

export default Profile;
