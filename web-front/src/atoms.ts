import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import { atom } from "jotai";

export const firebaseAppAtom = atom<FirebaseApp | null>(null);
export const analyticsAtom = atom<Analytics|null>(null);
