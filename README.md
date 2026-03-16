# Breast Cancer Prediction System

An AI-powered web application that predicts whether a breast tumor is **Benign or Malignant** using ultrasound images.
The system combines **machine learning predictions** with a **symptom survey** and generates a **downloadable PDF medical report** for users.

---

## Overview

Breast cancer is one of the most common cancers worldwide. Early detection plays a crucial role in improving survival rates.

This project provides a simple web-based platform where users can:

* Upload breast ultrasound images
* Answer a short symptom survey
* Receive an AI-based prediction
* View a clinical risk summary
* Download a medical-style PDF report
* Track prediction history from their profile dashboard

---

## Features

* Upload breast ultrasound scan images
* AI-based **Benign / Malignant prediction**
* Symptom survey for better context
* Risk analysis summary based on symptoms + AI output
* Downloadable **PDF medical report**
* User profile dashboard
* Prediction history tracking
* Modern responsive UI with animations

---

## Tech Stack

### Frontend

* React.js
* SCSS
* Lottie Animations
* React Icons

### Backend

* Python
* Flask API

### Machine Learning

* Breast cancer classification model
* Image-based prediction system

---

## Project Structure

```
breast-cancer
│
├── client          # React Frontend
│   ├── components
│   ├── pages
│   ├── assets
│   └── styles
│
├── server          # Flask Backend
│   ├── model
│   ├── routes
│   └── report generation
│
└── README.md
```

---

## How the System Works

1. The user completes a **symptom survey**
2. The user uploads a **breast ultrasound scan**
3. The AI model analyzes the image
4. The system predicts **Benign or Malignant**
5. A **risk summary** is generated using survey answers
6. The user can **download a PDF medical report**
7. The prediction is stored in the **user profile dashboard**

---

## Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Upload Scan Page

![Upload Scan](screenshots/upload.png)

### Prediction Result

![Prediction Result](screenshots/result.png)

### Generated Report

![Report](screenshots/report.png)

---

## Future Improvements

* Cloud database for storing reports
* Doctor consultation integration
* Prediction analytics dashboard
* Improved model accuracy
* Deployment with cloud hosting

---

## Author

**Shrishti**

---

## Disclaimer

This project is for **educational and research purposes only**.
It is not intended to replace professional medical diagnosis.
