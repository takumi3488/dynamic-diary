import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import { User } from "firebase/auth";
import { atom } from "jotai";

export const firebaseAppAtom = atom<FirebaseApp | null>(null);
export const analyticsAtom = atom<Analytics | null>(null);
export const currentUserAtom = atom<User | null>(null);
