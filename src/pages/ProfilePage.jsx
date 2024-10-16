import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { profileUser } from '../features/authSlice';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { profile, isAuthenticated, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(profileUser()); // Fetch profile if authenticated
        }
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        console.log("Profile Data:", profile); // Check if profile data is being updated
    }, [profile]); // Log profile data whenever it changes

    // Handle loading and error states
    if (loading) {
        return <p>Loading user data...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Profile</h2>
            {profile ? (
                <div className="flex justify-center mx-auto flex-col-reverse align-middle">
                    <p>Email: {profile.email}</p>
                    <p>Name: {profile.name}</p>
                    <p className="m-auto"><img src={profile.avatar} className="w-20"/></p>
                    {/* Display other user details as needed */}
                </div>
            ) : (
                <p>No profile data available.</p>
            )}
        </div>
    );
};

export default ProfilePage;
