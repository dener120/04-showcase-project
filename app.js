let products = [
    {
        id: 1,
        title: 'Lenovo Yoga',
        price: 3000,
    },
    {
        id: 2,
        title: 'Acer Aspire',
        price: 1800,
    },
    {
        id: 3,
        title: 'Dell Vostro',
        price: 3400
    },
];

let order = [];

function addToBasket(productId) {
    // TODO: добавить проверку наличия товара в заказе (при наличии выдать alert, что товар уже в корзине)

    if (order.some((product) => product.id === productId)) return alert('Товар уже в корзине')

    order = [
        products.find((product) => product.id === productId),
        ...order,
    ]
    // TODO: если товар еще не в корзине, добавить его из массива products

    // Эти строчки не трогаем, они отвечают за переотрисовку страницы
    renderCart();
    rerenderTotalPrice();
}

function removeFromBasket(productId) {
    // TODO: описать логику удаления товара из корзины

    order = order.filter(product => product.id !== productId)

    // Эти строчки не трогаем, они отвечают за переотрисовку страницы
    renderCart();
    rerenderTotalPrice();
}


function rerenderTotalPrice() {
    // TODO: опишите функционал подсчета общей стоимости заказа

    // Не меняйте эту строчку
    document.getElementById('total').innerText =
        order.reduce((sum, product) => sum + product.price, 0);
}

// Этот метод остается без изменений
function renderCart() {
    const cart = document.getElementById('basket-items');

    cart.innerHTML = '';
    order.forEach(item => {
        const el = document.createElement('li');
        el.innerText = item.title;
        el.onclick = () => removeFromBasket(item.id);
        cart.appendChild(el);
    })
}

function renderProduct() {
    const shop = document.querySelector('.shop')

    shop.innerHTML = '';
    products.forEach(item => {
        const el = document.createElement('div');
        el.innerHTML = `
            <h2>${item.title}</h2>
            <p>Price: <span class="price"> ${item.price}</p>
            <button onclick="addToBasket(${item.id})">Buy</button>
        `
        shop.appendChild(el);
    })
}


function addProduct() {
    const productName = document.getElementById('input-product-name');
    const productPrice = document.getElementById('input-product-price');

    let product = {
        id: products.map((product) => product.id++).sort((a, b) => b.id - a.id)[0],
        title: productName.value,
        price: +productPrice.value,
    }

    products = [
        product,
        ...products
    ]

    renderProduct()
}

document.getElementById("btn-create").addEventListener("click", (event) =>{
    event.preventDefault()
    addProduct()
});