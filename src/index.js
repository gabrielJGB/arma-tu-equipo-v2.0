if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}

import {} from './initialize.js'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'

const auth = getAuth()

// check user auth
onAuthStateChanged(auth,(user)=>{
  if(user){
    document.querySelector('body').style.color = "white"
    document.querySelector('body').innerHTML = "Cargando..."
    window.location.href = "./main.html"
  }
})

//login
const loginForm = document.querySelector('.access-form')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      window.location.href = "./main.html"
    })
    .catch(error => {
      let errorCode = error.code
      const errorElement = document.querySelector('.error-message')

      if (errorCode === 'auth/user-not-found') {
          loginForm.email.style.border = "solid 2px red"
          errorElement.innerHTML =  "&#128712; User not found"
      }
      else if (errorCode === 'auth/invalid-email') {
          loginForm.email.style.border = "solid 2px red"
          errorElement.innerHTML =  "&#128712; Invalid email"
      }else{
          loginForm.email.style.border = ''
          errorElement.innerHTML =  ''
      }
      if (errorCode === 'auth/wrong-password') {
          loginForm.email.style.border = "solid 2px red"
          errorElement.innerHTML =  "&#128712; Wrong password"
      }
      else {
         loginForm.password.style.border = ''
      }
    })
})

