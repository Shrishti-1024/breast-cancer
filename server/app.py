import io
import os
from datetime import datetime

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from reportlab.lib.utils import ImageReader
from reportlab.lib import colors

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

from pymongo import MongoClient
from dotenv import load_dotenv

# ------------------------- CONFIG -------------------------

load_dotenv()

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024

MODEL_PATH = "model/breast_cancer_model.keras"

IMG_SIZE = (224, 224)

CLASS_LABELS = ["benign", "malignant", "normal"]

print("\n🔁 Loading AI Model...")
model = load_model(MODEL_PATH)
print("✅ Model Loaded Successfully\n")

# ------------------------- MONGO DB -------------------------

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB", "herhealth")

mongo_client = None
reports_collection = None

if MONGO_URI:
    try:
        mongo_client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=3000)
        mongo_client.admin.command("ping")
        db = mongo_client[MONGO_DB]
        reports_collection = db["reports"]
        print("🗄 Connected to MongoDB")
    except Exception as e:
        print("⚠ MongoDB failed:", e)

# ------------------------- UTILITIES -------------------------

def preprocess_image(file):
    img_bytes = file.read()
    pil_img = load_img(io.BytesIO(img_bytes), target_size=IMG_SIZE)
    arr = img_to_array(pil_img) / 255.0
    return np.expand_dims(arr, axis=0)

def determine_risk_level(predicted_class, confidence):
    if predicted_class == "malignant" and confidence >= 60:
        return "High"
    elif predicted_class == "benign":
        return "Medium"
    else:
        return "Low"

def generate_recommendation(level):
    if level == "High":
        return "Immediate consultation with an oncologist is strongly recommended."
    elif level == "Medium":
        return "Further diagnostic screening and clinical evaluation advised."
    else:
        return "Routine monitoring recommended."

def generate_diet_plan(predicted_class, confidence):

    if predicted_class == "malignant":
        return {
            "title": "Cancer Support Diet",
            "eatLess": [
                "Deep fried food",
                "Cold drinks",
                "Packaged snacks",
                "Extra sugary sweets"
            ],
            "dailyHabits": [
                "Daily walk of 20-30 min",
                "Drink more water",
                "Take proper sleep",
                "Follow the doctors advice"
            ]
        }

    elif predicted_class == "benign":
        return {
            "title": "Breast Health Diet",
            "eatLess": [
                "Fast food",
                "Excess sugar",
                "Very oily food"
            ],
            "dailyHabits": [
                "Daily walking",
                "Maintain healthy weight",
                "Regular checkups"
            ]
        }

    else:
        return {
            "title": "Healthy Preventive Diet",
            "eatLess": [
                "Junk food",
                "Sugary drinks",
                "Very oily food"
            ],
            "dailyHabits": [
                "Daily 30 min walking",
                "Drink enough water",
                "Balanced diet"
            ]
        }

def generate_probability_chart(probabilities):

    labels = list(probabilities.keys())
    values = list(probabilities.values())

    plt.figure(figsize=(5,3))

    colors_list = ["#22c55e", "#ef4444", "#3b82f6"]

    plt.bar(labels, values, color=colors_list)

    plt.ylabel("Probability (%)")
    plt.title("Prediction Confidence")

    plt.ylim(0,100)

    plt.grid(axis="y", linestyle="--", alpha=0.5)

    buffer = io.BytesIO()

    plt.tight_layout()
    plt.savefig(buffer, format="PNG")
    plt.close()

    buffer.seek(0)

    return buffer

# ------------------------- ROUTES -------------------------

@app.route("/", methods=["GET"])
def home():
    return "HerHealth AI Server Running 💖", 200


