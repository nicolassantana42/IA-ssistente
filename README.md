# ✨ IAssistente-Criativo ✨

### Uma Aplicação Web Interativa com Inteligência Artificial

![Python](https://img.shields.io/badge/Python-3.x-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.x-black.svg)
![Frontend](https://img.shields.io/badge/Frontend-HTML_CSS_JS-orange.svg)
![API](https://img.shields.io/badge/API-Google_Gemini-red.svg)

---

## 🚀 Sobre o Projeto

[cite_start]**IAssistente-Criativo** é uma miniaplicação web desenvolvida como parte da disciplina de Git e GitHub[cite: 2]. [cite_start]A aplicação permite que usuários insiram um tema e, através de uma requisição HTTP, consome a API do Google Gemini para gerar um texto exclusivo sobre o assunto solicitado[cite: 7].

O projeto foi construído com foco na experiência do usuário, implementando uma interface moderna e interativa.

### Principais Funcionalidades
- 🔮 **Geração de Texto com IA:** Utiliza o modelo `gemini-pro-latest` do Google para criar conteúdo.
- 🎨 **Interface Moderna:** Design limpo com fundo de partículas animadas.
- ✍️ **Efeito "Máquina de Escrever":** A resposta da IA é exibida de forma dinâmica.
- 🌗 **Tema Escuro/Claro:** Seletor de tema com persistência no navegador.
- 📋 **Funcionalidade de Cópia:** Copie facilmente o texto gerado com um clique.
- [cite_start]💾 **Log de Interações:** Todas as gerações são salvas em um banco de dados SQLite[cite: 31].

---

## 👥 Equipe

| Nome                 | RGM      |
| -------------------- | -------- |
| Nicolas Santana      | 34971343 |
| Iago Lins De Santana | 42795656 |
| *[Nome do Integrante 3]* | *[RGM]* |
| *[Nome do Integrante 4]* | *[RGM]* |
| *[Nome do Integrante 5]* | *[RGM]* |
| *[Nome do Integrante 6]* | *[RGM]* |
| *[Nome do Integrante 7]* | *[RGM]* |

---

## 🛠️ Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o projeto localmente.

### **1. Clone o Repositório**
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd IAssistente-Criativo 

2. Configure o Ambiente Virtual
# Crie o ambiente virtual
python -m venv venv

# Ative o ambiente (Windows - Git Bash)
source venv/Scripts/activate

3. Instale as Dependências
pip install -r requirements.txt

4. Configure a Chave de API
API_KEY = "SUA_CHAVE_DA_API_AQUI"

5. Execute a Aplicação
python app.py

6. Acesse no Navegador
Abra seu navegador e acesse: http://127.0.0.1:5000

🤝 Contribuições
Este projeto foi desenvolvido seguindo um fluxo de trabalho colaborativo. Cada integrante trabalhou em sua própria branch e todas as novas funcionalidades foram integradas à branch principal (main) através de Pull Requests, permitindo a revisão de código e um desenvolvimento organizado.
