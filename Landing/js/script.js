$(document).ready(function(){
    var year = new Date().getFullYear();
    $("#thisYear").text(year);
    $(".questTitle").on("click", function(){
        var text = $(this).find(".f7-icons").text();
        text = text == "plus_circle_fill" ? "minus_circle_fill" : "plus_circle_fill";
        $(this).find(".f7-icons").text(text);
        $(this).next(".questAns").eq(0).toggle();
    })

    /*$(".linkedPages").on("click", function(e){
        e.preventDefault();
        var visit = $(this).data("visit");
        $('html, body').animate({scrollTop: $("#" + visit).offset().top}, 1000);
    })*/
})