"use client"
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

// TypeScript type for the user data (you can expand this based on your needs)
type User = {
    role?: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    phoneNumber?: string;
    storeName?: string;
    email?: string
    storeStatus?: string
};

type UserContextType = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Optionally, load user data from localStorage or API when app starts
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Function to update user data
    const updatedUser = (updatedUser: User) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Store in localStorage
    };

    // Clear user data (e.g., for logout)
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, setUser: updatedUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
