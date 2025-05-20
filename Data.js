// Data
const users = [
    { username: "JUAN", password: "7294" },
    { username: "SANTIAGO", password: "3168" },
    { username: "SOFIA", password: "4835" },
    { username: "JULIAN", password: "1590" },
    { username: "INVITADO", password: "6247" }
];

const tables = [
    { id: 1, label: "Mesa 1" },
    { id: 2, label: "Mesa 2" },
    { id: 3, label: "Mesa 3" },
    { id: 4, label: "Mesa 4" },
    { id: 5, label: "Mesa 5" },
    { id: 6, label: "VIP" }
];

const products = [
    { id: 1, name: "Aguila", price: 4000, category: "cerveza" },
    { id: 2, name: "Poker", price: 4000, category: "cerveza" },
    { id: 3, name: "Budwaiser", price: 3000, category: "cerveza" },
    { id: 4, name: "Costena", price: 3000, category: "cerveza" },
    { id: 5, name: "Coronita", price: 4000, category: "cerveza" },
    { id: 6, name: "Corona", price: 8000, category: "cerveza" },
    { id: 7, name: "Stella Artois", price: 8000, category: "cerveza" },
    { id: 8, name: "1/2 Lider", price: 45000, category: "licor" },
    { id: 9, name: "1 Lider", price: 85000, category: "licor" },
    { id: 10, name: "1/2 Ron", price: 40000, category: "licor" },
    { id: 11, name: "1 Ron", price: 80000, category: "licor" },
    { id: 12, name: "Buchanan's", price: 220000, category: "licor" },
    { id: 13, name: "Onix Negro", price: 80000, category: "licor" },
    { id: 14, name: "Bacardi", price: 80000, category: "licor" },
    { id: 15, name: "Onix Amarillo", price: 90000, category: "licor" },
    { id: 16, name: "Cigarrillo", price: 1000, category: "otros" },
    { id: 17, name: "Michelada", price: 2000, category: "coctel" },
    { id: 18, name: "Agua", price: 3000, category: "bebida" },
    { id: 19, name: "Cafe", price: 3000, category: "bebida" },
    { id: 20, name: "Mani", price: 3000, category: "snack" },
    { id: 21, name: "Coca Cola", price: 4000, category: "bebida" },
    { id: 22, name: "Soda", price: 4000, category: "bebida" },
    { id: 23, name: "Sprite", price: 4000, category: "bebida" },
    { id: 24, name: "Ron con Cola", price: 28000, category: "coctel" },
    { id: 25, name: "Pina Chill", price: 28000, category: "coctel" },
    { id: 26, name: "Mojito", price: 28000, category: "coctel" },
    { id: 27, name: "Vodka Martini", price: 40000, category: "coctel" },
    { id: 28, name: "Pescera", price: 40000, category: "coctel" },
    { id: 29, name: "Fuego de Bahia", price: 12000, category: "coctel" },
    { id: 30, name: "Extasis Tropical", price: 12000, category: "coctel" },
    { id: 31, name: "Seduccion Tropical", price: 12000, category: "coctel" },
    { id: 32, name: "Mar de pasion", price: 12000, category: "coctel" },
    { id: 33, name: "Atardecer Tropical", price: 12000, category: "coctel" },
    { id: 34, name: "Naufragio", price: 12000, category: "coctel" },
    { id: 35, name: "Brisa Acida", price: 12000, category: "coctel" },
    { id: 36, name: "Tormenta Azul", price: 12000, category: "coctel" },
    { id: 37, name: "Rayo Caribeno", price: 12000, category: "coctel" }
];

// State
let currentUser = null;
let currentTable = null;
let currentOrder = [];
let currentProduct = null;
let editingIndex = null;
let pdfGenerationTimeout = null;
let selectedDevice = null;
let currentDiscount = null;

