import { menuArray } from "./data.js";

const modal = document.getElementById('modal')
const cartArr = []

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddToCart(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        handleRemoveFromCart(e.target.dataset.remove)
    } else if (e.target.id === "purchase") {
        modal.style.display = "block"
    } 
})

document.getElementById('payment-form').addEventListener('submit', function(e){
    e.preventDefault()
    modal.style.display = "none"
    renderCompleteMessage()
})

function handleAddToCart(itemId) {
    const targetItemObj = menuArray.find(function(item){
        return itemId === item.id.toString()
    })
    if (targetItemObj){
        cartArr.push(targetItemObj)
    }
    if (cartArr.length === 1) {
        renderFullCart()
    } else if (cartArr.length > 1) {
        renderNewCartItem(targetItemObj)
    }
    updateTotalPrice()
}

function handleRemoveFromCart(index) {
    cartArr.splice(index, 1)
    renderFullCart()
    updateTotalPrice()
}

function renderCompleteMessage() {
    document.getElementById('cart-el').innerHTML = `
        <div class="complete-container">
            <h2>Thanks, James! Your order is on its way!</h2>
        </div>
    `
    cartArr.length = 0
}


function renderFullCart() {
    const index = cartArr.length - 1
    let cartHtml = ''
    cartArr.forEach(item => {
        const { name, price } = item
        cartHtml += `
            <div class="cart-item">
                <div class="left-content">
                    <h2>${name}</h2>
                    <button class="remove-btn" data-remove=${index}>remove</button>
                </div>
                <p class="item-price">$${price}</p> 
            </div>
        `
        
    })
    document.getElementById('cart-el').innerHTML = `
                <h2>Your order</h2>
                <div id="cart-list" class="cart-list">
                    ${cartHtml}
                </div>
                <div class="total">
                    <h2>Total price:</h2>
                    <p id="total-price" class="item-price"></p> 
                </div>
                <button id="purchase" class="purchase-btn">Complete order</button>
    `
}

function renderNewCartItem(item) {
    const index = cartArr.length - 1
    const { name, price } = item
    const addedItemHtml = `
        <div class="cart-item">
            <div class="left-content">
                <h2>${name}</h2>
                <button class="remove-btn" data-remove=${index}>remove</button>
            </div>
            <p class="item-price">$${price}</p> 
        </div> 
    `
    document.getElementById('cart-list').innerHTML += addedItemHtml
}

function updateTotalPrice(){
    const totalPrice = cartArr.reduce((total, item) => total + item.price, 0)
    document.getElementById('total-price').textContent = `$${totalPrice}`
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
                <button class="add-btn" data-add=${id}>+</button> 
        </div>
        `
    }).join("")
}

document.getElementById('menu-el').innerHTML = getMenuHtml(menuArray)