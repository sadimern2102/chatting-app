import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDz_CgN7h0oegwnYJtKRCAYbLvKmkNEVEQ",
    authDomain: "chatting-af594.firebaseapp.com",
    projectId: "chatting-af594",
    storageBucket: "chatting-af594.appspot.com",
    databaseURL: "https://chatting-af594-default-rtdb.firebaseio.com",
    messagingSenderId: "274619283287",
    appId: "1:274619283287:web:1c7d97845b69852dcb7012"
  };
  

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  export default app