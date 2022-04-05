import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js'
import {
  getFirestore, collection, onSnapshot, 
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  getDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js'
import {
  getAuth,createUserWithEmailAndPassword,
  signOut,signInWithEmailAndPassword,
  onAuthStateChanged

} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'

const firebaseConfig = {
  apiKey: "AIzaSyCgtaWIDKQGDGe5Xxe_bO2ckx71P0TfkMc",
  authDomain: "arma-tu-equipo-85761.firebaseapp.com",
  projectId: "arma-tu-equipo-85761",
  storageBucket: "arma-tu-equipo-85761.appspot.com",
  messagingSenderId: "686317921143",
  appId: "1:686317921143:web:a9632850611be3e9a87772"
};

//init firebase app
initializeApp(firebaseConfig)

const db = getFirestore()

//login
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // console.log('user logged in:', cred.user)
      window.location.href = "./dashboard.html";
      
    })
    .catch(err => {
      console.log(err.message)
    })
})

//signup
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  //creates an user and logs in
  createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      window.location.href = "./main.html";
      
    })
    .catch((error)=>console.error(error.message))


})