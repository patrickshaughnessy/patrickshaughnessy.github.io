$(document).ready(function(){
  $(window).scrollTo($('#title'));
  return;
});

var me = {
  firstName: 'Patrick',
  lastName: 'Shaughnessy',
  language: 'javascript'
};

me.welcome = function(){
  var $yourName = $('#yourName').val();
  console.log("Hello " + $yourName + "! My name is " + this.firstName + " " + this.lastName + ", and I'm a " + this.language + " developer.");
  var welcomeMessage = "My name is " + this.firstName + " " + this.lastName + ", and I'm a " + this.language + " developer.";
  return welcomeMessage;
};

$('#yourName').keypress(function(e){
  if (e.which == 13) {
    var welcomeMessage = me.welcome();
    $('#welcomeMessage').text(welcomeMessage);
    $(window).scrollTo($('#welcome'), 800, {easing:'easeOutCirc'});

    return false;
  }
});

$('a').click(function(e){
  e.preventDefault();
  var loc = this.hash;
  $(window).scrollTo($(loc), 800, {easing: 'easeOutCirc'});
  return false;
})
