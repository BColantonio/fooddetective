$(document).ready(() => {

  $('#favorite').click(() => {
    let id = $( "#getid" ).html();
    console.log($( "#getid" ).html());
    $.post("/db/favorite", {productID: id}, function (data) {
      console.log(data.message)
        alert("Success: Item added to favorites.");
    })
  })
});
