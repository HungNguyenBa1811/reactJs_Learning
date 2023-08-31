import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC_cwmdGLu2bYAQhU4PRjsGwxEGlRCYDIk",
    authDomain: "todolist-f44c5.firebaseapp.com",
    databaseURL: "https://todolist-f44c5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todolist-f44c5",
    storageBucket: "todolist-f44c5.appspot.com",
    messagingSenderId: "654505033036",
    appId: "1:654505033036:web:1b28973a2c5fe9090463e9"
};

const app = initializeApp(firebaseConfig);


export default app;