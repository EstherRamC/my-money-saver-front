import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../store/appContext/app-context';
import httpInstance from '../../services/httpInstance';

const MyProfile: React.FC = () => {
  const { userProfile, username, user, setUserProfile, setUsername, fetchUserProfile } = useAppContext();
  const [newUsername, setNewUsername] = useState<string>(username || '');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const [email, setEmail] = useState<string>(userProfile?.email || '');
  const [message, setMessage] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (userProfile) {
      setEmail(userProfile.email);
      setNewUsername(username || '');
      fetchProfilePicture(userProfile.uid);
    }
  }, [userProfile]);

  const fetchProfilePicture = async (uid: string) => {
    try {
      const response = await httpInstance.get(`/user/profile/image/${uid}`);
      setProfilePictureUrl(`data:image/jpeg;base64,${response.data}`);
    } catch (error) {
      console.error("Error fetching profile picture", error);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', newUsername);
    formData.append('uid', user?.uid || '');
    if (profilePicture) {
      formData.append('file', profilePicture);
    }

    try {
      await httpInstance.put('/user/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Profile updated successfully!');
      setIsEditing(false);

      // Fetch the updated profile
      if (user) {
        await fetchUserProfile(user);
      }
    } catch (error) {
      setMessage('Failed to update profile.');
      console.error(error);
    }
  };

  if (!userProfile) {
    return <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="w-2/3 max-w-4xl p-10 bg-white rounded-lg shadow-lg space-y-6">
        <h2 className="text-4xl font-bold text-center text-gray-800">My Profile</h2>
        <div className="flex flex-col items-center">
          {profilePicture && (
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Profile Preview"
              className="w-40 h-40 rounded-full object-cover mb-4"
            />
          )}
          {profilePictureUrl && !profilePicture && (
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover mb-4"
            />
          )}
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700">Username</label>
              <input
                type="text"
                value={newUsername}
                onChange={handleUsernameChange}
                required
                className="w-full px-6 py-3 mt-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-6 py-3 mt-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700">Profile Picture</label>
              <input
                type="file"
                onChange={handleProfilePictureChange}
                className="w-full px-6 py-3 mt-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-400"
            >
              Update Profile
            </button>
          </form>
        ) : (
          <div className="space-y-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <p className="text-lg font-semibold text-gray-700">Username: <span className="text-xl font-bold text-gray-800">{newUsername}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold text-gray-700">Email: <span className="text-xl font-bold text-gray-800">{email}</span></p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full px-6 py-3 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-400"
            >
              Edit Profile
            </button>
          </div>
        )}
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default MyProfile;
