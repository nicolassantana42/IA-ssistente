// static/js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const promptInput = document.getElementById('prompt-input');
    const responseOutput = document.getElementById('response-output');
    const loadingIndicator = document.getElementById('loading');
    const copyBtn = document.getElementById('copy-btn');
    const themeToggle = document.getElementById('theme-toggle');

    // --- LÓGICA DO TEMA (MODO ESCURO) ---
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };
    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // --- EFEITO MÁQUINA DE ESCREVER ---
    const typeWriter = (text) => {
        responseOutput.innerHTML = '<p></p><span class="typing-cursor"></span>';
        const pElement = responseOutput.querySelector('p');
        let i = 0;
        const speed = 30; // Velocidade em milissegundos
        function type() {
            if (i < text.length) {
                pElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                responseOutput.querySelector('.typing-cursor')?.remove();
                copyBtn.classList.remove('hidden');
            }
        }
        type();
    };

    // --- LÓGICA PRINCIPAL DE GERAÇÃO ---
    generateBtn.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            alert('Por favor, insira um tema.');
            return;
        }
        loadingIndicator.classList.remove('hidden');
        responseOutput.innerHTML = '';
        copyBtn.classList.add('hidden');
        generateBtn.disabled = true;
        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt }),
            });
            const data = await response.json();
            loadingIndicator.classList.add('hidden');
            if (response.ok) {
                typeWriter(data.response);
            } else {
                responseOutput.innerHTML = `<p style="color: #e74c3c;"><strong>Erro:</strong> ${data.error}</p>`;
            }
        } catch (error) {
            loadingIndicator.classList.add('hidden');
            responseOutput.innerHTML = `<p style="color: #e74c3c;"><strong>Erro:</strong> Ocorreu um erro ao conectar com o servidor.</p>`;
        } finally {
            generateBtn.disabled = false;
        }
    });

    // --- LÓGICA DO BOTÃO DE COPIAR ---
    copyBtn.addEventListener('click', () => {
        const textToCopy = responseOutput.querySelector('p').innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => { copyBtn.innerHTML = originalIcon; }, 1500);
        });
    });
});