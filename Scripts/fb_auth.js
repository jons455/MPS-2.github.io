/* wenn Admin erstellen Front uund Backend anpassen/ wenn forum oder quiz hinzugefügt wird */
/* AUTH */
const loggedOutLinks = document.querySelectorAll('#logged-out');
const logouti = document.querySelectorAll('#logout');
const loggedInLinks = document.querySelectorAll('#logged-in');
const accountDetails = document.querySelector('.account-details');
/* DB */
const guideList = document.querySelector('#guides');
/* Forum  */
const createForm = document.querySelector('#create-form');
const forumTable = document.querySelector('#forum-posts');
const textForm = document.querySelector('#text-form');
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

/* Forum */

// neues Thema
textForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('Forum').add({
    thema: textForm['thema'].value,
    text: textForm['text'].value,
    time: firebase.firestore.Timestamp.fromMillis(Date.now()),
    user: firebase.auth().currentUser.email,
    answerNum: 0
  }).then(() => {
    textForm.reset();
    db.collection('Forum').orderBy("time", "desc").get().then(snapshot => {
      setupForum(snapshot.docs);
    });
  })
})

window.onload =
  db.collection('Forum').orderBy("time", "desc").get().then(snapshot => {
    setupForum(snapshot.docs);
  });;

/* Setup Forum & Antworten*/
const setupForum = (data) => {
  let html = '';
  data.forEach(doc => {
    const post = doc.data();
    const id = doc.id;
    let an = '';
    let colspan = '';
    if (post.answerNum!=0) {
      post.answers.forEach(a => {
        const tra = ` 
          <tr>
            <td style="width: 10em; text-align:center;">
              <div><a href="#0">${a.auser}</a></div>
              <div>${a.atime.toDate().toLocaleDateString()}</div>
              <div>${a.atime.toDate().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
            </td>
            <td>
              <div>
                ${a.atext}
              </div>
            </td>
          </tr>
      `;
        an += tra;
      })
      colspan += "colspan=2";
    }
    let answer = "Antworten";
    if (post.answerNum==1) {
      answer = "Antwort";
    }
    const tr = `
      <tr>
        <td style="text-align:center;">
            <div>${post.thema}</div>
        </td>
        <td style="text-align:center;">
            <div><a href="#0">${post.user}</a></div>
            <div>${post.time.toDate().toLocaleDateString()}</div>
            <div>${post.time.toDate().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
        </td>
        <td>
            <div>${post.text}</div>
            <div style="text-align: right; margin-right: 8em"><a href="#${id}" data-toggle="collapse">${post.answerNum} ${answer}</a></div>
            <table class="table table-borderless collapse" id="${id}">
              ${an}
              <tr>
                  <td ${colspan}>
                      <form id="answer-form" name="${id}">
                          <div style="margin-bottom:0.3em;" id="logged-in"><textarea type="text" class="form-control" placeholder="Hier kannst du eine Antwort schreiben" id="answer" required></textarea></div>
                          <div style="text-align:right;" id="logged-in"><button class="btn btn-secondary">Antworten</button></div>
                      </form>
                  </td>
              </tr>
            </table>
        </td>
      </tr>
    `;
    html += tr;
  });
  forumTable.innerHTML = html;
  answer(document.querySelectorAll('#answer-form'));
}

// neue Antwort
function answer(forms) {
  forms.forEach(form => 
    form.addEventListener('submit', (el) => {
      el.preventDefault();
      db.collection('Forum').doc(form.getAttribute('name')).set({
        answerNum: firebase.firestore.FieldValue.increment(1),
        answers: firebase.firestore.FieldValue.arrayUnion({
          atext: form['answer'].value,
          atime: firebase.firestore.Timestamp.fromMillis(Date.now()),
          auser: firebase.auth().currentUser.email
        })
      }, { merge: true }).then(() => {
        form.reset();
        db.collection('Forum').orderBy("time", "desc").get().then(snapshot => {
          setupForum(snapshot.docs);
        });
      })
    })
  )
}