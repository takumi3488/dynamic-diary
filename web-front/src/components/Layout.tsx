import { signInWithCustomToken } from "firebase/auth";
import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect } from "react";
import { auth } from "../utils/firebase/firebase";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  // テスト時にクエリパラメータからカスタムトークンを受け取る
  const router = useRouter();
  const customToken = router.query.customToken as string | undefined;
  useEffect(() => {
    if (customToken) signInWithCustomToken(auth, customToken);
  }, [router.isReady, customToken]);
  return <>{children}</>;
};

export default Layout;
