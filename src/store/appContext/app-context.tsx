import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AppContextProps, AppState, Tokens, UserObject } from "./types";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import httpInstance from "../../services/httpInstance";

const AppContext = createContext<AppState | undefined>(undefined);

export const AppContextProvider = ({ children }: AppContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingContext, setLoadingContext] = useState<boolean>(true);
  const [accountType, setAccountType] = useState<string>("");
  const [tokens, setTokens] = useState<Tokens | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<UserObject | undefined>(undefined);
  const [username, setUsername] = useState<string | null>(null);

  const setTokensState = (accessToken: string, refreshToken: string) => {
    setTokens({ access_token: accessToken, refresh_token: refreshToken });
  };

  const signUp = (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
    setAccountType("");
    setTokens(undefined);
    setUserProfile(undefined);
    setUsername(null);
  };

  const fetchUserProfile = async (user: User) => {
    try {
      const token = await user.getIdToken();
      const response = await httpInstance.get("/user/getUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserProfile(response.data);
      setUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserProfile(currentUser);
      }
      setLoadingContext(false);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        accountType,
        setAccountType,
        tokens,
        setTokens: setTokensState,
        login,
        signUp,
        logOut,
        loadingContext,
        userProfile,
        username,
        setUserProfile,
        setUsername,
        fetchUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
