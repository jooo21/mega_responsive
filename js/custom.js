var nav_on = $(".nav_on");

nav_on.click(function(e){
    e.preventDefault();
    $(this).toggleClass("on");
    console.log("click");
})