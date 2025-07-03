document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("game-container");
    const MAX_DESC_LENGTH = 150;
    const MAX_CARDS = 8; // <-- Adicionado: Limita o número de caixinhas a 8

    fetch("http://localhost:8080/api/games/cards")
        .then(res => res.json())
        .then(cards => {
            if (!Array.isArray(cards) || cards.length === 0) {
                container.innerHTML = "<p>Nenhum jogo encontrado.</p>";
                return;
            }

            container.innerHTML = "";

            // Limita os cards antes de iterar e criar os elementos
            const limitedCards = cards.slice(0, MAX_CARDS); // <-- Adicionado: Pega apenas os primeiros 8 cards

            limitedCards.forEach(jogo => { // <-- Alterado: Itera sobre os cards limitados
                let descricao = jogo.description_raw || jogo.description || "Sem descrição disponível.";
                descricao = descricao.replace(/<[^>]*>/g, "");

                if (descricao.length > MAX_DESC_LENGTH) {
                    descricao = descricao.substring(0, MAX_DESC_LENGTH) + "...";
                }

                const card = document.createElement("div");
                card.className = "game-card";

                // URL da imagem otimizada para tamanho 600x338
                // Verifica se background_image existe e constrói a URL otimizada
                const optimizedImageUrl = jogo.background_image 
                    ? jogo.background_image.replace('/media/', '/media/resize/600/-/') 
                    : 'https://via.placeholder.com/600x338?text=Sem+Imagem'; // Fallback para placeholder com tamanho fixo

                card.innerHTML = `
                    <img src="${optimizedImageUrl}" alt="${jogo.name}" class="game-img">
                    <div class="game-content">
                        <h2>${jogo.name}</h2>
                        <p class="descricao">${descricao}</p>
                    </div>
                `;

                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Erro ao carregar jogos:", err);
            container.innerHTML = "<p>Erro ao carregar jogos.</p>";
        });
});
