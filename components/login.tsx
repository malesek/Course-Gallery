import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "@firebase/auth";
import { FC, createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";

type Authentication = {
  user: User | null
  login: () => void,
  logout: () => void
}

const AuthContext = createContext<Authentication>({
  user:null, login: () => {}, logout: () => {}
});

const AuthProvider: FC = ({children}) => {

  const [user, setUser] = useState<User | null>(null);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user);
      }
      else setUser(null);
    });
    return unsubscribe;
  }, [])

  const login = async () => {
    try{
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch(error){
      console.error(error);
    }
  }

  const logout = async () => {
    try{
        await signOut(auth);
    } catch(error){
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{
      user, login, logout
    }}>
      { children }
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth}