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
  const username = signupForm['signup-username'].value;
  
  //create User
  auth.createUserWithEmailAndPassword(email, passwort).then(cred => {
    //check credentials
    console.log(username);
    db.collection("Users").doc(cred.user.uid).set({
      user:  username
      
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  
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
  }).catch((error) => {
    loginForm.querySelector('#log-err').innerHTML = error.message;
    loginForm.reset();
  }

  );

})

//logged-in/logged-out (Admin berechtigungen möglich)
const setupUI = (user) => {
  var name;
  if (user) {
    var ui = firebase.auth().currentUser.uid;
    console.log(ui)
    
    db.collection('Users').doc(ui).get().then(doc =>{
      var test = doc.data().user;
      console.log(test);
      name = test;
    
    console.log("name: " + name);
    loggedInLinks.forEach(item => item.style.display = 'block');
    logouti.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
      //check if empty if not then clear span
      if(document.getElementById("username").childNodes.length != 0){
    span = document.getElementById("username");
        console.log(span);
        console.log(span.childNodes[0]);
        span.removeChild(span.childNodes[0]);
        txt = document.createTextNode(name);
        span.appendChild(txt);
      } else {
        span = document.getElementById("username");
        txt = document.createTextNode(name);
        span.appendChild(txt);
    }
  }).then( amy =>{
    const html = `
      <div>Logged in as ${name}</div>
    `;
    accountDetails.innerHTML = html;
  });
  } else {
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    logouti.forEach(item => item.style.display = 'none');
  }
};

const setupuser = (data, name) => {
  data.forEach(doc => {
    const post = doc.data();
    if(post.user.equals(name)){
      return name;
    }
  });
}
