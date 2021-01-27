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

$(function() {
 $('a[href*=#]:not([href=#])').click(function() {
 if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
 var target = $(this.hash);
 target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
 if (target.length) {
 $('html,body').animate({
 scrollTop: target.offset().top
 }, 1000);
 return false;
 }
 }
 });
});
