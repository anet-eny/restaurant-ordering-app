import { menuArray } from "./data.js";

let cartArr = []

document.addEventListener('click', function(e){
    if(e.target.dataset.id){
        addToCart(e.target.dataset.id)
    }
})

function addToCart(itemId) {
    const targetItemObj = menuArray.filter(function(item){
        return itemId === item.id.toString()
    })[0]
    if (targetItemObj){
        cartArr.push(targetItemObj)
    }
    if (cartArr.length === 1) {
        getCartHtml()
    } else if (cartArr.length > 1) {
        addCartHtml()
    }

}

function getCartHtml() {
    let cartHtml = ''
    cartArr.map(item => {
        const {
            name,
            price
        } = item
        
        cartHtml += `
        <h2 class="order-h2">Your order</h2>
                <div class="order-list">
                    <div class="left-content">
                        <h2>${name}</h2>
                        <button class="remove-btn">remove</button>
                    </div>
                    <p class="item-price">$${price}</p> 
                </div>
               
                <div class="total">
                    <h2>Total price:</h2>
                    <p class="item-price">$14</p> 
                </div>
                <button class="purchase-btn">Complete order</button>
        `
        
    })
    return renderCart(cartHtml)
}

function addCartHtml() {

}


function renderCart(renderItem) {
    document.getElementById('order-el').innerHTML = renderItem
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