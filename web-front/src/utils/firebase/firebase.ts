import { getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

export const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

export const authClient = () => {
  if (process.env.NODE_ENV !== "production") {
    return getAuth(app);
  } else {
    const auth = getAuth();
    connectAuthEmulator(
      auth,
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST as string
    );
    return auth;
  }
};
