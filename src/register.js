import {} from './initialize.js'
import { getAuth,createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'
import {getFirestore,addDoc ,collection} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js'

const auth = getAuth()
const db = getFirestore()

//signup
const signupForm = document.querySelector('.register-form')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  //creates an user and logs in
  createUserWithEmailAndPassword(auth,email,password)
    .then((user)=>{
  
      window.location.href = "./main.html";
      
    })
    .catch((error)=>{
            let errorCode = error.code
            const errorElement = document.querySelector('.error-message')

            if (errorCode === 'auth/invalid-email') {
              signupForm.email.style.border = "solid 2px red"
              errorElement.innerHTML =  "&#128712; Invalid email"
            }
            else {
              signupForm.email.style.border = ''
            }
            if (errorCode === 'auth/weak-password') {
              signupForm.password.style.border = "solid 2px red"
              errorElement.innerHTML =  "&#128712; Weak password"
            }
            else {
              signupForm.password.style.border = ''
            }
    })


})