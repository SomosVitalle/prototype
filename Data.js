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

let discountState = {
    type: null, // 'total' | 'product'
    reason: '',
    percent: 0,
    value: 0,
    productId: null // solo para tipo 'product'
};

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
const orderSummaryPanel = document.getElementById('order-summary-panel');
const closeOrderSummaryBtn = document.getElementById('close-order-summary-btn');

// --- Descuento ---
const discountBtn = document.getElementById('discount-btn');
const discountModal = document.getElementById('discount-modal');
const discountStepType = document.getElementById('discount-step-type');
const discountStepProduct = document.getElementById('discount-step-product');
const discountStepTotal = document.getElementById('discount-step-total');
const discountTypeProductBtn = document.getElementById('discount-type-product');
const discountTypeTotalBtn = document.getElementById('discount-type-total');
const discountCancelBtn1 = document.getElementById('discount-cancel-btn-1');
const discountProductSelect = document.getElementById('discount-product-select');
const discountReasonInputProduct = document.getElementById('discount-reason-input-product');
const discountPercentProduct = document.getElementById('discount-percent-product');
const discountValueProduct = document.getElementById('discount-value-product');
const discountBackBtnProduct = document.getElementById('discount-back-btn-product');
const discountApplyBtnProduct = document.getElementById('discount-apply-btn-product');
const discountReasonInput = document.getElementById('discount-reason-input');
const discountPercent = document.getElementById('discount-percent');
const discountValue = document.getElementById('discount-value');
const discountBackBtnTotal = document.getElementById('discount-back-btn-total');
const discountApplyBtn = document.getElementById('discount-apply-btn');
const discountRow = document.getElementById('discount-row');
const discountReasonSpan = document.getElementById('discount-reason');
const discountAmountSpan = document.getElementById('discount-amount');

