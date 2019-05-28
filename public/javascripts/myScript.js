$(function() {
  $("#gameTitle").on("keyup", function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      var parameters = { search: $(this).val() };
      $.get("/posts/titleSearch", parameters, function(data) {
        console.log(data);
        $("#results").html(data);
      });
      e.preventDefault();
      return false;
    }
  });
  $("#results").on("click", function(e) {
    console.log("click");
    e.preventDefault();

    // event delegation e.target.getAttribute
    $.get(`/posts/gameInfo/${e.target.getAttribute('data-gameId')}`, function(data) {
      //TODO: fill game input fields with fetched data
      console.log(data);
            
      var devHtml = '';

      data.developers.forEach(dev => devHtml += `<input class="form-control" value="${dev}" type="text" disabled>`);

      $('#dev-div').html(devHtml);
      $('#description').val(data.description);
      $('#gameTitle').val(data.title);
      $('#gameImage').html(`Main Image: <img class="img-fluid" src="${data.mainImage}">`);
    });
  });
});

