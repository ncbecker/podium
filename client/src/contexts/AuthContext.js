import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { getCurrentUserProfile, logoutUser } from "../utils/api";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const history = useHistory();

  const login = async () => {
    if (user) {
      return;
    }
    const userProfile = await getCurrentUserProfile();
    setUser(userProfile);
  };

  const logout = async () => {
    setUser();
    await logoutUser();
    history.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function useAuth() {
  return useContext(AuthContext);
}

export function useUser() {
  return useAuth().user;
}
