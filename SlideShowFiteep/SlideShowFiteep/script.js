// Adiciona um evento que aguarda o carregamento completo do conteúdo da página
document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todos os slides e elementos relacionados
    const slides = document.querySelectorAll('.slide'); // Todos os elementos de slide
    const radios = document.querySelectorAll('input[type="radio"]'); // Todos os botões de rádio
    const navigationBars = document.querySelectorAll('.bar'); // Todas as barras de navegação
    const backgroundMusic = document.getElementById('background-music'); // Música de fundo

    let currentIndex = 0; // Índice do slide atual
    let currentThemeIndex = 0; // Índice do tema atual
    backgroundMusic.volume = 0.5; // Define o volume da música de fundo
    backgroundMusic.play(); // Inicia a música de fundo

    // Função para mostrar o slide correspondente com efeito de transição
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = (i === index) ? '1' : '0'; // Apenas o slide atual fica visível
            slide.style.transform = (i === index) ? 'scale(1.05)' : 'scale(1)'; // Efeito de zoom para o slide ativo
        });

        // Atualiza as barras de navegação para indicar o slide atual
        navigationBars.forEach((bar, i) => {
            bar.style.backgroundColor = (i === index) ? '#000000' : '#2c0347'; // Destaca a barra correspondente ao slide ativo
        });
    }

    // Associa eventos de mudança de slide aos botões de rádio
    radios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            currentIndex = index; // Atualiza o índice atual para o slide selecionado
            showSlide(currentIndex); // Mostra o slide correspondente
        });
    });

    // Função para avançar para o próximo slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length; // Avança o índice e volta ao início se necessário
        radios[currentIndex].checked = true; // Marca o próximo slide
        showSlide(currentIndex); // Mostra o slide atual
    }

    // Exibe o slide inicial ao carregar a página
    showSlide(currentIndex);

    // Define a automação para mudar de slide a cada 5 segundos
    setInterval(nextSlide, 5000); // 5000 milissegundos = 5 segundos

    // Define os temas disponíveis com seus nomes e imagens de fundo
    const themes = [
        { name: "earth-theme", image: "url('images/terra.jpg')" },
        { name: "mars-theme", image: "url('images/marte.png')" },
        { name: "jupiter-theme", image: "url('images/sol.jpg')" },
        { name: "nebula-theme", image: "url('images/nebulosa.jpg')" },
        { name: "blackhole-theme", image: "url('images/lua.jpg')" }
    ];

    // Seleciona os botões de tema
    const themeButtons = document.querySelectorAll(".theme-button");

    // Função para aplicar um tema e destacar o botão correspondente
    function applyTheme(index) {
        document.body.style.backgroundImage = themes[index].image; // Aplica a imagem de fundo do tema
        themeButtons.forEach((button, i) => {
            button.style.backgroundColor = (i === index) ? '#ffcc00' : ''; // Destaca o botão com uma cor (amarelo claro) se for o tema selecionado
        });
    }

    // Inicializa o tema aplicado ao carregar a página
    applyTheme(currentThemeIndex);

    // Define a automação para mudar de tema a cada 10 segundos
    setInterval(() => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length; // Avança o índice do tema
        applyTheme(currentThemeIndex); // Aplica o tema atual
    }, 10000); // 10000 milissegundos = 10 segundos

    // Associa eventos de clique aos botões de tema para aplicar o tema selecionado
    themeButtons.forEach((button, index) => {
        button.addEventListener("click", function() {
            currentThemeIndex = index; // Atualiza o índice do tema atual
            applyTheme(currentThemeIndex); // Aplica o tema selecionado
        });
    });
});
