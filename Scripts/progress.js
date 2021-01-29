//const { ENGINE_METHOD_DIGESTS } = require("constants");

class ProgressBar {
    constructor(progressbar, targets){
      this.progressBar = progressbar;    // Progress Bar
      this.targets = targets;            // Step Complete Btns
      this.progress = 0;                 // Tracking Progress
      this.aktprocess = 0;
      console.log("AKT:",this.aktprocess);
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
        this.progress = e.target.getAttribute('data-progress');
        this.aktprocess = this.aktprocess + this.progress;
        console.log(progress);
        console.log("AKT:",this.aktprocess);
        this.progressBar.style.width = this.aktprocess + '%';
        this.progressBar.setAttribute('aria-valuenow', this.progress);
      }
  }

  const progressBar = new ProgressBar(
    // passing in reference to progress-bar div
    document.querySelector('.progress-bar'),
    // passing in an array of all the steps (targets) to listen on
    document.querySelectorAll('.btn-secondary')
  );
  progressBar.init();