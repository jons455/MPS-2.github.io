/* Forum  */
const forumTable = document.querySelector('#forum-posts');
const textForm = document.querySelector('#text-form');
const sortForm = document.querySelector('#sort');
/* Pagination */
const pages = document.querySelector('#pagination');

// neues Thema
textForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var ui = firebase.auth().currentUser.uid;
    db.collection('Users').doc(ui).get().then(doc => {
      var user = doc.data().user;
      db.collection('Forum').add({
        thema: textForm['thema'].value,
        text: textForm['text'].value,
        time: firebase.firestore.Timestamp.fromMillis(Date.now()),
        user: user,
        answerNum: 0
      }).then(() => {
        textForm.reset();
        db.collection('Forum').orderBy("time", "desc").get().then(snapshot => {
          setupForum(snapshot.docs);
        });
      });
    });
  });
  
  window.onload =
    db.collection('Forum').orderBy("time", "desc").get().then(snapshot => {
      setupForum(snapshot.docs);
    });
  
  /* Setup Forum & Antworten*/
  const setupForum = (data) => {
    let html = '';
    setupPagination(data);
    data.forEach((doc, index) => {
      const post = doc.data();
      const id = doc.id;
      let an = '';
      let colspan = '';
      if (post.answerNum!=0) {
        post.answers.forEach(a => {
          const tra = ` 
            <tr>
              <td style="width:9em; text-align:center;">
                <div style="text-align:center; word-wrap: break-word; word-break:break-word; color:blue;">${a.auser}</div>
                <div>${a.atime.toDate().toLocaleDateString()}</div>
                <div>${a.atime.toDate().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
              </td>
              <td>
                <div style="max-height:70px; overflow:auto;">
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
        <tr id="doc${index}">
          <td style="text-align:center; word-wrap: break-word; word-break:break-word;">
              <div>${post.thema}</div>
          </td>
          <td style="text-align:center; word-wrap: break-word; word-break:break-word;">
              <div  style="color:blue;">${post.user}</div>
              <div>${post.time.toDate().toLocaleDateString()}</div>
              <div>${post.time.toDate().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
          </td>
          <td>
              <div style="word-wrap: break-word; word-break: break-word; max-height:150px; overflow:auto">${post.text}</div>
              <div style="text-align:right; margin-right:25%"><a href="#${id}" data-toggle="collapse">${post.answerNum} ${answer}</a></div>
              <table class="table table-borderless collapse" id="${id}">
                ${an}
                <tr>
                    <td ${colspan}>
                        <form id="answer-form" name="${id}">
                            <div style="margin-bottom:0.3em;" id="logged-in"><textarea type="text" class="form-control" placeholder="Hier kannst du eine Antwort schreiben ..." id="answer" required></textarea></div>
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
    auth.onAuthStateChanged(user => {
      if (user) {
        document.querySelectorAll('#logged-in').forEach(item => item.style.display = 'block');
      } else {
        document.querySelectorAll('#logged-in').forEach(item => item.style.display = 'none');
      }
    });
    answer(document.querySelectorAll('#answer-form'));
  }

  // neue Antwort
  function answer(forms) {
    forms.forEach(form => {
      form.addEventListener('submit', (el) => {
        el.preventDefault();
        var ui = firebase.auth().currentUser.uid;
        db.collection('Users').doc(ui).get().then(doc => {
          var user = doc.data().user;
          db.collection('Forum').doc(form.getAttribute('name')).set({
            answerNum: firebase.firestore.FieldValue.increment(1),
            answers: firebase.firestore.FieldValue.arrayUnion({
              atext: form['answer'].value,
              atime: firebase.firestore.Timestamp.fromMillis(Date.now()),
              auser: user
            })
          }, { merge: true }).then(() => {
            form.reset();
            sorting();
          });
        });
      })
    })
  } 

sortForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sorting();
});
  
function sorting() {
  switch(sortForm['select'].value) {
    case 'zeit':
      if (sortForm['order'].value == 'desc') {
        db.collection('Forum').orderBy("time", "desc").get().then(snapshot => {
          setupForum(snapshot.docs);
        })
      } else {
        db.collection('Forum').orderBy("time", "asc").get().then(snapshot => {
          setupForum(snapshot.docs);
        })
      }
      break;
    case 'author':
      if (sortForm['order'].value == 'desc') {
        db.collection('Forum').orderBy("user", "desc").get().then(snapshot => {
          setupForum(snapshot.docs);
        })
      } else {
        db.collection('Forum').orderBy("user", "asc").get().then(snapshot => {
          setupForum(snapshot.docs);
        })
      }
      break;
    case 'text':
      if (sortForm['order'].value == 'desc') {
        db.collection('Forum').orderBy("text", "desc").get().then(snapshot => {
          setupForum(snapshot.docs);
        })
      } else {
        db.collection('Forum').orderBy("text", "asc").get().then(snapshot => {
          setupForum(snapshot.docs);
        })
      }
      break;
    case 'antworten':
      if (sortForm['order'].value == 'desc') {
        db.collection('Forum').orderBy("answerNum", "desc").get().then(snapshot => {
          setupForum(snapshot.docs);
        })
      } else {
        db.collection('Forum').orderBy("answerNum", "asc").get().then(snapshot => {
          setupForum(snapshot.docs);
        })
      }
      break;
    case 'thema':
    if (sortForm['order'].value == 'desc') {
      db.collection('Forum').orderBy("thema", "desc").get().then(snapshot => {
        setupForum(snapshot.docs);
      })
    } else {
      db.collection('Forum').orderBy("thema", "asc").get().then(snapshot => {
        setupForum(snapshot.docs);
      })
    }
    break;
    default:
  }
}

function setupPagination(data) {
  var al = Math.floor((data.length+4)/5);
  var html = '';
  for (i = 1; i <= al; i++) {
    if (i == 1) {
      html += `
        <li class="page-item active"><a href="#" class="page-link">1<span class="sr-only">(current)</span></a></li>
      `;
    } else {
      html += `
        <li class="page-item"><a href="#" class="page-link">${i}</a></li>
      `;
    }
  }
  html += `
    <li class="page-item"><a href="#top" class="page-link">Top</a></li>
  `;
  pages.innerHTML = html;
}