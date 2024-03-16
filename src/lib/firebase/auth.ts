import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./client";
import useFetchUser from "@/hooks/useFetchUser";
import { UserData } from "../../../proto/typescript/pb_out/main";

export const login = (): void => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    window.localStorage.setItem("token", (user as any).accessToken);
    window.localStorage.setItem("refresh-token", user.refreshToken);
    console.debug("login success", user);
    const firstName = user.displayName!.split(" ")[0];
    const lastName = user.displayName!.split(" ")[1];
    const client = useFetchUser();
    const me = client
      .me()
      .then((userInfo) => {
        const newUserInfo = UserData.create({
          userId: userInfo.userData?.userId,
          username: user.displayName!,
          firstname: firstName,
          lastname: lastName,
          firstnameKana: firstName,
          lastnameKana: lastName,
          statusMessage: "",
          tag: [],
        });
        client.update(newUserInfo).then(() => {
          client.me().then((userInfo) => {
            console.log(userInfo);
          });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  });
};

export const logout = (): Promise<void> => {
  return signOut(auth);
};
