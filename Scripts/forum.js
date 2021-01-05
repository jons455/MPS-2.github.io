/* Forum  */
const createForm = document.querySelector('#create-form');
const forumTable = document.querySelector('#forum-posts');
const textForm = document.querySelector('#text-form');

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
              <td style="width:9em; text-align:center;">
                <div style="text-align:center; word-wrap: break-word; word-break:break-word;"><a href="#0">${a.auser}</a></div>
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
          <td style="text-align:center; word-wrap: break-word; word-break:break-word;">
              <div>${post.thema}</div>
          </td>
          <td style="text-align:center; word-wrap: break-word; word-break:break-word;">
              <div><a href="#0">${post.user}</a></div>
              <div>${post.time.toDate().toLocaleDateString()}</div>
              <div>${post.time.toDate().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
          </td>
          <td>
              <div style="word-wrap: break-word; word-break: break-word;">${post.text}</div>
              <div style="text-align:right; margin-right:25%"><a href="#${id}" data-toggle="collapse">${post.answerNum} ${answer}</a></div>
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