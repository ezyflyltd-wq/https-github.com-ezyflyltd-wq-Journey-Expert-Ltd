import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as fbSignOut,
} from 'firebase/auth';
import { auth, googleProvider, testConnection } from './config';
import { getUserProfile, saveUserProfile } from './firestoreService';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  updateProfileData: (data: Partial<UserProfile>) => Promise<void>;
  isConnected: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    // Ping server connection on startup as mandated by Firebase Integration skill
    testConnection().then((ok) => setIsConnected(ok));

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          let profile = await getUserProfile(currentUser.uid);
          if (!profile) {
            // Initialize default profile
            profile = {
              userId: currentUser.uid,
              email: currentUser.email || 'user@journeyexpert.com',
              displayName: currentUser.displayName || 'Journey Expert Traveler',
              photoURL: currentUser.photoURL || undefined,
              role: currentUser.email === 'ezyflyltd@gmail.com' ? 'admin' : 'customer',
              loyaltyTier: 'VIP JEL CLUB',
              loyaltyPoints: 12500,
              walletBalanceBDT: 150000,
              passportNo: 'A08912345',
              phone: '+880 1711-223344',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            await saveUserProfile(profile);
          }
          setUserProfile(profile);
        } catch (err) {
          console.error('Error fetching user profile from Firestore:', err);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const loggedUser = result.user;
      let profile = await getUserProfile(loggedUser.uid);
      if (!profile) {
        profile = {
          userId: loggedUser.uid,
          email: loggedUser.email || '',
          displayName: loggedUser.displayName || 'Traveler',
          photoURL: loggedUser.photoURL || undefined,
          role: loggedUser.email === 'ezyflyltd@gmail.com' ? 'admin' : 'customer',
          loyaltyTier: 'VIP JEL CLUB',
          loyaltyPoints: 12500,
          walletBalanceBDT: 150000,
          passportNo: 'A08912345',
          phone: '+880 1711-223344',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await saveUserProfile(profile);
      }
      setUserProfile(profile);
    } catch (error) {
      console.error('Google Sign-in failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await fbSignOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  const updateProfileData = async (data: Partial<UserProfile>) => {
    if (!user || !userProfile) return;
    const updated: UserProfile = {
      ...userProfile,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    setUserProfile(updated);
    await saveUserProfile(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signInWithGoogle,
        signOutUser,
        updateProfileData,
        isConnected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
