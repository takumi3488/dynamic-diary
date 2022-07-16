import { createClient } from "urql";
import {
  cacheExchange,
  dedupExchange,
  fetchExchange,
  makeOperation,
} from "urql";
import { AuthConfig, authExchange } from "@urql/exchange-auth";
import { IdTokenResult } from "firebase/auth";
import { authClient } from "./firebase/firebase";

const getTokenReuslt = (): Promise<IdTokenResult | undefined> => {
  return new Promise((resolve) => {
    const unsubscribe = authClient().onAuthStateChanged((user) => {
      resolve(user?.getIdTokenResult());
    });
    unsubscribe();
  });
};
type AuthState = {
  token: string;
  result: IdTokenResult;
};
const authConfig: AuthConfig<AuthState> = {
  getAuth: async () => {
    const tokenResult = await getTokenReuslt();
    return tokenResult
      ? { token: tokenResult.token, result: tokenResult }
      : null;
  },
  willAuthError: ({ authState }) => {
    if (authState?.result?.expirationTime) {
      const expirationDate = new Date(authState.result.expirationTime);
      console.log("⚠️ expirationDate: ", expirationDate);
      return expirationDate < new Date();
    }

    return !authState || !authState.token;
  },
  addAuthToOperation: ({ authState, operation }) => {
    if (!authState || !authState.token) {
      return operation;
    }

    const fetchOptions =
      typeof operation.context.fetchOptions === "function"
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {};

    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: "Bearer " + authState.token,
        },
      },
    });
  },
};

export const urqlClient = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "",
  suspense: false,
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange(authConfig),
    fetchExchange,
  ],
});
