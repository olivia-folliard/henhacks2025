import React, { useState } from 'react';

function Welcome() {

    const [selected, setSelected] = useState([]);
    const [question2, setquestion2] = useState(false);

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
            <div>
                <input 
                    type="range"
                    min="1"
                    max="5"
                />
                <button onClick={handleNextClick}>Next Page</button>
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