// Estado para evitar bucles de sincronización
let isSyncingDiscount = false;

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const passwordDots = document.getElementById('password-dots');
const togglePassword = document.getElementById('toggle-password');
const loginBtn = document.getElementById('login-btn');
const loginText = document.getElementById('login-text');
const loginSpinner = document.getElementById('login-spinner');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const currentUserSpan = document.getElementById('current-user');
const tableSelect = document.getElementById('table-select');
const currentTableSpan = document.getElementById('current-table');
const productsGrid = document.getElementById('products-grid');
const productSearch = document.getElementById('product-search');
const searchResults = document.getElementById('search-results');
const orderItems = document.getElementById('order-items');
const totalSpan = document.getElementById('total');
const clearOrderBtn = document.getElementById('clear-order-btn');
const finalizeOrderBtn = document.getElementById('finalize-order-btn');
const finalizeText = document.getElementById('finalize-text');
const finalizeSpinner = document.getElementById('finalize-spinner');
const productModal = document.getElementById('product-modal');
const modalProductName = document.getElementById('modal-product-name');
const modalProductPrice = document.getElementById('modal-product-price');
const productQuantity = document.getElementById('product-quantity');
const decrementQuantity = document.getElementById('decrement-quantity');
const incrementQuantity = document.getElementById('increment-quantity');
const productNotes = document.getElementById('product-notes');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelModalBtn = document.getElementById('cancel-modal-btn');
const addToOrderBtn = document.getElementById('add-to-order-btn');
const addToOrderText = document.getElementById('add-to-order-text');
const addToOrderSpinner = document.getElementById('add-to-order-spinner');
const customerName = document.getElementById('customer-name');
const customerIdType = document.getElementById('customer-id-type');
const customerId = document.getElementById('customer-id');
const customerContact = document.getElementById('customer-contact');
const receiptModal = document.getElementById('receipt-modal');
const receiptContent = document.getElementById('receipt-content');
const downloadReceiptBtn = document.getElementById('download-receipt-btn');
const printReceiptBtn = document.getElementById('print-receipt-btn');
const deviceModal = document.getElementById('device-modal');
const deviceOptions = document.querySelectorAll('.device-option');
const cancelDeviceBtn = document.getElementById('cancel-device-btn');
const discountModal = document.getElementById('discount-modal');
const discountReasonInput = document.getElementById('discount-reason-input');
const discountPercentInput = document.getElementById('discount-percent');
const discountValueInput = document.getElementById('discount-value');
const discountCancelBtn = document.getElementById('discount-cancel-btn');
const discountApplyBtn = document.getElementById('discount-apply-btn');
const discountRow = document.getElementById('discount-row');
const discountReasonSpan = document.getElementById('discount-reason');
const discountAmountSpan = document.getElementById('discount-amount');

// Initialize the app
function init() {
    // Password input dots
    updatePasswordDots();
    
    // Ocultar la fila de descuento al iniciar
    discountRow.classList.add('hidden');
    
    // Event listeners
    passwordInput.addEventListener('input', updatePasswordDots);
    togglePassword.addEventListener('click', togglePasswordVisibility);
    loginBtn.addEventListener('click', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    tableSelect.addEventListener('change', handleTableSelect);
    productSearch.addEventListener('input', filterProducts);
    clearOrderBtn.addEventListener('click', clearOrder);
    finalizeOrderBtn.addEventListener('click', showReceipt);
    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);
    decrementQuantity.addEventListener('click', () => adjustQuantity(-1));
    incrementQuantity.addEventListener('click', () => adjustQuantity(1));
    addToOrderBtn.addEventListener('click', addToOrder);
    downloadReceiptBtn.addEventListener('click', showDeviceSelection);
    printReceiptBtn.addEventListener('click', printReceipt);
    
    // Device selection
    deviceOptions.forEach(option => {
        option.addEventListener('click', () => {
            selectedDevice = option.dataset.device;
            deviceModal.classList.add('hidden');
            downloadReceipt();
        });
    });
    
    cancelDeviceBtn.addEventListener('click', () => {
        deviceModal.classList.add('hidden');
    });
    
    // Prevent quantity input from going below 1
    productQuantity.addEventListener('change', () => {
        if (productQuantity.value < 1) {
            productQuantity.value = 1;
        }
    });
    
    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeModal();
        }
        if (e.target === receiptModal) {
            receiptModal.classList.add('hidden');
        }
        if (e.target === deviceModal) {
            deviceModal.classList.add('hidden');
        }
        if (e.target === discountModal) {
            closeDiscountModal();
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!productSearch.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });
}

