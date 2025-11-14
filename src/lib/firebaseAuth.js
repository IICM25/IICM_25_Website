import firebaseApp from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  deleteUser,
  signOut,
} from "firebase/auth";
import { getSingleDoc } from "./firestore";

const auth = getAuth(firebaseApp);

const firebaseSignup = async (email, password) => {
  try {
    let userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    let user = userCredentials.user;
    return user;
  } catch (error) {
    console.log("ERROR IN SIGNUP : " + error);
  }
};

const firebaseLogin = async (email, password) => {
  try {
    let userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    let user = userCredentials.user;
    return user;
  } catch (error) {
    console.log("ERROR IN LOGIN : " + error);
  }
};

const firebaseLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Error in logging out ", error);
  }
};

const firebaseGetUser = async (setUser, setLoading) => {
  try {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        let details = await getSingleDoc("teamManagement", user.uid);
        if (!details) {
          details = null;
        }
        setUser({ user, details });
      }
      setLoading(false);
    });
  } catch (error) {
    console.log("ERROR IN Fetching user: " + error);
  }
};

const firebaseDeleteUser = async (user) => {
  deleteUser(user)
    .then(() => {})
    .catch((error) => {
      console.log("Error ", error);
    });
};

const updateUser = async () => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: "Yash",
    });
  } catch (error) {
    console.log("ERROR in Updating user: " + error);
  }
};

export {
  firebaseSignup,
  firebaseLogin,
  firebaseLogout,
  firebaseGetUser,
  firebaseDeleteUser,
  updateUser,
};