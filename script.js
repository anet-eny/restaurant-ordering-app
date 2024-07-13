import { menuArray } from "./data.js";

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
                        <p class="${price}">$14</p> 
                    </div>
                </div>
                <button class="add-btn" data-id=${id}>+</button> 
        </div>
        `
    }).join("")
}

document.getElementById('menu').innerHTML = getMenuHtml(menuArray)