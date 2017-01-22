$(document).ready(function() {
  $('#rusername').blur(function() {
    var username = $(this).val();
    $.ajax({
      url: '/validateUsername',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        username: username
      }),
      success: function(response) {
        console.log(response);
        if(response['username'] == 'Not Taken'){
          $('#rusername').css('border-bottom', '3px solid green');
        }
        else{
          $('#rusername').css('border-bottom', '3px solid red');
        }
      },
      error: function(error) {
        console.log(error);
      }
    });
  });

  $('#remail').blur(function(){
    var email = $(this).val();
    $.ajax({
      url: '/validateEmail',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        email: email
      }),
      success: function(response) {
        console.log(response);
        if(response['email'] == 'Not Taken'){
          $('#remail').css('border-bottom', '3px solid green');
        }
        else{
          $('#remail').css('border-bottom', '3px solid red');
        }
      },
      error: function(error) {
        console.log(error);
      }
    });
  });

  $('#rconfirmpass').keyup(function(){
    var password = $('#rpassword').val();
    var confirmPass = $(this).val();

    if(password === confirmPass){
      $(this).css('border-bottom', '3px solid green').fadeIn('slow');
    }
    else{
      $(this).css('border-bottom', '3px solid red').fadeIn('slow');
    }
  });

});
