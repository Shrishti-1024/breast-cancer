import React, { useState } from "react";
import Lottie from "react-lottie-player";
import healthcareLogin from "../assets/lottie/healthcare-login.json";
import onlineDoctor from "../assets/lottie/OnlineDoctor.json";
import neverAlone from "../assets/lottie/NeverAlone.json";
import "./UploadScan.scss";

/**
 * Survey config – replace image URLs with your own illustrations later.
 */
const surveySteps = [
  {
    id: "ageGroup",
    question: "Which age group do you belong to?",
    description: "Age helps doctors understand your baseline risk profile.",
    options: [
      {
        value: "<30",
        label: "Below 30",
        
      },
      {
        value: "30-45",
        label: "30 – 45",
      
      },
      {
        value: "46-60",
        label: "46 – 60",
        
      },
      {
        value: "60+",
        label: "60+",
        
      },
    ],
  },
  {
    id: "lumpPresence",
    question: "Have you noticed any lump or thickening in your breast?",
    description: "Select the option that best matches what you feel during self-exam.",
    options: [
      {
        value: "yes",
        label: "Yes, I feel a lump",
    
      },
      {
        value: "no",
        label: "No lump noticed",
     
      },
      {
        value: "not_sure",
        label: "Not sure",
        
      },
    ],
  },
  {
    id: "lumpDuration",
    question: "How long have you noticed this change?",
    description: "Approximate duration helps estimate urgency.",
    options: [
      {
        value: "<1_month",
        label: "Less than 1 month",
        
      },
      {
        value: "1-3_months",
        label: "1 – 3 months",
        
      },
      {
        value: "3-6_months",
        label: "3 – 6 months",
 
      },
      {
        value: "6+_months",
        label: "More than 6 months",
        
      },
    ],
  },
  {
    id: "painLevel",
    question: "Do you experience breast pain or discomfort?",
    description: "Pain level can be related to benign or cyclic changes.",
    options: [
      {
        value: "none",
        label: "No pain",
        
      },
      {
        value: "mild",
        label: "Mild",
        
      },
      {
        value: "moderate",
        label: "Moderate",
        
      },
      {
        value: "severe",
        label: "Severe",

      },
    ],
  },
  {
    id: "familyHistory",
    question: "Is there a family history of breast cancer?",
    description: "Close relatives with breast cancer can increase personal risk.",
    options: [
      {
        value: "yes_first_degree",
        label: "Yes, mother / sister / daughter",
      
      },
      {
        value: "yes_other",
        label: "Yes, other relatives",
        
      },
      {
        value: "no",
        label: "No known history",
        
      },
      {
        value: "not_sure",
        label: "Not sure",

      },
    ],
  },
];

/**
 * Simple rule-based risk combiner.
 */
function computeRiskSummary(answers, predictionLabel) {
  let score = 0;
  const reasons = [];

  if (predictionLabel === "Malignant") {
    score += 3;
    reasons.push("AI model detected a malignant pattern in the ultrasound.");
  } else if (predictionLabel === "Benign") {
    reasons.push("AI model suggests a benign (non-cancerous) pattern.");
  }

  if (answers.lumpPresence === "yes") {
    score += 2;
    reasons.push("You reported a palpable lump or thickening.");
  } else if (answers.lumpPresence === "not_sure") {
    reasons.push(
      "You were unsure about a lump; physical examination is still important."
    );
  }

  if (answers.lumpDuration === "3-6_months") {
    score += 1;
    reasons.push("Breast changes have been present for 3–6 months.");
  }
  if (answers.lumpDuration === "6+_months") {
    score += 2;
    reasons.push(
      "Breast changes have been present for more than 6 months."
    );
  }

  if (answers.painLevel === "severe") {
    score += 1;
    reasons.push("You reported severe breast pain.");
  }

  if (answers.familyHistory === "yes_first_degree") {
    score += 2;
    reasons.push(
      "You have a first-degree relative with breast cancer."
    );
  } else if (answers.familyHistory === "yes_other") {
    score += 1;
    reasons.push("You reported breast cancer in extended family.");
  }

  let level = "Low clinical risk (based on current answers)";
  if (score >= 5)
    level = "High clinical concern – please consult a specialist soon";
  else if (score >= 3)
    level = "Moderate clinical concern – follow-up recommended";

  return { score, level, reasons };
}

