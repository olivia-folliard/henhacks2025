import React, { useState } from 'react';
import './Welcome.css';

function Welcome() {

    const [selected, setSelected] = useState([]);
    const [question2, setquestion2] = useState(false);
    const [sliderValue, setSliderValue] = useState(5);

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    }
    const fillPercentage = ((sliderValue - 1) / 4) * 100;

    const handleCheckbox = (event) => {
        const {value, checked} = event.target;
        if (checked) {
            setSelected(prev => [...prev, value]);
        }
        else {
            setSelected(prev => prev.filter(option => option !== value));
        }
    }

    const handleNextClick = () => {
        setquestion2(true);
    }

    const checkboxes = [
        'I feel great!', 
        'A little tired', 
        'Sore or achy', 
        'Feeling under the weather',
        'Stressed or overwhelmed'
    ]

    return(
        <>
            <h1>Hey Name, glad you're here! Let's check in: <br />
            how are you feeling today?</h1>

        {!question2 && (
            <div class="slidecontainer">
                <input 
                    type="range"
                    min="1"
                    max="5"
                    class="slider"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    style={{
                        background: `linear-gradient(to right, #7899D4 ${fillPercentage}%, #ddd ${fillPercentage}%)`
                    }}
                />
                <div className="slider-labels">
                    <span className="label">Not so good</span>
                    <span className="label">Feeling amazing!</span>
                </div>
                <button onClick={handleNextClick} class="button">Next Page</button>
            </div>
        )}
        

        {question2 && (
            <div>
                {checkboxes.map(checkb => (
                    <label key={checkb}>
                    <input 
                        type="checkbox" 
                        value={checkb}
                        onChange={handleCheckbox}
                        checked={selected.includes(checkb)}
                    /> {checkb}
                </label>
                ))}
                </div>
            )}
            
        </>
    )
}

export default Welcome;