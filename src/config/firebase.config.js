import { getApp ,getApps, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAU9LYjIMPJ1XXtqGGE-ib1iQoX3bm8fZ4",
  authDomain: "codepen-clone-67e4c.firebaseapp.com",
  projectId: "codepen-clone-67e4c",
  storageBucket: "codepen-clone-67e4c.appspot.com",
  messagingSenderId: "526026529659",
  appId: "1:526026529659:web:802bed9bba1d35eb60bbde"
};
  

  const app = getApps.length>0 ? getApp(): initializeApp(firebaseConfig)

  const auth =getAuth(app);

  const db=getFirestore(app);

  export {app,auth,db}