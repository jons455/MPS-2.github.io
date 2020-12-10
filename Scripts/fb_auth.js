// setup materialize components

//Bootstrap anpassen required
document.addEventListener('DOMContentLoaded', function() {

    
  
  });
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
        console.log("user signed in")
    }).catch((error) => {
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
  if(user){
    
    var mail = firebase.auth().currentUser.email;
      loggedInLinks.forEach(item => item.style.display = 'block');
      logouti.forEach(item => item.style.display = 'block');
      loggedOutLinks.forEach(item => item.style.display = 'none');
      span = document.getElementById("username");
      txt = document.createTextNode(mail);
      span.appendChild(txt );
  } else {
      // toggle user elements
      loggedInLinks.forEach(item => item.style.display = 'none');
      loggedOutLinks.forEach(item => item.style.display = 'block');
      logouti.forEach(item => item.style.display = 'none');
  }
};
      