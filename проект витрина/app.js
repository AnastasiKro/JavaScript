const products = [
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
	if(order[productId-1] != null)
		alert('This product is already in the basket')
	else{
	order[productId-1] = products[productId-1]
	}
    renderCart();
    rerenderTotalPrice();
}

function removeFromBasket(productId) {
	delete order[productId-1]
	renderCart();
	rerenderTotalPrice();
}


function rerenderTotalPrice() {
	let totalPrice = 0
	order.forEach(el => totalPrice+=el.price)
	document.getElementById('total').innerText = totalPrice;
}

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
