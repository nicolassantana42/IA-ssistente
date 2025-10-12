# app.py (Adaptado para Google Gemini API)
import os
import sqlite3
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai # Importa a biblioteca do Google
from config import API_KEY

# app.py
# ... (depois de todas as linhas 'import')

from config import API_KEY
import google.generativeai as genai

# CÓDIGO DE DIAGNÓSTICO:
# Este código vai rodar uma vez quando o servidor iniciar e imprimir os modelos disponíveis
try:
    genai.configure(api_key=API_KEY)
    print("--- Modelos de IA disponíveis para sua chave ---")
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)
    print("---------------------------------------------")
except Exception as e:
    print(f"Não foi possível listar os modelos: {e}")
# FIM DO CÓDIGO DE DIAGNÓSTICO

# codigo começa aqui
# app = Flask(__name__)
# ...

app = Flask(__name__)

# --- INÍCIO DA CONFIGURAÇÃO DO GEMINI ---
try:
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel('gemini-pro-latest')
except Exception as e:
    print(f"ERRO: Falha ao configurar a API do Google. Verifique sua chave. Erro: {e}")
    model = None
# --- FIM DA CONFIGURAÇÃO ---

def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            prompt TEXT NOT NULL,
            response TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    # Verifica se o modelo foi inicializado corretamente
    if model is None:
        return jsonify({'error': 'A API do Google não foi configurada corretamente. Verifique o terminal do servidor.'}), 500

    try:
        data = request.json
        prompt = data.get('prompt')

        if not prompt:
            return jsonify({'error': 'Nenhum tema foi fornecido.'}), 400

        # --- CHAMADA PARA A API DO GEMINI ---
        full_prompt = f"Escreva um parágrafo curto sobre: {prompt}"
        response = model.generate_content(full_prompt)
        generated_text = response.text
        # --- FIM DA CHAMADA ---

        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO logs (prompt, response) VALUES (?, ?)', (prompt, generated_text))
        conn.commit()
        conn.close()

        return jsonify({'response': generated_text})

    except Exception as e:
        # Imprime o erro no terminal para depuração
        print(f"Ocorreu um erro durante a geração: {e}")
        return jsonify({'error': f'Ocorreu um erro ao comunicar com a API: {str(e)}'}), 500

if __name__ == '__main__':
    init_db()
    app.run(debug=True)