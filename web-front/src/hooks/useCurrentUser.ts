import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "./useAuth";

export const useCurrentUser = (): [User | null | undefined, boolean] => {
  const auth = useAuth();
  if (!auth) return [undefined, false];
  const [user, loading] = useAuthState(auth);
  return [user, loading];
};
