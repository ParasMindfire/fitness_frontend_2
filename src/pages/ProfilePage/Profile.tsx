import { useEffect, useState } from 'react';
import { getSingleUSer } from '../../services/UserAPI';
import { User } from '../../interfaces/UserInterface';
import { WorkoutDurationStats } from '../StatsPages/WorkoutDurationStat';
import { WorkoutCaloriesStats } from '../StatsPages/WorkoutCalorieStat';
import { uploadUserPhoto } from '../../services/WorkoutAPI';

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const data = await uploadUserPhoto(file,user!.email);
      console.log('Photo uploaded successfully:', data);

      // Update user profile with new photo URL
      setUser((prevUser) => prevUser ? { ...prevUser, profile_pic: data.profilePic } : null);
      console.log("User after profile pic",user);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };
  

  const fetchUser = async () => {
    const incomeingUser = await getSingleUSer();
    try {
      setUser(incomeingUser);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <div className="p-4 space-y-4 bg-gray-100 min-h-screen">
      {/* Upper Section */}
      <div className="flex flex-col md:flex-row border rounded-2xl shadow-lg p-4 h-[35vh] space-y-4 md:space-y-0">
        {/* Left Side - Photo Upload (20%) */}
        <div className="flex justify-center items-center w-full md:w-1/6 p-4">
            <label htmlFor="photo-upload" className="cursor-pointer relative">
                {user?.profile_pic ? (
            <img
            src={`/uploads/${user?.profile_pic}`}
            alt="Static Test"
            className="w-32 h-32 rounded-full object-cover border-2"
          />
              
                ) : (
                <div className="w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center hover:bg-gray-100">
                    <span className="text-sm text-gray-500">Upload Photo</span>
                </div>
                )}
                <input
                id="photo-upload"
                type="file"
                className="hidden"
                onChange={handlePhotoUpload}
                />
            </label>
        </div>


        {/* Middle Section - User Details (40%) */}
        <div className="w-full md:w-2/6 pt-20 pl-5">
          <h2 className="text-xl font-bold mb-2">User Details</h2>
          <div className="space-y-1">
            <p><strong>Name:</strong> {user?.name || 'Loading...'}</p>
            <p><strong>Email:</strong> {user?.email || 'Loading...'}</p>
            <p><strong>Phone:</strong> {user?.phone || 'Loading...'}</p>
            <p><strong>Address:</strong> {user?.address || 'Loading...'}</p>
          </div>
        </div>

        {/* Right Section - Additional Info (40%) */}
        <div className="w-full md:w-3/6 p-4 border-l border-gray-300">
          <h2 className="text-xl font-bold mb-2">Additional Info</h2>
          <div className="space-y-1">
            <p><strong>Membership:</strong> Premium</p>
            <p><strong>Joined:</strong> Jan 2023</p>
            <p><strong>Goals:</strong> Weight Loss, Strength</p>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="flex flex-col md:flex-row border rounded-2xl shadow-lg p-4">
        {/* Left Side - Workout Duration Stats */}
        <div className="w-full md:w-1/2 p-4 border-r border-gray-300 overflow-auto">
          <WorkoutDurationStats />
        </div>

        {/* Right Side - Workout Calories Stats */}
        <div className="w-full md:w-1/2 p-4 overflow-auto">
          <WorkoutCaloriesStats />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
