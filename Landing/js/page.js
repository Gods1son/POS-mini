var baseUrl = "https://posbackend.herokuapp.com/"; //    "https://mogulend.herokuapp.com/" "http://localhost:3000/"
$(document).ready(function(){
    var year = new Date().getFullYear();
    $("#thisYear").text(year);
    getPageContent();

})

function getPageContent(){
    
    var urlLink = getUrlVars();
    if(urlLink.id == undefined || urlLink.id == null){
        $(".no-data").find("div").eq(0).text("Page Not Found");
        $(".no-data").removeClass("display-none");
        return;
    }
    $(".productInfo").addClass("display-none");
    $(".loader").removeClass("display-none");
    var data = {};
    data.id = urlLink.id;
    $.ajax({
        method: "POST",
        url: baseUrl + "returnPage",
        data: data,
        success: function(res){
            $(".loader").addClass("display-none");
            if(res == ""){
                $(".no-data").find("div").eq(0).text("Page ID not found");
                $(".no-data").removeClass("display-none");
                return;
            }
            if(!res.successCode){
                if(res.message == "missing"){
                    $(".no-data").removeClass("display-none");
                    //alert("url doesn't exist");
                    return;
                }
            }
            if(res.successCode){
                $(".productInfo").removeClass("display-none");
                if(res.comp_name != ""){
                    $(".logoHeader").addClass("display-none");
                    $(".hero-title").html(res.comp_name);
                }
                
                if(res.product_name != ""){
                    $(".product_name_parent").removeClass("display-none");
                    $("#product_name").html(res.product_name);
                }
                if(res.product_description != ""){
                    $(".product_description_parent").removeClass("display-none");
                    $("#product_description").html(res.product_description);
                }
                if(res.product_selling_price != ""){
                    $(".product_selling_price_parent").removeClass("display-none");
                    $("#product_selling_price").html(res.product_selling_price);
                }
                
                if(res.other_notes != undefined && res.other_notes != ""){
                    $(".product_notes_parent").removeClass("display-none");
                    $("#product_notes").html(res.other_notes);
                }

                if(res.comp_phone != undefined && res.comp_phone != ""){
                    $(".my-footer").removeClass("display-none");
                    var phone = '<span class="valueName"><a class="external" target="_system" href="tel:' + res.comp_phone + '"><i class="icon f7-icons phone">phone</i><span class="in-link">' + res.comp_phone + '</span></a></span>';
                    $(".sellerPhone").empty();
                    $(".sellerPhone").append(phone);
                }

                if(res.comp_email != undefined && res.comp_email != ""){
                    $(".my-footer").removeClass("display-none");
                    var email = '<span class="valueName"><a class="external" target="_system" href="mailto:' + res.comp_email + '"><i class="icon f7-icons envelope">envelope</i><span class="in-link">' + res.comp_email + '</span></a></span>';
                    $(".sellerEmail").empty();
                    $(".sellerEmail").append(email);
                }
            }
        },
        error: function(err){
            console.log(err);
            $(".loader").addClass("display-none");
            $(".no-data").find("div").eq(0).text("No data retrieved");
            $(".no-data").removeClass("display-none");
        }
      })
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}