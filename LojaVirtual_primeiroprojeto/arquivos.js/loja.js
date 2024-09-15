// Verifica o estado do documento e chama a função ready quando o DOM estiver pronto
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

var totalAmount = 0.00;

// Função principal que é chamada quando o DOM está pronto
function ready() {
    // Carrega o carrinho do localStorage
    loadCartFromLocalStorage();

    // Adiciona eventos de clique aos botões de remover produto
    const removeProductButtons = document.getElementsByClassName("remove-product-button");
    for (var i = 0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener("click", removeProduct);
    }

    // Adiciona eventos de mudança aos inputs de quantidade dos produtos
    const quantityInputs = document.getElementsByClassName("product-qtd-input");
    for (var i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", checkIfInputIsNull);
    }

    // Adiciona eventos de clique aos botões de adicionar produto ao carrinho
    const addToCartButtons = document.getElementsByClassName("button-hover-background");
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", addProductToCart);
    }

    // Adiciona evento de clique ao botão de compra
    const purchaseButton = document.getElementsByClassName("purchase-button")[0];
    if (purchaseButton) {
        purchaseButton.addEventListener("click", makePurchase);
    }

    // Atualiza o total inicialmente
    updateTotal();
}

// Função que é chamada quando o botão de compra é clicado
function makePurchase() {
    if (totalAmount === "0,00") {
        alert("Seu carrinho está vazio!");
    } else {
        alert(
            `
            Obrigado pela sua compra!
            Valor do pedido: R$${totalAmount}
            Volte sempre :)
            `
        );
        // Limpa o carrinho do localStorage e da tabela
        localStorage.removeItem('cartProducts');
        document.querySelector(".cart-table tbody").innerHTML = "";
        updateTotal();
    }
}

// Função que verifica se a quantidade de produto é zero e remove o produto se for
function checkIfInputIsNull(event) {
    if (event.target.value === "0") {
        event.target.parentElement.parentElement.remove();
    }
    updateTotal();
    saveCartToLocalStorage();
}

// Função que adiciona um produto ao carrinho
function addProductToCart(event) {
    const button = event.target;
    const productInfos = button.parentElement;
    const productImage = productInfos.getElementsByClassName("product-image")[0].src;
    const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText;
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText;

    const productsCartName = document.getElementsByClassName("cart-product-title");

    // Verifica se o produto já está no carrinho
    for (var i = 0; i < productsCartName.length; i++) {
        if (productsCartName[i].innerText === productTitle) {
            // Incrementa a quantidade do produto existente
            productsCartName[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++;
            updateTotal();
            saveCartToLocalStorage();
            return;
        }
    }

    // Cria um novo elemento de produto no carrinho
    let newCartProduct = document.createElement("tr");
    newCartProduct.classList.add("cart-product");
    newCartProduct.innerHTML =  
    `
        <td class="product-identification">
            <img class="cart-product-image" src="${productImage}" alt="${productTitle}">
            <strong class="cart-product-title">${productTitle}</strong>
        </td>
        <td>
            <span class="cart-product-price">${productPrice}</span>
        </td>
        <td>
            <input class="product-qtd-input" type="number" value="1" min="0">
            <button class="remove-product-button" type="button">Remover</button>
        </td>
    `;

    // Adiciona o novo produto à tabela do carrinho
    const tableBody = document.querySelector(".cart-table tbody");
    tableBody.append(newCartProduct);

    updateTotal();
    saveCartToLocalStorage();

    // Adiciona eventos ao novo produto no carrinho
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull);
    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct);
}

// Função que remove um produto do carrinho
function removeProduct(event) {
    event.target.parentElement.parentElement.remove();
    updateTotal();
    saveCartToLocalStorage();
}

// Função que atualiza o total do carrinho
function updateTotal() {
    totalAmount = 0;
    let itemCount = 0;
    const cartProducts = document.getElementsByClassName('cart-product');
    for (var i = 0; i < cartProducts.length; i++) {
        const productPrice = parseFloat(cartProducts[i].getElementsByClassName('cart-product-price')[0].innerText.replace('R$', '').replace(',', '.'));
        const productQuantity = parseInt(cartProducts[i].getElementsByClassName('product-qtd-input')[0].value);
        totalAmount += productPrice * productQuantity;
        itemCount += productQuantity;
    }
    totalAmount = totalAmount.toFixed(2);
    totalAmount = totalAmount.replace('.', ',');
    document.querySelector('.cart-total-container span').innerText = 'R$' + totalAmount;
    document.getElementById("cart-count").innerText = itemCount;
}

// Função que salva o carrinho no localStorage
function saveCartToLocalStorage() {
    const cartProducts = document.getElementsByClassName('cart-product');
    const cartData = [];

    for (var i = 0; i < cartProducts.length; i++) {
        const productImage = cartProducts[i].getElementsByClassName('cart-product-image')[0].src;
        const productTitle = cartProducts[i].getElementsByClassName('cart-product-title')[0].innerText;
        const productPrice = cartProducts[i].getElementsByClassName('cart-product-price')[0].innerText;
        const productQuantity = cartProducts[i].getElementsByClassName('product-qtd-input')[0].value;

        // Armazena os dados do produto em um array
        cartData.push({
            productImage,
            productTitle,
            productPrice,
            productQuantity
        });
    }

    // Salva o array de dados no localStorage
    localStorage.setItem('cartProducts', JSON.stringify(cartData));
}

// Função que carrega o carrinho do localStorage
function loadCartFromLocalStorage() {
    const cartData = JSON.parse(localStorage.getItem('cartProducts'));

    if (!cartData) {
        return;
    }

    const tableBody = document.querySelector(".cart-table tbody");
    tableBody.innerHTML = "";

    for (var i = 0; i < cartData.length; i++) {
        const product = cartData[i];

        // Cria um novo elemento de produto no carrinho
        let newCartProduct = document.createElement("tr");
        newCartProduct.classList.add("cart-product");

        newCartProduct.innerHTML =  
        `
            <td class="product-identification">
                <img class="cart-product-image" src="${product.productImage}" alt="${product.productTitle}">
                <strong class="cart-product-title">${product.productTitle}</strong>
            </td>
            <td>
                <span class="cart-product-price">${product.productPrice}</span>
            </td>
            <td>
                <input class="product-qtd-input" type="number" value="${product.productQuantity}" min="0">
                <button class="remove-product-button" type="button">Remover</button>
            </td>
        `;

        // Adiciona o novo produto à tabela do carrinho
        tableBody.append(newCartProduct);

        // Adiciona eventos ao novo produto no carrinho
        newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull);
        newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct);
    }

    updateTotal();
}

// Função que alterna a visibilidade do carrinho
function toggleCart() {
    const cartSection = document.querySelector(".cart-table").parentElement;
    if (cartSection.style.display === "none" || cartSection.style.display === "") {
        cartSection.style.display = "block";
    } else {
        cartSection.style.display = "none";
    }
}

