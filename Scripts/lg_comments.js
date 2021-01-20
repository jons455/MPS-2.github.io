const lg = document.querySelector('#lg-comments');
const lgform = document.querySelector('#lg-form');

window.onload =
    db.collection('Lange_Gasse').orderBy("time", "asc").get().then(snapshot => {
      setupLG(snapshot.docs);
    });

/* Setup Kommentare in LG */
const setupLG = (data) => {
    let html = '';
    data.forEach((doc) => {
        const post = doc.data();
        const tr = `
        <tr>
            <td style="text-align:center;width:20%;">
                <div style="color:blue;">${post.user}</div>
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
    lg.innerHTML = html;
}

/* Neuer Kommentar */
lgform.addEventListener('submit', (e) => {
    e.preventDefault();
    var ui = firebase.auth().currentUser.uid;
    db.collection('Users').doc(ui).get().then(doc => {
      var user = doc.data().user;
      db.collection('Lange_Gasse').add({
        text: lgform['lg-text'].value,
        time: firebase.firestore.Timestamp.fromMillis(Date.now()),
        user: user
      }).then(() => {
        lgform.reset();
        db.collection('Lange_Gasse').orderBy("time", "asc").get().then(snapshot => {
          setupLG(snapshot.docs);
        });
      });
    });
  });

function toBib() {
  window.location.href = "#Bib";
}
function toCaf() {
  window.location.href = "#Cafeteria";
}
function toCip() {
  window.location.href = "#CIP";
}
function toSaal() {
  window.location.href = "#Saal";
}
function toSem() {
  window.location.href = "#Seminar";
}
function toInfo() {
  window.location.href = "#Info";
}
function toDruck() {
  window.location.href = "#Druck";
}
function toLehr() {
  window.location.href = "#Lehr";
}

function toComments() {
  window.location.href = "#lgc";
}