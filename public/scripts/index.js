$(document).ready(() => {

  $('#pref').click(() => {
    // let id = $( "#getid" ).html();
    // console.log($( "#getid" ).html());
    $.get("/db/preferences", function (data) {
      console.log(data)
    })
  })
});
