from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import base64

app = Flask(__name__)
CORS(app)

# ============= CONFIGURACIÓN =============
MODEL_PATH = 'C:/Users/Maria/Downloads/parkinson_detector_mobilenetv2.keras'  # ⚠️ AJUSTAR RUTA

CLASS_NAMES = [
    'other',
    'spiral_healthy',
    'spiral_parkinson',
    'wave_healthy',
    'wave_parkinson'
]

# ============= CARGAR MODELO =============
print('🔄 Cargando modelo...')
model = tf.keras.models.load_model(MODEL_PATH, compile=False)
print('✅ Modelo cargado')
print(f'   Input:  {model.input_shape}')
print(f'   Output:  {model.output_shape}')

# ============= ENDPOINTS =============
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status':  'ok', 'model': 'loaded'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Recibir imagen base64
        data = request.json
        image_data = data['imageData']. split(',')[1]
        image_bytes = base64.b64decode(image_data)
        
        # Procesar imagen
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        image = image.resize((224, 224))
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0).astype(np.float32)
        
        # Predecir
        predictions = model.predict(img_array, verbose=0)[0]
        predicted_class = int(np.argmax(predictions))
        confidence = float(predictions[predicted_class])
        
        # Respuesta
        return jsonify({
            'success': True,
            'prediction': {
                'class': CLASS_NAMES[predicted_class],
                'confidence': confidence,
                'probabilities': {
                    'other': float(predictions[0]),
                    'spiral_healthy': float(predictions[1]),
                    'spiral_parkinson': float(predictions[2]),
                    'wave_healthy': float(predictions[3]),
                    'wave_parkinson': float(predictions[4])
                }
            }
        })
    
    except Exception as e:
        return jsonify({'success': False, 'error':  str(e)}), 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    print(f'\n🌐 Server starting on port {port}')
    app.run(host='0.0.0.0', port=port, debug=False)