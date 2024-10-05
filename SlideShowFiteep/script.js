document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slide');
    const radios = document.querySelectorAll('input[type="radio"]');
    const navigationBars = document.querySelectorAll('.bar');
    const backgroundMusic = document.getElementById('background-music');

    let currentIndex = 0; // Índice do slide atual
    backgroundMusic.volume = 0.5; // Define o volume da música de fundo
    backgroundMusic.play(); // Inicia a música de fundo

    // Função para mostrar o slide correspondente
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = (i === index) ? '1' : '0'; // Apenas o slide atual fica visível
            slide.style.transform = (i === index) ? 'scale(1.05)' : 'scale(1)'; // Efeito de zoom
        });

        // Atualiza as barras de navegação
        navigationBars.forEach((bar, i) => {
            bar.style.backgroundColor = (i === index) ? '#000000' : '#2c0347';
        });
    }

    // Associa os eventos de mudança de slide
    radios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });

    // Função para avançar para o próximo slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length; // Avança o índice e volta ao início se necessário
        radios[currentIndex].checked = true; // Marca o próximo slide
        showSlide(currentIndex); // Mostra o slide atual
    }

    // Animação de estrelas cadentes
    setInterval(() => {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        // Define a posição inicial aleatória
        const startX = Math.random() * window.innerWidth;
        shootingStar.style.left = `${startX}px`;
        document.body.appendChild(shootingStar);
        
        setTimeout(() => {
            shootingStar.remove();
        }, 2000); // Dura 2 segundos antes de remover
    }, 1000); // A cada 1 segundo cria uma estrela cadente

    // Exibe o slide inicial
    showSlide(currentIndex);

    // Define a automação para mudar de slide a cada 5 segundos
    setInterval(nextSlide, 5000); // 5000 milissegundos = 5 segundos
});


// Função para criar estrelas de fundo
function createBackgroundStars() {
    const numberOfStars = 500; // Número de estrelas que você deseja no fundo
    const body = document.body;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Define a posição aleatória das estrelas
        const size = Math.random() * 3 + 1; // Tamanho da estrela entre 1px e 4px
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + 'vw'; // Largura total da viewport
        star.style.top = Math.random() * 100 + 'vh'; // Altura total da viewport

        // Adiciona a estrela ao corpo
        body.appendChild(star);
    }
}

// Chama a função para criar as estrelas ao carregar a página
document.addEventListener("DOMContentLoaded", createBackgroundStars);
