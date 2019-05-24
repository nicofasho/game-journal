$(function() {
  $('#gameTitle').on('keyup', function(e) {
    if(e.keyCode === 13) {
      var parameters = {search: $(this).val() };
      $.get('/posts/titleSearch', parameters, function(data) {
        console.log(data);
        $('#results').html(data);
      });
    }
  });
});

//step 1: with empty search field, make a new API req
