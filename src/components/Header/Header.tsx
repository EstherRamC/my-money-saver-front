import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import { IoIosMenu } from "react-icons/io";
import { Button } from "../Button";
import { useAppContext } from "../../store/appContext/app-context";
import { useEffect, useState } from "react";
import httpInstance from "../../services/httpInstance";
import logo from "../../assets/logo.png"; // Importa la imagen del logo


interface HeaderProps {
  toggleSidebar: () => void;
  variant?: number;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { username, userProfile } = useAppContext();
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);

  const fetchProfilePicture = async (uid: string) => {
    try {
      const response = await httpInstance.get(`/user/profile/image/${uid}`);
      setProfilePictureUrl(`data:image/jpeg;base64,${response.data}`);
    } catch (error) {
      console.error("Error fetching profile picture", error);
    }
  };

  useEffect(() => {
    if (userProfile) {
      fetchProfilePicture(userProfile.uid);
    }
  }, [userProfile]);

  return (
    <nav className="flex items-center justify-between fixed top-0 w-full h-20 z-10 bg-gradient-to-b from-black to-gray-800 p-4 shadow-lg">
      <div className="flex items-center">
        <Button
          baseColor="transparent"
          onClick={toggleSidebar}
          icon={<IoIosMenu size={30} color="white" />}
        />
        <Link to="/" className="ml-4 pl-5">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-24 h-24 mr-6" />
            <h1 className="ml-4 tracking-widest font-roboto text-2xl text-white hover:text-gray-300 transition duration-300">
              My Money Saver
            </h1>
          </div>
        </Link>
      </div>
      <ul className="flex items-center space-x-6 pr-5">
        {profilePictureUrl && (
          <li className="flex items-center">
            <Link to={ROUTES.MY_PROFILE} className="flex items-center font-semibold tracking-widest font-roboto text-lg text-white hover:text-gray-300 transition duration-300 mr-6">
              {username}
              <img
                src={profilePictureUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md hover:shadow-lg transition duration-300 ml-4"
              />
            </Link>
          </li>
        )}
        {!profilePictureUrl && (
          <li className="font-semibold tracking-widest font-roboto text-lg text-white hover:text-gray-300 transition duration-300">
            <Link to={ROUTES.MY_PROFILE}>{username}</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
