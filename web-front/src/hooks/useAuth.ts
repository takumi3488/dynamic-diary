import { Auth, getAuth } from "firebase/auth";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { firebaseAppAtom } from "../atoms";

export const useAuth = (): Auth | null => {
  const app = useAtomValue(firebaseAppAtom);
  const auth = useMemo<Auth | null>(() => app && getAuth(app), [app]);
  return auth;
};
