'use strict';

const template = document.querySelector('#tmplt');
const goodContainer = document.querySelector('.goods-container');
const loaderBlock = document.querySelector('.loader-block');

let newArr = null;


/**
 * Функция, которая генерит блок товара.
 * @param {object} good Объект товара.
 * @return {Node} Блок товара.
 */
function renderBlock(good) {
    const block = template.querySelector('.block').cloneNode(true);

    block.querySelector('.block__id').textContent = `ID - ${good.id + 1}`;
    block.querySelector('.block__name').textContent = `Name: ${good.productName}`;
    block.querySelector('.block__price').textContent = `Price: ${good.price}`;
    block.querySelector('.block__color').textContent = `Color: ${good.color}`;
    block.querySelector('.block__productMaterial').textContent = `Material: ${good.productMaterial}`;

    return block;
}

/**
 * Функция, которая добавляет товары в родительский контейнер.
 * @param {array} array Массив товаров.
 */
function addGoodsBlocks(array) {
    array.forEach(elem => goodContainer.appendChild(renderBlock(elem)));
}

/**
 * Функция, которая добавляет сообщение об ошибке в родительский контейнер.
 */
function error() {
    goodContainer.textContent = 'Данные не подгрузились!';
    loaderBlock.classList.add('hidden');
}

/**
 * Функция, которая получает массив товаров с сервера.
 * @param {string} url URL, на который делается запрос.
 */
function loadEndorseProduct(url) {
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res;
            }
            throw new Error(res.statusText);
        })
        .then(data => data.json())
        .then(parsedData => {
            newArr = parsedData.slice(5, 9);
            setTimeout(() => loaderBlock.classList.add('hidden'), 500);
            setTimeout(() => addGoodsBlocks(newArr), 500);
        })
        .catch(() => error());
}

loadEndorseProduct('/goods');