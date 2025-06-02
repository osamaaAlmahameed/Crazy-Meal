class Order {
  constructor(mealName, mealPrice, mealImage) {
    this.id = Date.now() + Math.random(); 
    this.mealName = mealName;
    this.mealPrice = parseFloat(mealPrice).toFixed(2);
    this.mealImage = mealImage;
  }
}

let orders = JSON.parse(localStorage.getItem('orders')) || [];


function saveOrders() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function renderOrders() {
  const container = document.getElementById('ordersContainer');
  container.innerHTML = '';

  if (!orders.length) {
    container.innerHTML = '<p class="text-center text-gray-500 mt-4">No orders yet.</p>';
    return;
  }

  orders.forEach(order => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${order.mealImage}" alt="${order.mealName}" />
      <h3>${order.mealName}</h3>
      <p>$${order.mealPrice}</p>
      <button class="delete-btn">Delete</button>
    `;

    card.querySelector('.delete-btn').addEventListener('click', () => {
      orders = orders.filter(o => o.id !== order.id);
      saveOrders();
      renderOrders();
    });

    container.appendChild(card);
  });
}

document.getElementById('orderForm').addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('mealName').value.trim();
  const price = document.getElementById('mealPrice').value;
  const image = document.getElementById('mealImage').value.trim();

  if (name && price && image) {
    orders.push(new Order(name, price, image));
    saveOrders();
    renderOrders();
    e.target.reset();
  }
});

document.getElementById('clearOrders').addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all orders?')) {
    orders = [];
    saveOrders();
    renderOrders();
  }
});


renderOrders();
