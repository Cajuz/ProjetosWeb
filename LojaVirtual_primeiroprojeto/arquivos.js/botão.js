document.addEventListener("DOMContentLoaded", function() { //Menu
    //Oculta e mostrar ele após apenas passar o mouse por cima dele
    const toggleButton = document.getElementById("toggleButton");
    const navbarLinks = document.getElementById("navbarLinks");

    toggleButton.addEventListener("mouseover", function() {
        navbarLinks.classList.add("active");
    });

    navbarLinks.addEventListener("mouseleave", function() {
        navbarLinks.classList.remove("active");
    });
});

document.getElementById ('satisfaction-form').addEventListener('submit', function(event) {  //Formulário
    event.preventDefault(); // Evita o envio do formulário

    // Coleta os dados do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rating = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value;

    // Mostra uma mensagem de agradecimento
    const responseMessage = document.getElementById('response-message');
    responseMessage.innerHTML = `
        <p>Obrigado, ${name}! Agradecemos seu feedback.</p>
        <p>Email: ${email}</p>
        <p>Classificação: ${rating}</p>
        <p>Comentários: ${comments}</p>
    `;

    // Limpa o formulário
    document.getElementById('satisfaction-form').reset();
});


function filterProducts() { //Barra de Pesquisa
    const searchInput = document.getElementById('pesquisa').value.toLowerCase();
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => { //Manipulado da div dos produtos, mostrando o que é chamado pelo titulo, e ocultando o resto
        const sectionTitle = section.querySelector('h2').innerText.toLowerCase();
        if (sectionTitle.includes(searchInput)) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}
//Carrosel SLides
// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todos os elementos de slide dentro da ul com a classe .slides
    const slides = document.querySelectorAll(".slides");
    // Seleciona o botão "next" (próximo)
    const nextButton = document.querySelector("[data-change-slide-button='next']");
    // Seleciona o botão "previous" (anterior)
    const previousButton = document.querySelector("[data-change-slide-button='previous']");
    // Define o índice do slide atual
    let currentSlide = 0;

   // Função para mostrar o slide com o índice especificado
   function showSlide(index) {
    // Remove o atributo "data-active" do slide atual
    slides[currentSlide].removeAttribute("data-active");
    // Calcula o novo índice, garantindo que ele fique dentro dos limites do array de slides
    currentSlide = (index + slides.length) % slides.length;
    // Adiciona o atributo "data-active" ao novo slide atual
    slides[currentSlide].setAttribute("data-active", "");
}

    // Adiciona um evento de clique ao botão "next" (próximo)
    nextButton.addEventListener("click", () => {
        // Mostra o próximo slide
        showSlide(currentSlide + 1);
    });

    // Adiciona um evento de clique ao botão "previous" (anterior)
    previousButton.addEventListener("click", () => {
        // Mostra o slide anterior
        showSlide(currentSlide - 1);
    });

    // Adiciona uma funcionalidade de auto slide (deslize automático)
    setInterval(() => {
        // Mostra o próximo slide a cada 3 segundos
        showSlide(currentSlide + 1);
    }, 3000); // Altere o slide a cada 3 segundos
});