$(document).ready(() => {
    $("#submitBtn").on("click", (e) =>{

            let diet = $( "input:checked" ).val()
            alert(diet);
            // get preferences
            $.get("/db/getPreferences")
            // if no preferences exist, post new preference.
            $.post("/db/addPreferences", {diet: diet});
            // else patch new preference
            e.preventDefault();

    });


});
