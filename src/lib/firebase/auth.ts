import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    UserCredential,
    signOut,
  } from 'firebase/auth';
  import { auth } from '../firebase/client';
  
  export const login = (): Promise<UserCredential> => {
    console.log("aaa");
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return signInWithRedirect(auth, provider);
  };
  
  export const logout = (): Promise<void> => {
    return signOut(auth);
  };