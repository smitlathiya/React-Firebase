import React, { useContext, useState, useEffect } from "react";
import { storage, db } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  sendPasswordResetEmail,
  updateProfile,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const userCollectionref = collection(db, "user");

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [profileInfo, setProfileInfo] = useState([]);
  const auth = getAuth();

  const signup = (email, password, name, office) => {
    const user = createUserWithEmailAndPassword(auth, email, password).then(
      (user) => {
        if (user) {
          addDoc(userCollectionref, {
            uid: user.user.uid,
            name: name,
            office: office,
            email: user.user.email,
            admin: false,
            superAdmin: false,
            password: password,
          });
        }
      }
    );
    return user;
  };
  const login = (email, password) => {
    setProfileInfo([]);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    setProfileInfo([]);
    return signOut(auth);
  };
  const resetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const upload = async (file, currentUser, setLoading) => {
    const fileRef = ref(storage, currentUser.uid + ".jpg");
    setLoading(true);

    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser, { photoURL: photoURL });
    setLoading(false);
  };
  const removeProfile = () => {
    return updateProfile(auth.currentUser, {
      photoURL: "",
    });
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      userData(currentUser.uid);
    }
  }, [currentUser]);

  const userData = async (uid) => {
    await getDocs(query(userCollectionref, where("uid", "==", uid))).then(
      (resp) => {
        resp.docs.map((doc) => {
          setProfileInfo(doc.data());
          if (doc.data().admin) {
            setIsAdmin(true);
          }
          if (!doc.data().admin) {
            setIsAdmin(false);
          }
          if (doc.data().superAdmin) {
            setIsSuperAdmin(true);
            setIsAdmin(true);
          }
          if (!doc.data().superAdmin) {
            setIsSuperAdmin(false);
          }
        });
      }
    );
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    upload,
    removeProfile,
    isAdmin,
    isSuperAdmin,
    profileInfo,
    resetPass,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