// Toggle password visibility
function togglePasswordVisibility() {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.classList.replace('fa-eye', 'fa-eye-slash');
        passwordDots.style.display = 'none';
    } else {
        passwordInput.type = 'password';
        togglePassword.classList.replace('fa-eye-slash', 'fa-eye');
        passwordDots.style.display = 'flex';
    }
}

// Update password dots based on input length
function updatePasswordDots() {
    passwordDots.innerHTML = '';
    const length = passwordInput.value.length;
    
    for (let i = 0; i < 4; i++) {
        const dot = document.createElement('span');
        dot.className = 'password-dot';
        dot.style.opacity = i < length ? '1' : '0.2';
        passwordDots.appendChild(dot);
    }
}

// Handle login
function handleLogin() {
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    if (!username || !password) {
        showLoginError();
        return;
    }
    
    // Show loading state
    loginText.classList.add('hidden');
    loginSpinner.classList.remove('hidden');
    
    // Simulate network delay
    setTimeout(() => {
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            currentUser = user;
            showAppScreen();
        } else {
            showLoginError();
        }
        
        // Hide loading state
        loginText.classList.remove('hidden');
        loginSpinner.classList.add('hidden');
    }, 800);
}

// Show login error
function showLoginError() {
    loginError.classList.remove('hidden');
    passwordInput.classList.add('shake');
    setTimeout(() => {
        passwordInput.classList.remove('shake');
    }, 500);
}

// Show app screen
function showAppScreen() {
    loginScreen.classList.add('hidden');
    appScreen.classList.remove('hidden');
    currentUserSpan.textContent = currentUser.username;
}

// Handle logout
function handleLogout() {
    // Clear all data
    currentUser = null;
    currentTable = null;
    currentOrder = [];
    clearDiscount();
    
    // Reset form fields
    usernameInput.value = '';
    passwordInput.value = '';
    tableSelect.value = '';
    productSearch.value = '';
    customerName.value = '';
    customerId.value = '';
    customerContact.value = '';
    
    // Reset UI
    loginError.classList.add('hidden');
    updatePasswordDots();
    updateOrderSummary();
    
    // Show login screen
    appScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    
    // Clear any local storage
    localStorage.removeItem('pedidoPendiente');
    sessionStorage.clear();
}

// Handle table selection
function handleTableSelect() {
    const tableId = parseInt(tableSelect.value);
    const table = tables.find(t => t.id === tableId);
    
    if (table) {
        if (currentOrder.length > 0) {
            if (confirm('¿Está seguro de cambiar de mesa? Se perderá el pedido actual.')) {
                selectTable(table);
                clearOrder();
                clearDiscount();
            } else {
                // Revert to previous selection
                tableSelect.value = currentTable ? currentTable.id : '';
            }
        } else {
            selectTable(table);
            clearDiscount();
        }
    }
}

// Select table
function selectTable(table) {
    currentTable = table;
    currentTableSpan.textContent = table.label;
    
    // Enable product search
    productSearch.disabled = false;
    productSearch.classList.remove('disabled');
    productSearch.focus();
}

// Filter products by search term
function filterProducts() {
    const searchTerm = productSearch.value.toLowerCase().trim();
    
    if (searchTerm.length === 0) {
        searchResults.classList.add('hidden');
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    showSearchResults(filteredProducts, searchTerm);
}

// Show search results in dropdown
function showSearchResults(filteredProducts, searchTerm) {
    searchResults.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        searchResults.innerHTML = `
            <div class="search-result-item text-gray-500">
                No se encontraron productos
            </div>
        `;
        searchResults.classList.remove('hidden');
        return;
    }
    
    filteredProducts.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        
        // Highlight search term in product name
        const regex = new RegExp(searchTerm, 'gi');
        const displayName = product.name.replace(regex, match => `<span class="highlight">${match}</span>`);
        
        resultItem.innerHTML = `
            <div class="flex justify-between">
                <span>${displayName}</span>
                <span class="text-primary font-medium">$${product.price.toLocaleString()}</span>
            </div>
        `;
        
        resultItem.addEventListener('click', () => {
            openProductModal(product);
            productSearch.value = '';
            searchResults.classList.add('hidden');
        });
        
        searchResults.appendChild(resultItem);
    });
    
    searchResults.classList.remove('hidden');
}

