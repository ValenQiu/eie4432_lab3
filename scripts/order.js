function calculatePrice() {
    var sizeInput = document.querySelector('input[name="sizes"]:checked');
    var drinkInput = document.getElementById("drinkInput");
    var price = 0;

    if (drinkInput.value === "bubble-milktea") {
        if (sizeInput && sizeInput.id === "size1") {
            price = 20;
        } else if (sizeInput && sizeInput.id === "size2") {
            price = 30;
        } else if (sizeInput && sizeInput.id === "size3") {
            price = 35;
        }
    } else if (drinkInput.value === "iced-latte") {
        if (sizeInput && sizeInput.id === "size1") {
            price = 20;
        } else if (sizeInput && sizeInput.id === "size2") {
            price = 25;
        } else if (sizeInput && sizeInput.id === "size3") {
            price = 30;
        }
    } else {
        alert("Please select a drink");
        sizeInput.checked = false;
        return;
    }

    var priceElement = document.getElementById("price");
    priceElement.textContent = price.toFixed(2);
}

function validateForm(){
    // Name
    var nameInput = document.getElementById("nameInput").value.trim();
    if (nameInput === ''){
        alert("Please enter your name.");
        return false;
    }
    
    // Drink
    var drinkInput = document.getElementById("drinkInput");
    if (drinkInput.value == "default") {
        alert("Please select a drink first.");
        return false;
    };

    // Size
    var sizeInput = document.getElementsByName("sizes");
    var selectedSize = null;
    for (var i=0; i < sizeInput.length; i++){
        if (sizeInput[i].checked){
            selectedSize = sizeInput[i].value;
            break;
        }
    }

    if (!selectedSize){
        alert("Please select a size");
        return false;
    }

    // Ice
    var iceInput = document.getElementsByName("ice");
    var selectedIce = null;
    for (var i=0; i < iceInput.length; i++){
        if (iceInput[i].checked){
            selectedIce = iceInput[i].value;
            break;
        }
    }

    if (!selectedIce){
        alert("Please select an ice preference");
        return false;
    }

    var sweetnessInput = document.getElementsByName("sweetnesses");
    var selectedSweetness = null;
    for (var i=0; i<sweetnessInput.length; i++){
        if(sweetnessInput[i].checked){
            selectedSweetness = sweetnessInput[i].value;
        }
    }

    if (!selectedSweetness){
        alert("Please select a sweetness level");
        return false;
    }
    return true;
}

function placeOrder(event){
    event.preventDefault();
    if (validateForm() == true){
        // Name
        var name = document.getElementById("nameInput").value.trim();
        // Drink
        var drink = document.getElementById("drinkInput").value;
        // Size
        var size = document.querySelector('input[name="sizes"]:checked').value;
        //Ice
        var ice = document.querySelector('input[name="ice"]:checked').value;
        //Sweetness
        var sweetness = document.querySelector('input[name="sweetnesses"]:checked').value;

        var orderData = [name, drink, size, ice, sweetness];
        //console.log(orderData);
        // alert("Order placed successfully! Thank you for your order.");
        localStorage.setItem("orders", JSON.stringify(orderData));
        $("#orderSuccess").removeClass("d-none");
        // $("#orderSuccess").fadeOut(4000);
        $("#orderSuccess").html('<div id="orderSuccessMessage">'+"Order placed successfully! Thank you for your order."+'</div>');
        // alert($("#orderSuccess").html());
        $("#orderSuccess").addClass("alert alert-success").attr("role","alert");
        $("#orderSuccess").fadeIn(500).delay(3000).fadeOut(500, function(){
            $("#orderSuccessMessage").remove();
            $("#nameInput").removeClass("error-free");
            $("#drinkInput").removeClass("error-free");
            $("#preview").addClass("d-none");
        });
        // Reset the form to its initial state
        document.getElementById("orderForm").reset();
        // Reset the displayed price
        document.getElementById("price").textContent = "0";
    }
}


$(document).ready(function() {
    // Name Input:
    $("#nameInput").on("input",function () {
        var name = $("#nameInput").val().trim();
        console.log(name);
        if (name == ""){
            $(this).addClass("error").removeClass("error-free");
        } else{
            $(this).addClass("error-free").removeClass("error");
        }
    });

    // Drink Selection
    $("#drinkInput").change(function(){
        var drinkSelection = $(this).val();
        if (drinkSelection == "default"){
            $(this).addClass("error").removeClass("error-free");
        } else {
            $(this).addClass("error-free").removeClass("error");
        }

        // Show image
        if (drinkSelection != "default"){
            $("#preview").removeClass("d-none");
            if (drinkSelection == "bubble-milktea"){
                $("#drinkImage").attr("src", "assets/bubble-milktea.png");
                $("#drinkImage").attr("alt", "Bubble Milktea");
            } else if (drinkSelection == "iced-latte"){
                $("#drinkImage").attr("src", "assets/iced-latte.jpg");
                $("#drinkImage").attr("alt", "Iced Latte");
            };
        } else {
            $("#preview").addClass("d-none");
        };
    });
});