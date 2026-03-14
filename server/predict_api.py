from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Path to your trained CNN model
MODEL_PATH = './model/breast_cancer_model.h5'
model = load_model(MODEL_PATH)

# Labels must match your folders in /dataset
class_labels = ['benign', 'malignant', 'normal']

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        img = load_img(file, target_size=(224, 224))
        img_array = img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        predictions = model.predict(img_array)
        predicted_class = class_labels[np.argmax(predictions)]

        return jsonify({
            'prediction': predicted_class,
            'confidence': float(np.max(predictions))
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
