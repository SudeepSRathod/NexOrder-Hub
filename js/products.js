// Initialize products array
let products = JSON.parse(localStorage.getItem('products')) || [];

// Display all products
function renderProducts() {
  const table = document.getElementById('productsTable');
  table.innerHTML = products.map(product => `
    <tr>
      <td>${product.name}</td>
      <td>₹${product.price}</td>
      <td>${product.stock}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editProduct(${product.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

// Show add/edit modal
function showModal(id = null) {
  if (id) {
    const product = products.find(p => p.id === id);
    document.getElementById('editId').value = id;
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('stock').value = product.stock;
    document.getElementById('modalTitle').textContent = 'Edit Product';
  } else {
    document.getElementById('editId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('modalTitle').textContent = 'Add Product';
  }
  new bootstrap.Modal(document.getElementById('productModal')).show();
}

// Save product
function saveProduct() {
  const id = document.getElementById('editId').value;
  const name = document.getElementById('name').value;
  const price = parseFloat(document.getElementById('price').value);
  const stock = parseInt(document.getElementById('stock').value);

  if (id) {
    // Update existing product
    const index = products.findIndex(p => p.id == id);
    products[index] = { id: parseInt(id), name, price, stock };
  } else {
    // Add new product
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push({ id: newId, name, price, stock });
  }

  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
  bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
}

// Delete product
function deleteProduct(id) {
  if (confirm('Delete this product?')) {
    products = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
  }
}

// Initial render
renderProducts();