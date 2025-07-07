document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const username = usernameInput.value.trim(); // .trim() remove espaços em branco
            const password = passwordInput.value.trim();

            errorMessage.style.display = 'none'; // Esconde qualquer mensagem de erro anterior
            errorMessage.textContent = '';

            if (username === '' || password === '') {
                errorMessage.textContent = 'Por favor, preencha todos os campos.';
                errorMessage.style.display = 'block';
                return; // Impede o prosseguimento se os campos estiverem vazios
            }

            // --- SIMULAÇÃO DE LOGIN ---
            // Em um aplicativo real, você enviaria esses dados para um servidor:
            // fetch('/api/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ username, password })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         // Armazenar token ou sessão no localStorage
            //         localStorage.setItem('userToken', data.token);
            //         localStorage.setItem('username', username);
            //         window.location.href = 'index.html'; // Redirecionar para a página inicial
            //     } else {
            //         errorMessage.textContent = data.message || 'Credenciais inválidas.';
            //         errorMessage.style.display = 'block';
            //     }
            // })
            // .catch(error => {
            //     console.error('Erro de rede ou servidor:', error);
            //     errorMessage.textContent = 'Erro ao tentar logar. Tente novamente.';
            //     errorMessage.style.display = 'block';
            // });

            // Por enquanto, vamos simular um login bem-sucedido e redirecionar:
            console.log("Simulando login para:", username);
            // Armazena um sinal de que o usuário está "logado"
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username); // Armazena o nome de usuário (opcional)

            // Redireciona para a página inicial
            window.location.href = 'index.html';
        });
    }
});
