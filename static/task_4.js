'use strict';


const goodList = document.querySelector('.goods-list');
const state = {count: 12};
const loader = document.querySelector('.loader');

let goods = null;


/**
 * Функция, которая добавляет товары в родительский контейнер.
 * @param {array} array Массив товаров.
 */
function addBlocks(array) {
    for (let i = 0; i < state.count; i++) {
        goodList.appendChild(renderBlock(array[i]));
    }
}

/**
 * Функция, которая получает массив товаров с сервера.
 * @param {string} url URL, на который делается запрос.
 */
function loadGoods(url) {
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res;
            }
            throw new Error(res.statusText);
        })
        .then(data => data.json())
        .then(parsedData => {
            goods = parsedData;
            loader.classList.remove('hidden');
            setTimeout(() => addBlocks(goods), 500);
        })
        .catch(err => console.log(err));
}

loadGoods('/goods');

/**
 * Функция, которая добавляет товары к уже имеющимся в родительском контейнере.
 */
function renderGoods() {
    loader.classList.remove('hidden');
    if (state.count < goods.length) {
        state.count += goods.length - state.count;
        goodList.innerHTML = '';
        addBlocks(goods);
    }
    loader.classList.add('hidden');
}

/**
 * Функция, которая добавляет товары после события скролла.
 */
function scrollHandler() {
    if (goodList.getBoundingClientRect().bottom - window.innerHeight <= 0) {
        setTimeout(() => renderGoods(), 500);
    }
}

window.addEventListener('scroll', scrollHandler);
