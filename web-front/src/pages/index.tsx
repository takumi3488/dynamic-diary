import { signOut } from "firebase/auth";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useQueryState } from "../hooks/useQueryState";
import { auth } from "../utils/firebase/firebase";

const Home: NextPage = () => {
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
    <div>
      <Head>
        <title>Dynamic Diary</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <p>{user ? user?.email : "未ログイン"}</p>
        <p>{}</p>
      </header>
      <main>
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
      </main>
    </div>
  );
};

export default Home;
