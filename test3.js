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
  console.log("authCheck");
  if (user) {
    console.log("logged-in");
      setupUI(user);
  } else {
    console.log("logged-out");
    setupUI();
    
  }
});