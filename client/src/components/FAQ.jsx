import React, { useState } from 'react';
import './FAQ.scss';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    question: 'Is the prediction 100% accurate?',
    answer:
      'While our AI system is highly accurate and trained on medical datasets, it is not a substitute for a certified medical diagnosis. Always consult a doctor for confirmation.',
  },
  {
    question: 'Is my uploaded image stored anywhere?',
    answer:
      'No. All images are processed securely in real-time and never stored, ensuring your privacy and data safety.',
  },
  {
    question: 'What kind of ultrasound image should I upload?',
    answer:
      'A clear breast ultrasound image with visible tissue structure is best. Blurry or low-resolution images may affect the result.',
  },
  {
    question: 'What happens after I get the result?',
    answer:
      'Based on your result, you’ll receive recommendations including nearby specialists, free screening camps, and lifestyle guidance.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <p className="subtitle">Find answers to common questions</p>
      <div className="faq-container">
        {faqs.map((item, index) => (
          <div className={`faq-item ${openIndex === index ? 'open' : ''}`} key={item.question}>
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <h4>{item.question}</h4>
              <FaChevronDown className={`icon ${openIndex === index ? 'rotate' : ''}`} />
            </button>
            <div
              className="faq-answer"
              id={`faq-answer-${index}`}
              hidden={openIndex !== index}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;