const UploadScan = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [surveyAnswers, setSurveyAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [riskSummary, setRiskSummary] = useState(null);
  const [isSurveyFinished, setIsSurveyFinished] = useState(false);

  const handleSurveySelect = (stepId, value) => {
    setSurveyAnswers((prev) => ({ ...prev, [stepId]: value }));
  };

  const allSurveyAnswered = surveySteps.every(
    (step) => !!surveyAnswers[step.id]
  );
  const surveyCompleted = isSurveyFinished;

  const handleNextStep = () => {
    const activeStep = surveySteps[currentStep];

    // must choose something for current step
    if (!surveyAnswers[activeStep.id]) return;

    // if we're not at last step: go next
    if (currentStep < surveySteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    // last step -> mark survey as finished
    if (!allSurveyAnswered) return;

    setIsSurveyFinished(true);
    setMessage({
      text:
        "Survey complete ✅. Now you can upload your ultrasound image for AI prediction.",
      type: "success",
    });
  };

  const handlePrevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setMessage({ text: "", type: "" });
      setPrediction(null);
      setRiskSummary(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage({
        text: "Please select an image before uploading.",
        type: "error",
      });
      return;
    }

    if (!surveyCompleted) {
      setMessage({
        text:
          "Please complete the symptom survey and click Finish Survey before analyzing your scan.",
        type: "error",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setPrediction(null);
    setRiskSummary(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    const interval = setInterval(
      () =>
        setUploadProgress((prev) => (prev < 90 ? prev + 10 : prev)),
      250
    );

    try {
      const response = await fetch(
        "http://localhost:5001/predict-image",
        {
          method: "POST",
          body: formData,
        }
      );
      clearInterval(interval);

      const result = await response.json();
      if (!response.ok || result.error)
        throw new Error(result.error || "Failed");

      setUploadProgress(100);
      setIsUploading(false);
      setPrediction(result);
      setMessage({
        text: `Prediction: ${result.prediction}`,
        type: "success",
      });

      const summary = computeRiskSummary(
        surveyAnswers,
        result.prediction
      );
      setRiskSummary(summary);
    } catch (err) {
      clearInterval(interval);
      setIsUploading(false);
      setMessage({ text: err.message, type: "error" });
    }
  };

  const handleDownloadReport = async () => {
    if (!prediction) {
      setMessage({
        text:
          "Upload and analyze an image before downloading the report.",
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5001/generate-report",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prediction,
            survey: surveyAnswers,
            riskSummary,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to generate report.");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "herhealth-ai-report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setMessage({ text: err.message, type: "error" });
    }
  };

  const activeStep = surveySteps[currentStep];
  const progressPercent = Math.round(
    ((currentStep + 1) / surveySteps.length) * 100
  );

  return (
    <div className="uploadscan-wrapper">
      {/* animated background blobs */}
      <div className="uploadscan-bg uploadscan-bg-left" />
      <div className="uploadscan-bg uploadscan-bg-right" />

      <div className="uploadscan-inner">
        {/* Hero header */}
        <header className="uploadscan-header">
          <div className="header-text">
            <p className="eyebrow">Breast Health Journey</p>
            <h1>Upload & Analyze Your Breast Ultrasound Safely</h1>
            <p className="subcopy">
              Our AI model gives an early indication from your scan. Your
              images and answers stay private, and you receive a concise
              report you can share with your doctor.
            </p>
          </div>
          <div className="header-lottie">
            <Lottie loop play animationData={healthcareLogin} />
          </div>
        </header>

        {/* Step cards */}
        <div className="uploadscan-content">
          {/* Step 1: Upload */}
          <section className="upload-card">
            <div className="card-header">
              <span className="card-step-pill">Step 1 · Scan upload</span>
              <h2>Upload Breast Ultrasound Image</h2>
              <p>
                Select a clear ultrasound image of the breast region.
                Supported formats: JPG, PNG.
              </p>
            </div>

            <div className="card-body">
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                onChange={handleFileChange}
                hidden
              />
              <label htmlFor="fileInput" className="primary-btn file-btn">
                {selectedFile ? "Change Image" : "Choose Image"}
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="preview-img"
                />
              )}

              {isUploading && (
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="primary-btn analyze-btn"
              >
                ⚡ {isUploading ? "Analyzing..." : "Upload & Analyze"}
              </button>

              {message.text && (
                <p className={`msg ${message.type}`}>{message.text}</p>
              )}

              {prediction && (
                <div
                  className={`result ${prediction.prediction.toLowerCase()}`}
                >
                  <h3>
                    {prediction.prediction === "Malignant"
                      ? "⚠️ Malignant (Cancerous)"
                      : "✅ Benign (Non-Cancerous)"}
                  </h3>
                  {prediction.confidence && (
                    <p>Confidence: {prediction.confidence}%</p>
                  )}

                  {riskSummary && (
                    <div className="risk-summary">
                      <p className="risk-level">
                        Clinical risk estimate:{" "}
                        <strong>{riskSummary.level}</strong>
                      </p>
                      {riskSummary.reasons?.length > 0 && (
                        <ul className="risk-reasons">
                          {riskSummary.reasons.map((r, idx) => (
                            <li key={idx}>{r}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    className="secondary-btn download-btn"
                    onClick={handleDownloadReport}
                  >
                    ⬇ Download PDF Report
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Step 2: Survey */}
          <section className="survey-card">
            <div className="card-header">
              <span className="card-step-pill secondary">
                Step 2 · Symptom survey
              </span>
              <h2>Symptom Check Survey</h2>
              <p>
                These questions, combined with your ultrasound, help your
                doctor interpret your situation more accurately. Choose the
                option that looks and sounds closest to your condition.
              </p>
            </div>

            <div className="card-body survey-body-wrapper">
              {/* Progress bar */}
              <div className="survey-progress">
                <div className="survey-progress-top">
                  <span>
                    Step {currentStep + 1} of {surveySteps.length}
                  </span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="survey-progress-bar">
                  <div
                    className="survey-progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Active question */}
              <div className="survey-step">
                <h3 className="survey-question-title">
                  {activeStep.question}
                </h3>
                {activeStep.description && (
                  <p className="survey-question-desc">
                    {activeStep.description}
                  </p>
                )}

                <div className="survey-options-grid">
                  {activeStep.options.map((opt) => {
                    const selected =
                      surveyAnswers[activeStep.id] === opt.value;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        className={`survey-option-card ${
                          selected ? "selected" : ""
                        }`}
                        onClick={() =>
                          handleSurveySelect(activeStep.id, opt.value)
                        }
                      >
                        {opt.image && (
                          <img src={opt.image} alt={opt.label} />
                        )}
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="survey-nav">
                <button
                  type="button"
                  className="nav-ghost-btn"
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  className="primary-btn nav-primary-btn"
                  onClick={handleNextStep}
                  disabled={!surveyAnswers[activeStep.id]}
                >
                  {currentStep === surveySteps.length - 1
                    ? surveyCompleted
                      ? "Survey Complete"
                      : "Finish Survey"
                    : "Next →"}
                </button>
              </div>

              {surveyCompleted && (
                <p className="survey-complete-note">
                  ✅ Survey complete. You can now upload your scan to get a
                  combined AI + symptom-based result.
                </p>
              )}

              <div className="survey-lottie">
                <Lottie loop play animationData={onlineDoctor} />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* bottom reassurance blob */}
      <div className="corner-lottie">
        <Lottie loop play animationData={neverAlone} />
      </div>
    </div>
  );
};

export default UploadScan;
