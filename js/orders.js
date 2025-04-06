// Initialize orders and get products
let orders = JSON.parse(localStorage.getItem('orders')) || [];
const products = JSON.parse(localStorage.getItem('products')) || [];

// Display all orders
function renderOrders() {
  const table = document.getElementById('ordersTable');
  table.innerHTML = orders.map(order => {
    const product = products.find(p => p.id === order.productId);
    return `
      <tr>
        <td>${order.customer}</td>
        <td>${product ? product.name : 'Unknown'} (${order.quantity}x)</td>
        <td>₹${order.total}</td>
        <td>${order.status}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editOrder(${order.id})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteOrder(${order.id})">Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

// Show add/edit modal
function showOrderModal(id = null) {
  if (id) {
    const order = orders.find(o => o.id === id);
    document.getElementById('orderEditId').value = id;
    document.getElementById('customer').value = order.customer;
    document.getElementById('productId').value = order.productId;
    document.getElementById('quantity').value = order.quantity;
    document.getElementById('status').value = order.status;
    document.getElementById('orderModalTitle').textContent = 'Edit Order';
  } else {
    document.getElementById('orderEditId').value = '';
    document.getElementById('customer').value = '';
    document.getElementById('productId').value = products[0]?.id || '';
    document.getElementById('quantity').value = '1';
    document.getElementById('status').value = 'Pending';
    document.getElementById('orderModalTitle').textContent = 'Add Order';
  }
  new bootstrap.Modal(document.getElementById('orderModal')).show();
}

// Save order
function saveOrder() {
  const id = document.getElementById('orderEditId').value;
  const customer = document.getElementById('customer').value;
  const productId = parseInt(document.getElementById('productId').value);
  const quantity = parseInt(document.getElementById('quantity').value);
  const status = document.getElementById('status').value;

  const product = products.find(p => p.id === productId);
  const total = product ? product.price * quantity : 0;

  if (id) {
    // Update existing order
    const index = orders.findIndex(o => o.id == id);
    orders[index] = { id: parseInt(id), customer, productId, quantity, total, status };
  } else {
    // Add new order
    const newId = orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    orders.push({ id: newId, customer, productId, quantity, total, status });
  }

  localStorage.setItem('orders', JSON.stringify(orders));
  renderOrders();
  bootstrap.Modal.getInstance(document.getElementById('orderModal')).hide();
}

// Delete order
function deleteOrder(id) {
  if (confirm('Delete this order?')) {
    orders = orders.filter(o => o.id !== id);
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrders();
  }
}

// Initial render
renderOrders();