// Initialize the app
function init() {
    // Password input dots
    updatePasswordDots();
    
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
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!productSearch.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });

    // Mostrar modal de descuento
    if (discountBtn) {
        discountBtn.addEventListener('click', () => {
            showDiscountStep('type');
            discountModal.classList.remove('hidden');
        });
    }

    // Cancelar desde selección de tipo
    if (discountCancelBtn1) {
        discountCancelBtn1.addEventListener('click', () => {
            discountModal.classList.add('hidden');
        });
    }

    // Selección de tipo de descuento
    if (discountTypeProductBtn) {
        discountTypeProductBtn.addEventListener('click', () => {
            showDiscountStep('product');
            fillDiscountProductSelect();
        });
    }
    if (discountTypeTotalBtn) {
        discountTypeTotalBtn.addEventListener('click', () => {
            showDiscountStep('total');
        });
    }

    // Atrás en cada paso
    if (discountBackBtnProduct) {
        discountBackBtnProduct.addEventListener('click', () => {
            showDiscountStep('type');
        });
    }
    if (discountBackBtnTotal) {
        discountBackBtnTotal.addEventListener('click', () => {
            showDiscountStep('type');
        });
    }

    // Aplicar descuento por producto
    if (discountApplyBtnProduct) {
        discountApplyBtnProduct.addEventListener('click', () => {
            const productId = parseInt(discountProductSelect.value);
            const reason = discountReasonInputProduct.value.trim();
            const percent = parseFloat(discountPercentProduct.value) || 0;
            const value = parseFloat(discountValueProduct.value) || 0;
            if (!productId || !reason || (percent <= 0 && value <= 0)) {
                alert('Complete todos los campos y un valor de descuento válido.');
                return;
            }
            discountState = {
                type: 'product',
                reason,
                percent,
                value,
                productId
            };
            applyDiscount();
            discountModal.classList.add('hidden');
        });
    }

    // Aplicar descuento al total
    if (discountApplyBtn) {
        discountApplyBtn.addEventListener('click', () => {
            const reason = discountReasonInput.value.trim();
            const percent = parseFloat(discountPercent.value) || 0;
            const value = parseFloat(discountValue.value) || 0;
            if (!reason || (percent <= 0 && value <= 0)) {
                alert('Complete todos los campos y un valor de descuento válido.');
                return;
            }
            discountState = {
                type: 'total',
                reason,
                percent,
                value,
                productId: null
            };
            applyDiscount();
            discountModal.classList.add('hidden');
        });
    }

    // Ocultar modal al hacer click fuera
    if (discountModal) {
        discountModal.addEventListener('click', (e) => {
            if (e.target === discountModal) {
                discountModal.classList.add('hidden');
            }
        });
    }

    // Cerrar modal de recibo al hacer clic en el botón de cierre
    const closeReceiptBtn = document.getElementById('close-receipt-btn');
    if (closeReceiptBtn) {
        closeReceiptBtn.addEventListener('click', () => {
            receiptModal.classList.add('hidden');
        });
    }

    // Botón para cerrar el resumen del pedido
    if (closeOrderSummaryBtn && orderSummaryPanel) {
        closeOrderSummaryBtn.addEventListener('click', () => {
            orderSummaryPanel.classList.add('hidden');
        });
    }

    // Mostrar el resumen si se agrega un producto o se limpia
    const showOrderSummary = () => orderSummaryPanel.classList.remove('hidden');
    // Mostrar siempre que se actualiza el resumen
    const originalUpdateOrderSummary = updateOrderSummary;
    updateOrderSummary = function() {
        showOrderSummary();
        originalUpdateOrderSummary.apply(this, arguments);
    };

    // Mensajes de descuento en tiempo real
    [discountPercent, discountValue, discountPercentProduct, discountValueProduct].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                previewDiscountMessage();
            });
        }
    });
    if (discountProductSelect) {
        discountProductSelect.addEventListener('change', previewDiscountMessage);
    }
    if (discountReasonInputProduct) {
        discountReasonInputProduct.addEventListener('input', previewDiscountMessage);
    }
    if (discountReasonInput) {
        discountReasonInput.addEventListener('input', previewDiscountMessage);
    }
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
    discountState = { type: null, reason: '', percent: 0, value: 0, productId: null };
    
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
            } else {
                // Revert to previous selection
                tableSelect.value = currentTable ? currentTable.id : '';
            }
        } else {
            selectTable(table);
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
    
    let discountAmount = 0;
    currentOrder.forEach((item, index) => {
        let itemTotal = item.product.price * item.quantity;
        // Descuento por producto
        if (discountState.type === 'product' && discountState.productId === item.product.id) {
            if (discountState.percent > 0) {
                discountAmount += itemTotal * (discountState.percent / 100);
            } else if (discountState.value > 0) {
                // Solo una vez por producto, no por cantidad
                discountAmount += discountState.value;
            }
        }
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
    
    // Descuento al total
    if (discountState.type === 'total') {
        if (discountState.percent > 0) {
            discountAmount = total * (discountState.percent / 100);
        } else if (discountState.value > 0) {
            discountAmount = discountState.value;
        }
    }
    
    // Mostrar descuento si existe
    if (discountAmount > 0 && discountState.reason) {
        discountRow.classList.remove('hidden');
        discountReasonSpan.textContent = discountState.reason;
        discountAmountSpan.textContent = `- $${discountAmount.toLocaleString()}`;
        totalSpan.textContent = `$${(total - discountAmount).toLocaleString()}`;
    } else {
        discountRow.classList.add('hidden');
        discountReasonSpan.textContent = '';
        discountAmountSpan.textContent = '';
        totalSpan.textContent = `$${total.toLocaleString()}`;
    }
    
    // Add pulse animation to total
    totalSpan.classList.add('pulse');
    setTimeout(() => {
        totalSpan.classList.remove('pulse');
    }, 500);

    // Mensaje visual de descuento aplicado
    const discountMsg = document.getElementById('discount-applied-message');
    if (discountAmount > 0 && discountState.reason) {
        if (!discountMsg) {
            const msgDiv = document.createElement('div');
            msgDiv.id = 'discount-applied-message';
            msgDiv.className = 'text-green-800 text-center text-sm mb-2 font-medium';
            msgDiv.innerHTML = `Descuento aplicado: <b>${discountState.type === 'product' ? 'Producto' : 'Total'}</b> (${discountState.reason})`;
            orderItems.parentNode.insertBefore(msgDiv, orderItems);
        } else {
            discountMsg.innerHTML = `Descuento aplicado: <b>${discountState.type === 'product' ? 'Producto' : 'Total'}</b> (${discountState.reason})`;
            discountMsg.className = 'text-green-800 text-center text-sm mb-2 font-medium';
        }
    } else if (discountMsg) {
        discountMsg.remove();
    }
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
    discountState = { type: null, reason: '', percent: 0, value: 0, productId: null };
    if (currentOrder.length === 0) return;
    
    if (confirm('¿Está seguro de limpiar el pedido actual?')) {
        orderItems.classList.add('order-item-remove');
        
        setTimeout(() => {
            currentOrder = [];
            updateOrderSummary();
            orderItems.classList.remove('order-item-remove');
        }, 300);
    }
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
        let discountAmount = 0;
        currentOrder.forEach(item => {
            let itemTotal = item.product.price * item.quantity;
            if (discountState.type === 'product' && discountState.productId === item.product.id) {
                if (discountState.percent > 0) {
                    discountAmount += itemTotal * (discountState.percent / 100);
                } else if (discountState.value > 0) {
                    discountAmount += discountState.value;
                }
            }
            total += itemTotal;
        });
        if (discountState.type === 'total') {
            if (discountState.percent > 0) {
                discountAmount = total * (discountState.percent / 100);
            } else if (discountState.value > 0) {
                discountAmount = discountState.value;
            }
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
                                            
                <div class="border-t border-gray-200 pt-3">
                    <div class="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span>$${total.toLocaleString()}</span>
                    </div>
                    ${discountAmount > 0 && discountState.reason ? `
                    <div class="flex justify-between text-green-700 text-sm mt-2">
                        <span>Descuento (${discountState.reason}):</span>
                        <span>- $${discountAmount.toLocaleString()}</span>
                    </div>
                    <div class="flex justify-between font-semibold text-lg mt-2">
                        <span>Total con descuento:</span>
                        <span>$${(total - discountAmount).toLocaleString()}</span>
                    </div>
                    ` : ''}
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

function showDiscountStep(step) {
    discountStepType.classList.add('hidden');
    discountStepProduct.classList.add('hidden');
    discountStepTotal.classList.add('hidden');
    if (step === 'type') {
        discountStepType.classList.remove('hidden');
    } else if (step === 'product') {
        discountStepProduct.classList.remove('hidden');
    } else if (step === 'total') {
        discountStepTotal.classList.remove('hidden');
    }
}

function fillDiscountProductSelect() {
    // Solo productos en el pedido actual
    discountProductSelect.innerHTML = '';
    const uniqueProducts = [];
    currentOrder.forEach(item => {
        if (!uniqueProducts.some(p => p.id === item.product.id)) {
            uniqueProducts.push(item.product);
        }
    });
    if (uniqueProducts.length === 0) {
        discountProductSelect.innerHTML = '<option value="">No hay productos</option>';
        discountProductSelect.disabled = true;
    } else {
        discountProductSelect.disabled = false;
        uniqueProducts.forEach(product => {
            const opt = document.createElement('option');
            opt.value = product.id;
            opt.textContent = product.name;
            discountProductSelect.appendChild(opt);
        });
    }
}

function applyDiscount() {
    updateOrderSummary();
}

function printReceipt() {
    // Oculta el resto de la UI y muestra solo el recibo para impresión
    const originalDisplay = [];
    const appScreen = document.getElementById('app-screen');
    const loginScreen = document.getElementById('login-screen');
    if (appScreen) {
        originalDisplay.push([appScreen, appScreen.style.display]);
        appScreen.style.display = 'none';
    }
    if (loginScreen) {
        originalDisplay.push([loginScreen, loginScreen.style.display]);
        loginScreen.style.display = 'none';
    }
    window.print();
    // Restaurar la UI después de imprimir
    setTimeout(() => {
        originalDisplay.forEach(([el, display]) => {
            el.style.display = display;
        });
    }, 500);
}

// Descargar recibo como PDF centrado
function downloadReceipt() {
    const receiptContainer = receiptContent.querySelector('.receipt-container');
    if (!receiptContainer) return;

    // Opciones de tamaño según dispositivo
    let pdfWidth, pdfHeight;
    if (selectedDevice === 'mobile') {
        pdfWidth = 80; // mm
        pdfHeight = 150; // mm, estimado
    } else {
        pdfWidth = 80; // mm
        pdfHeight = 120; // mm, estimado
    }

    // Centrar el canvas en una hoja blanca
    html2canvas(receiptContainer, {
        backgroundColor: '#fff',
        scale: 2,
        useCORS: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new window.jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [pdfWidth, pdfHeight]
        });
        // Calcular centrado
        const imgProps = pdf.getImageProperties(imgData);
        const pdfPageWidth = pdf.internal.pageSize.getWidth();
        const pdfPageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfPageWidth * 0.95; // dejar margen
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const x = (pdfPageWidth - imgWidth) / 2;
        const y = (pdfPageHeight - imgHeight) / 2;
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save('recibo-bahia-chill.pdf');
    });
}

function previewDiscountMessage() {
    // Mensaje en el modal de descuento
    let msg = '';
    if (!discountModal || discountModal.classList.contains('hidden')) return;
    if (!discountStepProduct.classList.contains('hidden')) {
        // Por producto
        const productId = parseInt(discountProductSelect.value);
        const reason = discountReasonInputProduct.value.trim();
        const percent = parseFloat(discountPercentProduct.value) || 0;
        const value = parseFloat(discountValueProduct.value) || 0;
        if (!productId) {
            msg = '<span class="text-red-500">Seleccione un producto</span>';
        } else if (!reason) {
            msg = '<span class="text-red-500">Ingrese el motivo</span>';
        } else if (percent <= 0 && value <= 0) {
            msg = '<span class="text-red-500">Ingrese un valor de descuento</span>';
        } else {
            const product = products.find(p => p.id === productId);
            msg = `<span class="text-green-800">Código aplicado a <b>${product ? product.name : ''}</b></span>`;
        }
        setDiscountModalMessage(msg, 'product');
    } else if (!discountStepTotal.classList.contains('hidden')) {
        // Al total
        const reason = discountReasonInput.value.trim();
        const percent = parseFloat(discountPercent.value) || 0;
        const value = parseFloat(discountValue.value) || 0;
        if (!reason) {
            msg = '<span class="text-red-500">Ingrese el motivo</span>';
        } else if (percent <= 0 && value <= 0) {
            msg = '<span class="text-red-500">Ingrese un valor de descuento</span>';
        } else {
            msg = `<span class="text-green-800">Código aplicado al <b>total</b></span>`;
        }
        setDiscountModalMessage(msg, 'total');
    }
}

function setDiscountModalMessage(msg, type) {
    let container;
    if (type === 'product') {
        container = discountStepProduct.querySelector('.discount-message');
        if (!container) {
            container = document.createElement('div');
            container.className = 'discount-message mb-2 text-center text-sm';
            discountStepProduct.insertBefore(container, discountStepProduct.firstChild.nextSibling);
        }
    } else if (type === 'total') {
        container = discountStepTotal.querySelector('.discount-message');
        if (!container) {
            container = document.createElement('div');
            container.className = 'discount-message mb-2 text-center text-sm';
            discountStepTotal.insertBefore(container, discountStepTotal.firstChild.nextSibling);
        }
    }
    if (container) container.innerHTML = msg;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
