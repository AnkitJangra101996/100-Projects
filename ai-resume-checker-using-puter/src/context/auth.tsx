/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import puter from "@heyputer/puter.js";
import { createContext, useEffect, useState, type ReactNode } from "react";
import type { UserDataType } from "../types/user";

type AuthContextType = {
  user: UserDataType;
  isAuthenticated: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  deducteCredit: (resumeId: string) => Promise<void>;
  deleteResume: (id: string) => Promise<void>;
  flushData: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDataType | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const currentUser = await puter.auth.getUser();

      const storedUser = await puter.kv.get(`user-${currentUser.uuid}`) as UserDataType | null;

      if (storedUser) {
        const userObj: UserDataType = {
          username: currentUser.username,
          uuid: currentUser.uuid,
          credits: storedUser.credits,
          resumeIds: storedUser.resumeIds
        };
        setUser(userObj);
        return;
      }

      const newUserObj = {
        credits: 5,
        resumeIds: [],
        username: currentUser.username,
        uuid: currentUser.uuid
      };

      const res = await puter.kv.set(`user-${currentUser.uuid}`, newUserObj);

      if (!res) {
        throw new Error('Error in storing new user...')
      }
      setUser(newUserObj);

    } catch (error) {
      console.error(error);

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('auth re-render');
    checkAuth();
  }, []);

  const login = async () => {
    await puter.auth.signIn();

    await checkAuth();
  };

  const logout = async () => {
    puter.auth.signOut();

    setUser(null);
  };

  const deducteCredit = async (resumeId: string) => {
    const updatedResumeIds = [...user.resumeIds, resumeId];
    const newObj = {
      ...user,
      credits: user.credits - 1,
      resumeIds: updatedResumeIds
    }

    await puter.kv.update(`user-${user.uuid}`, newObj);

    setUser(newObj);
  }

  const deleteResume = async (id: string) => {
    const updatedResumeIds = user.resumeIds.filter(
      (resumeId) => resumeId !== id
    );

    const updatedUser = {
      ...user,
      resumeIds: updatedResumeIds,
    };

    await puter.kv.del(id);

    await puter.kv.update(`user-${user.uuid}`, updatedUser);
    console.log('delete resume');
    console.log(updatedUser)
    setUser(updatedUser);
  };

  const flushData = async () => {

    await puter.kv.flush()

    const newUserObj = {
      credits: 5,
      resumeIds: [],
      ...user
    }

    setUser(newUserObj)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        deducteCredit,
        deleteResume,
        flushData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