// Open product modal
function openProductModal(product) {
    currentProduct = product;
    modalProductName.textContent = product.name;
    modalProductPrice.textContent = `$${product.price.toLocaleString()}`;
    productQuantity.value = 1;
    productNotes.value = '';
    productModal.classList.remove('hidden');
    
    // Set default button text
    addToOrderText.textContent = 'Agregar';
    addToOrderBtn.onclick = addToOrder;
    editingIndex = null;
}

// Close product modal
function closeModal() {
    productModal.classList.add('hidden');
    currentProduct = null;
    editingIndex = null;
}

// Adjust quantity
function adjustQuantity(change) {
    let newQuantity = parseInt(productQuantity.value) + change;
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > 50) newQuantity = 50;
    productQuantity.value = newQuantity;
}

// Add product to order
function addToOrder() {
    const quantity = parseInt(productQuantity.value);
    
    // Validate quantity
    if (quantity < 1) {
        alert('La cantidad no puede ser menor a 1');
        return;
    }
    
    const notes = productNotes.value;
    
    // Show loading state
    addToOrderText.classList.add('hidden');
    addToOrderSpinner.classList.remove('hidden');
    
    // Simulate processing delay
    setTimeout(() => {
        if (editingIndex !== null) {
            // Update existing item
            currentOrder[editingIndex] = {
                product: currentProduct,
                quantity: quantity,
                notes: notes
            };
        } else {
            // Check if identical product already exists in order
            const existingIndex = currentOrder.findIndex(item => 
                item.product.id === currentProduct.id && 
                item.notes === notes
            );
            
            if (existingIndex !== -1) {
                // Update quantity of existing item
                currentOrder[existingIndex].quantity += quantity;
            } else {
                // Add new item to order
                currentOrder.push({
                    product: currentProduct,
                    quantity: quantity,
                    notes: notes
                });
            }
        }
        
        // Update order summary
        updateOrderSummary();
        closeModal();
        
        // Enable finalize order button
        finalizeOrderBtn.disabled = false;
        
        // Hide loading state
        addToOrderText.classList.remove('hidden');
        addToOrderSpinner.classList.add('hidden');
    }, 500);
}

// Update order summary
function updateOrderSummary() {
    if (currentOrder.length === 0) {
        orderItems.innerHTML = '<div class="text-center text-gray-500 py-4">No hay productos agregados</div>';
        totalSpan.textContent = '$0';
        finalizeOrderBtn.disabled = true;
        discountRow.classList.add('hidden'); // Asegura que esté oculta si no hay productos
        currentDiscount = null; // Solo limpiar el descuento, no abrir/cerrar modal
        return;
    }
    
    let total = 0;
    orderItems.innerHTML = '';
    
    // Use two columns if more than 10 items
    const useTwoColumns = currentOrder.length > 10;
    
    if (useTwoColumns) {
        orderItems.classList.add('two-columns');
    } else {
        orderItems.classList.remove('two-columns');
    }
    
    currentOrder.forEach((item, index) => {
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'border-b border-gray-200 py-3 order-item-animation';
        orderItem.innerHTML = `
            <div class="flex justify-between items-start mb-1">
                <div>
                    <h4 class="font-medium">${item.product.name} <span class="text-sm text-gray-500">x${item.quantity}</span></h4>
                    ${item.notes ? `<p class="text-xs text-gray-500 mt-1">${item.notes}</p>` : ''}
                </div>
                <span class="font-medium">$${itemTotal.toLocaleString()}</span>
            </div>
            <div class="flex justify-end space-x-3">
                <button class="edit-item btn-secondary text-sm px-3 py-1 rounded" data-index="${index}">
                    Editar
                </button>
                <button class="delete-item btn-danger text-sm px-3 py-1 rounded" data-index="${index}">
                    Eliminar
                </button>
            </div>
        `;
        
        // Add event listener to edit button
        const editBtn = orderItem.querySelector('.edit-item');
        editBtn.addEventListener('click', (e) => {
            const index = parseInt(editBtn.dataset.index);
            editOrderItem(index);
        });
        
        // Add event listener to delete button
        const deleteBtn = orderItem.querySelector('.delete-item');
        deleteBtn.addEventListener('click', (e) => {
            const index = parseInt(deleteBtn.dataset.index);
            deleteOrderItem(index);
        });
        
        orderItems.appendChild(orderItem);
    });
    
    // Apply discount if exists
    let discount = 0;
    if (currentDiscount && currentDiscount.value > 0) {
        discount = Math.min(currentDiscount.value, total);
        discountRow.classList.remove('hidden');
        discountReasonSpan.textContent = currentDiscount.reason;
        discountAmountSpan.textContent = `- $${discount.toLocaleString()}`;
    } else {
        discountRow.classList.add('hidden');
    }
    
    totalSpan.textContent = `$${(total - discount).toLocaleString()}`;
    
    // Add pulse animation to total
    totalSpan.classList.add('pulse');
    setTimeout(() => {
        totalSpan.classList.remove('pulse');
    }, 500);
}

