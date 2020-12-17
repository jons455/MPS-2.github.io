/* wenn Admin erstellen Front uund Backend anpassen/ wenn forum oder quiz hinzugefügt wird */
/* AUTH */
const loggedOutLinks = document.querySelectorAll('#logged-out');
const logouti = document.querySelectorAll('#logout');
const loggedInLinks = document.querySelectorAll('#logged-in');
const accountDetails = document.querySelector('.account-details');
/* DB */
const guideList = document.querySelector('#guides');
const createForm = document.querySelector('#create-form');
console.log(guideList);

//logged-in/logged-out (Admin berechtigungen möglich)
auth.onAuthStateChanged(user => {
  if (user) {

    /* guides = sammlung */
    db.collection('guides').onSnapshot(snapshot => {
      setupGuides(snapshot.docs)

    });
    setupUI(user);
  } else {
    setupUI();
    setupGuides([])
  }
});

//errormeldungen ergänzen für login


//signup
const signupForm = document.querySelector('#signup-form');
//preventdefault nicht automatisch refreshen
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //getuserinfo
  const email = signupForm['signup-email'].value;
  mail = email;
  const passwort = signupForm['signup-password'].value;
  //create User
  auth.createUserWithEmailAndPassword(email, passwort).then(cred => {
    //check credentials
    signupForm.reset();
    console.log("1111")
    const modal = document.querySelector('#modal-signup');
    $('#modal-signup').close();
    signupForm.querySelector('#err').innerHTML = 'err.message';
    console.log("user signed in")
  }).catch((error) => {
    signupForm.querySelector('#err').innerHTML = err.message;
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage)
  });
  //sychronität behalten
  //TODO: fix automaticially closing 
})

//log out
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("user signed out")
  })
})
//log in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm['login-email'].value;
  mail = email;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    //TODO closen

    loginForm.reset();
  });

})

//logged-in/logged-out (Admin berechtigungen möglich)
const setupUI = (user) => {
  if (user) {

    var mail = firebase.auth().currentUser.email;
    loggedInLinks.forEach(item => item.style.display = 'block');
    logouti.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    span = document.getElementById("username");
    txt = document.createTextNode(mail);
    span.appendChild(txt);
  } else {
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    logouti.forEach(item => item.style.display = 'none');
  }
};

/* DB-Stuff */
/* Setup Data  UI-Handling*/
const setupGuides = (data) => {
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      console.log(guide.title)
      /* Template String mit mit ${} wert einsetzen */
      const li = `
    <li>
      <div>${guide.title}</div>	
      <div>${guide.content}</div>
    </li>
  `;

      html += li;
      console.log(html);
    })
    console.log("inner")
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = "<li> Ausgeloggt </li>"
  }
}
/* Noch nicht funktional weil keine Inputform */
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  /* Values hinzufügen zu coll */
  db.collection('guides').add({
    title: createForm.title.value,
    content: createForm.content.value
  }).then(() => {

  })
})

/* Forum */
const textForm = document.querySelector('#text-form');
textForm.addEventListener('submit', (e) => {
  console.log("submitted");
  e.preventDefault();
  const thema = textForm['thema'].value;  
  const text = textForm['text'].value;
  db.collection('Forum').doc("TEST").set({
    thema: "testthema",
    text: "testtext"
  }).then(() => {

  })
})


