//const { ENGINE_METHOD_DIGESTS } = require("constants");

class ProgressBar {
    constructor(progressbar, targets){
      this.progressBar = progressbar;    // Progress Bar
      this.targets = targets;            // Step Complete Btns
      this.progress;                 // Tracking Progress
     
    }
    init(){
        const context = this;   // Reference to the instantiated object.
        this.targets.forEach(function(target){
           
          // Loop through each target element and add a click 
          // event to listen for which will call the 
          // changeProgress method and update the progress bar
          target.addEventListener('click', function(e){
            context.changeProgress(e);
            // Passing the built event object (e) to our method
          });
        });
      }
      changeProgress(e){
        //this.progress = e.target.getAttribute('data-progress');
        console.log(this.progress);
        var ui = firebase.auth().currentUser.uid;
        console.log(ui)
    
   db.collection('Users').doc(ui).get().then(doc =>{
      this.progress  = doc.data().progress;
      console.log("DB:entry",this.progress)
        switch (this.progress) {
          case "33":
            this.progress = "66"
            // Anweisungen werden ausgeführt,
            // falls expression mit value1 übereinstimmt
            break;
          case "66":
            this.progress = "100"
            // Anweisungen werden ausgeführt,
            // falls expression mit value2 übereinstimmt
           break;
         
          default:
            console.log("Def");
            this.progress = "33"
            // Anweisungen werden ausgeführt,
            // falls keine der case-Klauseln mit expression übereinstimmt
            break;
        }
        
        console.log("After Switch",this.progress);
      
        this.progressBar.style.width = this.progress + '%';
        this.progressBar.setAttribute('aria-valuenow', this.progress);
      }).then(wer =>{db.collection("Users").doc(ui).update({
        progress: this.progress
    });
  });
      
      }
  }

  const progressBar = new ProgressBar(
    // passing in reference to progress-bar div
    document.querySelector('.progress-bar'),
    // passing in an array of all the steps (targets) to listen on
    document.querySelectorAll('.btn-secondary')
  );
  progressBar.init();