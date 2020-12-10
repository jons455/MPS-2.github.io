//signup
const signupForm = document.querySelector('#signup-form');
//preventdefault nicht automatisch refreshen
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //getuserinfo
    const email = signupForm['signup-email'].value;
    const passwort = signupForm['signup-password'].value;
    console.log(email, passwort);
    //create User
    auth.createUserWithEmailAndPassword(email, passwort).then(cred => {
        //check credentials
        console.log(cred);
        signupForm.reset();
        console.log("1111")
        const modal = document.querySelector('#modal-signup');
        $('#modal-signup').close();
        console.log("user signed up")
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
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //TODO closen
        
        loginForm.reset();
        console.log("user signed in")
    });

})
//logged-in/logged-out (Admin berechtigungen möglich)
const setupUI = (user) => {
    if(user){
        loggedInLinks.forEach(item => item.style.display = 'block');
        logouti.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // toggle user elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
        logouti.forEach(item => item.style.display = 'none');
    }
};