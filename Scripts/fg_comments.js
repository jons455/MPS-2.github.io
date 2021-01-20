const fg = document.querySelector('#fg-comments');
const fgform = document.querySelector('#fg-form');

window.onload =
    db.collection('Findelgasse').orderBy("time", "asc").get().then(snapshot => {
      setupFG(snapshot.docs);
    });

/* Setup Kommentare in FG */
const setupFG = (data) => {
    let html = '';
    data.forEach((doc) => {
        const post = doc.data();
        const tr = `
        <tr>
            <td style="text-align:center; word-wrap: break-word; word-break:break-word; width:20%;">
                <div  style="color:blue;">${post.user}</div>
                <div>${post.time.toDate().toLocaleDateString()}</div>
                <div>${post.time.toDate().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
            </td>
            <td colspan="4">
                <div style="word-wrap: break-word; word-break: break-word;">${post.text}</div>    
            </td>
        </tr>
        `;
        html += tr;
    });
    fg.innerHTML = html;
}

/* Neuer Kommentar */
fgform.addEventListener('submit', (e) => {
    e.preventDefault();
    var ui = firebase.auth().currentUser.uid;
    db.collection('Users').doc(ui).get().then(doc => {
      var user = doc.data().user;
      db.collection('Findelgasse').add({
        text: fgform['fg-text'].value,
        time: firebase.firestore.Timestamp.fromMillis(Date.now()),
        user: user
      }).then(() => {
        fgform.reset();
        db.collection('Findelgasse').orderBy("time", "asc").get().then(snapshot => {
          setupFG(snapshot.docs);
        });
      });
    });
  });

function toSaalFG() {
  window.location.href = "#SaalFG";
}
function toRaum() {
  window.location.href = "#Raum";
}
function toLehre() {
  window.location.href = "#Lehre";
}
function toTrichter() {
  window.location.href = "#Trichter";
}

function toComments() {
  window.location.href = "#fgc";
}