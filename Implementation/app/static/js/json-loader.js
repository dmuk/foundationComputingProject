$(document).ready(function(){
  $('.btn').click(function(){
    $(document).ready(function(){
      $('.btn').click(function(){
        var name = this.getAttribute('data-name');
        console.log(name);

        $.ajax({
          url: '/loadLogic',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
            name: name
          }),
          success: function(response){
            console.log(response);
          }
        })
      });
    });
  });
});
