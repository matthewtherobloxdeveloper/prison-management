// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmjTz070Uk8j5g4mgqPTMvQY75QDXTLD8",
  authDomain: "brrbrrpatapim-3321c.firebaseapp.com",
  databaseURL: "https://brrbrrpatapim-3321c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "brrbrrpatapim-3321c",
  storageBucket: "brrbrrpatapim-3321c.firebasestorage.app",
  messagingSenderId: "945414089768",
  appId: "1:945414089768:web:c370469772070b58bc191d",
  measurementId: "G-QMK28X5BDJ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();
