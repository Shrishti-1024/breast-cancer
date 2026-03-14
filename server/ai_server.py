from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import time

app = Flask(__name__)
CORS(app)

@app.route("/predict-image", methods=["POST"])
def predict_image():
    file = request.files.get("image")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    time.sleep(2)  # simulate processing delay

    # mock prediction logic
    prediction = random.choice(["Malignant", "Benign"])
    confidence = round(random.uniform(85, 99), 2)

    return jsonify({
        "prediction": prediction,
        "confidence": confidence
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)
