import { auth } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export interface AuthProps {
  email: string;
  password: string;
}

export const doCreateUserWithEmailAndPassword = async ({
  email,
  password,
}: AuthProps) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async ({
  email,
  password,
}: AuthProps) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
  return auth.signOut();
};

// export const doPasswordReset = (email) => {
//     return sendPasswordResetEmail(auth, email);
// }
//
// export const doPasswordchange = (password) => {
//     return updatePassword(auth.currentUser, password);
// }
//
// export const doSendEmailVerification = () => {
//     return sentEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/home`
//     });
// }
