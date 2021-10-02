import { getFirestore } from "@firebase/firestore";
import {initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDU9s19IN80uII3TobA3Q_m3FK3eZod8Ww",
  authDomain: "mp-databaze.firebaseapp.com",
  projectId: "mp-databaze",
  storageBucket: "mp-databaze.appspot.com",
  messagingSenderId: "860966404806",
  appId: "1:860966404806:web:2dcfbd8d549cd52b770dc7"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default db;