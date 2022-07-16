import { User } from "firebase/auth";
import { useAtomValue } from "jotai";
import { useAuthState } from "react-firebase-hooks/auth";
import { currentUserAtom } from "../atoms";
import { useAuth } from "./useAuth";

export const useCurrentUser = (): [User | null | undefined, boolean] => {
  const auth = useAuth();
  if (!auth) return [undefined, false];
  if (useAtomValue(currentUserAtom)) {
    return [useAtomValue(currentUserAtom), false];
  }
  const [user, loading] = useAuthState(auth);
  return [user, loading];
};