// Edit order item
function editOrderItem(index) {
    const item = currentOrder[index];
    currentProduct = item.product;
    editingIndex = index;
    
    modalProductName.textContent = item.product.name;
    modalProductPrice.textContent = `$${item.product.price.toLocaleString()}`;
    productQuantity.value = item.quantity;
    productNotes.value = item.notes;
    productModal.classList.remove('hidden');
    
    // Change the add button to update button
    addToOrderText.textContent = 'Actualizar';
    addToOrderBtn.onclick = function() {
        const quantity = parseInt(productQuantity.value);
        const notes = productNotes.value;
        
        // Update the item
        currentOrder[index].quantity = quantity;
        currentOrder[index].notes = notes;
        
        // Update order summary
        updateOrderSummary();
        closeModal();
    };
}

// Delete order item
function deleteOrderItem(index) {
    if (confirm('¿Está seguro de eliminar este producto del pedido?')) {
        const itemToRemove = document.querySelector(`.delete-item[data-index="${index}"]`).closest('.order-item-animation');
        itemToRemove.classList.add('order-item-remove');
        
        setTimeout(() => {
            currentOrder.splice(index, 1);
            updateOrderSummary();
        }, 300);
    }
}

// Clear order
function clearOrder() {
    if (currentOrder.length === 0) return;
    
    if (confirm('¿Está seguro de limpiar el pedido actual?')) {
        orderItems.classList.add('order-item-remove');
        
        setTimeout(() => {
            currentOrder = [];
            clearDiscount();
            updateOrderSummary();
            discountRow.classList.add('hidden'); // Oculta la fila de descuento al limpiar
            orderItems.classList.remove('order-item-remove');
        }, 300);
    }
}

// Clear discount
function clearDiscount() {
    currentDiscount = null;
    discountRow.classList.add('hidden'); // Oculta la fila de descuento al limpiar descuento
}

