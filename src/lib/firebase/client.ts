import { initializeApp, getApps } from 'firebase/app';

import { getAuth } from 'firebase/auth';

const firebaseConfig ={
  
}

if (!getApps()?.length) {
  // Firebaseアプリの初期化
  initializeApp(firebaseConfig);
}


export const auth = getAuth(); 
