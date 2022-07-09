import { Box } from "@mui/material";
import { signOut } from "firebase/auth";
import React, { FC, ReactNode, useEffect } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useQueryState } from "../hooks/useQueryState";
import { auth } from "../utils/firebase/firebase";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const { data } = useQueryState<{
    user: { uid: string };
  }>(
    `query User {
  user {
    id
    name
  }
}`,
    [loading]
  );
  useEffect(() => {
    console.table(data);
    console.table(auth.currentUser);
  }, [data]);
  return (
    <Box style={{ width: "100vw", display: "flex", flexDirection: "column" }}>
      <Box
        component="header"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box>ヘッダー</Box>
        <Box>
          {user ? (
            <button onClick={() => signOut(auth)} id="logout">
              ログアウト
            </button>
          ) : (
            <button
              onClick={() =>
                signInWithGoogle([
                  "https://www.googleapis.com/auth/contacts.readonly",
                ])
              }
              id="login"
            >
              ログイン
            </button>
          )}
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default Layout;
