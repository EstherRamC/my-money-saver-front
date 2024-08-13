import { User, UserCredential } from "firebase/auth";
import React from "react";

export type UserObject = {
  id: number; 
  uid: string;
  email: string;
  profilePicture?: string;
};
export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export type AppState = {
  user: User | null;
  setUser: (user: User | null) => void;
  accountType: string;
  setAccountType: (accountType: string) => void;
  tokens: Tokens | undefined;
  setTokens: (accessToken: string, refreshToken: string) => void;
  login: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  loadingContext: boolean;
  userProfile: UserObject | undefined;
  username: string | null;
  setUserProfile: (userProfile: UserObject) => void;
  setUsername: (username: string | null) => void;
  fetchUserProfile: (user: User) => Promise<void>;
};

export type AppContextProps = {
  children: React.ReactNode;
};
