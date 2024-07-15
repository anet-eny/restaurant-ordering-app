import { menuArray } from "./data.js";

let cartArr = []

document.addEventListener('click', function(e){
    if(e.target.dataset.id){
        handleAddToCart(e.target.dataset.id)
    }
})

function handleAddToCart(itemId) {
    const targetItemObj = menuArray.find(item => itemId === item.id.toString())
    if (targetItemObj){
        const cartItem = cartArr.find(item => itemId === item.id.toString())
        if (cartItem) {
            cartItem.quantity += 1
            updateItemCart(cartItem)
        } else {
            const newCartItem = { ...targetItemObj, quantity: 1 }
            cartArr.push(newCartItem)
            renderNewCartItem(newCartItem)
        }
    }
    if (cartArr.length === 1) {
        renderFullCart()
    } 

    updateTotalPrice()
}

function renderNewCartItem(item) {
    const { name, price, quantity } = item
    const addedItemHtml = `
        <div class="cart-item">
            <div class="left-content">
                <h2>${name}</h2>
                <h2 id="quantity" class="quantity">${quantity}x</h2>
                <button class="remove-btn">remove</button>
            </div>
            <p class="item-price">$${price}</p> 
        </div> 
    `
    document.getElementById('cart-list').innerHTML += addedItemHtml
}


function updateItemCart(cartItem) {
    document.getElementById('quantity').textContent = `${cartItem.quantity}`
   
}

function updateTotalPrice(){
    const totalPrice = cartArr.reduce((total, item) => total + item.price, 0)
    document.getElementById('total-price').textContent = `$${totalPrice}`
}



function renderFullCart() {
    let cartHtml = ''
    cartArr.forEach(item => {
        const { name, price, quantity } = item
        cartHtml += `
            <div class="cart-item">
                <div class="left-content">
                    <h2>${name}</h2>
                    <h2 id="quantity" class="quantity">${quantity}x</h2>
                    <button class="remove-btn">remove</button>
                </div>
                <p class="item-price">$${price}</p> 
            </div>
        `
        
    })
    document.getElementById('cart-el').innerHTML = `
                <h2 class="order-h2">Your order</h2>
                <div id="cart-list" class="cart-list">
                    ${cartHtml}
                </div>
                <div class="total">
                    <h2>Total price:</h2>
                    <p id="total-price" class="item-price"></p> 
                </div>
                <button class="purchase-btn">Complete order</button>
    `
}


function getMenuHtml (menuArray) {
    return menuArray.map(item => {
        const {
            name,
            ingredients,
            id,
            price,
            emoji
        } = item
        return `
        <div class="item">
                <div class="left-content">
                    <span class="emoji">${emoji}</span>
                    <div class="item-inner">
                        <h2>${name}</h2>
                        <p class="item-desc">${ingredients}</p>
                        <p class="item-price">$${price}</p> 
                    </div>
                </div>
                <button class="add-btn" data-id=${id}>+</button> 
        </div>
        `
    }).join("")
}

document.getElementById('menu-el').innerHTML = getMenuHtml(menuArray)