// Show receipt
function showReceipt() {
    if (currentOrder.length === 0) {
        alert('No hay productos en el pedido');
        return;
    }
    
    if (!currentTable) {
        alert('Por favor seleccione una mesa');
        return;
    }
    
    // Show loading state
    finalizeText.classList.add('hidden');
    finalizeSpinner.classList.remove('hidden');
    
    // Simulate processing delay
    setTimeout(() => {
        // Calculate total
        let total = 0;
        currentOrder.forEach(item => {
            total += item.product.price * item.quantity;
        });
        
        let discountHtml = '';
        let discount = 0;
        if (currentDiscount && currentDiscount.value > 0) {
            discount = Math.min(currentDiscount.value, total);
            discountHtml = `
                <div class="flex justify-between text-green-700 mb-2">
                    <span>Descuento (${currentDiscount.reason}):</span>
                    <span>-$${discount.toLocaleString()}</span>
                </div>
            `;
        }
        
        // Format date and time
        const now = new Date();
        const formattedDate = now.toLocaleDateString('es-CO', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        const formattedTime = now.toLocaleTimeString('es-CO', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toUpperCase();
        
        // Create receipt content
        receiptContent.innerHTML = `
            <div class="receipt-container">
                <div class="receipt-header">
                    <h1 class="receipt-title">BAHIA CHILL</h1>
                    <div class="receipt-subheader">
                        <p>Comanda Digital</p>
                        <p class="company-info">Bahia Chill S.A.S | NIT: 123456789-0</p>
                    </div>
                    <div class="receipt-meta">
                        <p>${formattedDate} - ${formattedTime}</p>
                        <p><span class="font-medium">Mesa:</span> ${currentTable.label}</p>
                        <p><span class="font-medium">Atendido por:</span> ${currentUser.username}</p>
                    </div>
                </div>
                                            
                <table class="w-full mb-4">
                    <thead>
                        <tr class="border-b border-gray-200">
                            <th class="text-left py-2 text-sm font-medium">Producto</th>
                            <th class="text-right py-2 text-sm font-medium">Cant.</th>
                            <th class="text-right py-2 text-sm font-medium">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${currentOrder.map(item => `
                            <tr class="border-b border-gray-100">
                                <td class="py-2 text-sm">
                                    ${item.product.name}
                                    ${item.notes ? `<br><span class="text-xs text-gray-500">${item.notes}</span>` : ''}
                                </td>
                                <td class="text-right py-2 text-sm">${item.quantity}</td>
                                <td class="text-right py-2 text-sm">$${(item.product.price * item.quantity).toLocaleString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                                            
                ${discountHtml}
                                            
                <div class="border-t border-gray-200 pt-3">
                    <div class="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span>$${(total - discount).toLocaleString()}</span>
                    </div>
                </div>
                                            
                ${customerName.value || customerId.value || customerContact.value ? `
                <div class="mt-6 border-t border-gray-200 pt-4">
                    <h2 class="text-lg font-semibold mb-2">Datos del Cliente</h2>
                    ${customerName.value ? `<p class="text-sm mb-1"><span class="font-medium">Nombre:</span> ${customerName.value}</p>` : ''}
                    ${customerId.value ? `<p class="text-sm mb-1"><span class="font-medium">${customerIdType.options[customerIdType.selectedIndex].text}:</span> ${customerId.value}</p>` : ''}
                    ${customerContact.value ? `<p class="text-sm"><span class="font-medium">Contacto:</span> ${customerContact.value}</p>` : ''}
                </div>
                ` : ''}
                                            
                <div class="receipt-footer">
                    <p class="footer-text"><strong>Sistema de facturación de Bahia Chill ®</strong><br><strong>Todos los derechos reservados</strong></p>
                </div>
            </div>
        `;
        
        // Show receipt modal
        receiptModal.classList.remove('hidden');
        
        // Hide loading state
        finalizeText.classList.remove('hidden');
        finalizeSpinner.classList.add('hidden');
    }, 800);
}

// Show device selection modal
function showDeviceSelection() {
    deviceModal.classList.remove('hidden');
    selectedDevice = null;
}

// Download receipt as PDF
function downloadReceipt() {
    if (currentOrder.length === 0) {
        alert('No hay productos en el pedido para generar el PDF');
        return;
    }
    
    // Clear any existing timeout
    if (pdfGenerationTimeout) {
        clearTimeout(pdfGenerationTimeout);
    }
    
    const { jsPDF } = window.jspdf;
    
    // Determine PDF format based on selected device
    const isMobile = selectedDevice === 'mobile';
    const pdfFormat = isMobile ? [80, 297] : 'a4'; // Rollo térmico para móvil, A4 para desktop
    const pdfOrientation = isMobile ? 'portrait' : 'landscape';
    
    const pdf = new jsPDF({
        orientation: pdfOrientation,
        unit: 'mm',
        format: pdfFormat
    });
    
    // Create a temporary container for pagination
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = isMobile ? '80mm' : '210mm';
    document.body.appendChild(tempContainer);
    
    // Calculate how many products per page
    const productsPerPage = isMobile ? 25 : 30;
    const totalPages = Math.ceil(currentOrder.length / productsPerPage);
    
    // Show loading state
    downloadReceiptBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Generando...';
    downloadReceiptBtn.disabled = true;
    
    // Set timeout for PDF generation (15 seconds max)
    pdfGenerationTimeout = setTimeout(() => {
        downloadReceiptBtn.innerHTML = '<i class="fas fa-download mr-2"></i> Descargar PDF';
        downloadReceiptBtn.disabled = false;
        document.body.removeChild(tempContainer);
        alert('La generación del PDF está tomando más tiempo de lo esperado. Por favor intente nuevamente.');
    }, 15000);
    
    // Generate each page
    generatePage(0);
    
    function generatePage(pageIndex) {
        const startIndex = pageIndex * productsPerPage;
        const endIndex = Math.min(startIndex + productsPerPage, currentOrder.length);
        const pageProducts = currentOrder.slice(startIndex, endIndex);
        
        // Calculate total for this page
        let pageTotal = 0;
        pageProducts.forEach(item => {
            pageTotal += item.product.price * item.quantity;
        });
        
        // Format date and time
        const now = new Date();
        const formattedDate = now.toLocaleDateString('es-CO', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        const formattedTime = now.toLocaleTimeString('es-CO', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toUpperCase();
        
        // Only show discount and final total on the last page
        let discountHtml = '';
        let discount = 0;
        if (pageIndex === totalPages - 1 && currentDiscount && currentDiscount.value > 0) {
            discount = Math.min(currentDiscount.value, getOrderTotal());
            discountHtml = `
                <div class="flex justify-between text-green-700 mb-2">
                    <span>Descuento (${currentDiscount.reason}):</span>
                    <span>-$${discount.toLocaleString()}</span>
                </div>
            `;
        }
        
        // Create page content
        const pageContent = document.createElement('div');
        pageContent.className = 'receipt-container';
        pageContent.style.width = isMobile ? '80mm' : '100%';
        pageContent.style.padding = isMobile ? '5px' : '15px';
        pageContent.style.fontSize = isMobile ? '10px' : '12px';
        
        pageContent.innerHTML = `
            <div class="receipt-header">
                <h1 class="receipt-title" style="font-size: ${isMobile ? '18px' : '22px'}">BAHIA CHILL</h1>
                <div class="receipt-subheader">
                    <p style="font-size: ${isMobile ? '12px' : '14px'}">Comanda Digital</p>
                    <p class="company-info">Bahia Chill S.A.S | NIT: 123456789-0</p>
                </div>
                <div class="receipt-meta">
                    <p>${formattedDate} - ${formattedTime}</p>
                    <p><span class="font-medium">Mesa:</span> ${currentTable.label}</p>
                    <p><span class="font-medium">Atendido por:</span> ${currentUser.username}</p>
                    ${totalPages > 1 ? `<p><span class="font-medium">Página:</span> ${pageIndex + 1} de ${totalPages}</p>` : ''}
                </div>
            </div>
            <table style="width: 100%; margin-bottom: ${isMobile ? '10px' : '15px'};">
                <thead>
                    <tr class="border-b border-gray-200">
                        <th class="text-left py-2" style="font-size: ${isMobile ? '10px' : '12px'}">Producto</th>
                        <th class="text-right py-2" style="font-size: ${isMobile ? '10px' : '12px'}">Cant.</th>
                        <th class="text-right py-2" style="font-size: ${isMobile ? '10px' : '12px'}">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${pageProducts.map(item => `
                        <tr class="border-b border-gray-100">
                            <td class="py-2" style="font-size: ${isMobile ? '10px' : '12px'}">
                                ${item.product.name}
                                ${item.notes ? `<br><span class="text-xs text-gray-500">${item.notes}</span>` : ''}
                            </td>
                            <td class="text-right py-2" style="font-size: ${isMobile ? '10px' : '12px'}">${item.quantity}</td>
                            <td class="text-right py-2" style="font-size: ${isMobile ? '10px' : '12px'}">$${(item.product.price * item.quantity).toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            ${discountHtml}
            <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between font-semibold" style="font-size: ${isMobile ? '14px' : '16px'}">
                    <span>Total${pageIndex === totalPages - 1 && discount > 0 ? ' (con descuento)' : ''}:</span>
                    <span>$${(pageIndex === totalPages - 1 ? (getOrderTotal() - discount) : pageTotal).toLocaleString()}</span>
                </div>
            </div>
            ${pageIndex === totalPages - 1 ? `
            ${customerName.value || customerId.value || customerContact.value ? `
            <div class="mt-6 border-t border-gray-200 pt-4">
                <h2 class="text-lg font-semibold mb-2">Datos del Cliente</h2>
                ${customerName.value ? `<p class="text-sm mb-1"><span class="font-medium">Nombre:</span> ${customerName.value}</p>` : ''}
                ${customerId.value ? `<p class="text-sm mb-1"><span class="font-medium">${customerIdType.options[customerIdType.selectedIndex].text}:</span> ${customerId.value}</p>` : ''}
                ${customerContact.value ? `<p class="text-sm"><span class="font-medium">Contacto:</span> ${customerContact.value}</p>` : ''}
            </div>
            ` : ''}
            <div class="receipt-footer">
                <p class="footer-text"><strong>Sistema de facturación de Bahia Chill ®</strong><br><strong>Todos los derechos reservados</strong></p>
            </div>
            ` : ''}
        `;
        
        tempContainer.innerHTML = '';
        tempContainer.appendChild(pageContent);
        
        // Convert to canvas
        html2canvas(pageContent, {
            scale: 2,
            useCORS: true,
            logging: true,
            letterRendering: true,
            dpi: 300,
            width: isMobile ? 300 : 800,
            windowWidth: isMobile ? 300 : 800
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png', 1.0);
            const imgProps = pdf.getImageProperties(imgData);
            
            // Calculate dimensions
            let pageWidth, pageHeight;
            if (isMobile) {
                pageWidth = 80; // Ancho del PDF en mm
                pageHeight = (imgProps.height * pageWidth) / imgProps.width;
            } else {
                // For desktop (A4 landscape)
                pageWidth = pdf.internal.pageSize.getWidth() - 30; // Margins
                pageHeight = (imgProps.height * pageWidth) / imgProps.width;
            }
            
            // Add page (except first page)
            if (pageIndex > 0) {
                pdf.addPage();
            }
            
            // Add image to PDF
            pdf.addImage(imgData, 'PNG', isMobile ? 0 : 15, isMobile ? 0 : 15, pageWidth, pageHeight);
            
            // Check if we need to generate more pages
            if (pageIndex < totalPages - 1) {
                generatePage(pageIndex + 1);
            } else {
                // Finalize PDF
                pdf.setCreator('Bahia Chill SAS');
                pdf.setLanguage('es-CO');
                pdf.setProperties({
                    title: `Comanda ${currentTable.label}`,
                    subject: 'Recibo de pedido',
                    author: currentUser.username
                });
                
                const fileName = `Comanda_${currentTable.label.replace(' ', '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
                pdf.save(fileName);
                
                // Reset order
                currentOrder = [];
                updateOrderSummary();
                customerName.value = '';
                customerId.value = '';
                customerContact.value = '';
                receiptModal.classList.add('hidden');
                
                // Reset button
                downloadReceiptBtn.innerHTML = '<i class="fas fa-download mr-2"></i> Descargar PDF';
                downloadReceiptBtn.disabled = false;
                
                // Clean up
                document.body.removeChild(tempContainer);
                clearTimeout(pdfGenerationTimeout);
            }
        }).catch(error => {
            console.error('Error generating PDF:', error);
            alert('Ocurrió un error al generar el PDF. Por favor intente nuevamente.');
            
            // Reset button
            downloadReceiptBtn.innerHTML = '<i class="fas fa-download mr-2"></i> Descargar PDF';
            downloadReceiptBtn.disabled = false;
            clearTimeout(pdfGenerationTimeout);
            document.body.removeChild(tempContainer);
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
