import { createContext, useState, useEffect } from "react";

import type { ReactNode } from "react";
import type { CurrentUser } from "../component/type/currentuser";
import type { User } from "../component/type/user";

export interface AuthContextType {
    currentUser: CurrentUser | null;
    login: (user: User) => void;
    logout: () => void;
}

export const AuthContext =
    createContext<AuthContextType | undefined>(undefined);
interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {
     const [currentUser, setCurrentUser] =
        useState<CurrentUser | null>(() => {
            const storedUser =
                localStorage.getItem("currentUser");

            return storedUser
                ? JSON.parse(storedUser)
                : null;
        });

    useEffect(() => {
        const storedUser =
            localStorage.getItem("currentUser");

        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (user: User) => {
        const loggedInUser: CurrentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        setCurrentUser(loggedInUser);

        localStorage.setItem(
            "currentUser",
            JSON.stringify(loggedInUser)
        );
    };

    const logout = () => {
        setCurrentUser(null);

        localStorage.removeItem("currentUser");
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}