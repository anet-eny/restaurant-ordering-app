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
    cartArr.push(targetItemObj)
    console.log(cartArr)

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