'use strict';

const users = fetch('/users')
    .then((res) => {
        if (res.status === 200) {
            return res;
        }
        throw new Error(res.statusText);
    })
    .then(res => res.json());

const good = fetch('/goods')
    .then((res) => {
        if (res.status === 200) {
            return res;
        }
        throw new Error(res.statusText);
    })
    .then(goods => goods.json());

const cart = fetch('/cart/0')
    .then((res) => {
        if (res.status === 200) {
            return cart;
        }
        throw new Error(cart.statusText);
    })
    .then(cart => cart.json());

Promise.all([users, good, cart])
    .then((a, b, c) => console.log(a, b, c))
    .catch(e => console.log(e));
