import { signInWithCustomToken } from "firebase/auth";
import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect } from "react";
import { auth } from "../utils/firebase/firebase";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const customToken = router.query.customToken as string | undefined;
  useEffect(() => {
    if (customToken) signInWithCustomToken(auth, customToken);
  }, [router.isReady]);
  return <>{children}</>;
};

export default Layout;
