import { credentials } from "@/static/auth";
import { useAtom } from "jotai/react";
import { userAtom } from "@/atoms/auth";
import type { User } from "@/types/auth";

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);

  const login = (currentUser: User) => {
    if (
      currentUser.username === credentials.username &&
      currentUser.password === credentials.password
    ) {
      setUser({
        ...currentUser,
        id: "1",
        authToken: "active1",
        email: "johndoe@gmail.com",
        fullName: "John Doe",
        username: currentUser.username,
      });

      return { success: true, message: "Login successful" };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout, setUser };
};
