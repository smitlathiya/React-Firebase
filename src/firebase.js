import { initializeApp } from "firebase/app";
import 'firebase/auth'
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAloaou0F45MJmhEdoam6neaDn4xoPm0Ws",
    authDomain: "dashboard-492bc.firebaseapp.com",
    databaseURL: "https://dashboard-492bc-default-rtdb.firebaseio.com",
    projectId: "dashboard-492bc",
    storageBucket: "dashboard-492bc.appspot.com",
    messagingSenderId: "325578094316",
    appId: "1:325578094316:web:72a6a9c108706369a0d7c9",
    measurementId: "G-ZFVSH5MZNG"

    //================= Second Account Detail =================
    // apiKey: "AIzaSyAJAB45iwm1kUrosFcnxIjfx-eRgErdH_U",
    // authDomain: "dashboard-5eeb9.firebaseapp.com",
    // projectId: "dashboard-5eeb9",
    // storageBucket: "dashboard-5eeb9.appspot.com",
    // messagingSenderId: "814049110326",
    // appId: "1:814049110326:web:d58e1e1e952278bb586b97"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)
export const db = getFirestore(app)
export default app;