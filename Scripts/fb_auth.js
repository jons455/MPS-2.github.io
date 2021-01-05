/* wenn Admin erstellen Front uund Backend anpassen/ wenn forum oder quiz hinzugefügt wird */
/* AUTH */
const loggedOutLinks = document.querySelectorAll('#logged-out');
const logouti = document.querySelectorAll('#logout');
const loggedInLinks = document.querySelectorAll('#logged-in');
const accountDetails = document.querySelector('.account-details');


//logged-in/logged-out (Admin berechtigungen möglich)
auth.onAuthStateChanged(user => {
  if (user) {
    setupUI(user);
  } else {
    setupUI();
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
    $('#modal-signup').modal('toggle');
    signupForm.querySelector('#err').innerHTML = 'err.message';
    console.log("user signed in");
  }).catch((error) => {
    signupForm.querySelector('#err').innerHTML = error.message;
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage)
  });
  //sychronität behalten
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
    loginForm.reset();
    $('#modal-login').modal('toggle');
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

