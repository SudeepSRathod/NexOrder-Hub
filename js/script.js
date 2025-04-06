// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    
    function updateStats() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        
        document.getElementById('totalProducts').textContent = products.length;
        document.getElementById('totalOrders').textContent = orders.length;
        
        // Calculate total revenue
        let revenue = 0;
        orders.forEach(order => {
            order.items.forEach(item => {
                const product = products.find(p => p.id === item.productId);
                if (product) revenue += product.price * item.quantity;
            });
        });
        document.getElementById('totalRevenue').textContent = revenue.toFixed(2);
    }
});