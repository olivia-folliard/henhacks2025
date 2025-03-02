import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
const { GoogleGenerativeAI } = require("@google/generative-ai");

export default function Input() {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState([]);
  const [duration, setDuration] = useState("");
  const [hydration, setHydration] = useState(3);
  const [sleep, setSleep] = useState(3);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleSymptomChange = (event) => {
    const value = event.target.value;
    setSymptoms((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `With the given information about symptoms: ${symptoms}, duration of symptoms: ${duration}, user hydration level: ${hydration}, sleep amount: ${sleep}, and additional info: ${additionalInfo}, give the user suggestions on how to improve their health as if you were a knowledgeable grandma.`;
      
      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [{ text: prompt }],
        }],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.1,
        },
      });
      
      return result.response.text();
    } catch (error) {
      console.error("Error generating AI response:", error);
      return "Sorry, we couldn't fetch advice at the moment.";
    }
  };

  const submitAndNavigate = async (event) => {
    event.preventDefault();
    alert("Survey submitted! ✅");
    const response = await handleSubmit();
    navigate('/map', { state: { result: response } });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h2>Let's Check In</h2>
      <form onSubmit={submitAndNavigate}>
        <p>What’s going on? (Select all that apply)</p>
        {["Coughing", "Fever", "Headache", "Stomach issues", "Fatigue"].map(symptom => (
          <label key={symptom} style={{ display: "block" }}>
            <input
              type="checkbox"
              value={symptom}
              checked={symptoms.includes(symptom)}
              onChange={handleSymptomChange}
            /> {symptom}
          </label>
        ))}

        <p>How long have you been feeling this way?</p>
        {["Just today", "2–3 days", "A week or more"].map(time => (
          <label key={time} style={{ display: "block" }}>
            <input
              type="radio"
              name="duration"
              value={time}
              checked={duration === time}
              onChange={handleDurationChange}
            /> {time}
          </label>
        ))}

        <p>Have you been staying hydrated and eating well? (1 = Not really, 5 = Yes, feeling balanced)</p>
        <input type="range" min="1" max="5" value={hydration} onChange={(e) => setHydration(Number(e.target.value))} />

        <p>How’s your sleep been lately? (1 = Restless, 5 = Sleeping great)</p>
        <input type="range" min="1" max="5" value={sleep} onChange={(e) => setSleep(Number(e.target.value))} />

        <p>Anything else?</p>
        <textarea value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} placeholder="Optional details..." rows={3} style={{ width: "100%" }} />

        <button type="submit" style={{ marginTop: "10px", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Let's check on my community →
        </button>
      </form>
    </div>
  );
}
