class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }

    addProduct(product) {
        const existingProduct = this.items.find(item => item.id === product.id);

        const timestamp = new Date().toLocaleString();

        if (existingProduct) {
            existingProduct.quantity += 1;
            existingProduct.timestamp = timestamp; 
        } else {
            this.items.push({ ...product, quantity: 1, timestamp: timestamp });
        }

        this.updateCart();
    }

    removeProduct(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateCart();
    }

    updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        cartItemsContainer.innerHTML = ''; // Clear existing cart items
        let total = 0;

        this.items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${item.name} - $${item.price} x ${item.quantity}
                <br>
                <small>Added at: ${item.timestamp}</small> <!-- Display the timestamp -->
            `;
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => {
                this.removeProduct(item.id);
            });

            listItem.appendChild(deleteButton);
            cartItemsContainer.appendChild(listItem);

            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = total.toFixed(2);
    }
}

const cart = new Cart();

const products = [
    new Product(1, 'Steel Water Bottle', 12, 'https://i5.walmartimages.com/asr/0f2af864-d32c-475c-b47b-b9bd29a4b8dc_2.ed169d64f09b8d5ffbf4326ee1375646.png'),
    new Product(2, 'Lego Set', 750, 'https://th.bing.com/th/id/OIP.K6BiBO6MjAnOJ8wgptxsgAEsEr?rs=1&pid=ImgDetMain'),
    new Product(3, 'Desktop PC', 400, 'PC.png'),
    new Product(4, 'Split A/C', 580, 'Split AC.png'),
    new Product(5, 'Projector', 247, 'https://i8.amplience.net/i/epsonemear/ls12000b_3_png'),
    new Product(6, 'Running Shoes', 70, 'https://rukminim1.flixcart.com/image/1664/1664/shoe/s/z/x/7-642833-nike-8-original-imadykhgqgsyna8g.jpeg?q=90')
];

function displayProducts() {
    const productListContainer = document.getElementById('products');
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        
        productListContainer.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addProduct(product);
    }
}

displayProducts();
