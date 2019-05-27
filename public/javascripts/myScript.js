$(function() {
  $("#gameTitle").on("keyup", function(e) {
    if (e.keyCode === 13) {
      var parameters = { search: $(this).val() };
      $.get("/posts/titleSearch", parameters, function(data) {
        console.log(data);
        $("#results").html(data);
      });
    }
  });
  $("#results>li>a").on("click", function(e) {
    var parameters = { info: $(this).text() };
    $.get(`/posts/gameInfo/${$(this).text()}`, parameters, function(data) {
      //TODO: fill game input fields with fetched data
    });
  });
});

//step 1: with empty search field, make a new API req
