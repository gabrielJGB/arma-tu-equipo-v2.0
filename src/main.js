import {} from './initialize.js'
import { getAuth, signOut, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'
import { doc,setDoc,addDoc,getFirestore,getDoc, getDocs,collection, deleteDoc,onSnapshot,query,where } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js'

const auth = getAuth()
const db = getFirestore()



let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
let container = document.querySelector('.container');
let containerArray = Array.from(container.children);
let boxCount = 0;
let videoHeight = 480,videoWidth = 854;
let modal = document.querySelector('.modal');
let acceptButton = document.querySelector('.accept-button');
let windowButton = document.querySelector(".window-button").addEventListener('click', showWindow);
let cancelButton = document.querySelector('.cancel-button').addEventListener('click', closeWindow);
let users = document.querySelectorAll('.user-name');
let list = document.querySelector('.list');
list.textContent = 'Cargando...'
let searchInput = document.querySelector('.search-input');
let slideContainer = document.querySelector('.slide-container');
let slideLeft = document.querySelector('.slide-left');
let userId = ''
let chatEmbed = document.querySelector('#chat_embed')

chatEmbed.height = "100%"
chatEmbed.width = "300px"
chatEmbed.style.display = "none"

onAuthStateChanged(auth,(user)=>{
    
    if (user) {
            userId = user.uid
            const userElement = document.querySelector('.user')
            userElement.textContent = user.email
            getItemsFromDatabase(userId)
            
    } else {
        window.location.href = "./index.html"
    }
})

acceptButton.addEventListener('click', () => {
    let user = searchInput.value;
    if(user != ''){
        addUserToDatabase(userId,user)
        addUserToList(user)
    }
    searchInput.value = "";
})


async function getItemsFromDatabase(userId){
    const querySnapshot = await getDocs(collection(db, userId));
    list.textContent = ''
    querySnapshot.forEach((doc) => {
        addUserToList(doc.data().nombre)
    });
}

async function addUserToDatabase(userId,data){
    const userRef = doc(collection(db, userId))
    await setDoc(userRef, {nombre:data})

}

function addUserToList(user){


    const userBox = document.createElement('DIV')
    const userName = document.createElement('A')
    
    const deleteUserButton = document.createElement('BUTTON')

    userBox.className = "user-box"
    userName.className = 'user-name'
    deleteUserButton.className = 'delete-user-button'
    
    deleteUserButton.textContent = 'Borrar'
    userName.textContent = user

    userBox.appendChild(userName)
    
    userBox.appendChild(deleteUserButton)

    deleteUserButton.addEventListener('click', () => {deleteUser(userName);});
    userName.addEventListener('click', () => {addVideo(user);});

    list.appendChild(userBox)
}

async function deleteUser(user){
    
    let docId = ''
    const q = query(collection(db, userId), where("nombre", "==", user.textContent));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docId = doc.id
    });
    user.textContent = "Borrando..."
    await deleteDoc(doc(db, userId ,docId));

    user.parentNode.remove();
}


function addVideo(user) {


    let box = document.createElement('DIV');
    box.style.display = "flex";
    box.style["flex-direction"] = "column";
    box.style["box-shadow"] = "0 0 10px #0e0e0e";

    let userDiv = document.createElement('DIV');
    userDiv.textContent = user;
    userDiv.className = "user-div";

    let bottomBox = document.createElement('DIV');
    bottomBox.style.display = 'flex'
    bottomBox.style['flex-direction'] = 'row'

    let chatLink = document.createElement('DIV')
    chatLink.style.color = "white"
    chatLink.style.cursor = "pointer"
    chatLink.textContent = " Chat→"
    
    chatLink.addEventListener('click',()=>{
        if(chatEmbed.style.display == ""){
            chatEmbed.style.display = "none"
        }else{
            chatEmbed.style.display = ""
            setChat(userDiv.textContent)
        }  
    })

    chatLink.style.width = "max-content"
    chatLink.target = "_blank"

    let deleteButton = document.createElement('BUTTON');
    deleteButton.textContent = "Borrar";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener('click', removeVideo);
    deleteButton.style.width = '100%'

    bottomBox.appendChild(deleteButton)
    bottomBox.appendChild(chatLink)


    boxCount++;
    box.id = "box" + boxCount;

    let player = new Twitch.Player(box, {
        channel: user,
        height: videoHeight,
        width: videoWidth
    });

    box.appendChild(userDiv);
    box.appendChild(bottomBox)
    // box.appendChild(deleteButton);
    // box.appendChild(chatLink)
    container.appendChild(box);
    containerArray = Array.from(container.children);
    closeWindow();
}

function setChat(user){
    chatEmbed.src = `https://www.twitch.tv/embed/${user}/chat?parent=multi-stream.vercel.app`
}


const logOutButton = document.querySelector('.log-out-button')
logOutButton.addEventListener('click', logOut)
function logOut() {
    signOut(auth)
        .then(() => {

            window.location.href = "./index.html"
        })
        .catch((error) => {
            console.log(error)
        })
}

slider.addEventListener('input', (e) => {
    videoHeight = e.target.value;
    videoWidth = (e.target.value * 16) / 9;
    output.innerHTML = videoHeight + "x" + parseInt(videoWidth);

    containerArray.forEach((video) => {
        video.firstChild.width = videoWidth;
        video.firstChild.height = videoHeight;
    })
})

slideLeft.style.display = "none";

slideContainer.addEventListener('mouseover', showRange);
slideContainer.addEventListener('mouseout', hideRange);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        let user = searchInput.value;
        addUserToList(user);
        addUserToDatabase(userId,user)
        searchInput.value = "";
    }
});

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
   showRange()
}

function showRange() {
    slideLeft.style.display = "";

}

function hideRange() {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        slideLeft.style.display = "none";
    }
}

function closeWindow() {
    modal.style.display = "none";
}

function showWindow() {
    modal.style.display = "flex";
}

function removeVideo() {
    this.parentNode.parentNode.remove()
}

