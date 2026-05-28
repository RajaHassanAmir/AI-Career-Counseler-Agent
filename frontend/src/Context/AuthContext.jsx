import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if (currentUser) {

        try {
          const snapshot = await get(ref(db, "users/" + currentUser.uid));

          const dbData = snapshot.exists() ? snapshot.val() : null;

          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            role: dbData?.role || "user"
          });

        } catch (error) {
          console.error("Role fetch error:", error);

          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            role: "user"
          });
        }

      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();

  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);