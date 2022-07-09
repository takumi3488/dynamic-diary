import { signInWithCustomToken } from "firebase/auth";
import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect } from "react";
import { auth } from "../utils/firebase/firebase";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
