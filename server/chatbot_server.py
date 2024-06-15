# chatbot_server.py
import pandas as pd
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
from flask import Flask, request, jsonify
from flask_cors import CORS

nltk.download('punkt')
nltk.download('stopwords')

app = Flask(__name__)
CORS(app)

# Cargar el dataset
dataset = pd.read_csv('violencia.csv')

# Inicializar el stemmer para español
stemmer = SnowballStemmer('spanish')

# Preprocesamiento del texto
def preprocess(text):
    tokens = word_tokenize(text.lower(), language='spanish')
    tokens = [stemmer.stem(token) for token in tokens if token.isalpha()]
    tokens = [token for token in tokens if token not in stopwords.words('spanish')]
    return tokens

# Función para determinar el nivel de agresión
def determinar_nivel(texto):
    tokens = preprocess(texto)
    violencias = []
    
    for _, row in dataset.iterrows():
        descripcion = row['palabra']
        if any(token in descripcion.lower() for token in tokens):
            violencias.append({
                'tipo': row['tipo'],
                'nivel': row['nivel']
            })
    
    return violencias

# Función para obtener recomendaciones
def obtener_recomendaciones(violencias):
    recomendaciones = {
        1: "Ten cuidado y considera hablar con alguien de confianza.",
        2: "Busca apoyo en amigos o familiares cercanos.",
        3: "Considera buscar ayuda profesional o en organizaciones especializadas.",
        4: "Es importante buscar ayuda inmediata. Contacta a autoridades o servicios de apoyo.",
        5: "Sal de ahí de inmediato y busca ayuda profesional."
    }
    recomendaciones_texto = []
    for v in violencias:
        recomendacion = recomendaciones.get(v['nivel'], "Sal de ahí de inmediato y busca ayuda profesional.")
        recomendaciones_texto.append(f"Para el tipo '{v['tipo']}' (Nivel {v['nivel']}): {recomendacion}")
    return recomendaciones_texto

@app.route('/api/chatbot/analizar', methods=['POST'])
def analizar_texto():
    data = request.json
    texto = data.get('texto', '')
    
    # Verificar la longitud del texto
    if len(texto.split()) < 3:
        return jsonify({'mensaje': 'Por favor, ingresa una frase con al menos tres palabras.'})
    
    violencias = determinar_nivel(texto)
    recomendaciones = obtener_recomendaciones(violencias)
    return jsonify({
        'violencias': violencias,
        'recomendaciones': recomendaciones
    })
    
if __name__ == '__main__':
    app.run(port=5000, debug=True)
