'use strict';

fetch('/users').then(res => {
    if (res.status === 200) {
        return res;
    }
    throw new Error(res.statusText)
})
    .then(res => res.json())
    .then((data) => console.log(data))
    .then(() => fetch('/goods').then(res => {
            if (res.status === 200) {
                return res;
            }
            throw new Error(res.statusText)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch((e) => console.log(e))
    )
    .then(() => fetch('/cart/0').then(res => {
        if (res.status === 200) {
            return res;
        }
        throw new Error(res.statusText)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch((e) => console.log(e))
    )
    .catch((e) => console.log(e));
