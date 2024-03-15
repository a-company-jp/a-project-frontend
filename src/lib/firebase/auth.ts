import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./client";

export const login = (): void => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential: any = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("refresh-token", user.refreshToken);
      console.log(token, user,user.refreshToken);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
};

export const logout = (): Promise<void> => {
  return signOut(auth);
};
