import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/config";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [users, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      console.log(user, "user");
      if (user) {
        setIsLoading(true);
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        setIsLoading(false);
        history.push("/");
        return;
      }
      setUser({});
      history.push("/login");
    });

    //clean function
    return () => {
      unsubscibed();
    };
  }, [history]);

  return (
    <AuthContext.Provider value={{ users }}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
}