@app.route("/predict-image", methods=["POST"])
def predict_image():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]

    try:

        processed = preprocess_image(image)

        pred = model.predict(processed)
        prob = pred[0]

        idx = int(np.argmax(prob))
        predicted_class = CLASS_LABELS[idx]
        confidence = float(round(prob[idx] * 100, 2))

        probabilities = {
            CLASS_LABELS[i]: float(round(prob[i] * 100, 2))
            for i in range(len(CLASS_LABELS))
        }

        risk_level = determine_risk_level(predicted_class, confidence)
        recommendation = generate_recommendation(risk_level)
        diet_plan = generate_diet_plan(predicted_class, confidence)

        response = {
            "prediction": predicted_class.capitalize(),
            "confidence": confidence,
            "riskLevel": risk_level,
            "probabilities": probabilities,
            "recommendation": recommendation,
            "dietPlan": diet_plan,
            "timestamp": datetime.utcnow().isoformat(),
            "disclaimer": "This AI tool provides supportive screening insights and is not a substitute for professional medical diagnosis."
        }

        if reports_collection is not None:
            result = reports_collection.insert_one(response)
            response["_id"] = str(result.inserted_id)

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/generate-report", methods=["POST"])
def generate_report():

    data = request.get_json()

    pdf_buffer = io.BytesIO()

    c = canvas.Canvas(pdf_buffer, pagesize=A4)

    width, height = A4
    margin = 2 * cm
    y = height - margin

    # HEADER BANNER
    c.setFillColor(colors.HexColor("#4F46E5"))
    c.rect(0, height - 3*cm, width, 3*cm, fill=1)

    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(margin, height - 2*cm, "HerHealth AI Diagnostic Report")

    c.setFont("Helvetica", 10)
    c.drawString(margin, height - 2.6*cm, "AI Powered Breast Cancer Screening")

    y = height - 4 * cm

    prediction = data.get("prediction", {})

    # RESULT CARD
    c.setFillColor(colors.whitesmoke)
    c.roundRect(margin, y-3*cm, width-4*cm, 3*cm, 10, fill=1)

    c.setFillColor(colors.black)
    c.setFont("Helvetica-Bold", 12)

    c.drawString(margin+15, y-1*cm, f"Prediction : {prediction.get('prediction')}")
    c.drawString(margin+15, y-1.8*cm, f"Confidence : {prediction.get('confidence')}%")
    c.drawString(margin+15, y-2.6*cm, f"Risk Level : {prediction.get('riskLevel')}")

    y -= 4 * cm

    # CHART
    chart = generate_probability_chart(prediction.get("probabilities", {}))

    c.drawImage(ImageReader(chart), margin, y - 6 * cm, width=12 * cm, height=6 * cm)

    y -= 7 * cm

    # SEPARATOR
    c.setStrokeColorRGB(0.8,0.8,0.8)
    c.line(margin, y, width-margin, y)

    y -= 1 * cm

    diet = prediction.get("dietPlan", {})

    # DIET TITLE
    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(colors.HexColor("#4F46E5"))
    c.drawString(margin, y, "Recommended Diet Plan")

    y -= 1 * cm

    c.setFillColor(colors.black)
    c.setFont("Helvetica", 11)

    # EAT LESS
    c.setFont("Helvetica-Bold", 12)
    c.drawString(margin, y, "Eat Less")

    y -= 0.7 * cm

    c.setFont("Helvetica", 11)

    for item in diet.get("eatLess", []):
        c.drawString(margin + 15, y, f"• {item}")
        y -= 0.6 * cm

    y -= 0.5 * cm

    # DAILY HABITS
    c.setFont("Helvetica-Bold", 12)
    c.drawString(margin, y, "Daily Habits")

    y -= 0.7 * cm

    c.setFont("Helvetica", 11)

    for item in diet.get("dailyHabits", []):
        c.drawString(margin + 15, y, f"• {item}")
        y -= 0.6 * cm

    y -= 1 * cm

    # DISCLAIMER BOX
    c.setFillColor(colors.lightgrey)
    c.roundRect(margin, y-1*cm, width-4*cm, 1*cm, 6, fill=1)

    c.setFillColor(colors.black)
    c.setFont("Helvetica-Oblique",9)

    c.drawString(
        margin+10,
        y-0.7*cm,
        "AI screening support tool — not a substitute for professional medical diagnosis."
    )

    c.showPage()
    c.save()

    pdf_buffer.seek(0)

    return send_file(
        pdf_buffer,
        mimetype="application/pdf",
        as_attachment=True,
        download_name="HerHealth_AI_Report.pdf"
    )


# ------------------------- RUN -------------------------

if __name__ == "__main__":
    print("🚀 Flask AI Server running at: http://127.0.0.1:5001")
    app.run(debug=True, host="127.0.0.1", port=5001)