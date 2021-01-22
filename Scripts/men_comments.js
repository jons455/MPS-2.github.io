const men = document.querySelector('#men-comments');
const menform = document.querySelector('#men-form');

window.onload =
    db.collection('Mensa').orderBy("time", "asc").get().then(snapshot => {
      setupMen(snapshot.docs);
    });

/* Setup Kommentare in Mensa */
const setupMen = (data) => {
    let html = '';
    data.forEach((doc) => {
        const post = doc.data();
        const tr = `
        <tr>
            <td style="text-align:center; width:20%;">
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
    men.innerHTML = html;
}

/* Neuer Kommentar */
menform.addEventListener('submit', (e) => {
    e.preventDefault();
    var ui = firebase.auth().currentUser.uid;
    db.collection('Users').doc(ui).get().then(doc => {
      var user = doc.data().user;
      db.collection('Mensa').add({
        text: menform['men-text'].value,
        time: firebase.firestore.Timestamp.fromMillis(Date.now()),
        user: user
      }).then(() => {
        menform.reset();
        db.collection('Mensa').orderBy("time", "asc").get().then(snapshot => {
          setupMen(snapshot.docs);
        });
      });
    });
  });
  
function toOeffnung() {
  window.location.href = "#Oeffnung";
}
function toSpeise() {
  window.location.href = "#Speise";
}
function toWerk() {
  window.location.href = "#Werk";
}
function toZahlen() {
  window.location.href = "#Zahlen";
}

function toComments() {
  window.location.href = "#men";
}