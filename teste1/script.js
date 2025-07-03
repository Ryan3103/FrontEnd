document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica do Dropdown do Usuário
    const userMenuButton = document.getElementById('userMenuButton');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    const userMenuContainer = document.getElementById('userMenuContainer');

    if (userMenuButton && userDropdownMenu && userMenuContainer) {
        userMenuButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede que o clique no botão feche o menu imediatamente
            userDropdownMenu.classList.toggle('show-dropdown');
        });

        document.addEventListener('click', (event) => {
            // Fecha o dropdown se o clique for fora do menu ou do botão
            if (!userMenuContainer.contains(event.target)) {
                userDropdownMenu.classList.remove('show-dropdown');
            }
        });
    }

    // 2. Lógica para carregar Jogos Populares
    const gamesContainer = document.getElementById('game-container'); // O ID que adicionamos no HTML

    if (gamesContainer) {
        const fetchPopularGames = async () => {
            try {
                // Limpa o conteúdo atual do container antes de adicionar os novos jogos
                gamesContainer.innerHTML = ''; 

                const response = await fetch('http://localhost:8080/api/games/cards');
                
                if (!response.ok) {
                    throw new Error(`Erro HTTP! Status: ${response.status}`);
                }
                
                const games = await response.json();

                if (games.length === 0) {
                    gamesContainer.innerHTML = '<p class="no-games-message">Nenhum jogo popular encontrado no momento. Tente novamente mais tarde.</p>';
                    return;
                }

                // ---- MODIFICAÇÃO AQUI: Limitar a 8 jogos ----
                const gamesToDisplay = games.slice(0, 8); // Pega apenas os primeiros 8 jogos

                gamesToDisplay.forEach(game => { // Itera sobre os jogos limitados
                    const gameCard = document.createElement('div');
                    gameCard.className = 'game-card'; 

                    const rating = parseFloat(game.averageRating); 
                    const fullStars = Math.floor(rating);
                    const hasHalfStar = rating % 1 >= 0.5;
                    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

                    gameCard.innerHTML = `
                        <div class="game-image-container">
                            <img src="${game.imageUrl}" alt="${game.title}" class="game-image">
                            <div class="game-genre">${game.genre}</div>
                            <div class="quick-rate">
                                <div class="quick-rate-content">
                                    <span class="quick-rate-label">Avaliação Rápida:</span>
                                    <div class="custom-rating">
                                        <input type="radio" id="star5-${game.id}" name="rating-${game.id}" value="5">
                                        <label for="star5-${game.id}"><i class="ri-star-fill"></i></label>
                                        <input type="radio" id="star4-${game.id}" name="rating-${game.id}" value="4">
                                        <label for="star4-${game.id}"><i class="ri-star-fill"></i></label>
                                        <input type="radio" id="star3-${game.id}" name="rating-${game.id}" value="3">
                                        <label for="star3-${game.id}"><i class="ri-star-fill"></i></label>
                                        <input type="radio" id="star2-${game.id}" name="rating-${game.id}" value="2">
                                        <label for="star2-${game.id}"><i class="ri-star-fill"></i></label>
                                        <input type="radio" id="star1-${game.id}" name="rating-${game.id}" value="1">
                                        <label for="star1-${game.id}"><i class="ri-star-fill"></i></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="game-details">
                            <h3 class="game-title">${game.title}</h3>
                            <div class="game-rating">
                                <div class="game-stars">
                                    ${'<i class="ri-star-fill"></i>'.repeat(fullStars)}
                                    ${hasHalfStar ? '<i class="ri-star-half-fill"></i>' : ''}
                                    ${'<i class="ri-star-line"></i>'.repeat(emptyStars)}
                                </div>
                                <span class="game-rating-text">${game.averageRating}/10 (${game.reviewCount} avaliações)</span>
                            </div>
                            <div class="game-footer">
                                <span class="game-developer">${game.developer}</span>
                                <button class="rate-button">Avaliar</button>
                            </div>
                        </div>
                    `;
                    gamesContainer.appendChild(gameCard);
                });

            } catch (error) {
                console.error('Erro ao carregar jogos populares:', error);
                gamesContainer.innerHTML = '<p class="error-message">Não foi possível carregar os jogos populares. Verifique sua conexão ou tente novamente mais tarde.</p>';
            }
        };

        fetchPopularGames(); 
    } else {
        console.error("Elemento '#game-container' para jogos populares não encontrado no DOM.");
    }
});
