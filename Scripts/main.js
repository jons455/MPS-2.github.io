function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

		/*$(document).ready(function(){
	 		// Close modal on button click
			$(".btn").click(function(){
				var signup = document.getElementById("signup-password")
				var lengt = signup.value.length;
				if(lengt >= 6){
				$("#modal-signup").modal('hide');
				}
			});
		});
	
		$(document).ready(function(){
	 		// Close modal on button click
			$(".btn").click(function(){
				var login = document.getElementById("login-password")
				var lengt = login.value.length;
				if(lengt >= 6){
				$("#modal-login").modal('hide');
				}
			});
		});
	*/
