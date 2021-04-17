if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready())
}else{
    ready()
}

function ready(){
var removeCartItems=document.getElementsByClassName("btn-outline-danger");
for(var i=0;i< removeCartItems.length;i++){
    var button = removeCartItems[i];
    button.addEventListener("click", removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName("cart-quantity-input")
    
for(var i=0;i<quantityInputs.length;i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)   
    }


    var addToCartButtons = document.getElementsByClassName("shop-item-btn")
for(var i=0;i<addToCartButtons.length;i++){
        
        var add = addToCartButtons[i]
        add.addEventListener("click", addToCart)
    }
    document.getElementsByClassName("purchase-btn")[0].addEventListener("click", purchase)
}

function purchase(){
        var total = document.getElementsByClassName('total-price')[0].innerText
        alert("Yayy!!! Your Purchase Was Successful :)")
        alert("You Purchased Goods Worth: " + total)
        var inCart = document.getElementsByClassName("cart-items")[0]
        while (inCart.hasChildNodes()){
            inCart.removeChild(inCart.firstChild)
        }
        updateCartTotal
}

function addToCart(event){
    var addButton = event.target
    var strElement = addButton.parentElement.parentElement
    var itemAdded = strElement.getElementsByClassName('shop-item-title')[0].innerText
    var itemPrice = strElement.getElementsByClassName('shop-item-price')[0].innerText
    var itemImage = strElement.getElementsByClassName('shop-item-img')[0].src
    addItemToCart(itemAdded, itemPrice, itemImage)
    updateCartTotal()
}
function addItemToCart(name, price, image){
   var cartRow = document.createElement("div")
   cartRow.classList.add('cart-row')
   var cartItems = document.getElementsByClassName('cart-items')[0]
   var cartItemsNames = document.getElementsByClassName("cart-item-title")
   for(var i=0;i<cartItemsNames.length;i++){
       if(cartItemsNames[i].innerText == name){
           alert("Item already in cart")
           return
       }
   }
   var cartContents = 
   `
   <div class="cart-item cart-column">
   <img class=" cart-item-img" src="${image}" height="100px">
   <span class="cart-item-title">${name}</span>
   </div>   
   <span class="cart-price cart-column">${price}</span>
   <div class="cart-quantity cart-column">
   <input class="cart-quantity-input" type="number" value="1">
   <button type="button" class="btn btn-outline-danger">REMOVE</button>
   </div>`
   cartRow.innerHTML = cartContents 
   cartItems.append(cartRow)
   cartRow.getElementsByClassName("btn-outline-danger")[0].addEventListener("click",removeCartItem)
   cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("click",quantityChanged)
}

function removeCartItem(event){
    var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName("cart-container")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")
    var total = 0
    for(var i=0;i<cartRows.length;i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(priceElement.innerText.replace("£",""))
        var quantity = quantityElement.value
        total += (price*quantity)
    }
    total = Math.round(total * 100)/100
    document.getElementsByClassName("total-price")[0].innerText = '£'+total
}