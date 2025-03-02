import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
const { GoogleGenerativeAI } = require("@google/generative-ai");


export default function Input() {
  const [symptoms, setSymptoms] = useState([]);
  const [duration, setDuration] = useState([]);
  const navigate = useNavigate();
  //const [symptoms, setSymptoms] = useState([]); 
  //const [duration, setDuration] = useState("");
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
    const value = event.target.value;
    setDuration((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      symptoms,
      duration,
      hydration,
      sleep,
      additionalInfo,
    });
    
   const handleSubmit = async() => {
   
    const genAI = new GoogleGenerativeAI("AIzaSyDCjWcGdlboj2mGmB6DmJB1FE87qgrssOg");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "With the given information about symptoms" + symptoms +  ", duration of symptoms" + duration +  " , user level of hydration" + hydration + ", amount of sleep" + sleep+ ", and addiontionalInfo provided" + additionalInfo + ", give the user suggestions on how to improve their health as if you were a knowledgable grandma";
    const result = await model.generateContent({
    contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            }
          ],
        }
    ],
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.1,
    }});
   console.log(result.response.text());
  return result.response.text()
  }
 
 
  const submitAndNavigate = async () => {
    alert("Survey submitted! ✅");
    const r = await handleSubmit();
    if (r) {
      navigate('/map', { state: { result: r } });
    } else {
      console.error("Failed to fetch career suggestion. Please try again.");
    }
  }
 
 
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
  
      <h2>Let's Check In</h2>
      <form onSubmit={handleSubmit}>
      <h2> Let's Check In</h2>
      <form onSubmit={submitAndNavigate}>
        <p>What’s going on? (Select all that apply)</p>
        {["Coughing", "Fever", "Headache", "Stomach issues", "Fatigue"].map(
          (symptom) => (
            <label key={symptom} style={{ display: "block" }}>
              <input
                type="checkbox"
                value={symptom}
                checked={symptoms.includes(symptom)}
                onChange={handleSymptomChange}
              />{" "}
              {symptom}
            </label>
          )
        )}</form>

        <p>How long have you been feeling this way? (Select all that apply)</p>
        {["Just today", "2–3 days", "A week or more"].map((time) => (
          <label key={time} style={{ display: "block" }}>
            <input
              type="checkbox"
              value={time}
              checked={duration.includes(time)}
              onChange={handleDurationChange}
            />{" "}
            {time}
          </label>
        ))}
 
 
        <p>How long have you been feeling this way? </p>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="e.g., 2 days"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
 
 
        <p>Have you been staying hydrated and eating well?</p>
        <p>(1 = Not really, 5 = Yes, feeling balanced)</p>
        <input
          type="range"
          min="1"
          max="5"
          value={hydration}
          onChange={(e) => setHydration(Number(e.target.value))}
        />
 
 
        <p>
          How’s your sleep been lately?
          <br /> (1 = Restless, 5 = Sleeping great)
        </p>
        <input
          type="range"
          min="1"
          max="5"
          value={sleep}
          onChange={(e) => setSleep(Number(e.target.value))}
        />
 
 
        <p>Anything else?</p>
        <textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Optional details..."
          rows={3}
          style={{ width: "100%" }}
        />
 
 
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Let's check on my community →
        </button>
      </form>
    </div>
  );
}
 }